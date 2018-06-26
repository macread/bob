//npm i express dotenv passport passport-auth0 express-session massive
// to install all the server dependencies

//set server parts first, then test to make sure it works.
//next, if using authentication, set up passport 

//require what we need
require('dotenv').config();
const express = require('express') 
    , session = require('express-session') 
    , passport = require('passport') 
    , bodyParser = require('body-parser')
    , Auth0Strategy = require('passport-auth0')
    , massive = require('massive')
    , controller = require('./controller');

//deconstruct the data from the .env file
const {
    SERVER_PORT,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    CONNECTION_STRING
} = process.env;

const app = express(); //server
app.use(bodyParser.json());

//

massive(CONNECTION_STRING).then( db => {
    app.set('db', db)
});

//setup sessions
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//passport
// - setup authorization strategy
// - be sure to setup at the auth0 web site.
// - set the DOMAIN=, CLIENT_ID, CLIENT_SECRET, CALLBACK_URL
//      in .env
passport.use(
    new Auth0Strategy({
        domain: DOMAIN,
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        callbackURL: CALLBACK_URL,
        scope: 'openid profile'
        }, 
        (accessToken, refreshToken, extraParams, profile, done) => {
            const db = app.get('db');
            let {id, displayName, picture} = profile;
            db.user_find([id]).then( user => {
                if ( user[0] ){
                    done(null, user[0].id)  //just want to save the ID to save memory
                } else {
                    //create a new user
                    db.user_create([displayName, picture, id]).then( (createdUser) => {
                        done(null, createdUser[0].id) //save the new id
                    })
                }
            })
        }
    )
)

//serialize and deserialize sets up sessions
// serializeUser gets called on log in and decides what is stored in 
// in session
passport.serializeUser((id, done) => {
    done(null,id)
})

// deserizeUser runs everytime fetches what is stored in sessions
// and puts it in req.user
passport.deserializeUser((id, done) => {
    app.get('db').user_find_session([id]).then( user => {
        done(null, user[0])
    })
})

//passport
//setup authorization endpoints
app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/dashboard' // change to 3005 to build
}))

app.get('/api/logout', (req, res) => {
    req.logOut();
    res.redirect('http://localhost:3000'); // change to 3005 to build
})


app.get('/auth/user/', (req, res) => {
    if (req.user) {
        res.status(200).send(req.user);
    } else {
        res.status(401).send('Nice try')
    }
})
;

app.delete('/api/contact/:id', controller.deleteContact)
app.get('/api/contact/:id', controller.getContact);
app.get('/api/contacts/', controller.getContactCount);
app.get('/api/contacts/:id', controller.getContacts);
app.post('/api/contact', controller.addContact);
app.put('/api/contact', controller.updateContact);

app.get('/api/network/:id', controller.getNetwork);
app.post('/api/network', controller.addNetwork);

app.get('/api/meetings/', controller.getMeetingCount);

app.delete('/api/resources/:id',controller.deleteResource);
app.get('/api/resources', controller.getResources);
app.get('/api/resources/count', controller.getResourceCount)
app.post('/api/resources',controller.addResource);
app.put('/api/resources/:id',controller.updateResource);

app.get('/api/user', controller.getUser);
app.post('/api/user',controller.updateUser)

//server
//get that server going 
app.listen(SERVER_PORT, () => {
    console.log('Listening on port ', SERVER_PORT);
})