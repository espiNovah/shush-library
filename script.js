const addNew = document.querySelector('.new--entry');
const formSection = document.querySelector('#entry--form');
let formShowing = false;
let formSec;

function createForm() {
    const Form = document.createElement('form');
    Form.id = 'add--entry';
    formSec = Form;

    const titleInput = document.createElement('input');
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('placeholder', 'Book Title');
    titleInput.required = true;

    const divSection = document.createElement('div');
    divSection.classList.add('sh--entry');


    const authorInput = document.createElement('input');
    authorInput.setAttribute('type', 'text');
    authorInput.setAttribute('placeholder', 'Author');
    authorInput.required = true;


    const selectList = document.createElement('select');
    const selectItem = ["Read","Not Yet Read"];
    for (var i = 0; i < selectItem.length; i++) {
        let option = document.createElement("option");
        option.value = selectItem[i];
        option.text = selectItem[i];
        selectList.appendChild(option);
    }

    divSection.appendChild(authorInput);
    divSection.appendChild(selectList);
    
    const divSplit = document.createElement('div');
    divSplit.classList.add('sh--entry');

    const numberLabel = document.createElement('label');
    numberLabel.setAttribute('for', 'page-count');
    numberLabel.textContent = 'Number of pages';

    const numberInput = document.createElement('input');
    numberInput.setAttribute('type', 'number');
    numberInput.id = 'page-count'
    numberInput.setAttribute('min', '1');
    numberInput.required = true;

    const addBtn = document.createElement('button');
    addBtn.setAttribute('type', 'submit');
    addBtn.textContent = 'ADD BOOK';

    divSplit.appendChild(numberLabel);
    divSplit.appendChild(numberInput);
    divSplit.appendChild(addBtn);
    
    Form.appendChild(titleInput);
    Form.appendChild(divSection);
    Form.appendChild(divSplit);

    showForm();
}

function showForm(){
    const formS = document.querySelector('#add--entry');
    const entrySign = document.querySelector('.new--entry');
    if (formShowing) {
        formShowing = false;
        formS.remove();
        entrySign.textContent = '+'
    } else {
        formSection.appendChild(formSec) 
        formShowing = true;
        entrySign.textContent = '-';
    }
}




addNew.addEventListener('click', createForm)