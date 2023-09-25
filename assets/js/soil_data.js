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
    plantDataArray[plantDataArrayIndex].time_id.innerHTML = "Last update received: " + plantDataArray[plantDataArrayIndex].time;
    plantDataArray[plantDataArrayIndex].button_id.innerHTML =  plantDataArray[plantDataArrayIndex].moisture + "%";
    
    // Check to see if moisture > 30, then set button color accordingly
    if( parseInt(plantDataArray[plantDataArrayIndex].moisture) >= 30)    {
        console.log("Changing button color")
        plantDataArray[plantDataArrayIndex].button_id.style.backgroundColor = green;
    }
    else{
        plantDataArray[plantDataArrayIndex].button_id.style.backgroundColor = red;
    }
}

async function getPlantData(j)	{

      
        // Create the request URL and a make new xhttp object
        var url = "/assets/php/get_soil_data.php?plantname=" + plantDataArray[j].plantName;
        var xhttp = new XMLHttpRequest();
        // This will run once the call is complete
        xhttp.onload = (e) => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                // Parse the raw json into an object
                if(!xhttp.response) {
                    return;
                }
                var data = JSON.parse(xhttp.response);
                //console.log(data);
                console.log(plantDataArray[j].plantName + ": "
                            + data.moisture + " " + data.time);
                // Strip the % from moisture and store the moisture/time 
                plantDataArray[j].moisture = data.moisture.replace('%','');
                plantDataArray[j].time = data.time;
                
                
            }
            else{
                console.log(xhttp.res);
            }
        };
        console.log(url);
        xhttp.timeout = 150;
        //xhttp.upload.addEventListener("load", queryComplete(xhttp.response, j));
        // Send the request for the plant
        xhttp.open("GET", url, true);
        xhttp.send();
    
}

function setMonitorData()   {

    document.getElementById("phineas");
}

$(document).ready(function(){
	// Init array then query database
    
    main();
  
})
function queryComplete(response, j)   {
    if(!response) {
        return;
    }
    console.log("Query completed");
    var data = JSON.parse(response);
    console.log(plantDataArray[j].plantName + ": "
                + data);
    // Strip the % from moisture and store the moisture/time 
    plantDataArray[j].moisture = data.moisture.replace('%','');
    plantDataArray[j].time = data.time;
    updateMonitorDisplay(j);
}
async function main()  {
    // Initialize plant data
    initPlantData();

    // Drop into loop and periodically check for updates
    while(true) {
        for(var j in plantDataArray)    {
            getPlantData(j);
            updateMonitorDisplay(j);
        }
        await sleep(1000);
    }
}