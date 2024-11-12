const usuariosBD = require("./conexion").usuarios;
const Usuario=require("../models/UsuarioModelo");
const {encriptarPassword,validarPassword,usuarioAutorizado,adminAutorizado}=require("../middlewares/funcionesPassword");

function validarDatos(usuario){
    var valido=false;
    if(usuario.nombre!=undefined && usuario.usuario!=undefined && usuario.password!=undefined){
        valido=true;
    }
    return valido;
}

async function mostrarUsuarios(){
    const usuarios = await usuariosBD.get();
    usuariosValidos=[];
    usuarios.forEach(usuario => {
        const usuario1=new Usuario({id:usuario.id,...usuario.data()});
        if(validarDatos(usuario1.getUsuario)){
            usuariosValidos.push(usuario1.getUsuario);
        }
    });
    //console.log(usuariosValidos);
    return usuariosValidos;
}

async function buscarPorID(id) {
    const usuario=await usuariosBD.doc(id).get();
    const usuario1=new Usuario({id:usuario.id,...usuario.data()});
    var usuarioValido;
    if(validarDatos(usuario1.getUsuario)){
        usuarioValido=usuario1.getUsuario;
    }
    //console.log(usuarioValido);
    return usuarioValido;
}

async function nuevoUsuario(data) {
    const {salt,hash} = encriptarPassword(data.password); 
    data.password=hash;
    data.salt = salt;
    data.tipoUsuario="usuario";
    const usuario1=new Usuario(data);
    //console.log(usuario1.getUsuario);
    var usuarioValido=false;
    if(validarDatos(usuario1.getUsuario)){
        await usuariosBD.doc().set(usuario1.getUsuario);
        usuarioValido=true;
    }
    return usuarioValido;
}

async function borrarUsuario(id){
    var usuarioValido = await buscarPorID(id);
    var usuarioBorrado = false;
    if(usuarioValido){
        await usuariosBD.doc(id).delete();
        usuarioBorrado=true;
    }
    return usuarioBorrado;
}

async function editarUsuario(id, nuevosDatos) {
    const usuarioValido = await buscarPorID(id);
    if (usuarioValido) {
        await usuariosBD.doc(id).update(nuevosDatos);
        return true;
    }
    return false;
}


async function login(req, usuario, password) {
    var user={
        usuario:"anonimo",
        tipoUsuario:"sin acceso"
    }
    //console.log(usuario);
    
const usuarioCorrectos = await usuariosBD.where("usuario", "==", usuario).get()
usuarioCorrectos.forEach(usu=> {
     //console.log(usu.data()); 
    const usuarioCorrecto=validarPassword(password, usu.data().password,usu.data().salt);
    //console.log(usuarioCorrecto);
    
    if(usuarioCorrecto){
        user.usuario=usu.data().usuario;
        if(usu.data().tipoUsuario=="usuario"){
            //console.log("usuario");
            
            req.session.usuario="usuario";
            user.tipoUsuario=req.session.usuario;
            //console.log(user);
            
        }else if(usu.data().tipoUsuario=="admin"){
            req.session.admin="admin";
            user.tipoUsuario=req.session.admin;


        }
    }
});
//console.log(user);
return user;

}

module.exports={
    mostrarUsuarios,
    nuevoUsuario,
    borrarUsuario,
    buscarPorID,
    editarUsuario,
    login
};