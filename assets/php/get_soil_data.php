<?php
/*
  PHP script to retrieve data from the soil data database
  
  Case Zuiderveld
  Last updated 9/24/2023
*/

// Turn on errors
ini_set('display_errors', 1);
header('Content-Type: application/json');

// Set up database parameters
$DB_HOST = "127.0.0.1";
$DB_USERNAME = "casetoph_soil_monitor";
$DB_PASSWORD = "Jonagu25!!";
$DB_NAME = "casetoph_soil_data";
// Create new sql object with database information
$mysqli = new mysqli($DB_HOST, $DB_USERNAME, $DB_PASSWORD, $DB_NAME);

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

// This would be nice to implement, but not working right now
/*
$query = sprintf(
  "SELECT *
  FROM (
        SELECT *, ROW_NUMBER() OVER (ORDER BY id) AS rn
    FROM " . $plantName . "_soil
  ) AS subquery
  WHERE rn = 1;")
  */

// Design the sql query
$query = sprintf("select time, moisture from " . $plantName . "_soil order by id");

//      Send the query and store in result
$result = $mysqli->query($query);

// Store each row into array
$data = array();
foreach($result as $row){
        $data[] = $row;
}

// clean up a bit
$result->close();
$mysqli->close();
$data = end($data);
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