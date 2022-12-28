import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { CLEAR_HISTORY } from "../../utils/mutations";

function HistoryTable(props) {
    const [ useProps, setProps] = useState(props)

    useEffect(() => {
        setProps(props.histData)
    }, [props])

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
                                    <td>{field.clockedOutTime? field.workedTime : 'TBD'}</td>
                                    <td>{field.clockedOutTime? field.paidTime : 'TBD'}</td>
                                </tr>    
                            // </React.Fragment>
                        )
                    }) : null}
                </tbody>
            </table>
        </div>
    )
}

export default HistoryTable;