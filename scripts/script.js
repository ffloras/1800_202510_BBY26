
function logout() {
    firebase.auth().signOut().then(() => {
    }).catch((error) => {
      //an error happened
    });
}



