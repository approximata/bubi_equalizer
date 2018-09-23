
var Bubi = React.createClass({
	getInitialState: function() {
		return {
			stations: [],
		};
	},

  componentDidMount: function() {
    let that = this;
    fetch('http://futar.bkk.hu/bkk-utvonaltervezo-api/ws/otp/api/where/bicycle-rental.json?key=apaiary-test&version=3&appVersion=apiary-1.0&includeReferences=true', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      cache: 'default',
    }).then(function(response){
      return response.json();
    }).then(function(stationResponse){
      that.setState({stations: stationResponse});
      console.log(stationResponse);
    })
  },

  // getBubiData: function(cb) {
  // 	var r = new XMLHttpRequest;
  // 	r.open("GET", "https://nextbike.net/maps/nextbike-live.xml?domains=mb", true);
  // 	r.onload = function() {
  // 		var cityXml = r.responseXML.firstChild.firstChild.firstChild;
  //     console.log(cityXml);
  // 		cb(cityXml)
  // 	};
  // 	r.send();
  // }
  //
  // getPrettyName: function(unique_name) {
  // 	var r = new RegExp('^\\d{4}[ -](.*)$');
  // 	var match = r.exec(unique_name);
  // 	if (match != null) {
  // 		return match[1].trim();
  // 	}
  // 	throw new Error("RegExp didn't work");
  // }
  //
  // getStations: function(callback) {
  // 	var time = new Date();
  // 	this.getBubiData(function(cityXml) {
  // 		var stations = [];
  // 		for (var i=0; i < cityXml.childNodes.length; i++) {
  // 			var item = cityXml.childNodes.item(i);
  // 			stations.push({
  // 				uid: item.getAttribute('uid'),
  // 				lat: item.getAttribute('lat'),
  // 				lng: item.getAttribute('lng'),
  // 				unique_name: item.getAttribute('name'),
  // 				name: this.getPrettyName(item.getAttribute('name')),
  // 				num_bikes: item.getAttribute('bikes'),
  // 				max_bikes: item.getAttribute('bike_racks'),
  // 				distance: null,
  // 			});
  // 		}
  // 		stations.sort(function(a, b) {
  // 			return (a.name < b.name) ? -1 : 1;
  // 		});
  // 		callback(stations, time);
  // 	});
  // }

  render: function () {
    return (
      <div className="stations">
          {this.state.stations.map((stations) =>
          <div key={stations.id}>
            <div className="stations" name="listed">
              <p>{stations.lat}</p>
              <p>{stations.lon}</p>
              <p>{stations.bikes}</p>
            </div>
          </div>
        )}
      </div>
    )
  }
});

ReactDOM.render(
  <Bubi />,
  document.querySelector('.main')
);
