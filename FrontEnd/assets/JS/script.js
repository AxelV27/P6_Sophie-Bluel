
// Génaration gallerie + catégorie
async function gallerie(filterWorks = null) {
    // Récupération des travaux
    const responseWorks = await fetch("http://localhost:5678/api/works");
    const works = await responseWorks.json();
  
    // Récupération des catégories
    const responseCategories = await fetch("http://localhost:5678/api/categories");
    const categories = await responseCategories.json();
  
    // Bouton Tous
    const Tous = { "id": 0, "name": "Tous" };
    categories.unshift(Tous);
  
    // Catégories
    const filtrecategories = document.querySelector(".filtre__categories");
    filtrecategories.innerHTML = ""; // Réinitialise la liste des boutons
  
    for (let i = 0; i < categories.length; i++) {
      const categorie = categories[i];
  
      const bouttoncategories = document.createElement("button");
      bouttoncategories.innerText = categorie.name;
  
      filtrecategories.appendChild(bouttoncategories);
  
      // Filtrage
      
      bouttoncategories.addEventListener("click", function() {
        if (categorie.id === 0) {
          document.querySelector(".gallery").innerHTML = "";
         gallerie();
        } else {
          const filtersWorks = works.filter(function(work) {
            return work.categoryId === categorie.id; 
          });
          document.querySelector(".gallery").innerHTML = "";
         gallerie(filtersWorks);
        }
      });
    }
  
    // Gallerie
    const sectiongallerie = document.querySelector(".gallery");
    sectiongallerie.innerHTML = ""; // Réinitialise la galerie
  
    const worksToDisplay = filterWorks || works; // Utilise les travaux filtrés s'ils existent
   //console.log(worksToDisplay, "Hello, World")
    for (let i = 0; i < worksToDisplay.length; i++) {
      const work = worksToDisplay[i];
  
      // Création des balises figure
      const gallerieElement = document.createElement("figure");
      gallerieElement.dataset.id = work.id;
  
      // Création des balise img
      const imageElement = document.createElement("img");
      imageElement.src = work.imageUrl;
      imageElement.alt = work.title;
  
      // Création des balises figcaption
      const figcaptionElement = document.createElement("figcaption");
      figcaptionElement.innerText = work.title;
  
      // Rattachement
      sectiongallerie.appendChild(gallerieElement);
      gallerieElement.appendChild(imageElement);
      gallerieElement.appendChild(figcaptionElement);

    } 
    // Login/logout
const login = localStorage.getItem("token")
// Vérifie l'état de login
const UtilisateurConnecte = login != null && login != undefined && login != ''

// Passage en mode édition
if(UtilisateurConnecte){
  const logout = document.querySelector(".login")
  const ModeEdition = document.querySelector(".mode-edition")
  logout.textContent = "logout"
  ModeEdition.style.display = "flex"
  const modifieButton = document.querySelector(".edition-mode")
  filtrecategories.style.display = "none"
  modifieButton.style.display = "flex"
  logout.addEventListener('click',Deconnexion)
}
  }
  
  gallerie();

// Fonction de déconnexion
function Deconnexion(){
  localStorage.clear()
  window.location.reload()
}
  


