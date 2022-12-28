import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { ADD_SALARY, CLOCK_IN, CLOCK_OUT, CLEAR_HISTORY } from '../utils/mutations';
import HistoryTable from '../components/History';
import Auth from '../utils/auth';
import { idbPromise } from '../utils/helpers';


const Home = () => {
    const loggedIn = Auth.loggedIn()

    const [ salary, setSalary] = useState(0.00)
    const [ clockedIn, setClockedIn] = useState(false)
    const [ currentClockedInId, setCurrentClockedInId ] = useState('')
    const [ dailyEarnings, setDailyEarnings ] = useState(0)
    const [ tableData, setTableData ] = useState([])
    const [ totalHours, setTotalHours] = useState(0.00)
    const [ totalEarnings, setTotalEarnings ] = useState(0.00)

    const [ sendDBSalary ] = useMutation(ADD_SALARY)
    const [ sendClockIn ] = useMutation(CLOCK_IN)
    const [ sendClockOut ] = useMutation(CLOCK_OUT)
    const [ clearHistory ] = useMutation(CLEAR_HISTORY)

    const { loading: dbMeLoading, data: dbMeData, refetch: dbMeDataRefetch} = useQuery(QUERY_ME);

    const handleSalarySubmit = async (salaryAmount) => {
        dbMeDataRefetch()
        try {
            await sendDBSalary({
                variables: {
                    salary: salaryAmount.toString() || "0.00"
                }
            });
        } catch (e) {
            console.error(e)
        }
        dbMeDataRefetch()
    }

    const handleClockIn = async (dbInTime) => {
        dbMeDataRefetch()
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
        dbMeDataRefetch()
    }

    useEffect(() => {
        dbMeDataRefetch()
        if (!dbMeLoading) {
            if (dbMeData.me) {
                idbPromise('clockedinandout_user', 'put', dbMeData.me)
                setSalary(dbMeData.me.payAmount)
                setClockedIn(dbMeData.me.clockedIn)
                setTableData([dbMeData.me.hoursWorked])
                setTotalHours(parseFloat(dbMeData.me.totalTime.toFixed(2)))
                setTotalEarnings(parseFloat(dbMeData.me.totalPay.toFixed(2)))
                if(dbMeData.me.currentHWId) {
                    setCurrentClockedInId(dbMeData.me.currentHWId)
                    if (dbMeData.me.hoursWorked.length !== 0){
                        setDailyEarnings(dbMeData.me.hoursWorked[dbMeData.me.hoursWorked.length -1].paidTime)
                    }
                }
            }
        }
    }, [dbMeData, dbMeLoading, dbMeDataRefetch])

    if (loggedIn) {
        return (
            <div className='displayArea'>
                <section className='salaryCont'>
                    <h2>Salary/Per Hour</h2>
                    {!dbMeLoading && salary? (
                        <div>
                            <h3 onClick={e => {e.preventDefault() ; setSalary()}}>{salary} per hour</h3>
                        </div>
                        
                    ) : (
                        <form onSubmit={(e) => {e.preventDefault(); handleSalarySubmit(e.target[0].value)}}>
                            <input type="text" id='salaryValue' name='salaryValue'/>
                            <button>Submit</button>
                        </form>
                    )} 
                </section>
                <section className='clockedInCont'>
                {clockedIn? (
                    <button onClick={() => {setClockedIn(false); handleClockOut(new Date())}} className='clockOutButton'>Clock Out</button>
                ) : (
                    <button onClick={() => {setClockedIn(true); handleClockIn(new Date())}}className='clockInButton'>Clock In</button>
                )}
                </section>
                <section className='earningsCont'>
                    {dailyEarnings? (
                        <h3>You've Earned ${dailyEarnings} for this Time</h3>
                    ) : ( <h4>No clock In or clock out data yet</h4> )}
                </section>
                <section className='tablesCont'>
                    <table className='totalsTable'>
                        <thead>
                            <tr>
                                <th>Total Hours Worked</th>
                                <th>Total Pay Recieved</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{totalHours} hours</td>
                                <td>${totalEarnings}</td>
                            </tr>
                        </tbody>
                    </table>
                    <HistoryTable histData={tableData}/>
                    <button onClick={(e) => {e.preventDefault(); clearHistory(); dbMeDataRefetch()}} className='clearHistButton'>Clear History</button>
                </section>
            </div>
          );
    } else {
        return (
            <div>
                <h2>Please Log In!</h2>
                <a href='/login'>Go To Log In!</a>
            </div>
        )
    }
  
};

export default Home;