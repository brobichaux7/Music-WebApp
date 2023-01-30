import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import musicStyle from './Home.module.css'


const Register = () => {
    
    // user variables
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    // error variables
    const [errors, setErrors] = useState([]);

    // redirect
    const navigate = useNavigate();

    //function to create a new user
    const createUser = (e) => {
        e.preventDefault();
        const newUser = {
            name,
            email,
            password,
            confirmPassword
        }
        axios.post('http://localhost:8000/api/register', newUser ,{withCredentials: true})
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
        }) 
    }
    
    return(
        <div className={musicStyle.bGround}>
            <div className={musicStyle.registerBody}>
            <div className={musicStyle.register}>
            <img src='https://media.tenor.com/FkvBwOZT4LQAAAAC/pepe-pepe-the-frog.gif'/>
            <h4>REGISTER</h4>
            {errors.map((err, index) => <p key={index}>{err}</p>)}
            <form onSubmit={createUser}>
            <label>Username:</label>
            <input type="text" onChange={e => setName(e.target.value)} value={name}/> <br/>
            <label>Email:</label>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" onChange={e => setEmail(e.target.value)} value={email}/> <br/>
            <label>Password:</label>
            &nbsp;&nbsp;<input type="password" onChange={e => setPassword(e.target.value)} value={password}/><br/>
            <label>Confirm:</label>&nbsp;&nbsp;&nbsp;&nbsp; 
            <input type="password" onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword}/> <br/>
            <button>Create Account</button>
            <p>already have an account?<a href="/login"> log in here</a></p>
            </form>
            </div>
            </div>
        </div>
    )
}

export default Register;