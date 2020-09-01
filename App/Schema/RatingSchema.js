const mongoose=require('../DB/DB');
const Schema = mongoose.Schema;
const ratingSchema = new Schema({
 rate:Number,
 pdfId:Number
});

module.exports=mongoose.model('Rating', ratingSchema);