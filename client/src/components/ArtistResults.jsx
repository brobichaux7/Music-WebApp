import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ArtistForm from './ArtistForm'
import { useParams, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Table} from 'react-bootstrap'
import musicStyle from './Home.module.css'

const ArtistResults = () => {

    // result variables
	const [results, setResults] = useState([]);

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

     // redirects to artist display page
    const goToArtist = (i) => {
        const oneId = results[i].data.uri
        const oneArtistId = oneId.split(':');
        navigate(`/artist/` + oneArtistId[2])
    }

    return (
    <div className={musicStyle.bGround}>
        {/* <ArtistForm /> */}
        <h1>you are searching for {q} and related artists</h1>
        <h5>click <a>here</a> to return back to search</h5>
        {
            loaded ? (
                <div>
                    <Table bordered hover className={musicStyle.tableWidth}>
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
            <div className={musicStyle.container}>
                <div className={musicStyle.spin} id={musicStyle.loader}></div>
                <div className={musicStyle.spin} id={musicStyle.loader2}></div>
                <div className={musicStyle.spin} id={musicStyle.loader3}></div>
                <div className={musicStyle.spin} id={musicStyle.loader4}></div>
                <span id={musicStyle.text}>LOADING...</span>
            </div>
        )}
    </div>
  )
}

export default ArtistResults