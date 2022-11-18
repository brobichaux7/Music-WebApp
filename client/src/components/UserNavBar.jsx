import React, {useState, useEffect} from 'react'
import {Navbar, Container, Nav, Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'


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
                console.log("err when gettign logged in user", err)

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
    <div>
    <Navbar bg="primary" variant="dark" expand="lg">
    <Container>
      <Navbar.Brand href="/"><img src="https://media.tenor.com/FkvBwOZT4LQAAAAC/pepe-pepe-the-frog.gif" alt="" width="40px"/></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
        <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/search/albums">Search Albums</Nav.Link>
          <Nav.Link href="/search/artists">Search Artists</Nav.Link>
          </Nav>
          <Nav>
          </Nav>
      </Navbar.Collapse>
      </Container>
      <Link to={`/profile/${user._id}`}>
    <Button><img src={user.image} alt="" width="30"/> {user.name}</Button>&nbsp;&nbsp;&nbsp;
    </Link>
    <Button onClick={() => logout()}>Logout</Button>&nbsp;&nbsp;&nbsp;
  </Navbar>
  </div>
  )
}

export default UserNavBar