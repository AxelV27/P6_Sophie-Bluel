function modal(){
    const openModal = document.querySelectorAll(".open-modal")
    const closeModal = document.querySelectorAll(".modal-close-button")
    const modale = document.querySelector(".modal")

    for(let i = 0; i< openModal.length;i++){
        openModal[i].addEventListener("click", function(){
            modal.style.display = "flex";
        })
    }

    for(let i = 0 ; i< closeModal.length;i++){
        closeModal[i].addEventListener("click",function(){
            modal.style.display = "none"
        })
    }
}

const modalReturn = document.querySelector("return-modal")

modalReturn.addEventListener("click", function(){
    const changetomodalGallery = document.querySelector(".modal__content")
    changetomodalGallery.style.display = "flex"
    const changetomodalForm = document.querySelector(".madal__form__content")
    changetomodalForm.style.display = "none"
})