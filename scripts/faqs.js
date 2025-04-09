getAdoptInfo();
setType();

//populates adoption info when user clicks the "adopt a pet" button
function getAdoptInfo() {
  console.log($('#info').load('/html/components/adoptInfo.html'));
  //sets button color to grey when clicked on
  document.getElementById("adopt").style.backgroundColor = '#dcdcdc';
  document.getElementById("rehome").style.backgroundColor = '#fffacd';
}

//populates rehoming info when user clicks the "rehoming my pet" button
function getRehomeInfo() {
  console.log($('#info').load('/html/components/rehomeInfo.html'));
  //sets button color to grey when clicked on
  document.getElementById("adopt").style.backgroundColor = '#fffacd';
  document.getElementById("rehome").style.backgroundColor = '#dcdcdc';
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