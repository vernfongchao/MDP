
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
                            Harnessed <span style={{ fontWeight: "bold" }}>Redux</span> for unidirectional state management simplifying <span style={{ fontWeight: "bold" }}>React</span> components and directly managing data for form inputs and submissions.
                        </li>
                        <li>
                            Interconnected <span style={{ fontWeight: "bold" }}>AWS</span> for cloud storage to allow users to store live image files and storing its live url with Flask backend to ensure images display correctly with the utmost quality.
                        </li>
                        <li>
                            Refactored algorithm calls to help reduce function calls from multiple <span style={{ fontWeight: "bold" }}>CRUD</span> features quadratic to linear time.
                        </li>
                    </ul>
                }
            </div>
        </div>
    )
}

export default CreatorPicture