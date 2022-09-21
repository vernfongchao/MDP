
import { useState } from "react"
import Tabs from "../Tabs/Tabs"

const PortalPage = () => {

    const [tabs, setTabs] = useState([0])

    const addTabs = () => {
        setTabs([...tabs, 0])
    }


    const deleteTabs = (e,i) => {
        const spliced = [...tabs].splice(i,1)

        setTabs(spliced)
    }

    // co








    return (
        <div>

            {tabs.map((tab,i) => (
                <div>
                    {/* Delete Tabs button */}
                    <Tabs />

                </div>
            ))}
            <div>
                {/* Add Tabs button */}
            </div>

        </div>
    )


}

export default PortalPage