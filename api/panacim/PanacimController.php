<?php

/**
 * 
*/

require_once '../vendor/autoload.php';
require_once './Feeder.php';

use PhpOffice\PhpSpreadsheet\IOFactory;
// use PHPExcel;
// use PHPExcel_IOFactory;

class PanacimController
{
	protected $file;

	protected $dir = '../storage/';

	protected $allowedType = [
		'xls',
		'xlsx'
	];

	protected $excludedSheet = [
		'Intro',
		'Production Summary',
		'Production Summary-Data',
		'OEE',
		'Placement Summary',
		'Placement Summary-Data',
		'Boards Produced',
		'Machine States',
		'Placement Info',
		'Glossary'
	];

	protected $allowedParameters = [
		'machine_name',
		'tanggal',
		'feeder_number',
		'part_no',
		'program_name'
	];

	private $parameters = [];

	protected $result = [];

	function __construct()
	{
		// do something on contstruct
		if (isset($_FILES['file'])) {
			$this->file = $_FILES['file'];
		}

		foreach ($_POST as $key => $value) {
			if (in_array( $key ,$this->allowedParameters)) {
				$this->parameters[$key] = $value;
			}
		}
	}

	public function index(){
		$feeder = new Feeder;

		return json_encode($feeder->getCon());
	}

	public function upload(){

		if ($this->checkDataType( $this->file )) {
			// if it's not xls or xlsx then it will return immediately
			return json_encode( [
				'success' => false,
				'data' => $this->file,
				'errors' => 'You need to Pass ' . implode(' or ', $this->allowedType )
			]);
		}

		// simpan file ke server, kalau return false, maka error;
		if(!$this->saveOnServer()){
			return json_encode([
				'error' => 'file not uploaded!! Something went wrong'
			]);
		}

		// if statement 
		$program_name = ( isset($this->parameters['program_name']) ) ? $this->parameters['program_name'] : '';
		$excel = $this->getContent($program_name);

		$result = $this->find([
			'part_no' =>	$this->parameters['part_no'],
			'feeder_number' =>	$this->parameters['feeder_number'],

		], $excel );

		return json_encode([
			'success' => true,
			'data' =>	$result
		]);
	}

	// $needle is array contain both part_no, and feeder_number as $key;
	public function find (Array $needle, Array $haystacks ){
		// return [$needle, $haystack];
		$result = [];
		foreach ($haystacks as $key => $haystack) {
			# code...
			if ( 
				($haystack['part_number'] == $needle['part_no']) && 
				(stripos($haystack["z_/_pu_number"], $needle['feeder_number']) !== FALSE ) 
			){
				// sanitize the white space
				$haystack = $this->trimString($haystack);
				$result[] = $haystack;
			}
		}
		return $result;
	}

	private function trimString(Array $haystack){
		foreach ($haystack as $key => $value) {
			// sanitize the value of haystack
			if (is_string($value)) {
				# code...
				$haystack[$key] = trim($value);	
			}
		}
		return $haystack;
	}

	private function getContent($searchValue='', $headerIndex=12 ){
		$programWorkSheets = $this->getWorkSheet();

		// only filter if parameter is exists
		if ( $searchValue !== '') {
			// filter array based on $searchValue, yg mirip $key nya. $key = nama worksheet
			$programWorkSheets = array_filter($programWorkSheets, function ($key) use ($searchValue) {
				return ( stripos($key , $searchValue ) !== false );
			}, ARRAY_FILTER_USE_KEY  );
		}


		$content = [];
		foreach ($programWorkSheets as $key => $sheet) {
			foreach ($sheet as $rowIndex => $row) {
				if ($rowIndex > $headerIndex ) { //mulai dari index ke 12, header
					
					$header = $sheet[$headerIndex];
					$newRow =[];
					$newRow['program_name'] = $key;
					foreach ($header as $columnIndex => $title ) {
						$title_lower_case = implode('_', explode(' ', strtolower($title)) );
						$newRow[$title_lower_case] = $row[$columnIndex];	
					}

					$content[] = $newRow;
				}
			}
		};

		return $content;
	}

	// called by method getContent
	private function getWorkSheet($tabName = []){

		$filename = $this->getFile();
		$type = PHPExcel_IOFactory::identify($filename);
		$objReader = PHPExcel_IOFactory::createReader($type);
		$objPHPExcel = $objReader->load($filename);

		foreach ($objPHPExcel->getWorksheetIterator() as $worksheet) {
			if (!is_null($worksheet->getTitle()) ) {
				# code...
				if (!in_array($worksheet->getTitle(), $this->excludedSheet )) {
					# code...
		    		$worksheets[$worksheet->getTitle()] = $worksheet->toArray();
				}
			}
		}

		return $worksheets;
	}

	private function saveOnServer(){
		return move_uploaded_file($this->file['tmp_name'] , $this->dir . $this->file['name'] );
	}

	private function getFile(){
		return $this->dir . $this->file['name'];
	}

	private function excelToArray($excel){
		$worksheet = $excel->getActiveSheet();
		$rows = [];
		foreach ($worksheet->getRowIterator() as $key => $row) {
			$cellIterator = $row->getCellIterator();
			$cellIterator->setIterateOnlyExistingCells(false);
			$cells = [];
			foreach ($cellIterator as $cell) {
				$cells[] = $cell->getValue();
			}
			$rows[] = $cells;
		}

		return $rows;
	}

	private function checkDataType($file){
		$dataType = explode('.', $file['name'] );
		$dataType = $dataType[count($dataType)-1];
		return !in_array($dataType, $this->allowedType );
	}

}
