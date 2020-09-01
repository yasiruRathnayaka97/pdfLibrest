const config=require('dotenv').config();
const AWS=require('../DB/S3');
const bucketName='PDF';
const fs = require('fs');
class PDFStore {

static async upload(filePath,pdfID){
var s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken:process.env.AWS_SESSION_TOKEN
    });
var params = {
  Bucket: process.env.BUCKETNAME ,
  Body : fs.createReadStream(filePath+"\\pdf.pdf"),
  Key : pdfID+'.pdf'
};

s3.putObject(params,(err, data)=> {

  if (err) {
    console.log(err);
  }

  if (data) {
  }
});

}

// static async download(pdfID){
// 	 var s3 = new AWS.S3();
// 	 var key= pdfID;
//    var filePath="uploads/"+pdfID
// 	 const params = {
//     		Bucket: process.env.BUCKETNAME ,
//     		Key:pdfID
//   };
//   s3.getObject(params, (err, data) => {
//     if (err) {
//     	console.log(err);
//       return;
//     }
    
//   });
// }

}

module.exports=PDFStore;