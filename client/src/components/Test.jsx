import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Test = () => {
  
  // Set up states for retrieving access token and top tracks
	const [token, setToken] = useState('');
	const [tracks, setTracks] = useState([]);

	// Artist ID from Spotify

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

			// Api call for retrieving tracks data
			axios(`https://api.spotify.com/v1/search?q=tyler%20the%20creator&type=artist&offset=5`,{
				'method': 'GET',
				'headers': {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Authorization': 'Bearer ' + tokenresponse.data.access_token
				}
			}).then(albumres => {
				console.log(albumres.data.artists.items);
				setTracks(albumres.data.artists.items);
			}).catch(error=> console.log(error))
		}).catch(error => console.log(error));
	},[])

    return (
    <div>
        
        {
            tracks.map((person, i) => {
                return (
                    <div key={i}>
                        <h1>{person.name}</h1>
                        <img src={person.images[0].url} alt="" />
                    </div>
                )
            })
        }
    </div>
  )
}

export default Test