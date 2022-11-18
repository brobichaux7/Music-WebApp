import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import musicStyle from './Home.module.css'
import {Navbar, Container, Nav, Button, Table} from 'react-bootstrap'

const DisplayArtist = () => {
    
    const [artistInfo, setArtistInfo] = useState([]);
    const [facts, setFacts] = useState([]);

    const { id } = useParams();

    useEffect(()=>{

        const options = {
            method: 'GET',
            url: 'https://spotify23.p.rapidapi.com/artists/',
            params: {ids: id},
            headers: {
              'X-RapidAPI-Key': 'd88a07d653mshc6ed809197dfab7p1728b6jsn9029cf1ca0d6',
              'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
            }
          };
          
          axios.request(options).then(function (res) {
              console.log(res.data.artists[0]);
              setArtistInfo(res.data.artists[0]);
              setFacts(res.data.artists[0].tracks.items)
              
          }).catch(function (error) {
              console.error(error);
          });
	}, [id])

  return (
    <fieldset className={musicStyle.bgColor}>
        <Navbar bg="primary" variant="dark" expand="lg">
            <Container>
            <Navbar.Brand href="#home">LOGO</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/search/artists">Search Artists</Nav.Link>
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
            
            <div>
                {
                    artistInfo.images === undefined ? (
                    <div className={musicStyle.container}>
                        <div className={musicStyle.spin} id={musicStyle.loader}></div>
                        <div className={musicStyle.spin} id={musicStyle.loader2}></div>
                        <div className={musicStyle.spin} id={musicStyle.loader3}></div>
                        <div className={musicStyle.spin} id={musicStyle.loader4}></div>
                        <span id={musicStyle.text}>LOADING...</span>
                    </div>)
                    : <div className={musicStyle.dFlex}>
                        <div>
                            <h1><b>{artistInfo.name}</b></h1>
                            <div>
                                <div>
                                    <img src={artistInfo.images[0].url} alt="" width="200"/></div>
                                </div>
                                <div>
                                    <p><b>Followers:</b> {artistInfo.followers.total}</p>
                                    <p><b>Music Genre:</b> {artistInfo.genres[0]}</p>
                                    <p><b>Popularity Rating:</b> {artistInfo.popularity}</p>
                                </div>
                            </div>

                        </div>
                        
                }
            </div>
            <Table bordered hover className={musicStyle.tableBgColor}>
                <thead>
                    <tr>
                        <th scope='col'>Track Number</th>
                        <th scope='col'>Fact Name</th>
                        <th scope='col'>Explicit</th>
                        <th scope='col'>Fact Preview</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        facts.map((fact, i) => {
                            return (
                                <tr key={i}>
                                    <td>{fact.track_number}</td>
                                    <td><a href={fact.external_urls.spotify}>{fact.name}</a></td>
                                    <td>{fact.explicit ? "Yes" : "No"}</td>
                                    <td>
                                        <audio controls>
                                            <source src={fact.preview_url} />
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

export default DisplayArtist