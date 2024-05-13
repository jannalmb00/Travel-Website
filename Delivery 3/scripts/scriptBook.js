document.addEventListener("DOMContentLoaded", function() {
  const savedTours = JSON.parse(localStorage.getItem('savedTours')) || [];
  let users =  JSON.parse(localStorage.getItem('users')) || [];
  let tours;

  // Fetch users and tours, then display saved tours
  fetchUsers();
  fetchTours();

  // Define constants for DOM elements
  const toggleButton = document.querySelector('.toggle-button');
  const navBarLinks = document.querySelector('.navbar-links');
  const tbody = document.getElementById("tBody");
  const bookBtn = document.getElementById('book-btn');
  const checkSubmitBtn = document.getElementById('checkout-submit');
  const loginFormBook = document.getElementById('login-book-container');
  const closeButtonLoginBook = document.getElementById('close-btn-login');
  const registerFormLink = document.getElementById('register-link');
  const registerFormBook = document.getElementById('register-book-container');
  const checkForm = document.getElementById('checkout-container');
  const closeCheckout = document.getElementById('close-btn-checkout');
  const closeSummary = document.getElementById('close-btn-Summary');
  const checkoutSummary = document.getElementById('checkout-summary');
  const closeRegisterBtn = document.getElementById('close-btn-register');

  //--------------------------- Add event listeners------------
  bookBtn.addEventListener('click', () => {
    loginFormBook.style.display = "Flex";
  });

  registerFormLink.addEventListener('click', () => {
    registerFormBook.style.display = "flex";
  });

  closeButtonLoginBook.addEventListener('click', () => {
    document.getElementById('username-login').value = '';
    document.getElementById('password-login').value = '';

    loginFormBook.style.display = 'none';
  });

  closeRegisterBtn.addEventListener('click', () => {
    registerFormBook.style.display = 'none';
  });

  closeCheckout.addEventListener('click', () => {
    checkForm.style.display = 'none';
  });
  closeSummary.addEventListener('click',()=>{

    checkoutSummary.style.display = 'none';
  })

  toggleButton.addEventListener('click', () => {
    navBarLinks.classList.toggle('active');
  });

  // Event listener for login form submission
  document.querySelector('#login-book-container form').addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('username-login').value;
    const password = document.getElementById('password-login').value;

    const user = users.find(user => user.username === username);

    if (user && user.password === password) {
      console.log('Login successful');
    
      closeButtonLoginBook.click();
      checkForm.style.display = 'flex';
     // console.log(user.name);
      displayCheckoutTour(user.name);
    } else {
      alert("Failed to login. Please check your username and password.");
      document.getElementById('username-login').value = '';
      document.getElementById('password-login').value = '';
    }
  });

  //---------------------------fetch--------------------
  // Fetch users data
  function fetchUsers() {
    fetch('./data-file/users.json')
      .then(response => response.json())
      .then(data => {
        users = data.users;
        console.log("Users loaded:", users);
      })
      .catch(error => console.error('Error loading user data:', error));
  }

  // Fetch tours data
  function fetchTours() {
    fetch('./data-file/data-tours.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        tours = data.continents.flatMap(continent => continent.tours);
        console.log("Tours loaded:", tours);
        // Once tours are loaded, display saved tours
        displaySavedTours();
      })
      .catch(error => console.error('Error loading tour data:', error));
  }

  //------------fetch for display saved tours------------------
  function displaySavedTours() {
    // If there are saved tours, display them in the table
    console.log("displaySavedTours function called"); 
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
          const tours = data.continents.flatMap(continent => continent.tours);
          console.log("Fetched tours:", tours);
          console.log("Saved tours:", savedTours);
          savedTours.forEach(savedTourId => {
            console.log("Checking saved tour ID:", savedTourId);
            let foundTour = null;
            for (let i = 0; i < tours.length; i++) {
              //console.log(tours[i].id )
              //console.log(savedTourId)
              //console.log(tours[i].id == savedTourId)
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
      bookBtn.disabled = true;
    }
  }

  //function to display the tours in the book page
  function displayCheckoutTour(client) {
    console.log("displayCheckoutTour function called"); 
    const divCheckout = document.getElementById('tour-list-checkout');
    divCheckout.innerHTML = ''; // Clear the divCheckout before adding new elements

    if (savedTours.length > 0) {
      fetch('./data-file/data-tours.json')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          const tours = data.continents.flatMap(continent => continent.tours);
          console.log("Fetched tours:", tours);
          console.log("Saved tours:", savedTours);

          savedTours.forEach(savedTourId => {
            console.log("Checking saved tour ID:", savedTourId);
            let foundTour = tours.find(tour => tour.id == savedTourId);
            if (foundTour) {
              const greet = document.getElementById("greeting-checkout");
              greet.innerText = 'Hi ' + client + "!";

              const inputRadio = document.createElement("input");
              inputRadio.type = "radio";
              inputRadio.name = "checkoutTour";
              inputRadio.value = foundTour.id;

              const tourNamelabel = document.createElement("label");
              tourNamelabel.htmlFor = inputRadio.id;
              tourNamelabel.innerText = foundTour.name;

              const br = document.createElement("br");

              // Append radio button, label, and line break to divCheckout
              divCheckout.appendChild(inputRadio);
              divCheckout.appendChild(tourNamelabel);
              divCheckout.appendChild(br);
                
              
            } else {
              alert('No tours found');
            }
          });//
          checkSubmitBtn.addEventListener('click', function(event) {
            event.preventDefault();
            // Get the selected tour ID from the checked radio button
            const numberPpl = document.getElementById('num-ppl').value;
            const selectedTourId = document.querySelector('input[name="checkoutTour"]:checked').value;
            // Call the function to show the summary with the selected tour ID  
            showSummary(client, selectedTourId,numberPpl);
            

          });

        })
        .catch(error => {
          console.error('There was a problem with the fetch', error);
        });
    } else {
      // If there are no saved tours, display a message or handle it accordingly
      const noSavedToursMessage = document.createElement("p");
      noSavedToursMessage.textContent = "No saved tours";
      divCheckout.appendChild(noSavedToursMessage);
    }
  }

 

  //---------------show summary after checkout---------------
  function showSummary(client, selectedTourId, numPpl) {
    // Get the selected tour details based on the selectedTourId
    console.log("show summary function called"); 
    //;
    closeCheckout.click();
    let selectedTour ;
    console.log(users);

    for (let i = 0; i < tours.length; i++) {
      //alert(tours[i].id );
      if (tours[i].id == selectedTourId) {
          selectedTour = tours[i];
          break; 
      }
    }
   

    
    checkoutSummary.style.display = 'flex';

    // Get the elements in the summary
    const tourNameSummary = document.getElementById('tour-name-summary');
    const tourPriceSummary = document.getElementById('tour-price-summary');
    const totalPriceSummary = document.getElementById('total-price-summary');
    const tourLocationSummary = document.getElementById('tour-location-summary');
    const tourDateSummary = document.getElementById('tour-date-summary');
    const clientNameSummary = document.getElementById('client-name-summary');
    const bookingCode = document.getElementById('booking-code');

    const startDate = new Date(document.getElementById('check-start-day').value);
    const endDate = new Date(startDate.getTime() + (selectedTour.duration_days - 1) * 24 * 60 * 60 * 1000);

    const startDateFormatted = formatDate(startDate);
    const endDateFormatted = formatDate(endDate);

    var total =  parseInt(selectedTour.price) * numPpl;

    // Populate the summary with the selected tour details and client information
    tourNameSummary.textContent = selectedTour.name;
    tourPriceSummary.textContent = selectedTour.price;
    totalPriceSummary.textContent = numPpl + " pax for " + total;
    tourLocationSummary.textContent = selectedTour.location;
    tourDateSummary.textContent = startDateFormatted + ' - ' + endDateFormatted;
    clientNameSummary.textContent = client;
    
    // Generate a random booking code (you can customize this logic as needed)
    const generatedCode = generateBookingCode();
    bookingCode.textContent = generatedCode;

    const user = users.find(user => user.name === client);

    if (user) {
      user.code.push(generatedCode);
    }

    //saveUsersToJSON();
    console.log(users);

  }

  document.getElementById('register-submit').addEventListener('click',(event)=>{
    event.preventDefault();
    closeButtonLoginBook.click();
    

      //get the details
      var newUsername = document.getElementById('username-register').value;
      var newName = document.getElementById('name').value;
      var newPassword = document.getElementById('password-register').value;
      var newEmail = document.getElementById('email').value;
      var newNumber = document.getElementById('phone-number').value;

      //new user
      var newUser = {
        "username": newUsername,
        "name": newName,
        "password": newPassword,
        "code":[generateBookingCode()],
        "email": newEmail,
        "number": newNumber
      };
      saveUserToLocalStorage(newUser);
      alert('Registration successful!');


      closeRegisterBtn.click();
      checkForm.style.display = 'flex';

      displayCheckoutTour(newName);


  })
  function saveUserToLocalStorage(newUser) {
    // Retrieve existing users from local storage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    console.log(existingUsers);
    // Add the new user to the existing users
    existingUsers.push(newUser);
    // Save the updated users to local storage
    localStorage.setItem('users', JSON.stringify(existingUsers));
    console.log(users)

  }
//--------------------Fetch-----------------------
  //--------fetch users------
  function fetchUsers() {
    fetch('./data-file/users.json')
        .then(response => response.json())
        .then(data => {
            users = data.users;
            //console.log("Users loaded:", users);
            //localStorage.setItem('users', JSON.stringify(users));
        })
        .catch(error => console.error('Error loading user data:', error));
}

//updating thr json file 
  function saveUsersToJSON() {
    const updatedUsers = { users: users };

    // Convert the updated users object to JSON
    const json = JSON.stringify(updatedUsers);

    // Send a POST request to update the JSON file
    fetch('./data-file/users.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: json
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update users JSON file');
      }
      console.log('Users JSON file updated successfully');
    })
    .catch(error => {
      console.error('Error updating users JSON file:', error);
    });
  }

  // Function to generate a random booking code (you can customize this logic as needed)
  function generateBookingCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  }
  function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }
  //-----date
  const currentDate = new Date();
  const checkStartDayInput = document.getElementById('check-start-day'); 
  const formattedDate = currentDate.toISOString().split('T')[0];
  checkStartDayInput.value = formattedDate;
  checkStartDayInput.min = formattedDate;



});