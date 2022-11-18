import React, {useState, useEffect} from 'react'
import axios from 'axios';
import UserNavBar from './UserNavBar';
import GuestNavBar from './GuestNavBar';
import musicStyle from './Home.module.css'

const UserRatings = () => {
  
  // user variable
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  
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
        <div>
            <h1 className={musicStyle.searchArtist}>{user.name}'s Music Taste</h1>
        </div>
    </div>
  )
}

export default UserRatings