const express=require("express");
const session=require("express-session");
const cors =require("cors"); 
const usuarioRutas=require("./routes/rutasUsuarios");
const productoRutas=require("./routes/rutasProductos");
const ventaRutas=require("./routes/rutasVentas");


const app=express();
app.use(session({
    secret:"jsdjnksdnsjk",
    resave:true,
    saveUninitialized:true,
    cookie:{secure:true}
}))
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use("/",usuarioRutas);
app.use("/", productoRutas);
app.use("/", ventaRutas);


const port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("Servidor en http://localhost:"+port)
});