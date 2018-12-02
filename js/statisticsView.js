class StatisticsView {

	constructor (yeardata, monthdata, weekdata, hourdata) {
		this.yeardata = yeardata;
		this.monthdata = monthdata;
		this.weekdata = weekdata;
		this.hourdata = hourdata;

		this.summaryChart = new Chart (document.getElementById("summary"), {
			type: 'doughnut',
			data: {
				labels: crime_list,
				datasets: []
			}
		});

		this.yearChart = new Chart (document.getElementById("year-chart") , {
			type: 'line',
			data: {
				labels: [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
				datasets: []
			},
			options: {
				title: {
					display: true,
					text: 'Yearly Statistics'
				}
			}
		});

		this.monthChart = new Chart (document.getElementById("month-chart") , {
			type: 'line',
			data: {
				labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
				datasets: []
			},
			options: {
				title: {
					display: true,
					text: 'Monthly Statistics'
				}
			}
		});

		this.weekChart = new Chart (document.getElementById("week-chart") , {
			type: 'line',
			data: {
				labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
				datasets: []
			},
			options: {
				title: {
					display: true,
					text: 'Weekly Statistics'
				}
			}
		});

		this.hourChart = new Chart (document.getElementById("hour-chart") , {
			type: 'line',
			data: {
				labels: ['00-03', '03-06', '06-09', '09-12', '12-15', '15-18', '18-21', '21-24'],
				datasets: []
			},
			options: {
				title: {
					display: true,
					text: 'Hourly Statistics'
				}
			}
		});
	}

	showViews (year, crime_list) {
		let color_map = {'Assault':'#8e44ad',
						'Burglary/ Larceny/ Robbery':'#2980b9',
						'Damaged Property':'#27ae60',
						'Drugs':'#f1c40f',
						'Homicide':'#e67e22',
						'Traffic':'#e74c3c',
						'Weapons':'#7f8c8d',
						'Kidnap':'#2c3e50'}

		this.summaryChart.destroy();
		let summary_dataset = [];
		let summary_bgcolor = [];
		let summary_brcolor = [];
		for (let i=0; i<crime_list.length; i++) {
			summary_dataset.push(this.yeardata[crime_list[i]][year-2008]);
			summary_bgcolor.push(color_map[crime_list[i]]);
			summary_brcolor.push('#000000')
		}
		this.summaryChart = new Chart (document.getElementById("summary"), {
			type: 'doughnut',
			data: {
				labels: crime_list,
				datasets: [{
					label: "Number of incidents.",
					data: summary_dataset,
					backgroundColor: summary_bgcolor,
					borderColor: summary_brcolor,
					borderWidth: 1
				}]
			}
		});

		this.yearChart.destroy();
		let year_dataset = [];
		for (let i=0; i<crime_list.length; i++) {
			year_dataset.push({
				data: this.yeardata[crime_list[i]],
				label: crime_list[i],
				borderColor: color_map[crime_list[i]],
				fill: false
			});
		}
		this.yearChart = new Chart (document.getElementById("year-chart") , {
			type: 'line',
			data: {
				labels: [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
				datasets: year_dataset
			},
			options: {
				title: {
					display: true,
					text: 'Yearly Statistics'
				}
			}
		});

		this.monthChart.destroy();
		let month_dataset = [];
		for (let i=0; i<crime_list.length; i++) {
			month_dataset.push({
				data: this.monthdata[year][crime_list[i]],
				label: crime_list[i],
				borderColor: color_map[crime_list[i]],
				fill: false
			});
		}
		this.monthChart = new Chart (document.getElementById("month-chart") , {
			type: 'line',
			data: {
				labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
				datasets: month_dataset
			},
			options: {
				title: {
					display: true,
					text: 'Monthly Statistics'
				}
			}
		});

		this.weekChart.destroy();
		let week_dataset = [];
		for (let i=0; i<crime_list.length; i++) {
			week_dataset.push({
				data: this.weekdata[year][crime_list[i]],
				label: crime_list[i],
				borderColor: color_map[crime_list[i]],
				fill: false
			});
		}
		this.weekChart = new Chart (document.getElementById("week-chart") , {
			type: 'line',
			data: {
				labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
				datasets: week_dataset
			},
			options: {
				title: {
					display: true,
					text: 'Weekly Statistics'
				}
			}
		});

		this.hourChart.destroy();
		let hour_dataset = [];
		for (let i=0; i<crime_list.length; i++) {
			hour_dataset.push({
				data: this.hourdata[year][crime_list[i]],
				label: crime_list[i],
				borderColor: color_map[crime_list[i]],
				fill: false
			});
		}
		this.hourChart = new Chart (document.getElementById("hour-chart") , {
			type: 'line',
			data: {
				labels: ['00-03', '03-06', '06-09', '09-12', '12-15', '15-18', '18-21', '21-24'],
				datasets: hour_dataset
			},
			options: {
				title: {
					display: true,
					text: 'Hourly Statistics'
				}
			}
		});
	}
}
