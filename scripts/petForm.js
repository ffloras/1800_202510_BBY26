var petID;
var petImage;

async function savePetInfo(collection) {
    var userID = await getUserID();

    var petName = document.getElementById("inputName").value;
    var petAge = document.getElementById("inputAge").value;
    var petBreed = document.getElementById("inputBreed").value;
    var petDesc = document.getElementById("inputDescription").value;
    var petSize = document.getElementById("inputSize").value;
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
        status: true,
    });

    var petID = petDocRef.id;

    // Update the user's document with the petID
    await db.collection("userProfiles").doc(userID).update({
        pets: firebase.firestore.FieldValue.arrayUnion(petID)
    });

    //redirect user to Rehom main page once form is submitted
    window.location.replace("/html/rehomeMain.html");
}

document.getElementById("petIcon").addEventListener("change", handlePetFileSelect);

function handlePetFileSelect(event) {
    var file = event.target.files[0];

    if (file) {
        var reader = new FileReader();

        reader.onload = function(e) {
            petImage = e.target.result.split(',')[1];
        };

        reader.readAsDataURL(file);
    }
}

function getUserID() {
    return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                var userEmail = user.email;

                db.collection("userProfiles").where("email", "==", userEmail).get()
                    .then(querySnapshot => {
                        if (!querySnapshot.empty) {
                            var userDoc = querySnapshot.docs[0];
                            var userID = userDoc.id;

                            console.log("User ID: " + userID);
                            resolve(userID);
                        } else {
                            reject("No matching user found in the database");
                        }
                    })
            } else {
                reject("No user is signed in");
            }
        });
    });
}