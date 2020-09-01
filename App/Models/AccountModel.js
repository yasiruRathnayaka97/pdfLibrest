const mongoose=require('../DB/DB');
require('../Schema/AccountSchema');
const Account = mongoose.model('Account');
class AccountModel{
static async createAccount(userName,email,password,description){
  await Account.create({
    userName:userName,
    password:password,
    email:email,
    description:description
  });
}



static async getAccount(email){
  return await Account.findOne({email:email});
}
static async deleteAccount(email){
    return await Account.deleteOne({email:email});
}
static async updateDescription(email,description){
    return await Account.updateOne({email:email},{description:description});
}
}
module.exports=AccountModel;