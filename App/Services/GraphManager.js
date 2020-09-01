const  IndexManager=require('../Services/IndexManager');
const {PDFSchema,HeadingSchema}=require('../Schema/ElasticSchema');
const index_name='Heading';
class GraphManager{

async static addHeadingDocument(HeadingArr,pdfId){
     var docArr=this.createHeadingDoc(HeadingArr,pdfId);
     addDocuments(docArr,index_name,HeadingSchema);

}
async static createEdges(edgesArr){
    for(var i=0;i<edgesArr.length;i++){
        edgeWeight=edgesArr[i][1]
        nodeNew=edgesArr[i][0]
        nodeOld=edgesArr[i][2]
        //GraphModel.createEdge(nodeNew,edgeWeight,nodeOld);
    }
  
}
}