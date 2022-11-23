import { useSelector } from 'react-redux'

import './Conditions.css'

const Condition = ({idx}) => {
    const conditions = Object.values(useSelector(state => state.conditions))
    

    return(
        <div className={idx === 3 ? "condition-page-container hidden" : "condition-page-container"}>
            <div>
                <h1 className='condition-header'>Conditions</h1>
            </div>
            <div className='condition-page-conditions-container'>
                {conditions?.map(condition =>(
                    <div className='condition-page-cards-container'>
                        <p className='condition-page-cards-container-name'>{condition.name}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Condition