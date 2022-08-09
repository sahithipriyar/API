const mongoose=require("mongoose")
const inventoryModel=new mongoose.Schema({
    Inventory_id:{
        type:String,
        require:true
    },InventoryType:{
        type:String,
        require:true
    },
    ItemName:{
        type:String,
        require:true
    },
    AvailableQuantity:{
        type:Number,
        require:true
    }
})
const inventorySchema=mongoose.model("inventory",inventoryModel)
module.exports=inventorySchema