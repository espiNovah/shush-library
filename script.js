const addNew = document.querySelector('.new--entry');
const formSection = document.querySelector('#entry--form');
const bookRack = document.querySelector('.book--rack');
let formShowing = false;
let formSec, bookTitle, bookAuthor, bookStatus, bookPages;
let lastRack, firstRack, bLog, dLog, bStatus, rackCount, dBtnCount, sBtnCount;
let totalBook = 0;
let totalRead = 0;
let myLibrary = [];

function createForm() {
    const Form = document.createElement('form');
    Form.id = 'add--entry';
    formSec = Form;

    const titleInput = document.createElement('input');
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('name', 'title');
    titleInput.setAttribute('class', 'b--title');
    titleInput.setAttribute('placeholder', 'Book Title');
    titleInput.required = true;

    const divSection = document.createElement('div');
    divSection.classList.add('sh--entry');


    const authorInput = document.createElement('input');
    authorInput.setAttribute('type', 'text');
    authorInput.setAttribute('name', 'author');
    authorInput.setAttribute('class', 'b--author');
    authorInput.setAttribute('placeholder', 'Author');
    authorInput.required = true;


    const selectChoice = document.createElement('select');
    const selectItem = ["Read", "Not read"];
    for (let i = 0; i < selectItem.length; i++) {
        let option = document.createElement("option");
        option.value = selectItem[i];
        option.text = selectItem[i];
        selectChoice.appendChild(option);
    }
    selectChoice.setAttribute('class', 'b--status');

    divSection.appendChild(authorInput);
    divSection.appendChild(selectChoice);

    const divSplit = document.createElement('div');
    divSplit.classList.add('sh--entry');

    const numberLabel = document.createElement('label');
    numberLabel.setAttribute('for', 'page-count');
    numberLabel.textContent = 'Number of pages';

    const numberInput = document.createElement('input');
    numberInput.setAttribute('type', 'number');
    numberInput.setAttribute('name', 'number');
    numberInput.setAttribute('class', 'b--pages');
    numberInput.id = 'page-count'
    numberInput.setAttribute('min', '1');
    numberInput.required = true;

    const addBtn = document.createElement('button');
    addBtn.setAttribute('type', 'submit');
    numberInput.setAttribute('name', 'submit');
    addBtn.id = 'submitEntry';
    addBtn.textContent = 'ADD BOOK';

    divSplit.appendChild(numberLabel);
    divSplit.appendChild(numberInput);
    divSplit.appendChild(addBtn);

    Form.appendChild(titleInput);
    Form.appendChild(divSection);
    Form.appendChild(divSplit);

    showForm();
    Form.addEventListener('submit', getBookInfo);

}

function showForm() {
    const entrySign = document.querySelector('.new--entry');
    if (formShowing) {
        hideForm();
    } else {
        formShowing = true;
        formSection.appendChild(formSec);
        formSection.classList.remove('slide--out');
        formSection.classList.add('slide--in');
        entrySign.textContent = '-';
    }
}

function hideForm() {
    const formS = document.querySelector('#add--entry');
    const entrySign = document.querySelector('.new--entry');
    formShowing = false;
    formSection.classList.remove('slide--in');
    formSection.classList.add('slide--out');
    entrySign.disabled = true;
    setTimeout(
        () => {
            formS.remove()
            entrySign.disabled = false;
        }, 400)
    entrySign.textContent = '+'
}

function getBookInfo(e) {
    e.preventDefault();
    const form = document.getElementById('add--entry');
    bookTitle = form.querySelector('.b--title').value;
    bookAuthor = form.querySelector('.b--author').value;
    bookStatus = form.querySelector('.b--status').value;
    bookPages = form.querySelector('.b--pages').value;

    updateCatalog();
    createShelf()
    addBookToLibrary();
    hideForm();
}

function updateCatalog() {
    const book = new Book(bookTitle, bookAuthor, bookPages, bookStatus);
    myLibrary.push(book)
}

function randomColor() {
    const randomRGB = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
    const r = randomRGB(0, 255);
    const g = randomRGB(0, 255);
    const b = randomRGB(0, 255);
    const rgbColor = `rgb(${r},${g},${b})`;
    return rgbColor;
}

function changeBookColor(item) {
    let rgb = randomColor();
    item.style.fill = rgb;
}

function updateBookCount() {
    const bCount = document.querySelector('.a--data').childNodes[0];
    totalBook = myLibrary.length;
    bCount.textContent = totalBook;
}

function calculateReadingTime() {
    const totalPages = myLibrary
        .filter(book => {
            return book.status.toLowerCase() == 'read'
        })
        .reduce((previous, current) => {
            return +current.pages + previous
        }, 0);

    const averagePageWords = 300;
    const oneHr = 60;
    const wordCount = totalPages * averagePageWords;
    const readingTime = Math.round((wordCount / 200) / oneHr);
    const readingCount = document.querySelector('.reading--hours').childNodes[0];

    if (totalBook == 0 || readingTime == 0) {
        readingCount.textContent = '0'
    } else if (readingTime < 5) {
        readingCount.textContent = 'Less than 5 hrs'
    } else {
        readingCount.textContent = readingTime
    }
}

function checkReadBook() {
    const readBooks = myLibrary.filter(book => {
        return book.status.toLowerCase() == 'read'
    })
    totalRead = readBooks.length
    const cRead = document.querySelector('.b--data').childNodes[0];
    cRead.textContent = totalRead;
}

function createShelf() {
    bLog = document.createElement('div');
    bLog.setAttribute('class', 'book--log');
    bLog.innerHTML = '<svg class="bookSvg" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 459.319 459.319" style="enable-background:new 0 0 459.319 459.319;" xml:space="preserve"><g><path d="M94.924,366.674h312.874c0.958,0,1.886-0.136,2.778-0.349c0.071,0,0.13,0.012,0.201,0.012c6.679,0,12.105-5.42,12.105-12.104V12.105C422.883,5.423,417.456,0,410.777,0h-2.955H114.284H94.941c-32.22,0-58.428,26.214-58.428,58.425c0,0.432,0.085,0.842,0.127,1.259c-0.042,29.755-0.411,303.166-0.042,339.109c-0.023,0.703-0.109,1.389-0.109,2.099c0,30.973,24.252,56.329,54.757,58.245c0.612,0.094,1.212,0.183,1.847,0.183h317.683c6.679,0,12.105-5.42,12.105-12.105v-45.565c0-6.68-5.427-12.105-12.105-12.105s-12.105,5.426-12.105,12.105v33.461H94.924c-18.395,0-33.411-14.605-34.149-32.817c0.018-0.325,0.077-0.632,0.071-0.963c-0.012-0.532-0.03-1.359-0.042-2.459C61.862,380.948,76.739,366.674,94.924,366.674z M103.178,58.425c0-6.682,5.423-12.105,12.105-12.105s12.105,5.423,12.105,12.105V304.31c0,6.679-5.423,12.105-12.105,12.105s-12.105-5.427-12.105-12.105V58.425z" /></g></svg>';

    const bDetails = document.createElement('div');
    bDetails.setAttribute('class', 'book--details');

    const bTitle = document.createElement('h2');
    bTitle.setAttribute('class', 'book--title');

    const bAuthor = document.createElement('p');
    bAuthor.setAttribute('class', 'book--author');

    const bPages = document.createElement('p');
    bPages.setAttribute('class', 'book--pages');

    bDetails.appendChild(bTitle);
    bDetails.appendChild(bAuthor);
    bDetails.appendChild(bPages);

    dLog = document.createElement('img');
    dLog.setAttribute('class', 'delete--log');
    dLog.setAttribute('src', './assets/icons/delete.png');

    bStatus = document.createElement('img');
    bStatus.setAttribute('class', 'book--status');
    bStatus.setAttribute('src', './assets/icons/status.png');

    bLog.appendChild(bDetails)
    bLog.appendChild(dLog);
    bLog.appendChild(bStatus);

    bookRack.appendChild(bLog);
}

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function addBookToLibrary() {
    const bRack = Array.from(document.querySelectorAll('.book--log'));
    const newBook = myLibrary.at(-1);

    lastRack = bRack[bRack.length - 1];
    firstRack = bRack[0];

    const bCover = lastRack.querySelector('.bookSvg');
    const bTitle = lastRack.querySelector('.book--title');
    const bAuthor = lastRack.querySelector('.book--author');
    const bPages = lastRack.querySelector('.book--pages');
    const statusTag = lastRack.querySelector('.book--status');

    bTitle.textContent = `${newBook.title}`;
    bAuthor.textContent = `${newBook.author}`;
    bPages.textContent = `${newBook.pages}`;

    if (bRack.length > 0) {
        bookRack.insertBefore(lastRack, firstRack);
    }

    if (newBook.status.toLowerCase() == 'read') {
        statusTag.style.backgroundColor = '#0F9D58'
    } else if (newBook.status.toLowerCase() == 'not read') {
        statusTag.style.backgroundColor = '#F4B400'
    }

    checkAvailableBooks();
    changeBookColor(bCover);
    updateBookCount();
    checkReadBook()
    calculateReadingTime()
    addBookIndex();
}

function addBookIndex() {
    const book = Array.from(document.querySelectorAll('.book--log'));
    const deleteBtn = Array.from(document.querySelectorAll('.delete--log'));
    const statusBtn = Array.from(document.querySelectorAll('.book--status'));

    for (let j = 0; j < 1; j++) {
        let numb = myLibrary.length - 1;

        for (let i = 0; i < myLibrary.length; i++) {
            book[i].setAttribute('data-book-index', `${numb}`);
            statusBtn[i].setAttribute('data-book-index', `${numb}`);
            deleteBtn[i].setAttribute('data-book-index', `${numb}`);

            deleteBtn[i].addEventListener('click', deleteBook);
            statusBtn[i].addEventListener('click', changeReadStatus);
            numb = numb - 1;
        }
    }
}

function deleteBook(e) {
    e.target.parentElement.classList.add('animate--out');
    const btnIndex = e.target.getAttribute('data-book-index');

    setTimeout(
        () => {
            e.target.parentElement.remove();
            myLibrary.splice(btnIndex, 1);
            checkAvailableBooks();
            addBookIndex();
            updateBookCount();
            checkReadBook();
            calculateReadingTime();
        }, 100)
}

function checkAvailableBooks() {
    const EMPTY_LIBRARY_NOTICE = 'Ops... Your library is currently empty';
    if (myLibrary.length === 0) {
        const note = document.createElement('p');
        note.textContent = EMPTY_LIBRARY_NOTICE;
        bookRack.appendChild(note);
    } else if (myLibrary.length === 1) {
        const rackChildren = document.querySelector('.book--rack').childNodes;
        for (let i = 0; i < rackChildren.length; i++) {
            if (rackChildren[i].nodeName.toLowerCase() == 'p') {
                rackChildren[i].remove();
            }
        }
    }
}

function changeReadStatus(e) {
    const btnIndex = e.target.getAttribute('data-book-index');
    const bookIndex = e.target.parentElement.getAttribute('data-book-index');

    if (btnIndex === bookIndex) {
        const bookStatus = myLibrary[btnIndex].status.toLowerCase();
        if (bookStatus === 'read') {
            e.target.style.backgroundColor = '#F4B400';
            myLibrary[btnIndex].status = 'Not read';
        } else if (bookStatus === 'not read') {
            e.target.style.backgroundColor = '#0F9D58';
            myLibrary[btnIndex].status = 'Read';
        }
    }
    checkReadBook();
    calculateReadingTime();
}

addNew.addEventListener('click', createForm);
document.addEventListener('DOMContentLoaded', () => {
    const demoBook = {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        pages: '110',
        status: 'Read',
    }
    myLibrary.push(demoBook);
    myLibrary.forEach(() => {
        createShelf();
        addBookToLibrary();
    })
})


