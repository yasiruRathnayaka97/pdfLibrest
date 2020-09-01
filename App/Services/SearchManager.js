const client=require('../DB/ElasticClient');
const PDFAccessModel=require('../Models/PDFAccessModel');
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);
const pdf_index_name='pdf';
const heading_index_name='heading';
const pre='<b>';
const post='</b>';
const field= {
  'sentence' : {}
};
class SearchManager{
  
    static async pdfSearch(searchDoc,result_size){
      var resultQueue=[];
      const { body } = await client.search({
        index: pdf_index_name,
        size:result_size,
        body: {
          query: {
            match: searchDoc
          },
          highlight : {
            pre_tags:pre,
            post_tags:post,
            fields : field
          }
        }
      })
      var score=0;
      body.hits.hits.forEach((element) => {
        if (element._score>=score*0.75){
                  resultQueue.push({pdfID:element._source.pdfID,
                  pageNum:element._source.pageNum,
                  sentence:DOMPurify.sanitize(element.highlight.sentence,{ALLOWED_TAGS: ['b']}),
                  position:element._source.position,
                  about:element._source.about
                });
         score=element._score;
        }

       else{
        return resultQueue;
       }
        
      });
      return resultQueue;

    }
static async headingSearch(searchDoc){
      var resultQueue=[];
      const { body } = await client.search({
        index: heading_index_name,
        size:10000,
        body: {
          query: {
            match: searchDoc
          }
          
        }
      })
      var score=0;
      body.hits.hits.forEach((element) => {
                  resultQueue.push({pdfID:element._source.pdfID,
                  heading:element._source.heading,
                  position:element._source.position
          });
      });
      return resultQueue;

    }

  static async  advanceSearch(searchDoc,result_size){
        var queue=await this.pdfSearch(searchDoc,result_size);
        var finalizedQueue=[];
        for (var i = 0;i < queue.length; i++) { 
            var element=queue[i];
            if(element.about=="heading"){
               finalizedQueue.push({pdfID:element.pdfID,
                  pageNum:element.pageNum,
                  sentence:element.sentence,
                  position:element.position,
                  heading:element.sentence.replace('<b>','').replace('</b>',''),
                  email:PDFAccessModel.getPDFOwner(element.pdfID).email
                });
             }
            else{
        
                 var selected_heading=await this.findHeading(element);
                  finalizedQueue.push({pdfID:element.pdfID,
                  pageNum:element.pageNum,
                  sentence:element.sentence,
                  position:element.position,
                  heading:selected_heading,
                  email:await PDFAccessModel.getPDFOwner(element.pdfID)
                });
               }
            

        };
        return finalizedQueue;
  }
   static async findHeading(element){
            var doc={
            pdfID:element.pdfID
            }
            var h='No Heading';
                 var headingQueue=await this.headingSearch(doc);
                 headingQueue.forEach((e) => {  
                      if(e.position<element.position){
                        h=e.heading
                      }
                      else{
                          return h;
                      }
                  });
     
                 return h;
   }

    }

   module.exports=SearchManager; 




