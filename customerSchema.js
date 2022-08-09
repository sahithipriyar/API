const mongoose=require("mongoose")
const customerModel=new mongoose.Schema({
    customer_id:{
        type:String,
        require:true
    },customerName:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    }
})
const customerSchema=mongoose.model("customer",customerModel)
module.exports=customerSchema