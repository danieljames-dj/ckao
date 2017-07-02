function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var id = getParameterByName('id');
var passcode = getParameterByName('passcode');
console.log(id);

var xhttp = new XMLHttpRequest();
xhttp.open("POST", "/getDet", true);
xhttp.onload = function() {
	json = JSON.parse(xhttp.responseText);
	// var length = Object.keys(json).length;
	// document.getElementById('h2con').innerHTML = length.toString() + " result(s) found";
	console.log(json);
	if (json.success == false) {
		alert('Looks like you do not have any events which have multiple slots. If you do have any events with multiple slot, please contact the organizer.');
	} else {
		document.getElementById('name').innerHTML = 'Hi ' + json.name + ',\nPlease select your time slots. If any time slot is not visible, then that slot will be full.';
		var i;
		var e333 = [];
		var e222 = [];
		var e444 = [];
		var e333oh = [];
		var epyram = [];
		var eskewb = [];
		for (i = 0; i < json.list.length; i++) {
			if (json.list[i].event == 'e333') {
				e333.push(json.list[i]);
			}
			if (json.list[i].event == 'e222') {
				e222.push(json.list[i]);
			}
			if (json.list[i].event == 'e444') {
				e444.push(json.list[i]);
			}
			if (json.list[i].event == 'e333oh') {
				e333oh.push(json.list[i]);
			}
			if (json.list[i].event == 'epyram') {
				epyram.push(json.list[i]);
			}
			if (json.list[i].event == 'eskewb') {
				eskewb.push(json.list[i]);
			}
		}
		function getString(timeslot) {
			return timeslot.substring(0,1) + ' ' + timeslot.substring(1,3) + ':' + timeslot.substring(3,5) + ' HRS to ' +
			timeslot.substring(5,7) + ':' + timeslot.substring(7,9);
		}
		if (e333.length > 0) {
			var obj = e333;
			var text = ""
			text += `
			<fieldset>
				<select id="e333" class="form-control" data-style="btn-primary">
				<option value="1">Rubik's Cube - Any Time Slot</option>`;
			for (var j = 0; j < obj.length; j++) {
				console.log("GG")
				text += `<option value="` + obj[j].id + `">Rubik's Cube - Day ` + getString(obj[j].timeslot) + ` HRS</option>`
			}
			console.log("HH")
			text += `</select>
			</fieldset>
			`;
			document.getElementById('form').innerHTML += text;
		}
		if (e222.length > 0) {
			var obj = e222;
			var text = ""
			text += `
			<fieldset>
				<select id="e222" class="form-control" data-style="btn-primary">
				<option value="1">2x2x2 - Any Time Slot</option>`;
			for (var j = 0; j < obj.length; j++) {
				console.log("GG")
				text += `<option value="` + obj[j].id + `">2x2x2 - Day ` + getString(obj[j].timeslot) + ` HRS</option>`
			}
			console.log("HH")
			text += `</select>
			</fieldset>
			`;
			document.getElementById('form').innerHTML += text;
		}
		if (e444.length > 0) {
			var obj = e444;
			var text = ""
			text += `
			<fieldset>
				<select id="e444" class="form-control" data-style="btn-primary">
				<option value="1">4x4x4 - Any Time Slot</option>`;
			for (var j = 0; j < obj.length; j++) {
				console.log("GG")
				text += `<option value="` + obj[j].id + `">4x4x4 - Day ` + getString(obj[j].timeslot) + ` HRS</option>`
			}
			console.log("HH")
			text += `</select>
			</fieldset>
			`;
			document.getElementById('form').innerHTML += text;
		}
		if (e333oh.length > 0) {
			var obj = e333oh;
			var text = ""
			text += `
			<fieldset>
				<select id="e333oh" class="form-control" data-style="btn-primary">
				<option value="1">3x3x3 One-Handed - Any Time Slot</option>`;
			for (var j = 0; j < obj.length; j++) {
				console.log("GG")
				text += `<option value="` + obj[j].id + `">3x3x3 One-Handed - Day ` + getString(obj[j].timeslot) + ` HRS</option>`
			}
			console.log("HH")
			text += `</select>
			</fieldset>
			`;
			document.getElementById('form').innerHTML += text;
		}
		if (epyram.length > 0) {
			var obj = epyram;
			var text = ""
			text += `
			<fieldset>
				<select id="epyram" class="form-control" data-style="btn-primary">
				<option value="1">Pyraminx - Any Time Slot</option>`;
			for (var j = 0; j < obj.length; j++) {
				console.log("GG")
				text += `<option value="` + obj[j].id + `">Pyraminx - Day ` + getString(obj[j].timeslot) + ` HRS</option>`
			}
			console.log("HH")
			text += `</select>
			</fieldset>
			`;
			document.getElementById('form').innerHTML += text;
		}
		if (eskewb.length > 0) {
			var obj = eskewb;
			var text = ""
			text += `
			<fieldset>
				<select id="eskewb" class="form-control" data-style="btn-primary">
				<option value="1">Skewb - Any Time Slot</option>`;
			for (var j = 0; j < obj.length; j++) {
				console.log("GG")
				text += `<option value="` + obj[j].id + `">Skewb - Day ` + getString(obj[j].timeslot) + ` HRS</option>`
			}
			console.log("HH")
			text += `</select>
			</fieldset>
			`;
			document.getElementById('form').innerHTML += text;
		}
		document.getElementById('contact-submit').onclick = function() {
			console.log("HII");
			var objF = {};
			if (document.getElementById('e333')) objF.e333 = document.getElementById('e333').value;
			if (document.getElementById('e222')) objF.e222 = document.getElementById('e222').value;
			if (document.getElementById('e444')) objF.e444 = document.getElementById('e444').value;
			if (document.getElementById('e333oh')) objF.e333oh = document.getElementById('e333oh').value;
			if (document.getElementById('epyram')) objF.epyram = document.getElementById('epyram').value;
			if (document.getElementById('eskewb')) objF.eskewb = document.getElementById('eskewb').value;
			objF.id = id;
			// objF.secretCode = document.getElementById("key").value;
			console.log(objF);
			var xhttp = new XMLHttpRequest();
			xhttp.open("POST", "/setDet", true);
			xhttp.onload = function() {
				json = JSON.parse(xhttp.responseText);
				if (json.success == true) {
					alert("Data successfully added")
				} else {
					alert("Something went wrong, please contact organizer")
				}
			}
			xhttp.setRequestHeader('Content-Type', 'application/json');
			var json = {}
			json.objF = objF;
			console.log(json);
			xhttp.send(JSON.stringify(json));
		}
	}
	// console.log(Object.keys(json).length);
	// for (var i = 0; i < json.length; i++) {
	//     document.getElementById('results').innerHTML += "<h3>"+json[i].name +
	//     "</h3><h4>Section: " + json[i].section + "<br/>State: " + json[i].state + "<br/>No of members: " +
	//     json[i].members + "</h4>";
	// }
}
xhttp.setRequestHeader('Content-Type', 'application/json');
var json = {}
json.id = id;
json.passcode = passcode;
console.log(json);
xhttp.send(JSON.stringify(json));

// document.getElementById('contact-submit').onclick = function() {
// 	var re = /[a-zA-Z]+/;
// 	var name = document.getElementById("nameVal").value;
// 	var sectionHead = document.getElementById("section");
// 	var section = sectionHead.options[sectionHead.selectedIndex].value;
// 	var stateHead = document.getElementById("state");
// 	var state = stateHead.options[stateHead.selectedIndex].value;
// 	if (name.match(re)) {
// 		redirectTo(name, section, state);
// 	} else if (section != "Any Section") {
// 		redirectTo(name, section, state);
// 	} else if (state != "Any State") {
// 		redirectTo(name, section, state);
// 	} else {
// 		alert("Enter at least one field (other than minimum and maximum number of members)");
// 	}
// }

// function redirectTo(name, section, state) {
// 	var min = document.getElementById("min").value;
// 	var max = document.getElementById("max").value;
// 	if (max != "" && min != "" && parseInt(max) < parseInt(min)) {
// 		alert("Invalid combination of maximum and minimum");
// 	} else {
// 		if (min == "") min = "0";
// 		if (max == "") max = "1000";
// 		localStorage.setItem("ieeecs", "{\"name\":\""+name+"\",\"section\":\""+section+"\",\"state\":\""+state+"\",\"min\":\""+min+"\",\"max\":\""+max+"\"}");
// 		window.location.href = "search.html";
// 	}
// }

// function prompt() {
// 	var person = prompt("Please enter your name", "Harry Potter");
// }