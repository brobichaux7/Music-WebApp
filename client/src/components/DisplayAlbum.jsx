import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DisplayAlbum = () => {

    const [token, setToken] = useState('');
    const [albumInfo, setAlbumInfo] = useState([]);

    const { id } = useParams();

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
			axios(`https://api.spotify.com/v1/albums/40QTqOBBxCEIQlLNdSjFQB?market=US`,{
				'method': 'GET',
				'headers': {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Authorization': 'Bearer ' + tokenresponse.data.access_token
				}
			}).then(res => {
				console.log(res.data);
				setAlbumInfo(res.data);
			}).catch(error=> console.log(error))
		}).catch(error => console.log(error));
	}, [id])

  return (
    <fieldset>
        <div>
            <h1>{albumInfo.name}</h1>
            {
                albumInfo.images == undefined ? <img src="https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=160" />
                : <img src={albumInfo.images[1].url} alt=" " width="200"/>
            }
        </div>
    </fieldset>
  )
}

export default DisplayAlbum