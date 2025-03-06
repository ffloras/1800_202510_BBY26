function displayPetCards(collection) {
    let cardTemplate = document.getElementById("petCardTemplate");

    if (!cardTemplate) {
        console.error("Template element not found");
        return;
    }

    db.collection(collection).get()
        .then(allPets => {
            allPets.forEach(doc => {
                var title = doc.data().Name;
                var age = doc.data().Age;
                var breed = doc.data().Breed;
                var desc = doc.data().Description;
                var petCode = doc.data().petCode;

                let newcard = cardTemplate.content.cloneNode(true);

                newcard.querySelector(".pet-name").innerHTML = title;
                newcard.querySelector(".pet-age").innerHTML = age;
                newcard.querySelector(".pet-breed").innerHTML = breed;
                newcard.querySelector(".pet-desc").innerHTML = desc;
                newcard.querySelector(".pet-img").src = `../images/${petCode}.jpeg`;

                document.getElementById(collection + "-go-here").appendChild(newcard);
            })
        })
}

displayPetCards("petProfiles");