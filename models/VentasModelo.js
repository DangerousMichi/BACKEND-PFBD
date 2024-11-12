class Venta{
    constructor(data){
        this.id=data.id;
        this.idUsuario=data.idUsuario;
        this.idProducto=data.idProducto;
        this.cantidad=data.cantidad;
        this.fecha=data.fecha;
        this.hora=data.hora;
        this.estatus=data.estatus;
    }
    //set
    set id(id){
        this._id=id;
    }
    set idUsuario(idUsuario){
        this._idUsuario=idUsuario;
    }
    set idProducto(idProducto){
        this._idProducto=idProducto;
    }
    set cantidad(cantidad){
        this._cantidad=cantidad;
    }
    set fecha(fecha){
        this._fecha=fecha;
    }
    set hora(hora){
        this._hora=hora;
    }
    set estatus(estatus){
        this._estatus=estatus;
    }
    //get
    get id(){
        return this._id;
    }
    get idUsuario(){
        return this._idUsuario;
    }
    get idProducto(){
        return this._idProducto;
    }
    get cantidad(){
        return this._cantidad;
    }
    get fecha(){
        return this._fecha;
    }
    get hora(){
        return this._hora;
    }
    get estatus(){
        return this._estatus;
    }
    get getVenta(){
    const conId={
        id:this._id,
        idUsuario:this.idUsuario,
        idProducto:this.idProducto,
        cantidad:this.cantidad,
        fecha:this.fecha,
        hora:this.hora,
        estatus:this.estatus
       }
    const sinId={
        idUsuario:this.idUsuario,
        idProducto:this.idProducto,
        cantidad:this.cantidad,
        fecha:this.fecha,
        hora:this.hora,
        estatus:this.estatus
       }
       if(this.id==undefined){
        return sinId;
       }
       else{
        return conId;
       }
    }
}

module.exports=Venta;