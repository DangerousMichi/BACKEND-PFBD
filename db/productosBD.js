const productosBD = require("./conexion").productos;
const Producto=require("../models/ProductoModelo");
const {productos} = require("./conexion");

function validarDatos(producto){
    var valido=false;
    if(producto.nombre!=undefined && producto.descripcion!=undefined && producto.precio!=undefined && producto.stock!=undefined){
        valido=true;
    }
    return valido;
}

async function mostrarProductos(){
    const productos = await productosBD.get();
    productosValidos=[];
    productos.forEach(producto => {
        const producto1=new Producto({id:producto.id,...producto.data()});
        //console.log(producto1.getProducto);
        
        if(validarDatos(producto1.getProducto)){
            productosValidos.push(producto1.getProducto);
        }
    });
    //console.log(productosValidos);
    return productosValidos;
}

async function buscarPorID(id) {
    const producto=await productosBD.doc(id).get();
    const producto1=new Producto({id:producto.id,...producto.data()});
    var productoValido;
    if(validarDatos(producto1.getProducto)){
        productoValido=producto1.getProducto;
    }
    console.log(productoValido);
    return productoValido;
}

async function nuevoProducto(data) {
   
    data.tipoProducto="producto";
    const producto1=new Producto(data);
    console.log(producto1.getProducto);
    var productoValido=false;
    if(validarDatos(producto1.getProducto)){
        await productosBD.doc().set(producto1.getProducto);
        productoValido=true;
    }
    return productoValido;
}

async function borrarProducto(id){
    var productoValido = await buscarPorID(id);
    var productoBorrado = false;
    if(productoValido){
        await productosBD.doc(id).delete();
        productoBorrado=true;
    }
    return productoBorrado;
}

async function editarProducto(id, nuevosDatos) {
    const productoValido = await buscarPorID(id);
    if (productoValido) {
        await productosBD.doc(id).update(nuevosDatos);
        return true;
    }
    return false;
}


module.exports={
    mostrarProductos,
    nuevoProducto,
    borrarProducto,
    buscarPorID,
    editarProducto
};