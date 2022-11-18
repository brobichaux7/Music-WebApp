import React from 'react'
import {motion} from 'framer-motion'
import musicStyle from './Home.module.css'


const Transition = () => {
    return(
        <div>
        <motion.div className={musicStyle.boxcontainer}
            initial={{opacity:1}}
            animate={{opacity:0}}
            transition={{delay:1.5, duration: 3.5}}
            >
            <div className={musicStyle.box}>
            <h1>AURA</h1>
            </div>
        </motion.div>
        </div>
    )
}

export default Transition;