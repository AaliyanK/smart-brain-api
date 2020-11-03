const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


// Initialize DB
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'password',
      database : 'smartbrain'
    }
  });

const app = express();


// Go to network tab in developer tools to see if request worked or not

// NEEDED TO USE req.body
app.use(express.json());
// For frontend
app.use(cors())

app.get('/', (req,res)=> { res.send('it is working!')})

app.post('/signin', (req, res) => { signIn.handleSignin(req,res,db,bcrypt) })

// Dependency injection, send in dependencies to function
app.post('/register', (req,res) => { register.handleRegister(req, res, db, bcrypt) } )

app.get('/profile/:id', (req,res) => { profile.handleProfileGet(req,res,db)})

app.put('/image', (req,res) => { image.handleImage(req,res,db) })

app.post('/imageurl', (req,res) => { image.handleApiCall(req,res) })

// To deploy! PORT
app.listen(process.env.PORT, ()=>{
    console.log(`Server is listening on port ${process.env.PORT}`)
})


// API planning

// Signin Route: POST, respond with success/fail
// Register Route: POST, respond with user object
// profile/:userid : GET, respond with user
// image: PUT, update user profile, respond with updated user object/rank