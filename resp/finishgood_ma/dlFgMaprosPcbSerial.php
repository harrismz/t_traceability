<?php
	/*
	****	create by Harris
	****	on 20 Feb 2019
	****	remark: -
	*/
	date_default_timezone_set('Asia/jakarta');
	include '../../../adodb/con_mapros_MYSQL.php';
	// window.open('resp/finishgood_ma/dlFgMaprosPcbSerial.php?rb='+rbCheck+'&mdl='+modelName+'&s='+serialNo+'&l='+lotNo+'&ds='+dummySerial+'');
					

	//	get paramater
	$valRbCheck		= trim(@$_REQUEST["rb"]);
	$valModelName	= trim(@$_REQUEST["mdl"]);
	$valSerialNo	= trim(@$_REQUEST["s"]);
	$valLotNo		= trim(@$_REQUEST["l"]);
	$valDummySerial	= trim(@$_REQUEST["ds"]);

		//	execute query
		if ( $valRbCheck == 'MS' || $valRbCheck == 'DS' ){
			$sql = "call downloadPCBModelSerial ('{$valModelName}','{$valSerialNo}','{$valDummySerial}')";
		} else if ( $valRbCheck == 'ML' ){
			$sql = "call downloadPCBModelLotno('{$valModelName}','{$valLotNo}')";
		}
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
		
		$fname = "Traceability_Finishgood_Mapros_PCBSerial{$fmodel}{$flotno}{$fserial}{$fdummy}.csv";
		
		//	input data in file
		header("Content-type: text/csv");
		header("Content-Disposition: attachment; filename=$fname");
		header("Pragma: no-cache");
		header("Expires: 0");
		
		$fp = fopen("php://output", "w");
		$headers = 'PCB SERIAL, GUID MASTER, GUID TICKET, MODEL NAME, LOT NO, PROCESS, STATUS, JUDGE, EMP NO, PROCESS DATE' . "\n";
		fwrite($fp,$headers);
		
		while(!$rs->EOF)
		{
			if(strlen($rs->fields['7']) > 5 && strlen($rs->fields['7']) < 9 ){
				$empno = substr($rs->fields['7'], 2, 5);
			}
			else { 
				$empno = $rs->fields['7'];
			} 
			fputcsv($fp, array(	$rs->fields['0'], $rs->fields['1'], $rs->fields['2'], 
								$rs->fields['3'], $rs->fields['4'], $rs->fields['5'], 
								$rs->fields['6'], $rs->fields['8'], $empno, $rs->fields['9']));
		   
			$rs->MoveNext();
		}
		
		//	connection close
		fclose($fp);
		$rs->Close();
	    $db->Close();

	

	
?>