<?php

/*
  PHP script to send email via a contact form

  Case Zuiderveld
  Last updated 3/17/2023
*/
date_default_timezone_set("America/Los_Angeles");		// Set timezone to PST

// Email that the message will be sent to
$destinationemail ="case@casetopher.me";
$siteemail = "donotreply@75.87.252.144";

// Grab all the form data
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $captcha = test_input($_POST["captcha"]);
    if($captcha != "on")   {
        $status = "captcha";
    }
    $contactname = test_input($_POST["contact-name"]);
    $contactemail = test_input($_POST["contact-email"]);
    $emailcopy = test_input($_POST["email-copy"]);
    $subject = test_input($_POST["subject"]);
    $message = test_input($_POST["message"]);
    
    echo($captcha . "\r\n");
    echo($contactname . "\r\n");
    echo($contactemail . "\r\n");
    echo($emailcopy . "\r\n");
    echo($subject . "\r\n");
    echo($message . "\r\n");
    $header = "From: $siteemail \r\n";
    $header .="Reply-to: $contactemail \r\n";
    if(mail($destinationemail, $subject,  $message,  $header)){
        echo ("Message sent successfully!");
        $status = "Success";
    }

    if($emailcopy="on")    {
        mail($contactemail, $subject, $message, $header);
    }
    header("Location: ../../contact.html");
    exit();
}
else {
    $status = "empty";
}

function test_input($data) {
    // Remove potentially harmful symbols
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

?>
