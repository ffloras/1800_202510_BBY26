// Display all the pets that the user has posted
async function displayCards(collection) {
    let cardTemplate = document.getElementById("card-template");
    let container = document.getElementById("container");
    let addPetButton = container.querySelector('.add-pet');
    let userID = await getUserID();

    db.collection("userProfiles").doc(userID).get()
        .then(user => {
            var pets = user.data().pets;
            pets.forEach(pet => {
                if (pet != "") {
                    db.collection(collection).doc(pet).get()
                        .then(doc => {
                            var docID = doc.id;
                            var name = doc.data().name;
                            var image = doc.data().petCode;

                            let newcard = cardTemplate.content.cloneNode(true);

                            newcard.querySelector(".card-image").src = "data:image/png;base64," + image;
                            newcard.querySelector('.name').innerHTML = name;
                            newcard.querySelector('a').href = "rehomeDetails.html?petID=" + docID;

                            container.insertBefore(newcard, addPetButton);
                        })
                        .catch(error => {
                            console.error("Error fetching documents: ", error);
                        });
                }
            });

        });
}

displayCards("petProfiles");

// Get the id of the current user
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
