const buttons = document.querySelectorAll('.form-group button');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    buttons.forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
  });
});