/*const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    bookName: String, 
    authorName: String, 
    tags: [String],
    
   isPublished: Boolean,
    prices: {
        indianPrice: String,
        europePrice: String,
    },
    sales: {type: Number, default: 10},
    
    // " best boook on earth"   [ "Nodejs in detail" , "mongodb in detail", "fronend in detail"] 
    // {
        // "ch1 ": "awesome intro to JS",
        // "ch2" : "intro to nodejs",
        // "ch3" : "intro to db"
    //  }
    summary :  mongoose.Schema.Types.Mixed,
    isDeleted: Boolean //true on book deletion i.e you flag the document/data as isDeleted: true..(mark "dirty")

}, { timestamps: true });


module.exports = mongoose.model('Book', bookSchema) //users
/*const mongoose = require("mongoose")

const authorSchema =new mongoose.Schema({
    author_id :{
        type: Number,
        required :true
    },
     author_name:String,
     age: Number,
     address: String
},
{timestamps:true})

module.exports = mongoose.model("Author",authorSchema)*/



//  const mongoose = require('mongoose');

//  const authorSchema =new mongoose.Schema({
//      author_id :{
//        type: Number,
//          required :true
//      },
//       author_name: String,
//       age: Number,
//       address: String
//  },
//  {timestamps:true})

//  module.exports = mongoose.model("authorName",authorSchema)

/******************************************************************************************/
//19/4/22 
const {user,product,order} = require("../models/schemas")
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