import React, {useState, useEffect} from 'react'
import {Carousel} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import musicStyle from './Home.module.css'
import UserNavBar from './UserNavBar'
import GuestNavBar from './GuestNavBar'
import axios from 'axios'

const Home = () => {

  // user variable
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  
  useEffect(()=>{
    axios.get("http://localhost:8000/api/users/checkUser", {withCredentials:true})
        .then(res=>{
            console.log("✅", res)
            if(res.data.results){
                //this means the user is logged in and can accees this page
                setUser(res.data.results)
                setLoggedIn(true);
            }
        })
        .catch(err=>{
            //this means someone who is not logged in tried to access the dashboard
            console.log("err when gettign logged in user", err)

        })
}, [])

  return (
    <div>
      {/* <Transition/> */}
    {/* <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{delay:1.5, duration: 3.5}}> */}
    <div className={musicStyle.homeBody}>
    {
      loggedIn ? <UserNavBar /> : <GuestNavBar />
    }

      <div className={musicStyle.topCarousel}>
      <Carousel>
        <Carousel.Item interval={5000}>
          <img
            className="d-block w-100"
src="https://www.billboard.com/wp-content/uploads/media/tyler-the-creator-asap-rocky-potato-salad-MV-vid-2018-billboard-1548.jpg"
            alt="Image One"
          />
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            className="d-block w-100"
src="https://cloudfront-us-east-1.images.arcpublishing.com/ajc/YSFLLDLLQHM5HFBKEL2HDMJGOA.jpg"
            alt="Image Two"
          />
        </Carousel.Item>

        <Carousel.Item interval={5000}>
          <img
            className="d-block w-100"
src="https://i.ytimg.com/vi/5hf5HOrJc-I/maxresdefault.jpg"
            alt="Image Two"
          />
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
        <Carousel.Item>
        <img
            className="d-block w-100"
src="https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_auto,w_1400/fl_lossy,pg_1/dqtevr2nbwvy486bt9mg/joji-smithereens-stream?fimg-ssr-default"
            alt="Image One"
          />
        </Carousel.Item>
        <Carousel.Item>
        <img
            className="d-block w-100"
src="https://upload.wikimedia.org/wikipedia/en/2/26/Cherry_Bomb_Tyler_the_Creator.png"
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
src="https://media.tenor.com/_58JURguTykAAAAC/drake-drake-dancing.gif"
            alt="Image One"
          />
        </Carousel.Item>

        <Carousel.Item>
        <img
            className="d-block w-100"
src="https://media.tenor.com/FJiASlrWtY8AAAAd/tyler-the-creator-sike.gif"
            alt="Image One"
          />
        </Carousel.Item>

        <Carousel.Item>
        <img
            className="d-block w-100"
src="https://media.tenor.com/P98RZR_l9q4AAAAC/travis-scott-fire.gif"
            alt="Image One"
          />
        </Carousel.Item>
      </Carousel>
      </div>
    </div>
    {/* </motion.div> */}
    </div>
  )
}

export default Home