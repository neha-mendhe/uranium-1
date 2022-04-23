   /*batch and devloper api create 18/4/2022 */
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const batchSchema = mongoose.Schema({
    name: String,
    size: Number,
    program: {type: String, enum: ["backend", "frontend"]}
}, { timestamps: true })

const developerSchema = new mongoose.Schema({
    name: String,
    gender:{type: String, enum: ["male", "female", "others"]},
    percentage: Number,
    batch: {type: ObjectId, ref: "Batch"}
}, { timestamps: true });
    
const developer = mongoose.model('Developer', developerSchema) //developers
const batch = mongoose.model('Batch', batchSchema) //batchs
module.exports = {developer, batch}
