var express = require('express')
var admin = require('../models/admin');
// var admin = require('../models/singsSchema');
// const { route } = require('express/lib/router');
var router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;


// For JWT authentication

const jwt=require('jsonwebtoken');
const jwtsecret="9999777ggvv666nhhhhh";
// end of jwt



// Get method of admin...

router.get("/admin", (req, res, next) => {

    admin.find({},function (err, record) {
        console.log(record)
        if (err) {
            res.send("WError")
        }
        else {
            res.json(record)
        }
    })

})


// admin login code.......

router.post("/admin_login",(req,res,next)=>{
    console.log(req.body);
    let username=req.body.username;
    let pass=req.body.password;
    admin.findOne({email:username},(err,data)=>{
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
                let token=jwt.sign(payload,jwtsecret,{expiresIn:360000});//generete token
               res.json({"err":0,"msg":"Login Successfully","token":token, user:data})
            }
            else {
                res.json({"err":1,"msg":"email or password is not correct"});
            }
        }
    })
})


  // Admin sign_up Code.....
    
  router.post("/admin_signup",async(req,res,next)=>{
    // console.log(req.body);

    // console.log(req.body.f_name);
    // console.log(req.body.email)
    // console.log(req.body.mobno);
    // console.log(req.body.pass);


    const email_id = req.body.email;

    try
    {

        let data = await admin.findOne({'email': email_id})
        // console.log(data)
        if(data)
                    {
                        res.json({"err":1,"msg":"Email_id already exists"});
                    }

        else debugger
        
                    {
                        // res.json({"err":0,"msg":" Perform Sign up operation!"})
                        let c_pass = req.body.pass;
                        const hash = bcrypt.hashSync(c_pass,saltRounds);
                    // console.log(hash);
                        let data = new admin ({
                            name:req.body.f_name,
                            email:req.body.email,
                            mobno:req.body.mobno,
                           pass:hash
                          
                        })
                        const  result=await data.save()
                        if(result)
                        {
                        res.json({"err":0,"msg":" Registered successfully!"})
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


// admin Delete code

router.delete('/admin/:id', async (req, res, next) => {
    // console.log(req.params.id)
    try {
        const result = await admin.findByIdAndDelete(req.params.id);
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

// admin put code 
router.put('/admin/:id', async (req, res, next) => {

    // console.log(req.body)
    // console.log(req.body.name),
    // console.log(req.body.email),
    // console.log(req.body.mobno),
    // console.log(req.body.password)
    console.log(req.body)
    const email_id = req.body.email;
    console.log(email_id)
    try {
        let data = new admin({
            name: req.body.name,
            mobno: req.body.mobno,
            email: req.body.email,
            pass: req.body.pass
        })
 
         console.log('kkkk',data)
        

        const recivedata = await admin.findByIdAndUpdate({ '_id': req.params.id }, { $set: { name: req.body.name, mobno: req.body.mobno } })
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