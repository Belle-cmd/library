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

function addBookToLibrary() {}

function removeBookFromLibrary() {}

function editBookInLibrary() {}


// Retrieve elements form html document and attach functions
const addBookBtn = document.getElementById("add-btn");
const createBookSubmit = document.getElementById("book-creation");

addBookBtn.addEventListener("click", () => {
    // activate html element containing the form to input book details
    

    // retrieve book title, author, status
    // add book to library list
    // add book to list based on status (complete, incomplete)
});
createBookSubmit.addEventListener("click", addBookToLibrary);
