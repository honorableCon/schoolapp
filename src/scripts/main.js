const Database = require('./database')
const addUI = require('./add.ui');
const listUI = require('./list.ui');

const url = "https://pomvfsgmnducyfclngvq.supabase.co";
const apikey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODk3OTA1MSwiZXhwIjoxOTU0NTU1MDUxfQ.kUkUY7hxviFyV4K3RGQMsDpSQ5OF4G3sNL2SXEzknqM";
const table = "Students"
let studentsDatabase = new Database(url, apikey, table);

switch (location.pathname) {
    case '/src/index.html':
        addUI(studentsDatabase);
        break;
    case '/src/list.html':
        listUI(studentsDatabase);
        break;
    default:
        addUI(studentsDatabase);
        break;
}
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