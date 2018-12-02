class mapView{

	constructor (activeYear) {
		this.activeYear = activeYear;
    	d3.select("#map-view-box").attr("style", "height:500px");
    	this.mymap = L.map('map-view-box', {
    		center: [40.759759, -111.861619],
    		minZoom: 11,
    		zoom: 11
    	});

        let yearData = [];
        this.markerClusters = L.markerClusterGroup({maxClusterRadius: 40, chunkedLoading: true});
        this.control = L.control.layers(null, null, { collapsed: false, sortLayers: true});
        this.control.addTo(this.mymap);
	}

	showCrimeMarkers(markers) {
		let that = this;
		var greenIcon = new L.Icon({
	        iconUrl: 'assets/img/marker-icon-2x-green.png',
	          shadowUrl: 'assets/img/marker-shadow.png',
	          iconSize: [25, 41],
	          iconAnchor: [12, 41],
	          popupAnchor: [1, -34],
	          shadowSize: [41, 41]
	      });
	    var redIcon = new L.Icon({
	        iconUrl: 'assets/img/marker-icon-2x-red.png',
	          shadowUrl: 'assets/img/marker-shadow.png',
	          iconSize: [25, 41],
	          iconAnchor: [12, 41],
	          popupAnchor: [1, -34],
	          shadowSize: [41, 41]
	      });
	    var violetIcon = new L.Icon({
	        iconUrl: 'assets/img/marker-icon-2x-violet.png',
	          shadowUrl: 'assets/img/marker-shadow.png',
	          iconSize: [25, 41],
	          iconAnchor: [12, 41],
	          popupAnchor: [1, -34],
	          shadowSize: [41, 41]
	      });
        var blackIcon = new L.Icon({
            iconUrl: 'assets/img/marker-icon-2x-black.png',
              shadowUrl: 'assets/img/marker-shadow.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowSize: [41, 41]
          });
        var blueIcon = new L.Icon({
            iconUrl: 'assets/img/marker-icon-2x-blue.png',
              shadowUrl: 'assets/img/marker-shadow.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowSize: [41, 41]
          });
        var greyIcon = new L.Icon({
            iconUrl: 'assets/img/marker-icon-2x-grey.png',
              shadowUrl: 'assets/img/marker-shadow.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowSize: [41, 41]
          });
        var orangeIcon = new L.Icon({
            iconUrl: 'assets/img/marker-icon-2x-orange.png',
              shadowUrl: 'assets/img/marker-shadow.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowSize: [41, 41]
          });
        var yellowIcon = new L.Icon({
            iconUrl: 'assets/img/marker-icon-2x-yellow.png',
              shadowUrl: 'assets/img/marker-shadow.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowSize: [41, 41]
          });


        this.groupAssault = L.featureGroup.subGroup(this.markerClusters);
        this.groupBurglary = L.featureGroup.subGroup(this.markerClusters);
        this.groupDamagedProperty = L.featureGroup.subGroup(this.markerClusters);
        this.groupDrugs = L.featureGroup.subGroup(this.markerClusters);
        this.groupHitAndRun = L.featureGroup.subGroup(this.markerClusters);
        this.groupHomicide = L.featureGroup.subGroup(this.markerClusters);
        this.groupKidnap = L.featureGroup.subGroup(this.markerClusters);
        this.groupTraffic = L.featureGroup.subGroup(this.markerClusters);
        this.groupWeapons = L.featureGroup.subGroup(this.markerClusters);

	    var icons = [redIcon, greenIcon, violetIcon, blackIcon, blueIcon, greyIcon, orangeIcon, yellowIcon];

        for(let i = 0; i < markers.length; i++){
            let icon;
            switch(markers[i]["DESCRIPTION"]){
                case "Assault":
                    icon = violetIcon;
                    break;
                case "Burglary/ Larceny/ Robbery":
                    icon = blueIcon;
                    break;
                case "Damaged Property":
                    icon = greenIcon;
                    break;
                case "Drugs":
                    icon = yellowIcon;
                    break;
                case "Homicide":
                    icon = orangeIcon;
                    break;
                case "Traffic":
                    icon = redIcon;
                    break;
                case "Weapons":
                    icon = greyIcon;
                    break;
                case "Kidnap":
                    icon = blackIcon;
                    break;
                default :
                    icon = blackIcon;
                    break;
            }

            let dateStr = markers[i]["MONTH"] + "/" + markers[i]["DAY"] + "/" + markers[i]["YEAR"];

            let markerTemp = L.marker([markers[i]["LATITUDE"], markers[i]["LONGITUDE"]], {icon: icon})
                             .bindPopup("Location of Crime: " + markers[i]["ADDRESS"] + "<br>Crime Type: "
                            + markers[i]["DESCRIPTION"] + "<br>Date of Occurence: " + dateStr);

            switch(markers[i]["DESCRIPTION"]){
                case "Assault":
                    markerTemp.addTo(that.groupAssault);
                    break;
                case "Burglary/ Larceny/ Robbery":
                    markerTemp.addTo(that.groupBurglary);
                    break;
                case "Damaged Property":
                    markerTemp.addTo(that.groupDamagedProperty);
                    break;
                case "Drugs":
                    markerTemp.addTo(that.groupDrugs);
                    break;
                case "Hit and Run":
                    markerTemp.addTo(that.groupHitAndRun);
                    break;
                case "Homicide":
                    markerTemp.addTo(that.groupHomicide);
                    break;
                case "Traffic":
                    markerTemp.addTo(that.groupTraffic);
                    break;
                case "Weapons":
                    markerTemp.addTo(that.groupWeapons);
                    break;
                case "Kidnap":
                    markerTemp.addTo(that.groupKidnap);
                    break;
                default :
                    break;
            }
        }
    }

    showViews(year, crime_list){
    	let that = this;
	    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        	    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        	    subdomains: ['a', 'b', 'c'],
        	  	maxZoom: 18,
        	    minZoom: 11
	        }).addTo(that.mymap);

        this.markerClusters.clearLayers();

        d3.csv("data/" + year + ".csv").then(function(yearData){
            try{
            	let plotData = JSON.parse(JSON.stringify(yearData));
                let filteredData = plotData.filter(d => crime_list.indexOf(d["DESCRIPTION"]) != -1);

                function changeOverlay() {
                    that.mymap.removeControl(that.control);
                }

                changeOverlay()
                that.control = L.control.layers(null, null, { collapsed: false })


                that.showCrimeMarkers(filteredData);
                for (var i = 0; i < crime_list.length; i++) {
                    let crime = crime_list[i];
                    switch (crime) {
                        case "Assault":
                            that.control.addOverlay(that.groupAssault, 'Assault');
                            break;
                        case "Burglary/ Larceny/ Robbery":
                            that.control.addOverlay(that.groupBurglary, 'Burglary');
                            break;
                        case "Damaged Property":
                            that.control.addOverlay(that.groupDamagedProperty, 'Damaged property');
                            break;
                        case "Drugs":
                            that.control.addOverlay(that.groupDrugs, 'Drug offense');
                            break;
                        case "Hit and Run":
                            that.control.addOverlay(that.groupHitAndRun, 'Hit and Run');
                            break;
                        case "Homicide":
                            that.control.addOverlay(that.groupHomicide, 'Homicide');
                            break;
                        case "Kidnap":
                            that.control.addOverlay(that.groupKidnap, 'Kidnapping');
                            break;
                        case "Traffic":
                            that.control.addOverlay(that.groupTraffic, 'Traffic violation');
                            break;
                        case "Weapons":
                            that.control.addOverlay(that.groupWeapons, 'Weapons offense');
                            break;
                        default :
                            break;
                    }
                }


                that.control.addTo(that.mymap);

                that.groupAssault.addTo(that.mymap);
                that.groupBurglary.addTo(that.mymap);
                that.groupDamagedProperty.addTo(that.mymap);
                that.groupDrugs.addTo(that.mymap);
                that.groupHitAndRun.addTo(that.mymap);
                that.groupHomicide.addTo(that.mymap);
                that.groupKidnap.addTo(that.mymap);
                that.groupTraffic.addTo(that.mymap);
                that.groupWeapons.addTo(that.mymap);

				d3.select('#leaflet-control-layers-overlays').style('text-align', 'center');
            }
            catch(error){
                console.log(error);
            }
    	});
        that.markerClusters.addTo(that.mymap);
    }
}