// const uri = 'http://127.0.0.1:5000'
const uri = 'http://localhost:3000'
const token = window.localStorage.getItem('token')
// console.log('Token:', token);

async function getAllBooks() {
    const response = await fetch(`${uri}/books/`);
    const data = await response.json();
    return data
 
    
}

const allBooks = await getAllBooks()

const main = document.querySelector('main')

allBooks.forEach((book, index) => {
    
    const book_container = document.createElement('div')
    book_container.key = index
    book_container.setAttribute('class', 'book-container')

    const book_title = document.createElement('p')
    book_title.setAttribute('class', 'book-title')
    book_title.innerText = book.title

    const book_author = document.createElement('p')
    book_author.setAttribute('class', 'book-authur')
    book_author.innerText =`by: ${book.author}`

    const book_link_container = document.createElement('div');
    const book_link = document.createElement('a');
    
    if (book.fileUrl) {
        book_link.href = book.fileUrl;
        book_link.target = '_blank'; // Open link in a new tab/window
        book_link.innerText = 'Open Book';
    } else {
        book_link.innerText = 'No document available';
    }

    book_link_container.appendChild(book_link);


    const btn_container = document.createElement('div')
    btn_container.setAttribute('class', 'btn-container')
    const view_btn = document.createElement('button')
    view_btn.innerText = 'View'

    view_btn.addEventListener('click', () => {
        let params = new URLSearchParams();
        params.set('bookId', book.id);
        window.location.href = `e-book.html?${params.toString()}`
    })
    btn_container.appendChild(view_btn)

//book_file is blog_body
    book_container.appendChild(book_title)
    book_container.appendChild(book_author)
    book_container.appendChild(book_link_container);
    book_container.appendChild(btn_container)
    main.appendChild(book_container)
})

if (token) {    // ensures only authenticated users can add a new blog
    const addBook = document.createElement('a')
    addBook.className = 'addBook'
    addBook.href = 'addbook.html'
    addBook.innerText = 'Add Book'
    main.appendChild(addBook)
}
// console.log('Script is running!');
