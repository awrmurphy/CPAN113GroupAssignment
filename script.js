
let users= [];
var loggedInUser;
document.body.onload= checkUser();

function checkUser(){
    if(users[0]==undefined){
        users = JSON.parse(localStorage.getItem("users"));
        
    }
    if (users.some((id) => id.userID === loggedInUser)){
        
    }
}

function validateRegForm(){
    event.preventDefault();
    let x =document.forms["registration-form"]["email"].value;
    if(x==""){
        alert("Please enter a valid email to create your profile.");
        return false;
    }
    if(!x.toLowerCase().match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
        alert("Please enter a valid email to create your profile.");
        return false;
    }
    let y = document.forms["registration-form"]["username"].value;
    if(users.some((el)=> el.userID === y)){
        alert("This username is taken.");
        return false;
    }
    let z = document.forms["registration-form"]["password"].value;
    let z2 = document.forms["registration-form"]["confirm-password"].value;
    if(z.length<10){
        alert("Your password is too short, try adding some special characters.");
        return false;
    }
    if(z != z2){
        alert("Passwords do not match.");
        return false;
    }
    let t = document.forms["registration-form"]["name"].value;
    if(t.length<2){
        alert("Your name must be more than 2 characters.");
        return false;
    }
    let u = document.forms["registration-form"]["age"].value;
    if(u<16){
        alert("You must be at least 16 years of age to use this app.");
        return false;
    }
    else{
        if(users!=null){
        users.push(new Object({
            userID : document.getElementById("username").value,
            pass : document.getElementById("password").value,
            email : document.getElementById("email").value,
            fName : document.getElementById("name").value,
            age : document.getElementById("age").value,
            gender : document.getElementById("gender").value 
        }));}if(users == null){
            users=[ {
            userID : document.getElementById("username").value,
            pass : document.getElementById("password").value,
            email : document.getElementById("email").value,
            fName : document.getElementById("name").value,
            age : document.getElementById("age").value,
            gender : document.getElementById("gender").value 
        }]
        }
        
        localStorage.setItem("users",JSON.stringify(users));
        loggedInUser = users[users.length-1].userID;
        location.href="index.html";
     return true;
    }
}
// document.getElementById("registration-form").onload = function welcomeUser(){
//     console.log("working");
    
// if(users!=null){
//     document.getElementById("registration-form").style.visibility="hidden";
//     document.getElementById("userMessage").style.visibility="visible";
//     document.getElementById("userMessage").innerHTML("Welcome "+localStorage.getItem(users+"Fname")+"!")
// }
// }