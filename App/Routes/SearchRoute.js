const express=require('express');
const SearchController=require('../Controllers/SearchController');
const HistoryController=require('../Controllers/HistoryController');
const NotificationController=require('../Controllers/NotificationController');
const router=express.Router();

router.post('/search',async (req,res)=>{
	if(req.body.status=="primary"){
		var results=await SearchController.getPrimarySearch(req.body.search)
	}
	else{
		HistoryController.addHistory(req.email,req.body.search);
		var results=await SearchController.getAdvanceSearch(req.body.search)
	}
    res.json({
        results:results
})
    });
    
 router.post('/getInfo',async (req,res)=>{
 	if(req.body.field=='pdf'){
 		res.json({results:await SearchController.getPDF(req.body.id,req.email)})
 	}
	else{
		res.json({results:await SearchController.getUploader(req.body.id)})
	}
    });
router.post('/getNotifications',async(req,res)=>{
		res.json({results:await NotificationController.readMessages(req.email)});

});


module.exports=router;
