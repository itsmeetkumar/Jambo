<?php

$spec = $_GET['spec'];
$city = $_GET['city'];
$url = "https://davidabc12345.fwd.wf/doctor/".$spec."/".$city;
$response = "a";



$response = file_get_contents($url); 

echo $response;


?>