window.addEventListener('scroll', function() {
    const navbarContainer = document.getElementById('navbar-container');
    const sticky = navbarContainer.offsetTop;
  
    if (window.scrollY > sticky + 20) {
      navbarContainer.classList.add('sticky');
    } else {
      navbarContainer.classList.remove('sticky');
    }
  });
  