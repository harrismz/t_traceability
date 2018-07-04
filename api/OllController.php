<?php

/**
 * controller of oll end points
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once 'Oll.php';

class OllController 
{	
	private $parameter = [];

	function __construct()
	{	
		// accepted parameter
		$acceptedParameter = [
			'JOBMODELNAME',
			'JOBPWBNO',
			'process',
			'JOBSTARTSERIAL',
			// '*'
		];
		//get all parameter here
		foreach ($_GET as $key => $value) {
			if (in_array($key, $acceptedParameter )) {

				$this->parameter[$key] = trim($value);
			}
		}
	}

	public function index(){
		// initialize object MODEL
		$model = new Oll();
		// query products
		$result = $model->index($this->parameter);

		return json_encode($result);
	}
}