function checkLog(element,page){
    if(loggedUser == 1){
        if(element.id == 'okadaCard'){
            rsrvModal("Okada Manila");
            reservationDefault();
        }else if(element.id == 'shangrilaCard'){
            rsrvModal("Shangri-La Hotel");
            reservationDefault();
        }else if(element.id == 'sogoCard'){
            rsrvModal("Sogo Hotel");
            reservationDefault();
        }else{
            if(confirm("Are you sure you want to Log Out?") == true){
                loggedUser = 0;
                localStorage.setItem('loggedUser',loggedUser);
                if(page == 1){
                    location.href = 'index.html';
                }else{
                    location.href = '../index.html';
                }
            }else{
                hideModal();
            }
        }
    }else{
        loginModal();
    }
    
}