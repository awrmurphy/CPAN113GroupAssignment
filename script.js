
let users= [];
var loggedInUser;
document.body.onload= checkUser();


const aTags = document.querySelectorAll("a");
aTags.forEach(function(el){//modifies functionality of a tags
    el.addEventListener('click',passCred());
});

function passCred(){//passes localStorage values between pages
    localStorage.setItem('loggedUser',loggedInUser);
    localStorage.setItem('users',JSON.stringify(users));
}

function checkUser(){//checks to see if a user is logged in and calls welcome user if true
    loggedInUser=localStorage.getItem("loggedUser");
    
    if(users[0]==undefined){
        users = JSON.parse(localStorage.getItem("users"));
        
    }
    if (users.some((id) => id.userID === loggedInUser)){
        welcomeUser();
    }
}

function validateRegForm(){//custom form validation for registration page
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
    if(users!=null){
        if(users.some((el)=> el.userID === y)){
            alert("This username is taken.");
            return false;
        }
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
        localStorage.setItem("loggedUser",users[users.length-1].userID);
        location.href="RegPage.html";
     return true;
    }
}

function welcomeUser(){//dynamically alters pages and functionality if user is logged in

     
if(loggedInUser!=null){
    if(document.getElementById("registration-form")!=undefined){
    document.getElementById("registration-form").style.visibility="hidden";
    }
    if(document.getElementById('loginForm')!=undefined){
        document.getElementById('loginForm').style.visibility='hidden';
    }
    if(document.getElementById('reg')!=undefined){
        document.getElementById('reg').setAttribute('href','User.html');
        document.getElementById('reg').innerHTML = "Your Profile";
    }
    var welcomeMessage = document.createElement('h2');
    welcomeMessage.innerHTML = "Welcome "+loggedInUser+"!";
    document.body.prepend(welcomeMessage);
    var logout = document.createElement('button');
    logout.setAttribute('id','logoutButton');
    logout.style.position = 'absolute';
    logout.style.top = '0px';
    logout.style.right = '0px';
    logout.innerHTML = 'Log Out';
    document.body.prepend(logout);
}
}

if(document.getElementById('logoutButton')!=null){//adds logout button functionality if logout button exists
    document.getElementById('logoutButton').addEventListener('click',function(){
    loggedInUser = null;
    localStorage.setItem('loggedUser',null);
    location.reload();
    });
}

if(document.getElementById('loginButton')){//Login Button functionality
document.getElementById('loginButton').addEventListener('click',function()
{
    event.preventDefault();
    
    var loginEmail = document.forms['loginForm']['email'].value;
    var loginUser = document.forms['loginForm']['username'].value;
    var loginPass = document.forms['loginForm']['password'].value;
    if (loginUser && loginPass !=null){
        
        if(users.some((el)=> el.userID === loginUser)){
            var index = users.findIndex(el => el.userID === loginUser);
            if(users[index].pass === loginPass){
                loggedInUser = users[index].userID;
                localStorage.setItem('loggedUser',loggedInUser);
                localStorage.setItem('users',JSON.stringify(users));
                checkUser();
            }
        }  
    } else if(loginEmail && loginPass !=null){
            if(users.some((el)=> el.email === loginEmail)){
                var index = users.findIndex(el => el.email === loginEmail);
                if(users[index].pass === loginPass){
                    loggedInUser = users[index].userID;
                    localStorage.setItem('loggedUser',loggedInUser);
                    localStorage.setItem('users',JSON.stringify(users));
                    checkUser();
                }
            }
        }else if(loginUser == null && loginEmail == null){
            alert("You must enter either a valid Email OR a valid Username to continue.");
        }else if(loginPass == null){
            alert("You must enter a password to continue.");
        }
        else{
            alert("An error has occurred.");
        }
});
}

class mealPlan {
    constructor(meal,date,cals,prot,fat,img) {
        this.meal = meal;
        this.date = date;
        this.cals = cals;
        this.prot = prot;
        this.fat = fat;
        this.img = img;
    }
}

if(document.getElementById('planMeal')!=null){//if planMeal buttons exist add functionality
    var addMeal = document.querySelectorAll("#planMeal");
    addMeal.forEach(function(el){
        el.addEventListener('click',function(){
            var Parent = this.parentNode;
            var newMeal = new mealPlan(Parent.querySelector('#mealName').innerHTML,Parent.querySelector('#date').valueAsDate,Parent.querySelector('#calories').innerHTML,Parent.querySelector('#protein').innerHTML,Parent.querySelector('#fat').innerHTML,Parent.querySelector('img').src);
            console.log(newMeal.img);
            
            var i = users.findIndex(el => el.userID === loggedInUser);
            if(users[i].mealPlan!=null){
            users[i].mealPlan.push(newMeal);
            localStorage.setItem('users',JSON.stringify(users));
            }else{
                users[i].mealPlan =[newMeal];
                localStorage.setItem('users',JSON.stringify(users));
            }
            
        })
    });
}

let date = new Date(); //Don't like Dates
let firstOfWeek = date.getUTCDate() - date.getUTCDay();
let startOfWeek = new Date(Date.UTC(date.getUTCFullYear(),date.getUTCMonth(),firstOfWeek));
let lastOfWeek = date.getUTCDate()+(6-date.getUTCDay());
let endOfWeek = new Date(Date.UTC(date.getUTCFullYear(),date.getUTCMonth(),lastOfWeek));

if(window.location.href.indexOf('User.html')!==-1){//if on user page load meal plan
if(document.getElementsByClassName('day')!=null){//assigning each planned meal to the meal planner
    var i = users.findIndex(el => el.userID === loggedInUser);
    
    users[i].mealPlan.forEach(function(el){
        
        let thisDay = new Date(el.date);
        let day = thisDay.getUTCDate();
        let month = thisDay.getUTCMonth();
        let year = thisDay.getUTCFullYear();
        
        var lineBreak = document.createElement('br');

        if(document.getElementById('menu')==null){//If no menu is already made for this day this week
    
            
        if(thisDay >= startOfWeek && thisDay <= endOfWeek){
 
            
           var cont = document.createElement('div');
           cont.setAttribute('id','menu');
           var meal = document.createElement('div');
           var mealName = document.createElement('p');
           mealName.innerHTML = `${el.meal}`;
           var mealCal = document.createElement('p');
           mealCal.innerHTML = `Calories: ${el.cals}kcals `;
           var mealProt = document.createElement('p');
           mealProt.innerHTML = `Protein: ${el.prot}g `;
           var mealFat = document.createElement('p');
           mealFat.innerHTML = `Fat: ${el.fat}g`;
           meal.appendChild(mealName);
           meal.appendChild(lineBreak);
           meal.appendChild(mealCal);
           meal.appendChild(mealProt);
           meal.appendChild(mealFat);
           cont.appendChild(meal);
           cont.appendChild(lineBreak);
           document.getElementById(`${thisDay.getUTCDay()}`).appendChild(cont);
           let cal = Number(document.getElementById('calTotal'+`${thisDay.getUTCDay()}`).value);
           cal = cal+Number(el.cals);          
           document.getElementById('calTotal'+`${thisDay.getUTCDay()}`).value =cal;
           let pro = Number(document.getElementById('protTotal'+`${thisDay.getUTCDay()}`).value);
           pro = pro+Number(el.prot);
           document.getElementById('protTotal'+`${thisDay.getUTCDay()}`).value =pro;
           let fats = Number(document.getElementById('fatTotal'+`${thisDay.getUTCDay()}`).value);
           fats = fats+Number(el.fat);
           document.getElementById('fatTotal'+`${thisDay.getUTCDay()}`).value =fats 
        }
    }else
        {
            if(thisDay >= startOfWeek && thisDay <= endOfWeek){//if a meal is already planned for this day this week, this is wholly redunant whole function needs to be optimized

           var cont = document.createElement('div');
           cont.setAttribute('id','menu');
           var meal = document.createElement('div');
           var mealName = document.createElement('p');
           mealName.innerHTML = `${el.meal}`;
           var mealCal = document.createElement('p');
           mealCal.innerHTML = `Calories: ${el.cals}kcals `;
           var mealProt = document.createElement('p');
           mealProt.innerHTML = `Protein: ${el.prot}g `;
           var mealFat = document.createElement('p');
           mealFat.innerHTML = `Fat: ${el.fat}g`;
           meal.appendChild(mealName);
           meal.appendChild(lineBreak);
           meal.appendChild(mealCal);
           meal.appendChild(mealProt);
           meal.appendChild(mealFat);
           cont.appendChild(meal);
           cont.appendChild(lineBreak);
           document.getElementById(`${thisDay.getUTCDay()}`).appendChild(cont);
           let cal = Number(document.getElementById('calTotal'+`${thisDay.getUTCDay()}`).value);
           cal = cal+Number(el.cals);          
           document.getElementById('calTotal'+`${thisDay.getUTCDay()}`).value =cal;
           let pro = Number(document.getElementById('protTotal'+`${thisDay.getUTCDay()}`).value);
           pro = pro+Number(el.prot);
           document.getElementById('protTotal'+`${thisDay.getUTCDay()}`).value =pro;
           let fats = Number(document.getElementById('fatTotal'+`${thisDay.getUTCDay()}`).value);
           fats = fats+Number(el.fat);
           document.getElementById('fatTotal'+`${thisDay.getUTCDay()}`).value =fats
        }
    }
    })
}
}

if(window.location.href.indexOf('History.html')!==-1){//if on history page load history
    
var mealCards = document.querySelectorAll('.mealCard');
var index = users.findIndex(el => el.userID === loggedInUser);
mealCards.forEach(function(el,i){  
    console.log(users[index].mealPlan[users[index].mealPlan.length-i-1]);
    
    if(users[index].mealPlan[users[index].mealPlan.length-i-1]==undefined ){
        var mName = document.getElementById(`oldDate${i}MealName`);
        var mDate = document.getElementById(`oldDate${i}`);
        var mImgCont = document.getElementById(`oldDate${i}MealImage`);
        mName.innerHTML='No Meal Planned';
        mDate.innerHTML='N/A';
        mImgCont.innerHTML="You haven't planned anymore meals this week";
    }
    else
        {
            var mName = document.getElementById(`oldDate${i}MealName`);
            var mDate = document.getElementById(`oldDate${i}`);
            var mImgCont = document.getElementById(`oldDate${i}MealImage`);
            var mImg = document.createElement('img');
            mImg.setAttribute('id','mealImage');
            
            mName.innerHTML=`${users[index].mealPlan[users[index].mealPlan.length-i-1].meal}`;
            mDate.innerHTML=`${users[index].mealPlan[users[index].mealPlan.length-i-1].date}`;
            mImg.setAttribute('src',`${users[index].mealPlan[users[index].mealPlan.length-i-1].img}`);
            mImgCont.appendChild(mImg);
        }
    }
);
if(users[index].mealPlan!=undefined){
    var message=document.getElementById('showIfEmpty');
    message.style.visibility='hidden';
}
}
    
