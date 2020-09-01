const PDFUploadDownload=require('../Services/PDFUploadDownloadManager');
const PDFStore=require('../Services/PDFStore');
const Crawler=require('../Services/Crawler');
const PDFInfoModel=require('../Models/PDFInfoModel');
const PDFAccessModel=require('../Models/PDFAccessModel');
const PDFIndexManager=require('../Services/PDFIndexManager');
class PDFUploadDownloadController{

static getPDFUpload(timeStamp){
    let pdfPath=this.getPDFUploadPath(timeStamp);
    return PDFUploadDownload.createUpload(pdfPath);
}

static async createDocuments(dirPath,pdfID){
    var pdf=PDFUploadDownload.readDir(dirPath);
    return await Crawler.createDocuments(dirPath+'/'+pdf[0],pdfID);
    
}
static getPDFID(email,timeStamp){
    var pdfID=email+'_'+timeStamp
    return pdfID;
}
static async savePDFInfo(email,pdfName,description,timeStamp,accessLevel){
        var pdfID=this.getPDFID(email,timeStamp)
        var uploadDate=timeStamp
        await PDFAccessModel.createAccess(email,pdfID,accessLevel);
        await PDFInfoModel.createPDF(pdfID,pdfName,description,uploadDate,'');
}
static async addDocuments(email,timeStamp){
  let pdfPath=this.getPDFUploadPath(timeStamp);
  let pdfID=this.getPDFID(email,timeStamp);
  await PDFStore.upload(pdfPath,pdfID);
  var arr=await this.createDocuments(pdfPath,pdfID);
  await PDFUploadDownload.deleteDir(pdfPath);
  var docArr=arr[0];
  var headingArr=arr[1];
  PDFIndexManager.addPDFDocument(docArr);
  PDFIndexManager.addHedingDocument(headingArr);
}
// static async getPDFDownload(pdfID,category){

//     if(await PDFStore.download(pdfID,pdfPath,category)){
//            return pdfPath;
//     }
//     else{
//         return false;
//     }

// }
  //create unique pdf names.
static getPDFUploadPath(timeStamp){
  var pdfPath='uploads/'+timeStamp+'_PDF';
  return pdfPath;
}
}
module.exports=PDFUploadDownloadController;