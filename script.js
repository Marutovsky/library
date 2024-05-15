const content = document.querySelector(".content");

const myLibrary = [
  {title: 'The Hobbit', author: 'Rowling', pages: '123', read: 'not read yet'},
  {title: 'Something', author: 'XYZ', pages: '542', read: 'read'},
  {title: 'Something', author: 'XYZ', pages: '542', read: 'read'},
  {title: 'Something', author: 'XYZ', pages: '542', read: 'read'},
  {title: 'Something', author: 'XYZ', pages: '542', read: 'read'},
  {title: 'Something', author: 'XYZ', pages: '542', read: 'read'},
  {title: 'Something', author: 'XYZ', pages: '542', read: 'read'},
  {title: 'Something', author: 'XYZ', pages: '542', read: 'read'},
  {title: 'Something', author: 'XYZ', pages: '542', read: 'read'},
];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {
  let title = prompt("Title of the book:");
  let author = prompt("Author of the book:");
  let pages = prompt("How many pages does the book have?");
  let read = prompt("Did you read it? (read / not read yet)");

  myLibrary.push(new Book(title, author, pages, read));
}

myLibrary.forEach((book) => {
  let card = document.createElement('div');
  let bookTitle = document.createElement('h2');
  let bookAuthor = document.createElement('h3');
  let bookPages = document.createElement('p');
  let bookRead = document.createElement('p');

  card.classList.add("card");
  content.appendChild(card);

  bookTitle.textContent = book.title;
  bookAuthor.textContent = book.author;
  bookPages.textContent = book.pages;
  bookRead.textContent = book.read;

  card.appendChild(bookTitle);
  card.appendChild(bookAuthor);
  card.appendChild(bookPages);
  card.appendChild(bookRead);
});