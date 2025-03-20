async function displayCards(collection) {
  let petTemplate = document.getElementById("petCard");
  let container = document.getElementById("container");
  var userID = await getUserID();

  db.collection("userProfiles").doc(userID).get()
    .then(user => {
      var pets = user.data().pets;
      if (pets.length == 0) {
        container.innerHTML = "No Contacts";
      } else {
        pets.forEach(pet => {
          console.log("pet ID: ", pet);
          if (pet != "") {
            db.collection(collection).doc(pet).get()
              .then(doc => {
                console.log("Document data:", doc.data());
                var docID = doc.id;
                var name = doc.data().name;
                var petInterest = doc.data().interested;
                var petContacts = doc.data().contacts;
  
                let newcard = petTemplate.content.cloneNode(true);
  
                newcard.querySelector('.petName').innerHTML = "Contacts for " + name;
                newcard.querySelector('.interested').id = "interested-" + docID;
                newcard.querySelector('.contacts').id = "contacts-" + docID;
                
                if (petInterest.length == 0 && petContacts == 0) {
                  newcard.querySelector('.contacts').innerHTML = "No contacts";
                } else {
                  if (petInterest.length != 0) {
                    newcard.querySelector('.interested').innerHTML = "<h5>Contact requests:</h5>";
                    getInterestedUser(petInterest, docID);
                  }
                  if (petContacts.length != 0) {
                    newcard.querySelector('.contacts').innerHTML = "<h5>Contacts:</h5>";
                    getContacts(petContacts, docID);
                  }
                  
                }
                
                container.appendChild(newcard);
              })
              .catch(error => {
                console.error("Error fetching documents: ", error);
              });
          }
        });
      }
      

    });
}

displayCards("petProfiles");

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

function getInterestedUser(petInterest, petID) {
  let contactTemplate = document.getElementById("contactCard");

  petInterest.forEach(element => {
    if (element != null) {
      db.collection("userProfiles").doc(element).get()
        .then(userDoc => {
          let user = userDoc.data();
          let userName = user.name;
          let docID = userDoc.id;

          let newcard = contactTemplate.content.cloneNode(true);

          newcard.querySelector('.userName').href = "AdoptProfileDetail.html?userID=" + docID;
          newcard.querySelector('.userName').innerHTML = userName;
          let buttons = `<button onclick="acceptRequest('${petID}','${docID}')">Accept</button>
                        <button>Decline</button>`
          newcard.querySelector('.nameButtons').innerHTML = buttons;


          document.querySelector('#interested-' + petID).appendChild(newcard);
        });
    }
  });
}


function getContacts(petContacts, petID) {
  let contactTemplate = document.getElementById("contactCard");

  petContacts.forEach(element => {
    if (element != null) {
      db.collection("userProfiles").doc(element).get()
        .then(userDoc => {
          let user = userDoc.data();
          let userName = user.name;
          let docID = userDoc.id;

          let newcard = contactTemplate.content.cloneNode(true);

          newcard.querySelector('.userName').href = "AdoptProfileDetail.html?userID=" + docID;
          newcard.querySelector('.userName').innerHTML = userName;
          let buttons = `<button>Email</button>`
          newcard.querySelector('.nameButtons').innerHTML = buttons;


          document.querySelector('#contacts-' + petID).appendChild(newcard);
        });
    }
  });
}

function acceptRequest(petID, userID) {
  console.log(petID + " " + userID)
}