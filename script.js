const content = document.querySelector(".content");

const myLibrary = [
  {title: 'The Hobbit', author: 'Rowling', pages: '123', read: 'not read yet'},
  {title: 'Something', author: 'XYZ', pages: '542', read: 'read'}
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

for (book in myLibrary) {
  let card = document.createElement('div');
  card.classList.add("card");
  content.appendChild(card);
}