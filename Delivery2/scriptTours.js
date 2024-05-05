const toggleButton = document.querySelector('.toggle-button');
const navBarLinks = document.querySelector('.navbar-links');

console.log(toggleButton); // Check if toggleButton is selected
console.log(navBarLinks);

toggleButton.addEventListener('click', () => {
  console.log(navBarLinks != null);
  navBarLinks.classList.toggle('active');
});

  //fetch data
  fetch('data-tours.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const tours = data.continents.reduce((acc, continent) => acc.concat(continent.tours), []);
    const tourList = document.getElementById('tour-main');

    // Create a document fragment to hold tour elements
    const fragment = document.createDocumentFragment();

    tours.forEach(tour => {
      const tourElement = document.createElement('div');
      tourElement.classList.add('tour');
      tourElement.innerHTML = `
        <img src="${tour.image}" alt="${tour.name}">
        <h2>${tour.name}</h2>
        <p>Location: ${tour.location}</p>
        <p>Price: $${tour.price}</p>
        <p>Duration: ${tour.duration_days} days</p>
        <p>Description: ${tour.description}</p>
      `;
      fragment.appendChild(tourElement);
    });

    // Append the fragment to the tourList element
    tourList.appendChild(fragment);
  })
  .catch(error => {
    console.error('There was a problem with the fetch', error);
  });
