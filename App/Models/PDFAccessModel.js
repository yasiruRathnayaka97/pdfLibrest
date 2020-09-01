const mongoose=require('../DB/DB');
require('../Schema/PDFAccessSchema');
const Access = mongoose.model('Access');
class PDFAccessModel{
static async createAccess(email,pdfID,accessLevel){
  await Access.create({
    email:email,
    pdfID:pdfID,
    accessLevel:accessLevel
  });
}


static async getPDFOwner(pdfID){
    return await Access.findOne({pdfID:pdfID,accessLevel:{$ne : 3}});
}
static async getPDFAccess(pdfID,email){
    return await Access.findOne({email:email,pdfID:pdfID});
}
static async getAccessLevel_1_2(email){
    return await Access.find({email:email,
    accessLevel:{$ne : 3}});
}
static async getAccessLevel_3(email){
  return await Access.find({email:email,
    accessLevel:3});
}
static async deleteAccess(pdfID){
    return await Access.delete({pdfID:pdfID});
}
}
module.exports=PDFAccessModel;