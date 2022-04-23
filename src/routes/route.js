/*const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController")
const BookController= require("../controllers/bookController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createUser", UserController.createUser  )

router.get("/getUsersData", UserController.getUsersData)

router.post("/createBook", BookController.createBook  )

router.get("/getBooksData", BookController.getBooksData)

router.post("/updateBooks", BookController.updateBooks)
router.post("/deleteBooks", BookController.deleteBooks)

//MOMENT JS
const moment = require('moment');
router.get("/dateManipulations", function (req, res) {
    
    // const today = moment();
    // let x= today.add(10, "days")

    // let validOrNot= moment("29-02-1991", "DD-MM-YYYY").isValid()
    // console.log(validOrNot)
    
    const dateA = moment('01-01-1900', 'DD-MM-YYYY');
    const dateB = moment('01-01-2000', 'DD-MM-YYYY');

    let x= dateB.diff(dateA, "days")
    console.log(x)

    res.send({ msg: "all good"})
})

module.exports = router;*/




// const express = require('express');
// const router = express.Router();
// const allcontroller =require("../controllers/allcontroller")
// const bookModel =require("../models/bookModel")

// router.post ("/createNewAuthor", allcontroller.createNewAuthor)
// router.post ("/createNewBook",allcontroller.createNewBook)
// router.get("/ allBooks",allcontroller.allBooks)
// router.get("/updatedBookPrice",allcontroller.upadatedBookprice)
// router.get("/authorsName",allcontroller.authorsName)
// module.exports= router;
/***************************************************************************************** */

//const express = require('express');
//const router = express.Router();
//const userController = require("../controllers/userController")
//const bookController = require("../controllers/bookController")
//const authorBookController = require("../controllers/authorBookController")

//User route handlers
//router.post("/createUser", userController.createUser)
//router.get("/getUsersData", userController.getUsersData)

//Book route handlers
//router.post("/createBook", bookController.createBook)
// router.get("/getBooksData", bookController.getBooksData)
// router.post("/bookList", bookController.bookList)
// router.post("/getBooksInYear", bookController.getBooksInYear)
// router.post("/getParticularBooks", bookController.getParticularBooks)
// router.get("/getXINRBooks", bookController.getXINRBooks)
// router.get("/getRandomBooks", bookController.getRandomBooks)

//Auther & Book route handlers
// router.post("/createAuthor", authorBookController.createAuthor)
// router.post("/createBook2", authorBookController.createBook) //endpoint is createBook2 because createBook is already present
// router.post("/findBooks", authorBookController.findBooks)
// router.post("/findUpdate", authorBookController.findUpdate)
// router.get("/findRange", authorBookController.findRange)    

// module.exports = router;
/*********************************************************************************/


//const express = require('express');
//const router = express.Router();
//const bookController = require("../controllers/bookController");
//const bookModel = require("../models/bookModel");
//const authorModel = require("../models/authorModel");
//const publisherModel = require("../models/publisherModel");
//Author-Publisher-Book route handlers
//router.post("/createAuthor", bookController.createAuthor)
//router.post("/createPublisher", bookController.createPublisher)
//router.post("/createBook", bookController.createBook)
//router.get("/findBook", bookController.findBook)

//module.exports = router;
/***************************************************************************************/
//18/4/2020 

const express = require('express');
const router = express.Router();
const developerController = require("../controllers/developerController")

//Developer-Batch route handlers
router.post("/batches", developerController.createBatch)
router.post("/developers", developerController.createDeveloper)
router.get("/scholarship-developers", developerController.scholarship_developers)
router.get("/developers", developerController.getDeveloper)
router.post("/ObjectId_Checker", developerController.ObjectIdCheck)

module.exports = router;


