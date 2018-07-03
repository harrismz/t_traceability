<?php

/**
 *  model for my OLL 
 */
class Oll
{
	// database connection and table name
    private $conn;
    private $table_name = "JOBHEADERINFO";
 
    // object properties
    public $id;
    public $name;
    public $description;
    public $price;
    public $category_id;
    public $category_name;
    public $created;
 
	function __construct($DB)
	{
		# code...
		$this->conn = $DB;
	}

	public function read(){
		// select all query
	    $query = "SELECT FIRST 10  * FROM " . $this->table_name;
	 	
	    // prepare query statement
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