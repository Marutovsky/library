const content = document.querySelector('.content');
const newBookButton = document.querySelector('#new-book');
const newBookDialog = document.querySelector('#new-book-dialog');
const addBookButton = document.querySelector('#add-book-btn');
const dialogCloseButton = document.querySelector('#close-dialog');
const dialogTitleInput = document.querySelector('#dialog-title');
const dialogAuthorInput = document.querySelector('#dialog-author');
const dialogPagesInput = document.querySelector('#dialog-pages');
const dialogReadChecked = document.querySelector('input[name="read"]:checked');
const dialogReadYes = document.querySelector('#dialog-read-yes');

const myLibrary = [
  {title: 'The Hobbit: An Unexpected Journey', author: 'Rowling', pages: '123', read: 'no'},
  {title: 'Something', author: 'XYZ', pages: '542', read: 'yes'},
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
  let read = dialogReadChecked.value;

  myLibrary.push(new Book(title, author, pages, read));
  reloadCards();
}

function createCards() {
  myLibrary.forEach(book => {
    let card = document.createElement('div');
    let bookTitle = document.createElement('h2');
    let bookAuthor = document.createElement('h3');
    let bookPages = document.createElement('p');
    let bookRead = document.createElement('p');
    let removeBookButton = document.createElement('button');
  
    card.classList.add('card');
    content.appendChild(card);
  
    bookTitle.textContent = book.title;
    bookAuthor.textContent = `by ${book.author}`;
    bookPages.textContent = `${book.pages} pages`;
    bookRead.textContent = `Read: ${book.read}`;

    removeBookButton.textContent = "Remove";
    removeBookButton.className = "remove-book";
  
    card.appendChild(bookTitle);
    card.appendChild(bookAuthor);
    card.appendChild(bookPages);
    card.appendChild(bookRead);
    card.appendChild(removeBookButton);
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
})