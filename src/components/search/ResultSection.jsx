import {useContext} from 'react'
import PropTypes from 'prop-types'
import AlbumItem from '../searchItems/AlbumItem';
import ArtistItem from '../searchItems/ArtistItem';
import TrackItem from '../searchItems/TrackItem';
import SpotifyContext from "../context/spotify/SpotifyContext";
import {FaAngleDoubleLeft, FaAngleDoubleRight} from 'react-icons/fa'

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
                    <button onClick={handlePrev} className="btn btn-outline-secondary nav-button" disabled={collection.offset == 0}>
                        <FaAngleDoubleLeft className='icon-class'/>
                    </button>
                </div>
                <div className="col-8">
                    {header}
                </div>
                <div className="col-2">
                    <button onClick={handleNext} className="btn btn-outline-secondary nav-button">
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
