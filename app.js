'use strict';

// Retrieve elements form html document and attach functions
const newBookwindow = document.getElementById("book-creation-wrapper");
const addBookBtn = document.getElementById("add-btn");
const addBookCloseBtn = document.getElementById("newbook-close");
const newBookSubmitBtn = document.getElementById("book-creation");

const mainElement = document.getElementsByTagName("main")[0];
let allCloseElements;  // store all close button of each card
let allEditElements;  // store all edit button of each card
let allReadElements; // store all eye button of each card



// Objects in the webpage
let library = [];  // store all books regardless of their reading status

function Book(title, author, status) {
    this.title = title;
    this.author = author;
    this.status = status;
}

// Populate library with dummy books
const book1 = new Book("Feeling Good", "David D. Burns", false);
const book3 = new Book("Frankenstein", "Mary Shelley", true);
const book2 = new Book("The Picture of Dorian Gray", "Oscar Wilde", false);
const book4 = new Book("The Power of Habit", "Charles Duhigg", true);
const book5 = new Book("Dracula", "Bram Stoker", true);
const book6 = new Book("C Programming Language", "Kerninghan Ritchie", false);
library.push(book1, book2, book3, book4, book5, book6);



// populate main now that library[] has items
drawCards();  



// Functions executed in web page

/**
 * Function that redraws all the book cards based on the items inside library[].
 * In this function, event listeners with their respective code are attached to 
 * the buttons within each book card.
 */
function drawCards() {
    mainElement.replaceChildren();  // remove all of main's children

    library.forEach(item => {
        const markup = `
            <div class="card-img">
                <div class="card-options">
                    <button class="card-edit"></button>
                    <button class="card-close"></button>
                </div>
                <button class="card-status"></button>
                <img src="/images/default-book.svg" alt="">
            </div>
            <p class="card-title">${item.title}</p>
            <p class="card-author">${item.author}</p>
        `;

        const newChild = document.createElement("div");
        newChild.classList.add("card");
        newChild.innerHTML = markup;

        // retrieve the button with the card-status class and add the classes that change
        // its button's color based on the user's reading progress (complete/incomplete)
        const cardStatusElem = newChild.querySelector(".card-status");
        if (item.status) {
            // book finished reading
            cardStatusElem.classList.add("complete");
            cardStatusElem.classList.remove("incomplete");
        } else {
            //  book not finished reading
            cardStatusElem.classList.remove("complete");
            cardStatusElem.classList.add("incomplete");
        }

        mainElement.appendChild(newChild);
    });

    // Attach event listeners to each card drawn

    allCloseElements = document.querySelectorAll(".card-close");
    allCloseElements.forEach(btn => {
        btn.addEventListener("click", () => {
            // Retrieves the title of the book based on html element order
            const title = btn.parentElement.parentElement.nextElementSibling.textContent; 
            removeBookFromLibrary(findBookInLibrary(title));
            drawCards();  // only gets triggered when a button is clicked
        });
    });

    allReadElements = document.querySelectorAll(".card-status");
    allReadElements.forEach(btn => {
        btn.addEventListener("click", () => {
            const title = btn.parentElement.parentElement.querySelector(".card-title").textContent; 
            if (btn.classList.contains("complete")) {
                btn.classList.remove("complete");
                btn.classList.add("incomplete");                
            } else {
                btn.classList.remove("incomplete");
                btn.classList.add("complete");
            }
            editStatusInLibrary(findBookInLibrary(title));
            console.log(library);
        });
    });
}

/**
 * Helper function to find a particular book in the library, based on a book title
 * @param {*} title string book title
 * @returns Book object
 */
function findBookInLibrary(title) {
    return library.find(item => item.title == title);
}

/**
 * Remove book from library[], based on book title
 * @param {*} title string book title
 */
function removeBookFromLibrary(book) {
    if (typeof book !== "undefined") {
        const target = library.indexOf(book);
        library.splice(target, 1);
    } else {
        console.log("Can't find specified book " + book.title + " to delete");
    }

}

/**
 * Edit book reading status based on titile
 * @param {*} title string book title
 */
function editStatusInLibrary(book) {
    if (typeof book !== "undefined") {
        book.status ? book.status = false : book.status = true;
    } else {
        console.log("Can't find specified book " + book.title + " to edit reading status");
    }
}


function editBookInLibrary() {}


function listMode() {}

/**
 * addNewBookToLibrary() checks if the book being added already exists in the library or not. If so,
 * do nothing. Otherwise, add it to the library .
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
        console.log("New book added");
    } else {
        console.log("Book already exists");
    }
}



// Event listeners not in book cards triggered by users

addBookBtn.addEventListener("click", () => {
    // Enable new-book-window to appear and disappear at button press
    if (newBookwindow.style.display === "none") {
        newBookwindow.style.display = "block";
      } else {
        newBookwindow.style.display = "none";
      }
});
addBookCloseBtn.addEventListener("click", () => {
    // Enable new-book-window to disappear at button press
    if (newBookwindow.style.display !== "none") {
        newBookwindow.style.display = "none";
      }
});
newBookSubmitBtn.addEventListener("submit", (event) => {
    event.preventDefault();  // prevents page refresh at form submit

    // Retrieve form data
    const title = document.getElementById("newbook-title").value;
    const author = document.getElementById("newbook-author").value;
    const status = document.getElementById("newbook-status").checked;

    addBookToLibrary(title, author, status);
    drawCards();
    newBookwindow.style.display = "none";  // hide the book creation window
});