const {getFields} = require('./utils')

function listUI(studentsDatabase) {
    let listStudentContenair = document.querySelector("#listStudentContenair");
    studentsDatabase.get().then( listStudents => {
        listStudents.forEach( student => {
            let element = createElementFromTemplate("studentCard", student)
            let deleteBtn = element.lastElementChild.firstElementChild
            let editBtn = element.lastElementChild.lastElementChild
            // element.setAttribute("data-id", student.id);
            element.dataset.dataId = student.id;
            element.addEventListener('click', e => {
                listStudentContenair.classList.add('d-none');
                let detail = createElementFromTemplate("studentCardDetail", student);
                let cancelBtn = detail.firstElementChild.lastElementChild.firstElementChild
                document.querySelector('.rowCard').appendChild(detail);
                document.querySelector(".frontend").style.width = `${student.progress["frontend"]}%`;
                document.querySelector(".backend").style.width = `${student.progress["backend"]}%`;
                cancelBtn.addEventListener('click', e => {
                    e.preventDefault()
                    detail.classList.add('d-none');
                    listStudentContenair.classList.remove('d-none');
                });
            })
            deleteBtn.addEventListener('click', e =>{
                e.stopPropagation();
                // studentsDatabase.delete(student.id);
                element.remove()
            })
            editBtn.addEventListener('click', e=> {
                e.stopPropagation();
                let addForm = document.querySelector('#addForm')
                let firstname = document.querySelector("#input-firstName");
                let lastname = document.querySelector("#input-lastName");
                let bio = document.querySelector("#bioTextArea");
                let level = document.querySelector("#level-select").selectedOptions[0];
                let frontendLevel = document.querySelector('#frontendLevel');
                let backendLevel = document.querySelector('#backendLevel');
                firstname.value = student.firstname
                lastname.value = student.lastname
                bio.value = student.bio
                level.text = student.level
                frontendLevel.value = student.progress.frontend
                backendLevel.value = student.progress.backend
                // let progress = {
                //     frontend: parseInt(frontendLevel),
                //     backend: parseInt(backendLevel)
                // }
                addForm.addEventListener('click', e => {
                    e.preventDefault()
                    studentsDatabase.modify(student.id, getFields())
                })
            })
            listStudentContenair.appendChild(element);
        })
    })
}
module.exports = listUI