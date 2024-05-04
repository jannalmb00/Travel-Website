const toggleButton = document.querySelector('.toggle-button');
const navBarLinks = document.querySelector('.navbar-links');

console.log(toggleButton); // Check if toggleButton is selected
console.log(navBarLinks);

toggleButton.addEventListener('click', () => {
  console.log(navBarLinks != null);
  navBarLinks.classList.toggle('active');
});


let next = document.querySelector('.next');
let prev = document.querySelector('.prev');
let slider = document.querySelector('.slider');

next.addEventListener('click', function(){
  let slides = document.querySelectorAll('.slides');
  slider.appendChild(slides[0]);
})
prev.addEventListener('click', function(){
  let slides = document.querySelectorAll('.slides');
  let lastSlide = slides[slides.length - 1];
  slider.insertBefore(lastSlide,slides[0]);
})

