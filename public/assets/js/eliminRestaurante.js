const local = sessionStorage.getItem('correoRestaurante');

document.getElementById('eliminarRestauranteBtn').addEventListener("click", () => {

    const contraseñaIntroducida = document.getElementById('contraseñaEliminar').value; 
    
    const contraseñaActual = document.getElementById('claveActual').value;

    if(contraseñaIntroducida === ""){
        return alert("La contraseña no puede ser vacía");
    }

    if(contraseñaIntroducida !== contraseñaActual){
        return alert("Contraseña inválida");
    }

   fetch('/eliminarRestaurante',{
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({correoRes: local}),
   })
   .then(response => response.json())
   .then(data => {
       if (data.message) {
           alert(data.message);
       }
       sessionStorage.removeItem('correoRestaurante');
       if (data.url) {
           window.location.href = data.url;
       }
   })
   .catch((error) => {
       console.error('Error:', error);
   });
})