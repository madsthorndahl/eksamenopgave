// Creates variables for the code
let cp = document.getElementById('create');
let username = document.getElementById('username');
let phone = document.getElementById('phone');

// Saves the input from HTML in a JSON file 
cp.addEventListener('click', ()=> {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json"

// Variables that get the input from the input fields in HTML
    const username = document.getElementById('username');
    const phone = document.getElementById('phone');
    const city = document.getElementById('city');
    const zip = document.getElementById('zip');
    const address = document.getElementById('address');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
// Converts the data into an object
    var data = {
        username : username.value, 
        phone : phone.value,
        city : city.value,
        zip : zip.value,
        address : address.value,
        email : email.value,
        password : password.value,
    }

// Makes shure the page is ready and runs the code if it is
    xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        const respo = this.response 
    }
    });

// Opens the http request and makes it a POST request to localhost:2500
    xhr.open("POST", "http://localhost:2500/", true);

// States that the filetype i JSON
    xhr.setRequestHeader("Content-Type", "application/json");

// Sends the http request with the data
    xhr.send(JSON.stringify(data));
})






