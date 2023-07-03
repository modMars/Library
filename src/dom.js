import { library } from ".";
import bookGreen from "./assets/bookGreen.png";
import bookRed from "./assets/bookRed.png";
import { bookFactory } from "./books";

const dom = (() => {
  /*Changes the body wrapper's attribute to toggle a blur effect with css*/
  const toggleBlur = () => {
    const bodyWrapper = document.querySelector(".wrapper");
    bodyWrapper.classList.toggle("blur-filter");
  };

  /*Resets the form as well as toggling it's visibility*/
  const toggleForm = () => {
    const form = document.querySelector(".addBook");
    form.reset();
    if (form.id == "hidden") form.setAttribute("id", "shown");
    else form.setAttribute("id", "hidden");
  };

  /*Gathers the data off of the form, pushes a new book object into the library and re-renders the library on screen*/
  const gatherFormData = (e) => {
    e.preventDefault();
    let titleInput = document.querySelector("#title");
    let authorInput = document.querySelector("#author");
    let pagesInput = document.querySelector("#pages");
    let readInput = document.getElementsByName("read");
    const Yes = document.querySelector("#Yes");
    const No = document.querySelector("#No");
    Yes.checked === true ? (readInput = Yes) : (readInput = No);
    const book = bookFactory(
      titleInput.value,
      authorInput.value,
      pagesInput.value,
      readInput.value
    );
    library.addNewBook(book);
    toggleBlur();
    toggleForm();
    displayManager.renderBooks();
  };
  return { gatherFormData, toggleForm, toggleBlur };
})();

const displayManager = (() => {
  const mainContent = document.querySelector(".mainContent");
  /*This function clears the current book cards on screen to avoid any duplicates, after doing so, we create a book card for each book in the Library array, finally we call the showPlusCard() function and also add listeners to the 'remove' and 'update' buttons on the card.*/
  function deleteDisplayedElements() {
    while (mainContent.lastChild) {
      mainContent.removeChild(mainContent.lastChild);
    }
  }

  function renderBooks() {
    deleteDisplayedElements();
    library.storage.forEach((book, i) => {
      let div = document.createElement("div");
      div.setAttribute("class", "card");
      let img = document.createElement("img");
      img.className = "bookImg";
      div.appendChild(img);
      let h2 = document.createElement("h2");
      h2.className = "title";
      h2.textContent = `${book.title}`;
      div.appendChild(h2);
      let p = document.createElement("p");
      if (book.read === "true") {
        img.setAttribute("src", `${bookGreen}`);
        p.textContent = `Written by ${book.author},
        ${book.pages} Pages,
        I already read this book.`;
      } else {
        img.setAttribute("src", `${bookRed}`);
        p.textContent = `Written by ${book.author},
        ${book.pages} Pages,
        I haven't read this book.`;
      }
      div.appendChild(p);
      let btnGroup = document.createElement("div");
      btnGroup.className = "btnGroup";
      let rmvBtn = document.createElement("button");
      rmvBtn.className = "btn";
      rmvBtn.setAttribute("data-index", `${i}`);
      rmvBtn.setAttribute("id", "removeBtn");
      rmvBtn.textContent = "Remove";
      let editBtn = document.createElement("button");
      editBtn.className = "btn";
      editBtn.setAttribute("data-index", `${i}`);
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
  /*Append the 'add book' card into the main content*/
  function showPlusCard() {
    let div = document.createElement("div");
    div.setAttribute("id", "addBookCard");
    div.setAttribute("class", "card");
    div.addEventListener("click", (e) => {
      dom.toggleForm();
      dom.toggleBlur();
    });
    div.innerHTML = `<i class="fa-solid fa-plus"></i>`;
    mainContent.appendChild(div);
  }

  function addButtonListeners() {
    /*Takes the data-index attribute on the targetted button to know which entry of the library to remove.*/
    let removeBtn = document.querySelectorAll("#removeBtn");
    removeBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        let index = e.target.dataset.index;
        library.removeBook(index);
        renderBooks();
      });
    });

    let editBtn = document.querySelectorAll("#editBtn");
    editBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        let index = e.target.dataset.index;
        library.toggleReadStatus(index);
        renderBooks();
      });
    });
  }
  return { renderBooks, showPlusCard };
})();

export { displayManager, dom };
