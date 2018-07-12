<?php
	
	include_once './CrbController.php';
	$crbController = new CrbController();

	if ($_SERVER['REQUEST_METHOD'] == 'POST') {
		echo $crbController->upload();
	}



?>