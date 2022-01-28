import PropTypes from 'prop-types'
import music from '../assets/music.png'
import React from 'react'

function AlbumItem({album}) {
    let images = album.images;

    const handleClick = (e) => {
        e.preventDefault();
        console.log('click');
        console.log(album);
    }

    return (
        <div className='card shadow-lg'>
            <div className="card-body">
                <div>
                    <div className="avatar">
                        <div className="rounded-full w-14 h-14">
                            {images.length > 0 && images[images.length - 1].url ? 
                                <img src={images[images.length - 1].url} alt="album image" className='avatar-image'/>
                                : <img src={music} alt="album image" className='avatar-image'/>
                            }
                        </div>
                    </div>
                </div>
                <div className="card-title">
                    <p className="card-title-name">{album.name}</p>
                </div>
            </div>
        </div>
    )
}

AlbumItem.propTypes = {
    album: PropTypes.object.isRequired
}

export default AlbumItem
