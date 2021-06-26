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
    `${+document.getElementById('inFormPagesNum').value}` || 'Leaved Blank!',
    `${document.getElementById('inFormNotes').value}` || 'Leaved Blank!',
    `${document.getElementById('inFormIsRead').checked}`,
    `${uniqId}`
  );

  myLibrary.push(submittedBook);
  printToScreen();
}

function printToScreen() {
  const { name, author, pages, description, isRead, uniqId } = submittedBook;

  booksWrap.insertAdjacentHTML(
    `afterbegin`,
    `
        <div class="book" data-id="${uniqId}">
        <h4 class="book-title">${name}</h4>
        <span class="book-author text-bold">${author}</span>
        <span class="book-pages float-right text-bold">${pages}</span>
        <div class="divider"></div>
        <p class="book-description">
          ${description}
        </p>
        <div class="book-footer">
          <div class="form-group float-right">
            <label class="form-switch">
              <input type="checkbox" ${isRead === 'true' ? 'checked' : ''}/>
              <i class="form-icon"></i>
              Is Read?
            </label>
          </div>
          <button class="btn btn-sm btn-action btn-error">
            <i class="icon icon-delete"></i>
          </button>
        </div>
        </div>
`
  );
  toggleModal();
}

function delBook(uniqID) {}
