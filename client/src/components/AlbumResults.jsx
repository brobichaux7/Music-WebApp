import React, {useState, useEffect} from 'react'
import axios from 'axios'
import SearchAlbum from './SearchAlbum'
import { useParams } from 'react-router-dom'

const AlbumResults = () => {
  
    const [token, setToken] = useState('');
	const [results, setResults] = useState([]);

    const { q } = useParams();

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
			}).then(albumres => {
				console.log(albumres.data.albums.items);
				setResults(albumres.data.albums.items);
			}).catch(error=> console.log(error))
		}).catch(error => console.log(error));
	}, [q])

    return (
    <div>
        <SearchAlbum />
        <table>
            <thead>
                <tr>
                    <th scope='col'>Image</th>
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
                                <td><img src={result.images[1].url} alt="" /></td>
                                <td>{result.name}</td>
                                <td>{result.artists[0].name}</td>
                                <td>{result.release_date}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </div>
  )
}

export default AlbumResults