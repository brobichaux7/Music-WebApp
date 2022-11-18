import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import musicStyle from './Home.module.css'
import {Navbar, Container, Nav, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { motion } from "framer-motion";


const AlbumForm = () => {
  
    const [searchItem, setSearchItem] = useState('');
    const navigate = useNavigate();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        navigate("/search/albums/results/" + searchItem)
    }

    return (
      <div>
        <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">LOGO</Navbar.Brand>
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
          <Link to="/login">
        <Button>Login</Button>&nbsp;&nbsp;&nbsp;
        </Link>
      </Navbar>
             <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             transition={{ duration: 3 }}>
    <div className={musicStyle.searchAlbum}>
        <h1>Search for Albums</h1>
        <form onSubmit={onSubmitHandler}>
            <input placeholder="What album do you want to search for?" type="text" onChange={e => setSearchItem(e.target.value)}/>
            <button>Search</button>
        </form>
    </div>
    </motion.div>
    </div>
  )
}

export default AlbumForm