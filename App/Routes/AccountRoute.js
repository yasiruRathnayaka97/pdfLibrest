const express=require('express');
const AccountController=require('../Controllers/AccountController');
const router=express.Router();
const jwt = require('jsonwebtoken');
const secret='secret';

router.post('/signUp',async (req,res,next)=>{
  var userName=req.body.userName;
  var email=req.body.email;
  var password=req.body.password;
  res.json({'status':await AccountController.signUp(userName,email,password)});
 
});

router.post('/signIn',async (req,res,next)=>{
  var email=req.body.email;
  var password=req.body.password;
  if(await AccountController.signIn(email,password)){
     res.json({'message':jwt.sign({ email: email}, secret)});
  }
  else{
    res.json({'message':"Wrong Credentials"});
  }
 

  
});

router.get('/delete/:email/:password',async (req,res,next)=>{
  var userName=req.params.email;
  var password=req.params.password;
  res.json({'status':await AccountController.delete(userName,password)});
 
});
router.post('/getProfileInfo',async (req,res,next)=>{
  var email=req.email;
  res.json({'profileInfo':await AccountController.getAccountInfo(email)});
});

router.post('/getUploadsAndShares',async (req,res,next)=>{
  var email=req.email;
  var uploadsAndShares=await AccountController.getUploadsAndShares(email)
  res.json({'level_1Uploads':uploadsAndShares[0],
  'level_2Uploads':uploadsAndShares[1]});
  next();
});
router.get('/',(req,res,next)=>{
 res.json({'message':"welcome to PDF-Library Account."});
 next();
});
router.post('/setDescription',async (req,res,next)=>{
 var email=req.email;
 var description=req.body.description;
 res.json({"status": await AccountController.updateDescription(email,description)});
 next();
});
module.exports=router;



