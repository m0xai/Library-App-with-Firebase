var database = firebase.database();

const auth = firebase.auth();

const whenSignedIn = document.getElementById('whenSignedIn');
const whenSignedOut = document.getElementById('whenSignedOut');
const signInBtn = document.getElementById('signInBtn');
const signOutBtn = document.getElementById('signOutBtn');
const userDetails = document.getElementById('userDetails');

const provider = new firebase.auth.GoogleAuthProvider();

signInBtn.onclick = () => auth.signInWithPopup(provider);

let userId = '';

auth.onAuthStateChanged((user) => {
  if (user) {
    userId = user.uid; // Get user ID to Global Scope
    signInBtn.hidden = true;
    signOutBtn.hidden = false;
    whenSignedIn.hidden = false;
    userDetails.innerHTML = `<h3>Hello ${user.displayName}!</h3><p> USER ID: ${user.uid} </p>`;
  } else {
    signInBtn.hidden = false;
    signOutBtn.hidden = true;
    userDetails.innerHTML = ``;
  }
});

signOutBtn.onclick = () => auth.signOut();

// Library Stuff
function appendBooks(uniqId, name, author, pages, description, isRead) {
  firebase
    .database()
    .ref('/users/' + userId + '/books/' + uniqId)
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
var booksDataRef = firebase.database().ref(`users/`).orderByKey();

booksDataRef.on('value', (snapshot) => {
  getBooksFromFirebase = snapshot.child(userId).child('/books').val();

  console.log('getBooksFromFirebase: ', getBooksFromFirebase);
  updateBooksList(); // Call it, in order to list all books on load.
});
