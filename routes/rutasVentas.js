var rutas = require("express").Router();
var{mostrarVentas, nuevaVenta, cancelarVenta, buscarPorID, editarVenta} = require("../db/ventasBD");


rutas.get("/mostrarVentas",async(req,res)=>{
    //res.send("hola estas en raiz");
    var ventasValidas = await mostrarVentas();
    //console.log(ventasValidas);
    res.json(ventasValidas);
});

rutas.get("/buscarVPorId/:id",async(req,res)=>{
    var ventaValida = await buscarPorID(req.params.id);
    res.json(ventaValida);
});

rutas.post("/cancelarVenta/:id",async(req,res)=>{
    var ventaCancelada = await cancelarVenta(req.params.id);
    res.json(ventaCancelada);
});

rutas.post("/nuevaVenta",async(req,res)=>{
    var ventaValida = await nuevaVenta(req.body);
    res.json(ventaValida);
});


rutas.put("/editarVenta/:id",async(req,res)=>{
    var ventaValida = await editarVenta(req.params.id,req.body);
    res.json(ventaValida);
});

//Ruta de productos 
module.exports=rutas;