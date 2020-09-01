const { Client } = require('@elastic/elasticsearch');
const config=require('dotenv').config();

const client = new Client({
    cloud: {
      id: process.env.CLOUD_ID
    },
    auth: {
      username: process.env.AUTH_USERNAME,
      password: process.env.AUTH_PASSWORD
    }
  });
  
module.exports=client;
