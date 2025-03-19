async function displayPetCards(collection) {
  let userID = await getUserID();

  let cardTemplate = document.getElementById("petCardTemplate");

  if (!cardTemplate) {
    console.error("Template element not found");
    return;
  }

  db.collection(collection).get()
    .then(allPets => {
      allPets.forEach(async doc => {
        var title = doc.data().name;
        var age = doc.data().age;
        var breed = doc.data().breed;
        var desc = doc.data().description;
        var petCode = doc.data().petCode;
        var docID = doc.id;

        var newcard = cardTemplate.content.cloneNode(true);

        newcard.querySelector(".pet-name").innerHTML = "NAME: " + title;
        newcard.querySelector(".pet-age").innerHTML = "AGE: " + age + " year/s";
        newcard.querySelector(".pet-breed").innerHTML = "BREED: " + breed;
        newcard.querySelector(".pet-desc").innerHTML = desc;
        newcard.querySelector(".pet-img").src = `../images/${petCode}.jpeg`;
        newcard.querySelector(".details").href = "adoptPetDetails.html?docID=" + docID;

        //sets favorite button to on/off when page loads
        if (userID != null) {
          newcard.querySelector(".favorite").src = await setFavorite(userID, docID);
        }

        //toggles favorite button on/off when clicked
        newcard.querySelector(".favorite").addEventListener("click", (event) => {
          changeFavorite(userID, docID, event);
        });

        //shows contact request when clicked
        newcard.querySelector(".contact").addEventListener("click", (event) => {
          viewContactPrompt(userID, docID, event);
        });

        //shows URL button when clicked
        newcard.querySelector(".link").addEventListener("click", (event) => {
          viewURL(userID, docID, event);
        });

        //hides expandable content when clicked
        newcard.querySelector(".hidePlaceholder").addEventListener("click", (event) => {
          clearContent(event.target.parentNode);
        })

        document.getElementById(collection + "-go-here").appendChild(newcard);
      })
    })
}

displayPetCards("petProfiles");

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

      //clear previous placeholder content and populate with template content
      let newCard = cardTemplate.content.cloneNode(true);
      newCard.getElementById("pet-name").innerHTML = name;

      newCard.querySelector(".noButton").addEventListener("click", (event) => {
        clearContent(event.target.parentNode.parentNode.parentNode);
      });

      newCard.querySelector(".yesButton").addEventListener("click", (event) => {
        sendRequest(userID, petID, event.target.parentNode.parentNode.parentNode);
      });

      let card = event.target.parentNode.parentNode;
      clearContent(card);

      card.querySelector(".menuPlaceholder").appendChild(newCard);
      
      
    });
  }
}

//sends contact request to pet's owner
function sendRequest(userID, petID, event) {
  db.collection("petProfiles").doc(petID).get().then(doc => {
    //get pet info
    let interestedList = doc.data().interested;
    let petName = doc.data().name;

    //sets message depending of whether the user has already sent a previous contact request
    //if it is a new request, user's ID will also be written into pet's "interested" field
    let message = "";
    console.log(petID);
    if (interestedList.includes(userID)) {
      message = `You have already send a contact request to ${petName}'s owner`;
    } else {
      db.collection("petProfiles").doc(petID).update({
        interested: firebase.firestore.FieldValue.arrayUnion(userID)
      });
      message = `A contact request has been sent to ${petName}'s owner`;
    }

    event.querySelector(".menuPlaceholder").innerHTML = message;
    event.querySelector(".hidePlaceholder").innerHTML = "hide";
  });

}


//adds a copy URL button when share button is clicked
function viewURL(userID, petID, event) {
  let card = event.target.parentNode.parentNode;
  if (userID == null) {
    loginMessage(event.target.parentNode.parentNode);
  } else {
    let message = `<input type="button" value="Copy URL" onclick="copyURL('${petID}')">`;
    
    card.querySelector(".menuPlaceholder").innerHTML = message;
    card.querySelector(".hidePlaceholder").innerHTML = "hide";

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