const express = require('express');
const app = express();
var path = require('path');

var workDir = path.resolve('.');
console.log('workDir is %o', workDir)
// respond with "hello world" when a GET request is made to the homepage
app.all('/mock/:param1/:param2', function (req, res) {
  //const obj=require(`./mock/${reqparam1}/${param}`);
  for (let key in req.params) {
    console.log(key)
  }
  console.log(req.params['param1'])
  res.send(req.params)
})

const enableMockServer = process.env.ENABLE_MOCK_SERVER
const mockPort=process.env.MOCK_PORT?process.env.MOCK_PORT:3000;
if (enableMockServer) {
  app.listen( ${mockPort},
    () => console.log(`mock server is started at port: ${mockPort}!`));
}