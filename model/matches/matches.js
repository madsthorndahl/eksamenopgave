document.addEventListener("DOMContentLoaded", function() {
   const xhr = new XMLHttpRequest();
   xhr.responseType = "json"

   // Retrives the data from the HTML file
   var matchesContainer = document.getElementById('matchesContainer');
   // Retrives data from the JSON file
   xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
         var allMatches = this.response;
         console.log(allMatches)
       
            // Displays all the posible matches
            for(var i=0; i< allMatches.length; i++){
            var match = document.createElement('div');
            match.className = "match";
            // On click opens a new HTML element to display the profile
            match.innerHTML += '<div class="matchName" id='+allMatches[i].username+' onClick="interMatch('+allMatches[i].username+')">'+allMatches[i].username+'</div>';
            matchesContainer.appendChild(match);
            }
          }

      })

      
         
// Sends the GET request to the API
xhr.open("GET", "http://localhost:2500/matches", true);
   
xhr.setRequestHeader("Content-Type", "application/json");

xhr.send();
                
})

// Runs an asycronised fuction in order for the HTML elements to be fully loaded before the code runs
async function interMatch(username){
   const xhr = new XMLHttpRequest();
   xhr.responseType = "json"

// Indentify witch user that is displayd and set them as an local storage item for later use
   xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
         var allMatches = this.response;
         for (var i = 0; i < allMatches.length; i++) {            
            if (allMatches[i].username == username.id) {
                let founduser =  allMatches[i];
                localStorage.setItem('founduser', JSON.stringify(founduser))
                window.location = "../view/intermatch.html"
            }
        }
      }

   })
// Sends the GET request to the API
xhr.open("GET", "http://localhost:2500/matches", true);
   
xhr.setRequestHeader("Content-Type", "application/json");
   
xhr.send();

}