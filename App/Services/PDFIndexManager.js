const  IndexManager=require('../Services/IndexManager');
const {PDFSchema,HeadingSchema}=require('../Schema/ElasticSchema');
const index_name_doc='pdf';
const index_name_heading='heading';
class PDFIndexManager extends IndexManager{

static async addPDFDocument(docArr){
    return await this.addDocuments(docArr,index_name_doc,PDFSchema);

}
static async addHedingDocument(headingArr){
    return await this.addDocuments(headingArr,index_name_heading,HeadingSchema);

}
}
module.exports=PDFIndexManager