function myFunction() {
  window.setTimeout("myFunction()", 500);
  var x = document.getElementById("randomcolor"),
    txt = x.textContent,
    newText = "";
  for (var i = 0, l = txt.length; i < l; i++) {
    newText += txt.charAt(i).fontcolor(getColor());
  }
  x.innerHTML = newText;
}

function getColor() {
  window.setTimeout("getColor()", 500);
  var colorString = "";
  for (var i = 0; i < 6; i++) {
    var num = Math.floor(Math.random() * 17);
    hexNum = num.toString(16);
    colorString += hexNum;
  }
  return colorString;
}

// When the user scrolls the page, execute myFunction
window.onscroll = function() {stickynavbar()};

// Get the navbar
var navbar = document.getElementById("navbar");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function stickynavbar() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}