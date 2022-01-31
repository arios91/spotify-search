import {useContext, useState} from 'react'
import PropTypes from 'prop-types'
import music from '../assets/music.png'
import React from 'react'
import {Modal, Container, Row, Col} from 'react-bootstrap';

function TrackItem({track}) {
    let images = track.album.images;
    const [show, setShow] = useState(false);
    const [trackAlbum, setTrackAlbum] = useState(null)
    const [trackArtist, setTrackArtist] = useState(null)

    const handleClose = () => setShow(false);

    const handleShow = (e) => {
        e.preventDefault();
        setTrackAlbum(track.album);
        setTrackArtist(track.artists[0]);
        setShow(true)
    }

    const modalBackground = {
        backgroundImage: `url(${images.length > 0 ? images[0].url : music})`,
        background: `-webkit-linear-gradient(bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), url(${images.length > 0 ? images[0].url : music}) center center no-repeat`,
        backgroundSize: 'cover'
    }

    const formatTime = () => {
        let time = track.duration_ms
        let minutes = Math.trunc(time / 60000);

        let seconds = Math.trunc(time / 1000) % 60;
        if(seconds.toString().length == 1){
            seconds = `0${seconds}`;
        }

        return `${minutes}:${seconds}`;
    }

    
    const displayTrackDetails = () =>{
        let artist = 'Track Information Unavailable'
        if(trackArtist){
            artist  = trackArtist.name;
        }
        let album = 'Album Information Unavailable';
        if(trackAlbum){
            album = `${trackAlbum.name}\n${trackAlbum.release_date}`
        }

        return `${artist} \n${album} \n${formatTime()}`;
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
                    <p className="card-title-name" onClick={handleShow}>{track.name}</p>
                </div>
            </div>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Body className='item-modal track-modal' style={modalBackground}>
                    <Container>
                        <Row>
                            <Col xs={12} className='modal-title'>
                                <h3>{track.name}</h3>
                                <p className='track-details'>{displayTrackDetails()}</p>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </div>
    )
}

TrackItem.propTypes = {
    track: PropTypes.object.isRequired
}

export default TrackItem
