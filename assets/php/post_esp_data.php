<?php

/*
  PHP script to post data to the soil_data database from the monitors using POST
  
  Case Zuiderveld
  Last updated 3/17/2023
*/
date_default_timezone_set("America/Los_Angeles");		// Set timezone to PST
$servername = "localhost";

// Set up database parameters
$dbname = "casetoph_soil_data";
$username = "casetoph_soil_monitor";
$password = "Jonagu25!!";


// Keep this API Key value to be compatible with the ESP32 code provided in the project page.
// If you change this value, the ESP32 sketch needs to match
$api_key_value = "tPmAT5Ab3j7F9";

$api_key= "";
$moisture_level= "";
$plantname= "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
   $api_key = test_input($_POST["api_key"]);
   // Check to see if api key matches
    if($api_key == $api_key_value) {
        // Get moisture and plant name
        $moisture_level = test_input($_POST["moisture"]);
		$plantname = test_input($_POST["plantname"]);
        
        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        // Get date to timestamp reading
		$date = date('m/d/y h:i:s');

        // Create SQL query
        $sql = "INSERT INTO " . $plantname . "_soil (time,moisture)
        VALUES ('" . $date . "','" . $moisture_level . "')";
        
        // Attempt to run query
        if ($conn->query($sql) === TRUE) {
            echo "New record created successfully";
        }
        else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }

        $conn->close();
    }                                          
	else {
        echo "Wrong API Key provided.";
    }

}
else {
    echo "No data posted with HTTP POST.";
}

function test_input($data) {
    // Remove potentially harmful symbols
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

?>
