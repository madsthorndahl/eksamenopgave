deleteUser = document.getElementById("deleteBtn")
    
    

deleteUser.addEventListener('click', function() {
        let currentUser = JSON.parse(localStorage.getItem("currentUser"))                
        axios.delete("http://localhost:2500/deleteUser", {
                data: currentUser
        })
        .then(response=>{
                console.log(response.data)
        })                
})