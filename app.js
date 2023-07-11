'use strict';

// Retrieve elements form html document and attach functions
const newBookwindow = document.getElementById("book-creation-wrapper");
const addBookBtn = document.getElementById("add-btn");
const addBookCloseBtn = document.getElementById("newbook-close");
const newBookSubmitBtn = document.getElementById("book-creation");

const editBookWindow = document.getElementById("book-editing-wrapper");
const bookCloseBtn = document.getElementById("book-close");
const editBookSubmitBtn = document.getElementById("book-editing");
const checkboxBtn = document.getElementById("book-status");

const tableBtn = document.getElementById("tablemode");
const cardBtn = document.getElementById("cardmode");

const mainElement = document.getElementsByTagName("main")[0];
let CloseBtns;  // store all close button of each card
let editBtns;  // store all edit button of each card
let statusBtns; // store all eye button of each card



// Objects in the webpage
let library = [];  // store all books regardless of their reading status
let tableCount = 0;
let cardCount = 0;

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



// IMPORTANT: has to be set to none so that individual book card's edit window and add-new-book window
// can be shown (in drawCard()'s buttons and addBookBtn with event listener for opening the window)
editBookWindow.style.display = "none";
newBookwindow.style.display = "none";  

// the default display mode is the card mode
drawCard();  // populate main now that library[] has items
tableCount = 0;
cardCount = 1;  // set to 1 since we're at card mode



// Functions executed in web page

/**
 * Add all event listeners (for status buttons, edit buttons, and close buttons) 
 * needed for card mode and table mode to operate on books objects in library[]
 * @param {*} mode          string storing "card"/"table" to match the current book display mode
 * @param {*} CloseBtns     all close buttons in a card/table data
 * @param {*} statusBtns    all status buttons in a card/table data
 * @param {*} editBtns      all edit buttons in a card/table data
 */
function setBookEventListeners(mode, CloseBtns, statusBtns, editBtns) {
    CloseBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            let title;
            if (mode === "card") {
                // Retrieves the title of the book based on html element order
                title = btn.parentElement.parentElement.nextElementSibling.textContent; 
            } else if (mode === "table") {
                title = btn.parentElement.parentElement.firstElementChild.textContent;
            }
            
            removeBookFromLibrary(findBookInLibrary(title));
            displayBooks();  // only gets triggered when a button is clicked
        });
    });

    statusBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            let title;
            if (mode === "card") {
                title = btn.parentElement.parentElement.querySelector(".card-title").textContent;
            } else if (mode === "table") {
                title = btn.parentElement.parentElement.firstElementChild.textContent
            }

            if (btn.classList.contains("complete")) {
                btn.classList.remove("complete");
                btn.classList.add("incomplete");                
            } else {
                btn.classList.remove("incomplete");
                btn.classList.add("complete");
            }
            editStatusInLibrary(findBookInLibrary(title));
        });
    });

    editBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            if (editBookWindow.style.display === "none") {
                let title;
                if (mode === "card") {
                    title = btn.parentElement.parentElement.nextElementSibling.textContent;
                } else if (mode === "table") {
                    title = btn.parentElement.parentElement.firstElementChild.textContent;
                }

                // put book's title in the editing window
                editBookWindow.querySelector(".editedbook").textContent = title;

                editBookWindow.style.display = "block";  // show edit window to screen

                // change checkbox text and value in edit window to match the book being edited
                const bookObj = findBookInLibrary(title);
                editBookWindow.querySelector("#book-status").checked = bookObj.status;
                const checkboxText = editBookWindow.querySelector("#book-status").previousElementSibling;
                if (bookObj.status) {
                    checkboxText.textContent = "Completed";
                } else {
                    checkboxText.textContent = "Incomplete";
                }
              }
        });
    });
}


/**
 * Sets the book displayed in webpage to with a style for a complete/incomplete book, based on
 * the matching book object's status in library[]
 * @param {*} book book object
 * @param {*} cardElement HTML element of the status button
 */
function setBookStatus(book, statusElement) {
    if (book.status) {
        // book finished reading
        statusElement.classList.add("complete");
        statusElement.classList.remove("incomplete");
    } else {
        //  book not finished reading
        statusElement.classList.remove("complete");
        statusElement.classList.add("incomplete");
    }
}

/**
 * Switch between different display modes (card, table), depending on the user's choice
 */
function displayBooks() {
    if (tableCount == 1) {
        drawTable();
    } else if (cardCount == 1) {
        drawCard();
    }
}

/**
 * Redraws all books from library[] into a table data inside a table.
 * In this function, event listeners with their respective code are attached to 
 * the buttons within each table row.
 */
function drawTable() {
    mainElement.replaceChildren();  // remove all of main's children

    const table = document.createElement("table");
    mainElement.appendChild(table);

    // store header inside a thead tag
    const newHead = document.createElement("thead");
    newHead.innerHTML = `
        <tr>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">Status</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
        </tr>
    `   ;
    table.appendChild(newHead);

    // store all data inside tbody
    const tableBody = document.createElement("tbody");
    library.forEach(item => {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${item.title}</td>
            <td>${item.author}</td>
            <td><button class="table-status"></button></td>
            <td>
                <button class="table-edit"></button>
                <button class="table-close"></button>
            </td>
        `;

        const tableStatusElem = newRow.querySelector(".table-status");
        setBookStatus(item, tableStatusElem);

        tableBody.appendChild(newRow);
    });

    // by this point, tbody is populated with all books in library
    table.appendChild(tableBody);

    const statusBtns = document.querySelectorAll(".table-status");
    const editBtns = document.querySelectorAll(".table-edit");
    const closeBtns = document.querySelectorAll(".table-close");
    setBookEventListeners("table", closeBtns, statusBtns, editBtns);
}

/**
 * Function that redraws all the book cards based on the items inside library[].
 * In this function, event listeners with their respective code are attached to 
 * the buttons within each book card.
 */
function drawCard() {
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
        setBookStatus(item, cardStatusElem);

        mainElement.appendChild(newChild);
    });

        // add event listeners to card buttons

    const closeBtns = document.querySelectorAll(".card-close");
    const statusBtns = document.querySelectorAll(".card-status");
    const editBtns = document.querySelectorAll(".card-edit");
    setBookEventListeners("card", closeBtns, statusBtns, editBtns);
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
 * @param {*} book Book object
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
 * @param {*} book Book object
 */
function editStatusInLibrary(book) {
    if (typeof book !== "undefined") {
        book.status ? book.status = false : book.status = true;
    } else {
        console.log("Can't find specified book " + book.title + " to edit reading status");
    }
}

/**
 * Change a specified book from library[] into its new values from user input
 * @param {*} book          book object
 * @param {*} newTitle      string new title of the book
 * @param {*} newAuthor     string new author of the book
 * @param {*} newStatus     boolean new book reading status (true = complete, false = incomplete)
 */
function editBookInLibrary(book, newTitle, newAuthor, newStatus) {
    if (typeof book === "undefined") {
        console.log("Inputted book doesn't exist in the library");
        return;  // exit the function
    }

    if (newTitle !== "") {
        book.title = newTitle;
    }
    if (newAuthor !== "") {
        book.author = newAuthor;
    }
    book.status = newStatus;
}

/**
 * addNewBookToLibrary() checks if the book being added already exists in the library or not. If so,
 * do nothing. Otherwise, add it to the library .
 * @param {*} title     string title of the book
 * @param {*} author    string author of the book
 * @param {*} status    boolean true = completed reading, false = not yet finished
 */
function addBookToLibrary(title, author, status) {
    // checks if the book being created already exists in library
    const checker = findBookInLibrary(title);
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
    displayBooks();
    newBookwindow.style.display = "none";  // hide the book creation window
});
bookCloseBtn.addEventListener("click", () => {
    if (editBookWindow.style.display !== "none") {
        editBookWindow.style.display = "none";
      }
});
checkboxBtn.addEventListener("change", () => {
    // when the user clicks on the edit window's checkbox, change text
    if (checkboxBtn.checked) {
        // Checkbox value changes from unchecked to checked
        checkboxBtn.previousElementSibling.textContent = "Completed";
        console.log("CHECKED");
    } else {
        // Checkbox value changes from checked to unchecked
        checkboxBtn.previousElementSibling.textContent = "Incomplete";
        console.log("NOT CHECKED");
    }
});
editBookSubmitBtn.addEventListener("submit", (event) => {
    event.preventDefault();

    const newTitle = editBookWindow.querySelector("#book-title").value;
    const newAuthor = editBookWindow.querySelector("#book-author").value;
    const newStatus = editBookWindow.querySelector("#book-status").checked;

    // retrieve book title from edit window header
    const oldtitle = editBookWindow.querySelector(".editedbook").textContent;
    const oldbook = findBookInLibrary(oldtitle);
    editBookInLibrary(oldbook, newTitle, newAuthor, newStatus);
    displayBooks();
    
    // IMPORTANT: needed changes to edit window and its input elements to prepare for new data
    editBookWindow.querySelector(".editedbook").textContent = "";
    editBookWindow.querySelector("#book-title").value = "";
    editBookWindow.querySelector("#book-author").value = "";

    editBookWindow.style.display = "none";  // hides the edit window after submit
});
tableBtn.addEventListener("click", () => {
    tableCount = 1;
    cardCount = 0;

    // mainElement.classList.remove("main-card");
    // mainElement.classList.add("main-table");
    displayBooks();
});
cardBtn.addEventListener("click", () => {
    cardCount = 1;
    tableCount = 0;

    // mainElement.classList.remove("main-table");
    // mainElement.classList.add("main-card");
    displayBooks();
});