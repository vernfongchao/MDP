
import './CreatorPicture.css'

const CreatorPicture = ({ index, creators }) => {

    const creator = creators[index]

    const handleImageError = (e) => {
        e.target.src = "https://i.pinimg.com/474x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg"
    }

    return (
        <div className='creator-picture-page-container'>
            <img className='creator-picture'
                alt='creator'
                src={creator?.img}
                onError={handleImageError}
            ></img>
            <h2 className='creator-picture-contribution-header'>
                Contributions
            </h2>
            <div className='creator-picture-about-container'>
                {index === 0 &&

                    <ul className='creator-picture-contributions-ul'>
                        <li>
                            Constructed <strong>REST APIs</strong> and <strong>System Designs</strong> allowing app to reliably and efficiently read and send consistent data between User UI <strong>React</strong> server and Flask server.
                        </li>
                        <li>
                            Assimilated <strong>WebSockets</strong> to frontend and backend allowing full text communication to be saved, sent, and updated in <string>real time</string> between staff members.
                        </li>
                        <li>
                            Refactored algorithm calls to help reduce function calls from <strong>quadratic to linear</strong> time.
                        </li>
                    </ul>
                }
                {index === 2 &&

                    <ul className='creator-picture-contributions-ul'>
                        <li>
                            User tested finding multiple bugs on message feature and made thought suggestions to reverse reports.
                        </li>
                        {/* <li>
                            Assimilated <strong>WebSockets</strong> to frontend and backend allowing full text communication to be saved, sent, and updated in <string>real time</string> between staff members.
                        </li>
                        <li>
                            Refactored algorithm calls to help reduce function calls from <strong>quadratic to linear</strong> time.
                        </li> */}
                    </ul>
                }

            </div>
        </div>
    )
}



export default CreatorPicture