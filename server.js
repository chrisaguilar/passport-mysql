require('dotenv').config();

const path = require('path');

const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const express = require('express');
const passport = require('passport');
const session = require('express-session');

const models = require('./models/index.js');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => res.send('Hello, World'));

require('./routes/auth')(app, passport);
require('./config/passport/passport')(passport, models.user);

models.sequelize
    .sync()
    .then(() => console.log('Database Synchronized'))
    .catch((err) => console.error(err));

app.listen(8080, () => console.log('Listening on port 8080'));
