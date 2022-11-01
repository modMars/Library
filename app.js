let titleInput = document.querySelector("#title");
let authorInput = document.querySelector("#author");
let pagesInput = document.querySelector("#pages");
let readInput = document.getElementsByName("read");
let submitBtn = document.querySelector("#submit");
let form = document.querySelector("#addBook");
let formCard = document.querySelector(".form_card");
let addBookCard = document.querySelector("#addBookCard");
let mainContent = document.querySelector(".mainContent");
let body = document.querySelector("body");
let Library = [];
/*Book Constructor*/
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function showBook() {
  /*This while loop takes care of clearing the mainContent from all its children, that way when we render the array of books (Library) we don't get any duplicates.*/
  while (mainContent.lastChild) {
    mainContent.removeChild(mainContent.lastChild);
  }
  Library.forEach((book) => {
    let div = document.createElement("div");
    div.setAttribute("class", "card");
    console.log(book.read);
    book.read == "true"
      ? (div.textContent = `${book.title} by ${book.author}, ${book.pages} pages. I already read this book.`)
      : (div.textContent = `${book.title} by ${book.author}, ${book.pages} pages. I haven't read this book.`);
    mainContent.appendChild(div);
    console.log(book);
  });
  showPlusCard();
}

function showPlusCard() {
  let div2 = document.createElement("div");
  div2.setAttribute("id", "addBookCard");
  div2.setAttribute("class", "card");
  div2.addEventListener("click", (e) => {
    formCard.setAttribute("id", "shown");
    // body.style.filter = "blur(3px)";
  });
  let plus_sign = document.createElement("i");
  plus_sign.setAttribute("class", "fa-solid fa-plus");
  div2.appendChild(plus_sign);
  mainContent.appendChild(div2);
}

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const Yes = document.querySelector("#Yes");
  const No = document.querySelector("#No");
  Yes.checked === true ? (readInput = Yes) : (readInput = No);
  newBook = new Book(
    titleInput.value,
    authorInput.value,
    pagesInput.value,
    readInput.value
  );
  Library.push(newBook);
  form.reset();
  // body.style.filter = "blur(0px)";
  formCard.setAttribute("id", "hidden");
  showBook();
});

addBookCard.addEventListener("click", (e) => {
  formCard.setAttribute("id", "shown");
  // body.style.filter = "blur(3px)";
});
