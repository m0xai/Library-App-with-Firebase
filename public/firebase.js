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
var booksList = firebase.database().ref('books/');
booksList.on('value', (snapshot) => {
  getBooksFromFirebase = snapshot.val();
  console.log(getBooksFromFirebase);
});
