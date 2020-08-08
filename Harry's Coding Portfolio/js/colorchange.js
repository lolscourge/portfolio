function myFunction()
{
  window.setTimeout( "myFunction()", 500); 
    var x = document.getElementById("randomcolor"),
        txt = x.textContent,
        newText = "";
    for(var i=0, l=txt.length; i<l; i++)
    {
        newText += txt.charAt(i).fontcolor(getColor());
    }
    x.innerHTML = newText;
}

function getColor()
{
  window.setTimeout( "getColor()", 500); 
    var colorString="";
    for(var i=0;i<6;i++)
    {
        var num = Math.floor(Math.random()*17);
        hexNum = num.toString(16);
        colorString += hexNum;
    }
    return colorString;
}