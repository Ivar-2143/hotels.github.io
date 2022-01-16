function loadTickets(hotel,tIndex,dateIn,dateOut,persons,amount,){
    let container = document.getElementById('ticketList');
    let card = document.createElement('div');
    card.classList.add('card');
    //card.addEventListener('click',ticketModal(tIndex));
    if(hotel == 'Okada'){
        let ticket=
        `
        <div class="rsrvCard" id = ${tIndex} onclick="ticketModal(this)">
            <div class="hContainer">
                <img src="../resources/images/banners/okada_banner.jpg" alt="" class="banners">
                <img src="../resources/images/logos/okada_logo.png" alt="" class="logo" id="okadaLogo">
            </div>
            <div class="container">
                <span class="cardLabel">Date</span>
                <span class="cardContent">
                <span class="dates">
                    ${dateIn}
                </span> 
                <span class="to">to</span> 
                <span class="dates">
                    ${dateOut}
                </span> 
            </span>
            </div>
            <div class="container">
                <span class="cardLabel">
                Expected Guests
                </span>
                <span class="cardContent">
                    ${persons}
                </span>
            </div>
            <div class="container">
            <span class="cardLabel">
                To Pay
            </span>
            <span class="cardContent">
                Php ${amount}
            </span>
            </div>
        </div>
        `;
        card.innerHTML= ticket;
    }else if(hotel == 'Sogo'){
        let ticket = 
        `
        <div class="rsrvCard" id = ${tIndex} onclick="ticketModal(this)">
            <div class="hContainer">
            <img id="sogoLogo" src="../resources/images/logos/Sogo-Logo.jpg" alt="" class="logo">
            </div>
            <div class="container">
                <span class="cardLabel">Date</span>
                <span class="cardContent">
                <span class="dates">
                    ${dateIn}
                </span> 
                <span class="to">to</span> 
                <span class="dates">
                    ${dateOut}
                </span> 
            </span>
            </div>
            <div class="container">
                <span class="cardLabel">
                Expected Guests
                </span>
                <span class="cardContent">
                    ${persons}
                </span>
            </div>
            <div class="container">
            <span class="cardLabel">
                To Pay
            </span>
            <span class="cardContent">
                Php ${amount}
            </span>
            </div>
        </div>
        `;
        card.innerHTML= ticket;
    }else{
        let ticket =
        `
        <div class="rsrvCard" id = ${tIndex} onclick="ticketModal(this)">
            <div class="hContainer">
                <img src="../resources/images/banners/shangri-la_banner.jpg" alt="" class="banners">
                <img src="../resources/images/logos/shangri-la_logo.png" alt="" class="logo" id="shangrilaLogo">
            </div>
            <div class="container">
                <span class="cardLabel">Date</span>
                <span class="cardContent">
                   <span class="dates">
                        ${dateIn}
                   </span> 
                   <span class="to">to</span> 
                   <span class="dates">
                       ${dateOut}
                   </span> 
               </span>
            </div>
            <div class="container">
                <span class="cardLabel">
                   Expected Guests
                </span>
                <span class="cardContent">
                   ${persons}
                </span>
            </div>
            <div class="container">
               <span class="cardLabel">
                   To Pay
               </span>
               <span class="cardContent">
                   Php ${amount}
               </span>
            </div>
        </div>
        `;
        card.innerHTML = ticket;
    }
    container.append(card);
    
}

function loadData(i){
    //Document Ticket Containers
    let docuIMG = document.getElementById('ticketBanner');
    let docuID = document.getElementById('ticketID');
    let docuDateIn = document.getElementById('dateIn');
    let docuDateOut = document.getElementById('dateOut');
    let docuName = document.getElementById('ticketName');
    let docuGuests = document.getElementById('ticketGuests');
    let docuRoom = document.getElementById('ticketRoom');
    let docuPay = document.getElementById('ticketAmount');

    //Ticket Data
    let hotel = tickets[i].hotel;
    let id = tickets[i].ticketID;
    let dateIn = tickets[i].checkIn;
    let dateOut = tickets[i].checkOut;
    let name = tickets[i].firstname + ' ' +tickets[i].lastname;
    let guest = tickets[i].guests;
    let rNum = tickets[i].room;
    let tPay = tickets[i].toPay;

    if(hotel == 'Okada'){
        let link = '../resources/images/logos/okada_logo.png';
        docuIMG.src = link;
    }else if(hotel == 'Sogo'){
        let link = '../resources/images/logos/Sogo-Logo.jpg'
        docuIMG.src = link;
    }else{
        let link = '../resources/images/logos/shangri-la_logo.png';
        docuIMG.src = link;
    }
    docuID.innerHTML = id;
    docuDateIn.innerHTML = dateIn;
    docuDateOut.innerHTML = dateOut;
    docuName.innerHTML = name;
    docuGuests.innerHTML = guest;
    docuRoom.innerHTML = 'VP ' + rNum;
    docuPay.innerHTML = 'Php ' + tPay;
    
}