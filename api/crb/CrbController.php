<?php
	
/**
 * class for handle CBR request
 */
class CrbController
{
	protected $file;
	protected $parameters;

	public $allowedParameter = [
		'part_location'
	];

	function __construct(){ 

		if (isset($_FILES['file'])) {
			$this->file = $_FILES['file'];
		}

		foreach ($_POST as $key => $value) {
			if (in_array($key, $this->allowedParameter )) {
				# code...
				$this->parameters[$key] = $value;
			}
		}
	}

	public function upload(){

		// return json_encode($this->parameters );

		// get the file here.
		$file = $this->validate();
		$lines = file($file);

		$positionData = $this->getTableContent('[PositionData<1>]'.PHP_EOL , $lines/*, ['IDNUM', 'C', 'PARTS']*/ ); //contain location name

		$searchIndex = array_search($this->parameters['part_location'], array_column($positionData, 'C'));

		$positionData = [$positionData[$searchIndex]];

		$partsData = $this->getTableContent('[PartsData]'.PHP_EOL , $lines, ['IDNUM', 'NAME', 'C'] ); //contain parts number

		return json_encode( $this->join($positionData, $partsData, 'PARTS', 'IDNUM') );
	}

	/*
		function Array getTableContent ()
		@param1 = name of table in file.crb such as [PositionData<1>]
		@param2 = Array of content value; 
		@param3 = array of column that need to be fetch
	*/
	private function getTableContent( $tableName, Array $lines, Array $include = [] ){
		$index = array_search( $tableName , $lines);

		if ($index == false ) {
			return false;
		}

		$positionData = [];
		$header = explode(' ', $lines[$index+1] );
		// jika include tidak diisi,maka ambil semua kolom.
		if ($include == [] ) {
			$include = $header;
		}
		
		$index += 2; //ditambah 2 untuk langsung ambil value nya saja. tidak dengan nama table & kolomnya.
		// kalau diambil dari index, nama table & nama kolom kebawa.
		for ($i=$index; $i < count($lines) ; $i++) { 
			
			if ($lines[$i] == PHP_EOL ) {
				break; //stop looping if find enter char
			}

			// changes into associatif array 
			$row = explode(' ', $lines[$i] );
			$new_row=[];
			foreach ($header as $key => $value) {
				if (in_array($value, $include )) {
					# preg_replace is for sanitizing the string. removing all special char
					$new_row[$value] = preg_replace('/[^A-Za-z0-9\-]/', '', trim( $row[$key]) ); 
				}
			}

			$positionData[] =  $new_row;
		}
		
		return $positionData;
	}

	// similiar to join state ment 
	private function join(Array $table1, Array $table2, $column1, $column2 ){
		$result = [];
		foreach ($table1 as $key => $valueTable1) {
			foreach ($table2 as $key => $valueTable2 ) {
				if ($valueTable1[$column1] == $valueTable2[$column2]) {
					$result[] = array_merge_recursive($valueTable1, $valueTable2);
				}
			}
		}
		return $result;
	}

	private function validate(){
		// cek if error is there
		if (!$this->file) {
			throw new Exception("No File Found!", 1);
		}

		// cek error form $_FILES
		if ($this->file['error'] != 0) {
			throw new Exception("Error Processing Request", 1);
		}

		// cek if it is crb
		if (substr( $this->file['name'] , -3 ) !== 'crb' )  {
			throw new Exception("you need to upload .crb file ", 1);
		}

		return $this->file['tmp_name'];
	}

	public function download(){

	}
}











?>