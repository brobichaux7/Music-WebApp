import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ArtistForm from './ArtistForm'
import { useParams } from 'react-router-dom'

const ArtistResults = () => {
    const [token, setToken] = useState('');
	const [results, setResults] = useState([]);

    const { q } = useParams();

    useEffect(()=>{

		// Api call for retrieving token
		const options = {
            method: 'GET',
            url: 'https://spotify23.p.rapidapi.com/search/',
            params: {
              q: q,
              type: 'artists',
              offset: '0',
              limit: '20',
              numberOfTopResults: '5'
            },
            headers: {
              'X-RapidAPI-Key': 'd88a07d653mshc6ed809197dfab7p1728b6jsn9029cf1ca0d6',
              'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
            }
          };
          
          axios.request(options).then(function (response) {
              console.log(response.data.artists.items);
              setResults(response.data.artists.items);
          }).catch(function (error) {
              console.error(error);
          });
	}, [q])

    return (
    <div>
        <ArtistForm />
        <table>
            <thead>
                <tr>
                    <th scope='col'>Image</th>
                    <th scope='col'>Name</th>
                    <th scope='col'>Genre</th>
                    <th scope='col'>Followers</th>
                </tr>
            </thead>
            <tbody>
                {
                    results.map((result, i) => {
                        return (
                            <tr key={i}>
                                <td>
                                    {
                                        result.data.visuals.avatarImage == null ? <img src="https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=400&zoom=2" />
                                        : <img src={result.data.visuals.avatarImage.sources[1].url} alt="" />
                                    }
                                </td>
                                <td>{result.data.profile.name}</td>
                                {/* <td>{result.genres[0]}</td> */}
                                {/* <td>{result.followers.data}</td> */}
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </div>
  )
}

export default ArtistResults