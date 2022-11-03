/*Define the variables that will hold the form values, later to be used as inputs for each Book object.*/
let titleInput = document.querySelector("#title");
let authorInput = document.querySelector("#author");
let pagesInput = document.querySelector("#pages");
let readInput = document.getElementsByName("read");
/*Define some selectors that will hold eventListeners later on*/
const form = document.querySelector(".addBook");
const addBookCard = document.querySelector("#addBookCard");
const mainContent = document.querySelector(".mainContent");
const bodyWrapper = document.querySelector(".wrapper");

/*Array of books*/
let Library = [];
/*Book Constructor*/
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

//Takes values from the form pop up and stores them in a new Book object
form.addEventListener("submit", (e) => {
  e.preventDefault();
  bodyWrapper.classList.toggle("blur-filter");
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
  form.setAttribute("id", "hidden");
  renderBooks();
});

//
function renderBooks() {
  /*This while loop takes care of clearing the mainContent from all its children, that way when we render the array of books we don't get any duplicates.*/
  while (mainContent.lastChild) {
    mainContent.removeChild(mainContent.lastChild);
  }
  Library.forEach((book, i) => {
    let div = document.createElement("div");
    div.setAttribute("class", "card");

    book.read == "true"
      ? (div.innerHTML = `<img class="bookImg" src="./images/bookGreen.png">
        <h2 class="title">${book.title}</h2>
        <p>Written by <b>${book.author}</b><br>
        ${book.pages} <b>Pages</b><br>
        I already <b>read</b> this book.</p>
        <div class="btnGroup">
          <button class="btn" id="removeBtn" data-index=${i}>Remove</button>
          <button class="btn" id="editBtn" data-index=${i}>Update</button>
        </div>`)
      : (div.innerHTML = `<img class="bookImg" src="./images/bookRed.png">
        <h2 class="title">${book.title}</h2>
        <p>Written by <b>${book.author}</b><br>
        ${book.pages} <b>Pages.</b><br>
        I haven't <b>read</b> this book.</p>
        <div class="btnGroup">
          <button class="btn" id="removeBtn" data-index=${i}>Remove</button>
          <button class="btn" id="editBtn" data-index=${i}>Update</button>
        </div>`);
    mainContent.appendChild(div);
  });
  showPlusCard();
  addButtonListeners();
}

function addButtonListeners() {
  let removeBtn = document.querySelectorAll("#removeBtn");
  removeBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let index = e.target.dataset.index;
      console.log(index);
      console.log(Library[index]);
      Library.splice(index, 1);
      renderBooks();
    });
  });

  let editBtn = document.querySelectorAll("#editBtn");
  editBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let index = e.target.dataset.index;
      Library[index].read == "true"
        ? (Library[index].read = "false")
        : (Library[index].read = "true");
      renderBooks();
    });
  });
}

/*Append the 'add book' card into the main content*/
function showPlusCard() {
  let div = document.createElement("div");
  div.setAttribute("id", "addBookCard");
  div.setAttribute("class", "card");
  div.addEventListener("click", (e) => {
    form.setAttribute("id", "shown");
    bodyWrapper.classList.toggle("blur-filter");
  });
  div.innerHTML = `<i class="fa-solid fa-plus"></i>`;
  mainContent.appendChild(div);
}

showPlusCard();
