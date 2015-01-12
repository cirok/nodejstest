var connect = require('connect'),
moment = require('moment'),
express = require('express'),
bodyParser = require('body-parser'),
morgan = require('morgan'),
path = require('path'),
multer = require('multer'),
methodOverride = require('method-override'),
cookieParser = require('cookie-parser'),
serveStatic = require('serve-static'),
errorhandler = require('errorhandler'),
routes = require('./routes'),
exphbs = require('express3-handlebars');
module.exports = function(app) {
	app.engine('handlebars', exphbs.create({
		defaultLayout: 'main',
		layoutsDir: app.get('views') + '/layouts',
		partialsDir: [app.get('views') + '/partials'],
		helpers: {
			timeago: function(timestamp) {
				return moment(timestamp).startOf('minute').fromNow();
			}
		}
	}).engine);
	app.use(bodyParser.urlencoded({
		extended: true,
		uploadDir:path.join(__dirname,'../public/upload/temp')
	}));
	//app.use(bodyParser({keepExtensions:true,uploadDir:path.join(__dirname,'../public/upload/temp')}));
	app.set('view engine', 'handlebars');
	app.use('/public/', express.static(path.join(__dirname, '../public')))
	.use(methodOverride())
	.use(multer())
	  /*.use(bodyParser.urlencoded({
		  extended: true,
		  uploadDir: path.join(__dirname, '../public/upload/temp')
	  }))*/
	  /*.use(bodyParser.json())*/
	  //.use(bodyParser({uploadDir:path.join(__dirname, '../public/upload/temp')}))
	  .use(morgan('dev'))
	  .use(cookieParser('some-secret-value-here'));
	  //.set('uploadDir', '../public/upload/temp');
	  routes.initialize(app, new express.Router());
	if ('development' === app.get('env')) {
	app.use(errorhandler());
	}

return app;
};

