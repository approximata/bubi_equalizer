'use strict;'
var button = document.querySelector('button');

var stations = [];

function getBubiData(cb) {
	var r = new XMLHttpRequest;
	r.open("GET", "https://nextbike.net/maps/nextbike-live.xml?domains=mb", true);
	r.onload = function() {
		var cityXml = r.responseXML.firstChild.firstChild.firstChild;
    console.log(cityXml);
		cb(cityXml)
	};
	r.send();
}

function getPrettyName(unique_name) {
	var r = new RegExp('^\\d{4}[ -](.*)$');
	var match = r.exec(unique_name);
	if (match != null) {
		return match[1].trim();
	}
	throw new Error("RegExp didn't work");
}

function getStations() {
	getBubiData(function(cityXml) {
		for (var i=0; i < cityXml.childNodes.length; i++) {
			var item = cityXml.childNodes.item(i);
			stations.push({
				uid: item.getAttribute('uid'),
				lat: item.getAttribute('lat'),
				lng: item.getAttribute('lng'),
				unique_name: item.getAttribute('name'),
				name: getPrettyName(item.getAttribute('name')),
				num_bikes: item.getAttribute('bikes'),
				max_bikes: item.getAttribute('bike_racks'),
				distance: null,
			});
		}
    console.log(stations);
    return stations;
  });
}



button.addEventListener('click', getStations);
