/*
	Javascript to draw a Chart.js line chart based on data retrieved from a local database
	of plant soil data.

	Case Zuiderveld
	Last updated 3/18/2023
*/

///
///	Variables
///

// Get canvas instance 
const soilChartCanvas = document.getElementById("lineChart");

// Variables needed for chart construction
var moisture = [];
var time = [];
var minData = [];
var plantName = "phineas";

// Set some chart defaults
Chart.defaults.color = '#FFFFFF';
Chart.defaults.font.size = 16;

// Create object with default chart parameters
var soilChartData = {
	labels: time,
	datasets: [{
		label: plantName.charAt(0).toUpperCase()+ plantName.slice(1),
		pointRadius: 4,
		borderColor: "#8ACD7F",
		backgroundColor: "#8ACD7F",
		pointBackgroundColor: "#C0FFB8",
		pointBorderColor: "#A8FF99",
		pointHoverBackgroundColor: "#55bae7",
		pointHoverBorderColor: "#55bae7",
		data: moisture
	},
	{
		label: "Min moisture",
		borderDash: [20,10],
		borderColor: "rgb(250,121,121,0.35)",
		backgroundColor: "rgb(250,121,121,0.35)",
		fill: "origin",
		pointRadius: 0,
		data: minData
	}]
};

// Create object with default chart options
var soilChartOptions = {
	legend: {
		display: false
	},
	responsive: true,
	scales: {
		y: {
			max: 100,
			min: 0,

			title: {
				display: true,
				text: 'Soil Moisture (%)'			
			}
		}		
	}
};


///
///	Functions
///

// Execute on document load
$(document).ready(function(){
	// Click the radio button for Phineas by default
	document.getElementById('phineas').click();
})

// Change chart display to different plants
function plantSelect(plantName) {

	// Destroy any old chart before getting a new one
	let chartStatus = Chart.getChart("lineChart"); 
	if (chartStatus != undefined) {
  		chartStatus.destroy();
	}

	// Get data for this plant from database, this will also set chart data
	getPlantData(plantName);

	// Set label to correct plant name
	soilChartData.datasets[0].label = plantName.charAt(0).toUpperCase()+ plantName.slice(1);

	// Update chart data values
	soilChartData.datasets[0].data = moisture;
	soilChartData.labels = time;

	console.log("making new chart");
	// Create chart
	let soilChart = new Chart(soilChartCanvas, {
		type: "line",
		data: soilChartData,
		options: soilChartOptions
	});
}

// Collect relevant plant data from the database
function getPlantData(plantName)	{
	// Query database with relevant plant name to retrieve soil data
	$.ajax({
		url: "chart.php?plantname=" + plantName,
		method: "GET",
		async: false,
		success: function(data)	{
			

			// Clear contents of array before storing new values
			moisture.length = 0;
			time.length = 0;
			minData.length = 0;

			// Use a for loop to place each type into their corresponding array
			for(var i in data) {
				moisture.push(data[i].moisture);
				time.push(data[i].time);
				minData.push(35);	// Set a horizontal reference line at y=35
			}
			console.log(moisture);
			console.log(time);
			// Database has % stored for moisture, strip the sign to graph as a number
			for(var i in moisture) {
				moisture[i] = moisture[i].replace('%', '');
			}
		}
	});
}
