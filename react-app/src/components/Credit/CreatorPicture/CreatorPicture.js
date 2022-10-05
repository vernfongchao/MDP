
import './CreatorPicture.css'

const CreatorPicture = ({ index, creators }) => {

    const creator = creators[index]

    return (
        <div className='creator-picture-page-container'>
            <img className='creator-picture'
                src={creator?.img}></img>
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