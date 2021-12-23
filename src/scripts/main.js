const {getFields, createElementFromTemplate} = require('./utils')
const Database = require('./database')

const url = "https://pomvfsgmnducyfclngvq.supabase.co";
const apikey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODk3OTA1MSwiZXhwIjoxOTU0NTU1MDUxfQ.kUkUY7hxviFyV4K3RGQMsDpSQ5OF4G3sNL2SXEzknqM";
const table = "Students"
let studentContainer = document.querySelector(".studentContainer");
let studentsDatabase = new Database(url, apikey, table);

console.log(location.pathname);
if(location.pathname == '/src/index.html'){
    let students = []
    let addForm = document.querySelector("#addForm");
    let saveButton = document.querySelector("#saveButton");
    
    
    addForm.addEventListener('submit', e => {
        e.preventDefault();

        let fields = getFields();
        students.push(fields)
        let element = createElementFromTemplate("studentCard", fields)
        studentContainer.appendChild(element)
        let cancelBtn = element.firstElementChild.lastElementChild
        cancelBtn.addEventListener('click', e => {
            e.preventDefault()
            let fields = e.target.parentElement.previousElementSibling
            // {
            //     let title = fields.firstElementChild
            //     let classTitle = title.classList.value;
            //     let inputTitle = document.createElement('input')
            //     inputTitle.setAttribute('class', classTitle+" form-control mb-4");
            //     inputTitle.setAttribute('placeholder', 'prenom');
            //     inputTitle.focus()
                
            //     fields.replaceChild(inputTitle, title)
            //     console.log(fields);

            // }
        })
    })
    saveButton.addEventListener('click', e => {
        studentsDatabase.add(students);
        studentContainer.innerHTML = ""
    })
}else{
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