

function loadSkeleton() {

  firebase.auth().onAuthStateChanged(function (user) {
      if (user) {                   
      // If the "user" variable is not null, then someone is logged in
          // User is signed in.
          // Do something for the user here.
          console.log($('#adoptNavbarPlaceholder').load('/html/Components/adoptNavBar.html'));
          console.log($('#adoptFooterPlaceholder').load('/html/Components/adoptFooter.html'));
          console.log($('#rehomeFooterPlaceholder').load('/html/Components/rehomeFooter.html'));
          console.log($('#rehomeNavbarPlaceholder').load('/html/Components/rehomeNavBar.html'));
          //if (user.metadata.creationTime == user.metadata.lastSignInTime) {
          //  console.log("new user");
      } else {
        console.log($('#adoptNavbarPlaceholder').load('/html/Components/loginNavBar.html'));
        console.log($('#rehomeNavbarPlaceholder').load('/html/Components/loginNavBar.html'));
        console.log($('#adoptFooterPlaceholder').load('/html/Components/laoptFooter.html'));
        console.log($('#rehomeFooterPlaceholder').load('/html/Components/rehomeFooter.html'));
      }
  });
}
loadSkeleton(); //invoke the function