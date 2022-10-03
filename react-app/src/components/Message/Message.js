
import './Message.css'

const Message = ({ idx }) => {
    return (
        <div className={idx === 6 ? "message-page-container hidden" : "message-page-container"}>
            <h1>Feature will be added in the near future!</h1>

        </div>
    )
}

export default Message