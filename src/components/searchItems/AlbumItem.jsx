import {useContext, useState} from 'react'
import PropTypes from 'prop-types'
import music from '../assets/music.png'
import React from 'react'
import {Modal, Container, Row, Col} from 'react-bootstrap';
import SpotifyContext from '../context/spotify/SpotifyContext';
import {FaAngleDoubleLeft, FaAngleDoubleRight} from 'react-icons/fa'


function AlbumItem({album}) {
    let images = album.images;
    const {getAlbumTracks, currentAlbumTracks, tracksChange} = useContext(SpotifyContext);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = (e) => {
        e.preventDefault();
        getAlbumTracks(album.id)
        setShow(true)
    }

    const handlePrev = (e) => {
        e.preventDefault();
        tracksChange(currentAlbumTracks.previous);
    }

    const handleNext = (e) => {
        e.preventDefault();
        tracksChange(currentAlbumTracks.next);
    }


    const formatTime = (time) => {
        let minutes = Math.trunc(time / 60000);

        let seconds = Math.trunc(time / 1000) % 60;
        if(seconds.toString().length == 1){
            seconds = `0${seconds}`;
        }

        return `${minutes}:${seconds}`;
    }

    const modalBackground = {
        backgroundImage: `url(${images.length > 0 ? images[0].url : music})`,
        background: `-webkit-linear-gradient(bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), url(${images.length > 0 ? images[0].url : music}) center center no-repeat`,
        backgroundSize: 'cover'
    }

    return (
        <div className='card shadow-lg'>
            <div className="card-body">
                <div>
                    <div className="avatar">
                        <div className="rounded-full w-14 h-14">
                            {images.length > 0 && images[images.length - 1].url ? 
                                <img images src={images[images.length - 1].url} alt="album image" className='avatar-image'/>
                                : <img src={music} alt="album image" className='avatar-image'/>
                            }
                        </div>
                    </div>
                </div>
                <div className="card-title">
                    <p className="card-title-name" onClick={handleShow}>{album.name}</p>
                </div>
            </div>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Body className="item-modal" style={modalBackground}>
                    <Container>
                        <Row>
                            <Col xs={12} className='modal-title'>
                                <h1>
                                    {album.name}
                                </h1>
                                <h5>{album.release_date}</h5>
                            </Col>
                            <Col className="modal-card-container">
                                {currentAlbumTracks.items && currentAlbumTracks.items.map(track => (
                                    <div className='card shadow-sm modal-card'>
                                        <div className="card-title track-title">
                                            {formatTime(track.duration_ms)} - {track.name}
                                        </div>
                                    </div>
                                ))}
                            </Col>
                            <Row>
                                <Col xs={6} className='text-center text-white'>
                                    <button onClick={handlePrev} className="btn btn-outline-secondary nav-button" disabled={!currentAlbumTracks.previous}>
                                        <FaAngleDoubleLeft className='icon-class'/>
                                    </button>
                                </Col>
                                <Col xs={6} className='text-center text-white'>
                                    <button onClick={handleNext} className="btn btn-outline-secondary nav-button" disabled={!currentAlbumTracks.next}>
                                        <FaAngleDoubleRight className='icon-class'/>
                                    </button>
                                </Col>
                            </Row>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </div>
    )
}

AlbumItem.propTypes = {
    album: PropTypes.object.isRequired
}

export default AlbumItem
