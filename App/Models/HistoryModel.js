const mongoose=require('../DB/DB');
require('../Schema/HistorySchema');
const History = mongoose.model('History');
class  HistoryModel{
static async addHistory(email,search){
  await History.create({
    email:email,
    dateTime:new Date(),
    search:search
  });
}


static async getHistory(email){
  return await History.find({email:email});
}
static async deleteHistory(email,dateTime){
     await History.deleteOne({email:email,
        dateTime:dateTime
    });
}
}
module.exports=HistoryModel;