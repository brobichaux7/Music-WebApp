const AlbumController = require('../controllers/album.controller');
author
module.exports = function(app) {
    app.get("/api", AlbumController.findAll);
    app.get("/api/:id", AlbumController.findOne);
    app.post('/api/new', AlbumController.create);
    app.put('/api/edit/:id', AlbumController.edit);
    app.delete("/api/delete/:id", AlbumController.deleteOne);
}