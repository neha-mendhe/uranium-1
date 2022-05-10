const BookModel = require("../models/booksModel")

const createBook = async (req, res) => {
    try {
        const validateField = (field) => {
            return String(field).trim().match(
                /^[a-zA-Z0-9][a-zA-Z0-9\s\-,?_.]+$/);
        };

        const data = req.body
        const userId = req.userId

        //check for empty body
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: "please enter some DETAILS!!!" })
        }
        //title--------------------------------------------------------------------------------------------

        if (!data.title) {
            return res.status(400).send({ status: false, message: "TITLE is required!!!" })
        }
        if (!validateField(data.title)) {
            return res.status(400).send({ status: false, message: "format of title is wrong!!!" })
        }
        //check for unique title
        const title = await BookModel.findOne({ title: data.title })
        if (title) {
            res.status(400).send({ status: false, message: "title already exist" })
        }

        //excerpt----------------------------------------------------------------------------------------
        if (!data.excerpt) {
            return res.status(400).send({ status: false, message: "EXCERPT is required!!!" })
        }
        if (!validateField(data.excerpt)) {
            return res.status(400).send({ status: false, message: "format of excerpt is wrong!!!" })
        }

        //userId------------------------------------------------------------------------------------------
        data.userId = userId

        //ISBN----------------------------------------------------------------------------------------------
        if (!data.ISBN) {
            return res.status(400).send({ status: false, message: "ISBN is required!!!" })
        }
        let validateISBN = /^[0-9]+$/
        if (!validateISBN.test(data.ISBN)) {
            return res.status(400).send({ status: false, message: "enter valid ISBN number" })
        }
        //check for unique ISBN
        const ISBN = await BookModel.findOne({ ISBN: data.ISBN })
        if (ISBN) {
            res.status(400).send({ status: false, message: "ISBN already exist" })
        }


        //category-----------------------------------------------------------------------------------------
        if (!data.category) {
            return res.status(400).send({ status: false, message: "CATEGORY is required!!!" })
        }
        if (!validateField(data.category)) {
            return res.status(400).send({ status: false, message: "format of category is invalid!!!" })
        }

        //subcategory--------------------------------------------------------------------------------------

        if (!Array.isArray(data.subcategory)) {
            return res.status(400).send({ status: false, message: "SUBCATEGORY is type is invalid!!!" })
        }
        const t = data.subcategory.filter((e) => e.trim().length != 0)
        data.subcategory = t

        if (data.subcategory.length == 0) {
            return res.status(400).send({ status: false, message: "SUBCATEGORY cannot be empty!!!" })

        }


        //reviews-------------------------------------------------------------------------------------------
        let reviews = data.reviews
        if (reviews) {
            if (!(reviews >= 0 && reviews <= 5)) {
                return res.status(400).send({ status: false, message: "rewiew rating is between 0 and 5!!!" })
            }
        }

        //deletedAt-------------------------------------------------------------------------------------------


        //releasedAt-----------------------------------------------------------------------------------------
        if (!data.releasedAt) {
            return res.status(400).send({ status: false, message: "RELEASED DATE is required!!!" })
        }
        let validateDate = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/gm
        if (!validateDate.test(data.releasedAt)) {
            return res.status(400).send({ status: false, message: "date must be in format  YYYY-MM-DD!!!" })

        }

        const book = await BookModel.create(data)
        return res.status(201).send({status:true , message:"success" , data:book})
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = { createBook }