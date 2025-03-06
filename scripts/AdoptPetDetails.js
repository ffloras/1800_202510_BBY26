function viewContact() {
  clearMenu();
  let ownerName = "owner name";
  let email = "example@email.com";
  let emailLink = `mailto:${email}`;
  console.log(`email: ${email}`);
  document.getElementById("menuPlaceholder").innerHTML = `<h3>${ownerName}</h3>`;
  document.getElementById("emailLink").innerHTML = 'Email';
  document.getElementById("emailLink").href = emailLink;
  document.getElementById("contactLink").innerHTML = "Add to Contacts";
  document.getElementById("hidePlaceholder").innerHTML = "hide";
}

function viewURL() {
  clearMenu();
  let info = "<h4>URL</h4>";
  document.getElementById("menuPlaceholder").innerHTML = info;
  document.getElementById("hidePlaceholder").innerHTML = "hide";
}

function addFavorite() {
  clearMenu();
  let info = "<h3>Added to favorite</h3>";
  document.getElementById("menuPlaceholder").innerHTML = info;
  document.getElementById("hidePlaceholder").innerHTML = "hide";
}

function addMenuListener(){
  document.getElementById("hidePlaceholder").addEventListener("click", () => {
  clearMenu();
  });
}
addMenuListener();

function clearMenu () {
  document.getElementById("menuPlaceholder").innerHTML = "";
  document.getElementById("hidePlaceholder").innerHTML = "";
  document.getElementById("emailLink").innerHTML = "";
  document.getElementById("emailLink").href = "";
  document.getElementById("contactLink").innerHTML = "";
}