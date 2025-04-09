//logs out user when logout button is clicked
function logout() {
    firebase.auth().signOut().then(() => {
    }).catch((error) => {
      //an error happened
    });
}



