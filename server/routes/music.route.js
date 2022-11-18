const MusicController = require('../controllers/music.controller')

module.exports = function(app) {
    app.get("/api/music", MusicController.findAll);
    app.get("/api/music/:id", MusicController.findOne);
    app.post('/api/music/new', MusicController.create);
    app.delete("/api/music/delete/:id", MusicController.deleteOne);
}