const content = document.querySelector('.content');
const newBookButton = document.querySelector('#new-book');
const newBookDialog = document.querySelector('#new-book-dialog');
const addBookButton = document.querySelector('#add-book-btn');
const dialogCloseButton = document.querySelector('#close-dialog');
const dialogTitleInput = document.querySelector('#dialog-title');
const dialogAuthorInput = document.querySelector('#dialog-author');
const dialogPagesInput = document.querySelector('#dialog-pages');
const dialogReadYes = document.querySelector('#dialog-read-yes');
const dialogReadNo = document.querySelector('#dialog-read-no');
let dialogReadChecked = document.querySelector('input[name="read"]:checked');;

let myLibrary = [
  {title: 'The Hobbit: An Unexpected Journey', author: 'Rowling', pages: '123', read: false},
  {title: 'Something', author: 'XYZ', pages: '542', read: true},
]

createCards();

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {
  let title = dialogTitleInput.value;
  let author = dialogAuthorInput.value;
  let pages = dialogPagesInput.value;
  let read = dialogReadChecked.value === "Yes" ? true : false;

  myLibrary.push(new Book(title, author, pages, read));
  reloadCards();
}

function createCards() {
  myLibrary.forEach((book, bookIndex) => {
    const card = document.createElement('div');
    const bookTitle = document.createElement('h2');
    const bookAuthor = document.createElement('h3');
    const bookPages = document.createElement('p');
    const bookRead = document.createElement('p');
    const removeBookButton = document.createElement('button');
  
    card.classList.add('card');
    card.setAttribute('data-index', bookIndex);
    content.appendChild(card);
  
    bookTitle.textContent = book.title;
    bookAuthor.textContent = `by ${book.author}`;
    bookPages.textContent = `${book.pages} pages`;
    bookRead.textContent = `Read: ${book.read}`;

    removeBookButton.textContent = 'Remove';
    removeBookButton.className = 'remove-book';
    removeBookButton.setAttribute('type', 'button');
  
    card.appendChild(bookTitle);
    card.appendChild(bookAuthor);
    card.appendChild(bookPages);
    card.appendChild(bookRead);
    card.appendChild(removeBookButton);

    removeBookButton.addEventListener('click', () => {
      myLibrary = myLibrary.filter((book, index) => index !== bookIndex);
      reloadCards();
    })
  });
}

function removeCards() {
  let cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.remove();
  })
}

function reloadCards() {
  removeCards();
  createCards();
}

function clearDialogInputs() {
  dialogTitleInput.value = '';
  dialogAuthorInput.value = '';
  dialogPagesInput.value = '';
  dialogReadYes.checked = true;
  dialogReadChecked = document.querySelector('input[name="read"]:checked');
}

newBookButton.addEventListener('click', () => {
  newBookDialog.showModal();
});

addBookButton.addEventListener('click', e => {
  if (document.querySelector("#new-book-dialog form").checkValidity()) {
    e.preventDefault();
    addBookToLibrary();
    clearDialogInputs();
  } else {
    document.querySelector("#new-book-dialog form").reportValidity();
  }
  
});

dialogCloseButton.addEventListener('click', () => {
  clearDialogInputs();
  newBookDialog.close();
});

dialogReadYes.addEventListener('click', () => {
  dialogReadYes.checked = true;
  dialogReadNo.checked = false;
  dialogReadChecked = document.querySelector('input[name="read"]:checked');
});

dialogReadNo.addEventListener('click', () => {
  dialogReadYes.checked = false;
  dialogReadNo.checked = true;
  dialogReadChecked = document.querySelector('input[name="read"]:checked');
});