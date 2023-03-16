const mongoose=require('mongoose');
const admin=new mongoose.Schema({
  
    name:
    {
        type:String,
        required:true
    },
    email:
    {
        type:String,
        required:true,
        unique:true
    },
    mobno:
    {
        type:String,
        required:true,
        unique:true
    },
    pass:
    {
        type:String,
        required:true
    }
   
  
})

module.exports=mongoose.model('admin',admin);