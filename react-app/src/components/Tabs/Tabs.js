import { useState } from "react"
import NavBar from "../PortalNavBar/NavBar"

import './Tabs.css'
const Tabs = () => {
    const [index, setIndex] = useState(0)

    const [tabs, setTabs] = useState([{ title: "Dash... "}])

    const addTabs = async () => {
        setTabs([...tabs, { title: "Report" }])
        let currActive = await document.getElementsByClassName("active-tab")
        currActive[0].classList.remove("active-tab")
        currActive = await document.getElementsByClassName("tab-header-container")
        currActive[currActive.length-1].classList.add("active-tab")
        console.log(tabs.length)
        setIndex(tabs.length)
    }

    const deleteTabs = (e, i) => {
        const spliced = [...tabs].splice(i, 1)
        setTabs(spliced)
    }

    const handleClick = (e, i) => {
        setIndex(i);
    }

    return (
        <div >
            <div className="tab_nav_container">
                {tabs.map((tab, i) => (
                    <div className="tab-navbar-container">
                        <div className={i === index ? "active-tab tab-header-container" : "tab-header-container"} >
                            <h1 className="tab-header" onClick={e => handleClick(e, i)}>{tab.title}</h1>
                        </div>
                        <div className={i === index ? "tab_container" : "tab_container hidden"}>
                            {/* Delete Tabs button */}
                            <NavBar tabIndex={i} tabs={tabs} setTabs={setTabs} />
                        </div>
                    </div>
                ))}
                <h1 className="add-tab-header" onClick={addTabs}>
                    +
                </h1>

            </div>
        </div>
    )
}

export default Tabs;