let titleInput = document.querySelector("#title");
let authorInput = document.querySelector("#author");
let pagesInput = document.querySelector("#pages");
let readInput = document.getElementsByName("read");
let submitBtn = document.querySelector("#submit");
let form = document.querySelector("#addBook");
let Library = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
}

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  newBook = new Book(
    titleInput.value,
    authorInput.value,
    pagesInput.value,
    readInput.value
  );
  console.log(readInput);
  Library.push(newBook);
  form.reset();
  console.log(Library);
});

// function addBook() {
//   const title = prompt("Please input book title");
//   const author = prompt("Please input book author");
//   const pages = prompt("Please input book pages");
//   const read = prompt("Have you read the book? True / False");
//   newBook = new Book(title, author, pages, read);
//   Library.push(newBook);
//   console.log(Library);
// }

// addBook();
// addBook();
