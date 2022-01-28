import PropTypes from 'prop-types'
import music from '../assets/music.png'
import React from 'react'

function TrackItem({track}) {
    let images = track.album.images;

    const handleClick = (e) => {
        e.preventDefault();
        console.log('click');
        console.log(track);
    }

    return (
        <div className='card shadow-lg'>
            <div className="card-body">
                <div>
                    <div className="avatar">
                        <div className="rounded-full w-14 h-14">
                            {images.length > 0 && images[images.length - 1].url ? 
                                <img src={images[images.length - 1].url} alt="track image" className='avatar-image'/>
                                : <img src={music} alt="track image" className='avatar-image'/>
                            }
                        </div>
                    </div>
                </div>
                <div className="card-title">
                    <p className="card-title-name">{track.name}</p>
                </div>
            </div>
        </div>
    )
}

TrackItem.propTypes = {
    track: PropTypes.object.isRequired
}

export default TrackItem
