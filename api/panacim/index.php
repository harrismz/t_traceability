<?php
	
	include_once './PanacimController.php';
	$panacimController = new PanacimController();



	if ($_SERVER['REQUEST_METHOD'] == 'POST') {
		echo $panacimController->upload();
	}

?>