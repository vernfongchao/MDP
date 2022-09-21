import { useEffect } from "react"

import "./Reports.css"


const Reports = ({idx}) => {

    useEffect(() => {
        
    },[idx]) 



    return (
        <div className={idx === 0 ? "classname" : "hidden" }>
            <h1>Reports Page</h1>
        </div>
    )
}

export default Reports