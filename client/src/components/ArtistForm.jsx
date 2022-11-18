import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import musicStyle from './Home.module.css'
import axios from 'axios';
import GuestNavBar from './GuestNavBar';
import UserNavBar from './UserNavBar';

const ArtistForm = () => {

    // search variable
    const [searchItem, setSearchItem] = useState('');

    // user variable
    const [user, setUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);

    // redirect
    const navigate = useNavigate();

    // redirects to search results
    const onSubmitHandler = (e) => {
        e.preventDefault();
        navigate("/search/artists/results/" + searchItem)
    }

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

    return (
        <div>
        {
          loggedIn ? <UserNavBar /> : <GuestNavBar />
        }
    <div className={musicStyle.searchArtist}>
        <h1>Search for Artists</h1>
        <form onSubmit={onSubmitHandler}>
            <input placeholder="What artist would you like to search for?" type="text" onChange={e => setSearchItem(e.target.value)}/>
            <button>Search</button>
        </form>
    </div>
    {/* </motion.div> */}
    </div>
  )
}

export default ArtistForm