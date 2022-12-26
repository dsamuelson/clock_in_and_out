import React, { useEffect, useState } from 'react';

const Home = () => {
    const [salary, setSalary] = useState()
    const [clockedIn, setClockedIn] = useState(false)
    const [inTime, setInTime] = useState(new Date())
    const [outTime, setOutTime] = useState(new Date())

    useEffect(() => {
        console.log(salary)
    },[salary, setSalary])

    useEffect(() => {
        console.log(clockedIn)
    },[clockedIn, setClockedIn])

    useEffect(() => {
        console.log(inTime)
    }, [inTime, setInTime])

    useEffect(() => {
        console.log(outTime)
    }, [outTime, setOutTime])

  return (
    <div>
        <section>
            <h2>Salary/Per Hour</h2>
            {!salary && (
                <form>
                    <input type="text" id='salaryValue' name='salaryValue' onSubmit={(e) => {setSalary(e.target.value)}}/>
                    <button>Submit</button>
                </form>
            )}
            
        </section>
        {clockedIn? (
            <button onClick={() => {setClockedIn(false); setInTime(new Date())}}>Clock Out</button>
        ) : (
            <button onClick={() => {setClockedIn(true); setOutTime(new Date())}}>Clock In</button>
        )}
        <section>

        </section>
    </div>
  );
};

export default Home;