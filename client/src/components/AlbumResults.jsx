import React, {useState, useEffect} from 'react'
import axios from 'axios'
import AlbumForm from './AlbumForm'
import { useParams, Link, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Table} from 'react-bootstrap'




const AlbumResults = () => {
  
    const [token, setToken] = useState('');
	const [results, setResults] = useState([]);

    const { q, id } = useParams();
    const navigate = useNavigate();

    const goToAlbum = (albumId) => {
        navigate("/album/" + albumId)
    }

    useEffect(()=>{

		// Api call for retrieving token
		axios('https://accounts.spotify.com/api/token', {
			'method': 'POST',
			'headers': {
				 'Content-Type':'application/x-www-form-urlencoded',
				 'Authorization': 'Basic ' + btoa('48fec7da4a694ec0a3241be884d99abe:86310732c9a042dbb498327161686623'),
			},
			data: 'grant_type=client_credentials'
		}).then(tokenresponse => {
			console.log(tokenresponse.data.access_token);
			setToken(tokenresponse.data.access_token);

			// Api call for retrieving results data
			axios(`https://api.spotify.com/v1/search?q=${q}&type=album&offset=5`,{
				'method': 'GET',
				'headers': {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Authorization': 'Bearer ' + tokenresponse.data.access_token
				}
			}).then(res => {
				console.log(res.data.albums.items);
				setResults(res.data.albums.items);
			}).catch(error=> console.log(error))
		}).catch(error => console.log(error));
	}, [q])

    return (
    <div>
        <AlbumForm/>
        <Table bordered hover>
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
                            <tr key={result.id}>
                                <td><img src={result.images[0].url} alt="" width="160"/></td>
                                <td><Link to={`/album/${result.id}`}>{result.name}</Link></td>
                                <td>{result.artists[0].name}</td>
                                <td>{result.release_date}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    </div>
  )
}

export default AlbumResults