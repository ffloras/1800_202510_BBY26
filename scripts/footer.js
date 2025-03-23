//changes the contact icon on footer based on user's "hasNotification" field
function setNotification() { 
  let currentUser = getUserID();
  if (currentUser != null) {
    db.collection("userProfiles").doc(currentUser).onSnapshot( (userDoc) => {
        let hasNotification = userDoc.data().hasNotification;
        if (hasNotification) {
          document.getElementById("contact-icon").src = "/images/fcontactAlert.png";
        } else {
          document.getElementById("contact-icon").src = "/images/fcontact.png";
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