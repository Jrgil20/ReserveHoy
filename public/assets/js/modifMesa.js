console.log('El archivo modificar mesa ha sido llamado');
document.addEventListener("DOMContentLoaded",function(){
    document.getElementById("modificarMesaForm").addEventListener("submit", function(event){
        event.preventDefault();
        const id_Mesa = document.getElementById('id-modificar').value;
        const capacidad = document.getElementById('asientos-modificar').value;
        if (capacidad ==="Ocupada" || capacidad == "Reservada"){
            capacidad = 1;
        }else if (capacidad === "Disponible"){
            capacidad =0;
        }
    
        const status = document.getElementById('estatus-modificar').value;
        const urlParametros = new URLSearchParams(window.location.search);
        const correoRes = urlParametros.get('restaurante');
        console.log(correoRes);
        
        console.log(id_Mesa);
        
        fetch ('/modificarMesa', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                status:status, 
                capacidad:capacidad, 
                correoRes: correoRes,
                id_Mesa:id_Mesa
            })
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    })
});

 
    


