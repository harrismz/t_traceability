<?php
	
/**
 * class for handle CBR request
 */
class CrbController
{
	protected $file;

	function __construct()
	{	
		if (isset($_FILES['file'])) {
			$this->file = $_FILES['file'];
		}
	}

	public function upload(){
		// get the file here.
		$file = $this->validate();
		$content = file_get_contents($file);
		// get table for part location. == 'PositionData<1>'
		preg_match_all( '(\[(.*?)\])', $content , $matches);
		
		$new = [];
		foreach ($matches[1] as $key => $match) {
			$new[] = $match;
		}

		return json_encode($new);
		// 
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