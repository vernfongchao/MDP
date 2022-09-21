
import {useState} from "react"
import Tabs from "../Tabs/Tabs"

const PortalPage = () => {

    const [tabs,setTabs] = useState([0])





    return(
        <div>

            {tabs.map(tab => (
                <Tabs/ >
            ))}


        </div>
    )


}

export default PortalPage