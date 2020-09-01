const mongoose=require('../DB/DB');
require('../Schema/RatingSchema');
const Rating = mongoose.model('Rating');
class RatingModel{
static async createRate(pdfId,rate,count){
  await Rating.create({
    pdfId:pdfId,
    rate:rate,
    count:count
  });
}



static async getRating(pdfId){
  return await Rating.findOne({pdfId:pdfId});
}
static async updateRating(pdfId,rate,count){
    return await Rating.updateOne({pdfId:pdfId},{
        rate:rate,
        count:count
    });
}
}
module.exports=RatingModel;