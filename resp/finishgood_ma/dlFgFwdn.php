<?php
	/*
	****	create by Harris
	****	on 20 Feb 2019
	****	remark: -
	*/
	date_default_timezone_set('Asia/jakarta');
	include '../../../adodb/con_mapros_SQL.php';
	//	get paramater
	$valRbCheck		= trim(@$_REQUEST["rb"]);
	$valModelName	= trim(@$_REQUEST["mdl"]);
	$valSerialNo	= trim(@$_REQUEST["s"]);
	$valLotNo		= trim(@$_REQUEST["l"]);
	$valDummySerial	= trim(@$_REQUEST["ds"]);

	//	execute query
		$sql = "EXEC download_fwdn '{$valModelName}','{$valLotNo}','{$valSerialNo}','{$valDummySerial}'";
		$rs = $db->Execute($sql);

		//	save file
		$fmodel='';
		$flotno=''; 
		$fserial=''; 
		$fdummy='';

		if ( $valModelName != '' ) { $fmodel = "_".$valModelName; }
		if ( $valSerialNo != '' ) { $fserial = "_".$valSerialNo; }
		if ( $valLotNo != '' ) { $flotno = "_".$valLotNo; }
		if ( $valDummySerial != '' ) { $fdummy = "_".$valDummySerial; }
		
		$fname = "Traceability_Finishgood_Insp_FWDN{$fmodel}{$flotno}{$fserial}{$fdummy}.csv";
		
		//	input data in file
		header("Content-type: text/csv");
		header("Content-Disposition: attachment; filename=$fname");
		header("Pragma: no-cache");
		header("Expires: 0");
		
		$fp = fopen("php://output", "w");
		$headers = 'MODEL, LOT NO / SERIAL NO, FWDN ID, INSPECT DATE, PCB SERIAL, JIG NO, JUDGE, INSP TIME, ARTFILENAME, NG CONTENT, M/C Name' . "\n";
		fwrite($fp,$headers);
		
		while(!$rs->EOF)
		{
			fputcsv($fp, array(	$rs->fields['0'], 
								$rs->fields['1'],
								$rs->fields['2'],
								$rs->fields['3'], 
								$rs->fields['4'], 
								$rs->fields['6'], 
								$rs->fields['7'], 
								$rs->fields['8'], 
								$rs->fields['9'], 
								$rs->fields['10'], 
								$rs->fields['11']));
		   
			$rs->MoveNext();
		}
		
		//	connection close
		fclose($fp);
		$rs->Close();
	    $db->Close();
	
?>