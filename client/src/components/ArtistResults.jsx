import React, {useState, useEffect} from 'react'
import axios from 'axios'
import GuestNavBar from './GuestNavBar'
import UserNavBar from './UserNavBar'
import { useParams, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Table} from 'react-bootstrap'
import generalStyle from '../css/general.module.css'
import loadStyle from '../css/loadCircle.module.css'

const ArtistResults = () => {

    // result variables
	const [results, setResults] = useState([]);

    // user variables
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});

    // if results are loaded or not variables
    const [loaded, setLoaded] =useState(false)

    // input variable for url
    const { q } = useParams();

    // redirect
    const navigate = useNavigate();

    useEffect(()=>{

		// grabing search results from api
		const options = {
            method: 'GET',
            url: 'https://spotify81.p.rapidapi.com/search',
            params: {q: q, type: 'artists', offset: '0', limit: '10', numberOfTopResults: '5'},
            headers: {
              'X-RapidAPI-Key': 'd88a07d653mshc6ed809197dfab7p1728b6jsn9029cf1ca0d6',
              'X-RapidAPI-Host': 'spotify81.p.rapidapi.com'
            }
          };
          
          axios.request(options).then(function (response) {
              console.log(response.data.artists.items);
              setResults(response.data.artists.items);
              setLoaded(true);
          }).catch(function (error) {
              console.error(error);
          });
	}, [q])

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

     // redirects to artist display page
    const goToArtist = (i) => {
        const oneId = results[i].data.uri
        const oneArtistId = oneId.split(':');
        navigate(`/artist/` + oneArtistId[2])
    }

    return (
    <div className={generalStyle}>
        
        {
          loggedIn ? <UserNavBar /> : <GuestNavBar />
        }
        
        <div className={generalStyle.center}>
            <h1><a href='/search/artists/'>⬅️ </a> Search results for {q}</h1>
        </div>
        {
            loaded ? (
                <div>
                    <Table bordered hover className={generalStyle.tableWidth}>
                        <thead>
                            <tr>
                                <th scope='col' width="10%"></th>
                                <th scope='col' width="70%">Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                results.map((result, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>
                                                {
                                                    result.data.visuals.avatarImage == null ? <img src="https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=160" alt=" "/>
                                                    : <img src={result.data.visuals.avatarImage.sources[0].url} alt="" width="160"/>
                                                }
                                            </td>
                                            <td><a onClick={() => goToArtist(i)}>{result.data.profile.name}</a></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table><br />
                </div>
            ): (
            <div className={loadStyle.container}>
                <div className={loadStyle.spin} id={loadStyle.loader}></div>
                <div className={loadStyle.spin} id={loadStyle.loader2}></div>
                <div className={loadStyle.spin} id={loadStyle.loader3}></div>
                <div className={loadStyle.spin} id={loadStyle.loader4}></div>
                <span id={loadStyle.text}>LOADING...</span>
            </div>
        )}
    </div>
  )
}

export default ArtistResults