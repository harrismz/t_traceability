<?php

/**
 * 
*/

require_once '../vendor/autoload.php';
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
		'part_number',
		'program_name'
	];

	private $parameters = [];

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

	public function upload(){
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
			'part_number' =>	$this->parameters['part_number'],
			'feeder_number' =>	$this->parameters['feeder_number'],

		], $excel );

		return json_encode([
			'success' => true,
			'data' =>	$result
		]);

	}

	// $needle is array contain both part_number, and feeder_number as $key;
	public function find (Array $needle, Array $haystacks ){
		// return [$needle, $haystack];
		$result = [];
		foreach ($haystacks as $key => $haystack) {
			# code...
			if ( 
				($haystack['part_number'] == $needle['part_number']) && 
				(stripos($haystack["z_/_pu_number"], $needle['feeder_number']) !== FALSE ) 
			){
				
				$result[] = $haystack;
			}
		}
		return $result;
	}

	private function getContent($searchValue='', $headerIndex=12 ){
		$worksheets = $this->getWorkSheet();
		if ( $searchValue == '') {
			// if parameter didn't pass, just return the worksheet instead
			return $worksheets;
		}

		$programWorkSheets = array_filter($worksheets, function ($key) use ($searchValue) {
			return ( stripos($key , $searchValue ) !== false ) ;
		}, ARRAY_FILTER_USE_KEY  );

		$content = [];
		foreach ($programWorkSheets as $key => $sheet) {
			foreach ($sheet as $rowIndex => $row) {
				if ($rowIndex > $headerIndex ) { //mulai dari index ke 12, header
					
					$header = $sheet[$headerIndex];
					$newRow =[];
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

}
