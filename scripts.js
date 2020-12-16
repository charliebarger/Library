let bookTable = document.querySelector(".bookTable")
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const readNotread = document.getElementById('readNotread');
const submit = document.getElementById('submitIt')
let placement = 0;
const deleteIt = document.getElementById("delete")
let readbuttons;
let wrapper;
let splicePlace = []

let myLibrary = localStorage.getItem('library')
  ? JSON.parse(localStorage.getItem('library'))
  : []
localStorage.setItem('library', JSON.stringify(myLibrary))
const data = JSON.parse(localStorage.getItem('library'))

//constructor
function Book(author, title, pages, read){
    this.author = author;
    this.title = title
    this.pages = pages
    this.read = read
}

//create new instance of Book and add to myLibrary
function addBooktoLibrary(title, author, pages, readNotread){
    let newBook = new Book(title, author, pages, readNotread);
    myLibrary.push(newBook)
}

//remove all book then call append for myLibrary items in reverse order (so that last added is appended to the top)
function display(){
    setLocalStorage()
    const displayedBooks = document.querySelectorAll('.mybooks')
    displayedBooks.forEach((book) => book.remove())
    let x = myLibrary.length -1 ;
    for (x; x >= 0; x--){
        let bookPosition = myLibrary[x]
        wrapper = createWrapper(myLibrary[x])
        for (item in bookPosition) {
            appendBookitems(bookPosition, bookPosition[item], wrapper)
        }
    }
}

//functions

//clear local storage and set it to myLibrary
function setLocalStorage(){
    localStorage.clear()
    localStorage.setItem('library', JSON.stringify(myLibrary))
}

//create a wrapper, add a checkbox to it, and return it
function createWrapper(book){
    const wrapper = document.createElement("section");
    wrapper.classList.add("mybooks");
    bookTable.appendChild(wrapper);
    createCheckbox(wrapper, book)
    return(wrapper);
}

function createCheckbox(wrapper, book){
    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.classList.add('id','checkbox')
    wrapper.appendChild(checkbox)
    checkboxListner(checkbox, book)
}

//records the indexOf an item in my library and appends it to the array, splicePlace when checked and removes it when unchecked
function checkboxListner(checkbox, book){
    checkbox.addEventListener('change', () => {
        if (checkbox.checked){
            splicePlace.push(myLibrary.indexOf(book))
        }
        else {
            let index = splicePlace.indexOf(myLibrary.indexOf(book))
            splicePlace.splice(index, 1)
        }
    })
}

//appends book items to the book wrapper
function appendBookitems(book, value, wrapper){
    if (value == 'Read'|| value == 'Not Read'){
        createReadbutton(book, value, wrapper)
    }
    else{
        createBookContent(value, wrapper)
    }
}

function createBookContent(value, wrapper){
    const bookDetail = document.createElement("span")
    bookDetail.textContent = value;
    wrapper.appendChild(bookDetail);
}

//create and appends read button, and changes color based on value 
function createReadbutton(book, value, wrapper){
    const readButton = document.createElement("button")
    readButton.classList.add('readButtons')
    readButton.textContent = value;
    value == 'Read' ? readButton.setAttribute("style", "background-color: green ; border: green solid 1px") :  readButton.style.background = 'red';
    wrapper.appendChild(readButton)
    readButtonListner(readButton, book)
}

//changes read value inside of particular book in myLibrary and calls display agian
function readButtonListner(button, book){
    button.addEventListener('click', function(){
    if (book.read == 'Read'){
        book.read = 'Not Read'
    }
    else{
        book.read = 'Read'
    }
    display()
    })
}

//on load display each item in data (variable holding js readable LocalStorage)
data.forEach((item) => {
    display()
})

//clear the inputs
function clearForm(){
    title.value = author.value = pages.value = ""
}

//event Listeners

//if any values are false return in order to retain default functionality 
submit.addEventListener('click', function(e) {
    if (!title.value || !author.value || !pages.value){
        return
    }
    e.preventDefault()
    addBooktoLibrary(title.value, author.value, pages.value, readNotread.value)
    display()
    clearForm()
})

//sort and reverse splice order so that splice by numbers is not disrupted by changing item positions in myLibrary
deleteIt.addEventListener('click', function() {
    splicePlace.sort().reverse()
    splicePlace.forEach((place) => {
        myLibrary.splice(place, 1)
    })
    splicePlace = []
    display()
})