import React from 'react'
import {Navbar, Container, Nav, NavDropdown, Form, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const Home = () => {

  return (
    <div>
    <Navbar bg="primary" variant="dark" expand="lg">
    <Container>
      <Navbar.Brand href="#home">LOGO</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#home">Browse</Nav.Link>
          <Nav.Link href="#link">Albums</Nav.Link>
          <Nav.Link href="#artists">Artists</Nav.Link>
          </Nav>
          <Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="light">Search</Button>
          </Form>
          </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  </div>
  )
}

export default Home