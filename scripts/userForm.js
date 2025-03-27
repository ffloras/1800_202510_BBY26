async function saveUserInfo(event) {
    event.preventDefault();
    var userDocRef = db.collection("userProfiles");
    var userHousing = document.getElementById("inputHousing").value;
    var userDesc = document.getElementById("inputDescription").value;
    var isChild;
    var isYes;
    var hasPets;

    if (document.getElementById("radio3").checked) {
        isYes = true;
    } else {
        isYes = false;
    }

    if (document.getElementById("radio1").checked) {
        isChild = true;
    } else {
        isChild = false;
    }

    if (document.getElementById("hasPets").checked) {
        hasPets = true;
    } else {
        hasPets = false;
    }

    var userID = getUserID();

    try {
        await userDocRef.doc(userID).update({
            children: isChild,
            housing: userHousing,
            pastExperience: isYes,
            description: userDesc,
            hasPets: hasPets
        });

        alert("Successfully uploaded your information!");

        window.location.href = "/html/adoptBrowse.html";
    } catch (error) {
        console.error("Error: ", error);
        alert("Please try again.");
    }
}

document.getElementById("userForm").addEventListener("submit", saveUserInfo);
document.getElementById("userIcon").addEventListener("change", handleFileSelect);

function getUserID() {
    const user = firebase.auth().currentUser;
    if (user !== null) {
        return user.uid;
    }
}

function handleFileSelect(event) {
    var file = event.target.files[0];

    if (file) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var base64String = e.target.result.split(',')[1];

            console.log(base64String);

            saveProfileImage(base64String);
        };

        reader.readAsDataURL(file);
    }
}

function saveProfileImage(base64String) {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            userId = user.uid;
            db.collection("userProfiles").doc(userId).set({
                profileImage: base64String
            }, { merge: true })
                .then(function () {
                    console.log("Profile image saved successfully!");
                })
                .catch(function (error) {
                    console.error("Error saving profile image: ", error);
                });
        } else {
            console.error("No user is signed in.");
        }   
    });
}
