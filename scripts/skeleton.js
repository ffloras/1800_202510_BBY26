//sets the appropriate navbars and footer depending on the placeholder id added to the html page
function loadSkeleton() {

  firebase.auth().onAuthStateChanged(function (user) {
      if (user) {                   
          console.log($('#adoptNavbarPlaceholder').load('/html/components/adoptNavBar.html'));
          console.log($('#adoptFooterPlaceholder').load('/html/components/adoptFooter.html'));
          console.log($('#rehomeFooterPlaceholder').load('/html/components/rehomeFooter.html'));
          console.log($('#rehomeNavbarPlaceholder').load('/html/components/rehomeNavBar.html'));
      } else {
        console.log($('#adoptNavbarPlaceholder').load('/html/components/loginNavBar.html'));
        console.log($('#rehomeNavbarPlaceholder').load('/html/components/loginNavBar.html'));
      }
  });
}
loadSkeleton(); //invoke the function