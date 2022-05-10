const express = require('express');
const router = express.Router();
const userController = require("../controller/userController")
const booksController = require("../controller/booksController")
const middleware = require("../middleware/userAuth")

router.post("/register",userController.CreateUser)
router.post('/Login', userController.userLogin)
router.post('/books',middleware.tokenValidator,booksController. createBook )
router.get("/books",middleware.tokenValidator,booksController.getAllBooks)

module.exports=router;