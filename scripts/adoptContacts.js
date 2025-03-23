async function displayPetContacts() {
    let cardTemplate = document.getElementById("pet-contact");
    let ID = await getUserID();

    db.collection("userProfiles").doc(ID).get()
    .then(user => {
        var interested = user.data().interested;

        console.log(interested);

        interested.forEach(inter => {
            if (inter != "") {
                db.collection("petProfiles").doc(inter).get()
                .then(doc => {
                    var petName = doc.data().name;
                    var petImage = doc.data().petCode;
                    var owner = doc.data().ownerID;

                    var newcard = cardTemplate.content.cloneNode(true);

                    newcard.querySelector(".pet-image").src = "data:image/png;base64," + petImage;
                    newcard.querySelector(".pet-name").innerHTML = "NAME: " + petName;

                    document.getElementById("contacts-go-here").appendChild(newcard);
                })
            }
        })
    })
}

displayPetContacts();

function getUserID() {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log("User is logged in:", user.uid);
          resolve(user.uid);
        } else {
          console.log("User is not logged in.");
          reject("No user is signed in");
          window.location = "/html/login.html";
        }
      });
    });
  }