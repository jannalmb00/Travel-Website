document.addEventListener('DOMContentLoaded', function() {

  // Global variables
  let tours;
  let tourList;
  let savedTours =  [];


  // DOM elements
  const toggleButton = document.querySelector('.toggle-button');
  const navBarLinks = document.querySelector('.navbar-links');
  const dropdowns = document.querySelectorAll('.dropdown');
  const inputRange = document.querySelector('.input-range');
  const maxPrice = document.querySelector('.max-price');
  const pins = document.querySelectorAll('.pin');


  // Event listeners
  toggleButton.addEventListener('click', toggleNavBar);
  dropdowns.forEach(setupDropdown);
  inputRange.addEventListener('input', updatePriceRange);
  pins.forEach(pin => pin.addEventListener('click', filterByContinent));
  document.querySelector('.button-filter').addEventListener('click', applyFilters);


    fetchTours();
    updatePriceRange();



  //------------------- Event Handler Functions -------------------
  function toggleNavBar() {
    navBarLinks.classList.toggle('active');
  }

  function setupDropdown(dropdown) {
    const select = dropdown.querySelector('.select');
    const caret = dropdown.querySelector('.caret');
    const menu = dropdown.querySelector('.menu');
    const options = dropdown.querySelectorAll('.menu li');

    select.addEventListener('click', () => {
      select.classList.toggle('select-clicked');
      caret.classList.toggle('caret-rotate');
      menu.classList.toggle('menu-open');
    });

    options.forEach(option => {
      option.addEventListener('click', () => {
        select.querySelector('.selected').textContent = option.innerText;
        select.classList.remove('select-clicked');
        caret.classList.remove('caret-rotate');
        menu.classList.remove('menu-open');
        options.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
      });
    });
  }

  function updatePriceRange() {
    maxPrice.textContent = `500 - ${inputRange.value}`;
  }

  function filterByContinent() {
    const continent = this.querySelector('span').textContent;
    document.querySelector('.selected').textContent = continent;
    applyFilters();
  }

  function applyFilters() {
    const selectedConti = document.querySelector('.selected').textContent;
    const maxPriceValue = parseInt(inputRange.value);
    const numberOfDays = parseInt(document.querySelector('.num-days').value);

    const filteredTours = tours.filter(tour => {
      if (selectedConti !== 'Continent' && tour.location !== selectedConti) {
        return false;
      }
      if (tour.price > maxPriceValue || tour.duration_days > numberOfDays) {
        return false;
      }
      return true;
    });

    displayTours(filteredTours);
  }

  //------------------- Helper Functions -------------------
  function fetchTours() {
    fetch('./data-file/data-tours.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        tours = data.continents.reduce((acc, continent) => acc.concat(continent.tours), []);
        tourList = document.getElementById('tour-main');
        displayTours(tours);
      })
      .catch(error => {
        console.error('There was a problem with the fetch', error);
      });
  }

  function displayTours(toursToDisplay) {
    const fragment = document.createDocumentFragment();
    if (toursToDisplay.length > 0) {
      toursToDisplay.forEach(tour => {
        const tourElement = createTourElement(tour);
        fragment.appendChild(tourElement);
      });
    } else {
      const iframeElement = document.createElement('iframe');
      iframeElement.src = "https://giphy.com/embed/E09MRfFAJ5qwFXX8Aq";
      iframeElement.width = "429";
      iframeElement.height = "480";
      iframeElement.frameBorder = "0";
      iframeElement.className = "giphy-embed";
      iframeElement.allowFullScreen = true;
      fragment.appendChild(iframeElement);
    }

    tourList.innerHTML = '';
    tourList.appendChild(fragment);
  }

  function createTourElement(tour) {
    const tourElement = document.createElement('div');
    tourElement.classList.add('tour', 'div-style');
    tourElement.innerHTML = `
      <img src="${tour.image}" alt="${tour.name}">
      <div class="tour-body">
        <h3>${tour.name}</h3>
        <p>Location: ${tour.location}</p>
        <p>Price: $${tour.price}</p>
        <p>Duration: ${tour.duration_days} days</p>
        <p>Description: ${tour.description}</p>
      </div>
      <button class="save-btn" data-tour-id="${tour.id}">${savedTours.includes(tour.id) ? 'Saved' : 'Save'}</button>
    `;

    const saveButton = tourElement.querySelector('.save-btn');
    saveButton.addEventListener('click', () => {
      const tourId = saveButton.dataset.tourId;
      if (saveButton.classList.contains('clicked-save-btn')) {
        addAndRemoveSavedTours('Remove', tourId);
        saveButton.textContent = 'Save';
        saveButton.classList.remove('clicked-save-btn');
      } else {
        addAndRemoveSavedTours('Add', tourId);
        saveButton.textContent = 'Saved';
        saveButton.classList.add('clicked-save-btn');
      }
    });

    return tourElement;
  }

  function addAndRemoveSavedTours(action, tourId) {
    if (action === 'Add' && !savedTours.includes(tourId)) {
      savedTours.push(tourId);
    } else if (action === 'Remove') {
      const index = savedTours.indexOf(tourId);
      if (index !== -1) {
        savedTours.splice(index, 1);
      }
    }
   
    localStorage.setItem('savedTours', JSON.stringify(savedTours)); // Store updated saved tours in localStorage
    console.log('Updated saved tours:', savedTours);
  }
  

  

});
