
async function updateFunction() {
    var username = document.getElementById("editUsername").value;
    var password = document.getElementById("newPassword").value;
    var phone = document.getElementById("editPhone").value;
    var city = document.getElementById("newCity").value;
    var zip = document.getElementById("newZip").value;
    var address = document.getElementById("newAddress").value;
    var email = document.getElementById("newEmail").value;
    
      let updateData = {
          username : username,
          email: email,
          phone: phone,
          city: city,
          zip: zip,
          address: address,
          password : password, 
      }
    
    
      axios.put("http://localhost:2500/editProfile/" + username, updateData)
                  .then(function(response){
                  console.log(response);
              } 
                    //.then(() => window.location = "../view/userProfile.html"));}
    
                    )}