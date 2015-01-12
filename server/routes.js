var home = require('../controllers/home'),
image = require('../controllers/image');

module.exports.initialize = function(app, router) {
app.get('/', home.index);
app.get('/images/:image_id', image.index);
app.post('/images', image.create);
app.post('/images/:image_id/like', image.like);
app.post('/images/:image_id/comment', image.comment);
app.use('/', router);
};