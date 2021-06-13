const express=require('express');
const app=express();
const port =8000;
//use express router
app.use('/',require('./routes/index'));
 app.listen(port,function(err){
     if(err){
         console.log(`error is running the server: ${err}`);
         return;
     }
     console.log(`server is running on port:${port}`);

 });
