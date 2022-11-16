import React from 'react'
import musicStyle from './Home.module.css'

const Login = () => {

    return(
        <div className={musicStyle.login}>
        <img src='https://media.tenor.com/FkvBwOZT4LQAAAAC/pepe-pepe-the-frog.gif'/>
        <h4>LOG IN</h4>
        <form>
        <label>Email:</label>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type="text" /> <br/>
        <label>Password:</label>
        <input type="text" /><br/>
        <button>Submit</button>
        <p>don't have an account?<a href="/register"> register here</a></p>
        </form>
        </div>
    )
}

export default Login;