const mongoose = require('mongoose');
const config=require('dotenv').config();
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var db=mongoose.connection;
db.on('error',()=>{
  console.log('mongoDB connection error');
});
db.once('open',()=>{
  console.log('mongoDB connection success');
});
module.exports=mongoose;

