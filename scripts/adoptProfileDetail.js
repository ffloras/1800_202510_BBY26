// Display the user information
function displayUserInfo() {
    let params = new URL(window.location.href);
    let ID = params.searchParams.get("userID");

    db.collection("userProfiles")
        .doc(ID)
        .get()
        .then(doc => {
            user = doc.data();
            userName = user.name;
            userHousing = user.housing;
            userExperience = user.pastExperience ? "Yes" : "No";
            hasChildren = user.children ? "Yes" : "No";
            hasPets = user.hasPets ? "Yes": "No";
            avatar = user.profileImage;
            userDescription = user.description;

            document.getElementById("name").innerHTML = userName;
            document.getElementById("past-experience").innerHTML = "<strong>Previous Experience with pets: </strong>" + userExperience;
            document.getElementById("current-pet").innerHTML = "<strong>Currently has another pet: </strong>" + hasPets;
            document.getElementById("has-children").innerHTML = "<strong>Living with young children: </strong>" + hasChildren;
            document.getElementById("housing").innerHTML = "<strong>Current Housing: </strong>" + userHousing;
            document.getElementById("avatar").src = "data:image/png;base64," + avatar;
            document.getElementById("description-title").innerHTML = "More about " + userName + ":";
            document.getElementById("description").innerHTML = userDescription;
        });
}
displayUserInfo();
