import {Mesa} from './Mesa.js'
import {Cliente} from './Cliente.js'
import {Restaurante} from './Restaurante.js'
class Reserva  {
    constructor(id,fecha,hora,numeroPersonas){
        this.id = id;
        this.clienteNombre = Cliente.nombre;
        this.fecha = fecha;
        this.hora = hora;
        this.numeroPersonas = numeroPersonas;
        this.mesaAsignada = Mesa.Reserva;
        this.restaurant = Restaurante;
        this.status = Boolean;
        this.reservas = [];
    }

    //consultar una reserva
    consultarReserva(reserva){
        console.log("Numero de reserva: "+this.id);
        console.log("Status de reserva: "+this.status);
        console.log("Cliente: "+this.clienteNombre);
        console.log("Fecha de reserva: "+this.fecha);
        console.log("Hora de reserva: "+this.hora);
        console.log("Numero de personas a asistir: "+this.numeroPersonas);
        console.log("Mesa asignada: "+this.mesaAsignada);
        console.log("Restaurante donde se realizo la reserva: "+this.restaurant);
    }

    //agrega las reservas asociadas a un restaurante
    reservasMismoRestaurante(reserva,Restaurante){
        if (this.restaurant===Restaurante.nombre){
            reservas.push(reserva);
        }
    }

    
}



export{Cliente}
export{Mesa}
export{Restaurante}

