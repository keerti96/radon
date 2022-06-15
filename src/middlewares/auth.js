const jwt = require("jsonwebtoken");

const authenticate = function(req, res, next){
    
  let token = req.headers["x-Auth-token"];
  if (!token) token = req.headers["x-auth-token"];

  //If no token is present in the request header return error
  if (!token) return res.send({ status: false, msg: "token must be present" });
  
  
  // If a token is present then decode the token with verify function
  // verify takes two inputs:
  // Input 1 is the token to be decoded
  // Input 2 is the same secret with which the token was generated
  // Check the value of the decoded token yourself

// Check if the token present is a valid token
// Return a different error message in this case
  let decodedToken = jwt.verify(token, "functionup-radon");
  if (!decodedToken)
    return res.send({ status: false, msg: "token is invalid" });

    else{
      req.decodedToken = decodedToken;
        next();
    }
}

const authorise = function(req, res, next) {
  // comapre the logged in user's id and the id in request
  //userId for which the request is made. In this case message to be posted.
  let userToBeModified = req.params.userId
  //userId for the logged-in user
  let {userId} = req.decodedToken

  //userId comparision to check if the logged-in user is requesting for their own data
  if(userToBeModified != userId) return res.send({status: false, msg: 'User logged is not allowed to modify the requested users data'})

  next()
}


module.exports = {authenticate, authorise } 
