

function loadSkeleton() {

  firebase.auth().onAuthStateChanged(function (user) {
      if (true) {                   
      // If the "user" variable is not null, then someone is logged in
          // User is signed in.
          // Do something for the user here.
          console.log($('#navbarPlaceholder').load('/html/Components/AdoptNavBar.html'));
          console.log($('#footerPlaceholder').load('/html/Components/AdoptFooter.html'));
          //if (user.metadata.creationTime == user.metadata.lastSignInTime) {
          //  console.log("new user");
      } else {
        console.log($('#navbarPlaceholder').load('/html/Components/LoginNavBar.html'));
      }
  });
}
loadSkeleton(); //invoke the function