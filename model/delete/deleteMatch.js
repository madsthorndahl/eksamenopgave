// Lav en eventlistener på delete knappen i mymatches.html

// ONLOAD FUNKTION. siden skal loades. dvs selve knappen skal laves, før vi kan køre en funktion på knappen.
document.addEventListener("DOMContentLoaded", function() {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json"
 
    xhr.addEventListener("readystatechange", function() {
       if(this.readyState === 4) {
          var findingMatches = this.response;
          console.log(findingMatches)

          let currentUser = JSON.parse(localStorage.getItem("currentUser"))
        
            delete123.addEventListener('click', function() {

            // for-loopet som tager arrayet og looper gennem matches
                for(var i=0; i< findingMatches.length; i++){
                    for(var j=0; j < findingMatches.length; j++){
                        if (currentUser.username === findingMatches[i].username 
                            && 
                            findingMatches[i].username === findingMatches[j].likedUser 
                            && 
                            findingMatches[i].likedUser === findingMatches[j].username){
                                
                                console.log(findingMatches[i].likedUser)  
                                

                        } 
                    } 
                }
        }

       })
    xhr.open("GET", "http://localhost:2500/deleteMatch", true);
        
    // definerer at det er en JSON-fil der skal arbejdes med
    xhr.setRequestHeader("Content-Type", "application/json");
        
    // Sender http requested afsted. Den sender altså den data som er indtastet af brugeren, til vores server (localhost). 
    xhr.send();
})

    


/*
    delete123.addEventListener('click', function() {
        const xhr = new XMLHttpRequest();
        xhr.responseType = "json"
    
        xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            var deleteMatch = this.response;
            //console.log(deleteMatch)

            }
        })
        xhr.open("DELETE", "http://localhost:2500/deleteMatch", true);
            
        // definerer at det er en JSON-fil der skal arbejdes med
        xhr.setRequestHeader("Content-Type", "application/json");
            
        // Sender http requested afsted. Den sender altså den data som er indtastet af brugeren, til vores server (localhost). 
        xhr.send();
    })
})
*/