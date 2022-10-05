
import './CreatorSocial.css'

const CreatorSocial = ({ index }) => {
    return (
        <div className='creator-social-page-container'>
            <div className='creator-social-header-link-container'>
                <div className='creator-social-header-container'>
                    <h2>Socials</h2>

                </div>
                {index === 0 &&
                    <div className='creator-social-verns-links'>
                        <div className="creator-social-links-container">
                            <a className="creator-social-portfolio-link" href="https://vernfongchao.github.io" target="_blank" rel="noopener noreferrer">
                                Portfolio
                            </a>
                        </div>
                        <div className="creator-social-links-container">
                            <a className="creator-social-portfolio-link" href="https://www.linkedin.com/in/vern-chao-a2960a123/" target="_blank" rel="noopener noreferrer">
                                LinkedIn
                            </a>
                        </div>
                        <div className="creator-social-links-container">
                            <a className="creator-social-portfolio-link" href="https://github.com/vernfongchao" target="_blank" rel="noopener noreferrer">
                                GitHub
                            </a>
                        </div>
                    </div>
                }

            </div>

        </div>
    )

}

export default CreatorSocial