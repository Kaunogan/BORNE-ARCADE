<?php // Write in file

$token = $_POST['token']; // Get token 

$file = fopen("../conf/tokenUsed.conf", "a") or die("Unable to open file!"); // Get file

if ($token != "") {

	if(filesize("../conf/tokenUsed.conf") == 0) {
		fwrite($file, $token);
		fclose($file);
	} else {
		fwrite($file, ",".$token);
		fclose($file);
	}	
}
?>