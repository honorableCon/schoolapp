function getFields() {
    let firstname = document.querySelector("#input-firstName").value;
    let lastname = document.querySelector("#input-lastName").value;
    let bio = document.querySelector("#bioTextArea").value;
    let level = document.querySelector("#level-select").selectedOptions[0].text;
    let frontendLevel = document.querySelector('#frontendLevel').value;
    let backendLevel = document.querySelector('#backendLevel').value;
    let progress = {
        frontend: parseInt(frontendLevel),
        backend: parseInt(backendLevel)
    }

    return {firstname, lastname, bio, level, progress};
}

replaceMustachWithObjectValues = function(element, dataObject) {
    const pattern = /{{\s*(\S+)\s*}}/gm
    let template = element.innerHTML;
    let found = template.matchAll(pattern);

    Array.from(found, match => {
        let mustached = match[0];
        let key = match[1];
        let value = dataObject[key];
        
        template = template.replace(mustached, value);
    })
    element.innerHTML = template;
}
createElementFromTemplate = function(idTemplate, dataObject) {
    let template = document.getElementById(idTemplate);
    let element = template.content.firstElementChild.cloneNode(true);
    replaceMustachWithObjectValues(element, dataObject);
    return element;
} 

module.exports = {
    getFields,
    createElementFromTemplate
}