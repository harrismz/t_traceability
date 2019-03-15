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
	if ( $valRbCheck == 'DS' ){
		$sql = "call downloadPanelModelSerial ('{$valModelName}','{$valSerialNo}','{$valDummySerial}')";
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
		
		$fname = "Traceability_Finishgood_Mapros_Panel{$fmodel}{$flotno}{$fserial}{$fdummy}.csv";
		
		//	input data in file
		header("Content-type: text/csv");
		header("Content-Disposition: attachment; filename=$fname");
		header("Pragma: no-cache");
		header("Expires: 0");
		
		$fp = fopen("php://output", "w");
		$headers = 'MODEL, LOTNO, DUMMY SERIAL, DUMMY PANEL, GUID MASTER, GUID TICKET, STATUS, PROCESS, JUDGE, EMP NO, PROCESS DATE' . "\n";
		fwrite($fp,$headers);
		
		while(!$rs->EOF)
		{
			if(strlen($rs->fields['9']) > 5){
				$empno = substr($rs->fields['9'], 2, 5);
			}
			else { 
				$empno = $rs->fields['9'];
			} 
			fputcsv($fp, array(	$rs->fields['0'], 
								$rs->fields['1'], 
								$rs->fields['2'], 
								$rs->fields['3'], 
								$rs->fields['4'], 
								$rs->fields['5'], 
								$rs->fields['6'], 
								$rs->fields['7'], 
								$rs->fields['8'], 
								$empno, 
								$rs->fields['10']));
		   
			$rs->MoveNext();
		}
		
		//	connection close
		fclose($fp);
		$rs->Close();
	    $db->Close();

	}
	else{

		if ( $valRbCheck == 'MS' ){
			$sql = "call downloadPanelModelSerial ('{$valModelName}','{$valSerialNo}','{$valDummySerial}')";
		} else if ( $valRbCheck == 'ML' ){
			$sql = "call downloadPanelModelLotno ('{$valModelName}','{$valLotNo}')";
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
		
		$fname = "Traceability_Finishgood_Mapros_Panel{$fmodel}{$flotno}{$fserial}{$fdummy}.csv";
		
		//	input data in file
		header("Content-type: text/csv");
		header("Content-Disposition: attachment; filename=$fname");
		header("Pragma: no-cache");
		header("Expires: 0");
		
		$fp = fopen("php://output", "w");
		$headers = 'SERIAL NO, MODEL, LOTNO, DUMMY SERIAL, DUMMY PANEL, GUID MASTER, GUID TICKET, STATUS, PROCESS, JUDGE, EMP NO, PROCESS DATE' . "\n";
		fwrite($fp,$headers);
		
		while(!$rs->EOF)
		{
			if(strlen($rs->fields['10']) > 5){
				$empno = substr($rs->fields['10'], 2, 5);
			}
			else { 
				$empno = $rs->fields['10'];
			} 
			fputcsv($fp, array(	$rs->fields['0'], 
								$rs->fields['1'], 
								$rs->fields['2'], 
								$rs->fields['3'], 
								$rs->fields['4'], 
								$rs->fields['5'], 
								$rs->fields['6'], 
								$rs->fields['7'], 
								$rs->fields['8'], 
								$rs->fields['9'], 
								$empno, 
								$rs->fields['11']));
		   
			$rs->MoveNext();
		}
		
		//	connection close
		fclose($fp);
		$rs->Close();
	    $db->Close();
	}
?>