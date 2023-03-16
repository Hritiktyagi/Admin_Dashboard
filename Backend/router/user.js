var express = require('express')
var user = require('../models/singsSchema');
// const { route } = require('express/lib/router');
var router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;



// // For File uplaod module
// const multer = require('multer');
// const path = require('path');
// // End here

// // For upload
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
//     }
// })

// For JWT authentication

const jwt=require('jsonwebtoken');
const jwtsecret="9999777ggvv666nhhhhh";
// end of jwt



// router.get('/sign-up/:id',(req,res)=>{
    
//     user.findOne((err,doc)=>{
//         if(err){
//             console.log(err);
//             res.status(500).send('Internal server error');
//             return;
//         }
//         if(!doc){
//             res.status(404).send('Document not found');
//             return;
//         }
//         res.json(doc);
//     })
// });




router.get("/sign-up", (req, res, next) => {

    user.find({}).exec(function (err, record) {
        if (err) {
            res.send("WError")
        }
        else {
            res.json(record)
        }
    })

})


router.get('/sign-up/:id',(req,res)=>{
    const{id}=req.params;
    user.findById(id,(err,doc)=>{
        if(err){
            console.log(err);
            res.status(500).send('Internal server error');
            return;
        }
        if(!doc){
            res.status(404).send('Document not found');
            return;
        }
        res.json(doc);
    })
});


// router.post("/sign-up", (req, res, next) => {
//     // console.log(req.body);
//     let upload = multer({ storage: storage }).single('attach');
//     upload(req, res, async (err) => {
//         if (err) {
//             return res.json({ 'err': 1, 'msg': 'Some Uploading Error' })
//             // console.log("Not Uploaded");
//         }
//         else {
//             console.log('If emailId dont exist');
//             const email_id = req.body.email;
//             let data = await user.findOne({ 'email': email_id });
//             console.log('Data ', data);
//             // console.log(data)
//             if (data) {
//                 res.json({ "err": 1, "msg": "Email_id already exists" });
//             }

//             else {
//                 // res.json({"err":0,"msg":" Perform Sign up operation!"})
//                 let c_pass = req.body.pass;
//                 const hash = bcrypt.hashSync(c_pass, saltRounds);
//                 // console.log(hash);
//                 let data = new user({
//                     name: req.body.f_name,
//                     email: req.body.email,
//                     mobno: req.body.mobno,
//                     pass: hash
//                 })
//                 const result = data.save()
//                 if (result) {
//                     res.json({ "err": 0, "msg": " Registered successfully!" })
//                 }
//                 else {
//                     res.json({ "err": 1, "msg": " Sign Not successfully!" })
//                 }

//             }


//         }


//     })

// })

// user login code .....

router.post("/login",(req,res,next)=>{
    console.log(req.body);
    let username=req.body.username;
    let pass=req.body.password;
    user.findOne({email:username},(err,data)=>{
        // console.log(data)
        if(err){
             res.json({"err":1,"msg":"email or password is not correct"});
        }
        else if(!data || !data._id){
             res.json({"err":1,"msg":"email or password is not correct"});
        }
        else{
            if(bcrypt.compareSync(pass, data.pass)){
                let payload={uid:username};
                // console.log(payload)
                let token=jwt.sign(payload,jwtsecret,{expiresIn:10});//generete token
               res.json({"err":0,"msg":"Login Successfully","token":token, user:data})
               
            }
            else {
                res.json({"err":1,"msg":"email or password is not correct"});
            }
        }
    })
})


// user sign_up code.....

router.post("/sign-up",async(req,res,next)=>{
    // console.log(req.body);

    // console.log(req.body.f_name);
    // console.log(req.body.email)
    // console.log(req.body.mobno);
    // console.log(req.body.pass);


    const email_id = req.body.email;

    try
    {

        let data = await user.findOne({'email': email_id})
        // console.log(data)
        if(data)
                    {
                        res.json({"err":1,"msg":"Email_id already exists"});
                    }

        else
                    {
                        // res.json({"err":0,"msg":" Perform Sign up operation!"})
                        let c_pass = req.body.pass;
                        const hash = bcrypt.hashSync(c_pass,saltRounds);
                    // console.log(hash);
                        let data = new user({
                            name:req.body.f_name,
                            email:req.body.email,
                            mobno:req.body.mobno,
                           pass:hash,
                           isadmin: req.body.isadmin
                          
                        })
                        const  result=await data.save()
                        if(result)
                        {
                        res.json({"err":0,"msg":" Registered successfully!", data: data})
                        }
                        else
                        {
                            res.json({"err":1,"msg":" Sign Not successfully!"})
                        }

                    }
    }
    catch(e)
    {
        return res.status(500).send(e);
    }

})


router.delete('/sign-up/:id', async (req, res, next) => {
    // console.log(req.params.id)
    try {
        const result = await user.findByIdAndDelete(req.params.id);
        if (result) {
            res.json({ "err": 0, "msg": "Data Deleted Successfully" });
        }
        else {
            res.json({ "err": 1, "msg": "Data Not Deleted" });
        }
    }
    catch (err) {
        return res.status(500).send(err);
    }
})


  




// router.put('/sign-up',async(req,res,next)=>{
//     const email_id = req.body.email;
//       try
//       {
//          let data = new user ({
//             name:req.body.name,
//             mobno:req.body.mobno,
//             password:req.body.password
//          })
//          const recivedata = await user.updateMany({ 'email': email_id }, { $set: { name: req.body.name, mobno: req.body.mobno, password: req.body.password } })
//          if(recivedata){  
//          return res.send({
//                 'message': 'Record Updated Successfully !',
//                 'err': 0,
//                 'data': recivedata
//             })
//         }
//         else {
//             return res.send(
//                 {
//                     'message': 'Record Not Updated Successfully !',
//                     'err': 1
//                 }
//             )
//         }

//     }


//       catch(err)
//       {
//        return res.status(500).send(err);
//       }
// })

router.put('/sign-up/:id', async (req, res, next) => {

    // console.log(req.body)
    // console.log(req.body.name),
    // console.log(req.body.email),
    // console.log(req.body.mobno),
    // console.log(req.body.password)
    console.log(req.body)
    const email_id = req.body.email;
    console.log(email_id)
    try {
        let data = new user({
            name: req.body.name,
            mobno: req.body.mobno,
            email: req.body.email,
            pass: req.body.pass
        })
 
         console.log('kkkk',data)
        

        const recivedata = await user.findByIdAndUpdate({ '_id': req.params.id }, { $set: { name: req.body.name, mobno: req.body.mobno } })
        //   const recivedata = await user.findOneAndUpdate({ 'email': email_id }, data, { new: true });
        console.log(recivedata)
        if (recivedata) {
            return res.send({
                'message': 'Record Updated Successfully !',
                'err': 0,
                'data': recivedata
            })
        }
        else {
            return res.send(
                {
                    'message': 'Record Not Updated Successfully !',
                    'err': 1
                }
            )
        }
    }
    catch (err) {
        console.log(err)
        return res.status(500).send(err);
    }
    
})


module.exports = router;