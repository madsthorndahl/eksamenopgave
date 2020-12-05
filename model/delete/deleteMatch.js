// Vi laver et post request der ligner likesarrayet meget! 
// Inde i API skal vi så loope igennem likesarrayet, og finde matches. 
// dvs. if (likesarray[i].username == likesarray[j].likedPerson && likesarray[j].username == likesarray[i].likedPerson)


document.addEventListener("DOMContentLoaded", function() {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json"
    xhr.addEventListener("readystatechange", matchFunction);
    xhr.open("GET", "http://localhost:2500/findMatch", true);
  // definerer at det er en JSON-fil der skal arbejdes med
    xhr.setRequestHeader("Content-Type", "application/json");
  // Sender http requested afsted. Den sender altså den data som er indtastet af brugeren, til vores server (localhost). 
    xhr.send();
})
 

    function matchFunction () {
        if(this.readyState === 4) {
            var findingMatches = this.response;
            console.log(findingMatches)
          
            let currentUser = JSON.parse(localStorage.getItem("currentUser"))
            console.log(currentUser)
        
            // for-loopet som tager arrayet og looper gennem matches
            for(var i=0; i< findingMatches.length; i++){
                for(var j=0; j < findingMatches.length; j++){
                    if (currentUser.username === findingMatches[i].username 
                        && 
                        findingMatches[i].username === findingMatches[j].likedUser 
                        && 
                        findingMatches[i].likedUser === findingMatches[j].username ){
                        console.log(findingMatches[i].likedUser)  
                        
                        var matchRow = document.createElement('div');
                        matchRow.classList.add('match-row'); //vi bruger CSS stilen 'match-row'for div elementet matchRow
                        var matchItems = document.getElementsByClassName('match-items')[0]; /*vi vil senere tilføje en række til  div sektionen 'match-items'
                        hvor de valgte personer listes */
                        var matchTitleNames = matchItems.getElementsByClassName('match-item-title');
                    
                        //Generer html-indholdet til en linje med det valgte match, (Web Dev Simplified - youtube, 2018)
                        // laver en knap til at fjerne matchet fra matchlisten
                        let matchRowContents = `   
                            <div class="match-items match-column">
                                <span class="match-name">${findingMatches[i].likedUser}</span>
                                        
                            </div>
                        
                            <div class="match-quantity match-column">
                            <button class="btn btn-danger" id="${findingMatches[i].likedUser}" type="button">REMOVE</button>
                            </div>`
                    
                      matchRow.innerHTML = matchRowContents; //html koden indeholdt i matchRowContents variablen indøres i elementet matchRow
                        matchItems.append(matchRow) //matchRow tilføjes til sektionen matchItems på html siden
                        //De næste to linjer Sørger for at henholdsvis removeMatch funktion kaldes når der trykkes på knappen
                        matchRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeMatchHTML);
                    }
                } 
            }
            alert ("It's a match!!!!!!!")  
          
        }
    }

//Funktion som sletter match ved tryk på remove knappen 


//funktion for at fjerne et match fra både HTML siden og arrayet i local storage 
function removeMatchHTML(event) {
    var buttonClicked = event.target; //ved button.clicked refereres der til den aktuelle element, som skal fjernes
    buttonClicked.parentElement.parentElement.remove(); // fjerner den aktuelle html række, for det match, som brugeren ønskede fjernet.

sendUpdate(buttonClicked.id); // dette id er den person der klikkes på username 

}

function sendUpdate(username){ //herved inddrages username for den som klikkes på, hvilket sendes over i API'et 
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json"
    //xhr.addEventListener("readystatechange");
    xhr.open("DELETE", "http://localhost:2500/deleteMatch", true);
    // definerer at det er en JSON-fil der skal arbejdes med
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(username));
}

 // alert("Your match has been removed");
 // window.location.href = ("../view/myMatches.html")








 

//deleteMatch = document.getElementsByClassName('btn-danger')[0]
window.onload=function(){
document.getElementsByClassName('btn-danger')[0].addEventListener('click', function() {

    
    let currentUser = JSON.parse(localStorage.getItem("currentUser"))  
    axios.delete("http://localhost:2500/deleteMatch", {
            data: currentUser
    })
    .then(response=>{
            console.log(response.data)
    })                
})
}

/*
deleteUser.addEventListener('click', function() {
        let allUsers;
        let newUsers;
        const xhr = new XMLHttpRequest();
        xhr.responseType = "json"
    
        xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
        allUsers = this.response;
        //     console.log(allUsers);
        let currentUser = JSON.parse(localStorage.getItem("currentUser"))
          newUsers = allUsers.filter(allUser => allUser.username !== currentUser.username);
         console.log(this.response)
        } });
        
        xhr.open("GET", "http://localhost:2500/allusers", true);
           
// definerer at det er en JSON-fil der skal arbejdes med
        // xhr.setRequestHeader("Content-Type", "application/json");
// Sender http requested afsted. Den sender altså den data som er indtastet af brugeren, til vores server (localhost).
        xhr.send();
    })
    


async function slet() {
await deleteUser.addEventListener('click', function() {
        let allUsers;
        let newUsers;
        const xhr = new XMLHttpRequest();
        xhr.responseType = "json"
    
        xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
        allUsers = this.response;
        //     console.log(allUsers);
        let currentUser = JSON.parse(localStorage.getItem("currentUser"))
          newUsers = allUsers.filter(allUser => allUser.username !== currentUser.username);
         console.log(this.response)
        } });
        
        xhr.open("GET", "http://localhost:2500/allusers", true);
           
// definerer at det er en JSON-fil der skal arbejdes med
        // xhr.setRequestHeader("Content-Type", "application/json");
// Sender http requested afsted. Den sender altså den data som er indtastet af brugeren, til vores server (localhost).
        xhr.send();
    })
    //her vil i kunne gå i gang med nyt req
    document.addEventListener("DOMContentLoaded", function() {
        const xhr = new XMLHttpRequest();
        xhr.responseType = "json"

        xhr.addEventListener("readystatechange", function() {
                if(this.readyState === 4) {
                allUsers = this.response;
                //     console.log(allUsers);
                let currentUser = JSON.parse(localStorage.getItem("currentUser"))
                  newUsers = allUsers.filter(allUser => allUser.username !== currentUser.username);
                 console.log(this.response)
                } });
                
                xhr.open("DELETE", "http://localhost:2500/deleteUser", true);
                   
        // definerer at det er en JSON-fil der skal arbejdes med
                // xhr.setRequestHeader("Content-Type", "application/json");
        // Sender http requested afsted. Den sender altså den data som er indtastet af brugeren, til vores server (localhost).
                xhr.send(allUser);
    })

    }
    */