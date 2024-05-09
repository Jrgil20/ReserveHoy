window.onload = function() {
    document.querySelector('.login').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('restauranteForm').style.display = 'block';
        document.getElementById('clienteForm').style.display = 'none';
    });

    document.querySelector('.register').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('restauranteForm').style.display = 'none';
        document.getElementById('clienteForm').style.display = 'block';
    });
}