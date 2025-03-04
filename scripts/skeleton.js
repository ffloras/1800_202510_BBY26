

function loadSkeleton() {

  firebase.auth().onAuthStateChanged(function (user) {
      if (user) {                   
      // If the "user" variable is not null, then someone is logged in
          // User is signed in.
          // Do something for the user here.
          console.log($('#adoptNavbarPlaceholder').load('/html/Components/AdoptNavBar.html'));
          console.log($('#adoptFooterPlaceholder').load('/html/Components/AdoptFooter.html'));
          console.log($('#rehomeFooterPlaceholder').load('/html/Components/RehomeFooter.html'));
          console.log($('#rehomeNavbarPlaceholder').load('/html/Components/RehomeNavBar.html'));
          //if (user.metadata.creationTime == user.metadata.lastSignInTime) {
          //  console.log("new user");
      } else {
        console.log($('#navbarPlaceholder').load('/html/Components/LoginNavBar.html'));
        console.log($('#adoptFooterPlaceholder').load('/html/Components/AdoptFooter.html'));
        console.log($('#rehomeFooterPlaceholder').load('/html/Components/RehomeFooter.html'));
      }
  });
}
loadSkeleton(); //invoke the function