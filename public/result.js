var json = localStorage.getItem("ieeecs");
localStorage.removeItem("ieeecs");
console.log(json);
document.getElementById('contact-submit').onclick = function() {
	window.location.href="index.html";
}
var xhttp = new XMLHttpRequest();
xhttp.open("POST", "http://52.34.39.20:8080/search", true);
xhttp.onload = function() {
	json = JSON.parse(xhttp.responseText);
	var length = Object.keys(json).length;
	document.getElementById('h2con').innerHTML = length.toString() + " result(s) found";
	console.log(json);
	console.log(Object.keys(json).length);
	for (var i = 0; i < json.length; i++) {
		document.getElementById('results').innerHTML += "<h3>"+json[i].name +
		"</h3><h4>Section: " + json[i].section + "<br/>State: " + json[i].state + "<br/>No of members: " +
		json[i].members + "</h4>";
	}
}
xhttp.setRequestHeader('Content-Type', 'application/json');
xhttp.send(json);
