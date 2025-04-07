function handleFileSelect(event, source, docID) {
    var file = event.target.files[0];
    
    if (file) {
        var reader = new FileReader();
        
        reader.onload = function(e) {
            var base64String = e.target.result.split(',')[1];

            saveImage(base64String, source, docID);
        };

        reader.readAsDataURL(file);
    }
}

function saveImage(image, source, docID) {
    if (source === "petForm") {
        db.collection("petProfiles").doc(docID).update({
            petCode: image
        })
    }
}