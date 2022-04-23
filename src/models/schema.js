   /*batch and devloper api create 18/4/2022 */
// const mongoose = require('mongoose');
// const ObjectId = mongoose.Schema.Types.ObjectId

// const batchSchema = mongoose.Schema({
//     name: String,
//     size: Number,
//     program: {type: String, enum: ["backend", "frontend"]}
// }, { timestamps: true })

// const developerSchema = new mongoose.Schema({
//     name: String,
//     gender:{type: String, enum: ["male", "female", "others"]},
//     percentage: Number,
//     batch: {type: ObjectId, ref: "Batch"}
// }, { timestamps: true });
    
// const developer = mongoose.model('Developer', developerSchema) //developers
// const batch = mongoose.model('Batch', batchSchema) //batchs
// module.exports = {developer, batch}
/***************************************************************************************************************/
//19/4/2022-tuesday middlewaer1,2
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const userSchema = mongoose.Schema({
    name: String,
	balance:{type: Number, default: 100},
	address:String,
	age: Number,
 	gender: {type: String, enum: ['male', 'female', 'others']},
	isFreeAppUser: {type: Boolean, default: false}
}, { timestamps: true })

const productSchema = new mongoose.Schema({
    name:String,
	category:String,
	price:{type: Number, required: true}
}, { timestamps: true });
    
const orderSchema = new mongoose.Schema({
    userId: {type: ObjectId, ref: 'User'},
	productId: {type: ObjectId, ref: 'Product'},
	amount: Number,
	isFreeAppUser: Boolean, 
	date: {type: Date, default: Date.now(),}
}, { timestamps: true });

const user = mongoose.model('User', userSchema) 
const product = mongoose.model('Product', productSchema) 
const order = mongoose.model('Order', orderSchema) 

module.exports = {user, product, order}
