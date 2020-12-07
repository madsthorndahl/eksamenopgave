// Deffines the rquriements for the server to run
const express = require('express');
const app = express();
const cors = require('cors'); 
const bodyParser = require('body-parser');
const port = 2500;
var fs = require('fs');

app.use(cors());
app.use(bodyParser.json()); 

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
})




// Save the user input as a new user in storage.JSON 
app.post('/', (req, res)=> {
    let reqData = req.body;

    console.log('Post request virker')
    console.log(reqData)
    var storage = JSON.parse(fs.readFileSync("storage.JSON"))
    storage.push(reqData);
    fs.writeFileSync("storage.JSON", JSON.stringify(storage, null, 2));

    res.send(JSON.stringify({besked: 'User data:', storage}));
})

// Update user end point
var dataPath = __dirname
app.put('/editProfile/:username', (req, res) => {
    data = fs.readFileSync("storage.JSON", "utf8") 
        let parsedData = JSON.parse(data)
        const username = req.params["username"];
        let needupdate = parsedData.findIndex(element => {
            return element.username == username})
            
        const updatedUser = {...parsedData[needupdate], ...req.body}         
       
// Insert the username as the former and for the updated user
        parsedData[needupdate] = updatedUser 
        fs.writeFileSync("storage.JSON", JSON.stringify(parsedData, null, 2))
        res.status(200).json({msg: "succes"})
})

// Gets data to the validation and validates the username so that it's unique
app.post('/ifExisting', (req, res)=> {
    let validationData = req.body;
    var createdUser = JSON.parse(fs.readFileSync("storage.JSON"))
    //check for om username er brugt i forvejen
    for (let i = 0; i < createdUser.length; i++) {
        console.log(req.body)
        if (validationData.username === createdUser[i].username) {
            return res.status(500).json({message:"Failed"});
        }}
        res.json({message:"User created"})
})

// Get data for the sign in ang varify the username and password
app.post('/signIn', (req, res)=> {
    let loginData = req.body;
    var createdUser = JSON.parse(fs.readFileSync("storage.JSON"))

    console.log(loginData)
    
    for (let i = 0; i < createdUser.length; i++) {
        if (loginData.username === createdUser[i].username && loginData.password === createdUser[i].password) {

            return res.json(createdUser[i]);
        }

    }
    res.json({err:"Failed"});
})

// Sends data to the matching
app.get('/matches', (req, res)=> {
    var allMatches = JSON.parse(fs.readFileSync("storage.JSON"))
    res.json(allMatches)
})
// Recives the data from like and creates a new like in likes.JSON
app.post('/interMatch', (req, res)=> {
    let interMatchData = req.body;
    let likesArray = JSON.parse(fs.readFileSync("likes.JSON"))
    likesArray.push(interMatchData) 
    fs.writeFileSync("likes.JSON", JSON.stringify(likesArray, null, 2));
    res.send(JSON.stringify({besked: 'Sending the new like', likesArray}));
})

// Recives the data from dislike and creates a new like in disLike.JSON
app.post('/interMatchDis', (req, res)=> {
    let interMatchDataDis = req.body;
    let disLikesArray = JSON.parse(fs.readFileSync("disLike.JSON"))
    disLikesArray.push(interMatchDataDis)
    fs.writeFileSync("disLike.JSON", JSON.stringify(disLikesArray, null, 2));
    res.send(JSON.stringify({besked: 'Sending the new dislike', disLikesArray}));
})

// Sends data to the matching 
app.get('/findMatch', (req, res)=> {
    var allLikes = JSON.parse(fs.readFileSync("likes.JSON"))
    res.json(allLikes)
})

// Recieves data about witch like to delete and deletes the like 
app.delete('/deleteMatch', (req, res)=> {
    var allLikes = JSON.parse(fs.readFileSync("likes.JSON"))
    var CurrentUser = req.body[0];
    var clickUser = req.body[1];
    
    let newLikes = allLikes.filter(user=> user.likedUser !== clickUser && user.username !== CurrentUser);
    fs.writeFileSync("likes.JSON", JSON.stringify(newLikes, null, 2));
    res.send(JSON.stringify({besked: 'Sending new likes', newLikes}));
    })

// Recieves data about witch user to delete and deletes the user 
app.delete('/deleteUser', (req, res)=> {
    
    let userArray = JSON.parse(fs.readFileSync("storage.JSON"))
    let newUsers = userArray.filter(user=> user.username !== req.body.username);
    fs.writeFileSync("storage.JSON", JSON.stringify(newUsers, null, 2));
    res.send(JSON.stringify({besked: 'Sending new users', newUsers}));

})
// Deffins what port the server is runnig on and sends a message in the console that its running
app.listen(port, console.log("Server running on port: " + port));

