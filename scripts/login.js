function signUp() {
  let email = document.getElementById("email");
  let password = document.getElementById("password");

  firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(password.checkValidity);
    if (errorCode && email.checkValidity() && password.checkValidity()) {
      document.getElementById("unsuccessfulLogin").innerHTML = "You already have an account. "
      + "<a href='/login.html'>Login</a>";
    } else {}
    // ..
  });

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      window.location = "/html/RehomeBrowse.html";
    }
  });
}


function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode) {
      document.getElementById("unsuccessfulLogin").innerHTML = "Incorrect email or password";
    }
  });

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      window.location = "/html/RehomeBrowse.html";
    }
    
  });
}
