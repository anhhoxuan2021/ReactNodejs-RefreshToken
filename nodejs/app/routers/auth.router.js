'use strict';
module.exports = app =>{  
   const authController = require("../controllers/auth.controller");


    const passport = require('passport');
    var router = require("express").Router();

    router.post("/register", authController.sign_up);
    router.post("/login", authController.login);
    //router.post("/logout", authController.userLogout);
    router.post('/refresh-token', authController.refreshToken); 

    app.use('/api', router);
  };