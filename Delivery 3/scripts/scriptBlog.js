//elements
const toggleButton = document.querySelector('.toggle-button');// this is for the nav when the screen is small
const navBarLinks = document.querySelector('.navbar-links');
const writeButton = document.getElementById('write-btn');
const closeButtonLogin = document.getElementById('close-btn-login');
const loginContainer = document.getElementById('login-container');
const postContainer = document.getElementById('post-form-container');
const closeButtonPost = document.getElementById('close-btn-post');


//-----------------------------------Event listener -----------------------
// Adding click event listener to toggleButton
toggleButton.addEventListener('click', () => {
  console.log(navBarLinks != null);
  navBarLinks.classList.toggle('active');
});

writeButton.addEventListener('click', function(){
  loginContainer.style.display = 'flex';
})

closeButtonLogin.addEventListener('click', function() {
    // Hide the login container by setting its display property to "none"
    loginContainer.style.display = 'none';
  });

  closeButtonPost.addEventListener('click',function(){
    postContainer.style.display = 'none';
  })
  //----------------fetch data for the log in feature ----------------------------
  fetch('./data-file/users.json')
      .then(response => response.json())
      .then(data => {
        const users = data.users;
        console.log(users);

        // Event listener for login form submission
        document.querySelector('#login-container form').addEventListener('submit', function(event) {
          event.preventDefault(); // Prevent the default form submission behavior
          
          // Get the values of username and password
          const username = document.getElementById('username').value;
          const password = document.getElementById('password').value;
          const code = document.getElementById('code').value;
          
          const user = users.find(user => user.username === username);
          console.log(user);
          console.log()

          if (user && user.password === password && user.code.includes(code)) {
            console.log('Login successful');
            console.log(document.getElementById('login-container'));
            // i want to initiate the close button login event listener 
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
            document.getElementById('code').value = '';

            closeButtonLogin.click();
            postContainer.style.display = 'flex';

          } else {
            alert("Failed to login");
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
            document.getElementById('code').value = '';
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
          const profileNameElement = document.createElement('h3');
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


  //-----------------------adding a data to the json file ---------------------
  document.getElementById('post-submit').addEventListener('click',function(event){
    event.preventDefault();

    const name = document.getElementById('name').value;
    const content = document.getElementById('content').value;
    //const imageFile = document.getElementById('image').files[0];
    console.log(name);
    console.log(content);
    alert("Post added");

    const postElement = document.createElement('div');
    postElement.classList.add('post');
          
    // Create profile element
    const profileElement = document.createElement('div');
    profileElement.classList.add('postProfile');
          
    // Create profile name element
    const profileNameElement = document.createElement('h3');
    profileNameElement.textContent = name;
    profileElement.appendChild(profileNameElement);
          
    // Add profile element to post
    postElement.appendChild(profileElement);
          
    // Create post content element
   const contentElement = document.createElement('p');
   contentElement.textContent = content;
   postElement.appendChild(contentElement);
          
  // Create post image element
  const postImageElement = document.createElement('img');
  postImageElement.setAttribute('src', 'img/5.jpg');
  postElement.appendChild(postImageElement);
          
  // Add post to the container
  document.getElementById('testimonies').appendChild(postElement);
    closeButtonPost.click();
  });

  
