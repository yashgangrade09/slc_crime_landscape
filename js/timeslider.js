class TimeSlider {

	constructor (activeYear, mapView, statisticsView) {
		this.activeYear = activeYear;
        this.mapView = mapView;
        this.statisticsView = statisticsView;
	}

	drawYearBar() {
        let that = this;

        let yearSlider = d3.select('#time-sliders-box')
        					.append('div')
        					.classed('slider-wrap', true)
        					.append('input')
        					.classed('slider', true)
        					.attr('type', 'range')
        					.attr('min', 2008)
        					.attr('max', 2016)
        					.attr('value', this.activeYear);

        let sliderLabel = d3.select('#time-sliders-box')
        					.append('div')
        					.classed('slider-label', true)
        					.append('svg');

        let sliderText = sliderLabel.append('text')
        							.text(this.activeYear)
        							.attr('x', 70)
        							.attr('y', 35)
									.classed('slider-text', true);

		yearSlider.on('input', function() {
			sliderText.text(this.value);
		});

        yearSlider.on('mouseup', function() {
            let checkboxes = document.getElementsByName("crimeType");
            let crime_list = [];
            for (var i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].type == 'checkbox' && checkboxes[i].checked == true) {
                    crime_list.push(checkboxes[i].value);
                }
            }
            that.activeYear = this.value;
            that.mapView.showViews(that.activeYear, crime_list);
            that.statisticsView.showViews(that.activeYear, crime_list);
        });
    }

    getYear() {
        return this.activeYear;
    }
}