// ouvrir et fermer la modale
const openModal = document.querySelectorAll(".open-modal")
const closeModal = document.querySelectorAll(".modal-close-button")
const modal = document.querySelector(".modal")
const token = localStorage.getItem("token")
console.log(token)

for(let i = 0; i < openModal.length; i++){
    openModal[i].addEventListener("click", function(){
        modal.style.display = "flex"
    })
}

for(let i = 0; i < closeModal.length; i++){
    closeModal[i].addEventListener("click",function(){
        modal.style.display = "none"
        modalRetour.click()
    })

    modal.addEventListener("click", function(event){
        if(event.target === modal){
        modal.style.display = "none"
        modalRetour.click()
        }
    })
}


// gallerie de la modale
 async function modaleGallerie(){
    const responseWorks = await fetch("http://localhost:5678/api/works");
    const works = await responseWorks.json();
    for(let i = 0; i < works.length; i++){
        const work = works[i]
        const modaleGrid = document.querySelector(".modal__gallery-grid")
        const elementModale = document.createElement("figure")
        elementModale.dataset.id = work.id
        const modaleimg = document.createElement("img")
        modaleimg.src = work.imageUrl
        modaleimg.alt = work.title
        const boutonsuprime = document.createElement("button")
        boutonsuprime.className = "button__surprime"
        const iconsuprime = document.createElement("i")
        iconsuprime.className = "fa-solid fa-trash"
        boutonsuprime.addEventListener("click", async function(){
            await fetch("http://localhost:5678/api/works/" + work.id,{
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`, // notice the Bearer before your token
                },
            })
            console.log(work.id, "au revoir")
            modaleGrid.innerHTML = ""
            modaleGallerie()
            gallerie()
        })

        modaleGrid.appendChild(elementModale)
        elementModale.appendChild(modaleimg)
        elementModale.appendChild(boutonsuprime)
        boutonsuprime.appendChild(iconsuprime)
    }

    
}
modaleGallerie()

//  Ouvrir la modale "Ajout photo"
 const switchform = document.querySelector(".modal__form__content")
const addphoto = document.querySelector(".add-photo")
const switchgallerie = document.querySelector(".modal__content")
addphoto.addEventListener("click", function(){
    switchgallerie.style.display = "none"
    switchform.style.display = "flex" 
})

// retour en arrière d'"Ajout photo" vers "Gallerie"
const modalRetour = document.querySelector(".return-modal")

modalRetour.addEventListener("click", function(){
    const changetomodalGallery = document.querySelector(".modal__content")
    changetomodalGallery.style.display = "flex"
    const changetomodalForm = document.querySelector(".modal__form__content")
    changetomodalForm.style.display = "none"
})

// Liste catégorie dans "Ajout photo"
async function categoriemodale(){
    const responseCategories = await fetch("http://localhost:5678/api/categories");
    const categories = await responseCategories.json();
    const modalecategorie = categories.slice(0)
    for( let i = 0; i < modalecategorie.length; i++){
    const modaleCategories = modalecategorie[i]
    const modaleCategoriesListe = document.querySelector("#categorie__projet")
    const modaleCategoriesListeOption = document.createElement("option")
    modaleCategoriesListeOption.value = modaleCategories.id
    modaleCategoriesListeOption.innerText = modaleCategories.name
    modaleCategoriesListe.appendChild(modaleCategoriesListeOption)
    }
}

categoriemodale()

// Preview de la nouvelle photo
const addprojetphotoinput = document.querySelector("#add-projet-photo-input")

addprojetphotoinput.addEventListener("change", function(){
    // Vérification taille du fichier
    if(addprojetphotoinput.files[0].size <= 4 * 1024 * 1024){
        const projetphotoadd = document.querySelector(".add-projet-photo")
        projetphotoadd.innerHTML = ""

        const photopreview = document.createElement("img")
        photopreview.src = URL.createObjectURL(addprojetphotoinput.files[0])
        photopreview.className = "projet-photo-add-preview"

        projetphotoadd.appendChild(photopreview)

        photopreview.addEventListener("click",function(){
            addprojetphotoinput.click()
        })
    } else{
        addprojetphotoinput.value = ""
        return alert("Taille du fichier supérieur à 4mo")
    }
})

// Envoie du nouveau projet sur l'API
async function addwork(){
    const formdata = new FormData()

    formdata.append("image", addprojetphotoinput.files[0])
    formdata.append("title", titreprojetadd.value)
    formdata.append("category", categorieprojetadd.value)
console.log(formdata)
    const reponseadd = await fetch("http://localhost:5678/api/works/", {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`,
        },

        body: formdata

    })
 console.log(reponseadd)
    if(reponseadd.ok){
        //works.push(await reponseadd.json())
console.log("bonjour")
        modalRetour.click()
        const modaleGrid = document.querySelector(".modal__gallery-grid");
    modaleGrid.innerHTML = "";
     
        //const gallerieModaleSection = document.querySelector("modal__gallery-grid")
        //const gallerieSection = document.querySelector(".gallery")
        //gallerieModaleSection.innerHTML = ""
        //gallerieSection.innerHTML = "" 
        
        // Régénération des galleries
        modaleGallerie()
        gallerie()
        modal.style.display = "none"
    }
}

// Validation du formulaire d'"Ajout photo"
const titreprojetadd = document.querySelector("#titre__projet")
const categorieprojetadd = document.querySelector("#categorie__projet")
const bouttonValider = document.querySelector(".valider__form")

bouttonValider.addEventListener("click", function(event){
    event.preventDefault()
    // Vérification de la validité du modal
    if(addprojetphotoinput.checkValidity() && titreprojetadd.checkValidity() && categorieprojetadd.checkValidity() == true) {
        addwork()
    } else {
        return alert("Veuillez remplir tous les champs")
    }
})