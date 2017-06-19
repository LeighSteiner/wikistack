const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const routes = require("./routes");
// point nunjucks to the directory containing templates and turn off caching; configure returns an Environment
// instance, which we'll want to use to add Markdown support later.
var env = nunjucks.configure('views', {noCache: true});

var models = require('./models');
var Page = models.Page;
var User = models.User;


//Parsing party
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests



app.use(morgan('dev'));
app.use("/", routes);

models.db.sync({force: false}) //false saves; true resets db
.then(function(){
	app.listen(3001,function(){
	console.log('listening on port 3001...');
	});
})
.catch(console.error);


// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);

// app.use(express.static(path.join(__dirname, '/views')));
