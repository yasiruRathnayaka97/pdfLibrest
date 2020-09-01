const mongoose=require('../DB/DB');
const Schema = mongoose.Schema;
const historySchema = new Schema({
  email:String,
  dateTime:String,
  search: String,
});


module.exports=mongoose.model('History', historySchema);