// Récupération des traveaux 

const responseworks = await fetch("http://localhost:5678/api/works");
const works = await responseworks.json()


// Récupération des catégories 

const responsecategories = await fetch("http://localhost:5678/api/categories")
const categories = await responsecategories.json()

// Gallerie 

function gallerie(works){
    for(let i = 0; i < works.lenght; i++){
        const work = works[i];

        const sectiongallerie = document.querySelector(".gallery")

        // Création des balises figure
        const gallerieElement = document.createElement("figure")
        gallerieElement.dataset.id = work.id

        // Création des balise img
        const imageElement = document.createElement("img")
        imageElement.src = work.imageUrl
        imageElement.alt = work.title

        // Création des balises figcaption
        const figcaptionElement = document.createElement("figcaption")
        figcaptionElement.innerText = work.title

        // Rattachement 
        sectiongallerie.appendChild(gallerieElement)
        gallerieElement.appendChild(imageElement)
        gallerieElement.appendChild(figcaptionElement)
    }

   
}

gallerie(works)


// Catégories
for(let i = 0; i < categories.lenght; i++){
    const categorie = categories[i]

    const filtrecategories = document.querySelector(".filtre__categories")

    const bouttoncategories = document.createElement("button")
    bouttoncategories.innerText = categorie.name


    filtrecategories.appendChild(bouttoncategories)
}