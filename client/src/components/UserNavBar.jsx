import React, {useState, useEffect} from 'react'
import {Navbar, Nav, NavItem, Container, NavDropdown} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import navBarStyle from '../css/navBar.module.css'


const UserNavBar = () => {
  
    const navigate = useNavigate();

    const [user, setUser] = useState({});

    useEffect(()=>{
        axios.get("http://localhost:8000/api/users/checkUser", {withCredentials:true})
            .then(res=>{
                console.log("✅", res)
                if(res.data.results){
                    //this means the user is logged in and can accees this page
                    setUser(res.data.results)
                }
            })
            .catch(err=>{
                //this means someone who is not logged in tried to access the dashboard
                console.log("err when getting logged in user", err)

            })
    }, [])

    const logout = () => {
        axios.get('http://localhost:8000/api/logout',{withCredentials: true})
        .then(res => {
            console.log("logged out", res.data)
            navigate('/login')
        })
        .catch(err => console.log(err))
        }

    return (
        <Navbar collapseOnSelect fixed='top' expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/" className={navBarStyle.logo}>
                <img className={navBarStyle.frog} src="https://media.tenor.com/FkvBwOZT4LQAAAAC/pepe-pepe-the-frog.gif" alt="Aura" width="40px"/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/search/albums">Search Albums</Nav.Link>
                <Nav.Link href="/search/artists">Search Artists</Nav.Link>
            </Nav>
            <Nav>
                <Nav.Link href={`/profile/${user._id}`}>
                    <img src={user.image} alt="" width="30"/>
                </Nav.Link>
                <Nav.Link href={`/profile/${user._id}`}>
                    <p> {user.name}</p>
                </Nav.Link>
                <Nav.Link onClick={() => logout()}>Logout</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default UserNavBar