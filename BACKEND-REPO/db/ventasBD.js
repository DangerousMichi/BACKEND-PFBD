const ventasBD = require("./conexion").ventas; 
const usuariosBD = require("./conexion").usuarios;
const productosBD = require("./conexion").productos;

const Venta = require("../models/VentasModelo");
const {ventas} = require("./conexion");

function validarDatos(venta) {
    let valido = false;
    if (venta.idUsuario != undefined && venta.idProducto != undefined && venta.cantidad != undefined && venta.cantidad > 0) {
        valido = true;
    }
    console.log(valido);
    return valido;
}

async function mostrarVentas() {
    const ventasSnapshot = await ventasBD.get();
    const ventasValidas = [];
    const usuariosMap = new Map();
    const productosMap = new Map();

    const ventas = ventasSnapshot.docs || []; // Asegura que sea un array
    
    for (const venta of ventas) {
        const ventaData = venta.data();
        const venta1 = new Venta({ id: venta.id, ...ventaData });
        
        if (validarDatos(venta1.getVenta)) {
            const idUsuario = venta1.getVenta.idUsuario;
            const idProducto = venta1.getVenta.idProducto;

            // Obtener nombres de usuario y producto
            const nombreUsu = await obtenerNombreUsuario(idUsuario, usuariosMap);
            const nombreProd = await obtenerNombreProducto(idProducto, productosMap);

            ventasValidas.push({
                id: venta1.getVenta.id,
                idUsuario: nombreUsu || "Usuario no encontrado",
                idProducto: nombreProd || "Producto no encontrado",
                cantidad: venta1.getVenta.cantidad,
                fecha: venta1.getVenta.fecha,
                hora: venta1.getVenta.hora,
                estatus: venta1.getVenta.estatus
            });
        }
    }

    return ventasValidas;
}

// Funciones auxiliares para obtener nombre de usuario y producto
async function obtenerNombreUsuario(idUsuario, usuariosMap) {
    if (!usuariosMap.has(idUsuario)) {
        const usuarioSnapshot = await usuariosBD.doc(idUsuario).get();
        usuariosMap.set(idUsuario, usuarioSnapshot.exists ? usuarioSnapshot.data().nombre : null);
    }
    return usuariosMap.get(idUsuario);
}

async function obtenerNombreProducto(idProducto, productosMap) {
    if (!productosMap.has(idProducto)) {
        const productoSnapshot = await productosBD.doc(idProducto).get();
        productosMap.set(idProducto, productoSnapshot.exists ? productoSnapshot.data().nombre : null);
    }
    return productosMap.get(idProducto);
}

async function buscarPorID(id) {
    try {
        const ventaSnapshot = await ventasBD.doc(id).get();
        if (!ventaSnapshot.exists) {
            throw new Error("La venta no existe.");
        }

        const ventaData = ventaSnapshot.data();
        const venta1 = new Venta({ id: ventaSnapshot.id, ...ventaData });

        if (!validarDatos(venta1.getVenta)) {
            throw new Error("Datos de la venta no válidos.");
        }

        const idUsuario = venta1.getVenta.idUsuario;
        const idProducto = venta1.getVenta.idProducto;

        const usuarioSnapshot = await usuariosBD.doc(idUsuario).get();
        if (!usuarioSnapshot.exists) {
            throw new Error("El usuario no existe.");
        }
        const nombreUsu = usuarioSnapshot.data().nombre;

        const productoSnapshot = await productosBD.doc(idProducto).get();
        if (!productoSnapshot.exists) {
            throw new Error("El producto no existe.");
        }
        const nombreProd = productoSnapshot.data().nombre;

        return {
            id: venta1.getVenta.id,
            nombreUsu: nombreUsu,
            nombreProd: nombreProd,
            cantidad: venta1.getVenta.cantidad,
            fecha: venta1.getVenta.fecha,
            hora: venta1.getVenta.hora,
            estatus: venta1.getVenta.estatus
        };
    } catch (error) {
        console.error(error);
        return { error: error.message };
    }
}

async function nuevaVenta(data) {
    const fechaActual = new Date();
    const fechaA = fechaActual.toISOString().split('T')[0];
    const horaA = fechaActual.toTimeString().split(' ')[0];

    data.fecha = fechaA;
    data.hora = horaA;
    data.estatus = "vendido";

    const venta1 = new Venta(data);
    console.log(venta1.getVenta);
    let ventaValida = false;
    if (validarDatos(venta1.getVenta)) {
        await ventasBD.doc().set(venta1.getVenta);
        ventaValida = true;
    }
    return ventaValida;
}

async function cancelarVenta(id) {
    const fechaActual = new Date();
    const fechaA = fechaActual.toISOString().split('T')[0];
    const horaA = fechaActual.toTimeString().split(' ')[0];

    const ventaValida = await buscarPorID(id);
    if (!ventaValida) {
        console.log("No es una venta válida");
        return null;
    }

    const ventaActualizada = {
        fecha: fechaA,
        hora: horaA,
        estatus: "cancelado"
    };

    await ventasBD.doc(id).update(ventaActualizada);
    return ventaActualizada;
}

async function editarVenta(id, nuevosDatos) {
    const ventaValida = await buscarPorID(id);
    if (ventaValida) {
        await ventasBD.doc(id).update(nuevosDatos);
        return true;
    }
    return false;
}

module.exports = {
    mostrarVentas,
    nuevaVenta,
    cancelarVenta,
    buscarPorID,
    editarVenta
};
