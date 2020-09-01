const pdfLib=require('pdfjs-dist');
class Crawler{

    static  createDocuments(path,pdfID){
    return new Promise((resolve, reject) =>{
        var pdf=pdfLib.getDocument(path);
        pdf.promise.then(async (pdfDoc)=>{
            var result=new Array();
            var pdfDocArr=[];
            var headingDocArr=[];
            var position=0;
            for (var pageNum = 1; pageNum <=pdfDoc.numPages ; pageNum++) {
             var pdfCharacterSizes=[];
             var pdfUniqueCharacterMap=new Map();
             var pdfUniqueCharacterArr=[];
             var extractedPageArr=[];
             var textItems=(await (await pdfDoc.getPage(pageNum)).getTextContent()).items;
             for (var i = 0; i < textItems.length; i++) {
                var item = textItems[i];

                if(item.str!=' '){
                    if (!pdfUniqueCharacterMap.has(item.height)){
                        pdfUniqueCharacterMap.set(item.height,1);
                        pdfUniqueCharacterArr.push(item.height);
                    
                    }
                    else{
                       pdfUniqueCharacterMap.set(item.height,pdfUniqueCharacterMap.get(item.height)+1); 
                    }
                    pdfCharacterSizes.push(item.height);
                    extractedPageArr.push(item.str);
                }
              
             }
              
             var resultHeading=await this.getHeadings(pdfCharacterSizes,pdfUniqueCharacterMap,extractedPageArr,pdfUniqueCharacterArr);
             var headingArr=resultHeading[0];
             var extractedPage=resultHeading[1].join(' ');
             var resultURL=await this.getURLs(extractedPage);
             var urlArr=resultURL[0];
             extractedPage=resultURL[1];
             var splitedArr =this.createSplitedArrPerPage(extractedPage);
             var resultPageDoc=this.createDocumentsPerPage(splitedArr,pageNum,pdfID,urlArr,headingArr,position);
             var pageDoc=resultPageDoc[0];
             var headingDoc=resultPageDoc[1];
             position=resultPageDoc[2];
             pdfDocArr=pdfDocArr.concat(pageDoc);
             headingDocArr=headingDocArr.concat(headingDoc);
            }
            result[0]=pdfDocArr
            result[1]=headingDocArr
            resolve(result);
        });
    });         
       
    }
    
    
    static createSplitedArrPerPage(extractedPage){
       var seperators=["\.","\,","\:"]
       seperators.push("\,");
       var splitedArr=extractedPage;
       for (var i = 0; i < seperators.length; i++) {
            splitedArr=splitedArr.split(seperators[i]);
            if (i<seperators.length-1){
                splitedArr=splitedArr.join();
            }
       }
       
       return splitedArr;
    }
   static createDocumentsPerPage(splitedArr,pageNum,pdfID,urlArr,headingArr,startPosition){
    var result=new Array();
    var documentsArr=[];
    var headingDocumentsArr=[];
    var j=0;
    var k=0;
    var sentence='';
    var about='';
    var headingDoc={};
    for (var i = 0; i < splitedArr.length; i++) {
        if (splitedArr[i]!=''){
             if (splitedArr[i]=='@URLPDFLIB'){
                sentence=urlArr[j];
                about='URL';
                j++;

            }
            else if(splitedArr[i]=='@HEADINGPDFLIB'){
                sentence=headingArr[k]
                about='heading';
                k++;
                headingDoc={
                    'pdfID':pdfID,
                    'heading':sentence, 
                    'position':startPosition+i
                }
                headingDocumentsArr.push(headingDoc);
            }
            else{
                sentence=splitedArr[i];
                about='paragraph';
            }
           
        var doc={
            'pdfID':pdfID,
            'pageNum':pageNum,
            'sentence':sentence,
            'about':about,
            'position':startPosition+i
        }
        documentsArr.push(doc);
    }
    }
    result[0]=documentsArr;
    result[1]=headingDocumentsArr;
    result[2]=startPosition+i-1;
    return result;
   }
   
   static async getURLs(extractedPage){
    const urlPattern=/(http[s]?|ftp[s]?|ws[s]?):\/\/(?:[a-z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-f][0-9a-f]))+/g;
    var urlArr=extractedPage.match(urlPattern);
    var result=new Array();
    var newExtractedPage=extractedPage
    if (urlArr!=null){
        newExtractedPage=await extractedPage.replace(urlPattern,'.@URLPDFLIB.');
    }
    if (urlArr==null){
        urlArr=[];
    }
    
    
    result[0]=urlArr;
    result[1]=newExtractedPage;
    return result;
    
   }
  static async getHeadings(pdfCharacterSizes,pdfUniqueCharacterMap,extractedPageArr,pdfUniqueCharacterArr){
        pdfUniqueCharacterArr.sort((a,b)=>{
            return a-b;
        });
        var headingArr=[];
        var result=new Array();
        var newExtractedPageArr=[];
        var numOfLines=extractedPageArr.length;
        pdfUniqueCharacterArr.reverse();
        var headingSizes=await this.getHeadingSizes(pdfUniqueCharacterArr,numOfLines,pdfUniqueCharacterMap);
   
        for(var i=0;i<pdfCharacterSizes.length;i++){
            if(headingSizes.includes(pdfCharacterSizes[i])){
                headingArr.push(extractedPageArr[i]);
                newExtractedPageArr.push('.@HEADINGPDFLIB.');
            }
            else{
                newExtractedPageArr.push(extractedPageArr[i]);
            }
        }
      
        result[0]=headingArr;
        result[1]=newExtractedPageArr;
        return result;
  }
  //return selected sizes of headings.
  static async getHeadingSizes(pdfUniqueCharacterArr,numOfLines,pdfUniqueCharacterMap){
    var k=0;
    var maxNumOfHeadingsPerPage=Math.trunc(numOfLines*0.25);
    if (pdfUniqueCharacterArr.length==1){
        return [];
    }
    for (var i=0;i<pdfUniqueCharacterArr.length;i++){
        k+=pdfUniqueCharacterMap.get(pdfUniqueCharacterArr[i]);
        if(k>maxNumOfHeadingsPerPage){
            if(i==0){
                return [];
            }
            else{
                return pdfUniqueCharacterArr.slice(0,i);
            }
            
        }
        
    }

   }

static async preProcess(){


}
   
}
module.exports=Crawler;