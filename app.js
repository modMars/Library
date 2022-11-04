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

/*This function clears the current book cards on screen to avoid any duplicates, after doing so, we create a book card for each book in the Library array, finally we call the showPlusCard() function and also add listeners to the 'remove' and 'update' buttons on the card.*/
function renderBooks() {
  while (mainContent.lastChild) {
    mainContent.removeChild(mainContent.lastChild);
  }
  Library.forEach((book, i) => {
    let div = document.createElement("div");
    div.setAttribute("class", "card");
    let img = document.createElement("img");
    img.className = "bookImg";
    book.read === "true"
      ? img.setAttribute("src", "./images/bookGreen.png")
      : img.setAttribute("src", "./images/bookRed.png");
    div.appendChild(img);
    let h2 = document.createElement("h2");
    h2.className = "title";
    h2.textContent = `${book.title}`;
    div.appendChild(h2);
    let p = document.createElement("p");
    p.textContent = `Written by ${book.author}
    ${book.pages} Pages
    I already read this book.`;
    div.appendChild(p);
    let btnGroup = document.createElement("div");
    btnGroup.className = "btnGroup";
    let rmvBtn = document.createElement("button");
    rmvBtn.className = "btn";
    rmvBtn.setAttribute("node-index", `${i}`);
    rmvBtn.setAttribute("id", "removeBtn");
    rmvBtn.textContent = "Remove";
    let editBtn = document.createElement("button");
    editBtn.className = "btn";
    editBtn.setAttribute("node-index", `${i}`);
    editBtn.setAttribute("id", "editBtn");
    editBtn.textContent = "Update";
    btnGroup.appendChild(rmvBtn);
    btnGroup.appendChild(editBtn);
    div.appendChild(btnGroup);
    mainContent.appendChild(div);
  });
  showPlusCard();
  addButtonListeners();
}

/*Takes the data-index attribute on the targetted button to know which entry of the library to remove.*/
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
  /*Takes de data-index attribute on the targetted button to know which entry of the library to update.*/
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

//First instace of the Plus Card
showPlusCard();
