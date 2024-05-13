//elements
const toggleButton = document.querySelector('.toggle-button');// this is for the nav when the screen is small
const navBarLinks = document.querySelector('.navbar-links');
const writeButton = document.getElementById('write-btn');
const closeButtonLogin = document.getElementById('close-btn-login');
const loginContainer = document.getElementById('login-container');
const postContainer = document.getElementById('post-form-container');
const closeButtonPost = document.getElementById('close-btn-post');

let users = JSON.parse(localStorage.getItem('users')) || [];
console.log('users:')
console.log(users);
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
  document.querySelector('#login-container form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    
    // Get the values of username, password, and code
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const code = document.getElementById('code').value;

    console.log(username);
    console.log(password);
    console.log(code);
    
    // Find the user in the local storage
    const user = users.find(user => user.username === username);
    
    if (user && user.password === password && user.code.includes(code)) {
      console.log('Login successful');
      // Hide the login container
      loginContainer.style.display = 'none';
      // Display the post container
      postContainer.style.display = 'flex';
    } else {
      alert("Failed to login");
      // Clear the form fields
      document.getElementById('username').value = '';
      document.getElementById('password').value = '';
      document.getElementById('code').value = '';
    }
  });
  
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

  //-----------------------adding post ---------------------
  document.getElementById('post-submit').addEventListener('click', function(event) {
    event.preventDefault();
  
    const name = document.getElementById('name').value;
    const content = document.getElementById('content').value;
  
    // Create a new blog post object
    const newPost = {
      name: name,
      content: content,
      // Assuming the user's name is stored in local storage after login
      profile: { name: username }, // You may need to adjust this depending on how you store user data
      // You can add other properties like postImage if needed
    };
  
    // Add the new post to the local storage
    //const blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    //blogPosts.push(newPost);
    //localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
    //alert('Post added');
  
    // Display the new post on the page
    const testimoniesContainer = document.getElementById('testimonies');
    //testimoniesContainer.innerHTML = ''; // Clear existing posts
  
    // Create post element
    const postElement = document.createElement('div');
    postElement.classList.add('post');
  
    // Create profile element
    const profileElement = document.createElement('div');
    profileElement.classList.add('postProfile');
    const profileNameElement = document.createElement('h3');
    profileNameElement.textContent = name;
    profileElement.appendChild(profileNameElement);
    postElement.appendChild(profileElement);
  
    // Create post content element
    const contentElement = document.createElement('p');
    contentElement.textContent = content;
    postElement.appendChild(contentElement);

    // Create post image element
    const postImageElement = document.createElement('img');
    postImageElement.setAttribute('src', 'img/5.jpg');
    postElement.appendChild(postImageElement);

  
    // Append post element to the container
    testimoniesContainer.appendChild(postElement);
    closeButtonPost.click();

    // Hide the post container
    postContainer.style.display = 'none';
  });
 
    
    

  
