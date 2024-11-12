class Producto{
    constructor(data){
        this.id=data.id;
        this.nombre=data.nombre;
        this.descripcion=data.descripcion;
        this.precio=data.precio;
        this.stock=data.stock;
    }
    //set
    set id(id){
        this._id=id;
    }
    set nombre(nombre){
        this._nombre=nombre;
    }
    set descripcion(descripcion){
        this._descripcion=descripcion;
    }
    set precio(precio){
        this._precio=precio;
    }
    set stock(stock){
        this._stock=stock;
    }
    //get
    get id(){
        return this._id;
    }
    get nombre(){
        return this._nombre;
    }
    get descripcion(){
        return this._descripcion;
    }
    get precio(){
        return this._precio;
    }
    get stock(){
        return this._stock;
    }
    get getProducto(){
    const conId={
        id:this._id,
        nombre:this.nombre,
        descripcion:this.descripcion,
        precio:this.precio,
        stock:this.stock
       }
    const sinId={
        nombre:this.nombre,
        descripcion:this.descripcion,
        precio:this.precio,
        stock:this.stock
       }
       if(this.id==undefined){
        return sinId;
       }
       else{
        return conId;
       }
    }
}

module.exports=Producto;