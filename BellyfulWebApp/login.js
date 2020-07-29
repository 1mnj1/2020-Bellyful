var objPeople = [
   
    {
        username: "Andrew",
        password: "Winters"
    },
    {
        username: "MattLawrence",
        password: "IsTheCoolestDude"
    }
]

function login() {
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value

    for (var i = 0; i < objPeople.length; i++) {
        if (username == objPeople[i].username && password == objPeople[i].password) {
            alert("login");
        }

        else {
            alert("Incorrect username or password")
        }
    }
}