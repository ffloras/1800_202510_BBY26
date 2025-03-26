async function displayUserInfo() {
    let userID = await getUserID();
    db.collection("userProfiles")
        .doc(userID)
        .get()
        .then(doc => {
            user = doc.data();
            image = user.profileImage;
            userName = user.name;
            userEmail = user.email;
            userChild = user.children;
            userHousing = user.housing;
            userExperience = user.pastExperience;
            userDesc = user.description;

            document.querySelector("#avatar-img").src = "data:image/png;base64," + image;
            document.getElementById("display-name").innerHTML = userName;
            document.getElementById("display-email").innerHTML = userEmail;
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
        });
}
displayUserInfo();

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

function showEditForm(userData) {
    document.getElementById("edit-name").value = userData.name;
    document.getElementById("edit-email").value = userData.email;
    document.getElementById("edit-housing").value = userData.housing;
    document.getElementById("edit-experience").value = userData.pastExperience;
    document.getElementById("edit-child").value = userData.children;
    document.getElementById("edit-desc").value = userData.description;

    editForm.style.display = "block";
    userInfo.style.display = "none";
}

function hideEditForm() {
    editForm.style.display = "none";
    userInfo.style.display = "block";
}

editBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let userData = {
        name: document.getElementById('display-name').textContent,
        email: document.getElementById('display-email').textContent,
        housing: document.getElementById('display-housing').textContent,
        pastExperience: document.getElementById('display-experience').textContent,
        children: document.getElementById('display-child').textContent,
        description: document.getElementById('display-desc').textContent,
    };

    showEditForm(userData);
});

editForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    let updatedData = {
        name: document.getElementById("edit-name").value,
        email: document.getElementById("edit-email").value,
        housing: document.getElementById("edit-housing").value,
        pastExperience: document.getElementById("edit-experience").value,
        children: document.getElementById("edit-child").value,
        description: document.getElementById("edit-desc").value,
    };

    try {
        let ID = await getUserID();
        let userRef = db.collection("userProfiles").doc(ID);
        await userRef.update(updatedData);

        document.getElementById("display-name").textContent = updatedData.name;
        document.getElementById("display-email").textContent = updatedData.email;
        document.getElementById("display-housing").textContent = updatedData.housing;
        document.getElementById("display-experience").textContent = updatedData.pastExperience;
        document.getElementById("display-child").src = updatedData.children;
        document.getElementById("display-desc").src = updatedData.description;

        alert("Successfully updated!");
        hideEditForm();

        window.location.reload();
    } catch (error) {
        console.error("Fail to update user information:", error);
    }
});