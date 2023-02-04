import React, {useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import UserNavBar from './UserNavBar'
import { useNavigate, useParams } from 'react-router-dom'
import generalStyle from '../css/general.module.css'

const EditProfile = () => {

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    bio: "",
    image: null,
  });
  
  const [imagePreview, setImagePreview] = useState(null);

  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const {id} = useParams();

  useEffect(()=>{
    axios.get("http://localhost:8000/api/users/checkUser" , {withCredentials:true})
        .then(res=>{
            console.log("✅ Found logged in user", res)
        })
        .catch(err=>{
            //this means someone who is not logged in tried to access the dashboard
            console.log("err when getting logged in user", err)

        })
}, [])

  const editUser = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
  };

  const changeImage = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
    setImagePreview(URL.createObjectURL(e.target.file[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("username", username);
    formData.append("bio", bio);
    formData.append("image", image);
    axios
      .put("http://localhost:8000/api/users/update/image/", formData)
      .then((res) => {
        console.log("Updated Profile Successfuly")
        console.log(res.data)
      })
      .catch((error) => {
        console.log("Edit Profile Error")
        console.log(error)
        const errorResponse = error.response.data.errors;
        const errorArr = [];
        for(const key of Object.keys(errorResponse)) {
          errorArr.push(errorResponse[key].message)
        }
        setErrors(errorArr);
      })
  }

  const { email, username, bio, image } = formData;

  return (
    <div className={generalStyle}>
      <UserNavBar/>
      <div className="container bootstrap snippets bootdey">
        <h1>Edit Profile:</h1>
        {errors.map((err, index) => <p key={index} style={{color: "red"}}>{err}</p>)}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email: </label><br />
            <input type="email" name='email' value={email} onChange={editUser} required />
          </div>
          <div>
            <label>Username: </label><br />
            <input type="text" name='username' value={username} onChange={editUser} required/>
          </div>
          <div>
            <label>Bio: </label><br />
            <textarea name="bio" value={bio} onChange={editUser} />
          </div>
            {imagePreview && (
              <img src={imagePreview} alt="Preview of Profile Picture" />
            )}
            <div>
              <label>Profile Picture: </label><br />
              <input type="file" name='image' onChange={changeImage} />
            </div><br />
            <button type="submit">Update Profile</button>
        </form>
      </div>
    </div>
  )
}

export default EditProfile