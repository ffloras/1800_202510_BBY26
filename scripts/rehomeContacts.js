async function displayCards(collection) {
  let petTemplate = document.getElementById("petCardTemplate");
  let container = document.getElementById("container");
  var userID = await getUserID();

  //iterates through every pet in user's pet list to create a card for each pet
  db.collection("userProfiles").doc(userID).get()
    .then(user => {
      var pets = user.data().pets;
      if (pets.length == 0) {
        container.innerHTML = "No Contacts";
      } else {
        pets.forEach(pet => {
          if (pet != "") {
            db.collection(collection).doc(pet).get().then(doc => {
              var docID = doc.id;
              var name = doc.data().name;
              let newcard = petTemplate.content.cloneNode(true);

              //sets title of card with name of pet
              newcard.querySelector('.petName').innerHTML = "Contacts for " + name;
              //adds unique identifier to each pet card's "interested/contact requests" and "contacts" section
              //list of contacts/contact requests will be added to this section using the unique identifier
              newcard.querySelector('.interested').id = "interested-" + docID;
              newcard.querySelector('.request-title').id = "request-title-" + docID;
              
              newcard.querySelector('.contacts').id = "contacts-" + docID;
              newcard.querySelector('.contact-title').id = "contact-title-" + docID;

              container.appendChild(newcard);

              getContacts(docID);
              getInterestedUser(docID);
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

//returns userID
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

//adds a list of users interested in the pet under the "contact requests" section
function getInterestedUser(petID) {
  let contactTemplate = document.getElementById("contactCard");
  
  document.getElementById("request-title-" + petID).innerHTML = "<br><h4>Contacts Requests:</h4>";

  db.collection("petProfiles").doc(petID).onSnapshot(petDoc => {
    let petInterest = petDoc.data().interested;
    //requestCard.innerHTML = "";
    if (petInterest.length == 0) {
      document.getElementById("interested-" + petID).innerHTML = "<p>None</p>";
    } else {

      let usersList = document.createElement('div');
      usersList.id = "interested-" + petID;
      usersList.setAttribute("class", "interested scroll");
      //iterates through every user in the pet's "interested" array list and adds them to the
      //pet card's "interested/contact request" section
      petInterest.forEach(element => {
        if (element != null) {
          db.collection("userProfiles").doc(element).get().then(userDoc => {
            let user = userDoc.data();
            let userName = user.name;
            let docID = userDoc.id;

            let newcard = contactTemplate.content.cloneNode(true);

            //links the interested user's name to their profile page
            newcard.querySelector('.userName').href = "adoptProfileDetail.html?userID=" + docID;
            newcard.querySelector('.userName').innerHTML = userName;
            
            //adds buttons to accept/decline the request
            let buttons = `<button class='contact-button' onclick="acceptRequest('${petID}','${docID}')">Accept</button>
                          <button class='contact-button' onclick="declineRequest('${petID}','${docID}')">Decline</button>`
            newcard.querySelector('.nameButtons').innerHTML = buttons;

            usersList.appendChild(newcard);
          });
        }
      });
      document.getElementById("interested-" + petID).replaceWith(usersList);
    }
  });
}

//adds a list of contacts (that the owner accepted) under the "contacts" section
function getContacts(petID) {
  document.getElementById("contact-title-" + petID).innerHTML = "<h4>Contacts:</h4>";
  
  db.collection("petProfiles").doc(petID).onSnapshot(petDoc => {
    let petContacts = petDoc.data().contacts;
    //contactsCard.innerHTML = "";
    if (petContacts.length == 0) {
      document.getElementById("contacts-" + petID).innerHTML = "<p>None</p>";
    } else {
      let contactTemplate = document.getElementById("contactCard");
      let usersList = document.createElement('div');
      usersList.id = "contacts-" + petID;
      usersList.setAttribute("class", "contacts")

      //iterates through every user in the pet's "contacts" array list and adds them to the
      //pet card's "contacts" section
      petContacts.forEach(element => {
        if (element != null) {
          db.collection("userProfiles").doc(element).get().then(userDoc => {
            let user = userDoc.data();
            let userName = user.name;
            let docID = userDoc.id;
            let userEmail = user.email;

            let newcard = contactTemplate.content.cloneNode(true);

            //links contact's name to the contact's profile page
            newcard.querySelector('.userName').href = "adoptProfileDetail.html?userID=" + docID;
            newcard.querySelector('.userName').innerHTML = userName;
            
            //shortens email if user's email is too long
            if (userEmail.length > 18) {
              let emailEnd = userEmail.substring(userEmail.indexOf('@'));
              let emailStartLength = (18 - emailEnd.length);
              userEmail = userEmail.substring(0, emailStartLength) + "..." + emailEnd;
            }

            //link to open email and populate with the contact's email
            let buttons = `<a href="mailto:${userEmail}">${userEmail}</a>`
            newcard.querySelector('.nameButtons').innerHTML = buttons;

            usersList.appendChild(newcard);
          });
        }
      });
      document.getElementById("contacts-" + petID).replaceWith(usersList);
    }
  });
}

//adds contacts to the database when owner accepts interested user's request
function acceptRequest(petID, userID) {
  var petInfo = db.collection("petProfiles").doc(petID);
  //adds interested user to the pet's contact list
  //removes interested user from the pet's interested list
  petInfo.update({
    interested: firebase.firestore.FieldValue.arrayRemove(userID),
    contacts: firebase.firestore.FieldValue.arrayUnion(userID)
  });
  //adds current owner to the interested user's contact list
  //removes pet from the interested user's interested list
  db.collection("userProfiles").doc(userID).update({
    interested: firebase.firestore.FieldValue.arrayRemove(petID),
    contacts: firebase.firestore.FieldValue.arrayUnion(petID),
    hasNotification: true
  })
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
  }
}