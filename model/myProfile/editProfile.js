// Retrives the data from HTML and run it as an asycronised function so that the HTML elements are fully loaded
async function updateFunction() {
    var username = document.getElementById("editUsername").value;
    var password = document.getElementById("newPassword").value;
    var phone = document.getElementById("editPhone").value;
    var city = document.getElementById("newCity").value;
    var zip = document.getElementById("newZip").value;
    var address = document.getElementById("newAddress").value;
    var email = document.getElementById("newEmail").value;
    
// Makes shure the user cant change the username since it is the unique identifyer in our program
      let updateData = {
          username : username,
          email: email,
          phone: phone,
          city: city,
          zip: zip,
          address: address,
          password : password, 
      }
    
// Sends a PUT reqest to the server using axios
      axios.put("http://localhost:2500/editProfile/" + username, updateData)
                  .then(function(response){
                  console.log(response);
              } 
                    )}