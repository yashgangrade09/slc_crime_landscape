let activeYear = '2008';

try{
	crime_list = ['Assault', 'Drugs']

	let mapViewObj = new mapView(activeYear);
	mapViewObj.showViews(activeYear, crime_list);

	d3.json("data/all_years.json").then(yeardata => {
		d3.json("data/all_months.json").then(monthdata => {
			d3.json("data/all_weeks.json").then(weekdata => {
				d3.json("data/all_hours.json").then(hourdata => {
					d3.json("data/crimedefinitions.json").then(crimedefinitions => {

						let statisticsViewObj = new StatisticsView(yeardata, monthdata, weekdata, hourdata);
						statisticsViewObj.showViews(activeYear, crime_list);

						let timeSliderObj = new TimeSlider(activeYear, mapViewObj, statisticsViewObj);
						timeSliderObj.drawYearBar();

						let applyFilter = document.getElementById("crime-selection-btn");
						applyFilter.onclick = function() {getData(mapViewObj, statisticsViewObj, timeSliderObj);};

						tooltip_render(crimedefinitions)

					});
				});
			});
		});
	});
}

catch(error){
	console.log(error);
}