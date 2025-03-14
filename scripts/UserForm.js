async function saveUserInfo(event) {
    event.preventDefault();
    var userDocRef = db.collection("userProfiles");
    var userHousing = document.getElementById("inputHousing").value;
    var userDesc = document.getElementById("inputDescription").value;
    var isChild;
    var isYes;

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

    var userID = getUserID();

    try {
        await userDocRef.doc(userID).update({
            children: isChild,
            housing: userHousing,
            pastExperience: isYes,
            description: userDesc
        });

        alert("Successfully uploaded your information!");

        window.location.href = "/html/AdoptBrowse.html";
    } catch (error) {
        console.error("Error: ", error);
        alert("Please try again.");
    }
}

document.getElementById("userForm").addEventListener("submit", saveUserInfo);

function getUserID() {
    const user = firebase.auth().currentUser;
    if (user !== null) {
        return user.uid;
    }
}