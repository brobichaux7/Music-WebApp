import React, {useState, useEffect} from 'react'
import axios from 'axios';
import GuestNavBar from './GuestNavBar';
import UserNavBar from './UserNavBar';
import { useNavigate, Link } from 'react-router-dom';
import musicStyle from './Home.module.css'

const UserProfile = () => {
  
  // user variable
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  // redirect
  const navigate = useNavigate();
  
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
      <Link to={`/musicList/${user._id}`}>
        <h1>Ratings</h1>
        </Link>
    </div>
  )
}

export default UserProfile