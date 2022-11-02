let titleInput = document.querySelector("#title");
let authorInput = document.querySelector("#author");
let pagesInput = document.querySelector("#pages");
let readInput = document.getElementsByName("read");
let submitBtn = document.querySelector("#submit");
let form = document.querySelector("#addBook");
let formCard = document.querySelector(".form_card");
let addBookCard = document.querySelector("#addBookCard");
let mainContent = document.querySelector(".mainContent");
let bodyWrapper = document.querySelector(".wrapper");
let Library = [];
/*Book Constructor*/
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function showPlusCard() {
  let div2 = document.createElement("div");
  div2.setAttribute("id", "addBookCard");
  div2.setAttribute("class", "card");
  div2.addEventListener("click", (e) => {
    formCard.setAttribute("id", "shown");
    bodyWrapper.classList.toggle("blur-filter");
    // body.style.filter = "blur(3px)";
  });
  let plus_sign = document.createElement("i");
  plus_sign.setAttribute("class", "fa-solid fa-plus");
  div2.appendChild(plus_sign);
  mainContent.appendChild(div2);
}

//This function is ran the moment the submit button is clicked
function showBook() {
  /*This while loop takes care of clearing the mainContent from all its children, that way when we render the array of books (Library) we don't get any duplicates.*/
  while (mainContent.lastChild) {
    mainContent.removeChild(mainContent.lastChild);
  }
  Library.forEach((book, i) => {
    let div = document.createElement("div");
    div.setAttribute("class", "card");
    div.setAttribute("data-index", `${i}`);

    book.read == "true"
      ? (div.innerHTML = `<img class="bookImg" src="book.png"><h1>${book.title}</h1>
      <p>by <b>${book.author}</b>, ${book.pages} <b>pages.</b> I already <b>read</b> this book.</p>
      <button class="btn" id="removeBtn" data-index=${i}>Remove</button>
      <button class="btn" id="editBtn" data-index=${i}>Update</button>`)
      : (div.innerHTML = `<img class="bookImg" src="book.png"><h1>${book.title}</h1>
      <p>by <b>${book.author}</b>, ${book.pages} <b>pages.</b> I haven't <b>read</b> this book.</p>

      <button class="btn" id="removeBtn" data-index=${i}>Remove</button>
      <button class="btn" id="editBtn" data-index=${i}>Update</button>`);

    mainContent.appendChild(div);
  });
  showPlusCard();
  buttonListeners();
}

//Saves a book added by the user.
submitBtn.addEventListener("click", (e) => {
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
  formCard.setAttribute("id", "hidden");
  showBook();
});

//First instance of the add book card.
addBookCard.addEventListener("click", (e) => {
  formCard.setAttribute("id", "shown");
  bodyWrapper.classList.toggle("blur-filter");
});

function buttonListeners() {
  let removeBtn = document.querySelectorAll("#removeBtn");
  removeBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let index = e.target.dataset.index;
      console.log(index);
      console.log(Library[index]);
      Library.splice(index, 1);
      showBook();
    });
  });

  let editBtn = document.querySelectorAll("#editBtn");
  editBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let index = e.target.dataset.index;
      Library[index].read == "true"
        ? (Library[index].read = "false")
        : (Library[index].read = "true");
      showBook();
    });
  });
}
