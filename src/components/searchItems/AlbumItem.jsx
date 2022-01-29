import {useContext, useState} from 'react'
import PropTypes from 'prop-types'
import music from '../assets/music.png'
import React from 'react'
import {Modal, Container, Row, Col} from 'react-bootstrap';
import SpotifyContext from '../context/spotify/SpotifyContext';

function AlbumItem({album}) {
    let images = album.images;
    const {getAlbumTracks} = useContext(SpotifyContext);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = (e) => {
        e.preventDefault();
        console.log('click');
        console.log(album);
        getAlbumTracks(album.id)
        setShow(true)
    }

    const modalBackground = {
        backgroundImage: `url(${images.length > 0 ? images[0].url : music})`,
        background: `-webkit-linear-gradient(bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), url(${images.length > 0 ? images[0].url : music}) center center no-repeat`,
        backgroundSize: 'cover'
    }

    /*
        For albums, I would like to see the 
        album artwork, 
        the album name, 
        the release date, 
        and a list of tracks and track length
    */

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
                    <p className="card-title-name" onClick={handleShow}>{album.name}</p>
                </div>
            </div>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Body className="item-modal" style={modalBackground}>
                    <Container>
                        <Row>
                            <Col xs={12} className='modal-title'>
                                <h1>
                                    {album.name} - {album.release_date}
                                </h1>
                            </Col>
                            <Col className="modal-card-container">
                                test
                            </Col>
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
