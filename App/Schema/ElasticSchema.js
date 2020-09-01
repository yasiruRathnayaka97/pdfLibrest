const PDFSchema={
    pdfId: { type: 'integer' },
    pageNum: { type: 'integer' },
    sentence: { type: 'text' }
  }

const HeadingSchema={
  pdfId: { type: 'integer' },
  heading:{ type: 'text' }

} 
module.exports={PDFSchema,HeadingSchema};