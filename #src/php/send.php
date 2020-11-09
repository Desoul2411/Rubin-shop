<?php
$email = "contact@bluebirdz.com.au";

$name = $_SERVER['HTTP_HOST'];
//Validation
$client_name = $client_phone = $client_message = ""; // define variables and set to empty values

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $client_name = test_input($_POST["name"]);
    $client_mail = test_input($_POST["email-address"]);
    $client_subject = test_input($_POST["subject"]);
    $client_message = test_input($_POST["message"]);
    $client_nda = test_input($_POST["nda"]);
}

function test_input($data) {
    $data = trim($data);  //strip unnecessary characters (extra space, tab, newline) from the user input data
    $data = stripslashes($data);  //Remove backslashes (\) from the user input data
    $data = htmlspecialchars($data); //htmlspecialchars() function converts special characters to HTML entities
    return $data;
}


$to = $email;
$subject = 'Message';
$message = '
		<html>
			<head>
				<title>'.$subject.'</title>
			</head>
			<body>
			<b>From bluebirdz</b>
				<p><i>Name - </i> '.$client_name.'</p>
				<p><i>Email - </i>'.$client_mail.'</p>
				<p><i>Phone - </i>'.$client_subject.'</p>
				<p><i>Message - </i>'.$client_message.'</p>
				<p><i>NDA button - </i>'.$client_nda.'</p>
			</body>
			</html>';
$headers  = "Content-type: text/html; charset=utf-8 \r\n";
$headers .= "From: ".$name." <admin@".$name.">\r\n";
mail($to, $subject, $message, $headers);
?>

