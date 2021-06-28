var database = firebase.database();

function appendBooks(uniqId, name, author, pages, description, isRead) {
  firebase
    .database()
    .ref('books/' + uniqId)
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
let bookList = {};
var booksDataRef = firebase.database().ref('books/');

booksDataRef.on('value', (snapshot) => {
  getBooksFromFirebase = snapshot.val();
  console.log('getBooksFromFirebase: ', getBooksFromFirebase);

  function listBooks() {
    Object.keys(getBooksFromFirebase)
      .sort(function (a, b) {
        return getBooksFromFirebase[b].uniqId - getBooksFromFirebase[a].uniqId;
      })
      .forEach(function (key) {
        bookList[key] = getBooksFromFirebase[key];
      });
  }
  listBooks();
  updateBooksList(); // Call it, in order to list all books on load.
});
