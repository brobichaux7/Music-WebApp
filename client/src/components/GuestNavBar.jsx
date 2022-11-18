import React from 'react'
import {Navbar, Container, Nav, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'

const GuestNavBar = () => {
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
          <Link to="/login">
        <Button>Login</Button>&nbsp;&nbsp;&nbsp;
        </Link>
      </Navbar>
    </div>
  )
}

export default GuestNavBar