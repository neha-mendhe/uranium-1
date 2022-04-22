// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema( {
//     firstName: String,
//     lastName: String,
//     mobile: {
//         type: String,
//         unique: true,
//         required: true
//     },
//     emailId: String,
//     gender: {
//         type: String,
//         enum: ["male", "female", "LGBTQ"] //"falana" will give an error
//     },
//     age: Number,
//     // isIndian: Boolean,
//     // parentsInfo: {
//     //     motherName: String,
//     //     fatherName: String,
//     //     siblingName: String
//     // },
//     // cars: [ String  ]
// }, { timestamps: true });

// module.exports = mongoose.model('User', userSchema) //users



// // String, Number
// // Boolean, Object/json, array



// const mongoose = require("mongoose")

// const authorSchema =new mongoose.Schema({
//     author_id :{
//         type: Number,
//         required :true
//     },
//      author_name:String,
//      age: Number,
//      address: String
// },
// {timestamps:true})

// module.exports = mongoose.model("Author",authorSchema)





/* const mongoose = require('mongoose');

 const authorSchema = new mongoose.Schema( {
     author_id: Number,
    author_name: String,
     age: String,
     address: String

     },    { timestamps: true });

 module.exports = mongoose.model('Author', authorSchema)*/

/******************************************************************************************************/

const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    authorName: String,
	age: Number,
	address: String,
    rating: Number
    }, { timestamps: true });

module.exports = mongoose.model('Author1', authorSchema) //author1




