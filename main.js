var typed = new Typed(".text", {
    strings: ["Data Scientist", "Data Engineer"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
  });

  function toggleMenu() {
    const navList = document.querySelector('.nav-list');
    navList.classList.toggle('show');
  }
