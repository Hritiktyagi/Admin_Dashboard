const mongoose=require('mongoose');
const signSchema=new mongoose.Schema({
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
    },
    isadmin:
    {
        type:Boolean,
    }
   
  
})
module.exports=mongoose.model('user',signSchema);