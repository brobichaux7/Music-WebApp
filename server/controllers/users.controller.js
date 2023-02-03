const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
// import the model to make queris to the DB
const User = require("../models/users.model")

//Register
module.exports.createNewUser = (requestObj,responseObj) => {
    User.create(requestObj.body)
        .then(newlyCreatedUser => {
            const userToken = jwt.sign({
                id: newlyCreatedUser._id
            }, process.env.SECRET_KEY);
            console.log("Server Success")
            responseObj.cookie("usertoken", userToken,{
                httpOnly: true
            }).json(newlyCreatedUser)
        })
        .catch(err => {
            console.log("❌Server Error")
            responseObj.status(400).json(err)
        });
}


//Login
module.exports.login = async(req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if(user === null) {
        // email not found in users collection
        return res.sendStatus(400);
    }
    // if we made it this far, we found a user with this email address
    // let's compare the supplied password to the hashed password in the database
    const correctPassword = await bcrypt.compare(req.body.password, user.password);
    if(!correctPassword) {
        // password wasn't a match!
        return res.sendStatus(400);
    }
    // if we made it this far, the password was correct
    const userToken = jwt.sign({
        id: user._id
    }, process.env.SECRET_KEY);
    // note that the response object allows chained calls to cookie and json
    res
        .cookie("usertoken", userToken, process.env.SECRET_KEY, {
            httpOnly: true
        })
        .json({ msg: "success!" });
}

//Get logged in user
module.exports.getLoggedInUser = (requestObj,responseObj)=>{

    const decodedJWT = jwt.decode(requestObj.cookies.usertoken, {complete:true})
    // decodedJWT.payload.id
    User.findOne({_id: decodedJWT.payload.id })
        .then(foundUser=>{
            responseObj.json({results: foundUser})
        })
        .catch(err=>{
            responseObj.json(err)
        })
}

//Logout
module.exports.logout = (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
}

module.exports.findOneUser = (requestObj,responseObj) => {
    User.findById(requestObj.params.id)
        .then(oneUser => {
            responseObj.json(oneUser)
        })
        .catch(err => {
            console.log("Server Error")
            responseObj.json(err)
        });
}

module.exports.findAllUsers = (requestObj,responseObj) => {
    User.find()
        .then((allDaUsers) => {
            responseObj.json(allDaUsers)
        })
        .catch(err => {
            console.log("Server Error")
            responseObj.json(err)
        });

}

//Update 
module.exports.updateUser = (requestObj,responseObj) => {
    User.findByIdAndUpdate(
        requestObj.params.id ,
        requestObj.body,
        { new: true, runValidators: true })
        .then(updatedUser => {
            responseObj.json(updatedUser)
        })
        .catch(err => {
            console.log("Server Error")
            responseObj.json(err)
        });
}