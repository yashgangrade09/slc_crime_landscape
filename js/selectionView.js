function getData(mapViewObj, statisticsViewObj, timeSliderObj){
	let checkboxes = document.getElementsByName("crimeType");
	let crime_list = [];
	for (var i = 0; i < checkboxes.length; i++) {
		if (checkboxes[i].type == 'checkbox' && checkboxes[i].checked == true) {
			crime_list.push(checkboxes[i].value);
		}
	}
	activeYear = timeSliderObj.getYear();
	mapViewObj.showViews(activeYear, crime_list);
	statisticsViewObj.showViews(activeYear, crime_list);
}

function tooltip_render(crimedefinitions) {
	let tooltip = d3.select("#crime-selection-box")
		.append('div')
		.attr("class", "tooltip")
		.style("opacity", 0);
	let checkboxes = document.getElementsByName("crimeType");
	for (var i = 0; i < checkboxes.length; i++) {
		checkboxes[i].addEventListener("mouseover", function(event) {
			crime = event.target.value;
			definition = crimedefinitions[crime];
			tooltip.style("left", 100)
					.style("top", 100)
					.style("opacity", 100)
					.text(definition);
		});
		checkboxes[i].addEventListener("mouseout", function(event) {
			tooltip.style("opacity", 0)
					.text(definition);
		});
	}
}