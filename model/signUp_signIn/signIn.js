    
// initializes a XMLHttpRequest and defines the file type
function signIn(){
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json"

    // Import the HTML elements containing Log-In data
        var username = document.getElementById("username");
        var password = document.getElementById("password");

    // Create a object with the values
        var loginData = {
            username : username.value,
            password : password.value,
        }

    // Recieve the data from the server, if the readystate is changed
    xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            const respo = this.response 
            
            // alert success
            if (respo.err !== 'Failed'){
                
                // Save the data from the user send back in local storage
                localStorage.setItem('currentUser', JSON.stringify(respo));


                window.location.href = ("../view/userProfile.html")
                
            }
        }})

    // Open the http request and state that  it is to send a POST request on localhost:2500
    xhr.open("POST", "http://localhost:2500/signIn", true);

    // State that the file format is JSON
    xhr.setRequestHeader("Content-Type", "application/json");

    // Sends the http request (the data)
    xhr.send(JSON.stringify(loginData));

}
