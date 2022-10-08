
import './CreatorPicture.css'

const CreatorPicture = ({ index, creators }) => {

    const creator = creators[index]

    const handleImageError = (e) => {
        e.target.src = "https://i.pinimg.com/474x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg"
    }

    return (
        <div className='creator-picture-page-container'>
            <img className='creator-picture'
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
                            Homogenized <strong>AWS</strong> cloud storage and Flask allowing users to upload or delete image file objects from my <strong>S3 bucket</strong> for patient and staff profiles.
                        </li>
                        <li>
                            Refactored algorithm calls to help reduce function calls from quadratic time to linear time.
                        </li>
                        <li>
                            Constructed <strong>REST APIs</strong> and <strong>System Designs</strong> allowing app to reliably and efficiently read and send consistent data between User UI <strong>React</strong> server and Flask server.
                        </li>
                    </ul>
                }
            </div>
        </div>
    )
}



export default CreatorPicture