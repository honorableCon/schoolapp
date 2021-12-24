function listUI(studentsDatabase) {
    let listStudentContenair = document.querySelector("#listStudentContenair");
    studentsDatabase.get().then( listStudents => {
        listStudents.forEach( student => {
            let element = createElementFromTemplate("studentCard", student)
            element.setAttribute("data-id", student.id);
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
            listStudentContenair.appendChild(element);
        })
    })
}
module.exports = listUI