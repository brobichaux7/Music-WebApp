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

		// // Api call for retrieving token
		// axios('https://accounts.spotify.com/api/token', {
		// 	'method': 'POST',
		// 	'headers': {
		// 		 'Content-Type':'application/x-www-form-urlencoded',
		// 		 'Authorization': 'Basic ' + btoa('48fec7da4a694ec0a3241be884d99abe:86310732c9a042dbb498327161686623'),
		// 	},
		// 	data: 'grant_type=client_credentials'
		// }).then(tokenresponse => {
		// 	console.log(tokenresponse.data.access_token);
		// 	setToken(tokenresponse.data.access_token);

		// 	// Api call for retrieving results data
		// 	axios(`https://api.spotify.com/v1/albums/${id}?market=US`,{
		// 		'method': 'GET',
		// 		'headers': {
		// 			'Content-Type': 'application/json',
		// 			'Accept': 'application/json',
		// 			'Authorization': 'Bearer ' + tokenresponse.data.access_token
		// 		}
		// 	}).then(res => {
		// 		console.log(res.data);
		// 		setAlbumInfo(res.data);
		// 	}).catch(error=> console.log(error))
		// }).catch(error => console.log(error));

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
                <Nav.Link href="search/albums">Search Albums</Nav.Link>
                <Nav.Link href="search/artists">Search Artists</Nav.Link>
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
            {
                albumInfo.images === undefined ? <img src="https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=160" alt=" "/>
                : <img src={albumInfo.images[1].url} alt=" " width="200"/>
            }
            <p>
                {
                    songs.map((song, i) => {
                        return (
                            <div key={i}>
                                <p>{song.track_number}</p>
                                <p>{song.name}</p>
                                {/* <p>{song.preview_url}</p> */}
                                <p>{song.explicit}</p>
                            </div>
                        )
                    })
                }
            </p>
        </div>
    </fieldset>
  )
}

export default DisplayAlbum