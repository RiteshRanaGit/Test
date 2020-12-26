const { json } = require('body-parser');
const express = require('express');
 
const router = express.Router();
const keys = require('../../config/keys');


// lodad moddles
const Candidate = require('../../models/Candidate');
const TestScore = require('../../models/TestScore');

//Load user model
router.get('/test', (req, res) => res.json({ msg: "candidate is working"}));

// @route   post api/candidate
// @decs    create a class
// @access  private

router.post('/', (req, res) => {
    const errors = {};


       const name = req.body.name;
       const first_round = parseInt(req.body.first_round_marks);        
       const second_round = parseInt(req.body.second_round_marks);        
       const third_round = parseInt(req.body.third_round_marks);
       const out_of = 10;
       const calavg = (first_round, second_round, third_round) =>{
           return ((first_round + second_round + third_round)/3) 
       }
     
       const avg = parseFloat(calavg(first_round, second_round, third_round)).toFixed(2);
            
       
       


       Candidate
       .findOne({
           name,          
       })           
       .then(candidate =>{
       if(!candidate){
           
           errors.candidate = "candidateie dosent  exist";
           
           return res.status(400).json(errors);
       } 
        const candiate_id = candidate._id
        TestScore
        .findOne(
            candiate_id
        ).then( testscore =>{
            if(testscore){
                errors.testscore = " teste score is alreday exist"
            }
            const newtestscore = new TestScore({
                candiate_id,
                first_round:{
                    get_marks: first_round,
                    out_of
                },
                second_round:{
                    get_marks: second_round,
                    out_of
                },
                third_round:{
                    get_marks: third_round,
                    out_of
                },
                avg:{
                    get_marks: avg,
                    out_of
                },

            })
            newtestscore.save()
            .then(testscore => res.json(testscore))
            .catch(err => err);
            
           
        })
           
       
   }).catch(err => err);
}     

);


// @route   GET api/testscore/highscore
// @decs    Test user route
// @access  Public

router.get('/highscore', (req, res)=>{
    const errors ={};
    TestScore.
    find({

    }).then(testscore =>{
        if(!testscore){
            errors.msg= "not found"
        }
        const testscoreArray   = testscore;
        const testscoreLength = testscoreArray.length;
        var id ='';
        var marks= "";
      
        for(var i= 0; i<testscoreLength; i++){
        
           if(testscore[i].avg.get_marks > marks ){
               marks= testscore[i].avg.get_marks;
               id = testscore[i].candiate_id;
           }
        }
        
        Candidate
        .findOne({
            _id: id
        }).then(candiate =>{
            if(!candiate){
                errors.mg=" no candidaTE";
                return res.status(400).json(errors);
            }
            var candidate_info ={}
            const candiate_id = candiate._id;
            candidate_info.name = candiate.name;
            candidate_info.email = candiate.email;
            TestScore
            .findOne({
                candiate_id
            }).then(testscore =>{
                if(!testscore){
                    errors.msg=" no score";
                    return res.status(400).json(errors);
                }
                candidate_info.first_round=testscore.first_round.get_marks;
                candidate_info.second_round=testscore.second_round.get_marks;
                candidate_info.third_round=testscore.third_round.get_marks;
                candidate_info.avg=testscore.avg.get_marks;

                return res.status(200).json(candidate_info)



            })

        })
    
    })
});


// @route   GET api/testscore/highscore
// @decs    Test user route
// @access  Public

router.get('/allCandidate/avg', async (req, res)=>{

   
    const errors ={};
    Candidate.
    find({

    }).then(candidate =>{
        if(!candidate){
            errors.msg= "no  candidate  found"
        }
        
        const candidateArray   = candidate;
        const candidateLength = candidateArray.length;
       
        const all_candiadate =[];
      
        for(var i= 0; i<candidateLength; i++){
            var candidate_info = {};
            var id =candidate[i]._id;
            candidate_info.name=candidate[i].name;
            candidate_info.email=candidate[i].email;
            
           
         
            async function marks(id){
                
            const promise = new Promise((resolve) => {
                        setTimeout(() => resolve(
                            TestScore.findOne({candiate_id: id})
                            .then(testscore => {
                                if (!testscore) {
                                errors.mg = " no candidate";
                                return res.status(400).json(errors);
                                }
                                const value = testscore.avg.get_marks;
                            
                                // candidate_info.avg_marks= value;
                                return value;
                                //return  value;
                                //return value;
                            })   
                        ), 1000)
                        
                    });
                                      
                     // want to return this
                        
                          candidate_info.avg_marks = await promise;
                      
                               
                         return result;
              };
            
              async function s (id){
                let y = id;
                 x = await marks(y);
              
                return candidate_info.avg_marks = x;
            }
            

            s(id);
            
           
           
           
              
             async function f(candidate_info) {

                return await new Promise((resolve, reject) => {
                  setTimeout(() => resolve(all_candiadate.push(candidate_info)), 2000)
                });
              
                
              }
          
            f(candidate_info);
           
        }
        async function f2() {

            let promise = new Promise((resolve, reject) => {
              setTimeout(() => resolve(all_candiadate), 3000)
            });
          
            let result = await promise; 

            return res.status(200).json(result);
          }
          
        var result = f2();
       
        
        
        
    
    })
});



// @route   GET api/testscore/test
// @decs    Test user route
// @access  Public

router.get('/test', (req, res) => res.json({ msg: " testscore is working"}));


module.exports = router;