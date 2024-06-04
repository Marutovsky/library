const content = document.querySelector('.content');
const newBookButton = document.querySelector('#new-book');

const dialog = {
  newBook: document.querySelector('#new-book-dialog'),
  addBookButton: document.querySelector('#add-book-btn'),
  closeButton: document.querySelector('#close-dialog'),
  titleInput: document.querySelector('#dialog-title'),
  authorInput: document.querySelector('#dialog-author'),
  pagesInput: document.querySelector('#dialog-pages'),
  readYes: document.querySelector('#dialog-read-yes'),
  readNo: document.querySelector('#dialog-read-no'),
  readChecked: document.querySelector('input[name="read"]:checked')
};

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
  let title = dialog.titleInput.value;
  let author = dialog.authorInput.value;
  let pages = dialog.pagesInput.value;
  let read = dialog.readChecked.value === "Yes" ? true : false;

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
    bookRead.append(createToggleRadioInput());

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
  dialog.titleInput.value = '';
  dialog.authorInput.value = '';
  dialog.pagesInput.value = '';
  dialog.readYes.checked = true;
  dialog.readChecked = document.querySelector('input[name="read"]:checked');
}

function createToggleRadioInput() {
  let toggleRadio = document.createElement('div');
  toggleRadio.className = 'toggle-radio';

  let paragraph = document.createElement('p');
  paragraph.textContent = 'Read:'

  let inputYes = document.createElement('input');
  inputYes.type = 'radio';
  inputYes.name = 'read';
  inputYes.id = "read-yes";
  inputYes.value = "Yes";

  let inputNo = document.createElement('input');
  inputNo.type = 'radio';
  inputNo.name = 'read';
  inputNo.id = 'read-no';
  inputNo.value = 'No';

  let switchDiv = document.createElement('div');
  switchDiv.className = 'switch';

  let labelYes = document.createElement('label');
  labelYes.setAttribute('for', 'read-yes');
  labelYes.textContent = 'Yes';

  let labelNo = document.createElement('label');
  labelNo.setAttribute('for', 'read-no');
  labelNo.textContent = 'No';

  let span = document.createElement('span');
  
  toggleRadio.appendChild(paragraph);
  toggleRadio.appendChild(inputYes);
  toggleRadio.appendChild(inputNo);
  toggleRadio.appendChild(switchDiv);
  switchDiv.appendChild(labelYes);
  switchDiv.appendChild(labelNo);
  switchDiv.appendChild(span);

  return toggleRadio;
}

newBookButton.addEventListener('click', () => {
  dialog.newBook.showModal();
});

dialog.addBookButton.addEventListener('click', e => {
  if (document.querySelector("#new-book-dialog form").checkValidity()) {
    e.preventDefault();
    addBookToLibrary();
    clearDialogInputs();
  } else {
    document.querySelector("#new-book-dialog form").reportValidity();
  }
  
});

dialog.closeButton.addEventListener('click', () => {
  clearDialogInputs();
  dialog.newBook.close();
});

dialog.readYes.addEventListener('click', () => {
  dialog.readYes.checked = true;
  dialog.readNo.checked = false;
  dialog.readChecked = document.querySelector('input[name="read"]:checked');
});

dialog.readNo.addEventListener('click', () => {
  dialog.readYes.checked = false;
  dialog.readNo.checked = true;
  dialog.readChecked = document.querySelector('input[name="read"]:checked');
});