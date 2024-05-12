import {Plato} from './Plato.js'
import {Mesa} from './Mesa.js'
import {Reserva} from './Reserva.js'
class Restaurante{
    constructor(nombre,direccion,telefono,menu,mesa){
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
        this.menu = Plato.this.platos;
        this.mesas = [];
        this.reservas = Reserva.this.reservas;
    }


    //historial de reserva (muestra las reservas confirmadas por parte de un cliente)
    historialReserva(reservas){
        for (let i = 0; i<reservas.lenth();i++){
            if (reservas[i].status){
                console.log (reservas[i]);
            }
        }
    }

}



export{Plato}
export {Reserva}