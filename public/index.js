const database = firebase.database();
const auth = firebase.auth();
const signInBtn = document.getElementById('signInBtn');

const provider = new firebase.auth.GoogleAuthProvider();
signInBtn ? (signInBtn.onclick = () => auth.signInWithPopup(provider)) : false;

auth.onAuthStateChanged((user) => {
  if (user) {
    if (window.location.href.indexOf('library.html') == -1) {
      window.location.replace('library.html');
    }
    userDisplayId = user.uid;
  } else {
    if (window.location.href.indexOf('index.html') == -1) {
      window.location.replace('index.html');
    }
  }
});
