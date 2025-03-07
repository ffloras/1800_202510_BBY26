function signUp() {
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let purpose;
  if (document.getElementById("adopt").checked) {
    purpose = document.getElementById("adopt").value;
  } else {
    purpose = document.getElementById("rehome").value;
  }

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
      + "<a href='/html/login.html'>Login</a>";
    } else {}
    // ..
  });

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      db.collection("userProfiles").doc(user.uid).set({
        email: user.email,
        name: null,
        housing: null,
        purpose: purpose,
        pastExperience: null,
        favorites: [],
        contacts: [],
        pets: []
      }).then(function () {
        console.log("New user added to firestore");
        if (purpose == "adopt") {
          window.location.assign("/html/AdoptBrowse.html");
        } else {
          window.location.assign("/html/RehomeMain.html");
        }
      }).catch(function (error) {
        console.log("Error adding new user: " + error);
      });
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
      db.collection("userProfiles").doc(user.uid).get().then(doc => {
        let userInfo = doc.data();
        if (userInfo.purpose == "rehome"){
          window.location = "/html/RehomeMain.html";
        } else {
          window.location = "/html/AdoptBrowse.html";
        }
      });
      
      
      
    }
    
  });
}
