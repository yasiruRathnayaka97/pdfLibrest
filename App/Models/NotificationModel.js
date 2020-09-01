const mongoose=require('../DB/DB');
require('../Schema/NotificationSchema');
const Notification = mongoose.model('Notification');
class NotificationModel{
static async createNotification(sender,reciever,message,status){
  await Notification.create({
    sender:sender,
    reciever:reciever,
    message:message,
    status:status
  });
}


static async getMessagesOfReciever(email){
  return await Notification.find({reciever:email,
    status:"pending"});
}
static async getMessagesOfSender(email){
    return await Notification.find({sender:email});
  }
static async deleteMessage(_id){
    return await Notification.deleteOne({_id});
}
static async updateStatus(email,message,status){
    return await Notification.updateOne({sender:email,message:message},{status:status});
}
}
module.exports=NotificationModel;

