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


function createWrapper(){
        const wrapper = document.createElement("section");
        wrapper.classList.add("mybooks");
        bookTable.appendChild(wrapper);
        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.classList.add('id','checkbox')
        wrapper.appendChild(checkbox)
        return(wrapper);
}


function appendBooks(value, wrapper){
    console.log(value)
    if (value == 'Read'|| value == 'Not Read'){
            const readButton = document.createElement("button")
            readButton.classList.add('readButtons')
            readButton.textContent = value;
            value == 'Read' ?  readButton.style.background = 'green' :  readButton.style.background = 'red';
            wrapper.appendChild(readButton)
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
     let libraryBook = [title.value, author.value, pages.value, readNotread.value]
     console.log(libraryBook)
     let wrapper = createWrapper();
     libraryBook.forEach((value) => appendBooks(value, wrapper))
     clearForm()
     
    })

 deleteIt.addEventListener('click', function() {
    const x = document.querySelectorAll(".checkbox")
    x.forEach(deleteEntry)
 })

 function deleteEntry(item){
    if (item.checked == true){
        item.parentNode.remove()
    }
 }

document.addEventListener('click',function(e){
    if(e.target && e.target.className== 'readButtons'){
        console.log(e.target.textContent)
        if(e.target.textContent == 'Read'){
            e.target.textContent = 'Not Read'
            e.target.style.background = 'red'
        }
            
        else{
            e.target.style.background = 'green'
            e.target.textContent = 'Read'
            e.target.style.border = 'solid 1px green'
            
        }
     }
 });