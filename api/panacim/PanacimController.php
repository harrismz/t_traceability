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

		$excel = $this->getContent();
		return json_encode($excel);

	}

	private function getContent($tabName = []){

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
