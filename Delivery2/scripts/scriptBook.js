document.addEventListener('DOMContentLoaded', function() {
  // Global variables
  const toggleButton = document.querySelector('.toggle-button');
  const navBarLinks = document.querySelector('.navbar-links');
  const tbody = document.getElementById("tBody");
  const bookBtn = document.getElementById('book-btn');
  const loginFormBook = document.getElementById('login-book-container');
  const closeButtonLoginBook = document.getElementById('close-btn-login');
  const registerFormLink = document.getElementById('register-link');
  const registerFormBook = document.getElementById('register-book-container');
  const savedTours = JSON.parse(localStorage.getItem('savedTours')) || [];

  //----------------------Event Listener----------------
bookBtn.addEventListener('click', () =>{
  loginFormBook.style.display = "Flex";
})

registerFormLink.addEventListener('click', () =>{
  registerFormBook.style.display = "Flex";
})
closeButtonLoginBook.addEventListener('click', function() {
  // Hide the login container by setting its display property to "none"
  loginFormBook.style.display = 'none';
});

  // Event listener for toggleButton
  toggleButton.addEventListener('click', () => {
    navBarLinks.classList.toggle('active');
  });

  // Fetch saved tours from local storage and display them
  displaySavedTours();

  function displaySavedTours() {
    // If there are saved tours, display them in the table
    if (savedTours.length > 0) {
      // Fetch tour data from JSON file
      fetch('./data-file/data-tours.json')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          // Assuming data is in the format { continents: [ { name: string, tours: [] }, ... ] }
          const tours = data.continents.flatMap(continent => continent.tours);
          console.log("Fetched tours:", tours);
          console.log("Saved tours:", savedTours);
          savedTours.forEach(savedTourId => {
            console.log("Checking saved tour ID:", savedTourId);
            let foundTour = null;
            for (let i = 0; i < tours.length; i++) {
              console.log(tours[i].id )
              console.log(savedTourId)
              console.log(tours[i].id == savedTourId)
              if (tours[i].id == savedTourId) {
                foundTour = tours[i];
                break;
              }
            }
            console.log("Found tour:", foundTour);
            if (foundTour) {
              const row = document.createElement("tr");
              row.innerHTML = `<td>${foundTour.name}</td><td>${foundTour.price}</td><td>${foundTour.location}</td>`;
              tbody.appendChild(row);
            }
          });
        })
        .catch(error => {
          console.error('There was a problem with the fetch', error);
        });
    } else {
      // If there are no saved tours, display a message or handle it accordingly
      const noSavedToursRow = document.createElement("tr");
      noSavedToursRow.innerHTML = `<td colspan="3">No saved tours</td>`;
      tbody.appendChild(noSavedToursRow);
    }
  }
});



