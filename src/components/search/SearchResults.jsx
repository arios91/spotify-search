import {useContext} from 'react'
import SpotifyContext from "../context/spotify/SpotifyContext";
import ResultSection from './ResultSection';

function SearchResults() {
    const {results} = useContext(SpotifyContext)
    let {artists, albums, tracks} = results;

    return !results.tracks ? <div/> :
        <div className="row text-center mt-5">
            <ResultSection header='Artists' collection={artists}/>
            <ResultSection header='Albums' collection={albums}/>
            <ResultSection header='Tracks' collection={tracks}/>
        </div>
    
}

export default SearchResults
