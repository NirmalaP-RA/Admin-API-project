// we add here color.routes file
// mongoose is mongodb framework make your code more systematically(70% same)
// we create schema using mongoose mongo db not provide this facilities
// mongoose provide model option for single time change access show in each api
// we define model name not collection namee like we did in mongodb
// populate work to execute relation created through refs  and give reference
// like menu list reference flow category->mens/womens->wear etc.


// install package of mongoose via:npm i mongoose
// we create schema via keyname ,schema is mongoose inbuilt function

// for every project you have to install three packages:
// express,mongodb,mongoose check it in package.json file
// then do connectivity work of database got to browser and search npm mongoose
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/test')
//   .then(() => console.log('Connected!'));

// copy this code and paste it to index.js file in callback function of srver.listen wheere you assign port number datbase will be connected
// before that do basic things like server creation using express and assign port number

const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');
const server =express();

// use this code for post method started
//parse request of content-type-application/json
server.use(express.json());

//parse request of content-type-application/x-www-form-urlencoded
server.use(express.urlencoded({extended:true}));
// use this code for post method ended
// <------------>
// to give html code to api response  for that you have to install body-parser package during project setup
//npm i express body-parser

// const bodyParser=require('body-parser');
server.use(bodyParser.json());
// <--------------->
// install CORS origin package:npm i cors because reactjs,nextjs project run on port number which is anything and nodejs project port number is also different
// so when you want to use nodejs api in react then it will give you cors origin error for not using any other port in this
// so we tell our express here that if any api called on other server then you called it dont give eerror of cros origin
// const cors=require('cors');
server.use(cors());
//<--------------------->
//call it first in each project above code



server.get('/',(request,response)=>{
response.send('server is working fine')
})
// <------------>
//Admin Api urls:

// now i want to add color.routes.js file
// a file that i want to add via require method('file path') pass servr nam of variable
//similar like we add component in react
require('./app/routes/admin/color.routes.js')(server);
require('./app/routes/admin/material.routes.js')(server);
//we add routs code files calling here only like we did in react
//<----------------------->
//website api url:
//<----------------------->

server.listen(3001,()=>{
mongoose.connect('mongodb://127.0.0.1:27017/monsta') //url of database,here mongoose_376 is database name this is choice give any name
  .then(() => console.log('Connected!'))
  .catch((error)=>{
    console.log('database conneectivity error');
  });
})


//to insert query use thunder client
//http://localhost:2000/api/admin/category/create
// http://localhost:2000/api/admin/category/view


// http://localhost:3000/app/routes/admin/material.routes/create