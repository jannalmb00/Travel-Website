//elements
const toggleButton = document.querySelector('.toggle-button');
const navBarLinks = document.querySelector('.navbar-links');
let next = document.querySelector('.next');
let prev = document.querySelector('.prev');
let slider = document.querySelector('.slider');

//-------------------event listener-------------------------
toggleButton.addEventListener('click', () => {
  console.log(navBarLinks != null);
  navBarLinks.classList.toggle('active');
});

next.addEventListener('click', function(){
  let slides = document.querySelectorAll('.slides');
  slider.appendChild(slides[0]);
})
prev.addEventListener('click', function(){
  let slides = document.querySelectorAll('.slides');
  let lastSlide = slides[slides.length - 1];
  slider.insertBefore(lastSlide,slides[0]);
})

