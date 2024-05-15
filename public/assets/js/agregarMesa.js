let capacidad=4;
let numMesa = 2;
let correoRes = "mcdonalds@gmail.com";

fetch('/agregarMesa', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ capacidad: capacidad, numMesa: numMesa, correoRes: correoRes }),
})
.then(response => response.text())
.then(data => alert(data))
.catch((error) => {
    console.error('Error:', error);
});