var tickets = [];

function addTicket(hName,uName,id,fName,lName,dateIn,dateOut,persons,rNum,amount){
    let ticket = {
        hotel: hName,
        username: uName,
        ticketID: id,
        firstname: fName,
        lastname: lName,
        checkIn: dateIn,
        checkOut: dateOut,
        guests: persons,
        room: rNum,
        toPay: amount
    }
    tickets.push(ticket);
    console.log("Tickets: "+ tickets.length);
    localStorage.setItem('tickets',JSON.stringify(tickets));
}
function registerTicket(){
    if(checkTicketName()&&checkGuest()&&checkDates()){
        let uName = users[userIndex].username;
        let id = Math.floor((Math.random() * 100000)) +80000000;
        let fName = document.getElementById('firstName').value;
        let lName = document.getElementById('lastName').value;
        let adults = document.getElementById('adults').value;
        let children = document.getElementById('children').value;
        let checkIn = document.getElementById('checkInPicker').value;
        let checkOut = document.getElementById('checkOutPicker').value;
        let dateIn = new Date(checkIn);
        let dateOut = new Date(checkOut);
        let nights = (dateOut.getTime() - dateIn.getTime()) / (1000*3600*24);
        let amount = price * nights;
        let persons =  parseInt(adults) + parseInt(children);
        let roomNum = Math.floor((Math.random() * 1000));
        addTicket(
            hName,
            uName,
            id,
            fName,
            lName,
            dateIn.toDateString(),
            dateOut.toDateString(),
            persons,
            roomNum,
            amount
        );
        console.log('True?: ');
        hideModal();
        document.getElementsByClassName('notif')[0].classList.add('activeNotif');
        setTimeout(removeNotif,3500);
    }else{
        console.log('False?: ')
    }
}
function checkTicketName(){
    let fName = document.getElementById('firstName');
    let lName = document.getElementById('lastName');
    if(fName.value == '' || fName.value == undefined || fName.value == null){
        changeBorder(fName,'error');
        shake(fName.id);
        return false;
    }else if(lName.value == '' ||  lName.value == undefined || lName.value == null){
        changeBorder(lName,'error');
        shake(lName.id);
        return false;
    }else{
        return true;
    }
}
function checkGuest(){
    let adults = document.getElementById('adults');
    let children = document.getElementById('children');
    if(adults.value == '' || adults.value == null || adults.value == undefined || isNaN(adults.value)){
        changeBorder(adults,'error');
        shake(adults.id);
        return false;
    }else if(children.value == '' || isNaN(children.value)){
        changeBorder(children,'error');
        shake(children.id);
        return false;
    }else{
        return true;
    }
}
function checkDates(){
    let checkIn = document.getElementById('checkInPicker');
    let checkOut = document.getElementById('checkOutPicker');
    if(checkIn.value == '' || checkIn.value == null || checkIn.value == undefined ){
        changeBorder(checkIn,'error');
        shake(checkIn.id);
        return false;
    }else if(checkOut.value == '' || checkOut.value == null || checkOut.value == undefined){
        changeBorder(checkOut,'error');
        shake(checkOut.id);
        return false;
    }else{
        return true;
    }
}

function changeBorder(element,state){
    if(state == 'error'){
        element.style.border = bdError;
    }else{
        element.style.border = bdDefault;
    }
}

//onchange events
document.getElementById('firstName').addEventListener('change',()=>{
    let element = document.getElementById('firstName');
    element.style.border = bdDefault;
});
document.getElementById('lastName').addEventListener('change',()=>{
    let element = document.getElementById('lastName');
    element.style.border = bdDefault;
});
document.getElementById('adults').addEventListener('change',()=>{
    let element = document.getElementById('adults');
    element.style.border = bdDefault;
    if(element.value < 1){
        element.value = 1;
    }else if(element.value > 10){
        element.value = 10;
    }
});
document.getElementById('children').addEventListener('change',()=>{
    let element = document.getElementById('children');
    element.style.border = bdDefault;
    if(element.value < 0){
        element.value = 0;
    }else if(element.value > 10){
        element.value = 10;
    }
});
document.getElementById('checkInPicker').addEventListener('change',()=>{
    let dateToday = new Date();
    let element = document.getElementById('checkInPicker');
    let checkOut = document.getElementById('checkOutPicker');
    let pickedDate = new Date(element.value);
    let outDate = new Date(checkOut.value);
    let dateDiff = (pickedDate.getTime() - dateToday.getTime()) / (1000*3600*24);
    let outDiff = (pickedDate.getTime() - outDate.getTime()) / (1000*3600*24);
    console.log(outDiff);
    element.style.border = bdDefault;
    if(dateDiff < 0){
        
        let yyyy = dateToday.getFullYear();
        let mm = dateToday.getMonth();
        let dd = dateToday.getDate()+1;
        if(mm < 9){
            element.value = yyyy+'-0'+(mm+1)+'-'+dd;
            if(dd<10){
                element.value = yyyy+'-0'+(mm+1)+'-0'+dd;
            }
        }else if(dd<10){
            element.value = yyyy+'-'+(mm+1)+'-0'+dd;
        }else{
            element.value = yyyy+'-'+(mm+1)+'-'+dd;
        }
    }else if(outDiff>=0){
        let yyyy = pickedDate.getFullYear();
        let mm = pickedDate.getMonth();
        let dd = pickedDate.getDate()+1;

        if(mm < 9){
            checkOut.value = yyyy+'-0'+(mm+1)+'-'+dd;
            if(dd<9){
                checkOut.value = yyyy+'-0'+(mm+1)+'-0'+dd;
            }
        }else if(dd<9){
                checkOut.value = yyyy+'-'+(mm+1)+'-0'+dd;

        }else{
            checkOut.value = yyyy+'-'+(mm+1)+'-'+dd;
        }
    }
});
document.getElementById('checkOutPicker').addEventListener('change',()=>{
    let checkInDate = new Date(document.getElementById('checkInPicker').value);
    let element = document.getElementById('checkOutPicker');
    let pickedDate = new Date(element.value);
    let dateDiff = (pickedDate.getTime() - checkInDate.getTime()) / (1000*3600*24);
    element.style.border = bdDefault;
    if(dateDiff < 1){
        
        let yyyy = checkInDate.getFullYear();
        let mm = checkInDate.getMonth();
        let dd = checkInDate.getDate()+1;
        if(mm < 9){
            element.value = yyyy+'-0'+(mm+1)+'-'+dd;
            if(dd<10){
                element.value = yyyy+'-0'+(mm+1)+'-0'+dd;
            }
        }else if(dd<10){
            element.value = yyyy+'-'+(mm+1)+'-0'+dd;
        }else{
            element.value = yyyy+'-'+(mm+1)+'-'+dd;
        }
    }
});

//Clears TextFiels of Reservation Modal
function reservationDefault(){
    let fName = document.getElementById('firstName');
    let lName = document.getElementById('lastName');
    let adults = document.getElementById('adults');
    let children = document.getElementById('children');
    let checkIn = document.getElementById('checkInPicker');
    let checkOut = document.getElementById('checkOutPicker');

    changeBorder(fName,'default');
    changeBorder(lName,'default');
    changeBorder(adults,'default');
    changeBorder(children,'default');
    changeBorder(checkIn,'default');
    changeBorder(checkOut,'default');
    fName.value = '';
    lName.value = '';
    adults.value = '';
    children.value = '';
    checkIn.value = '';
    checkOut.value = '';

}

//removes className activeNotif
function removeNotif(){
    console.log('removed');
    document.getElementsByClassName('notif')[0].classList.remove('activeNotif');
}