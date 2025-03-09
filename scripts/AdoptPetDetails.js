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
  const user = firebase.auth().currentUser;
  if (user !== null) {
    return user.uid;
  }
}

//asks user if they want to send contact request to pet's owner (after
//they click on the message button)
function viewContactPrompt() {
  let cardTemplate = document.getElementById("contactTemplate");

  //get the pet's name using petID
  let petID = getPetID();
  db.collection("petProfiles").doc(petID).get().then(doc => {
    let name = doc.data().name;

    //clear previous placeholder content and populate with template content
    let newCard = cardTemplate.content.cloneNode(true);
    newCard.getElementById("pet-name").innerHTML = name;
    clearMenu();
    document.getElementById("menuPlaceholder").appendChild(newCard);
  });
  
}

//sends contact request to pet's owner
function sendRequest() {
  let userID = getUserID();
  let petID = getPetID();

  db.collection("petProfiles").doc(petID).get().then(doc => {
    //get pet info
    let interestedList = doc.data().interested;
    let petName = doc.data().name;

    //sets message depending of whether the user has already sent a previous contact request
    //if it is a new request, user's ID will also be written into pet's "interested" field
    let message = "";
    if (interestedList.includes(userID)) {
      message = `You have already send a contact request to ${petName}'s owner`;
    } else {
      db.collection("petProfiles").doc(petID).update({
        interested: firebase.firestore.FieldValue.arrayUnion(userID)
      });
      message = `A contact request has been sent to ${petName}'s owner`;
    }

    document.getElementById("menuPlaceholder").innerHTML = message;
    document.getElementById("hidePlaceholder").innerHTML = "hide";
  });

}

//adds a copy URL button when share button is clicked
function viewURL() {
  let message = `<input type="button" value="Copy URL" onclick="copyURL()">`;
  document.getElementById("menuPlaceholder").innerHTML = message;
  document.getElementById("hidePlaceholder").innerHTML = "hide";
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
  let petID = getPetID();
  
  //get user's 'favorites' field and store in variable favoriteList
  let docRef = db.collection("userProfiles").doc(userID);
  docRef.get().then(doc => {
    docInfo = doc.data();
    let favoriteList = doc.data().favorites;
    //if petID is already in favoriteList, will remove the petID from the favorites field, and sets heart to unfilled.
    //if petID is not in favoriteList, will add it to user's favorite field, and sets heart to filled.
    if (favoriteList.includes(petID)) {
      let index = favoriteList.indexOf(petID);
      favoriteList.splice(index, 1);
      docRef.update({
        favorites: favoriteList
      });
      document.getElementById("favorite").src = "/images/heartUnfilledIcon.png";
    } else {
      favoriteList.push(petID);
      docRef.update({
        favorites: favoriteList
      })
      document.getElementById("favorite").src = "/images/heartFilledIcon.png";
    }
  });
}

//sets the favorite icon (filled/unfilled) based on user's "favorite" field
function setFavorite() {
  let userID = getUserID();
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

//add "click" event listener to the hide buttons to clear expandable content
function addMenuListener(){
  document.getElementById("hidePlaceholder").addEventListener("click", () => {
  clearMenu();
  });
}
addMenuListener();

//removes expandable content
function clearMenu() {
  document.getElementById("menuPlaceholder").innerHTML = "";
  document.getElementById("hidePlaceholder").innerHTML = "";
}

