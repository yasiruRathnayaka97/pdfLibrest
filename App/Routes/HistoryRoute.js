const express=require('express');
const HistoryController=require('../Controllers/HistoryController');
const router=express.Router();
router.post('/getHistory',async (req,res,next)=>{
    var email=req.email;
    res.json({'historyList':await HistoryController.getHistory(email)});
   });

module.exports=router;