const mySchema = require("../models/schema")

const mongoose = require('mongoose');

const createBatch = async (req, res) => {
    let data = req.body
    let savedData = await mySchema.batch.create(data)
    res.send({msg: savedData})
}

const createDeveloper = async (req, res) => {
    let data = req.body
    if(data.batch){
        if(!mongoose.isValidObjectId(req.body.batch)) return res.send({msg: "Invalid Batch ObjectId."})
        let b_check = await mySchema.batch.find({_id: data.batch})
        if(b_check.length){
            if(!await mySchema.developer.exists(data)){ 
                let savedData = await mySchema.developer.create(data)
                res.send({msg: savedData})
            }
            else res.send({msg: "Develpoer already exists in our DB."})
        }
        else res.send({msg: "Batch ObjectId doesn't belong to Batch collection."})
    }
    else res.send({msg: "Must enter Batch ObjectId."})
}

const scholarship_developers = async(req, res) => {
    let scolars = await mySchema.developer.find({gender: "female", percentage: {$gte: 70}},{name: 1,gender: 1, percentage: 1, _id: 0})
    res.send({msg: scolars})
}

const getDeveloper = async(req, res) => {
    let findBatch_OID = await mySchema.batch.find({name: req.query.program})
    let eligible = await mySchema.developer.find({batch: findBatch_OID, percentage: {$gte: req.query.percentage}})
                                            .select({name: 1,gender: 1, percentage: 1, _id: 0})
    if(eligible.length) res.send({msg: eligible})
    else res.send({msg: "No Such Developers found in this Batch."})
}

const ObjectIdCheck = async (req, res) => {
    if(mongoose.isValidObjectId(req.body.oid)) return res.send({msg: "Valid ObjectId"})
    res.send({msg: "Invalid ObjectId"})
}

module.exports = {createBatch, createDeveloper, scholarship_developers, getDeveloper, ObjectIdCheck}