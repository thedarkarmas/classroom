const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors')
const mysql = require('mysql2');


const app = express();
app.use(cors());
app.use(bodyparser.json());




// database connetion
const db = mysql.createConnection({
    host:'localhost'
    ,user:'root',
    password:''
    ,database:'classroomdb',
    port:3306
});

//check db connection
db.connect(err=>{
    if(err){ console.log(err,'err');}
  else{
    console.log('.......db connetion......')
  }  
})



// get data

app.get('/user',(req,res)=>{
   let qr =`select * from user`;

   db.query(qr,(err,result)=>{
        if(err){
            console.log(err,'errs');
        }
        if(result.length>0){
            res.send({
                message:`all user data`,
                data:result
            });

        }


   });
})

//get single data 
app.get('/user/:id',(req,res)=>{

let gID=req.params.id;

let qr =`select * from user where id = ${gID}`;
db.query(qr,(err,result)=>{

    if(err){
        console.log(err,'err');

    }
    if(result.length>0){
        res.send({

            message:'get single data', 
            data:result
        });
        
    }
    else{
        res.send({
            message:'data not Found'

        });
    }


})

})



//create data

app.post('/user',(req,res)=>{

    console.log(req.body,'create data')
   let firstName = req.body.firstName;
   let lastName = req.body.lastName;
   let email = req.body.email;
    



   let qr = `insert into user(firstName,lastName,email)
    values('${firstName}','${lastName}','${email}') `;
    db.query(qr,(err,result)=>{
        if(err){
            console.log(err,'err');
    
        }
        console.log(result)
        res.send({
            message:'data inserted'
        })
    })
})

//update data
app.put('/user/:id',(req,res)=>{


    console.log(req.body,'update data');

    let gID =req.params.id;
    let fullname = req.body.fullname;
    let email = req.body.email;

    let qr=`update user set fullname ='${fullname}',email='${email}'
    where id = ${gID}`;

    db.query(qr,(err,result)=>{
        if(err){
            console.log(err,'err');
    
        }
        console.log(result)
        res.send({
            message:'data updataed'
        })
    })
})

//delete data

app.delete('/user/:id',(req,res)=>{

    let qID =req.params.id;

    let qr =`delete from user where id = '${qID}'`;

    db.query(qr,(err,result)=>{

        if(err){console.log(err);}

        res.send({

            message:'data deleted'

        })


    })

})

app.listen(3000,()=>{
    console.log('server runing..');
})