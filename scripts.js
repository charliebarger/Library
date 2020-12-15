let bookTable = document.querySelector(".bookTable")
let myLibrary = []
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const readNotread = document.getElementById('readNotread');
const submit = document.getElementById('submitIt')
let placement = 0;
const deleteIt = document.getElementById("delete")
let readbuttons;
let wrapper;

function Book(author, title, pages, read){
    this.author = author;
    this.title = title
    this.pages = pages
    this.read = read
    
}

function addBooktoLibrary(title, author, pages, readNotread){
    let newBook = new Book(title, author, pages, readNotread);
    myLibrary.push(newBook)
}

function display(){
    const displayedBooks = document.querySelectorAll('.mybooks')
    displayedBooks.forEach((book) => book.remove())
    let x = myLibrary.length -1 ;
    for (x; x >= 0; x--){
        let place = myLibrary[x]
        wrapper = createWrapper(myLibrary[x])
        for (item in place) {
            appendBooks(myLibrary[x], place[item], wrapper)
        }
    }
}

let splicePlace = []
function createWrapper(item){
        const wrapper = document.createElement("section");
        wrapper.classList.add("mybooks");
        bookTable.appendChild(wrapper);
        const checkbox = document.createElement('input');
        checkbox.addEventListener('change', () => {
            if (checkbox.checked){
                splicePlace.push(myLibrary.indexOf(item))
            }
            else {
                let index = splicePlace.indexOf(myLibrary.indexOf(item))
                splicePlace.splice(index, 1)
            }
    
    })
        checkbox.type = "checkbox";
        checkbox.classList.add('id','checkbox')
        wrapper.appendChild(checkbox)
        return(wrapper);
}


function appendBooks(item, value, wrapper){
    if (value == 'Read'|| value == 'Not Read'){
            const readButton = document.createElement("button")
            readButton.classList.add('readButtons')
            readButton.textContent = value;
            value == 'Read' ?  readButton.style.background = 'green' :  readButton.style.background = 'red';
            wrapper.appendChild(readButton)
            readButton.addEventListener('click', function(){
                if (item.read == 'Read'){
                    item.read = 'Not Read'
                }
                else{
                    item.read = 'Read'
                }
                display()
            })
    }
    else{
        const bookDetail = document.createElement("span")
        bookDetail.textContent = value;
        wrapper.appendChild(bookDetail);
    }
}

function clearForm(){
    title.value = author.value = pages.value = ""
}

 submit.addEventListener('click', function(e) {
     if (!title.value || !author.value || !pages.value){
         return
     }
     e.preventDefault()
     addBooktoLibrary(title.value, author.value, pages.value, readNotread.value)
     display()
     clearForm()
     
    })

let deleteClicked = false;
 deleteIt.addEventListener('click', function() {
    splicePlace.forEach((place) => {
        myLibrary.splice(place, 1)
    })
    display()
 })


 function deleteEntry(item){
    deleteClicked = true;
 }
