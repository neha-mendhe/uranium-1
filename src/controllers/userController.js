const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async function (req, res) {
  try {
    let data = req.body;
    if (Object.keys(data).length != 0) {
      let savedData = await userModel.create(data)
      res.status(201).send({ msg: savedData })
    }
    else res.status(400).send({ msg: "BAD REQUEST" })
  }
  catch (err) {
    console.log("This is the error :", err.message)
    res.status(500).send({ msg: "Error", error: err.message })
  }
}

const loginUser = async function (req, res) {
  try {
    let data = req.body
    if (Object.keys(data).length != 0) {
      let user = await userModel.findOne({ emailId: data.emailId, password: data.password });
      if (!user)
        return res.status(403).send({
          msg: "username or the password is not corerct",
        });
      let token = jwt.sign(
        {
          userId: user._id.toString(),
          batch: "uranium1",
          organisation: "FUnctionUp",
        },
        "sonu kumar rai"
      );
      res.status(201).send({ status: true, token: token });
    }
    else {
      res.status(400).send({ msg: "BAD REQUEST" })
    }
  }
  catch (err) {
    console.log("This is the error :", err.message)
    res.status(500).send({ msg: "Error", error: err.message })
  };
}

const getUserData = async function (req, res) {
  try {
    let userId = req.params.userId;

    let userDetails = await userModel.findById(userId);
    if (!userDetails) {
      return res.status(401).send({ status: false, msg: "No such user exists" });
    }
    res.send({ status: true, data: userDetails });
  }
  catch (err) {
    console.log("This is the error :", err.message)
    res.status(500).send({ msg: "Error", error: err.message })
  };
}

const updateUser = async function (req, res) {

  try {

    let userId = req.params.userId;
    let user = await userModel.findById(userId);
    if (!user) {
      return res.status(401).send({ status: false, msg: "No such user exists" });
    }

    let userData = req.body;
    if (Object.keys(userData).length != 0) {
      let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData, { new: true });

      res.status(200).send({ status: true, data: updatedUser });
    }
    else {
      res.status(400).send({ msg: "BAD REQUEST" })
    }
  }
  catch (err) {
    console.log("This is the error :", err.message)
    res.status(500).send({ msg: "Error", error: err.message })
  };
}

const deleteUser = async function (req, res) {

  try{
  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  if (!user) {
    return res.status(401).send({status: false, msg: "No such user exists"});
  }

  let deletedUser = await userModel.findOneAndUpdate(
    { _id: userId },
    { $set: { isDeleted: true } },
    { new: true }
  );

  res.status(204).send({ status: true, data: deletedUser });
}
catch (err) {
  console.log("This is the error :", err.message)
  res.status(500).send({ msg: "Error", error: err.message })
};
}

const postMessage = async function (req, res) {
  let message = req.body.message
  // Check if the token is present
  // Check if the token present is a valid token
  // Return a different error message in both these cases
  let token = req.headers["x-auth-token"]
  if(!token) return res.send({status: false, msg: "token must be present in the request header"})
  let decodedToken = jwt.verify(token, 'sonu kumar rai')

  if(!decodedToken) return res.send({status: false, msg:"token is not valid"})
  
  //userId for which the request is made. In this case message to be posted.
  let userToBeModified = req.params.userId
  //userId for the logged-in user
  let userLoggedIn = decodedToken.userId

  //userId comparision to check if the logged-in user is requesting for their own data
  if(userToBeModified != userLoggedIn) return res.send({status: false, msg: 'User logged is not allowed to modify the requested users data'})

  let user = await userModel.findById(req.params.userId)
  if(!user) return res.send({status: false, msg: 'No such user exists'})
  
  let updatedPosts = user.posts
  //add the message to user's posts
  updatedPosts.push(message)
  let updatedUser = await userModel.findOneAndUpdate({_id: user._id},{posts: updatedPosts}, {new: true})

  //return the updated user document
  return res.send({status: true, data: updatedUser})
}
module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;
module.exports.postMessage=postMessage