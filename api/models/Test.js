var mongoose = require( 'mongoose' );

var testSchema = new mongoose.Schema({
     name: String,
     description: String,
     timeLimit: Number,
     subject: String,
     questions: [
                    {
                         qid: String,
                         title: String,
                         options: { a: String, b: String, c: String, d: String},
                         correct: Number
                    }
     ],
     admin: {
               id: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
               name: String
     },
     availability: Boolean

})

mongoose.model('Test', testSchema);
