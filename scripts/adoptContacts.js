//displays the contacts/contact requests for each pet
async function displayPetContacts() {
  // Gets the template for the pet card
  let cardTemplate = document.getElementById("pet-contact");
  let ID = await getUserID();

  // Using the ID of the currently logged user, it looks at its info
  db.collection("userProfiles").doc(ID).get()
    .then(user => {
      // Stores the data of the interested array into var interested
      var interested = user.data().interested;

      // Store the data of the contacts array into var contacts
      var contacts = user.data().contacts;

      // It will go through every petID and gets the information needed
      if (interested.length == 0 && contacts.length == 0) {
        document.getElementById("noContacts").innerHTML = "none";
      } else {
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
      }
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


//returns current user's ID
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