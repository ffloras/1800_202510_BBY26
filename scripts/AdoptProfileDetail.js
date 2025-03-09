function displayUserInfo() {
    let params = new URL(window.location.href);
    let ID = params.searchParams.get("docID");

    db.collection("userProfiles")
        .doc(ID)
        .get()
        .then(doc => {
            user = doc.data();
            userName = user.name;
            userEmail = user.email;
            userHousing = user.housing;
            userExperience = user.pastExperience;

            document.getElementById("name").innerHTML = userName;
            document.getElementById("email").innerHTML = userEmail;
            document.getElementById("housing").innerHTML = userHousing;
            document.getElementById("experience").innerHTML = userExperience;
            document.getElementById("purpose").innerHTML = userPurpose;
        });
}
displayUserInfo();