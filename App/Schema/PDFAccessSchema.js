const mongoose=require('../DB/DB');
const Schema = mongoose.Schema;
const pdfAccessSchema = new Schema({
    email:String,
    pdfID:String,
    accessLevel:Number,
});

module.exports=mongoose.model('Access', pdfAccessSchema);
