const Music = require('../models/music.model');

module.exports = {

    // GET ALL
    findAll: (req, res) => {
        Music.find().sort({name: "asc"})
            .then(allDaMusics => res.json(allDaMusics))
            .catch(err => res.json({ message: '❌FIND ALL❌', error: err}))
    },

    // GET ONE
    findOne: (req, res) => {
        Music.findOne({_id: req.params.id})
            .then(oneSingleMusic => res.json(oneSingleMusic))
            .catch(err => res.json({ message: '❌FIND ONE❌', error: err}))
    },
    
    // CREATE
    create: (req, res) => {
        console.log(req.body)
        Music.create(req.body)
            .then(newMusic => {
                console.log("✅SERVER SUCCESS✅")
                res.json(newMusic)
            })
            .catch(err => {
                console.log("❌CREATE❌");
                res.status(400).json(err);
            })
    },

    // DELETE
    deleteOne: (req, res) => {
        Music.findByIdAndDelete(req.params.id)
            .then(result => res.json(result))
            .catch(err => res.json({ message: '❌DELETE❌', error: err}))
    }
}