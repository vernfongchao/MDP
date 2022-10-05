
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

                    <ul>
                        <li>
                            Integrated backend framework Flask/SQLalchemy with Amazon S3 bucket allowing users to store live image.
                        </li>
                        <li>
                            Refactored algorithm calls to help reduce update time by over 50%
                        </li>
                        <li>

                        </li>
                    </ul>
                }
            </div>
        </div>
    )
}

export default CreatorPicture