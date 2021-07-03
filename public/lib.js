// TODO: Update read status on click in list.
// TODO: Add Tooltip animations when added or deleted books.
// TODO: Add Book images as background or an item and add onclick pop-up with details for every book.
// TODO: Make a good looking home page.
// TODO: Show card items also as a list.
// TODO: Add starting date.
// TODO: Show comments can be a opening box item in PrimerCSS
// TODO: Show two items side by side on mobile.

const database = firebase.database();
const auth = firebase.auth();

const modal = document.getElementById('myModal');
const toggleModalBtn = document.getElementById('toggleModalBtn');
toggleModalBtn.onclick = toggleModal;

function toggleModal() {
  if (modal.style.display == 'block') {
    modal.style.display = 'none';
  } else if (modal.style.display == 'none') {
    modal.style.display = 'block';
  }
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

let userDisplayId,
  userDisplayName = '';

const displayNameWrap = document.getElementById('displayNameWrap');
const displayIdWrap = document.getElementById('displayIdWrap');
const signOutBtn = document.getElementById('signOutBtn');
signOutBtn.onclick = () => auth.signOut();

auth.onAuthStateChanged((user) => {
  if (user) {
    if (window.location.href.indexOf('library.html') == -1) {
      window.location.replace('library.html');
    }
    userDisplayId = user.uid;
    userDisplayName = user.displayName;

    displayIdWrap.innerHTML = `ID: ${userDisplayId}`;
    displayNameWrap.innerHTML = `${userDisplayName}`;
  } else {
    if (window.location.href.indexOf('index.html') == -1) {
      window.location.replace('index.html');
    }
  }
});

// Library Stuff
function appendBooks(uniqId, name, author, pages, description, isRead) {
  firebase
    .database()
    .ref('/users/' + userDisplayId + '/books/' + uniqId)
    .set({
      uniqId: uniqId,
      name: name,
      author: author,
      pages: pages,
      description: description,
      isRead: isRead,
    });
}

let getBooksFromFirebase;
var booksDataRef = firebase.database().ref(`users/`);

booksDataRef.on('value', (snapshot) => {
  getBooksFromFirebase = snapshot.child(userDisplayId).child('/books').val();

  console.log('getBooksFromFirebase: ', getBooksFromFirebase);
  updateBooksList(); // Call it, in order to list all books on load.
});

const form = document.getElementById('modal-id');
const booksWrap = document.querySelector('#books-wrap');

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
  if (getBooksFromFirebase == null) {
    booksWrap.innerHTML = `
      <div class="blankslate blankslate-large">
        <img src="https://ghicons.github.com/assets/images/blue/png/Pull%20request.png" alt="" class="mb-3" />
        <h3 class="mb-1">You don’t seem to have any books.</h3>
        <p>Here your books listed. You can Add/Delete or Edit them.</p>
        <button class="btn btn-primary my-3" data-btn-home="true" type="button">New book</button>
        <p><button class="btn-link" type="button">Learn more</button></p>
      </div>
    `;
    let btnHome = document.querySelector(`[data-btn-home = "true"]`);
    btnHome.onclick = toggleModal;
  } else {
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
          <button type="button" class="btn btn-danger" data-btn-id="${
            getBooksFromFirebase[book].uniqId
          }"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M6.5 1.75a.25.25 0 01.25-.25h2.5a.25.25 0 01.25.25V3h-3V1.75zm4.5 0V3h2.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H5V1.75C5 .784 5.784 0 6.75 0h2.5C10.216 0 11 .784 11 1.75zM4.496 6.675a.75.75 0 10-1.492.15l.66 6.6A1.75 1.75 0 005.405 15h5.19c.9 0 1.652-.681 1.741-1.576l.66-6.6a.75.75 0 00-1.492-.149l-.66 6.6a.25.25 0 01-.249.225h-5.19a.25.25 0 01-.249-.225l-.66-6.6z"></path></svg>
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
}

function delBook(bookId) {
  bookId = this.dataset.btnId;
  firebase
    .database()
    .ref('users/' + userDisplayId + '/books/' + bookId)
    .set(null);
  updateBooksList();
}
