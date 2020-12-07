// Constructs a class to structure the user data
class User {
    constructor(username, password, phone, city, zip, address, email, gender){
        this.username = username;
        this.password = password;
        this.phone = phone;
        this.city = city;
        this.zip = zip;
        this.address = address;
        this.email = email;
        this.gender = gender;
    }
}

// Errors are deffined for all the elements
function printError(elemID, hintMsg) {
    document.getElementById(elemID).innerHTML = hintMsg;
}

// Creates the validation function 
function validateForm(event) {

// Retrives the input values from HTML
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var phone = document.getElementById("phone").value;
    var city = document.getElementById("city").value;
    var zip = document.getElementById("zip").value;
    var address = document.getElementById("address").value;
    var email = document.getElementById("email").value;


// Gives all of the input a default error status
    var usernameErr = true;
    var passwordErr = true;
    var phoneErr = true;
    var cityErr = true;
    var zipErr = true;
    var addressErr = true;
    var emailErr = true;

// Validates username
if (username ==""){
    printError("usernameErr", "Type in a username");
}
// Makes shure a username can only consist of stadart chrachters 
//regex from: https://stackoverflow.com/questions/9628879/javascript-regex-username-validation
else {
    var regex = /^[a-zA-Z0-9]+$/;

// Deffins when the username validation is to send an error message and the message
    if (regex.test(username) === false){
        printError("usernameErr", "Username can only consist of standart characters");
    }
// If it passes the first paramater it runs the next
    if(regex.test(username) == true){
    
            const xhr = new XMLHttpRequest();
            xhr.responseType = "json"    
        
// Sends the data to the API, the logic is in the API for unique username validation
            xhr.open("post", "http://localhost:2500/ifExisting");
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.send(JSON.stringify({username}));

            xhr.addEventListener("readystatechange", function() {
                if(this.readyState === 4) {
                    const res = this.response 
                    if (res.message === "Failed"){
                        printError("usernameErr", "username taken");
            }
    
// Email is validated
    if (email =="") {
        printError("emailErr", "please enter an email")
    }
// Deffines that a email must consist of these charachters. regex from stackoverflow.com
    else{
        var regexMail = /^\S+@\S+\.\S+$/;
        if (regexMail.test(email) === false) {
            printError("emailErr", "Please enter a valid email")
        }else {
            printError("emailErr", "");
            emailErr = false;
        }
    }

// Validate phonenumber
    if (phone ==""){
        print("phoneErr", "please enter your phone number");
    } else {
//regex from stackoverflow.com
        var regexPhone = /^[0-9]{8}$/;
        if (regexPhone.test(phone)===false){
            printError("phoneErr", "please enter a 8 digit phone number")
        } else {
            printError("phoneErr", "");
            phoneErr = false;
        }
    }

// Validate city
    if (city ==""){
        print("cityErr", "please enter a city");
    } else {
// Only standart characters, same code as the username character validation from stackoverflow.com
        var regexCity = /^[a-zA-Z\s]+$/;
        if(regexCity.test(city) === false) {
            printError("cityErr", "Cityname can only contain letters from A-Z");
        }else {
            printError("cityErr", "");
            cityErr = false;
        }
    }

// Validate zip-code
    if (zip==""){
        print("zipErr", "please enter a valid ZIP-code");
    } else {
// For danish users this need to be 4 digits, same regex code as the phone number just with 4 instead of 8. 
        var regexZip = /^[0-9]{4}$/;
        if (regexZip.test(zip) === false) {
        printError("zipErr","Zip code must be exactly four digits") ;
        }
        else {
            printError("zipErr", "");
            zipErr = false;
        }
    }

// Validation of addres
//regex from: https://stackoverflow.com/questions/3763820/javascript-regular-expression-to-validate-an-address
    if (address==""){
        print("adressErr", "please enter an address"); 
    } else {
        var regexAddress = /^[a-zA-Z0-9\s,.'-]{3,}$/;
        if (regexAddress.test(address) === false) {
            printError("addressErr", "Type in valid addres");
        } else {
            printError("addressErr", "");
            addressErr = false;
        }
    }

// Validation of password
    if (password==""){
        printError("passwordErr", "Please type a password");
    }else {
        //password regex fra stackoverflow
        var regexPassword = /^[a-zA-Z0-9\s,.'-]{3,}$/;
        if (regexPassword.test(password)===false){
            printError("passwordErr", "please enter a secure password");
        }else {
            printError("passwordErr", "");
            passwordErr = false;
        }
    }

// Makes shure that the function wont create the user if any of the validation fails
    if ((usernameErr && phoneErr && cityErr && zipErr && addressErr && emailErr && passwordErr) == true){
        return false;
    }
 }}
 )}}}