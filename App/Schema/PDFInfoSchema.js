const mongoose=require('../DB/DB');
const Schema = mongoose.Schema;
const pdfInfoSchema = new Schema({
  pdfID:String,
  pdfName:String,
  uploadDate:Date,
  description:String,
});

module.exports=mongoose.model('PDF', pdfInfoSchema);