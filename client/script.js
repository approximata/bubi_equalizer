'use strict';

var bubimap = {
      roosevelt: {
        center: {lat: 47.499329, lng: 19.046342},
        bikes: 13
      },
      clark: {
        center: {lat: 47.497584, lng: 19.040793},
        bikes: 5
      }
    };


function getBubiData(cb) {
	var r = new XMLHttpRequest;
	r.open("GET", "https://nextbike.net/maps/nextbike-live.xml?domains=mb", true);
	r.onload = function() {
		var cityXml = r.responseXML.firstChild.firstChild.firstChild;
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

function getStations(cb) {
	getBubiData(function(cityXml) {
    var stations = [];
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
    cb(stations);
  });
}

function initMap() {
  getStations(function(stations)
  {
    console.log(stations);
    var styledMapType = new google.maps.StyledMapType(
      [
        {
            "featureType": "all",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#000000"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "on",
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        }
      ],
      {name: 'Styled Map'}
    );

    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 47.499329, lng: 19.046342},
      zoom: 14,
      disableDefaultUI: true,
      mapTypeControlOptions: {
        mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                'styled_map']
      }
    });

    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');


    for (var station in stations) {
      console.log(stations[station].lat);
            var bubiCircle = new google.maps.Circle({
              strokeColor: '#FC0280',
              strokeOpacity: 1,
              strokeWeight: 5,
              fillOpacity: 0,
              map: map,
              center: {lat: +stations[station].lat, lng: +stations[station].lng},
              radius: stations[station].num_bikes * 5
            });
          }
  });
}
