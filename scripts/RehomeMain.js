function displayCards(collection) {
    let cardTemplate = document.getElementById("card-template");
    let container = document.getElementById("container");
    let addPetButton = container.querySelector('.add-pet');

    container.querySelectorAll('.card:not(.add-pet)').forEach(card => card.remove());

    db.collection(collection).get()
        .then(pet => {
            pet.forEach(doc => {
                var docID = doc.id;
                var name = doc.data().name;

                let newcard = cardTemplate.content.cloneNode(true);

                newcard.querySelector('.name').innerHTML = name;
                newcard.querySelector('a').href = "RehomeMain.html?ID=" + docID;

                container.insertBefore(newcard, addPetButton);
            });
        })
        .catch(error => {
            console.error("Error fetching documents: ", error);
        });
}

displayCards("petProfiles");