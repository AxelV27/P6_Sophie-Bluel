// ouvrir et fermer la modale
const openModal = document.querySelectorAll(".open-modal")
const closeModal = document.querySelectorAll(".modal-close-button")
const modal = document.querySelector(".modal")

for(let i = 0; i < openModal.length; i++){
    openModal[i].addEventListener("click", function(){
        modal.style.display = "flex"
    })
}

for(let i = 0; i < closeModal.length; i++){
    closeModal[i].addEventListener("click",function(){
        modal.style.display = "none"
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
        boutonsuprime.addEventListener("click", function(){
            //deleteWork(work.id)
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

