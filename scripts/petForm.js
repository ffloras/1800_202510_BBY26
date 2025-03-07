function savePetInfo(collection) {
    var petName = document.getElementById("inputName").value;
    var petAge = document.getElementById("inputAge").value;
    var petBreed = document.getElementById("inputBreed").value;
    var petDesc = document.getElementById("inputDescription").value;
    var petSize = document.getElementById("inputSize").value;
    var isFemale;
    var userID;

    if (document.getElementById("radio1").checked) {
        isFemale = false;
    } else {
        isFemale = true;
    }

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var userEmail = user.email;

            db.collection("userProfiles").where("email", "==", userEmail).get()
                .then(async querySnapshot => {
                    if (!querySnapshot.empty) {
                        var userDoc = querySnapshot.docs[0];
                        userID = userDoc.id.toString();

                        const res = await db.collection(collection).add({
                            name: petName,
                            age: petAge,
                            breed: petBreed,
                            description: petDesc,
                            isFemale: isFemale,
                            interested: [],
                            ownerID: "" + userID,
                            petCode: '',
                            size: petSize,
                            status: true
                        });
                    }
                })
        }
    })
}