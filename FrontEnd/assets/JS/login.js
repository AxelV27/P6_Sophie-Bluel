let loginform = document.getElementById("loginform");


 function redirectionAccueil(){
    document.location.href = "./index.htlm"
}

loginform.addEventListener("submit", async function(event){
    event.preventDefault();

    const emailValue = document.getElementById("email").value;
    const passwordValue = document.getElementById("password").value;
    const logs = {emailValue,passwordValue};
    
    // Envoi des logs
    const response = await fetch(" http://localhost:5678/api/users/login",{
        method:"POST",
        headers: {"Content-type" : "application/json",},
        body: JSON.stringify(logs),
    })

    // Retour des réponses
    const retourReponse = await response.json()
    const token = retourReponse.token
    const etat = response.ok

    // Redirection vers page d'acceuil si les logs sont bon
    if(etat === true){
        localStorage.setItem("token",token)
        localStorage.setItem("etat",etat)
        redirectionAccueil()
    } else{
        localStorage.setItem("etat", etat)
        const erreur = document.querySelector(".error__log")
        erreur.innerText = "email ou mot de passe incorrect !"
    }
})