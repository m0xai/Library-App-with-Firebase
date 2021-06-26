const form = document.getElementById('modal-id');
const booksWrap = document.querySelector('#books-wrap');
function toggleModal() {
  if (form.classList.contains('active')) {
    form.classList.remove('active');
  } else {
    form.classList.add('active');
  }
}

let myLibrary = [];
let submittedBook;

class Book {
  constructor(name, author, pages, description, isRead, uniqId) {
    (this.name = name),
      (this.author = author),
      (this.pages = pages),
      (this.description = description),
      (this.isRead = isRead),
      (this.uniqId = uniqId);
  }
}

function formSubmit() {
  let uniqId = Date.now();

  submittedBook = new Book(
    `${document.getElementById('inFormBookName').value}` || 'Leaved Blank!',
    `${document.getElementById('inFormAuthorName').value}` || 'Leaved Blank!',
    `${document.getElementById('inFormPagesNum').value}` || 'Leaved Blank!',
    `${document.getElementById('inFormNotes').value}` || 'Leaved Blank!',
    `${document.getElementById('inFormIsRead').checked}`,
    `${uniqId}`
  );

  myLibrary.push(submittedBook);
  toggleModal();
  updateBooksList();
}

function updateBooksList() {
  booksWrap.innerHTML = '';
  for (let book of myLibrary) {
    let singleBook = document.createElement('div');
    singleBook.innerHTML = `
        <div class="book" data-id="${book.uniqId}">
        <h4 class="book-title">${book.name}</h4>
        <span class="book-author text-bold">${book.author}</span>
        <span class="book-pages float-right text-bold">${book.pages}</span>
        <div class="divider"></div>
        <p class="book-description">
          ${book.description}
        </p>
        <div class="book-footer">
          <div class="form-group float-right">
            <label class="form-switch">
              <input type="checkbox" ${
                book.isRead === 'true' ? 'checked' : ''
              }/>
              <i class="form-icon"></i>
              Is Read?
            </label>
          </div>
          <button class="btn btn-sm btn-action btn-error" onclick="console.log(${
            book.uniqId
          })">
            <i class="icon icon-delete"></i>
          </button>
        </div>
        </div>
`;
    booksWrap.appendChild(singleBook);
  }
}

// function delBook(bookId) {
//   for (let book of myLibrary) {
//     if (book.uniqId === bookId) {
//       myLibrary.splice(book, 1);
//       console.log(myLibrary.indexOf(book));
//       updateBooksList();
//     }
//   }
// }
