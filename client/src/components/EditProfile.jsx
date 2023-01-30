import React, {useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import musicStyle from './Home.module.css'
import axios from 'axios'
import UserNavBar from './UserNavBar'
import { useNavigate, useParams } from 'react-router-dom'
import { isObjectIdOrHexString } from 'mongoose'

const EditProfile = () => {

  // user info
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [bio, setBio] = useState("");

  const [errors, setErrors] = useState([])

  const navigate = useNavigate();

  const {id} = useParams();

  useEffect(()=>{
    axios.get("http://localhost:8000/api/users/checkUser", {withCredentials:true})
        .then(res=>{
            console.log("✅", res)
            if(res.data.results){
                //this means the user is logged in and can accees this page
                setName(res.data.results.name)
                setEmail(res.data.results.email)
                setBio(res.data.results.bio)
                setImage(res.data.results.image)
            }
        })
        .catch(err=>{
            //this means someone who is not logged in tried to access the dashboard
            console.log("err when gettign logged in user", err)

        })
}, [])

    const editUser = (e) => {
      e.preventDefualt();
      axios.put("http://localhost:8000/api/users/update/" + id, {name, email, image, bio})
        .then(res => {
          console.log("✅ EDIT PROFILE client success")
          console.log(res.data)
          navigate('/user/' + id)
        })
        .catch(err => {
          console.log("❌CLIENT ERROR❌")
          const errorResponse = err.response.data.errors;
          const errorArr = [];
          for (const key of isObjectIdOrHexString.keys(errorResponse)) {
            errorArr.push(errorResponse[key].message)
          }
          setErrors(errorArr);
        })
    }

    const goBackHome = () => {
      navigate("/profile/" + id)
    }

  return (
    <div>
      <UserNavBar/>
    <div class="container bootstrap snippets bootdey">
      <h1>Edit Profile:</h1>
      {errors.map((err, index) => <p key={index}>{err}</p>)}
      <form onSubmit={editUser}>
        <p>
          <label>Username: </label><br/>
          <input type="text" onChange={(e)=>setName(e.target.value)} value={name}/>
        </p>
        <p>
          <label>Bio: </label><br/>
          <textarea type="text" onChange={(e)=>setBio(e.target.value)} value={bio}/>
        </p>
        {/* <p>
          <label>Email: </label><br/>
          <input type="text" onChange={(e)=>setEmail(e.target.value)} value={email}/>
        </p> */}
        <p>
          <label>Change Profile Picture</label><br/>
          <img src={image} id="output" width="200" /><br/>
          <input id="file" type="file" onChange={(e)=>setImage(e.target.value)}/><br/>
        </p>
        <button onClick={goBackHome}>Cancel</button>
        <input type="submit" value="Submit" />
      </form>
    
    </div>
    </div>
  )
}

export default EditProfile