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