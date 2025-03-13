function displayPetInfo() {
    let params = new URL(window.location.href);
    console.log(params);
    let ID = params.searchParams.get("docID");
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

            document.getElementById("name").innerHTML = petName;
            document.getElementById("age").innerHTML = petAge;
            document.getElementById("breed").innerHTML = petBreed;
            document.getElementById("desc").innerHTML = petDesc;
            document.getElementById("size").innerHTML = petSize;
        });
}
displayHikeInfo();