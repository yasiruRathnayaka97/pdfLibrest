const redis = require('redis');
const config=require('dotenv').config();
var redisHost = 'redis-12489.c228.us-central1-1.gce.cloud.redislabs.com';
var redisPort = 12489;
var redisAuth = 'DBPr5xRuqZ8kxpuQeRqPj68x7TGpXhUR';

var client = redis.createClient ({
port : redisPort,
host : redisHost
});

client.auth(redisAuth, function(err, response){
if(err){
 console.log('redisDB connection error');	
throw err;
}
else{
  console.log('redisDB connection success');
}
}); 
module.exports=client;