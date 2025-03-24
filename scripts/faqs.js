getAdoptInfo();
setType();

function getAdoptInfo() {
  console.log($('#info').load('/html/Components/adoptInfo.html'));
}

function getRehomeInfo() {
  console.log($('#info').load('/html/Components/rehomeInfo.html'));
}

//obtain the type of navbar/footer to display
function getType() {
  let params = new URL(window.location.href);
  let type = params.searchParams.get("type");
  return type;
}

//sets the appropriate navbar/footer
function setType() {
  let type = getType();
  if (type == "rehome") {
    document.getElementById("adoptNavbarPlaceholder").id = "rehomeNavbarPlaceholder";
    document.getElementById("adoptFooterPlaceholder").id = "rehomeFooterPlaceholder";
  }
}