import { createBook } from "./books";
import { displayManager, dom } from "./dom";
import "./normalize.css";
import "./style.css";

/*Define the variables that will hold the form values, later to be used as inputs for each Book object.*/

/*Define some selectors that will hold eventListeners later on*/
const addBookCard = document.querySelector("#addBookCard");

/*Array of books*/
let Library = [];

//Takes values from the form pop up and stores them in a new Book object
const form = document.querySelector(".addBook");
form.addEventListener("submit", dom.gatherFormData);

//First instace of the Plus Card
displayManager.showPlusCard();

export { Library };
