const express = require('express');
 
const router = express.Router();
const keys = require('../../config/keys');


// lodad moddles
const Candidate = require('../../models/Candidate');
const TestScore = require('../../models/TestScore');
const { route } = require('./testScore');




// @route   GET api/candidate/test
// @decs    Test user route
// @access  Public

router.get('/test', (req, res) => res.json({ msg: "candidate is working"}));

// @route   post api/candidate
// @decs    create a class
// @access  public

router.post('/', (req, res) => {
    const errors = {};


       const name = req.body.name;        
       const email = req.body.email;
       


       Candidate
       .findOne({
           name,
           email
       })           
       .then(candidate =>{
       if(candidate){
           
           errors.classroom = "candidateis already exist";
           
           return res.status(400).json(errors);
       } 
      
       const newCandidate = new Candidate({
           name,
           email
       })
       newCandidate.save()
       .then(candidate => res.json(candidate))
       .catch(err => err);
       
    
           
       
   }).catch(err => err);
}     

);




module.exports = router;