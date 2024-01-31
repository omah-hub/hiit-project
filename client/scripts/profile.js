const uri = 'http://localhost:3000'

const token = window.localStorage.getItem('token')

async function getProfile() {
    const response = await fetch(`${uri}/profile`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    return data
}

async function getBooks() {
    const response = await fetch(`${uri}/books`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    return data
}

const user = await getProfile()
const books = await getBooks()
console.log(books)


const main = document.querySelector('main')

const profile = document.createElement('div')
profile.className = 'profile'
main.appendChild(profile)

const welcomeMsg = document.createElement('h2')
welcomeMsg.className = 'welcome'
welcomeMsg.innerText = `Hi, ${user.first_name}`
profile.appendChild(welcomeMsg)

const userEmail = document.createElement('p')
userEmail.className = 'userEmail'
userEmail.innerText = user.email
profile.appendChild(userEmail)

const editProfileBtn = document.createElement('button')
editProfileBtn.className = 'edit-profile'
editProfileBtn.innerText = 'Edit Profile'
profile.appendChild(editProfileBtn)

editProfileBtn.addEventListener('click', () => {
    editProfilePopup()
})

const userBooks = document.createElement('div')
userBooks.className = 'userBooks'
main.appendChild(userBooks)

const bookHeader = document.createElement('h3')
bookHeader.className = 'bookHeader'
bookHeader.innerText = 'Books'
userBooks.appendChild(bookHeader)

books.forEach((book, index) => {
   
    const book_container = document.createElement('div')
    book_container.key = index
    book_container.setAttribute('class', 'book-container')

    const book_title = document.createElement('h4')
    book_title.setAttribute('class', 'book-title')
    book_title.innerText = book.title


    const book_link_container = document.createElement('div');
    const book_link = document.createElement('a');
    //find what book.fileUrl is
    if (book.fileUrl) {
        book_link.href = book.fileUrl;
        book_link.target = '_blank'; // Open link in a new tab/window
        book_link.innerText = 'Open Book';
    } else {
        book_link.innerText = 'No document available';
    }
    const btn_container = document.createElement('div')
    btn_container.setAttribute('class', 'btn-container')
    const view_btn = document.createElement('button')
    view_btn.innerText = 'Edit'

    view_btn.addEventListener('click', () => {
        blogPopup(blog.id)
    })
    btn_container.appendChild(view_btn)

    book_link_container.appendChild(book_link);

    book_container.appendChild(book_title);
    book_link_container.appendChild(book_link);
    book_container.appendChild(book_link_container);
    userBooks.appendChild(book_container);
})

const editProfilePopup = () => {
    const cover = document.createElement('div')
    cover.className = 'cover'
    main.appendChild(cover)

    const profileForm = document.createElement('form')
    profileForm.className = 'profileForm'
    cover.appendChild(profileForm)

    const firstNameLabel = document.createElement('label')
    firstNameLabel.className = 'firstNameLabel'
    firstNameLabel.innerText = 'First Name'
    profileForm.appendChild(firstNameLabel)

    const firstNameInput = document.createElement('input')
    firstNameInput.type = 'text'
    firstNameInput.className = 'firstNameInput'
    firstNameInput.setAttribute('value', user.first_name)
    profileForm.appendChild(firstNameInput)

    const lastNameLabel = document.createElement('label')
    lastNameLabel.className = 'lastNameLabel'
    lastNameLabel.innerText = 'Last Name'
    profileForm.appendChild(lastNameLabel)

    const lastNameInput = document.createElement('input')
    lastNameInput.type = 'text'
    lastNameInput.className = 'lastNameInput'
    lastNameInput.setAttribute('value', user.last_name)
    profileForm.appendChild(lastNameInput)

    const emailLabel = document.createElement('label')
    emailLabel.className = 'emailLabel'
    emailLabel.innerText = 'Email'
    profileForm.appendChild(emailLabel)

    const emailInput = document.createElement('input')
    emailInput.type = 'email'
    emailInput.className = 'emailInput'
    emailInput.setAttribute('value', user.email)
    profileForm.appendChild(emailInput)

    const passwordLabel = document.createElement('label')
    passwordLabel.className = 'passwordLabel'
    passwordLabel.innerText = 'Password'
    profileForm.appendChild(passwordLabel)

    const passwordInput = document.createElement('input')
    passwordInput.type = 'password'
    passwordInput.className = 'passwordInput'
    profileForm.appendChild(passwordInput)

    const cpasswordLabel = document.createElement('label')
    cpasswordLabel.className = 'cpassword'
    cpasswordLabel.innerText = 'Confirm Password'
    profileForm.appendChild(cpasswordLabel)

    const btnContainer = document.createElement('div')
    btnContainer.className = 'btnContainer'
    profileForm.appendChild(btnContainer)

    const discardBtn = document.createElement('button')
    discardBtn.className = 'discardBtn'
    discardBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 96 960 960" width="30">
            <path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" fill='#ffffff'/>
            </svg>
            `
    discardBtn.addEventListener('click', (e) => {
        e.preventDefault()
        cover.classList.add('hide')
    })
    btnContainer.appendChild(discardBtn) 

    const confirmBtn = document.createElement('button')
    confirmBtn.className = 'confirmBtn'
    confirmBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 96 960 960" width="30">
            <path d="M378 810 154 586l43-43 181 181 384-384 43 43-427 427Z" fill='#ffffff'/>
            </svg>`
    confirmBtn.addEventListener('click', (e) => {
        e.preventDefault()
        cover.classList.add('hide')
    })
    btnContainer.appendChild(confirmBtn)
}


const bookPopup = (id) => {
    let [currentBook] = books.filter(book => book.id === id);
    console.log(currentBook);

    const bookCover = document.createElement('div');
    bookCover.className = 'cover';
    main.appendChild(bookCover);

    const bookContainer = document.createElement('div');
    bookContainer.className = 'bookContainer';
    bookCover.appendChild(bookContainer);

    const bookBtnContainer = document.createElement('div');
    bookBtnContainer.className = 'bookBtnContainer';
    bookContainer.appendChild(bookBtnContainer);

    const bookDiscardBtn = document.createElement('button');
    bookDiscardBtn.className = 'bookDiscardBtn';
    bookDiscardBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 96 960 960" width="30">
        <path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" fill='#ffffff'/>
        </svg>
        `;
    bookDiscardBtn.addEventListener('click', () => {
        bookCover.classList.add('hide');
    });
    bookBtnContainer.appendChild(bookDiscardBtn);

    const bookDeleteBtn = document.createElement('button');
    bookDeleteBtn.className = 'bookDeleteBtn';
    bookDeleteBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 96 960 960" width="30">
            <path d="M261 936q-24.75 0-42.375-17.625T201 876V306h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438V306ZM367 790h60V391h-60v399Zm166 0h60V391h-60v399ZM261 306v570-570Z" fill='#ffffff'/>
            </svg>
                `;
    bookDeleteBtn.addEventListener('click', () => {
        bookCover.classList.add('hide');
    });
    bookBtnContainer.appendChild(bookDeleteBtn);

    const bookConfirmBtn = document.createElement('button');
    bookConfirmBtn.className = 'bookConfirmBtn';
    bookConfirmBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 96 960 960" width="30">
            <path d="M378 810 154 586l43-43 181 181 384-384 43 43-427 427Z" fill='#ffffff'/>
            </svg>`;
    bookConfirmBtn.addEventListener('click', () => {
        bookCover.classList.add('hide');
    });
    bookBtnContainer.appendChild(bookConfirmBtn);

    const currentBookContainer = document.createElement('div');
    currentBookContainer.className = 'currentBookContainer';
    bookContainer.appendChild(currentBookContainer);

    const bookContent = document.createElement('div');
    bookContent.className = 'bookContent';
    currentBookContainer.appendChild(bookContent);

    const bookTitle = document.createElement('p');
    bookTitle.className = 'bookTitle';
    bookTitle.innerText = 'Title: ' + currentBook.title;
    bookContent.appendChild(bookTitle);

    const bookContentContainer = document.createElement('div');
    bookContentContainer.className = 'bookContentContainer';
    bookContent.appendChild(bookContentContainer);

    // Add an event listener to the file input
    document.getElementById('document').addEventListener('change', handleFileUpload);

    function handleFileUpload(event) {
        const fileInput = event.target;

        if (fileInput.files.length > 0) {
            const uploadedFile = fileInput.files[0];

            // Read the content of the uploaded document
            readDocumentContent(uploadedFile);
        }
    }

    function readDocumentContent(file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const documentContent = e.target.result;

            // Update the blog content with the document content
            updateBookContent(documentContent);
        };

        // Read the document as text (you may need to adjust this based on the document type)
        reader.readAsText(file);
    }

    function updateBookContent(documentContent) {
        // Replace the content of the blogContentContainer with the document content
        bookContentContainer.innerHTML = `<p>${documentContent}</p>`;
    }

const bookComments = document.createElement('div')
    bookComments.className = 'bookComments'
    currentBookContainer.appendChild(bookComments)

    if (currentBook.comments.length === 0) bookComments.className = 'bookComments hide'

    currentBook.comments.forEach(comment => {
        const eachComments = document.createElement('div')
        eachComments.className = 'eachComments'

        const name = document.createElement('h3')
        name.className = 'name'
        name.innerText = comment.name
        eachComments.appendChild(name)

        const body = document.createElement('p')
        body.className = 'body'
        body.innerText = comment.comment
        eachComments.appendChild(body)

        bookComments.appendChild(eachComments)
    })
}

const addBook = document.createElement('a')
addBook.className = 'addBook'
addBook.href = 'addBook.html'
addBook.innerText = 'Add Book'
main.appendChild(addBook)