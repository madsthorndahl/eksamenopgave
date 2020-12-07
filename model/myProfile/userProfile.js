
// Creates a variable for the logged in user
var currentUser = JSON.parse(localStorage.getItem("currentUser"));

// Retrived the data from the User class so that the user can review their info
document.getElementById("username").value = currentUser.username;
document.getElementById("phone").value = currentUser.phone;
document.getElementById("city").value = currentUser.city;
document.getElementById("zip").value = currentUser.zip;
document.getElementById("address").value = currentUser.address;
document.getElementById("email").value = currentUser.email;

// Creates a LogOut button
var logOutBTN = document.getElementById("logOutBtn")

// Function to run onclick
logOutBTN.addEventListener("click", function(){
// Clear the local storage. Now the user is logged out and need to loggin to usethe app again
        localStorage.removeItem('currentUser'); 
        localStorage.removeItem('founduser');
        localStorage.removeItem('likes');
// Goeas to the loggin page
    window.location.replace("../view/signIn.html")

})
