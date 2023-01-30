import React, {useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import musicStyle from './Home.module.css'
import axios from 'axios'
import UserNavBar from './UserNavBar'
import { useNavigate, useParams } from 'react-router-dom'
import { isObjectIdOrHexString } from 'mongoose'

const EditProfile = () => {

  const [preview, setPreview] = useState(null);

  // user info
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [bio, setBio] = useState("");

  const [errors, setErrors] = useState([])

  const navigate = useNavigate();

  const {id} = useParams();

  useEffect(()=>{
    axios.get("http://localhost:8000/api/users/checkUser" , {withCredentials:true})
        .then(res=>{
            console.log("✅", res)
            setName(res.data.results.name)
            setEmail(res.data.results.email)
            setBio(res.data.results.bio)
            setImage(res.data.results.image)
        })
        .catch(err=>{
            //this means someone who is not logged in tried to access the dashboard
            console.log("err when getting logged in user", err)

        })
}, [])

    const editUser = (e) => {
      e.preventDefualt();
      axios.put("http://localhost:8000/api/users/update/" + id, {name, image, bio})
        .then(res => {
          console.log("✅ EDIT PROFILE client success")
          console.log(res.data)
          navigate('/profile/' + id)
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

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreview(reader.result);
      };
    };

  return (
    <div>
      <UserNavBar/>
    <div className="container bootstrap snippets bootdey">
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
        <p>
          <img src={preview || image} alt="Profile" width={"250px"}/><br/>
          <input type="file" onChange={handleFileChange} />
        </p>
        <button onClick={goBackHome}>Cancel</button>
        <input type="submit" value="Submit" />
      </form>
    
    </div>
    </div>
  )
}

export default EditProfile