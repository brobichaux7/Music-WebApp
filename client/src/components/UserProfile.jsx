import React, {useState, useEffect} from 'react'
import axios from 'axios';
import GuestNavBar from './GuestNavBar';
import UserNavBar from './UserNavBar';
import { useNavigate, Link } from 'react-router-dom';
import musicStyle from './Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Table} from 'react-bootstrap'

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
                console.log(res.data.results);
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
    <div className={musicStyle.bgColor}>
      {
        loggedIn ? <UserNavBar /> : <GuestNavBar />
      }
      <div className={musicStyle.container}>
        <div className={musicStyle.dFlexBetween}>
          <h1>{user.name}'s Profile</h1>
          <p>⚙️Edit Profile</p>
        </div><hr />
        <div className={musicStyle.dFlex}>
          <img src={user.image} alt="https://i.ibb.co/4pDNDk1/avatar.png" width="15%"/>
          <div className={musicStyle.profileRight}>
            <p className={musicStyle.bio2}>
              {user.bio}
            </p>
            <Table bordered hover className={musicStyle.tableText}>
              <thead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>Image</th>
                  <th scope='col'>Album Name</th>
                  <th scope='col'>Rating</th>
                </tr>
              </thead>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile

// <Link to={`/musicList/${user._id}`}>
// <h1>Ratings</h1>
// </Link>