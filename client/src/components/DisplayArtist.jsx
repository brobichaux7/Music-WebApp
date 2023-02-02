import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {Table} from 'react-bootstrap'
import GuestNavBar from './GuestNavBar';
import UserNavBar from './UserNavBar';
import generalStyle from '../css/general.module.css'
import displayStyle from '../css/displayOne.module.css'
import loadStyle from '../css/loadCircle.module.css'
import profileStyle from '../css/userProfile.module.css'


const DisplayArtist = () => {
    
    // result variables
    const [artistInfo, setArtistInfo] = useState({});
    const [topTracks, setTopTracks] = useState([]);
    const [related, setRelated] = useState([]);

    // if results are loaded or not variables
    const [loaded, setLoaded] = useState(false);

    // user variable
    const [user, setUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);

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

    useEffect(()=>{
        axios.get("http://localhost:8000/api/users/checkUser", {withCredentials:true})
            .then(res=>{
                console.log("✅", res)
                if(res.data.results){
                    //this means the user is logged in and can accees this page
                    setUser(res.data.results)
                    setLoggedIn(true);
                }
            })
            .catch(err=>{
                //this means someone who is not logged in tried to access the dashboard
                console.log("err when gettign logged in user", err)
    
            })
    }, [])

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
    <fieldset className={generalStyle}>
        {
            loggedIn ? <UserNavBar /> : <GuestNavBar />
        }
        <div className={displayStyle.displayCenter}>
            <div>
                {
                     loaded && artistInfo.discography !== undefined ? (

                        <div>
                            <div className={displayStyle.dFlexAlbum}>
                                <div>
                                    <div>
                                        <h1><b>{artistInfo.profile.name}</b></h1>
                                        <img src={artistInfo.visuals.avatarImage.sources[0].url} alt="" width="200"/>
                                    </div><br/>
                                        <p>Followers: {artistInfo.stats.followers}</p>
                                        <p>Monthly Listeners: {artistInfo.stats.monthlyListeners}</p>
                                        <p>World Rank: {artistInfo.stats.worldRank}</p>
                                    </div>
                                    <p className={displayStyle.bio} dangerouslySetInnerHTML={createMarkup()} />
                                </div>
                        </div>) : (
                                <div className={loadStyle.container}>
                                    <div className={loadStyle.spin} id={loadStyle.loader}></div>
                                    <div className={loadStyle.spin} id={loadStyle.loader2}></div>
                                    <div className={loadStyle.spin} id={loadStyle.loader3}></div>
                                    <div className={loadStyle.spin} id={loadStyle.loader4}></div>
                                    <span id={loadStyle.text}>LOADING...</span>
                                </div>
                                ) 
                }
            </div>
            <h1>Top Songs</h1>
            <Table bordered hover className={generalStyle.tableWidth}>
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
            <div className={profileStyle.scroll}>
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


