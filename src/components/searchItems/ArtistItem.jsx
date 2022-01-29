import {useContext, useState} from 'react'
import SpotifyContext from "../context/spotify/SpotifyContext";
import PropTypes from 'prop-types'
import music from '../assets/music.png'
import React from 'react'
import {Modal, Container, Row, Col} from 'react-bootstrap';
import {FaAngleDoubleLeft, FaAngleDoubleRight} from 'react-icons/fa'

function ArtistItem({artist}) {
    let images = artist.images;
    const {getArtistAlbums, currentArtistAlbums, albumChange} = useContext(SpotifyContext)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    
    const handleShow = (e) => {
        e.preventDefault();
        getArtistAlbums(artist.id);
        setShow(true);
    }

    const handlePrev = (e) => {
        e.preventDefault();
        albumChange(currentArtistAlbums.previous);
    }

    const handleNext = (e) => {
        e.preventDefault();
        albumChange(currentArtistAlbums.next);
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
                        <div className="rounded-full">
                            {images.length > 0 && images[images.length - 1].url ? 
                                <img src={images[images.length - 1].url} alt="artist image" className='avatar-image'/>
                                : <img src={music} alt="artist image" className='avatar-image'/>
                            }
                        </div>
                    </div>
                </div>
                <div className="card-title">
                    <p className="card-title-name" onClick={handleShow}>{artist.name}</p>
                </div>
            </div>


            <Modal show={show} onHide={handleClose} centered >
                <Modal.Body className='item-modal' style={modalBackground}>
                    <Container>
                        <Row>
                            <Col xs={12} className='modal-title'>
                                <h1>
                                    {artist.name} - albums
                                </h1>
                            </Col>
                            <Col className='modal-card-container'>
                                {currentArtistAlbums.items && currentArtistAlbums.items.map(album => (
                                    <div className="card shadow-sm modal-card">
                                        <div className="card-body">
                                            <div>
                                                <div className="avatar">
                                                    <div className="rounded-full">
                                                        {album.images.length > 0 && album.images[album.images.length - 1].url ? 
                                                            <img src={album.images[album.images.length - 1].url} alt="album image" className='avatar-image'/>
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
                                ))}
                            </Col>
                            <Row>
                                <Col xs={6} className='text-center text-white'>
                                    <button onClick={handlePrev} className="btn btn-outline-secondary nav-button" disabled={!currentArtistAlbums.previous}>
                                        <FaAngleDoubleLeft className='icon-class'/>
                                    </button>
                                </Col>
                                <Col xs={6} className='text-center text-white'>
                                    <button onClick={handleNext} className="btn btn-outline-secondary nav-button" disabled={!currentArtistAlbums.next}>
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

ArtistItem.propTypes = {
    artist: PropTypes.object.isRequired
}

export default ArtistItem
