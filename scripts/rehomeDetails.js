var params = new URL(window.location.href);
var petID = params.searchParams.get("petID");

// Display the information of the pet which is selected
function displayPetInfo() {
    db.collection("petProfiles")
        .doc(petID)
        .get()
        .then(doc => {
            pet = doc.data();
            petName = pet.name;
            petAge = pet.age;
            petBreed = pet.breed;
            petDesc = pet.description;
            petSize = pet.size;
            petType = pet.petType;
            petLocation = pet.location;
            image = pet.petCode;

            document.querySelector("#card-image").src = "data:image/png;base64," + image;   
            document.getElementById("name").innerHTML = "Name: " + petName;
            document.getElementById("age").innerHTML = "Age: " + petAge;
            document.getElementById("breed").innerHTML = "Breed: " + petBreed;
            document.getElementById("desc").innerHTML = "Description: " + petDesc;
            document.getElementById("size").innerHTML = "Size: " + petSize;
            document.getElementById("type").innerHTML = "Pet type: " + petType;
            document.getElementById("location").innerHTML = "Location: " + petLocation;
        });
}
displayPetInfo();

// CLose the post which is shown on the browsing page
function closeProfile() {
    db.collection('petProfiles')
       .doc(petID)
       .update({
            status: false
        });
    document.getElementById("close-btn").style.display = "none";
    document.getElementById("open-btn").style.display = "block";
}

// Open the post and show it on the browsing page
function openProfile() {
    db.collection('petProfiles')
       .doc(petID)
       .update({
            status: true
        });
    document.getElementById("close-btn").style.display = "block";
    document.getElementById("open-btn").style.display = "none";
}

// Delete the pet information from the database
function deleteProfile() {
    let userID = getUserID();
    if (confirm("Are you sure you want to delete this pet's information?")) {
        removePetFromUser(userID, petID);
        db.collection('petProfiles')
            .doc(petID)
            .delete()
            .then(() => {
                window.location.href = "/html/rehomeMain.html";
            })
            .catch((error) => {
                console.error("Error deleting pet information:", error);
                alert("Please try again.");
            });
    } else {
    }
}

// Remove the pet id from the user's profile collection in database
function removePetFromUser(userId, petId) {
    db.collection('userProfiles')
        .doc(userId)
        .update({
            pets: firebase.firestore.FieldValue.arrayRemove(petId)
        })
        .catch((error) => {
            console.error("Fail to delete pet id from pets array:", error);
        });
}

// Get the Id of the current user
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

var editBtn = document.getElementById("edit-btn");
var editForm = document.getElementById("edit-form");
var editPetForm = document.getElementById("edit-pet-form");
var petInfo = document.querySelector(".pet-info");

// Show the information of the pet on the edit form
function showEditForm(petData) {
    document.getElementById("edit-name").value = petData.name;
    document.getElementById("edit-age").value = petData.age;
    document.getElementById("edit-breed").value = petData.breed;
    document.getElementById("edit-desc").value = petData.description;
    document.getElementById("edit-size").value = petData.size;
    document.getElementById("edit-type").value = petData.petType;
    document.getElementById("edit-location").value = petData.location;

    editForm.style.display = "block";
    petInfo.style.display = "none";
}

// Exit the edit form
function hideEditForm() {
    editForm.style.display = "none";
    petInfo.style.display = "block";
}

// Show the edit form when the edit button is clicked
editBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let petData = {
        name: document.getElementById('name').textContent.replace('Name: ', ''),
        age: document.getElementById('age').textContent.replace('Age: ', ''),
        breed: document.getElementById('breed').textContent.replace('Breed: ', ''),
        description: document.getElementById('desc').textContent.replace('Description: ', ''),
        size: document.getElementById('size').textContent.replace('Size: ', ''),
        petType: document.getElementById('type').textContent.replace('Pet type: ', ''),
        location: document.getElementById('location').textContent.replace('Location: ', '')
    };
    showEditForm(petData);
});

// Update the pet information when the edit form is submitted
editPetForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    let updatedData = {
        name: document.getElementById("edit-name").value,
        age: document.getElementById("edit-age").value,
        breed: document.getElementById("edit-breed").value,
        description: document.getElementById("edit-desc").value,
        size: document.getElementById("edit-size").value,
        petType: document.getElementById("edit-type").value,
        location: document.getElementById("edit-location").value
    };

    try {
        let petRef = db.collection("petProfiles").doc(petID);
        await petRef.update(updatedData);

        document.getElementById("name").textContent = `Name: ${updatedData.name}`;
        document.getElementById("age").textContent = `Age: ${updatedData.age}`;
        document.getElementById("breed").textContent = `Breed: ${updatedData.breed}`;
        document.getElementById("desc").textContent = `Description: ${updatedData.description}`;
        document.getElementById("size").textContent = `Size: ${updatedData.size}`;
        document.getElementById("type").textContent = `Pet type: ${updatedData.petType}`;
        document.getElementById("location").textContent = `Location: ${updatedData.location}`;

        alert("Successfully updated!");
        hideEditForm();
    } catch (error) {
        console.error("Fail to change pet information:", error);
    }
});