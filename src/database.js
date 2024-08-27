const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://efrainvitalis:efravita29@cluster0.f8wg1.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
.then (()=> console.log("Conexion exitosa!"))
.catch((error)=> console.log("Existe un error: " , error))