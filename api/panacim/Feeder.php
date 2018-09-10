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
			'host'	=> 'svrdbn\jeinsql2012trc,63244',
			'db_name' => 'SMTPROS',
			'username' => 'sa',
			'password' => 'JvcSql@123',
		]);
		// $this->database->
		$this->conn = $this->database->getConnection();

		// $this->conn = $DB;
	}

	public function find($sn){
		// select all query
		$select  = [
			'datecheck',
		];
		$select = implode(', ', $select);

	    $query = "SELECT top 1 ".$select." FROM " . $this->table_name . " where sn ='".$sn."'";
	 	// return $query;
	    // prepare query statement
	    $stmt = $this->conn->prepare($query);	
	 	
	    // execute query
	    try {
	    	$stmt->execute();
	    } catch (Exception $e) {
	    	return $e;
	    }

	    return $this->first($stmt);
	}

	private function first(PDOStatement $query ){
		
		while ($row = $query->fetch(PDO::FETCH_ASSOC) ) {
			$newRow = [];
			foreach ($row as $key => $value) {
				$newRow[$key] = trim( $value);
			}
			return $newRow;
		}
		return null;
	}

}



?>