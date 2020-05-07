<?php // Write in file

$date = $_POST['date']; // Get date 

$file = fopen("../conf/date.conf", "w") or die("Unable to open file!"); // Get file

if ($date != "") {
	fwrite($file, $date);
	fclose($file);	 
}
?>