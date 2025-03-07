function displayPetCards(collection) {
    let cardTemplate = document.getElementById("petCardTemplate");

    if (!cardTemplate) {
        console.error("Template element not found");
        return;
    }

    db.collection(collection).get()
        .then(allPets => {
            allPets.forEach(doc => {
                var title = doc.data().name;
                var age = doc.data().age;
                var breed = doc.data().breed;
                var desc = doc.data().description;
                var petCode = doc.data().petCode;
                var docID = doc.id;

                let newcard = cardTemplate.content.cloneNode(true);

                newcard.querySelector(".pet-name").innerHTML = "NAME: " + title;
                newcard.querySelector(".pet-age").innerHTML = "AGE: " + age + " year/s";
                newcard.querySelector(".pet-breed").innerHTML = "BREED: " + breed;
                newcard.querySelector(".pet-desc").innerHTML = desc;
                newcard.querySelector(".pet-img").src = `../images/${petCode}.jpeg`;
                newcard.querySelector("#details").href = "AdoptPetDetails.html?docID=" + docID;

                document.getElementById(collection + "-go-here").appendChild(newcard);
            })
        })
}

displayPetCards("petProfiles");