async function displayCards(collection) {
  let petTemplate = document.getElementById("petCardTemplate");
  let container = document.getElementById("container");
  var userID = await getUserID();
  container.innerHTML = "";

  //iterates through every pet in user's pet list to create a card for each pet
  db.collection("userProfiles").doc(userID).get()
    .then(user => {
      var pets = user.data().pets;
      if (pets.length == 0) {
        container.innerHTML = "No Contacts";
      } else {
        pets.forEach(pet => {
          if (pet != "") {
            db.collection(collection).doc(pet).get()
              .then(doc => {
                var docID = doc.id;
                var name = doc.data().name;
                var petInterest = doc.data().interested;
                var petContacts = doc.data().contacts;

                let newcard = petTemplate.content.cloneNode(true);

                //sets title of card with name of pet
                newcard.querySelector('.petName').innerHTML = "Contacts for " + name;
                //adds unique identifier to each pet card's "interested/contact requests" and "contacts" section
                //list of will be added to this section using the unique identifier
                newcard.querySelector('.interested').id = "interested-" + docID;
                newcard.querySelector('.contacts').id = "contacts-" + docID;

                if (petContacts.length != 0) {
                  newcard.querySelector('.contacts').innerHTML = "<h5>Contacts:</h5>";
                  //add list of users to the "contacts" section
                  getContacts(petContacts, docID);
                } else {
                  let message = "<h5>Contacts:</h5><p>None</p>";
                  newcard.querySelector('.contacts').innerHTML = message;
                }

                if (petInterest.length != 0) {
                  newcard.querySelector('.interested').innerHTML = "<h5>Contact requests:</h5>";
                  //add list of interest users to the "contact requests" section
                  getInterestedUser(petInterest, docID);
                } else {
                  let message = "<br><h5>Contact requests:</h5><p>None</p>";
                  newcard.querySelector('.interested').innerHTML = message;
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

//adds a list of users interested in the pet under the "contact requests" section
function getInterestedUser(petInterest, petID) {
  let contactTemplate = document.getElementById("contactCard");

  //iterates through every user in the pet's "interested" array list and adds them to the
  //pet card's "interested/contact request" section
  petInterest.forEach(element => {
    if (element != null) {
      db.collection("userProfiles").doc(element).get()
        .then(userDoc => {
          let user = userDoc.data();
          let userName = user.name;
          let docID = userDoc.id;

          let newcard = contactTemplate.content.cloneNode(true);

          //links the interested user's name to their profile page
          newcard.querySelector('.userName').href = "AdoptProfileDetail.html?userID=" + docID;
          newcard.querySelector('.userName').innerHTML = userName;
          //adds unique identifier to the interested user's card, which will be used to remove the user
          //if the owner rejects their request
          newcard.querySelector('.userCard').id = "userCard-" + docID + petID;
          //adds buttons to accept/decline the request
          let buttons = `<button onclick="acceptRequest('${petID}','${docID}')">Accept</button>
                        <button onclick="declineRequest('${petID}','${docID}')">Decline</button>`
          newcard.querySelector('.nameButtons').innerHTML = buttons;

          document.querySelector('#interested-' + petID).appendChild(newcard);
        });
    }
  });
}

//adds a list of contacts (that the owner accepted) under the "contacts" section
function getContacts(petContacts, petID) {
  let contactTemplate = document.getElementById("contactCard");

  //iterates through every user in the pet's "contacts" array list and adds them to the
  //pet card's "contacts" section
  petContacts.forEach(element => {
    if (element != null) {
      db.collection("userProfiles").doc(element).get()
        .then(userDoc => {
          let user = userDoc.data();
          let userName = user.name;
          let docID = userDoc.id;
          let userEmail = user.email;

          let newcard = contactTemplate.content.cloneNode(true);

          //links contact's name to the contact's profile page
          newcard.querySelector('.userName').href = "AdoptProfileDetail.html?userID=" + docID;
          newcard.querySelector('.userName').innerHTML = userName;
          //link to open email and populate with the contact's email
          let buttons = `<a href="mailto:${userEmail}">Email</a>`
          newcard.querySelector('.nameButtons').innerHTML = buttons;


          document.querySelector('#contacts-' + petID).appendChild(newcard);
        });
    }
  });
}

//adds contacts to the database when owner accepts interested user's request
async function acceptRequest(petID, userID) {
  var currentUser = await getUserID();
  console.log(currentUser);
  //adds interested user to the pet's contact list
  //removes interested user from the pet's interested list
  db.collection("petProfiles").doc(petID).update({
    interested: firebase.firestore.FieldValue.arrayRemove(userID),
    contacts: firebase.firestore.FieldValue.arrayUnion(userID)
  });
  //adds current owner to the interested user's contact list
  //removes pet from the interested user's interested list
  db.collection("userProfiles").doc(userID).update({
    interested: firebase.firestore.FieldValue.arrayRemove(petID),
    contacts: firebase.firestore.FieldValue.arrayUnion(currentUser),
    hasNotification: true
  })
  //refreshes page to show update
  displayCards("petProfiles");
}


//removes interested user from the database when owner declines request
function declineRequest(petID, userID) {
  let text = "Are you sure you want to decline the request?"
  //opens up confirmation popup
  //if owner selects yes, the interested user will be removed from the "interested" field of both
  //the pet and the interested user
  if (confirm(text)) {
    db.collection("petProfiles").doc(petID).update({
      interested: firebase.firestore.FieldValue.arrayRemove(userID)
    })
    db.collection("userProfiles").doc(userID).update({
      interested: firebase.firestore.FieldValue.arrayRemove(petID)
    });
    //removes the interested user's information from the "contacts request list"
    document.getElementById("userCard-" + userID + petID).remove();
  }
}