function displayPetInfo() {
  let params = new URL(window.location.href);
  let ID = params.searchParams.get("docID");

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
      document.getElementById("age").innerHTML = age;
      document.getElementById("breed").innerHTML = breed;
      document.getElementById("gender").innerHTML = gender;
      document.getElementById("size").innerHTML = size;
      document.getElementById("description").innerHTML = description;

      setFavorite();
    });
  
  return ID;
}
let petID = displayPetInfo();

function getUserID() {
  const user = firebase.auth().currentUser;
  if (user !== null) {
    return user.uid;
  }
}


function viewContact() {
  clearMenu();
  let ownerName = "owner name";
  let email = "example@email.com";
  let emailLink = `mailto:${email}`;
  console.log(`email: ${email}`);
  document.getElementById("menuPlaceholder").innerHTML = `<h3>${ownerName}</h3>`;
  document.getElementById("emailLink").innerHTML = 'Email';
  document.getElementById("emailLink").href = emailLink;
  document.getElementById("contactLink").innerHTML = "Add to Contacts";
  document.getElementById("hidePlaceholder").innerHTML = "hide";
}

function viewURL() {
  clearMenu();
  let info = "<h4>URL</h4>";
  document.getElementById("menuPlaceholder").innerHTML = info;
  document.getElementById("hidePlaceholder").innerHTML = "hide";
}

function addFavorite() {
  clearMenu();
  const ID = getUserID();
  
  let docRef = db.collection("userProfiles").doc(ID);
  console.log(ID);
  docRef.get().then(doc => {
    docInfo = doc.data();
    let favoriteList = doc.data().favorites;
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

function setFavorite() {
  const ID = getUserID();
  let docRef = db.collection("userProfiles").doc(ID);
  console.log(ID);
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



function addMenuListener(){
  document.getElementById("hidePlaceholder").addEventListener("click", () => {
  clearMenu();
  });
}
addMenuListener();

function clearMenu () {
  document.getElementById("menuPlaceholder").innerHTML = "";
  document.getElementById("hidePlaceholder").innerHTML = "";
  document.getElementById("emailLink").innerHTML = "";
  document.getElementById("emailLink").href = "";
  document.getElementById("contactLink").innerHTML = "";
}

