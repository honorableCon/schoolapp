const {getFields, createElementFromTemplate, deleteElement} = require('./utils')

function addUi(studentsDatabase){
    let students = []
    let studentContainer = document.querySelector(".studentContainer");
    let addForm = document.querySelector("#addForm");
    let addButton = document.querySelector("#addButton"); 
    let saveButton = document.querySelector("#saveButton");
    let bio = document.querySelector("#bioTextArea");
    
    addForm.addEventListener('submit', e => {
        e.preventDefault();

        let fields = {id:Date.now(), ...getFields()};
        students.push(fields)

        let element = createElementFromTemplate("studentCard", fields)
        studentContainer.appendChild(element)
        element.setAttribute('data-objectId', fields['id'])

        let deleteBtn = element.firstElementChild.lastElementChild
        deleteBtn.addEventListener('click', e => {
            let carte = e.target.parentElement.parentElement.parentElement
            let idCarte = carte.getAttribute('data-objectId')
            deleteElement(students, idCarte);
            carte.remove();
        })

        let editBtn = deleteBtn.previousElementSibling
        editBtn.addEventListener('click', e => {
            let carte = e.target.parentElement.parentElement.parentElement
            let idCarte = carte.getAttribute('data-objectId')
            // deleteElement(students, idCarte);
            // carte.remove();
            let textsToModify = editBtn.previousElementSibling
            let bio = textsToModify.lastElementChild
            let level = bio.previousElementSibling
            let title = textsToModify.firstElementChild

            let inputTitle = document.createElement('input')
            inputTitle.setAttribute('class', title.classList.value + " form-control mb-4")
            inputTitle.value = title.innerHTML

            let inputBio = document.querySelector('#bioTextArea').cloneNode(true)
            inputBio.classList.add(bio.classList.value)
            inputBio.value = bio.innerHTML

            // let inputLevel = document.querySelector('.text-level').cloneNode(true)
            // inputLevel.classList.add(level.classList.value)
            // inputLevel.value = level.innerHTML

            textsToModify.replaceChild(inputTitle, title);
            textsToModify.replaceChild(inputBio, bio);
            // textsToModify.replaceChild(inputLevel, level);
            console.log(bio.innerHTML, level.innerHTML, title.innerHTML);

        })       
    })
    // VERIFICATION DES MOTS SAISIS
    bio.addEventListener("input", (event) => {
        const LONGUEURMAX = 130
        const longueurSaisi = bio.value.length
        const reste = LONGUEURMAX - longueurSaisi
    
        const paragraphCompteur = document.getElementById("limite-text")
        const compteurText = document.getElementById("text-progress")
        compteurText.textContent = longueurSaisi
    
        if (reste < 0) {
            addButton.disabled = true
        } else if (reste <= 16) {
            paragraphCompteur.style.color = "#ce0033"
            addButton.disabled = false
        } else {
            paragraphCompteur.style.color = "#00000"
            addButton.disabled = false
        }
    })

    saveButton.addEventListener('click', e => {
        students.forEach( student => {
            delete student['id']
            studentsDatabase.add(student);
        })
        
        studentContainer.innerHTML = ""
    })
}


function modifierChamp() {
    const modifier = document.getElementById("modifier")

    modifier.addEventListener('click', (e) => {
        e.preventDefault()
        let nomModifier = document.createElement('input')
        nomModifier.setAttribute("placeholder", "modifier prenom & nom*")
        let baliseh5 = document.querySelector(".card-title")
        let balisep = document.querySelector(".card-text")
        let bioModifier = document.createElement('textarea')


        let carteModifier = document.querySelector(".card-body")

        carteModifier.replaceChild(nomModifier, baliseh5)
        carteModifier.replaceChild(bioModifier, balisep)
        let carte = document.querySelector(".card")

        modifier.addEventListener('click', () => {
            let nouveauNom = nomModifier.value
            let nouveauBio = bioModifier.value
            apprenantAffiche(nouveauNom, "", nouveauBio)
            carte.remove()
        })
    })
}
module.exports = addUi