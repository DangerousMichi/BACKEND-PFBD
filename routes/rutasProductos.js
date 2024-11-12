//this is a test if it works it is okey

var rutas = require("express").Router();
var{mostrarProductos, nuevoProducto, borrarProducto, buscarPorID, editarProducto} = require("../db/productosBD");


rutas.get("/mostrarProductos",async(req,res)=>{
    //res.send("hola estas en raiz");
    var productosValidos = await mostrarProductos();
    //console.log(productosValidos);
    res.json(productosValidos);
});

rutas.get("/buscarPorId/:id",async(req,res)=>{
    var productoValido = await buscarPorID(req.params.id);
    res.json(productoValido);
});

rutas.delete("/borrarProducto/:id",async(req,res)=>{
    var productoBorrado = await borrarProducto(req.params.id);
    res.json(productoBorrado);
});

rutas.post("/nuevoProducto",async(req,res)=>{
    var productoValido = await nuevoProducto(req.body);
    res.json(productoValido);
});

rutas.put("/editarProducto/:id",async(req,res)=>{
    var productoValido = await editarProducto(req.params.id,req.body);
    res.json(productoValido);
});

//Ruta de productos 
module.exports=rutas;