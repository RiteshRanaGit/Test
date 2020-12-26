const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema
const TestScore = new Schema ({
    candiate_id:{
        type: String,
        required: true
    },

    first_round: {
        get_marks: {
            type: Number,
            required:  true

        },
        out_of: {
            type: Number,
            required: true
        }
    },
    
    second_round: {
        get_marks: {
            type: Number,
            required: true

        },
        out_of: {
            type: Number,
            required: true
        }
    },
    third_round: {
        get_marks: {
            type: Number,
            required: true
        },
        out_of: {
            type: Number,
            required: true
        }
    },
    avg: {
        get_marks: {
            type: Number,
            required: true
        },
        out_of: {
            type: Number,
            required: true
        }
    },
    
         
});

module.exports = User = mongoose.model('testscore', TestScore);

