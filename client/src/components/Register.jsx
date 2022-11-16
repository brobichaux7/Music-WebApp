import React from 'react'
import musicStyle from './Home.module.css'


const Register = () => {
    return(
        <div className={musicStyle.register}>
        <img src='https://media.tenor.com/FkvBwOZT4LQAAAAC/pepe-pepe-the-frog.gif'/>
        <h4>REGISTER</h4>
        <form>
        <label>First Name:</label>
        <input type="text" /> <br/>
        <label>Last Name:</label>
        <input type="text" /><br/>
        <label>Email:</label>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" /> <br/>
        <label>Password:</label>
        &nbsp;&nbsp;<input type="password" /><br/>
        <label>Confirm:</label>&nbsp;&nbsp;&nbsp;&nbsp; 
        <input type="password" /> <br/>
        <button>Create Account</button>
        <p>already have an account?<a href="/login"> log in here</a></p>
        </form>
        </div>
    )
}

export default Register;