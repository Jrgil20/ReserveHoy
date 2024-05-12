import {Reserva} from './Reserva.js'

class Cliente {
    contructor (nombre,correo,telefono){
        this.nombre = nombre;
        this.correo = correo;
        this.telefono = telefono;
        this.reserva = Reserva;
        this.historialReserva = [];
    }

    //solicitar reserva (crear reserva)
    solicitarReserva(){
        let fecha, hora, numeroPersona;
        console.log("Ingrese la fecha en la cual desee su reserva: "+fecha);
        console.log("Ingrese la hora en la cual desee su reserva: "+hora);
        console.log("Ingrese la cantidad de personas que asistiran a la reserva: "+numeroPersona);
        let reservation = new Reserva(fecha,hora,numeroPersona);
        return reservation;
    }
}

export {Reserva}