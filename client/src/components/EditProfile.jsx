import React, {useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import musicStyle from './Home.module.css'
import axios from 'axios'
import GuestNavBar from './GuestNavBar'
import UserNavBar from './UserNavBar'

const EditProfile = () => {
  
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
    <div class="container bootstrap snippets bootdey">
      {
        loggedIn ? <UserNavBar /> : <GuestNavBar />
      }
    <h1 class="text-primary">Edit Profile</h1>
      <hr />
	<div class="row">

      <div class="col-md-3">
        <div class="text-center">
          <img src={user.image} class="avatar img-circle img-thumbnail" alt="avatar" />
          <h6>Change Profile Picture</h6>
          
          <input type="file" class="form-control" />
        </div>
      </div>
      
      <div class="col-md-9 personal-info">
        {/* <div class="alert alert-info alert-dismissable">
          <a class="panel-close close" data-dismiss="alert">×</a> 
          <i class="fa fa-coffee"></i>
          This is an <strong>.alert</strong>. Use this to show important messages to the user.
        </div> */}
        <h3>Personal info</h3>
        
        <form class="form-horizontal" role="form">
          <div class="form-group">
            <label class="col-lg-3 control-label">Username:</label>
            <div class="col-lg-8">
              <input class="form-control" type="text" value={user.name} />
            </div>
          </div>
          <div class="form-group">
            <label class="col-lg-3 control-label">Bio:</label>
            <div class="col-lg-8">
              <textarea class="form-control" value={user.bio} />
            </div>
          </div>
          <div class="form-group">
            <label class="col-lg-3 control-label">Email:</label>
            <div class="col-lg-8">
              <input class="form-control" type="text" value={user.email} />
            </div>
          </div>
          <button className={musicStyle.up}>Update</button>
        </form>
      </div>
  </div>
</div>
  )
}

export default EditProfile