document.getElementById('contact-submit').onclick = function() {
    var data = document.getElementById("data").value;
    var key = document.getElementById("key").value;
    var string = "";
    var inputs = [], j = 0;
    if (key == "test") {
        for (var i = 0; i <= data.length; i++) {
            if (data[i] == '\n' || i == data.length) {
                inputs[j] = string;
                j = 0;
                string = "";
                console.log(inputs);
                var json = {};
                json.inputs = inputs;
                var xhttp = new XMLHttpRequest();
                xhttp.open("POST", "http://localhost:8080/addData", true);
                // xhttp.onload = function() {}
                xhttp.setRequestHeader('Content-Type', 'application/json');
                // console.log(json);
                xhttp.send(JSON.stringify(json));
            } else if (data[i] == '\t') {
                inputs[j++] = string;
                string = "";
            } else {
                string += data[i];
            }
        }
        // var json = {};
        // json.inputs = inputs;
        // var xhttp = new XMLHttpRequest();
        // xhttp.open("POST", "http://localhost:8080/addData", true);
        // xhttp.onload = function() {
        //     // json = JSON.parse(xhttp.responseText);
        //     // var length = Object.keys(json).length;
        //     // document.getElementById('h2con').innerHTML = length.toString() + " result(s) found";
        //     // console.log(json);
        //     // console.log(Object.keys(json).length);
        //     // for (var i = 0; i < json.length; i++) {
        //     //     document.getElementById('results').innerHTML += "<h3>"+json[i].name +
        //     //     "</h3><h4>Section: " + json[i].section + "<br/>State: " + json[i].state + "<br/>No of members: " +
        //     //     json[i].members + "</h4>";
        //     // }
        // }
        // xhttp.setRequestHeader('Content-Type', 'application/json');
        // console.log(json);
        // xhttp.send(JSON.stringify(json));
        alert(string);
    } else {
        alert("Wrong key")
    }
}

function redirectTo(name, section, state) {
	var min = document.getElementById("min").value;
	var max = document.getElementById("max").value;
	if (max != "" && min != "" && parseInt(max) < parseInt(min)) {
		alert("Invalid combination of maximum and minimum");
	} else {
		if (min == "") min = "0";
		if (max == "") max = "1000";
		localStorage.setItem("ieeecs", "{\"name\":\""+name+"\",\"section\":\""+section+"\",\"state\":\""+state+"\",\"min\":\""+min+"\",\"max\":\""+max+"\"}");
		window.location.href = "search.html";
	}
}

function prompt() {
	var person = prompt("Please enter your name", "Harry Potter");
}