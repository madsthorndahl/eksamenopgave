// Decides that this code is only to be run in the div created when clicking on a user to like
'div class="singleMatchContainer">'

//Gets the founduser from local storage
var match = JSON.parse(localStorage.getItem('founduser'));

//Gets the elements from the HTML file
var matchContainer = document.getElementById('match');

// Creates an element in HTML
var container = document.createElement('container');
container.className = "container";

// Dissplat the name of the potential match
container.innerHTML += '<div class="matchName">' + match.username + '</div>';
matchContainer.appendChild(container);

// Adds a like button and defines what code to run when it it pressen
var addALike = '<button type="button" onclick="addToLike()" class ="addALikeBtn">Like';
container.innerHTML += addALike;


 // Adds the found user and the curentusers usernames to likes.JSON, as two diffrent atributes 
function addToLike() {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json"

// Retrives the users from local storage
   let foundUser = JSON.parse(localStorage.getItem("founduser"))
   console.log(foundUser)
   let currentUser = JSON.parse(localStorage.getItem("currentUser"))
   console.log(currentUser)

// Creates a like by taking the username of the curentuser and the username of the founduser 
    var likes = {
        username : currentUser.username,
        likedUser : foundUser.username,
    }

    xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        const respo = this.response 
        console.log(respo); 
        if (respo.err == 'Failed'){
           alert("You already liked this person")
            
        }
   
    }
    });

 // Sends the POST request to the API
xhr.open("POST", "http://localhost:2500/interMatch", true);

xhr.setRequestHeader("Content-Type", "application/json");

xhr.send(JSON.stringify(likes));

}

// Follows the exact same logic as above just for the disslike button
var disLike = '<button type="button" class ="disLikeBtn" onclick="addDislikes()">Dislike';
container.innerHTML += disLike;


function addDislikes() {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json"
    console.log("hej")

    //HTTP-request
    let foundUser = JSON.parse(localStorage.getItem("founduser"))
    console.log(foundUser)
    let currentUser = JSON.parse(localStorage.getItem("currentUser"))
    console.log(currentUser)

    var disLikes = {
        username : currentUser.username,
        disLikedUser : foundUser.username
    }
  

    xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        const respo = this.response 
        console.log(respo); 
        if (respo.err == 'Failed'){
            alert("You already disliked this person")
            
        }
    
    }
    });

xhr.open("POST", "http://localhost:2500/interMatchDis", true);

xhr.setRequestHeader("Content-Type", "application/json");

xhr.send(JSON.stringify(disLikes));

}
// close the div tag for the HTML that is to be created
'</div>'
