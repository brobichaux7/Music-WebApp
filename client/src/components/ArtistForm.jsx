import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import musicStyle from './Home.module.css'
import {Navbar, Container, Nav, Button, Table} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const ArtistForm = () => {

    // search variable
    const [searchItem, setSearchItem] = useState('');

    // redirect
    const navigate = useNavigate();

    // redirects to search results
    const onSubmitHandler = (e) => {
        e.preventDefault();
        navigate("/search/artists/results/" + searchItem)
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
              <Nav.Link to="/search/albums">Search Albums</Nav.Link>
              <Nav.Link to="/search/artists">Search Artists</Nav.Link>
              </Nav>
              <Nav>
              </Nav>
          </Navbar.Collapse>
          </Container>
          <Link to="/login">
        <Button>Login</Button>&nbsp;&nbsp;&nbsp;
        </Link>
      </Navbar>
      {/* <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             transition={{ duration: 3 }}> */}
    <div className={musicStyle.searchArtist}>
        <h1>Search for Artists</h1>
        <form onSubmit={onSubmitHandler}>
            <input placeholder="What artist would you like to search for?" type="text" onChange={e => setSearchItem(e.target.value)}/>
            <button>Search</button>
        </form>
    </div>
    {/* </motion.div> */}
    </div>
  )
}

export default ArtistForm