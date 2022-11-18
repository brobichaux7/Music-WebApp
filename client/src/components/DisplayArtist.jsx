import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import musicStyle from './Home.module.css'
import {Navbar, Container, Nav, Button, Table} from 'react-bootstrap'


const DisplayArtist = () => {
    
    // result variables
    const [artistInfo, setArtistInfo] = useState({});
    const [topTracks, setTopTracks] = useState([]);
    const [related, setRelated] = useState([]);

    // if results are loaded or not variables
    const [loaded, setLoaded] = useState(false);

    // input variable for url
    const { id } = useParams();

    // redirect
    const navigate = useNavigate();

    // grabing search results from api
    useEffect(()=>{

        const options = {
            method: 'GET',
            url: 'https://spotify81.p.rapidapi.com/artist_overview',
            params: {id: id},
            headers: {
              'X-RapidAPI-Key': 'd88a07d653mshc6ed809197dfab7p1728b6jsn9029cf1ca0d6',
              'X-RapidAPI-Host': 'spotify81.p.rapidapi.com'
            }
          };
          
          axios.request(options).then(function (response) {
              setArtistInfo(response.data.data.artist);
              setTopTracks(response.data.data.artist.discography.topTracks.items)
                setRelated(response.data.data.artist.relatedContent.relatedArtists.items)
              setLoaded(true);
          }).catch(function (error) {
              console.error(error);
          });

	}, [id])

    // converts string to html code
    function createMarkup() {
        return {__html: artistInfo.profile.biography.text};
      }

      // redirect to album
      const goToAlbum = (i) => {
        const oneId = topTracks[i].track.album.uri
        const oneAlbumId = oneId.split(':');
        navigate(`/album/` + oneAlbumId[2])
    }

    // redirect to artist
    const goToArtist = (i) => {
        navigate('/artist/' + related[i].id) 
    }

  return (
    <fieldset className={musicStyle.bgColor}>
        <Navbar bg="primary" variant="dark" expand="lg">
            <Container>
            <Navbar.Brand href="/"><img src="https://media.tenor.com/FkvBwOZT4LQAAAAC/pepe-pepe-the-frog.gif" alt="" width="40px"/></Navbar.Brand>
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
                     loaded && artistInfo.discography !== undefined ? (

                        <div>
                            <div className={musicStyle.dFlexAlbum}>
                                <div>
                                    <div>
                                        <h1><b>{artistInfo.profile.name}</b></h1>
                                        <img src={artistInfo.visuals.avatarImage.sources[0].url} alt="" width="200"/>
                                    </div><br/>
                                        <p>Followers: {artistInfo.stats.followers}</p>
                                        <p>Monthly Listeners: {artistInfo.stats.monthlyListeners}</p>
                                        <p>World Rank: {artistInfo.stats.worldRank}</p>
                                    </div>
                                    <p className={musicStyle.bio} dangerouslySetInnerHTML={createMarkup()} />
                                </div>
                        </div>) : (
                                <div className={musicStyle.container}>
                                    <div className={musicStyle.spin} id={musicStyle.loader}></div>
                                    <div className={musicStyle.spin} id={musicStyle.loader2}></div>
                                    <div className={musicStyle.spin} id={musicStyle.loader3}></div>
                                    <div className={musicStyle.spin} id={musicStyle.loader4}></div>
                                    <span id={musicStyle.text}>LOADING...</span>
                                </div>
                                ) 
                }
            </div>
            <h1>Top Songs</h1>
            <Table bordered hover className={musicStyle.tableBgColor}>
                <thead>
                    <tr>
                        <th scope='col'></th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Explicit</th>
                        <th scope='col'>Album</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        topTracks.map((track, i) => {
                            return (
                                <tr key={i}>
                                    <td><a onClick={() => goToAlbum(i)}><img src={track.track.album.coverArt.sources[0].url} alt="" width="160"/></a></td>
                                    <td>{track.track.name}</td>
                                    <td>{track.track.contentRating.label === "EXPLICIT" ? "Yes" : "No"}</td>
                                    <td></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            <div className={musicStyle.scroll}>
            {
                related.map((a, i) => {
                    return (
                        <ul key={i}>
                            <li>
                            <a href='#top' onClick={() => goToArtist(i)}>
                                    <figure>
                                        <picture>
                                            <img src={a.visuals.avatarImage.sources[0].url} alt="" width="100"/><br/>
                                        </picture>
                                        <figcaption>{a.profile.name}</figcaption>
                                    </figure>
                                </a>
                            </li>
                        </ul>
                        
                    )
                })
            }
            </div>
        </div>
    </fieldset>
  )
}

export default DisplayArtist

// {artistInfo.profile.verified ? <img src="./check2.png" width="20px"/> : " "}


