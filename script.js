const addNew = document.querySelector('.new--entry');
const formSection = document.querySelector('#entry--form');
const bookRack = document.querySelector('.book--rack');
let formShowing = false;
let formSec;
let bookTitle, bookAuthor, bookStatus, bookPages;
let lastRack, prevRack, bLog, shelfNumber;
let myLibrary = [];

function createForm() {
    const Form = document.createElement('form');
    Form.id = 'add--entry';
    formSec = Form;

    const titleInput = document.createElement('input');
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('class', 'b--title');
    titleInput.setAttribute('placeholder', 'Book Title');
    // titleInput.required = true;

    const divSection = document.createElement('div');
    divSection.classList.add('sh--entry');


    const authorInput = document.createElement('input');
    authorInput.setAttribute('type', 'text');
    authorInput.setAttribute('class', 'b--author');
    authorInput.setAttribute('placeholder', 'Author');
    // authorInput.required = true;


    const selectChoice = document.createElement('select');
    const selectItem = ["Read", "Not Yet Read"];
    for (let i = 0; i < selectItem.length; i++) {
        let option = document.createElement("option");
        option.value = selectItem[i];
        option.text = selectItem[i];
        selectChoice.appendChild(option);
    }
    selectChoice.setAttribute('class', 'b--status');
    // selectChoice.required = true;

    divSection.appendChild(authorInput);
    divSection.appendChild(selectChoice);

    const divSplit = document.createElement('div');
    divSplit.classList.add('sh--entry');

    const numberLabel = document.createElement('label');
    numberLabel.setAttribute('for', 'page-count');
    numberLabel.textContent = 'Number of pages';

    const numberInput = document.createElement('input');
    numberInput.setAttribute('type', 'number');
    numberInput.setAttribute('class', 'b--pages');
    numberInput.id = 'page-count'
    numberInput.setAttribute('min', '1');
    // numberInput.required = true;

    const addBtn = document.createElement('button');
    addBtn.setAttribute('type', 'submit');
    addBtn.id = 'submitEntry';
    addBtn.textContent = 'ADD BOOK';

    divSplit.appendChild(numberLabel);
    divSplit.appendChild(numberInput);
    divSplit.appendChild(addBtn);

    Form.appendChild(titleInput);
    Form.appendChild(divSection);
    Form.appendChild(divSplit);

    showForm();
}

function showForm() {
    const entrySign = document.querySelector('.new--entry');
    if (formShowing) {
        hideForm();
    } else {
        formShowing = true;
        formSection.appendChild(formSec);
        formSection.classList.add('slide--in');
        entrySign.textContent = '-';

        const submitEntry = document.querySelector('#submitEntry');
        submitEntry.addEventListener('click', getBookInfo);
    }
}

function hideForm() {
    const formS = document.querySelector('#add--entry');
    const entrySign = document.querySelector('.new--entry');

    formShowing = false;
    formS.remove();
    formSection.classList.remove('slide--in')
    entrySign.textContent = '+'
}

function getBookInfo(e) {
    e.preventDefault();
    const form = document.getElementById('add--entry');
    bookTitle = form.querySelector('.b--title').value;
    bookAuthor = document.querySelector('.b--author').value;
    bookStatus = form.querySelector('.b--status').value;
    bookPages = form.querySelector('.b--pages').value;

    updateCatalog();

    createShelf()
    addBookToLibrary();
    // console.log(myLibrary);
    // hideForm();
}

function updateCatalog() {
    const book = new Book(bookTitle, bookAuthor, bookPages, bookStatus);
    myLibrary.push(book)
}

function createShelf () {
    // const bLog = document.createElement('div');
    bLog = document.createElement('div');
    bLog.setAttribute('class', 'book--log');
    bLog.innerHTML = '<svg class="bookSvg" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 459.319 459.319" style="enable-background:new 0 0 459.319 459.319;" xml:space="preserve"><g><path d="M94.924,366.674h312.874c0.958,0,1.886-0.136,2.778-0.349c0.071,0,0.13,0.012,0.201,0.012c6.679,0,12.105-5.42,12.105-12.104V12.105C422.883,5.423,417.456,0,410.777,0h-2.955H114.284H94.941c-32.22,0-58.428,26.214-58.428,58.425c0,0.432,0.085,0.842,0.127,1.259c-0.042,29.755-0.411,303.166-0.042,339.109c-0.023,0.703-0.109,1.389-0.109,2.099c0,30.973,24.252,56.329,54.757,58.245c0.612,0.094,1.212,0.183,1.847,0.183h317.683c6.679,0,12.105-5.42,12.105-12.105v-45.565c0-6.68-5.427-12.105-12.105-12.105s-12.105,5.426-12.105,12.105v33.461H94.924c-18.395,0-33.411-14.605-34.149-32.817c0.018-0.325,0.077-0.632,0.071-0.963c-0.012-0.532-0.03-1.359-0.042-2.459C61.862,380.948,76.739,366.674,94.924,366.674z M103.178,58.425c0-6.682,5.423-12.105,12.105-12.105s12.105,5.423,12.105,12.105V304.31c0,6.679-5.423,12.105-12.105,12.105s-12.105-5.427-12.105-12.105V58.425z" /></g></svg>';

    const bDetails = document.createElement('div');
    bDetails.setAttribute('class', 'book--details');

    const bTitle = document.createElement('h2');
    bTitle.setAttribute('class', 'book--title');
    // bTitle.textContent = `${bookTitle}`;

    const bAuthor = document.createElement('p');
    bAuthor.setAttribute('class', 'book--author');
    // bAuthor.textContent = `${bookAuthor}`;

    const bPages = document.createElement('p');
    bPages.setAttribute('class', 'book--pages');
    // bPages.textContent = `${bookPages}`;

    bDetails.appendChild(bTitle);
    bDetails.appendChild(bAuthor);
    bDetails.appendChild(bPages);

    const dLog = document.createElement('div');
    dLog.setAttribute('class', 'delete--log');
    dLog.innerHTML = ' <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"> <path d="M13.05 42q-1.2 0-2.1-.9-.9-.9-.9-2.1V10.5H9.5q-.65 0-1.075-.425Q8 9.65 8 9q0-.65.425-1.075Q8.85 7.5 9.5 7.5h7.9q0-.65.425-1.075Q18.25 6 18.9 6h10.2q.65 0 1.075.425.425.425.425 1.075h7.9q.65 0 1.075.425Q40 8.35 40 9q0 .65-.425 1.075-.425.425-1.075.425h-.55V39q0 1.2-.9 2.1-.9.9-2.1.9Zm0-31.5V39h21.9V10.5Zm5.3 22.7q0 .65.425 1.075.425.425 1.075.425.65 0 1.075-.425.425-.425.425-1.075V16.25q0-.65-.425-1.075-.425-.425-1.075-.425-.65 0-1.075.425-.425.425-.425 1.075Zm8.3 0q0 .65.425 1.075.425.425 1.075.425.65 0 1.075-.425.425-.425.425-1.075V16.25q0-.65-.425-1.075-.425-.425-1.075-.425-.65 0-1.075.425-.425.425-.425 1.075Zm-13.6-22.7V39 10.5Z" /></svg>';

    const bStatus = document.createElement('div');
    bStatus.setAttribute('class', 'book--status');
    bStatus.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M14.7 35.9 3.5 24.7l2.15-2.15 9.05 9.05 2.15 2.15Zm8.5 0L12 24.7l2.15-2.15 9.05 9.05 19.2-19.2 2.15 2.15Zm0-8.5-2.15-2.15L33.9 12.4l2.15 2.15Z" /></svg>';

    bLog.appendChild(bDetails)
    bLog.appendChild(dLog);
    bLog.appendChild(bStatus);

    bookRack.appendChild(bLog);
}

demoBook = {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    pages: 110,
    status: 'Read',
}

// let myLibrary = [demoBook];
function Book(bookTitle, bookAuthor, bookPages, bookStatus) {
    this.title = bookTitle;
    this.author = bookAuthor;
    this.pages = bookPages;
    this.status = bookStatus;
}

function addBookToLibrary() {

    const bRack = Array.from(document.querySelectorAll('.book--log'));
    const lastRack = bRack[bRack.length - 1];
    const lastBook = myLibrary.at(-1);

    const bTitle = lastRack.querySelector('.book--title');
    const bAuthor = lastRack.querySelector('.book--author');
    const bPages = lastRack.querySelector('.book--pages');

    bTitle.textContent = `${lastBook.title}`;
    bAuthor.textContent = `${lastBook.author}`;
    bPages.textContent = `${lastBook.pages}`;
}


addNew.addEventListener('click', createForm);