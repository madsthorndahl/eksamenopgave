// Onload runs the code that sends a http GET request to retrive the data from the JSON files
document.addEventListener("DOMContentLoaded", function() {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json"
    xhr.addEventListener("readystatechange", matchFunction);
    xhr.open("GET", "http://localhost:2500/findMatch", true);
    xhr.setRequestHeader("Content-Type", "application/json");
// Sends the http request 
    xhr.send();
})
 
// Function to create matches
// Retrive the likes.JSON from JSON data
    function matchFunction () {
        if(this.readyState === 4) {
            var findingMatches = this.response;
            console.log(findingMatches)
// retrive the curent user data from local storage
            let currentUser = JSON.parse(localStorage.getItem("currentUser"))
            console.log(currentUser)
        
// for-loop that goes thru the likes.JSON and matches it with curentUser to create matches
            for(var i=0; i< findingMatches.length; i++){
                for(var j=0; j < findingMatches.length; j++){
                    if (currentUser.username === findingMatches[i].username 
                        && 
                        findingMatches[i].username === findingMatches[j].likedUser 
                        && 
                        findingMatches[i].likedUser === findingMatches[j].username ){
                        console.log(findingMatches[i].likedUser)  
// Creates the HTML elements to display matches
                        var matchRow = document.createElement('div');
                        matchRow.classList.add('match-row');
                        var matchItems = document.getElementsByClassName('match-items')[0];
                        var matchTitleNames = matchItems.getElementsByClassName('match-item-title');
                    
                        let matchRowContents = `   
                            <div class="match-items match-column">
                                <span class="match-name">${findingMatches[i].likedUser}</span>
                                        
                            </div>
                        
                            <div class="match-quantity match-column">
                            <button class="btn btn-danger" id="${findingMatches[i].likedUser}" type="button">REMOVE</button>
                            </div>`
                    
                        matchRow.innerHTML = matchRowContents; 
                        matchItems.append(matchRow) 
// Makes shure the removeMatch function is called when the button is pressed
                        matchRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeMatchHTML);
                    }
                } 
            }
            alert ("You have a new match")  
          
        }
    }


//removes the match element from HTML a
function removeMatchHTML(event) {
// Event.target makes shure the code knows what part to delete
    var buttonClicked = event.target; 
// Removes the HTML element
    buttonClicked.parentElement.parentElement.remove(); 

// Calls the function to remove the person from the JSON file. The .id reffers to the usersers username
sendUpdate(buttonClicked.id); 
}

// Sends the username of the current user and the user to delete to the API
function sendUpdate(username){ 
let currentUser = localStorage.getItem("currentUser");
let curentUserUsername = currentUser.username
let clickUser = username  
// Sends it as an array to be easyer identifyable later
let userArray = [curentUserUsername, clickUser]
axios.delete("http://localhost:2500/deleteMatch", {
        data: userArray
})
.then(response=>{
        console.log(response.data)
})           
}


