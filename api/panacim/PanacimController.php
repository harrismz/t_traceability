<?php

/**
 * 
*/

require_once '../vendor/autoload.php';
use PhpOffice\PhpSpreadsheet\IOFactory;

class PanacimController
{
	protected $file;
	protected $dir = '../storage/';
	protected $allowedType = [
		'xls',
		'xlsx'
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

		// $excel = Excel::load($this->getFile());
		$reader = IOFactory::createReader('Xlsx');
		$reader->setReadDataOnly(true);
		$excel = $reader->load($this->getFile());

		$excelArray = $this->excelToArray($excel);
		
		return json_encode($excelArray);
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
