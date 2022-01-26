import {Link} from 'react-router-dom';
import {FaSpotify} from 'react-icons/fa'

function Navbar() {
    return (
        <nav className="navbar navbar-dark bg-dark mb-5">
            <div className="container mx-auto">
                <div className="flex-none pr-2 mx-2">
                    <FaSpotify className='inline pr-2 brand-icon'/>
                    <Link to='/' className='font-bold align-middle brand'>
                        Spotify Autocomplete
                    </Link>
                </div>
                <div className="flex-1 px-2 mx-2">
                    <div className="d-flex justify-content-end">
                        <Link to='/' className='btn btn-outline-secondary nav-button'>
                            Home
                        </Link>
                        <Link to='/about' className='btn btn-outline-secondary nav-button'>
                            About
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
