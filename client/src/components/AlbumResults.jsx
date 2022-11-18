import React, {useState, useEffect} from 'react'
import axios from 'axios'
import AlbumForm from './AlbumForm'
import { useParams, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Table} from 'react-bootstrap'
import musicStyle from './Home.module.css'




const AlbumResults = () => {
  
	const [results, setResults] = useState({});
    const [loaded, setLoaded] =useState(false)

    const { q } = useParams();
    const navigate = useNavigate();

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

    const goToAlbum = (i) => {
        console.log(i)
        const oneId = results[i].data.uri
        const oneAlbumId = oneId.split(':');
        navigate(`/album/` + oneAlbumId[2])
    }

    return (
    <div className={musicStyle.bgColor}>
        <AlbumForm/>
        {
            loaded ? (
            <Table bordered hover className={musicStyle.tableWidth}>
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

export default AlbumResults