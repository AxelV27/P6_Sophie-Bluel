function modeEdition(){
    const etat = localStorage.getItem("etat")
    if(etat === true){
        modeEditionActive("flex");
    } else{
        modeEditionActive("none")
    }
}

function modeEditionActive(etat){
    const elementmodeEdition = document.querySelectorAll(".mode-edition")

    for(let i = 0; i < elementmodeEdition.length; i++){
        elementmodeEdition[i].style.display = etat;
    }
}