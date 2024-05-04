const toggleButton = document.querySelector('.toggle-button');
const navBarLinks = document.querySelector('.navbar-links');

console.log(toggleButton); // Check if toggleButton is selected
console.log(navBarLinks);

toggleButton.addEventListener('click', () => {
  console.log(navBarLinks != null);
  navBarLinks.classList.toggle('active');
});