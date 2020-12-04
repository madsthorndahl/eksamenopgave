deleteUser = document.getElementById("deleteBtn")


deleteUser.addEventListener('click', function() {
    
        const xhr = new XMLHttpRequest();
        xhr.responseType = "json"
    
        xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            var allUsers = this.response;
            console.log(allUsers);

      
            
          let currentUser = JSON.parse(localStorage.getItem("currentUser"))

            allUsers = allUsers.filter(allUser => allUser.username !== currentUser.username);
            console.log(allUsers);
            
        } 
    });
    
         

        xhr.open("DELETE", "http://localhost:2500/deleteProfile", true);
            
        // definerer at det er en JSON-fil der skal arbejdes med
        xhr.setRequestHeader("Content-Type", "application/json");
            
        // Sender http requested afsted. Den sender altså den data som er indtastet af brugeren, til vores server (localhost). 
        xhr.send(JSON.stringify());
    
    })