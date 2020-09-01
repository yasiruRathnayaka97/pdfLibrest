const mongoose=require('../DB/DB');
require('../Schema/PDFInfoSchema');
const PDF = mongoose.model('PDF');
class PDFInfoModel{
static async createPDF(pdfID,pdfName,description,uploadDate){
  await PDF.create({
    pdfID:pdfID,
    pdfName:pdfName,
    description:description,
    uploadDate:uploadDate,
  });
}


static async getPDFByID(pdfID){
    return await PDF.findOne({pdfID:pdfID});
}

static async deletePDF(pdfID){
    return await PDF.delete({pdfID:pdfID});
}
}
module.exports=PDFInfoModel;