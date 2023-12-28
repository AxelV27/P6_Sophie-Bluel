let loginform = document.getElementById("loginform");


function redirectionAccueil(){
    document.location.href = "index.htlm"
}

loginform.addEventListener("submit", async function(event){
    event.preventDefault();

    const emailValue = document.getElementById("email").value;
    const passwordValue = document.getElementById("password").value;

    const response = await fetch(" http://localhost:5678/api/users/login",{
        method:"POST",
        headers: {"Content-type" : "application/json",},
        body: JSON.stringify(emailValue, passwordValue),
    })

    if (response.ok){
        const data = await response.json()

        localStorage.setItem("Token",data.token)
    
    }
})