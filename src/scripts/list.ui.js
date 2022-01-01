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
                studentsDatabase.delete(student.id);
                element.remove()
            })
            editBtn.addEventListener('click', e=> {
                e.stopPropagation();

            })
            listStudentContenair.appendChild(element);
        })
    })
}
module.exports = listUI