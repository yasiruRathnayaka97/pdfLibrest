const  AccountModel=require('../Models/AccountModel');
const bcrypt = require('bcrypt');
const PDFInfoModel=require('../Models/PDFInfoModel');
const PDFAccessModel=require('../Models/PDFAccessModel');
const saltRounds = 12;
class AccountController{
    static async  signUp(userName,email,password){
        if(!await AccountModel.getAccount(email)){
        var hashedPassword=await bcrypt.hash(password, saltRounds);
        AccountModel.createAccount(userName,email,hashedPassword,'No Description');
        return true;
        }
        else{
            return false;
        }
   
    }
    static async signIn(email,password){
            var acc=await AccountModel.getAccount(email);
            if(acc==null){
                return false;
            }
            if(await bcrypt.compare(password,acc.password)){
                return true;
            }
            else{
                return false;
            }
        }
    static async delete(email,password){
        var acc=await AccountModel.getAccount(email);
        if(acc==null){
            return false;
        }
        if(await bcrypt.compare(password,acc.password)){
            await AccountModel.deleteAccount(email);
            return true;
        }
        else{
        return false;
    }
       
}
static async getUploadsAndShares(email){
    var result= new Array();
    var level_1_2Uploads=[];
    var level_3Uploads=[];
    var level_1_2=await PDFAccessModel.getAccessLevel_1_2(email);
    var level_3=await PDFAccessModel.getAccessLevel_3(email);

    for (var i = 0; i < level_1_2.length; i++) {
            var pdf=await PDFInfoModel.getPDFByID(level_1_2[i].pdfID);
            level_1_2Uploads.push(pdf);

    }
    for (var i = 0; i < level_3.length; i++) {
            var pdf=await PDFInfoModel.getPDFByID(level_3[i].pdfID);
            level_3Uploads.push(pdf);

}
     result[0]=level_1_2Uploads;
     result[1]=level_3Uploads;
    
     return  result;
}

static async getAccountInfo(email){
     var acc= await AccountModel.getAccount(email);
     let description=acc.description;
     if(acc.description==null){
        description="No description";
     }
     
     return {'userName':acc.userName,
            'email':acc.email,
            'description':description}
    
} 
static async updateDescription(email,description){
    await AccountModel.updateDescription(email,description);
    return true;

}
}
module.exports=AccountController;