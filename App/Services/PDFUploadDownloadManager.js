var multer  = require('multer');
const fs = require('fs')
const path=require('path');
const rimraf = require("rimraf");
class PDFUploadDownloadManager{
  static createUpload(pdfPath){
    
    const storage = multer.diskStorage({
      destination: (req, file, cb) =>{
          this.createDir(pdfPath);
          cb(null, pdfPath);
      },

      filename: function(req, file, cb) {
          cb(null, "pdf.pdf");
      },
  });
    return multer({storage:storage,fileFilter:(req,file,cb)=>{
      if(path.extname(file.originalname)!='.pdf'){
        return cb(new Error('Not a pdf'));
      }
      else{
        cb(null,true);
      }
    }}).single('pdf');
   }
  static createDir(dir){
     fs.mkdirSync(dir);
   
  }
  static readDir(dir){
    return fs.readdirSync(dir);
  }
  static deleteDir(dir){
      // fs.rmdirSync(dir, { recursive: true });
      rimraf(dir,  ()=> { 
        return true });

  }

static async getPDFDownloadPath(pdfID){
    var pdfPath='downloads/'+timeStamp+'_PDF';
    return pdfPath;
}
}
module.exports=PDFUploadDownloadManager;