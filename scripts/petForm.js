var petID;
var petImage;

async function savePetInfo(collection) {
  var userID = await getUserID();

    var petName = document.getElementById("inputName").value;
    var petAge = document.getElementById("inputAge").value;
    var petBreed = document.getElementById("inputBreed").value;
    var petDesc = document.getElementById("inputDescription").value;
    var petSize = document.getElementById("inputSize").value;
    var petType = document.getElementById("inputType").value;
    var petLocation = document.getElementById("inputLocation").value;
    var isFemale;

  if (document.getElementById("radio1").checked) {
    isFemale = false;
  } else {
    isFemale = true;
  }

    // Add the pet information to the Firestore database
    const petDocRef = await db.collection(collection).add({
        name: petName,
        age: petAge,
        breed: petBreed,
        description: petDesc,
        isFemale: isFemale,
        interested: [],
        contacts: [],
        ownerID: userID,
        petCode: petImage,
        size: petSize,
        petType: petType,
        location: petLocation,
        status: true
    });

  var petID = petDocRef.id;

  // Update the user's document with the petID
  await db.collection("userProfiles").doc(userID).update({
    pets: firebase.firestore.FieldValue.arrayUnion(petID)
  });

  // Redirect user to Rehom main page once form is submitted
  window.location.replace("/html/rehomeMain.html");
}

// Eevnt listener for the image field in the form
document.getElementById("petIcon").addEventListener("change", handlePetFileSelect);

// Function to save the pet photo as a 64-bit string
function handlePetFileSelect(event) {
  // Save the full file into the var file
  var file = event.target.files[0];

  if (file) {
    var reader = new FileReader();

    reader.onload = function (e) {
      // Removes the first bit of the image source and keeps the 64-bit string
      petImage = e.target.result.split(',')[1];
    };

    reader.readAsDataURL(file);
  }
}

// Function to ge the user ID of the currently logged user
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