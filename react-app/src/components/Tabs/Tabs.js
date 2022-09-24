import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import NavBar from "../NavBar/SideNavBar/NavBar"

import * as mdIcons from 'react-icons/md'

import './Tabs.css'
const Tabs = () => {
    const user = useSelector(state => state.session.user)


    const [index, setIndex] = useState(0)

    const [tabs, setTabs] = useState([{ title: "Dash...",idx:0 }])

    useEffect(() => {
        if (!user) {
            setTabs([{ title: "Dash... ", idx: 0 }])
            setIndex(0)
        }
        // if(tabs){

        // }
    }, [user, tabs])

    const addTabs = async () => {
        setTabs([...tabs, { title: "Dash...", idx: 0 }])
        let currActive = await document.getElementsByClassName("active-tab")
        currActive[0].classList.remove("active-tab")
        currActive = await document.getElementsByClassName("tab-header-container")
        currActive[currActive.length - 1].classList.add("active-tab")
        setIndex(tabs.length)
    }


    const handleClick = (e, i) => {
        setIndex(i);
    }

    const removeTab = (e, i) => {
        if (tabs.length > 1) {
            const tabsToPop = [...tabs]
            tabsToPop.splice(i,1)
            setTabs(tabsToPop)
            if(index === i && index === 0){
                setIndex(0)
            }
            else if(index >= i){
                setIndex(index-1)
            }

        }
    }

    console.log(index)

    return (
        <div >
            <div className="tab-nav-container">
                {tabs?.map((tab, i) => (
                    <div key={i} className="tab-navbar-container">
                        <div className="tab-remove-icon-position">
                            <div className="tab-remove-icon-container">
                                {tabs.length !== 1 &&
                                    <mdIcons.MdCancel
                                        className="tab-remove-icon"
                                        onClick={e => removeTab(e, i)}

                                    />
                                }

                            </div>
                        </div>
                        <div className={i === index ? "active-tab tab-header-container" : "tab-header-container"} >
                            <h2 className="tab-header" onClick={e => handleClick(e, i)}>{tab.title}</h2>
                        </div>
                        <div className={i === index ? "tab-container" : "tab_container hidden"}>
                            <NavBar tabIndex={i} tabs={tabs} setTabs={setTabs} tab={tab}/>
                        </div>
                    </div>
                ))}
                {tabs.length < 11 && user && 
                    <div className="navbar-add-header-container">

                        <h1 className="add-tab-header" onClick={addTabs}>
                            +
                        </h1>
                    </div>
                }
            </div>
        </div>
    )
}

export default Tabs;