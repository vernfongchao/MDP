
import './Fee.css'

const Fee = ({idx}) => {
    return(
        <div className={idx === 3 ? "fee-page-container hidden" : "fee-page-container"}>
            <h1 className='fee-header'>Feature will be added in the near future!</h1>

        </div>
    )
}

export default Fee