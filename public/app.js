// TODO: Add a function to update isRead value, when user clicked on this in books list.
// TODO: Reference'yi okuyop App'i gelistir. (https://firebase.google.com/docs/reference/js/firebase.database?authuser=0)
// TODO: Descending Order (https://stackoverflow.com/a/44443042/13345848)

const form = document.getElementById('modal-id');
const booksWrap = document.querySelector('#books-wrap');

function toggleModal() {
  if (form.classList.contains('active')) {
    form.classList.remove('active');
  } else {
    form.classList.add('active');
  }
}
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
  appendBooks(
    submittedBook.uniqId,
    submittedBook.name,
    submittedBook.author,
    submittedBook.pages,
    submittedBook.description,
    submittedBook.isRead
  );
  toggleModal();
  updateBooksList();
}

function updateBooksList() {
  booksWrap.innerHTML = '';

  for (let book in getBooksFromFirebase) {
    const singleBook = document.createElement('div');
    singleBook.setAttribute('class', 'bookCard');
    booksWrap.insertAdjacentHTML(
      'afterbegin',
      `
        <div class="book" data-id="${getBooksFromFirebase[book].uniqId}">
        <h4 class="book-title">${getBooksFromFirebase[book].name}</h4>
        <span class="book-author text-bold">${
          getBooksFromFirebase[book].author
        }</span>
        <span class="book-pages float-right text-bold">${
          getBooksFromFirebase[book].pages
        }</span>
        <div class="divider"></div>
        <p class="book-description">
          ${getBooksFromFirebase[book].description}
        </p>
        <div class="book-footer">
          <div class="form-group float-right">
            <label class="form-switch">
              <input type="checkbox" ${
                getBooksFromFirebase[book].isRead === 'true' ? 'checked' : ''
              }/>
              <i class="form-icon"></i>
              Is Read?
            </label>
          </div>
          <button type="button" class="btn btn-sm btn-action btn-error" data-btn-id="${
            getBooksFromFirebase[book].uniqId
          }">
            <i class="icon icon-delete"></i>
          </button>
        </div>
        </div>
`
    );
    // booksWrap.appendChild(singleBook);
    let delBtn = document.querySelector(
      `[data-btn-id = "${getBooksFromFirebase[book].uniqId}"]`
    );
    delBtn.onclick = delBook;
  }
}

function delBook(bookId) {
  bookId = this.dataset.btnId;
  firebase
    .database()
    .ref('users/' + userId + '/books/' + bookId)
    .set(null);
  updateBooksList();
}
