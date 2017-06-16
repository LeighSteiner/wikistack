const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
// point nunjucks to the directory containing templates and turn off caching; configure returns an Environment 
// instance, which we'll want to use to add Markdown support later.
var env = nunjucks.configure('views', {noCache: true});

const models = require('./models');

app.use(morgan('dev'));

models.db.sync({force: true})
.then(function(){
	app.listen(3000,function(){
	console.log('listening on port 3000...');
	});
})
.catch(console.error);


// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);

// app.use(express.static(path.join(__dirname, '/views')));
