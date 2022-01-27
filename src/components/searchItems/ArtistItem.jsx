import PropTypes from 'prop-types'
import React from 'react'

function ArtistItem({artist}) {
    let images = artist.images;

    return (
        <div className='row mb-2 result-item'>
            <div className="col-3">
                {images.length > 0 && images[images.length - 1].url ? 
                    <img src={images[images.length - 1].url} alt="artist image" className='item-image'/>
                    : <div/>
                }
            </div>
            <div className="col-9">{artist.name}</div>
        </div>
    )
}

ArtistItem.propTypes = {
    artist: PropTypes.object.isRequired
}

export default ArtistItem
