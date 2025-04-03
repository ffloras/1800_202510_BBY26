/*
colours:
- #3E5F90
- #9DB8E0
- #D8D0A3
*/

function loadSkeleton() {

  firebase.auth().onAuthStateChanged(function (user) {
      if (user) {                   
      // If the "user" variable is not null, then someone is logged in
          // User is signed in.
          // Do something for the user here.
          console.log($('#adoptNavbarPlaceholder').load('/html/components/adoptNavBar.html'));
          console.log($('#adoptFooterPlaceholder').load('/html/components/adoptFooter.html'));
          console.log($('#rehomeFooterPlaceholder').load('/html/components/rehomeFooter.html'));
          console.log($('#rehomeNavbarPlaceholder').load('/html/components/rehomeNavBar.html'));
          //if (user.metadata.creationTime == user.metadata.lastSignInTime) {
          //  console.log("new user");
      } else {
        console.log($('#adoptNavbarPlaceholder').load('/html/components/loginNavBar.html'));
        console.log($('#rehomeNavbarPlaceholder').load('/html/components/loginNavBar.html'));
      }
  });
}
loadSkeleton(); //invoke the function