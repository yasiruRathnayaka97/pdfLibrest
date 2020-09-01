const express=require('express');
const jwt = require('jsonwebtoken');
const UD=require('../Controllers/PDFUploadDownloadController');
const router=express.Router();
const secret="secret";
const AWS = require('aws-sdk');
router.post('/upload',async (req,res,next)=>{
    var timeStamp=Date.now();
    var upload=UD.getPDFUpload(timeStamp);
    upload(req,res,(err)=>{
        var token=req.body.jwt;
        var email=jwt.verify(token, secret, (err, decoded) => {
            email=decoded.email;
            return email
        });
        var pdfName=req.body.pdfName;
        var accessLevel=req.body.accessLevel;
        var description=req.body.description;
    if(err){
        res.json({
            'status':false
        });
    }
    else{
        UD.savePDFInfo(email,pdfName,description,timeStamp,accessLevel);
        UD.addDocuments(email,timeStamp);
    
        res.json({
            'status':true
        });
    }
    });
});


module.exports=router;
