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
    })

    saveButton.addEventListener('click', e => {
        studentsDatabase.add(students);
        console.log(students);
        studentContainer.innerHTML = ""
    })
}else{
    let listStudentContenair = document.querySelector("#listStudentContenair");
    studentsDatabase.get().then( listStudents => {
        listStudents.forEach( student => {
            let element = createElementFromTemplate("studentCard", student)
            listStudentContenair.appendChild(element);
        })
    })
    
}