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

var dataPath = __dirname
app.put('/editProfile/:username', (req, res) => {
    data = fs.readFileSync("storage.JSON", "utf8") 
        let parsedData = JSON.parse(data)
        const username = req.params["username"];
        let needupdate = parsedData.findIndex(element => {
            return element.username == username})
    
        // this will use the current user, and only update those fields 
        // which are sent in the request body. If only one field is sent, 
        // only that field will be updated.
  
        const updatedUser = {...parsedData[needupdate], ...req.body}         
       
        // sætter så parsedData til den opdaterede user
        parsedData[needupdate] = updatedUser 
    

        fs.writeFileSync("storage.JSON", JSON.stringify(parsedData, null, 2))
        res.status(200).json({msg: "succes"})
})

app.post('/ifExisting', (req, res)=> {
    let validationData = req.body;
    var createdUser = JSON.parse(fs.readFileSync("storage.JSON"))

    
    //check for om username er brugt i forvejen
    for (let i = 0; i < createdUser.length; i++) {
        console.log(req.body)
        if (validationData.username === createdUser[i].username) {
            return res.status(500).json({message:"Failed"});
        }}

        res.json({message:"bruger oprettes"})
        //her kommer alt bruger-oprettelses-logik
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
            // hvis brugeroplysningerne er korrekte returneres at brugeren er inde
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


app.delete('/deleteMatch', (req, res)=> {
    var allLikes = JSON.parse(fs.readFileSync("likes.JSON"))
    var CurrentUser = req.body[0];
    var clickUser = req.body[1];
    
    let newLikes = allLikes.filter(user=> user.likedUser !== clickUser && user.username !== CurrentUser);
    fs.writeFileSync("likes.JSON", JSON.stringify(newLikes, null, 2));
    res.send(JSON.stringify({besked: 'Vi sender det nye likes array tilbage', newLikes}));
    })

app.delete('/deleteUser', (req, res)=> {
    
    let userArray = JSON.parse(fs.readFileSync("storage.JSON"))
    let newUsers = userArray.filter(user=> user.username !== req.body.username);
    fs.writeFileSync("storage.JSON", JSON.stringify(newUsers, null, 2));
    res.send(JSON.stringify({besked: 'Vi sender det nye userarray tilbage', newUsers}));

})


app.listen(port, console.log("Server running on port: " + port));

