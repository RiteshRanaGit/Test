const express = require('express');
const mongooes = require('mongoose');
const bodyParser = require('body-parser');
// const passport = require('passport');

const candidate = require('./routes/api/candidate');
const testScore = require('./routes/api/testScore');




const app = express();

//Body parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); 



//DB configur
const dbHnr =  require('./config/keys').mongoURI;

// connect to mongoDb

mongooes
    .connect(dbHnr,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=> console.log('connect to database'))
    .catch(err =>console.log(err));




//passport middleware 
//app.use(passport.initialize());

//Passport config 
// require('./config/passport')(passport);

//use routes 

app.use('/api/candidate', candidate);
app.use('/api/testScore', testScore);
// app.use('/api/profile', profile);
// app.use('/api/classrooms', classrooms);
// app.use('/api/notes', notes);
// app.use('/api/subject', subject);
// app.use('/api/classnotice', classnotice);
// app.use('/api/subjectnotice', subjectnotice);



const port = process.env.PORT  || 4000;

 app.listen(port, console.log(`server is running on port ${port}`));