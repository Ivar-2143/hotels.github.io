var loggedUser;
var userIndex;
var users = [];

let bdError = "2px solid #fc0000";
let bdDefault = "2px solid #212121";
function initialize(page){
    var yourTickets = 0;
    //Check storage if there are registered users
    if(localStorage.users != null && localStorage.users != undefined){
        users=JSON.parse(localStorage.users);
    }
    //Check storage if there is an instance of loggedUser
    if(localStorage.loggedUser != null && localStorage.loggedUser != undefined){
        loggedUser = localStorage.getItem('loggedUser');

        //Checks if there are any logged in user
        if(loggedUser == 1 ){
            let name = document.getElementById('nameHere');
            let img = document.getElementById('userIMG');
            userIndex = localStorage.userIndex;
            name.innerHTML = 'Welcome, '+users[userIndex].fullname;
            if(page == 1){
                img.src = './resources/images/icons/sign-out.png';
                img.style.width = '30px';
                img.style.height = '30px';
            }else{
                img.src = '../resources/images/icons/sign-out.png';
                img.style.width = '30px';
                img.style.height = '30px';
            }
        }
    }else{
        loggedUser = 0;
        localStorage.setItem('loggedUser',loggedUser);
    }
    if(localStorage.tickets != null && localStorage.tickets !=undefined){
        if(loggedUser==1){
            tickets = JSON.parse(localStorage.tickets);
            if(page == 2){
                for(let i = 0; i<tickets.length; i++){
                    if(users[userIndex].username == tickets[i].username){
                        loadTickets(
                            tickets[i].hotel,
                            i,
                            tickets[i].checkIn,
                            tickets[i].checkOut,
                            tickets[i].guests,
                            tickets[i].toPay
                        );
                        console.log('Ticket Index : ' + i);
                        console.log('Ticket : ' + JSON.stringify(tickets[i]));
                        yourTickets =+ 1;
                    }
                }
            }
        }else{
            tickets = JSON.parse(localStorage.tickets);
        }
    }
    if(yourTickets >0){
        document.getElementById('emptyTickets').style.visibility = 'hidden';
    }
}

function addUser(name, uName, pass){
    let user = {
        fullname : name,
        username : uName,
        password : pass
    }

    users.push(user);  
    console.log("addUser: " + users.length);
    localStorage.setItem("users",JSON.stringify(users));
}

function logInUser(){
    if(checkUsers()){
        if(userPassword()){
            let target = document.getElementById('logIn');
            loggedUser = 1;
            localStorage.setItem('loggedUser',loggedUser);
            localStorage.setItem('userIndex',userIndex);
            hideModal();
            console.log("Welcome " + users[userIndex].fullname);
            location.href = target.action;
        }else{
            let pass = document.getElementById('logPassword');
            changeBorder(pass,'error');
            shake(pass.id);
            document.getElementById('logError').innerHTML = "Incorrect Password!";
        }
    }else{
        let user = document.getElementById('logUsername');
        user.style.border = bdError;
        shake(user.id);
        document.getElementById('logError').innerHTML = "User does not exists!";
    }
}
function checkUsers(){
    let user = document.getElementById('logUsername');
    for(let i = 0; i < users.length; i++){
        if(user.value == users[i].username){
            userIndex = i;
            return true;
        }
    }
    return false;
}
function userPassword(){
    let pass = document.getElementById('logPassword');
    if(users[userIndex].password == pass.value){
        return true;
    }else{
        return false;
    }
}

function registerUser(){  
    console.log('Register clicked!');
    if(checkName()&& checkUserName() &&checkPassword()){
        let name = document.getElementById("regName").value;
        let uName = document.getElementById('regUName').value;
        let pass = document.getElementById('regPass').value;
        let target = document.getElementById('register');
        addUser(name,uName,pass);
        hideModal();
        console.log("True?: ");
        location.href = target.action;
        return true;
    }else{
        console.log("False?: ");
        return false;
    }
}

function errorMessage(tab,message){
    if(tab = 'reg'){
        document.getElementById('regError').innerHTML = message;
    }else if(tab =='log'){
        document.getElementById('logError').innerHTML = message;
    }else{
        document.getElementById('formMsg').innerHTML = message;
    }
}
function checkName(){
    let name = document.getElementById("regName");
    if(name.value != null && name.value != undefined && name.value != '' && name.value != ""){
        return true;
    }else{
        name.style.border = bdError;
        shake(name.id);
        errorMessage('reg',"Name Required!");
        return false;
    }
}

function checkUserName(){
    let uName = document.getElementById('regUName');
    console.log("check user: " + users.length);
    if(uName.value != null && uName.value != undefined && uName.value != ''){
        if(localStorage.users != null && localStorage.users != undefined){
            for(let i = 0; i < users.length; i++){
                console.log("User "+i+": "+users[i].username);
                if(uName.value == users[i].username){
                    errorMessage('reg',"Username already taken!");
                    uName.style.border = bdError;
                    shake(uName.id);
                    return false;
                }
            }
            return true;
        }else{
            return true;
        }
    }else{
        uName.style.border = bdError;
        shake(uName.id);
        errorMessage('reg',"Username required!");
        return false;
    }
}

function checkPassword(){
    let pass = document.getElementById('regPass');
    let cpass = document.getElementById('cPass');
    if(pass.value != '' && cpass.value != ''){
        if(pass.value.length>5){
            if(pass.value == cpass.value){
                return true;
            }else{
                cpass.style.border = bdError;
                errorMessage('reg',"Password do not match");
                shake(cpass.id);
                return false;
            }
        }else{
            pass.style.border = bdError;
            errorMessage('reg',"Atleast 6 Characters");
            shake(pass.id);
            return false;
        }
    }else{
        pass.style.border = bdError;
        cpass.style.border = bdError;
        errorMessage('reg',"Password Required!");
        shake(pass.id);
        shake(cpass.id);
        return false;
    }
}

//Clears the Text Fields
function logInDefault(){
    let uName = document.getElementById('logUsername');
    let pass = document.getElementById('logPassword');
}
function registerDefault(){
    let name = document.getElementById("regName");
    let uName = document.getElementById('regUName');
    let pass = document.getElementById('regPass');
    let cpass = document.getElementById('cPass');
    let msg = document.getElementById('regError');
    msg.value = '';
    name.value = '';
    uName.value = '';
    pass.value = '';
    cpass.value = '';
    name.style.border = bdDefault;
    uName.style.border = bdDefault;
    pass.style.border = bdDefault;
    cpass.style.border = bdDefault;
}

//Shake Animation
function shake(id){
    gsap.fromTo(`#${id}`,{x:0},{x:3, yoyo: true, repeat:3, duration: 0.1});

}


//Resets the border color on 'CHANGE'
document.getElementById('regName').addEventListener('change', ()=>{
    let name = document.getElementById('regName');
    name.style.border = bdDefault;
});
document.getElementById('regUName').addEventListener('change', ()=>{
    let uName = document.getElementById('regUName');
    uName.style.border = bdDefault;
});
document.getElementById('regPass').addEventListener('change', ()=>{
    let pass = document.getElementById('regPass');
    pass.style.border = bdDefault;
});
document.getElementById('cPass').addEventListener('change', ()=>{
    let pass = document.getElementById('cPass');
    pass.style.border = bdDefault;
});
document.getElementById('logUsername').addEventListener('change',()=>{
    let uName = document.getElementById('logUsername');
    uName.style.border = bdDefault;
});
document.getElementById('logPassword').addEventListener('change',()=>{
    let pass = document.getElementById('logPassword');
    pass.style.border = bdDefault;
});