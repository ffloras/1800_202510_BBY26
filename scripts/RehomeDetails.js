function displayPetInfo() {
    let params = new URL(window.location.href);
    console.log(params);
    let ID = params.searchParams.get("ID");
    console.log(ID);

    db.collection("petProfiles")
        .doc(ID)
        .get()
        .then(doc => {
            pet = doc.data();
            petName = pet.name;
            petAge = pet.age;
            petBreed = pet.breed;
            petDesc = pet.description;
            petSize = pet.size;

            document.getElementById("name").innerHTML = "Name: " + petName;
            document.getElementById("age").innerHTML = "Age: " + petAge;
            document.getElementById("breed").innerHTML = "Breed: " + petBreed;
            document.getElementById("desc").innerHTML = "Description: " + petDesc;
            document.getElementById("size").innerHTML = "Size: " + petSize;
        });
}
displayPetInfo();