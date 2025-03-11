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
                newcard.querySelector(".details").href = "AdoptPetDetails.html?docID=" + docID;
                
                newcard.querySelector(".favorite").src = await setFavorite(userID, docID);
                
                // newcard.querySelector(".favorite").addEventListener("click", () => {
                //     newcard.querySelector(".favorite").src = "/images/dog1.jpeg";
                // });

                document.getElementById(collection + "-go-here").appendChild(newcard);
            })
        })
}

displayPetCards("petProfiles");

function getUserID() {
    return new Promise(function(resolve, reject) {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user != null) {
                resolve(user.uid);
            } else {
                reject(null);
            }
        });
    });

  }

  function setFavorite(userID, petID) {
    return new Promise(function(resolve, reject) {
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


function changeFavorite(userID, petID, element) {
    return new Promise(function(resolve, reject) {
        if (userID == null) {
            reject(loginMessage());
          } else { //user is signed in
      
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
                console.log("help" + element);
                element.querySelector("#favorite").src = "/images/heartUnfilledIcon.png";
                resolve(["/images/heartUnfilledIcon.png", ""]);
              } else {
                favoriteList.push(petID);
                docRef.update({
                  favorites: favoriteList
                })
                element.querySelector("#favorite").src = "/images/heartFilledIcon.png";
                resolve(["/images/heartFilledIcon.png", ""]);
              }
            });
          } 
    }); 
}

function loginMessage() {
    message = "You are not logged in. "
            + "<a href='/html/login.html'>Log In</a> or "
            + "<a href='/html/signup.html'>Sign Up</a>";
    return [message, "hide"];
  }