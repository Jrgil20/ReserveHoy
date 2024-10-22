    const cliente = sessionStorage.getItem('correoCliente');
    
    document.getElementById('eliminarPerfilBtn').addEventListener("click", () => {

        const contraseñaIntroducida = document.getElementById('contraseñaEliminar').value; 
    
        const contraseñaActual = document.getElementById('contraseñaCorrecta').value;

        if(contraseñaIntroducida === ""){
            return alert("La contraseña no puede ser vacía");
        }
    
        if(contraseñaIntroducida !== contraseñaActual){
            return alert("Contraseña inválida");
        }

        fetch('/eliminarCliente',{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({correo: cliente}),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert(data.message);
            }
            sessionStorage.removeItem('correoCliente');
            if (data.url) {
                window.location.href = data.url;
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    })

