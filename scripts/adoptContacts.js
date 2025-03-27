async function displayPetContacts() {
    let cardTemplate = document.getElementById("pet-contact");
    let ID = await getUserID();

    db.collection("userProfiles").doc(ID).get()
    .then(user => {
        var interested = user.data().interested;

        var contacts = user.data().contacts;

        interested.forEach(inter => {
            if (inter != "") {
                db.collection("petProfiles").doc(inter).get()
                .then(doc => {
                    var petName = doc.data().name;
                    var petImage = doc.data().petCode;

                    var newcard = cardTemplate.content.cloneNode(true);

                    newcard.querySelector(".pet-image").src = "data:image/png;base64," + petImage;
                    newcard.querySelector(".pet-name").innerHTML = "NAME: " + petName;
                    newcard.querySelector(".request-status").innerHTML = "REQUEST PENDING";

                    document.getElementById("contacts-go-here").appendChild(newcard);
                })
            }
        })

        contacts.forEach(inter => {
            if (inter != "") {
                db.collection("petProfiles").doc(inter).get()
                .then(doc => {
                    var petName = doc.data().name;
                    var petImage = doc.data().petCode;
                    var owner = doc.data().ownerID;
                    var ownerEmail;
                    var ownerName;

                    db.collection("userProfiles").doc(owner).get().then(petOwner => {
                        ownerEmail = petOwner.data().email;
                        ownerName = petOwner.data().name;

                        var newcard = cardTemplate.content.cloneNode(true);

                        newcard.querySelector(".pet-image").src = "data:image/png;base64," + petImage;
                        newcard.querySelector(".pet-name").innerHTML = "NAME: " + petName;
                        newcard.querySelector(".owner-email").innerHTML = `<a href="mailto:${ownerEmail}">${ownerEmail}</a>`;
                        newcard.querySelector(".owner-name").innerHTML = "OWNER NAME: " + ownerName;

                        document.getElementById("contacts-go-here").appendChild(newcard);
                    })

              })
          }
        })
    })
}

displayPetContacts();

resetNotification();

//removes notification icon on contact button once user clicks into
//the contacts page by setting their 'hasNotification' field to false
async function resetNotification() {
  let currentUser = await getUserID();
  db.collection("userProfiles").doc(currentUser).update({
    hasNotification: false
  });
}

function getUserID() {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          resolve(user.uid);
        } else {
          reject("No user is signed in");
          window.location = "/html/login.html";
        }
      });
    });
  }