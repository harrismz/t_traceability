<?php

include_once 'Database.php';
/**
 *  model for my OLL 
 */
class Oll
{
	// database connection and table name
    private $conn;
    private $table_name = "JOBHEADERINFO";
 	
 	protected $database;
	protected $db;
    // object properties
    public $NOID; //id
    public $JOBMODELNAME; //model name
    public $JOBPWBNO; //production number
    public $JOBMC_PROGRAM; //mc program name or Filename
    public $JOBFILE;
    public $JOBNO;
    public $JOBDATE;
	public $JOBTIME;
	public $JOBSTARTSERIAL;

	// 
	function __construct()
	{
		# code...
		// instantiate database and product object
		$this->database = new Database();
		$this->conn = $this->database->getConnection();

		// $this->conn = $DB;
	}

	// TO READ first 10 record for testing connection purposes
	public function read(){
		// select all query
	    $query = "SELECT FIRST 10  * FROM " . $this->table_name;
	 	
	    // prepare query statement
	    $stmt = $this->conn->prepare($query);
	 
	    // execute query
	    $stmt->execute();

	    return $this->get($stmt);
	}

	public function index(Array $filters ){
		$select  = [
			// 'JOBFILE',
			'JOBMC_PROGRAM',
			// 'process',
			// '*'
		];

		$select = implode(', ', $select);

		$query = 'select  '.$select.' from '. $this->table_name. ' a join JOBMODEL b on a.JOBNO=b.JOBNO';

		$where = '';
		foreach ($filters as $key => $value) {
			if ($where == '') {
				$where = ' where '. $key . "='" . $value."'";
			}else {
				$where .= ' and '. $key."='".$value."'";
			}
		}
		
		$query .= $where;

		// return $query;

		$stmt = $this->conn->prepare($query);
	    // execute query
	    $stmt->execute();

	    return $this->get($stmt);
	}

	private function get(PDOStatement $query ){
		$result = [];
		while ($row = $query->fetch(PDO::FETCH_ASSOC) ) {
			$newRow = [];
			foreach ($row as $key => $value) {
				$newRow[$key] = trim( $value);
			}
			$result[] = $newRow;
		}
		return $result;
	}

}



?>