<?php // Write in file


$file = fopen("../conf/tokenUsed.conf", "w") or die("Unable to open file!"); // Get file

fwrite($file, "");
fclose($file);

?>