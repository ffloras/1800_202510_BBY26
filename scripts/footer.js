//changes the contact icon on footer based on user's "hasNotification" field
function setNotification() { 
  let currentUser = getUserID();
  if (currentUser != null) {
    db.collection("userProfiles").doc(currentUser).onSnapshot( (userDoc) => {
        let hasNotification = userDoc.data().hasNotification;
        if (hasNotification) {
          document.getElementById("contact-icon").src = "/images/fContactAlert.png";
        } else {
          document.getElementById("contact-icon").src = "/images/fContact.png";
        }
        
      })
  }

}

setNotification();



//obtain user ID from current user's firebase authenication account.
function getUserID() {
  let user = firebase.auth().currentUser;
  if (user !== null) {
    return user.uid;
  } else {
    return null;
  }
}

// function highlightIcons() {
//   const icon = document.querySelectorAll('.toggle');

//   icon.forEach((element) => {
//     element.addEventListener('click', () => {
//         element.classList.toggle('active');
//     });
//   });
// }