var price;
var hName;

//Shows Login Modal
function loginModal(){
    showModal();
    gsap.to('.loginModal',{y:100,duration:1,ease:"circ"});
}

//This is to show ticket modal.
function rsrvModal(text){
    showModal();
    let title = document.getElementById('rsrvTitle'); 
    let rate = document.getElementById('hotelRate');
    title.innerHTML = text;
    if(text == 'Okada Manila'){
        hName = 'Okada';
        price = 5000;
        rate.innerHTML = 'Php ' + price;
    }else if(text == 'Sogo Hotel'){
        hName = 'Sogo';
        price = 250;
        rate.innerHTML = 'Php ' + price;
    }else{
        hName = 'Shangrila';
        price = 2500;
        rate.innerHTML = 'Php ' + price;
    }
    gsap.to('.rsrvModal',{y:100,duration:1,ease:"circ"});
}

//This is to show ticket modal.
function ticketModal(event){
    showModal();
    loadData(event.id);
    gsap.to('.ticket',{y:"10%",duration:1,ease:"circ"});
    console.log("Card ID: "+event.id + " - For Data.");
}

//Switch Tab Animation Function for Login && Registration
function switchTab(event){
    var reg = ".regContent";
    var log = ".logContent";
    var id = event.id;
    console.log(id);
    if(id == "regTab"){
        event.className ="active";
        gsap.to('.activeTab',{x:'100%',duration: 0.5,ease:"power4"});
        gsap.to(reg,{x:'-100%',duration: 0.5,ease:"power4"});
        gsap.to(log,{x:'-100%',duration: 0.5,ease:"power4"});
        document.getElementById('logTab').className="";
    }else if(id == "logTab"){
        event.className ="active";
        gsap.to('.activeTab',{x:0,duration: 0.5,ease:"power4"});
        gsap.to(reg,{x:0,duration: 0.5,ease:"power4"});
        gsap.to(log,{x:0,duration: 0.5,ease:"power4"});
        document.getElementById('regTab').className="";
    }else{
        console.log("event");
    }
}


//Closes Modal
document.addEventListener('click', event=>{
    var modal = document.getElementById('modal');
    if(event.target == modal){
        
       hideModal();
    
    }
});
function hideModal(){
    gsap.to('.ticket',{y:"-100%",duration:0.7,ease:"power4"});
    gsap.to('.loginModal',{y:"-100%",duration:0.8,ease:"expo"});
    gsap.to('.rsrvModal',{y:"-100%",duration:1,ease:"expo"});
    setTimeout(hideModalContainer,500);
    
}
function hideModalContainer(){
    document.getElementById('modal').style.visibility='hidden';
    document.body.style.overflow="auto";    
    unBlurBg();
}

//Background BLur Styling
function blurBg(){
    document.getElementById('content').style.filter="blur(2px)";
    document.getElementsByTagName('nav')[0].style.filter="blur(2px)";
}
function unBlurBg(){
    document.getElementById('content').style.filter="blur(0)";
    document.getElementsByTagName('nav')[0].style.filter="blur(0)";
}

function showModal(){
    document.getElementById('modal').style.visibility='visible';
    document.body.style.overflow="hidden";
    blurBg();
}
