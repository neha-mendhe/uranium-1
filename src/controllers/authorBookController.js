/*const UserModel= require("../models/userModel")

const createUser= async function (req, res) {
    let data= req.body
    let savedData= await UserModel.create(data)
    res.send({msg: savedData})
}

const getUsersData= async function (req, res) {
    let allUsers= await UserModel.find()
    res.send({msg: allUsers})
}

module.exports.createUser= createUser
module.exports.getUsersData= getUsersData*/
// const { count } = require("console")
// //const authormodel = require("../models/authorsModel")
// const bookModel = require("../models/bookModel")

// const createNewAuthor =async function(req,res){
//     const reqAuthor = req.body;
//     const savedData= await bookModel.create(reqAuthor)
//     res.send ({msg : savedData})

// }

// const createNewBook =async function(req,res){
//     const reqBook = req.body;
//     const saved= await bookModel.create(reqBook)
//     res.send ({msg : saved})
// }

// const allBooks =async function(req,res){
//     const authorDetails =await bookmodel.find({author_name:"Chetan Bhagat"})
//     const _id= authorDetails[0].authorDetails_id
//     const bookName = await bookModel.find({author_id:id}).select({name :1})
//     res.send({msg: bookName})
// }


// const upadatedBookprice =async function(req,res){
//     const bookDetails = await bookModel.find({name:"two states"})
//     const id = bookDetails[0].author_id
//     const authorN = await bookmodel.find({author_id:id}).select({name:1})
//     res.send({msg:bookName})

//     const bkName =bookDetails[0].name
//     const updatedPrice =await bookModel.findOneAndUpdate({name:bkName},{price:100},{new:true}).select({price:1, _id:0})
//     res.send({msg:authorN,updatedPrice})

// }
// const authorsName =async function(req,res){
// const bookId = await bookModel.find({price:{$gte:50, $lte:100}}).select({author_id:1, _id:0})
// const id = booksId.map( inp=> inp.author_id)

// let temp=[]
// for( let i=0; i< id.length;i++){
//     let x =id[i]
//     const author = await bookModel.find({author_id:x}).select({author_name:1,_id:0})
//     temp.push(author)

// }
// const authorName= temp.flat()
// res.send({msg:authorName})
// }
// module.exports.createNewAuthor= createNewAuthor
// module.exports.createNewBook =createNewBook
// module.exports.allBooks =allBooks
// module.exports.upadatedBookprice =upadatedBookprice
// module.exports.authorsName= authorsName
/***************************************************************************************************/


// const authorModel = require("../models/authorModels")
// const authorBookModel = require("../models/authorBookModels")

// const createAuthor = async (req, res) => {
//     let data= req.body
//     let savedData= await authorModel.create(data)
//     res.send({msg: savedData})
// }

// const createBook = async (req, res) => {
//     let data= req.body
//     let savedData= await authorBookModel.create(data)
//     res.send({msg: savedData})
// }

// const findBooks = async (req, res) => {
//     let a_id= await authorModel.find({author_name:req.body.author_name})//find returns an array
//     let data= await authorBookModel.find({author_id: a_id[0].author_id}).select({name: 1, _id: 0})
//     res.send({msg: data})
// }

// const findUpdate = async (req, res) => {
//     let a_id= await authorBookModel.findOneAndUpdate({name:req.body.name},{$set:{price:150}},{new:true})//findOneAndUpdate returns an object
//     console.log(a_id)
//     let data= await authorModel.find({author_id: a_id.author_id}).select({author_name: 1, _id: 0})
//     console.log(data)
//     res.send({msg: {author_name: data[0].author_name, price: a_id.price}})
// }

// const findRange = async (req,res) => {
//     let data = (await authorBookModel.find({price:{$gte:50, $lte:200}}).select({author_id:1, _id:0})).map(x => x.author_id)
//     let newDate = data.filter((item, index) => data.indexOf(item) === index)
//     let a_name = []
//     for(let i in newDate){
//         a_name.push(...await authorModel.find({author_id: newDate[i]}).select({ author_name :1, _id:0})) //... is used bcz otherwise find() will return an array of elements
//     }
//     console.log(a_name)
//     res.send({msg: a_name}) //if ... is not used in line 36then you can use a_name.flat() for same result
// }

// module.exports = {createAuthor, createBook, findBooks, findUpdate, findRange}


