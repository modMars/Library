import { createBook } from "./modules/books";
import { displayManager, dom } from "./modules/dom";
import "./style/normalize.css";
import "./style/style.css";

//Library module, includes several functions that help modify the contents within the library.
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

//Add form event listener
const form = document.querySelector(".addBook");
form.addEventListener("submit", dom.gatherFormData);

//First instace of the Plus Card
displayManager.appendPlusCard();

export { library };
