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

/**************************************************************************************************** */
//19/4/22

const {user,product,order} = require("../models/schema")
const mongoose = require('mongoose');

const createUser = async (req, res) => {
    let data = req.body
    if(!await user.exists({name:data.name})){
    let savedData = await user.create(data)
    res.send({msg: savedData})
    }
    else res.send({msg: "This User already exists."})
}

const createProduct = async (req, res) => {
    let data = req.body
    if(!await product.exists({name:data.name})){
    let savedData = await product.create(data)
    res.send({msg: savedData})
    }
    else res.send({msg: "The product already exists."})
}

const createOrder = async (req, res) => {
    let freeUser = req.isFreeAppUser
    //checking if userId & productId is present in body and if yes check if they are valid ObjectIds----------> 
    if(!req.body.userId && !req.body.productId) return res.send({msg: "userId and productId is required."})
    if(!mongoose.isValidObjectId(req.body.userId)) return res.send({msg: "The UnserId is invalid."})
    if(!mongoose.isValidObjectId(req.body.productId)) return res.send({msg: "The ProductId is invalid."})
    //checking if the userId & productId are from user & product table os not--------->
    let userbalance = await user.findById(req.body.userId).select('balance')// this one I did by findById and 31 line I did using findOne
    if(!userbalance) return res.send({msg: "The userId doesn't belong to the user collection."})
    let productPrice = await product.findOne({_id: req.body.productId}).select('price') //select() is not needed actually, it's your choice
    if(!productPrice) return res.send({msg: "The productId doesn't belong to the product collection."})
    //checking assignment conditions and writing logic for all 3 scenarios------------>
    if(!freeUser && userbalance.balance >= productPrice.price){
        let newBalance = userbalance.balance - productPrice.price
        let orderData = await order.create({
            userId: req.body.userId,
            productId: req.body.productId,
            amount: productPrice.price,
            isFreeAppUser: false
        })
        await user.findOneAndUpdate({_id: req.body.userId}, {balance: newBalance})
        res.send({msg: orderData})
    }
    if(!freeUser && userbalance.balance < productPrice.price) return res.send({msg: "insufficient balance. Recharge!!"})
    if(freeUser){
        let orderData = await order.create({
            userId: req.body.userId,
            productId: req.body.productId,
            amount: 0,
            isFreeAppUser: true
        })
        res.send({msg: orderData})
    }
}

module.exports = {createUser, createProduct, createOrder}