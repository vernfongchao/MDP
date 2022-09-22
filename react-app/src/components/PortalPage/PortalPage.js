
import { useState } from "react"
import Tabs from "../Tabs/Tabs"
import './PortalPage.css'

const PortalPage = () => {

    const [tabs, setTabs] = useState([0, 0, 0])
    const [index, setIndex] = useState(0)

    const addTabs = () => {
        setTabs([...tabs, 0])
    }


    const deleteTabs = (e,i) => {
        const spliced = [...tabs].splice(i,1)

        setTabs(spliced)
    }

    // co

    const handleClick = (e, i) => {
        setIndex(i);
    }






    return (
        <div className="portalPage_outer_container">
            <div className="tab_nav_container">
                {tabs.map((tab,i) => (
                    <div>
                        <h1 onClick={e => handleClick(e, i)}>Hello</h1>
                    <div className={i===index ? "tab_container" : "tab_container hidden"}>
                        {/* Delete Tabs button */}
                        <Tabs />

                    </div>
                    </div>
                ))}
                <div>
                    {/* Add Tabs button */}
                </div>
            </div>

        </div>
    )


}

export default PortalPage;