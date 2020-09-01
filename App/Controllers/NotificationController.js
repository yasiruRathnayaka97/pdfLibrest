const NotificationModel=require('../Models/NotificationModel');
const PDFAccessModel=require('../Models/PDFAccessModel');
const AccountModel=require('../Models/AccountModel');
const PDFInfoModel=require('../Models/PDFInfoModel');
class NotificationController{

    static async saveMessage(sender,reciever,message,status){
    		NotificationModel.createNotification(sender,reciever,message,status);

    }

    static async deleteMessage(_id){
    	   NotificationModel.deleteMessage(_id);

    }

  static async updateStatus(email,message,status){
		  NotificationModel.updateStatus(email,message,status);
  }

  static async readMessages(email){
      var r=[];
		  var results=await NotificationModel.getMessagesOfReciever(email);
             for (var i = 0;i < results.length; i++) { 
                var pdf=await PDFInfoModel.getPDFByID(results[i].message);
                r.push({
                  pdf:pdf,
                  result:results[i]
                });
             }
      return r;
  }
  static async sharePDF(email,pdfID){
       await PDFAccessModel.createAccess(email,pdfID,3);
}

}
module.exports=NotificationController;