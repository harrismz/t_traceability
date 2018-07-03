<?php

/**
 * controller of oll end points
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once 'Database.php';
include_once 'Oll.php';

class OllController 
{	
	protected $database;
	protected $db;
	
	function __construct()
	{
		// instantiate database and product object
		$this->database = new Database();
		$this->db = $this->database->getConnection();
	}

	public function index(){
		// initialize object
		$model = new Oll($this->db);
		 
		// query products
		$result = $model->read();

		return json_encode($result);
	}
}