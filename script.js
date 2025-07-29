const register = document.getElementById("register");
var user;


function validateRegForm(){

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
    if(localStorage.getItem(y) != null){
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
     user = document.getElementById("username").value;
     var pass = document.getElementById("password").value;
     localStorage.setItem(user,pass);
     localStorage.setItem(user+"User",user);
     localStorage.setItem(user+"Email",document.getElementById("email").value);
     localStorage.setItem(user+"Fname",document.getElementById("name").value);
     localStorage.setItem(user+"Age",document.getElementById("age").value);
     localStorage.setItem(user+"Gender",document.getElementById("gender").value);
     return true;
    }
}
// document.getElementById("registration-form").onload = function welcomeUser(){
//     console.log("working");
    
// if(user!=null){
//     document.getElementById("registration-form").style.visibility="hidden";
//     document.getElementById("userMessage").style.visibility="visible";
//     document.getElementById("userMessage").innerHTML("Welcome "+localStorage.getItem(user+"Fname")+"!")
// }
// }