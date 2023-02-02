import React, {useState, useEffect} from 'react'
import {Navbar, Nav, NavItem} from 'react-bootstrap'
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
        <div className={navBarStyle}>
            <Navbar collapseOnSelect bg="black" variant="dark" expand="lg" className={navBarStyle.height}>
                <Navbar.Brand href="/" className={navBarStyle.logo}>
                    <img className={navBarStyle.frog} src="https://media.tenor.com/FkvBwOZT4LQAAAAC/pepe-pepe-the-frog.gif" alt="Aura" width="40px"/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="flex-grow-1 justify-content-between">
                        <NavItem className={navBarStyle.left}>
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/search/albums">Search Albums</Nav.Link>
                            <Nav.Link href="/search/artists">Search Artists</Nav.Link>
                        </NavItem>
                        <NavItem className={navBarStyle.right}>
                            <Nav.Link href={`/profile/${user._id}`}>
                                <img src={user.image} alt="" width="30"/>
                            </Nav.Link>
                            <Nav.Link href={`/profile/${user._id}`}>
                                <p> {user.name}</p>
                            </Nav.Link>
                            <Nav.Link onClick={() => logout()}>Logout</Nav.Link>
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default UserNavBar