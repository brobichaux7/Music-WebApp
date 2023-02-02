import React from 'react'
import {Navbar, Nav, Button, NavItem} from 'react-bootstrap'
import navBarStyle from '../css/navBar.module.css'

const GuestNavBar = () => {
  return (
    <div className={navBarStyle}>
      <Navbar bg="black" variant="dark" expand="lg" className={navBarStyle.height}>
        <Navbar.Brand href="/" className={navBarStyle.logo}>
          <img src="https://media.tenor.com/FkvBwOZT4LQAAAAC/pepe-pepe-the-frog.gif" alt="" width="40px"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="flex-grow-1 justify-content-between">
            <NavItem className={navBarStyle.left}>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/search/albums">Search Albums</Nav.Link>
              <Nav.Link href="/search/artists">Search Artists</Nav.Link>
            </NavItem>
            <NavItem className={navBarStyle.right}>
              <Nav.Link href="/login">
                <Button className={navBarStyle.buttonColor} variant='black'>Logout</Button>
              </Nav.Link>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default GuestNavBar