'use strict';

const library = [];  // store all books regardless of their list and status
const completedList = [];  // store finished books
const incompleteList = [];  // store books not yet finished

function Book(title, author, status) {
    this.title = title;
    this.author = author;
    this.status = status;
}

// populate library with dummy books
const book1 = new Book("Feeling Good", "David D. Burns", false);
const book3 = new Book("Frankenstein", "Mary Shelley", true);
const book2 = new Book("The Picture of Dorian Gray", "Oscar Wilde", false);
const book4 = new Book("The Power of Habit", "Charles Duhigg", true);
const book5 = new Book("Dracula", "Bram Stoker", true);
library.push(book1, book2, book3, book4, book5);
console.log(library);


// actions executed in web page


function cardMode() {}

function listMode() {}

/**
 * addNewBookToLibrary() checks if the book being added already exists in the library or not. If so,
 * do nothing. Otherwise, add it to the library and the list of completed/incomplete books based on
 * the status inputted by the user.
 * @param {*} title     title of the book
 * @param {*} author    author of the book
 * @param {*} status    true = completed reading, false = not yet finished
 */
function addBookToLibrary(title, author, status) {
    // checks if the book being created already exists in library
    const checker = library.find(item => item.title === title && item.author === author);
    
    if (typeof checker === "undefined") {
        // the book doesn't exists in the library yet
        const newBook = new Book(title, author, status);
        library.push(newBook);
        status ? completedList.push(newBook) : incompleteList.push(newBook);

        console.log("New book added");
    } else {
        console.log("Book already exists");
    }
}

function removeBookFromLibrary() {}

function editBookInLibrary() {}


// Retrieve elements form html document and attach functions
const addBookBtn = document.getElementById("add-btn");
const newBookSubmitBtn = document.getElementById("book-creation");

// addBookBtn.addEventListener("click", () => {
//     // activate html element containing the form to input book details
    

// });
newBookSubmitBtn.addEventListener("submit", (event) => {
    event.preventDefault();  // prevents page refresh at form submit

    // retrieve form data
    const title = document.getElementById("newbook-title").value;
    const author = document.getElementById("newbook-author").value;
    const status = document.getElementById("newbook-status").checked;

    addBookToLibrary(title, author, status);
});
