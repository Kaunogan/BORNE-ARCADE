<?php // Write in file

$letter = $_POST['letter']; // Get letter 

$file = fopen("../conf/letter.conf", "w") or die("Unable to open file!"); // Get file

if ($letter != "") {
	fwrite($file, $letter);
	fclose($file);	 
}
?>