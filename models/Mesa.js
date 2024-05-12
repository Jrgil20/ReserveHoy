import Reserva from './Reserva.js'

class Mesa {
    constructor (status,capacidad,numeroMesa,reservation){
        this.status = Boolean;
        this.capacidad = capacidad;
        this.numeroMesa = numeroMesa;
        this.reservation = Reserva;
    }


    //consultar una mesa
    consultarMesa(mesa){
        console.log("Numero de mesa: "+this.numeroMesa);
        console.log("Status de mesa: "+this.status);
        console.log("Capacidad: "=this.capacidad);
        //console.log("Reservación: "+Reserva);   
    }
}

export {Reserva}
export {Restaurante}