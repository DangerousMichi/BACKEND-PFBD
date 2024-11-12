var rutas = require("express").Router();
//var {Router} = require("express"); - alternativa
var{mostrarUsuarios, nuevoUsuario, borrarUsuario, buscarPorID, editarUsuario, login } = require("../db/usuariosBD");


rutas.post("/login", async(req,res)=>{
    const usuario = await login(req, req.body.usuario, req.body.password);
    res.json(usuario)
});

rutas.get("/",async(req,res)=>{
    //res.send("hola estas en raiz");
    var usuariosValidos = await mostrarUsuarios();
    console.log(usuariosValidos);
    res.json(usuariosValidos);
});

rutas.get("/buscarPorId/:id",async(req,res)=>{
    var usuarioValido = await buscarPorID(req.params.id);
    res.json(usuarioValido);
});

rutas.delete("/borrarUsuario/:id",async(req,res)=>{
    var usuarioBorrado = await borrarUsuario(req.params.id);
    res.json(usuarioBorrado);
});

rutas.post("/nuevoUsuario",async(req,res)=>{
    var usuarioValido = await nuevoUsuario(req.body);
    res.json(usuarioValido);
});

// backend/rutas.js
rutas.put("/editarUsuario/:id", async (req, res) => {
    const usuarioValido = await editarUsuario(req.params.id, req.body);
    res.json({ success: usuarioValido });
});



//Ruta de productos 
module.exports=rutas;