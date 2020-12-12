let bookTable = document.querySelector(".bookTable")
let myLibrary = []
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const readNotread = document.getElementById('readNotread');
const submit = document.getElementById('submitIt')
let placement = 0;

function Book(author, title, pages, read){
    this.author = author;
    this.title = title
    this.pages = pages
    this.read = read
}

function addBooktoLibrary(title, author, pages, readNotread){
    let newBook = new Book(title, author, pages, readNotread);
    myLibrary.push(newBook)
    loopArray()
}

function loopArray(){
    let wrapper = createWrapper();

    for (let key in myLibrary[placement]){
        let value = myLibrary[placement][key]
        appendBooks(key, value, wrapper)
    }
    placement++
}

function createWrapper(){
        const wrapper = document.createElement("section");
        wrapper.classList.add("mybooks");
        bookTable.appendChild(wrapper);
        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        wrapper.appendChild(checkbox)
        return(wrapper);
}


function appendBooks(key, value, wrapper){
    if (key == 'read'){
        const readButton = document.createElement("button")
        readButton.classList.add('readButtons')
        readButton.textContent = value
        wrapper.appendChild(readButton)
    }
    else{
        const bookDetail = document.createElement("span")
        bookDetail.textContent = value;
        wrapper.appendChild(bookDetail);
    }

}

clearForm(){

}

 submit.addEventListener('click', function(e) {
     if (!title.value || !author.value || !pages.value){
         return
     }
     e.preventDefault()
     addBooktoLibrary(title.value, author.value, pages.value, readNotread.value)
 })

