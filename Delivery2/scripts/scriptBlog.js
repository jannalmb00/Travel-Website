const toggleButton = document.querySelector('.toggle-button');
const navBarLinks = document.querySelector('.navbar-links');

console.log(toggleButton); // Check if toggleButton is selected
console.log(navBarLinks);

toggleButton.addEventListener('click', () => {
  console.log(navBarLinks != null);
  navBarLinks.classList.toggle('active');
});

const writeButton = document.getElementById('write-btn');
const closeButtonLogin = document.getElementById('close-btn-login');
const loginContainer = document.getElementById('login-container');
const postContainer = document.getElementById('post-form-container');
const closeButtonPost = document.getElementById('close-btn-post');

writeButton.addEventListener('click', function(){
  loginContainer.style.display = 'flex';
})

  // Add click event listener to the close button
closeButtonLogin.addEventListener('click', function() {
    // Hide the login container by setting its display property to "none"
    loginContainer.style.display = 'none';
  });

  closeButtonPost.addEventListener('click',function(){
    postContainer.style.display = 'none';
  })
  //fetch data for the log in feature 
  fetch('user.json')
      .then(response => response.json())
      .then(data => {
        const users = data.users;

        // Event listener for login form submission
        document.getElementById('login-form').addEventListener('submit', function(event) {
          event.preventDefault();
          const username = document.getElementById('username').value;
          const password = document.getElementById('password').value;

          // Validate credentials
          const user = users.find(user => user.username === username && user.password === password);
          if (user) {
            // Successful login, redirect or perform further actions
            alert('Login successful! Welcome, ' + user.name);
          } else {
            // Display error message for invalid credentials
            document.getElementById('login-error').style.display = 'block';
          }
        });
      })
      .catch(error => console.error('Error loading user data:', error));


  //----------------fetch blogs---------------
  // Fetch the JSON data
  fetch('./data-file/blog-posts.json')
  .then(response => response.json())
  .then(data => {
      // Loop through the data
      data.forEach(postData => {
          // Create post element
          const postElement = document.createElement('div');
          postElement.classList.add('post');
          
          // Create profile element
          const profileElement = document.createElement('div');
          profileElement.classList.add('postProfile');
          
          // Create profile name element
          const profileNameElement = document.createElement('h4');
          profileNameElement.textContent = postData.profile.name;
          profileElement.appendChild(profileNameElement);
          
          // Add profile element to post
          postElement.appendChild(profileElement);
          
          // Create post content element
          const contentElement = document.createElement('p');
          contentElement.textContent = postData.content;
          postElement.appendChild(contentElement);
          
          // Create post image element
          const postImageElement = document.createElement('img');
          postImageElement.setAttribute('src', postData.postImage);
          postElement.appendChild(postImageElement);
          
          // Add post to the container
          document.getElementById('testimonies').appendChild(postElement);
      });
  })
  .catch(error => {
      console.error('Error fetching data:', error);
  });

