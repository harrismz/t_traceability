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

	function __construct()
	{
		// do something on contstruct
		if (isset($_FILES['file'])) {
			$this->file = $_FILES['file'];
		}
	}

	public function upload(){
		// return json_encode($this->dir);
		if(!$this->saveOnServer()){
			return json_encode([
				'error' => 'file not uploaded!! Something went wrong'
			]);
		}

		$excel = $this->getContent('VA00XJ1219K02MND');
		return json_encode($excel);

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
