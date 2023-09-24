<?php
/*
  PHP script to retrieve data from the soil data database
  
  Case Zuiderveld
  Last updated 3/17/2023
*/

// Turn on errors 
ini_set('display_errors', 1);
header('Content-Type: application/json');

// Set up database parameters
define('DB_HOST', 'localhost');
define('DB_USERNAME', 'casetoph_soil_monitor');
define('DB_PASSWORD', 'Jonagu25!!');
define('DB_NAME', 'casetoph_soil_data');

// Create new sql object with database information
$mysqli = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

// Connect to database
if(!$mysqli) {
	die("Connection failed: " . $mysqli->error);
}
// Check for plant name
if (isset($_GET['plantname'])) {
	$plantName = test_input($_GET['plantname']);
}
else {
	die("Invalid plant name");
}

// Design the sql query
$query = sprintf("select time, moisture from " . $plantName . "_soil order by id");

//	Send the query and store in result
$result = $mysqli->query($query);

// Store each row into array
$data = array();
foreach($result as $row){
	$data[] = $row;
}

// clean up a bit
$result->close();
$mysqli->close();

// print data to json
print json_encode($data);

function test_input($data) {
    // Remove potentially harmful symbols
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

?>