import {useContext} from 'react'
import PropTypes from 'prop-types'
import AlbumItem from '../searchItems/AlbumItem';
import ArtistItem from '../searchItems/ArtistItem';
import TrackItem from '../searchItems/TrackItem';
import SpotifyContext from "../context/spotify/SpotifyContext";
import {FaAngleDoubleLeft, FaAngleDoubleRight} from 'react-icons/fa'

/*
    Container for search results, takes in a header and a collection of items (artists, albums, tracks)
    Handles user navigating to previous and next search results
    It creates a user,album,track Item depending on the collection passed
    Although the xItems are very similar, I created a unique one for each collection for easier customization
*/

function ResultSection({header, collection}) {
    const {pageChange} = useContext(SpotifyContext)

    const handlePrev = (e) => {
        e.preventDefault();
        pageChange(collection.previous, header);
    }

    const handleNext = (e) => {
        e.preventDefault();
        pageChange(collection.next, header);
    }


    return (
        <div className="col-12 col-md-4 col-lg-4 result-section">
            <div className="col-12 row grid-title">
                <div className="col-2">
                    <button onClick={handlePrev} className="btn btn-outline-secondary nav-button" disabled={!collection.previous}>
                        <FaAngleDoubleLeft className='icon-class'/>
                    </button>
                </div>
                <div className="col-8">
                    {header}
                </div>
                <div className="col-2">
                    <button onClick={handleNext} className="btn btn-outline-secondary nav-button" disabled={!collection.next}>
                        <FaAngleDoubleRight className='icon-class'/>
                    </button>
                </div>
            </div>
            {collection.items.map(item => (
                header == 'Artists' ?
                <ArtistItem key={item.id} artist={item}/> :
                header == 'Albums' ?
                <AlbumItem key={item.id} album={item}/> :
                header == 'Tracks' ?
                <TrackItem key={item.id} track={item}/> : <div/>
            ))}
    </div>
    )

}

ResultSection.propTypes = {
    header: PropTypes.string,
    collection: PropTypes.object.isRequired
}

export default ResultSection
