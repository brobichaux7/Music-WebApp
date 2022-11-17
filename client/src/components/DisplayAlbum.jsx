import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import musicStyle from './Home.module.css'
import {Navbar, Container, Nav, Button, Table} from 'react-bootstrap'

const DisplayAlbum = () => {

    const [albumInfo, setAlbumInfo] = useState([]);
    const [songs, setSongs] = useState([]);

    const { id } = useParams();

    useEffect(()=>{

        const options = {
            method: 'GET',
            url: 'https://spotify23.p.rapidapi.com/albums/',
            params: {ids: id},
            headers: {
              'X-RapidAPI-Key': 'd88a07d653mshc6ed809197dfab7p1728b6jsn9029cf1ca0d6',
              'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
            }
          };
          
          axios.request(options).then(function (res) {
              console.log(res.data.albums[0]);
              setAlbumInfo(res.data.albums[0]);
              setSongs(res.data.albums[0].tracks.items)
              
          }).catch(function (error) {
              console.error(error);
          });
	}, [id])

  return (
    <fieldset>
        <Navbar bg="primary" variant="dark" expand="lg">
            <Container>
            <Navbar.Brand href="#home">LOGO</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/search/albums">Search Albums</Nav.Link>
                <Nav.Link href="/search/artists">Search Artists</Nav.Link>
                </Nav>
                <Nav>
                </Nav>
            </Navbar.Collapse>
            </Container>
            <Link to="/login">
            <Button>Login</Button>&nbsp;&nbsp;&nbsp;
            </Link>
        </Navbar>
        <div className={musicStyle.displayCenter}>
            <h1>{albumInfo.name}</h1>
            <div>
                {
                    albumInfo.images === undefined ? (
                    <div className={musicStyle.container}>
                        <div className={musicStyle.spin} id={musicStyle.loader}></div>
                        <div className={musicStyle.spin} id={musicStyle.loader2}></div>
                        <div className={musicStyle.spin} id={musicStyle.loader3}></div>
                        <div className={musicStyle.spin} id={musicStyle.loader4}></div>
                        <span id={musicStyle.text}>LOADING...</span>
                    </div>)
                    : <img src={albumInfo.images[1].url} alt=" " width="200"/>
                }
            </div>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th scope='col'>Track Number</th>
                        <th scope='col'>Song Name</th>
                        <th scope='col'>Explicit</th>
                        <th scope='col'>Song Preview</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        songs.map((song, i) => {
                            return (
                                <tr key={i}>
                                    <td>{song.track_number}</td>
                                    <td><Link to={song.external_urls.spotify}>{song.name}</Link></td>
                                    <td>{song.explicit ? "Yes" : "No"}</td>
                                    <td>
                                        <audio controls>
                                            <source src={song.preview_url} />
                                        </audio>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    </fieldset>
  )
}

export default DisplayAlbum