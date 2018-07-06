<?php
	
/**
 * class for handle CBR request
 */
class CrbController
{
	protected $parameter = [];

	function __construct()
	{
		$allowedParameter = ['file'];

		foreach ($_POST as $key => $value) {
			// if (in_array($key, $allowedParameter)) {
				# code...
				$this->parameter[] = $key;
			// }
		}
	}

	public function upload(){
		// get the file here.
		// var_dump($this->parameter);
		var_dump( $this->parameter[0]);
		// return json_encode($this->parameter);

	}

	public function download(){

	}
}











?>