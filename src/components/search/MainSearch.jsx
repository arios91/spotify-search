import {useContext, useEffect} from 'react'
import SpotifyContext from "../context/spotify/SpotifyContext";

/*
    Main Search container, 
    this contains the main search input box and calls the context provider to make the API calls.
*/

function MainSearch() {
    const {searchSpotify, clearResults, getToken, spotifyToken} = useContext(SpotifyContext)

    useEffect(() => {
        if(!spotifyToken){
            getToken();
        }
    }, [])

    const handleSearchChange = (e) => {
        e.preventDefault();
        let searchTerm = e.target.value;
        if(searchTerm.length == 0){
            clearResults();
        }else if(searchTerm.length > 1){
            searchSpotify(searchTerm);
        }
    }

    return (
        <div className="row">
            <div className="col-1 col-md-2 col-lg-2"></div>
                <div className='col-10 col-md-8 col-lg-8'>
                    <div className="relative">
                        <form>
                            <div className="form-control p-0">
                                <input 
                                    type="text" 
                                    onChange={handleSearchChange}
                                    className='w-100 searchInput'
                                    placeholder='Search'/>
                            </div>
                        </form>
                    </div>
                </div>
            <div className="col-1 col-md-2 col-lg-2"></div>
        </div>
    )
}

export default MainSearch
