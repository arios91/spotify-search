import PropTypes from 'prop-types'
import React from 'react'

function AlbumItem({album}) {
    let images = album.images;
    return (
        <div className='row mb-2 result-item'>
            <div className="col-3">
                {images.length > 0 && images[images.length - 1].url ? 
                    <img src={images[images.length - 1].url} alt="album image" className='item-image'/>
                    : <div/>
                }
            </div>
            <div className="col-9">{album.name}</div>
        </div>
    )
}

AlbumItem.propTypes = {
    album: PropTypes.object.isRequired
}

export default AlbumItem
