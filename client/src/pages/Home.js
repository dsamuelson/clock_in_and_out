import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_DB_SALARY } from '../utils/queries';
import { ADD_SALARY, CLOCK_IN, CLOCK_OUT } from '../utils/mutations';
import HistoryTable from '../components/History';


const Home = () => {
    const [salary, setSalary] = useState(0.00)
    const [clockedIn, setClockedIn] = useState(false)
    const [inTime, setInTime] = useState()
    const [ currentClockedInId, setCurrentClockedInId ] = useState('')
    const [outTime, setOutTime] = useState()
    const [hoursInDay, setHoursInDay ] = useState(0);
    const [ dailyEarnings, setDailyEarnings ] = useState(0)
    const [ tableData, setTableData ] = useState([])

    const [ sendDBSalary ] = useMutation(ADD_SALARY)
    const [ sendClockIn ] = useMutation(CLOCK_IN)
    const [ sendClockOut ] = useMutation(CLOCK_OUT)
    const { loading: dbSalaryLoading, data: dbSalary, refetch: dbSalaryRefetch } = useQuery(QUERY_DB_SALARY)
    const { loading: dbMeLoading, data: dbMeData, refetch: dbMeDataRefetch} = useQuery(QUERY_ME);

    const handleSalarySubmit = async (salaryAmount) => {
        try {
            await sendDBSalary({
                variables: {
                    salary: salaryAmount.toString() || "0.00"
                }
            });
        } catch (e) {
            console.error(e)
        }
        dbSalaryRefetch()
    }

    const handleClockIn = async (dbInTime) => {
        
        try {
            await sendClockIn({
                variables: {
                    clockedInTime: dbInTime.getTime().toString(),
                    dbSalary: parseFloat(salary).toFixed(2)
                }
            });
        } catch (e) {
            console.error(e)
        }
        dbMeDataRefetch()
    }

    const handleClockOut = async (dbOutTime) => {
        dbMeDataRefetch()
        try {
            await sendClockOut({
                variables: {
                    clockedId: currentClockedInId,
                    clockedOutTime: dbOutTime.getTime().toString()
                }
            });
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        if (!dbSalaryLoading) {
            setSalary(dbSalary.me.payAmount)
        }
    }, [dbSalaryLoading, dbSalary])

    useEffect(() => {
        if (!dbMeLoading) {
            setClockedIn(dbMeData.me.clockedIn)
            setTableData([dbMeData.me.hoursWorked])
            if(dbMeData.me.currentHWId) {
                setCurrentClockedInId(dbMeData.me.currentHWId)
                if (dbMeData.me.hoursWorked.length !== 0){
                    if (dbMeData.me.currentHWId !== "none") {
                        setInTime(new Date(parseInt(dbMeData.me.hoursWorked[dbMeData.me.hoursWorked.length -1].clockedInTime)))
                    } else {
                        setOutTime(new Date(parseInt(dbMeData.me.hoursWorked[dbMeData.me.hoursWorked.length -1].clockedOutTime)))
                    }
                }
            }
        }
    }, [dbMeData, dbMeLoading, dbMeDataRefetch])

    useEffect(() => {
        if (inTime && outTime) {
            setHoursInDay((outTime.getTime() - inTime.getTime()) / (1000 * 60 * 60))
        }
    }, [outTime, setOutTime])

    useEffect(() => {
        setDailyEarnings(parseFloat((salary * hoursInDay).toFixed(2)))
    }, [hoursInDay, setHoursInDay])

  return (
    <div>
        <section>
            <h2>Salary/Per Hour</h2>
            {!dbSalaryLoading && salary? (
                <div>
                    <h3>{salary} per hour</h3>
                    <button onClick={e => {e.preventDefault() ; setSalary()}}>change</button>
                </div>
                
            ) : (
                <form onSubmit={(e) => {e.preventDefault(); handleSalarySubmit(e.target[0].value)}}>
                    <input type="text" id='salaryValue' name='salaryValue'/>
                    <button>Submit</button>
                </form>
            )} 
        </section>
        <section>
        {clockedIn? (
            <button onClick={() => {setClockedIn(false); handleClockOut(new Date())}}>Clock Out</button>
        ) : (
            <button onClick={() => {setClockedIn(true); handleClockIn(new Date())}}>Clock In</button>
        )}
        </section>
        <section>
            {dailyEarnings? (
                <h3>You've Earned ${dailyEarnings} for this Time</h3>
            ) : ( <h4>No clock In or clock out data yet</h4> )}
        </section>
        <section>
            <HistoryTable histData={tableData}/>
        </section>
    </div>
  );
};

export default Home;