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
			// 'part_location',
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

		// return json_encode($this->parameter);
		// query products
		$result = $model->index($this->parameter);

		if (count( $result) > 0 ) {
			// if result exists, get only the program name. 
			$programName = explode(' ', $result['JOBMC_PROGRAM'] );
			$result['JOBMC_PROGRAM'] = $programName[count($programName)-1];
		}
		return json_encode($result);
	}
}