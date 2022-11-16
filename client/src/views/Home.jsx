import React from 'react'
import {Navbar, Container, Nav, Form, Button, Carousel} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import musicStyle from './Home.module.css'

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
          <Nav.Link href="#searchal">Search Albums</Nav.Link>
          <Nav.Link href="#searchar">Search Artists</Nav.Link>
          </Nav>
          <Nav>
          </Nav>
      </Navbar.Collapse>
      </Container>
      <Link to="/login">
    <Button>Login</Button>&nbsp;&nbsp;&nbsp;
    </Link>
  </Navbar>

      <div className={musicStyle.topCarousel}>
      <Carousel>
        <Carousel.Item interval={5000}>
          <img
            className="d-block w-100"
src="https://www.billboard.com/wp-content/uploads/media/tyler-the-creator-asap-rocky-potato-salad-MV-vid-2018-billboard-1548.jpg"
            alt="Image One"
          />
          <Carousel.Caption>
            <h3>New Music</h3>
            <p>Artist Name</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            className="d-block w-100"
src="https://cloudfront-us-east-1.images.arcpublishing.com/ajc/YSFLLDLLQHM5HFBKEL2HDMJGOA.jpg"
            alt="Image Two"
          />
          <Carousel.Caption>
            <h3>New Music</h3>
            <p>Artist Name</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      </div>

      <div className={musicStyle.albumCarousel}>
      <Carousel>
        <Carousel.Item>
        <img
            className="d-block w-100"
src="https://assets.fontsinuse.com/static/use-media-items/52/51196/full-1500x1500/58f577f9/C9H8-PWUIAAzbQ2-jpg-large-e.jpeg"
            alt="Image One"
          />
        </Carousel.Item>
      </Carousel>
      </div>

      <div className={musicStyle.artistCarousel}>
      <Carousel>
        <Carousel.Item>
        <img
            className="d-block w-100"
src="https://www.rollingstone.com/wp-content/uploads/2019/05/TylerTheCreator_SamRock.jpg"
            alt="Image One"
          />
        </Carousel.Item>
      </Carousel>
      </div>

    </div>
  
  )
}

export default Home