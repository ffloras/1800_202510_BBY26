// Display the pets based on the filter
async function displayPetCards(collection, petType = null) {
  let userID = await getUserID();

  let cardTemplate = document.getElementById("petCardTemplate");

  if (!cardTemplate) {
    console.error("Template element not found");
    return;
  }

  document.getElementById(collection + "-go-here").innerHTML = "";

  let query = db.collection(collection).where("status", "==", true);

  if (petType && petType !== "") {
    query = query.where("petType", "==", petType);
  }

  query.get().then(allPets => {

    if (allPets.empty) {
      document.getElementById(collection + "-go-here").innerHTML = 
        `<p class="no-pets-message">No pets found matching your criteria.</p>`;
        return;
    }

    allPets.forEach(async doc => {
      var title = doc.data().name;
      var age = doc.data().age;
      var breed = doc.data().breed;
      var location = doc.data().location;
      var petCode = doc.data().petCode;
      var docID = doc.id;

      var newcard = cardTemplate.content.cloneNode(true);
      //shows contact request when clicked
      newcard.querySelector(".contact").addEventListener("click", (event) => {
        viewContactPrompt(userID, docID);
      });

      newcard.querySelector(".pet-name").innerHTML = "NAME: " + title;
      newcard.querySelector(".pet-age").innerHTML = "AGE: " + age + " year/s";
      newcard.querySelector(".pet-breed").innerHTML = "BREED: " + breed;
      newcard.querySelector(".pet-location").innerHTML = "Location: " + location;
      newcard.querySelector(".pet-img").src = "data:image/png;base64," + petCode;

      //sets favorite button to on/off when page loads
      if (userID != null) {
        newcard.querySelector(".favorite").src = await setFavorite(userID, docID);
      }

      //toggles favorite button on/off when clicked
      newcard.querySelector(".favorite").addEventListener("click", (event) => {
        changeFavorite(userID, docID, event);
      });
      
      //redirect to petDetails when clicked
      newcard.querySelector(".details").addEventListener("click", (event) => {
        window.location.replace("adoptPetDetails.html?docID=" + docID);
      });

      //shows URL button when clicked
      newcard.querySelector(".link").addEventListener("click", (event) => {
        viewURL(userID, docID, event);
      });

      //hides expandable content when clicked
      newcard.querySelector(".hidePlaceholder").addEventListener("click", (event) => {
        clearContent(event.target.parentNode.parentNode);
      })

      // Appends the new card to the main div
      document.getElementById(collection + "-go-here").appendChild(newcard);
    })

  });
}

// displayPetCards("petProfiles");

// Display exactly pets based on what type of pet that users select
document.addEventListener("DOMContentLoaded", function () {
  displayPetCards("petProfiles");

  document.getElementById("inputType").addEventListener("change", function () {
    const selectedType = this.value;
    if (selectedType === "" || selectedType == "All") {
      displayPetCards("petProfiles");
    } else {
      displayPetCards("petProfiles", selectedType);
    }
  });
});

// Get the id of the current user
function getUserID() {
  return new Promise(function (resolve, reject) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user != null) {
        resolve(user.uid);
      } else {
        resolve(null);
      }
    });
  });

}

function setFavorite(userID, petID) {
  return new Promise(function (resolve, reject) {
    if (userID == null) {
      reject("not logged in");
    } else {
      let docRef = db.collection("userProfiles").doc(userID);
      docRef.get().then(doc => {
        docInfo = doc.data();
        let favoriteList = doc.data().favorites;
        if (favoriteList.includes(petID)) {
          resolve("/images/heartFilledIcon.png");
        } else {
          resolve("/images/heartUnfilledIcon.png");
        }
      });
    }
  });
}

function changeFavorite(userID, petID, event) {
  if (userID == null) {
    loginMessage(event.target.parentNode.parentNode);
  } else {
    //get user's 'favorites' field and store in variable favoriteList
    let docRef = db.collection("userProfiles").doc(userID);
    docRef.get().then(doc => {
      docInfo = doc.data();
      let favoriteList = doc.data().favorites;
      //if petID is already in favoriteList, will remove the petID from the favorites field, and sets heart to unfilled.
      //if petID is not in favoriteList, will add it to user's favorite field, and sets heart to filled.
      if (favoriteList.includes(petID)) {
        docRef.update({
          favorites: firebase.firestore.FieldValue.arrayRemove(petID)
        });
        event.target.src = "/images/heartUnfilledIcon.png";
      } else {
        docRef.update({
          favorites: firebase.firestore.FieldValue.arrayUnion(petID)
        })
        event.target.src = "/images/heartFilledIcon.png";
      }
    });
  }
}

//asks user if they want to send contact request to pet's owner (after
//they click on the message button)
function viewContactPrompt(userID, petID, event) {
  if (userID == null) {
    loginMessage(event.target.parentNode.parentNode);
  }
  else {
    let cardTemplate = document.getElementById("contactTemplate");
    db.collection("petProfiles").doc(petID).get().then(doc => {
      let name = doc.data().name;

      let text = `Do you want to send a contact request to ${name}'s owner?`;
      if (confirm(text)) {
        sendRequest(userID, petID);
      }

    });
  }
}

//sends contact request to pet's owner
function sendRequest(userID, petID, event) {
  db.collection("petProfiles").doc(petID).get().then(doc => {
    //get pet info
    let interestedList = doc.data().interested;
    let contactList = doc.data().contacts;
    let petName = doc.data().name;
    let ownerID = doc.data().ownerID;

    //sets message depending of whether the user has already sent a previous contact request
    //if it is a new request, user's ID will also be written into pet's "interested" field
    let message = "";
    if (interestedList.includes(userID)) {
      message = `You have already send a contact request to ${petName}'s owner`;
    } else if (contactList.includes(userID)) {
      message = `You already have ${petName}'s owner as your contact`;
    } else {
      db.collection("petProfiles").doc(petID).update({
        interested: firebase.firestore.FieldValue.arrayUnion(userID)
      });
      db.collection("userProfiles").doc(userID).update({
        interested: firebase.firestore.FieldValue.arrayUnion(petID)
      });
      db.collection("userProfiles").doc(ownerID).update({
        hasNotification: true
      });
      message = `A contact request has been sent to ${petName}'s owner`;
    }

    alert(message);
  });

}


//adds a copy URL button when share button is clicked
function viewURL(userID, petID, event) {
  let card = event.target.parentNode.parentNode;
  if (userID == null) {
    loginMessage(event.target.parentNode.parentNode);
  } else {
    let message = `<input class="url-button" type="button" value="Copy URL" onclick="copyURL('${petID}')">`;
    let button = "<button>hide</button>";
    card.querySelector(".menuPlaceholder").innerHTML = message;
    card.querySelector(".hidePlaceholder").innerHTML = button;

  }
}

//copies URL of page to clipboard, with popup confirmation message
function copyURL(petID) {
  let URLlink = new URL(`${window.location.origin}/html/adoptPetDetails.html?docID=${petID}`);
  navigator.clipboard.writeText(URLlink);
  alert("URL has been copied");
}

//message that displays when user clicks button but is not logged in
function loginMessage(event) {
  message = "You are not logged in. "
    + "<a href='/html/login.html'>Log In</a> or "
    + "<a href='/html/signup.html'>Sign Up</a>";
  event.querySelector(".menuPlaceholder").innerHTML = message;
  event.querySelector(".hidePlaceholder").innerHTML = "hide";
}

//removes expandable content
function clearContent(event) {
  event.querySelector(".menuPlaceholder").innerHTML = "";
  event.querySelector(".hidePlaceholder").innerHTML = "";
}