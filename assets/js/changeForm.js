window.onload = function() {
    document.querySelector('.login').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('restauranteForm').style.display = 'flex';
        document.getElementById('clienteForm').style.display = 'none';
        document.querySelector('a.login').style.color = 'white';
        document.querySelector('a.register').style.color = 'black';
        document.querySelector('a.register').style.background= 'none';
        document.querySelector('a.login').style.background = 'linear-gradient(90deg, #004225, #057c48)';
    });

    document.querySelector('.register').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('restauranteForm').style.display = 'none';
        document.getElementById('clienteForm').style.display = 'flex';
        document.querySelector('a.login').style.color = 'black';
        document.querySelector('a.register').style.color = 'white';
        document.querySelector('a.login').style.background = 'none';
        document.querySelector('a.register').style.background = 'linear-gradient(90deg, #004225, #057c48)';

    });
}
