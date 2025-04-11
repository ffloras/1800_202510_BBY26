//gets information from pet profile in database by using petID and displays it on page
function displayPetInfo() {
  let ID = getPetID();

  //obrain pet's info from database using pet ID
  db.collection("petProfiles")
    .doc(ID).get().then( doc => {
      let petInfo = doc.data();
      let petCode = petInfo.petCode;
      let name = petInfo.name;
      let age = petInfo.age;
      let breed = petInfo.breed;
      let description = petInfo.description;
      let size = petInfo.size;
      let location = petInfo.location;
      let gender = petInfo.isFemale ? "F" : "M";

      let imgEvent = document.querySelector("#petImage");
      imgEvent.src = "/images/" + petCode + ".jpeg";
      document.querySelectorAll(".name").forEach(item => {
        item.innerHTML = name;
      });

      //populates html based on pet info from collection
      document.getElementById("age").innerHTML = age;
      document.getElementById("breed").innerHTML = breed;
      document.getElementById("gender").innerHTML = gender;
      document.getElementById("size").innerHTML = size;
      document.getElementById("description").innerHTML = description;
      document.getElementById("location").innerHTML = "Location: " + location;
      document.getElementById("petImage").src = "data:image/png;base64," + petCode;

      //sets the favorite icon (filled/unfilled) based on user's favorite field
      setFavorite();
    });
  
}
displayPetInfo();

//obtain pet ID using URL
function getPetID() {
  let params = new URL(window.location.href);
  let ID = params.searchParams.get("docID");
  return ID;
}

//obtain user ID from current user's firebase authenication account.
function getUserID() {
  let user = firebase.auth().currentUser;
  if (user !== null) {
    return user.uid;
  } else {
    return null;
  }
}

//asks user if they want to send contact request to pet's owner (after
//they click on the message button)
function viewContactPrompt() {
  if (getUserID() == null) {
    loginMessage();
  }
  else {
    //get the pet's name using petID
    let petID = getPetID();
    db.collection("petProfiles").doc(petID).get().then(doc => {
      let name = doc.data().name;

      let text = `Do you want to send a contact request to ${name}'s owner?`;

      if (confirm(text)) {
        sendRequest();
      }
    });
  }
}

//sends contact request to pet's owner
function sendRequest() {
  let userID = getUserID();
  let petID = getPetID();

  db.collection("petProfiles").doc(petID).get().then(doc => {
    //get pet info
    let interestedList = doc.data().interested;
    let contactList = doc.data().contacts;
    let petName = doc.data().name;
    let ownerID = doc.data().ownerID;

    //sets message depending of whether the user has already sent a previous contact request
    //if it is a new request, user's ID will also be written into pet's "interested" field
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
      })

      message = `A contact request has been sent to ${petName}'s owner`;
    }

    alert(message);

  });

}

//adds a copy URL button when share button is clicked
function viewURL() {
  if (getUserID() == null) {
    loginMessage();
  } else {
    let message = `<input class="url-button" type="button" value="Copy URL" onclick="copyURL()">`;
    let button = "<button>hide</button>";
    document.getElementById("menuPlaceholder").innerHTML = message;
    document.getElementById("hidePlaceholder").innerHTML = button;
  }
}

//copies URL of page to clipboard, with popup confirmation message
function copyURL() {
  let URLlink = new URL(window.location.href);
  navigator.clipboard.writeText(URLlink);
  alert("URL has been copied");
}

//toggles favorite button on/off when clicked, add/deletes petID from current user's 'favorites' field
function changeFavorite() {
  let userID = getUserID();
    
  //if user is not logged in, clicking on favorite button will prompt user to login
  if (userID == null) {
    loginMessage();
  } else { //user is signed in

    let petID = getPetID();
  
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
        document.getElementById("favorite").src = "/images/heartUnfilledIcon.png";
      } else {
        docRef.update({
          favorites: firebase.firestore.FieldValue.arrayUnion(petID)
        })
        document.getElementById("favorite").src = "/images/heartFilledIcon.png";
      }
    });
  } 
}

//sets the favorite icon (filled/unfilled) based on user's "favorite" field
function setFavorite() {
  let userID = getUserID();
  if (userID == null) {
  } else {
    let petID = getPetID();
    let docRef = db.collection("userProfiles").doc(userID);
    docRef.get().then(doc => {
    docInfo = doc.data();
    let favoriteList = doc.data().favorites;
    if (favoriteList.includes(petID)) {
      document.getElementById("favorite").src = "/images/heartFilledIcon.png";
    } else {
      document.getElementById("favorite").src = "/images/heartUnfilledIcon.png";
    }
  });
  }
}

//add "click" event listener to the hide buttons to clear expandable content
function addMenuListener(){
  document.getElementById("hidePlaceholder").addEventListener("click", () => {
  clearContent();
  });
}
addMenuListener();

//removes expandable content
function clearContent() {
  document.getElementById("menuPlaceholder").innerHTML = "";
  document.getElementById("hidePlaceholder").innerHTML = "";
}

function loginMessage() {
  
  message = "You are not logged in. Click 'OK' to log in";
  if (confirm(message)) {
    window.location.href = "/html/login.html";
  }
}
