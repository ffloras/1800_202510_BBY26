// Display the user information
async function displayUserInfo() {
    let userID = await getUserID();
    db.collection("userProfiles")
        .doc(userID)
        .get()
        .then(doc => {
            user = doc.data();
            image = user.profileImage;
            userName = user.name;
            userChild = user.children;
            userHousing = user.housing;
            userExperience = user.pastExperience;
            userPets = user.hasPets;
            userDesc = user.description;

            document.querySelector("#avatar-img").src = "data:image/png;base64," + image;
            document.getElementById("display-name").innerHTML = userName;
            document.getElementById("display-housing").innerHTML = userHousing;

            if (userDesc == null) {
                document.getElementById("display-desc").innerHTML = "Nothing here" ;
            } else {
                document.getElementById("display-desc").innerHTML = userDesc;
            }

            if (userChild) {
                document.getElementById("display-child").innerHTML = "Yes";
            } else {
                document.getElementById("display-child").innerHTML = "No";
            }
            
            if (userExperience) {
                document.getElementById("display-experience").innerHTML = "Yes";
            }else {
                document.getElementById("display-experience").innerHTML = "No";
            }

            if (userPets) {
                document.getElementById("display-pets").innerHTML = "Yes";
            }else {
                document.getElementById("display-pets").innerHTML = "No";
            }
        });
}
displayUserInfo();

// Get the id of the current user
function getUserID() {
    return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log("User is logged in:", user.uid);
                resolve(user.uid);
            } else {
                console.log("User is not logged in.");
                reject("No user is signed in");
                window.location = "/html/login.html";
            }
        });
    });
}

const editBtn = document.getElementById("edit-btn");
const editForm = document.getElementById("edit-form");
const userInfo = document.getElementById("user-info");

// Show the edit form
function showEditForm(userData) {
    document.getElementById("edit-name").value = userData.name;
    document.getElementById("edit-housing").value = userData.housing;
    document.getElementById("edit-experience").value = userData.pastExperience;
    document.getElementById("edit-child").value = userData.children;
    document.getElementById("edit-pets").value = userData.hasPets;
    document.getElementById("edit-desc").value = userData.description;

    editForm.style.display = "block";
    userInfo.style.display = "none";
}

// Exit the edit form
function hideEditForm() {
    editForm.style.display = "none";
    userInfo.style.display = "block";
}

// Show the edit form when the edit button is clicked
editBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let userData = {
        name: document.getElementById('display-name').textContent,
        housing: document.getElementById('display-housing').textContent,
        pastExperience: document.getElementById('display-experience').textContent,
        children: document.getElementById('display-child').textContent,
        hasPets: document.getElementById('display-pets').textContent,
        description: document.getElementById('display-desc').textContent,
    };

    showEditForm(userData);
});

// Update the user information when the form is submitted
editForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    let hasChildren;
    if (document.getElementById('edit-child').value == "Yes") {
        hasChildren = true;
    } else {
        hasChildren = false;
    }

    let hasPets;
    if (document.getElementById('edit-pets').value == "Yes") {
        hasPets = true;
    } else {
        hasPets = false;
    }

    let pastExperience;
    if (document.getElementById('edit-experience').value == "Yes") {
        pastExperience = true;
    } else {
        pastExperience = false;
    }

    console.log(hasChildren);
    console.log(hasPets);
    console.log(pastExperience);

    let updatedData = {
        name: document.getElementById("edit-name").value,
        housing: document.getElementById("edit-housing").value,
        pastExperience: pastExperience,
        children: hasChildren,
        hasPets: hasPets,
        description: document.getElementById("edit-desc").value
    };

    try {
        let ID = await getUserID();
        let userRef = db.collection("userProfiles").doc(ID);
        await userRef.update(updatedData);

        document.getElementById("display-name").textContent = updatedData.name;
        document.getElementById("display-housing").textContent = updatedData.housing;
        document.getElementById("display-experience").textContent = document.getElementById("edit-experience").value;
        document.getElementById("display-child").textContent = document.getElementById("edit-child").value;
        document.getElementById("display-pets").textContent = document.getElementById("edit-pets").value;
        document.getElementById("display-desc").textContent = updatedData.description;

        alert("Successfully updated!");
        hideEditForm();

        window.location.reload();
    } catch (error) {
        console.error("Fail to update user information:", error);
    }
});