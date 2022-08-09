const express=require("express")
const mongoose=require("mongoose")
const ejs=require("ejs")
const inventorySchema=require("./inventorySchema")
const customerSchema=require("./customerSchema")
const orderSchema=require("./orderSchema")
const route=express()
route.set("view engine","ejs")
route.use(express.json())
route.use(express.urlencoded({extended:false}))
route.listen(3005,(err)=>{
    if(!err){
        console.log("port connectd")
    }
    else{
        
        console.log(err)
    }
})
mongoose.connect("mongodb://localhost/api_web_tech_assignment",(err)=>{
    if(!err){
        console.log("Db connected")
    }
    else{
        console.log(err)
    }
})
route.get("/inventory",(req,res)=>{
    inventorySchema.find().then((user)=>{
        res.render("inventory",{user})
    })
})
route.post("/createInventory",(req,res)=>{
    inventorySchema.create({
        Inventory_id:req.body.Inventory_id,
        InventoryType:req.body.InventoryType,
        ItemName:req.body.ItemName,
        AvailableQuantity:req.body.AvailableQuantity
    }).then((data)=>{
        res.status(200).send("data posted successfully")
    }).catch((err)=>{
        console.log(err)
    })
})
route.post("/customer",(req,res)=>{
    console.log(req.body)
    customerSchema.create({
        customer_id:req.body.customer_id,
        customerName:req.body.customerName,
        email:req.body.email
    }).then((data)=>{
        console.log(data)
        res.status(200).send("data posted successfully")
    }).catch((err)=>{
        console.log(err)
    })
})
route.get("/customer",(req,res)=>{
    customerSchema.find().then((customer)=>{
        res.render("customer",{customer})
        console.log(customer)
    })
})
route.post("/order",(req,res)=>{
  inventorySchema.find({AvailableQuantity:"AvailableQuantity"}).then((data)=>{
    if(data.length>0){
        orderSchema.create({
            customer_id:req.body.customer_id,
            Inventory_id:req.body.Inventory_id,
            ItemName:req.body.ItemName,
            Quantity:req.body.Quantity
        }).then((data)=>{
            res.status(200).send("Order Posted")
        }).catch((err)=>{
            console.log(err)
        })
    }
    else{
        res.status(400).send("Out of stock")
    }
  })
})
route.get("/order",(req,res)=>{
    orderSchema.find().then((order)=>{
        res.render("order",{order})
        console.log(order)
    })
})
route.get("/inventory/electonics",(req,res)=>{
    inventorySchema.find({InventoryType:"Electronics"}).then((Electronics)=>{
        console.log(Electronics)
        res.status(200).render("electronics",{Electronics})
    }).catch((err)=>{
        console.log(err)
    })
})
route.get("/inventory/furniture",(req,res)=>{
    inventorySchema.find({InventoryType:"Furniture"}).then((furn)=>{
        console.log(furn)
        res.status(200).render("furniture",{furn})
    }).catch((err)=>{
        console.log(err)
    })
})