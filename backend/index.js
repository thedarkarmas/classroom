const express = require('express');
const bodyparser = require('body-parser');

const cors = require('cors')
const mysql = require('mysql2');
var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
const path = require('path');




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

app.post('/upload',function (req, res) {
    if (req.url == '/upload') {
    
      var form = new formidable.IncomingForm();
     
      form.parse(req, function (err, fields, files) {
        console.log(files)
        var oldpath = files.filetoupload.filepath;
        var newpath ='./uploads/'+files.filetoupload.originalFilename;
        console.log(newpath)
       
        fs.rename(oldpath,newpath, function (err) {
          if (err) throw err;
          
          res.write('File uploaded and moved!');
          res.end();
        }); 
   });
    } 

})
//send

app.post('/sends',function (req, res) {

    if (req.url == '/sends') {
   
      var form = new formidable.IncomingForm();
     
      form.parse(req, function (err, fields, files) {
        console.log(req.url)
        var oldpath = files.filetoupload.filepath;
        var newpath ='./uploads/'+files.filetoupload.originalFilename;
        console.log(newpath)
       
        fs.rename(oldpath,newpath, function (err) {
          if (err) throw err;
          
          res.write('File uploaded and moved!');
          res.end();
        }); 
   });
 
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
//////////////////////////////////////role/////////////////////////////////////////////////////////////////////////
app.get('/role',(req,res)=>{
    let qr =`select * from role`;
 
    db.query(qr,(err,result)=>{
         if(err){
             console.log(err,'errs');
         }
         if(result.length>0){
             res.send({
                 message:`all role data`,
                 data:result
             });
 
         }
 
 
    });
 })

//get single data 
app.get('/role/:email',(req,res)=>{

    let gID=req.params.email;
    
    let qr =`select * from role where email = '${gID}';`;

    
    db.query(qr,(err,result)=>{
    
        if(err){
            console.log(err,'err');
    
        }
        if(result){
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

 //create role data
 app.post('/role',(req,res)=>{

    console.log(req.body,'create data')
   let email = req.body.email;
   let role = req.body.role;
    



   let qr = `insert into role(email,role)
    values('${email}','${role}') `;
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
//update role data
app.put('/role/:email',(req,res)=>{


    console.log(req.body,'update data');

    let gID =req.params.email;
    let role = req.body.role;

    let qr=`update role set role ='${role}'where email = '${gID}';`;

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

//delete role data

app.delete('/role/:email',(req,res)=>{

    let qID =req.params.email;

    let qr =`delete from role where email = '${qID}'`;

    db.query(qr,(err,result)=>{

        if(err){console.log(err);}

        res.send({

            message:'data deleted'

        })


    })

})
////////////////////////////////////////////room //////////////////////////////////////////////////////////////////////
app.get('/room',(req,res)=>{
    let qr =`select * from room`;
 
    db.query(qr,(err,result)=>{
         if(err){
             console.log(err,'errs');
         }
         if(result.length>0){
             res.send({
                 message:`all role data`,
                 data:result
             });
 
         }
 
 
    });
 })

//get single room data 
app.get('/room/:passroom',(req,res)=>{

    let gID=req.params.passroom;
    
    let qr =`select * from room where passroom = '${gID}';`;

    
    db.query(qr,(err,result)=>{
    
        if(err){
            console.log(err,'err');
    
        }
        if(result){
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

 //create room data
 app.post('/room',(req,res)=>{

    console.log(req.body,'create data')
   let email = req.body.email;
   let Nameroom = req.body.Nameroom;
    let passroom =req.body.passroom;
    let subject =req.body.subject;
    let roomnum =req.body.roomnum;



   let qr = `insert into room(email,Nameroom,subject,roomnum,passroom)
    values('${email}','${Nameroom}','${subject}','${roomnum}','${passroom}') `;
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
//update room data
app.put('/room/:passroom',(req,res)=>{


    console.log(req.body,'update data');

    let gID =req.params.passroom;
    let Nameroom = req.body.Nameroom;
    let subject = req.body.subject;
    let roomnum = req.body.roomnum;
  
  
    let qr=`update room set Nameroom ='${Nameroom}',subject ='${subject}',roomnum ='${roomnum}'
    where passroom = '${gID}';`;

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

//delete room data

app.delete('/room/:passroom',(req,res)=>{

    let qID =req.params.passroom;

    let qr =`delete from room where passroom = '${qID}'`;

    db.query(qr,(err,result)=>{

        if(err){console.log(err);}

        res.send({

            message:'data deleted'

        })


    })

})
///////////////////////////postroom//////////////////////////////////////
app.get('/postroom',(req,res)=>{
    let qr =`select * from postroom`;
 
    db.query(qr,(err,result)=>{
         if(err){
             console.log(err,'errs');
         }
         if(result.length>0){
             res.send({
                 message:`all role data`,
                 data:result
             });
 
         }
 
 
    });
 })

//get single room data 
app.get('/postroom/:passroom',(req,res)=>{

    let gID=req.params.passroom;
   

   
    
    let qr =`SELECT * FROM postroom WHERE email = '${gID}'OR passroom = '${gID}';`;

    
    db.query(qr,(err,result)=>{
    
        if(err){
            console.log(err,'err');
    
        }
        if(result){
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

 //create room data
 app.post('/postroom',(req,res)=>{

    console.log(req.body,'create data')
   let email = req.body.email;
   let room = req.body.room;
    let passroom =req.body.passroom;
    let firstName =req.body.firstName;
    let lastName =req.body.lastName;
   
    let role =req.body.role;



   let qr = `insert into postroom(email,firstName,lastName,room,passroom,role)
    values('${email}','${firstName}','${lastName}','${room}','${passroom}','${role}') `;
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
//update room data
app.put('/postroom/:passroom',(req,res)=>{


    console.log(req.body,'update data');

    let room = req.body.room;
    let passroom =req.params.passroom;


    let qr=`update postroom set room ='${room}'where passroom = '${passroom}';`;

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

//delete room data

app.delete('/postroom/:passroom',(req,res)=>{

    let qID =req.params.passroom;

    let qr =`delete from postroom where passroom = '${qID}'`;

    db.query(qr,(err,result)=>{

        if(err){console.log(err);}

        res.send({

            message:'data deleted'

        })


    })

})
///////////////////////////////////////////////storage///////////////////////////////////////////////////////
app.get('/storage/:passroom',(req,res)=>{

    let gID=req.params.passroom;
   

    
    
    let qr =`SELECT * FROM storage WHERE passroom = '${gID}'OR id = '${gID}'OR filename = '${gID}';`;

    
    db.query(qr,(err,result)=>{
    
        if(err){
            console.log(err,'err');
    
        }
        if(result){
       
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

app.post('/storage',(req,res)=>{

    console.log(req.body,'create data')
   let filename = req.body.filename;
   let email = req.body.email;
    let name =req.body.name;
    let workname =req.body.workname;
    let workdetail =req.body.workdetail;
    let nameroom =req.body.nameroom;
    let passroom =req.body.passroom;
    



   let qr = `insert into storage(filename,workname,workdetail,email,name,nameroom,passroom) 
   values('${filename}','${workname}','${workdetail}','${email}','${name}','${nameroom}','${passroom}'); `;
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

app.put('/storage/:id',(req,res)=>{


    console.log(req.body,'update data');

    let filename = req.body.filename;
    let gID =req.params.id;
     let workname =req.body.workname;
     let workdetail =req.body.workdetail;
   
  
    let qr=`update storage set filename ='${filename}',workname ='${workname}',workdetail ='${workdetail}'
    where id = '${gID}';`;

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


app.delete('/storage/:id',(req,res)=>{

    let qID =req.params.id;
    

    let qr =`delete from storage where id = '${qID}'`;

    db.query(qr,(err,result)=>{

        if(err){console.log(err);}

        res.send({

            message:'data deleted'

        })


    })

})
/////////////////////////////////////////////////////send/////////////////////////////////////////////////////
app.get('/send/:postid',(req,res)=>{

    let gID=req.params.postid;
   

    
    
    let qr =`SELECT * FROM send WHERE email = '${gID}' OR id = '${gID}'OR postid = '${gID}'OR passroom = '${gID}';`;

    
    db.query(qr,(err,result)=>{
    
        if(err){
            console.log(err,'err');
    
        }
        if(result){
          
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

    app.get('/send/:postid/:email',(req,res)=>{

        let gID=req.params.postid;
        let email=req.params.email;
       
    
        
        
        let qr =`SELECT * FROM send WHERE email = '${email}' AND postid = '${gID}';`;
    
        
        db.query(qr,(err,result)=>{
        
            if(err){
                console.log(err,'err');
        
            }
            if(result){
              
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




app.post('/send',(req,res)=>{

    console.log(req.body,'create data')
   let filename = req.body.filename;
   let email = req.body.email;
    let name =req.body.name;
    let postid =req.body.postid;
    let status =req.body.status;
    let passroom =req.body.passroom;
    


   let qr = `insert into send(email,name,postid,filename,passroom,status) 
   values('${email}','${name}','${postid}','${filename}','${passroom}','${status}'); `;
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

app.delete('/send/:postid/:email',(req,res)=>{

    let qID =req.params.postid;
    let email=req.params.email;

    let qr =`delete from send where postid = '${qID}'and email = '${email}' `;

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


