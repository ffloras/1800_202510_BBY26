function displayUserInfo() {
    let params = new URL(window.location.href);
    let ID = params.searchParams.get("userID");

    db.collection("userProfiles")
        .doc(ID)
        .get()
        .then(doc => {
            user = doc.data();
            userName = user.name;
            userEmail = user.email;
            userHousing = user.housing;
            userExperience = user.pastExperience;
            userDesc = user.description;
            image = user.profileImage;
            userChild = user.children;

            document.querySelector("#avatar-img").src = "data:image/png;base64," + image;
            document.getElementById("name").innerHTML = userName;
            document.getElementById("email").innerHTML = userEmail;
            document.getElementById("housing").innerHTML = userHousing;
            document.getElementById("description").innerHTML = userDesc;

            if (userChild) {
                document.getElementById("child").innerHTML = "Yes";
            } else {
                document.getElementById("child").innerHTML = "No";
            }

            if (userExperience) {
                document.getElementById("experience").innerHTML = "Yes";
            } else {
                document.getElementById("experience").innerHTML = "No";
            }
        });
}
displayUserInfo();
