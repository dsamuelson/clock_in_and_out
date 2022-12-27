import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { CLEAR_HISTORY } from "../../utils/mutations";

function HistoryTable(props) {
    const [ useProps, setProps] = useState(props)

    const [ clearHistory ] = useMutation(CLEAR_HISTORY)

    useEffect(() => {
        setProps(props.histData)
    }, [props])

    useEffect(() => {
        console.log(useProps)
    }, [useProps, setProps])

    return (
        <div className="histTable">
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Clocked In</th>
                        <th>clocked out</th>
                        <th>Hours Worked</th>
                        <th>Pay</th>
                    </tr>
                </thead>
                <tbody>
                    {useProps.length ? useProps[0].map((field) => {    
                        return (
                            // <React.Fragment key={field._id}>
                                <tr key={field._id}>
                                    <td>{field.forDate}</td>
                                    <td>{new Date(parseInt(field.clockedInTime)).toLocaleTimeString()}</td>
                                    <td>{new Date(parseInt(field.clockedOutTime)).toLocaleTimeString()}</td>
                                    <td>{field.clockedOutTime? ((parseInt(field.clockedOutTime) - parseInt(field.clockedInTime))/(1000 * 60 * 60)).toFixed(2) : 'TBD'}</td>
                                    <td>{field.clockedOutTime? (((parseInt(field.clockedOutTime) - parseInt(field.clockedInTime))/(1000 * 60 * 60)) * parseInt(field.payAmount)).toFixed(2) : 'TBD'}</td>
                                </tr>    
                            // </React.Fragment>
                        )
                    }) : null}
                </tbody>
            </table>
            <button onClick={(e) => {e.preventDefault(); clearHistory(); setProps(props)}}>Clear History</button>
        </div>
    )
}

export default HistoryTable;