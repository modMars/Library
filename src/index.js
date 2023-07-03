import { createBook } from "./books";
import { displayManager, dom } from "./dom";
import "./normalize.css";
import "./style.css";

/*Array of books*/
const library = (() => {
  let storage = [];
  const addNewBook = (book) => {
    storage.push(book);
  };
  const removeBook = (index) => {
    storage.splice(index, 1);
  };
  const toggleReadStatus = (index) => {
    library.storage[index].read == "true"
      ? (library.storage[index].read = "false")
      : (library.storage[index].read = "true");
  };
  return { storage, addNewBook, removeBook, toggleReadStatus };
})();

//Takes values from the form pop up and stores them in a new Book object
const form = document.querySelector(".addBook");
form.addEventListener("submit", dom.gatherFormData);

//First instace of the Plus Card
displayManager.showPlusCard();

export { library };
