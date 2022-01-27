import PropTypes from 'prop-types'
import React from 'react'

function TrackItem({track}) {
    let images = track.album.images;

    return (
        <div className='row mb-2 result-item'>
            <div className="col-3">
                {images.length > 0 && images[images.length - 1].url ? 
                    <img src={images[images.length - 1].url} alt="album image" className='item-image'/>
                    : <div/>
                }
            </div>
            <div className="col-9">{track.name}</div>
        </div>
    )
}

TrackItem.propTypes = {
    track: PropTypes.object.isRequired
}

export default TrackItem
