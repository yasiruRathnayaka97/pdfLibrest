const SearchManager=require('../Services/SearchManager');
// const Rating=require('../Models/RatingModel');
const PDFInfoModel=require('../Models/PDFInfoModel');
const AccountModel=require('../Models/AccountModel');
const PDFAccessModel=require('../Models/PDFAccessModel');
const primary_result_size=5;
const advance_result_size=25;
class SearchController{

    static async getPrimarySearch(search){
       var searchDoc={
            sentence:search
        }
        return await SearchManager.pdfSearch(searchDoc,primary_result_size) ;
    }

    // static async ratePDF(pdfId,rate){
    //     var pre_rate=await Rating.getRating(pdfId).rate;
    //     var pre_count=await Rating.getRating(pdfId).count;
    //     var post_count=pre_count+1
    //     var post_rate=(pre_rate*pre_count+rate)/post_count
    //     return await Rating.updateRating(pdfId,post_rate,pre_count)
    // }
    static async getAdvanceSearch(search){
         var searchDoc={
            sentence:search
        }
        return await SearchManager.advanceSearch(searchDoc,advance_result_size);
          
    }
    static async getPDF(pdfId,email){
            var access=await PDFAccessModel.getPDFAccess(pdfId,email);
            var out=await PDFInfoModel.getPDFByID(pdfId);
            var result={};
            result.pdfID=out.pdfID;
            result.pdfName=out.pdfName;
            result.description=out.description;

            if (access){
                result.status='Download PDF';
            }
            else{
                result.status='Request PDF';
            }
        return result;
    }
    static async getUploader(uploaderEmail){
        return await AccountModel.getAccount(uploaderEmail);
    }
}
module.exports=SearchController;