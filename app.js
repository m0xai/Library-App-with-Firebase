// TODO: Add a function to update isRead value, when user clicked on this in books list.

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

  let submittedBook = new Book(
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

  !booksWrap.innerHTML ? listBooks() : '';

  for (let book of myLibrary) {
    const singleBook = document.createElement('div');
    singleBook.setAttribute('class', 'bookCard');
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
          <button type="button" class="btn btn-sm btn-action btn-error" data-btn-id="${
            book.uniqId
          }">
            <i class="icon icon-delete"></i>
          </button>
        </div>
        </div>
`;
    booksWrap.appendChild(singleBook);
    let delBtn = document.querySelector(`[data-btn-id = "${book.uniqId}"]`);
    delBtn.onclick = delBook;
  }
}

const listBooks = () => {
  return myLibrary.sort((a, b) => {
    return b.uniqId - a.uniqId;
  });
};

function delBook(bookId) {
  bookId = this.dataset.btnId;
  for (let book of myLibrary) {
    if (book.uniqId === bookId) {
      myLibrary.splice(myLibrary.indexOf(book), 1);
      console.log(myLibrary.indexOf(book));
      updateBooksList();
    }
  }
}
