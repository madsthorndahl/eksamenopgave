// dette er et udkast, fra en server der fungerer
const express = require('express');
const app = express();
//const bodyParser = require('body-parser');
const cors = require('cors'); // Hvad bruges cors til? 
const bodyParser = require('body-parser');
const port = 2500;
var fs = require('fs');

app.use(cors());
app.use(bodyParser.json()); //finder kun json data

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
})




// Ved at sætte noget ind i input feltet på html siden, og trykke submit, gemmes dataen i en JSON fil. 
app.post('/', (req, res)=> {
    let reqData = req.body;

    console.log('Post request virker')
    console.log(reqData)
    var storage = JSON.parse(fs.readFileSync("storage.JSON"))
    storage.push(reqData);
    fs.writeFileSync("storage.JSON", JSON.stringify(storage, null, 2));

    //console.log(reqData);
    res.send(JSON.stringify({besked: 'Her oprettes en bruger, her er hans oplysninger:', storage}));
})

app.post('/', (req, res)=> {
    let validationData = req.body;
    var createdUser = JSON.parse(fs.readFileSync("storage.JSON"))

    console.log(validationData)
    
    for (let i = 0; i < createdUser.length; i++) {
        if (validationData === createdUser[i].username) {

            return res.json({err:"Failed"});
        }}
})


app.get('/signIn', (req, res)=> {
    let data = 'Get request signin virker'
    let dataAsString = JSON.stringify(data);
    res.send(dataAsString);
})

app.post('/signIn', (req, res)=> {
    let loginData = req.body;
    var createdUser = JSON.parse(fs.readFileSync("storage.JSON"))

    console.log(loginData)
    
    for (let i = 0; i < createdUser.length; i++) {
        if (loginData.username === createdUser[i].username && loginData.password === createdUser[i].password) {

            return res.json(createdUser[i]);

            //CurrentUser skal vise brugeroplysningerne på den bruger, som logger ind
            //localStorage.setItem('currentUser', JSON.stringify(createdUser[i]));
            //location.href = "userProfile.html";
            
            // hvis brugeroplysningerne er korrekte returneres at brugeren er inde
            // return true;
        }

    }
    res.json({err:"Failed"});
})


app.get('/matches', (req, res)=> {
    var allMatches = JSON.parse(fs.readFileSync("storage.JSON"))
    res.json(allMatches)
})

// like knap: tag data fra localstorage (founduser), og send dette til en likes.json fil. 
app.post('/interMatch', (req, res)=> {
    let interMatchData = req.body;
    let likesArray = JSON.parse(fs.readFileSync("likes.JSON"))
    likesArray.push(interMatchData) 
    console.log(likesArray, "hej")
    fs.writeFileSync("likes.JSON", JSON.stringify(likesArray, null, 2));
    res.send(JSON.stringify({besked: 'Vi sender vores egen bruger + liked bruger til JSON', likesArray}));
    /*
    var likeAlreadyMade = false; 
    for (i = 0; i < likesArray; i++){
        for (j = 0; j < interMatchData; j++){
            if (likesArray[i].username === interMatchData[j].username && likesArray[i].likedUser === interMatchData[j].likedUser){
                //res.send("Failed")
                likeAlreadyMade = true;
                console.log(likeAlreadyMade)
                break
            } 
            if (likeAlreadyMade===false) {
                likesArray.push(interMatchData)
                fs.writeFileSync("likes.JSON", JSON.stringify(likesArray, null, 2));
                console.log(interMatchData)
            }
        }
    }
    //fs.writeFileSync("likes.JSON", JSON.stringify(likesArray, null, 2));
    res.send(JSON.stringify({besked: 'Vi sender vores egen bruger + liked bruger til JSON', likesArray}));
*/

    //console.log(createdUser)
    /*
    for (let i = 0; i < createdUser.length; i++) {
        if (loginData.username === createdUser[i].username && loginData.password === createdUser[i].password) {

            return res.json(createdUser[i]);

            //CurrentUser skal vise brugeroplysningerne på den bruger, som logger ind
            //localStorage.setItem('currentUser', JSON.stringify(createdUser[i]));
            //location.href = "userProfile.html";
            
            // hvis brugeroplysningerne er korrekte returneres at brugeren er inde
            // return true;
        }

    }
    res.json({err:"Failed"});
*/
})

app.post('/interMatchDis', (req, res)=> {
    let interMatchDataDis = req.body;
    let disLikesArray = JSON.parse(fs.readFileSync("disLike.JSON"))
    disLikesArray.push(interMatchDataDis)
    fs.writeFileSync("disLike.JSON", JSON.stringify(disLikesArray, null, 2));
    res.send(JSON.stringify({besked: 'Vi sender vores egen bruger + disliked bruger til JSON', disLikesArray}));
})

app.get('/findMatch', (req, res)=> {
    var allLikes = JSON.parse(fs.readFileSync("likes.JSON"))
    res.json(allLikes)
})


app.delete('/deleteMatch/:username', (req, res)=> {
    var allLikes = JSON.parse(fs.readFileSync("likes.JSON"))
    var username = req.params.username;

    //filter deletes all who return false, and this should return false:
    allLikes = allLikes.filter((allLikes) => allLikes.username !== username)
    res.json(allLikes)

})

app.delete('/deleteProfile', (req, res) => {
    
    var allUsers = JSON.parse(fs.readFileSync("storage.JSON"))
    res.json(allUsers)

})

app.post('/deleteProfile', (req, res)=> {
    let reqData = req.body;
    console.log('Post request virker')
    console.log(reqData) 
    var storage = JSON.parse(fs.readFileSync("storage.JSON"))
    storage.push(reqData);
    fs.writeFileSync("storage.JSON", JSON.stringify(storage, null, 2));

    //console.log(reqData);
    res.send(JSON.stringify({besked: 'Her er brugeren blevet slettet fra', storage}));
})



  /*
    var userLike = allLikes.find(allLikes => allLikes.username === username);
        if (userLike) {
           res.json(userLike);
        }
        })
        */
/*
    for (let i = 0; i < allLikes.length; i++) {
        if (allLikes.username === username) {
            res.json(allLikes[i]);
        }
    }
     for(var i = 0; i > allLikes.length; i++){
        if(allLikes.username === username)
        res.json(allLikes[i])
    }

        */


// Delete request virker ikke. Vi skal muligvis bruge et put request, da vi skal tage dataen fra JSON, loope igennem det, og slette noget bestemt data, for at sende dette tilbage til JSON. 
// En anden mulighed kunne være at lave et delete request som sletter det hele, og efterfølgende et post request der displayer matches, nu uden den person som brugeren har fjernet. 
// prøv evt at arbejde med det her i en ny github branch (developer branch evt), for at vise at du har styr på github branches. 
// d
/*
app.delete('/deleteMatch', (req, res) => {
    var deleteMatch = JSON.parse(fs.readFileSync("likes.JSON"))
    res.json(deleteMatch)
})
*/


app.listen(port, console.log(port));

