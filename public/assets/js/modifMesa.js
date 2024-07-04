console.log('El archivo modificar mesa ha sido llamado');
document.addEventListener("DOMContentLoaded",function(){

    document.getElementById("modificarMesaForm").addEventListener("submit", function(event){

        event.preventDefault();
        
        const id_Mesa = document.getElementById('id-modificar').value;

        const capacidad = document.getElementById('asientos-modificar').value;

        let status = document.getElementById('estatus-modificar').value;

        if (status === "No Disponible"){
            status = 1;
        }else if (status === "Disponible"){
            status = 0;
        }
    
        const correoRes = sessionStorage.getItem('correoRestaurante');
        
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
            alert(data);
            location.reload()
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    })
});