import { Restaurante } from "./Restaurante.js";
class Plato {
    contructor (nombre,precio,tipo,descrip){
        this.nombre = nomb
        this.descrip = descrip;
        this.tipo = tipo;
        this.precio = precio; 
        //lisya para platos para el "menu"
        this.platos =[]
    }

    //consultar un plato
    consultarPlato(plato){
        console.log("Plato: "+this.nombre);
        console.log("Precio: "+this.precio);
        console.log("Tipo: "+this.tipo);
        console.log("Descripcion: "+this.descrip);
    }

    //agrega plato a una lista que sera para el menu de un mismo restaurante
    agregarPlato (Restaurante,plato,platos){
        platos.push(plato);
    }

}

export {Restaurante}