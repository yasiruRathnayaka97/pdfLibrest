const ItemValue=20;
class Recommendation{
    
    static getRecommendationPresentages(email){
        var preferencInfo=await this.analyseHistory(email);
        var history=preferencInfo.history;
        var scienceAndTechnology=preferencInfo.scienceAndTechnology
        var art=preferencInfo.art;
        var other=preferencInfo.other;
        var tot=history+scienceAndTechnology+art+other
        if (tot>0){
            return {
                'AVG_History':history/tot,
                'AVG_ScienceAndTechnology':scienceAndTechnology/tot,
                'AVG_Art':art/tot,
                'AVG_Other':other/tot
    
            }
        }
        else{
            return {}
        }
       

    }
    static async analyseHistory(email){
        var count= {
            'COUNT_History':0,
            'COUNT_ScienceAndTechnology':0,
            'COUNT_Art':0,
            'COUNT_Other':0
            }
        for(var i=0;i<historyList.length;i++){
            historyList[i]
        }
        return count;
    }

    // static async getRecomendations(){
    //     if maxHistory>
    // }

}
module.exports=Recommendation;