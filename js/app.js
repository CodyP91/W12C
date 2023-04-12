// Define variables and get elements from the HTML document
var loginForm = document.getElementById("loginForm");
var emailInput = document.getElementById("email");
var passwordInput = document.getElementById("password");
var loginMessage = document.getElementById("loginMessage");

// Add a submit event listener to the login form
loginForm.addEventListener("submit", function(event) {
event.preventDefault(); // Prevent the form from submitting normally

// Create an object to hold user data
var userData = {
email: emailInput.value,
password: passwordInput.value
};

// Make a POST request to the server with user data using Axios
axios.post("https://reqres.in/api/login", userData)
.then(function(response) { // Handle successful response
// Set a session token cookie
document.cookie = "session_token=" + response.data.token;
// Redirect to the home page
window.location.href = "home.html";
})
.catch(function(error) { // Handle errors
loginMessage.textContent = "Invalid email or password."; // Display an error message
console.log("Error logging in:", error); // Log the error to the console
});
});

// Check if a session token cookie exists, if not, redirect to the index page
if (document.cookie.indexOf("session_token=") === -1) {
window.location.href = "index.html";
}