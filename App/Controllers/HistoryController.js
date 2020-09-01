const HistoryModel=require('../Models/HistoryModel');
class HistoryController{

    static async getHistory(email){
        return await HistoryModel.getHistory(email) ;
    }

   static async addHistory(email,search){
     await HistoryModel.addHistory(email,search);
     return true;
      
   }

   static async deleteHistory(email,dateTime){
       if(await HistoryModel.deleteHistory(email,dateTime)){
           return true;
       }
       else{
        return false;
       }
     
   }
}
module.exports=HistoryController;