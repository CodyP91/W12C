// Get references to the HTML elements we will be interacting with
var postBodyInput = document.getElementById("postBody");
var createPostButton = document.getElementById("createPostButton");
var createPostResultElement = document.getElementById("createPostResult");
var updatePostButton = document.getElementById("updatePostButton");
var updatePostResultElement = document.getElementById("updatePostResult");
var deletePostButton = document.getElementById("deletePostButton");
var deletePostResultElement = document.getElementById("deletePostResult");
var postsElement = document.getElementById("posts");
var emailInput = document.getElementById("email");
var passwordInput = document.getElementById("password");
var loginForm = document.getElementById("loginForm");
var loginMessage = document.getElementById("loginMessage");

// Add a submit event listener to the login form
loginForm.addEventListener("submit", function(event) {
  // Prevent the form from submitting normally
  event.preventDefault();

  // Build the data to send to the API
  var loginData = {
    email: emailInput.value,
    password: passwordInput.value
  };

  // Make the Axios POST request to log in the user
  axios.post("https://reqres.in/api/login", loginData)
    .then(function(response) {
      // Save the session token to a cookie
      document.cookie = "session_token=" + response.data.token;

      // Redirect the user to the home.html page
      window.location.href = "home.html";
    })
    .catch(function(error) {
      // Display an error message to the user
      loginMessage.textContent = "Sorry, there was an error logging in.";
      console.log("Error logging in:", error);
    });
});

// Make a POST request to create a new post
createPostButton.addEventListener("click", function() {
  // Display a loading message to the user
  createPostResultElement.textContent = "Creating post...";

  // Build the data to send to the API
  var postData = {
    title: "New post",
    body: postBodyInput.value,
    userId: 1
  };

  // Make the Axios POST request to create the post
  axios.post("https://jsonplaceholder.typicode.com/posts", postData)
    .then(function(response) {
      // Display a success message to the user
      createPostResultElement.textContent = "Post created successfully.";
      console.log("Post created successfully:", response);
    })
    .catch(function(error) {
      // Display an error message to the user
      createPostResultElement.textContent = "Sorry, there was an error creating the post.";
      console.log("Error creating post:", error);
    });
});

// Make a PATCH request to update a post
updatePostButton.addEventListener("click", function() {
  // Display a loading message to the user
  updatePostResultElement.textContent = "Updating post...";

  // Build the data to send to the API
  var updatedData = {
    title: "Updated post",
    body: "This is an updated post.",
    userId: 1
  };

  // Make the Axios PATCH request to update the post
  axios.patch("https://jsonplaceholder.typicode.com/posts/1", updatedData)
    .then(function(response) {
      // Display a success message to the user
      updatePostResultElement.textContent = "Post updated successfully.";
      console.log("Post updated successfully:", response);
    })
    .catch(function(error) {
      // Display an error message to the user
      updatePostResultElement.textContent = "Sorry, there was an error updating the post.";
      console.log("Error updating post:", error);
    });
});

// Make a DELETE request to delete a post
var deletePostButton = document.getElementById("deletePostButton");
var deletePostResultElement = document.getElementById("deletePostResult");
deletePostButton.addEventListener("click", function() {
// Display a loading message to the user
deletePostResultElement.textContent = "Deleting post...";

// Make the Axios DELETE request to delete the post
axios.delete("https://jsonplaceholder.typicode.com/posts/1")
.then(function(response) {
// Display a success message to the user
deletePostResultElement.textContent = "Post deleted successfully.";
console.log("Post deleted successfully:", response);
})
.catch(function(error) {
// Display an error message to the user
deletePostResultElement.textContent = "Sorry, there was an error deleting the post.";
console.log("Error deleting post:", error);
});
});

// Make a GET request to retrieve all posts and their comments
var postsElement = document.getElementById("posts");
axios.get("https://jsonplaceholder.typicode.com/posts?_embed=comments")
.then(function(response) {
// Loop through each post and its comments
for (var i = 0; i < response.data.length; i++) {
var post = response.data[i];

javascript
Copy code
  // Create a new div to hold the post and its comments
  var postDiv = document.createElement("div");

  // Add the post title to the div
  var postTitle = document.createElement("h3");
  postTitle.textContent = post.title;
  postDiv.appendChild(postTitle);

  // Add the post body to the div
  var postBody = document.createElement("p");
  postBody.textContent = post.body;
  postDiv.appendChild(postBody);

  // Add a subheading for the comments
  var commentsHeader = document.createElement("h4");
  commentsHeader.textContent = "Comments";
  postDiv.appendChild(commentsHeader);

  // Loop through each comment for this post
  for (var j = 0; j < post.comments.length; j++) {
    var comment = post.comments[j];

    // Create a new div to hold the comment
    var commentDiv = document.createElement("div");

    // Add the comment author to the div
    var commentAuthor = document.createElement("p");
    commentAuthor.textContent = comment.email;
    commentDiv.appendChild(commentAuthor);

    // Add the comment body to the div
    var commentBody = document.createElement("p");
    commentBody.textContent = comment.body;
    commentDiv.appendChild(commentBody);

    // Add the comment div to the post div
    postDiv.appendChild(commentDiv);
  }

  // Add the post div to the posts container element
  postsElement.appendChild(postDiv);
}

console.log("Posts retrieved successfully:", response);
})
.catch(function(error) {
// Display an error message to the user
postsElement.textContent = "Sorry, there was an error retrieving the posts.";
console.log("Error retrieving posts:", error);
});