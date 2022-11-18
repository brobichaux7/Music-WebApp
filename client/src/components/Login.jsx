import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import musicStyle from './Home.module.css'

const Login = () => {

    //redirect
    const navigate = useNavigate();

    //login variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //error variables
    const [errors, setErrors] = useState([]);

    const login = (e) => {
        e.preventDefault();
        const loginUser = {
            email,
            password
        }
        axios.post('http://localhost:8000/api/login', loginUser , {withCredentials: true})
            .then(response => {
                console.log("Client Success")
                console.log(response.data)
                navigate('/')
            })
            .catch(error => {
                console.log("Something Went Wrong")
                console.log(error)
              const errorResponse = error.response.data.errors; // Get the errors from err.response.data
                  const errorArr = []; // Define a temp error array to push the messages in
                  for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                        errorArr.push(errorResponse[key].message)
                    }
                  // Set Errors
                    setErrors(errorArr);
            })}

    return(
        <div className={musicStyle.loginBody}>
        <div className={musicStyle.login}>
        <img src='https://media.tenor.com/FkvBwOZT4LQAAAAC/pepe-pepe-the-frog.gif'/>
        <h4>LOG IN</h4>
        {errors.map((error,index) => <p key ={index}>{error}</p>)}
        <form onSubmit={login}>
        <label>Email:</label>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type="text" onChange={(e) => setEmail(e.target.value)} value={email}/> <br/>
        <label>Password:</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password}/><br/>
        <button>Submit</button>
        <p>don't have an account?<a href="/register"> register here</a></p>
        </form>
        </div>
        </div>
    )
}

export default Login;