var plantDataArray =  [{
    plantName: "phineas",
    moisture: "0", 
    time: "unknown", 
    button_id: new Object, 
    time_id: new Object 
},
{
    plantName: "charlotte",
    moisture: "0", 
    time: "unknown", 
    button_id: new Object, 
    time_id: new Object 
},
{
    plantName: "oliver",
    moisture: "0", 
    time: "unknown", 
    button_id: new Object, 
    time_id: new Object 
}];

const green = "#9dd49d";
const red = "#F36f65";
const orange = "#F9c182";

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

function initPlantData()    { 
    // Cycle through and get the document element IDs
    for (var i in plantDataArray)   {
        plantDataArray[i].button_id = document.getElementById(plantDataArray[i].plantName + "_button");
        plantDataArray[i].time_id = document.getElementById(plantDataArray[i].plantName + "_time");
    }
}

function updateMonitorDisplay (plantDataArrayIndex)  {
    // Update the indicator button and text in the HTML document
    plantDataArray[plantDataArrayIndex].time_id.innerHTML = "Last updated: " + plantDataArray[plantDataArrayIndex].time;
    plantDataArray[plantDataArrayIndex].button_id.innerHTML =  plantDataArray[plantDataArrayIndex].moisture + "%";
    
    // Check to see if moisture > 30, then set button color accordingly
    if( parseInt(plantDataArray[plantDataArrayIndex].moisture) >= 40)    {
        plantDataArray[plantDataArrayIndex].button_id.style.backgroundColor = green;
    }
    else if (parseInt(plantDataArray[plantDataArrayIndex].moisture)  < 40 && parseInt(plantDataArray[plantDataArrayIndex].moisture) >= 30)  {
        plantDataArray[plantDataArrayIndex].button_id.style.backgroundColor = orange;
    }
    else    {
        plantDataArray[plantDataArrayIndex].button_id.style.backgroundColor = red;
    }
}

function getPlantData(index)	{ 
   // Query database with relevant plant name to retrieve soil data
	$.ajax({
		url: "/assets/php/get_soil_data.php?plantname=" + plantDataArray[index].plantName,
		method: "GET",
		async: true,
		success: function(data)	{
			// Store the data into the plantDataArray, then update the document with the new data
			plantDataArray[index].moisture  = data.moisture.replace('%','');
			plantDataArray[index].time      = data.time;
            updateMonitorDisplay(index); 	
		}
	});
   
}

$(document).ready(function(){
	// Jump to main   
    main(); 
})

async function main()  {
    // Initialize plant data
    initPlantData();
    while(true) {
    for(var i =0;i<3;i++)    {
        getPlantData(i);
        //setInterval(getPlantData,2500);
    }
    await sleep (5000);
}
}
