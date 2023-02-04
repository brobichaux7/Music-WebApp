import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {Table} from 'react-bootstrap'
import GuestNavBar from './GuestNavBar';
import UserNavBar from './UserNavBar';
import generalStyle from '../css/general.module.css'
import displayStyle from '../css/displayOne.module.css'
import loadStyle from '../css/loadCircle.module.css'

const DisplayAlbum = () => {

    // result variables
    const [albumInfo, setAlbumInfo] = useState([]);
    const [songs, setSongs] = useState([]);

    // rating variables
    const [rating, setRating] = useState(0);
    const [listened, setListened] = useState(false);

    // if results are loaded or not variables
    const [loaded, setLoaded] = useState(true);

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
            url: 'https://spotify23.p.rapidapi.com/albums/',
            params: {ids: id},
            headers: {
              'X-RapidAPI-Key': 'd88a07d653mshc6ed809197dfab7p1728b6jsn9029cf1ca0d6',
              'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
            }
          };
          
          axios.request(options).then(function (response) {
              console.log(response.data.albums[0]);
              setAlbumInfo(response.data.albums[0]);
              setLoaded(false);
              setSongs(response.data.albums[0].tracks.items);
              console.log(songs)
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

    const goToArtist = () => {
        navigate('/artist/' + albumInfo.artists[0].id) 
    }

    const listenedCheck = (e) => {
        setListened(e.target.checked);
    }

    // const rateAlbum = (e) => {
    //     e.preventDefualt();
    //     const ratedAlbum = {
    //         albumId,
    //         hasListened,
            
    //     }
        
    // }

  return (
    <fieldset className={generalStyle}>
        {
            loggedIn ? <UserNavBar /> : <GuestNavBar />
        }
        <div className={displayStyle.displayCenter}>
            
            <div>
                {
                    loaded ? (
                    <div className={loadStyle.container}>
                        <div className={loadStyle.spin} id={loadStyle.loader}></div>
                        <div className={loadStyle.spin} id={loadStyle.loader2}></div>
                        <div className={loadStyle.spin} id={loadStyle.loader3}></div>
                        <div className={loadStyle.spin} id={loadStyle.loader4}></div>
                        <span id={loadStyle.text}>LOADING...</span>
                    </div>)
                    : <div className={displayStyle.dFlex}>
                        <div>
                            <h1><b>{albumInfo.name}</b></h1>
                            <h5>By: <a onClick={goToArtist}>{albumInfo.artists[0].name}</a></h5>
                            <p>Release Date: {albumInfo.release_date}</p>
                            <div className={displayStyle.dFlexAlbum}>
                                <div>
                                    <img src={albumInfo.images[0].url} alt=" " width="200"/>
                                </div>
                                <div className={displayStyle.centerText}>
                                    <p><b>Label:</b> {albumInfo.label}</p>
                                    <p><b>Number of Songs:</b> {albumInfo.total_tracks}</p>
                                    <p><b>Popularity Rating:</b> {albumInfo.popularity}</p>
                                    <a href={albumInfo.external_urls.spotify} target="_blank"><b>Click here to see album in spotify</b></a><br/><br/>
                                    {
                                        loggedIn ? 
                                            <p>
                                                <b>Have you Listened to this?</b>&nbsp;&nbsp;&nbsp;
                                                <input type="checkbox" onChange={e => listenedCheck(e.target.checked)} checked={listened} />
                                            </p>
                                        : <b>Want to rate this album? <Link to="/login">Login!</Link></b>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <Table bordered hover className={generalStyle.tableWidth}>
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
                                    <td><a href={song.external_urls.spotify} target="_blank" rel="noopener noreferrer">{song.name}</a></td>
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