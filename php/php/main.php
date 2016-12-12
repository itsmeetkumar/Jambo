<?php

$city = $_GET['city'];
$url = "http://codevad-daxeelsoni.rhcloud.com/event/all/" . $city;
$response = "a";



$response = file_get_contents($url); 

echo $response;


?>