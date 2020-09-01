const express=require('express');
var parseurl = require('parseurl')
const jwt = require('jsonwebtoken');
const bodyParser=require('body-parser');
const accRoute=require('./App/Routes/AccountRoute');
const pdfRoute=require('./App/Routes/PDFUploadDownloadRoute');
const searchRoute=require('./App/Routes/SearchRoute');
const historyRoute=require('./App/Routes/HistoryRoute');
const config=require('dotenv').config();
const client=require('./App/DB/redisClient');
const NotificationController=require('./App/Controllers/NotificationController');
const AccountController=require('./App/Controllers/AccountController');
var cors = require('cors');
const app=express();
const secret="secret";
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(cors());

app.use( bodyParser.json());
app.use( bodyParser.urlencoded( {
    extended: true
} ) );


app.use((req,res,next)=>{
//   client.flushdb( function (err, succeeded) {
//     console.log(succeeded); // will be true if successfull
// });

// client.keys('*', function (err, keys) {
//   if (err) return console.log(err);

//   for(var i = 0, len = keys.length; i < len; i++) {
//     console.log(keys[i]);
//   }
// });   
   if(parseurl(req).path=='/PDF-Library/account/signin'){
              next();
        
   }
    else if(parseurl(req).path=='/PDF-Library/PDF/upload'){
         next();
    }
    else if(parseurl(req).path=='/PDF-Library/account/signup'){
          next();
    }
    else{
      var token = req.body.jwt;
    if (token) {  
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                res({"message":"Not Signed In"});
            }
            req.email=decoded.email;
            next();
        });
        
    }
}
    
});
app.use('/PDF-Library/Account',accRoute);
app.use('/PDF-Library/PDF',pdfRoute);
app.use('/PDF-Library/Searcher',searchRoute);
app.use('/PDF-Library/History',historyRoute);
server.listen(process.env.SERVER_PORT||process.env.PORT);
io.on('connection', (socket)=> {
 
  socket.on('notification_response', async (status,_jwt,email,pdfID) => {
    var token = _jwt;
    if (token) {  
        jwt.verify(token, secret, async (err, decoded) => {
            if (err) {
              return;
            }
    await NotificationController.updateStatus(email,pdfID,status);
    if(status=="accept" ){
        await  NotificationController.sharePDF(email,pdfID);
    }
     });
      } 
  });

  socket.on('message',(email) => {
      client.set(email,socket.id);

    
      
  });
    socket.on("pdf_requester",async (_jwt,uploaderID,pdfID,pdfName)=>{
       var token = _jwt;
    if (token) {  
        jwt.verify(token, secret, async (err, decoded) => {
            if (err) {
              return;
            }
            var email=decoded.email;
            client.get(email+"_"+uploaderID+"_"+pdfID,async (err,value)=>{
            if (value!=1){
               client.set(email+"_"+uploaderID+"_"+pdfID,1);
               io.emit('pdf_uploader',email,uploaderID,pdfID,pdfName); 
               await NotificationController.saveMessage(email,uploaderID,pdfID,"pending");
               }   
            });
        
        });
      }     
    });

    socket.on("disconnect",()=>{
   
    });
  });


