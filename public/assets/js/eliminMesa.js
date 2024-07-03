document.addEventListener("DOMContentLoaded",function(){
    document.getElementById("eliminarMesaForm").addEventListener("submit", function(event){
        event.preventDefault();
        const idAEliminar = document.getElementById("id-eliminar").value;

        const url = new URLSearchParams(window.location.search);

        const correoRest = url.get('restaurante');
        
        if (!idAEliminar || !correoRest){
            alert("Error: falta informaci[on para eliminar la mesa");
        }

        fetch('/eliminarMesa',{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({idAEliminar:idAEliminar, correoRes: correoRest}),
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            window.location.reload();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    })

})

