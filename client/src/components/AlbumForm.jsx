import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import {Navbar, Container, Nav, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import UserNavBar from './UserNavBar';
import GuestNavBar from './GuestNavBar';
import axios from 'axios';
import generalStyle from '../css/general.module.css'
import formStyle from '../css/form.module.css'

const AlbumForm = () => {
  
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
        navigate("/search/albums/results/" + searchItem)
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
      <div className={generalStyle} style={{"height": "100vh"}}>
        {
          loggedIn ? <UserNavBar /> : <GuestNavBar />
        }
    <div className={formStyle.search}>
        <h1>Search for Albums</h1>
        <form onSubmit={onSubmitHandler}>
            <input placeholder="What album do you want to search for?" type="text" onChange={e => setSearchItem(e.target.value)}/>
            <button>Search</button>
        </form>
    </div>
    {/* </motion.div> */}
    </div>
  )
}

export default AlbumForm