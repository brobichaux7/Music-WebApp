import React, {useState, useEffect} from 'react'
import axios from 'axios'
import AlbumForm from './AlbumForm'
import { useParams, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Table} from 'react-bootstrap'
import generalStyle from '../css/general.module.css'
import loadStyle from '../css/loadCircle.module.css'




const AlbumResults = () => {
  
    // result variables
	const [results, setResults] = useState({});

    // if results are loaded or not variables
    const [loaded, setLoaded] =useState(false)

    // input variable for url
    const { q } = useParams();

    // redirect
    const navigate = useNavigate();

    // grabing search results from api
    useEffect(()=>{
		
        const options = {
            method: 'GET',
            url: 'https://spotify23.p.rapidapi.com/search/',
            params: {q: q, type: 'albums', offset: '0', limit: '15', numberOfTopResults: '5'},
            headers: {
                'X-RapidAPI-Key': 'd88a07d653mshc6ed809197dfab7p1728b6jsn9029cf1ca0d6',
                'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
            }
          };
          
          axios.request(options).then(function (response) {
              console.log(response.data.albums.items);
              setResults(response.data.albums.items);
              setLoaded(true);
          }).catch(function (error) {
              console.error(error);
          });
	}, [q])

    // redirects to album display page
    const goToAlbum = (i) => {
        console.log(i)
        const oneId = results[i].data.uri
        const oneAlbumId = oneId.split(':');
        navigate(`/album/` + oneAlbumId[2])
    }

    const goBack = () => {
        
    }

    return (
    <div className={generalStyle}>
        {/* <AlbumForm/> */}
        <h1>you are searching for {q} related albums</h1>
        <h5>click <a onClick={() => goBack()}>here</a> to return back to search</h5>
        {
            loaded ? (
            <Table bordered hover className={generalStyle.tableWidth}>
                <thead>
                    <tr>
                        <th scope='col'>Album Cover</th>
                        <th scope='col'>Album Name</th>
                        <th scope='col'>Artist</th>
                        <th scope='col'>Release Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        results.map((result, i) => {
                            return (
                                <tr key={result.data.uri}>
                                    <td><img src={result.data.coverArt.sources[0].url} alt="" width="160"/></td>
                                    <td><a onClick={() => goToAlbum(i)}>{result.data.name}</a></td>
                                    <td>{result.data.artists.items[0].profile.name}</td>
                                    <td>{result.data.date.year}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>) : (
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

export default AlbumResults