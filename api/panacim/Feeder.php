<?php

include_once '../Database.php';
// namespace 'api';
/**
 *  model for my OLL 
 */
class Feeder
{
	// database connection and table name
    private $conn;
    private $table_name = "tblFeederCheckHeader";
 	
 	protected $database;
	protected $db;
	// 
	function __construct()
	{
		# code...
		// instantiate database and product object
		$this->database = new Database([
			'driver'=> 'sqlsrv',
			'host'	=> '136.198.117.48:63244',
			'port'  => '63244',
			'db_name' => 'SMTPROS',
			'username' => 'sa',
			'password' => 'JvcSql@123',
		]);
		// $this->database->
		$this->conn = $this->database->getConnection();

		// $this->conn = $DB;
	}

	// TO READ first 10 record for testing connection purposes
	public function read(){
		// select all query
	    $query = "SELECT * FROM " . $this->table_name;
	 	// return $query;
	    // prepare query statement
	    $stmt = $this->conn->prepare($query);	
	 	
	    // execute query
	    try {
	    	$stmt->execute();
	    } catch (Exception $e) {
	    	return $e;
	    }

	    return $this->get($stmt);
	}

	public function getCon(){
		return $this->database;
	}

	public function index(Array $filters ){
		$select  = [
			// 'JOBFILE',
			'JOBMC_PROGRAM',
			'a.JOBDATE',
			// 'b.JOBDATE as b_date'
			// 'process',
			// '*'
		];

		$select = implode(', ', $select);

		$query = 'select first 2 '.$select.' from '. $this->table_name. ' a left join JOBMODEL b on a.JOBNO=b.JOBNO';

		$where = '';
		foreach ($filters as $key => $value) {
			if ($where == '') {
				$where = ' where '. $key . "='" . $value."'";
			}else {
				$where .= ' and '. $key."='".$value."'";
			}
		}
		
		$query .= $where . ' order by a.NOID desc';

		// return $query;

		$stmt = $this->conn->prepare($query);
		// kalau query salah, $stmt bakal false
		if (!$stmt) {
			return ['error'=> 'SQL error'];
		}
	    // execute query
	    $stmt->execute();

	    $result = $this->get($stmt);

	    if (count($result) > 0 ) {
	    	return $result[0];
	    } else {
	    	return [];
	    }
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