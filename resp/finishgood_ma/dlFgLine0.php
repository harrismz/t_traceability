<?php
	/*
	****	create by Harris
	****	on Line Zero 4 May 2019
	****	remark: -
	*/
	date_default_timezone_set('Asia/jakarta');
	include '../../../adodb/con_mapros_SQL.php';
	// window.open('resp/finishgood_ma/dlFgMaprosPcbSerial.php?rb='+rbCheck+'&mdl='+modelName+'&s='+serialNo+'&l='+lotNo+'&ds='+dummySerial+'');
					

	//	get paramater
	$valRbCheck		= trim(@$_REQUEST["rb"]);
	$valModelName	= trim(@$_REQUEST["mdl"]);
	$valSerialNo	= trim(@$_REQUEST["s"]);
	$valLotNo		= trim(@$_REQUEST["l"]);
	$valDummySerial	= trim(@$_REQUEST["ds"]);

		//	execute query
	// if ( $valRbCheck == 'DS' ){
		$sql = "EXEC download_line0 '{$valModelName}','{$valSerialNo}','{$valDummySerial}'";
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
		
		$fname = "Traceability_Finishgood_Insp_Line0{$fmodel}{$flotno}{$fserial}{$fdummy}.csv";
		
		//	input data in file
		header("Content-type: text/csv");
		header("Content-Disposition: attachment; filename=$fname");
		header("Pragma: no-cache");
		header("Expires: 0");
		
		$fp = fopen("php://output", "w");
		$headers = 'ID LINEZERO, DATE INSPECT, SERIAL NO, DUMMY SERIAL, JUDGE, INSP TIME, M/C NAME, RUNNING DATE, GUID MASTER' . "\n";
		fwrite($fp,$headers);
		
		while(!$rs->EOF)
		{
			fputcsv($fp, array(	$rs->fields['0'], 
								$rs->fields['1'], 
								$rs->fields['3'], 
								$rs->fields['2'], 
								$rs->fields['5'], 
								$rs->fields['6'], 
								$rs->fields['9'], 
								$rs->fields['10'], 
								$rs->fields['11']));
		   
			$rs->MoveNext();
		}
		
		//	connection close
		fclose($fp);
		$rs->Close();
	   
	// }
	// else{

	// 	if ( $valRbCheck == 'MS' ){
	// 		$sql = "EXEC download_avmt '{$valModelName}','{$valSerialNo}','{$valDummySerial}'";
	// 	} else if ( $valRbCheck == 'ML' ){
	// 		$sql = "EXEC download_avmt '{$valModelName}','{$valSerialNo}','{$valDummySerial}'";
	// 	}
	//     $rs = $db->Execute($sql);

	// 	//	save file
	// 	$fmodel=''; 
	// 	$flotno=''; 
	// 	$fserial=''; 
	// 	$fdummy='';

	// 	if ( $valModelName != '' ) { $fmodel = "_".$valModelName; }
	// 	if ( $valSerialNo != '' ) { $fserial = "_".$valSerialNo; }
	// 	if ( $valLotNo != '' ) { $flotno = "_".$valLotNo; }
	// 	if ( $valDummySerial != '' ) { $fdummy = "_".$valDummySerial; }
		
	// 	$fname = "Traceability_Finishgood_Insp_AVMT{$fmodel}{$flotno}{$fserial}{$fdummy}.csv";
		
	// 	//	input data in file
	// 	header("Content-type: text/csv");
	// 	header("Content-Disposition: attachment; filename=$fname");
	// 	header("Pragma: no-cache");
	// 	header("Expires: 0");
		
	// 	$fp = fopen("php://output", "w");
	// 	$headers = 'MODEL, M/C Name, SERIAL NO, DUMMY SERIAL, ID AVMT,INSP START, INSP END, LAP, JUDGEMENT' . "\n";
	// 	fwrite($fp,$headers);
		
	// 	while(!$rs->EOF)
	// 	{
	// 		fputcsv($fp, array(	$rs->fields['3'], 
	// 							$rs->fields['8'], 
	// 							$rs->fields['2'], 
	// 							$rs->fields['1'], 
	// 							$rs->fields['0'], 
	// 							$rs->fields['4'], 
	// 							$rs->fields['5'], 
	// 							$rs->fields['6'], 
	// 							$rs->fields['7']));
		   
	// 		$rs->MoveNext();
	// 	}
		
	// 	//	connection close
	// 	fclose($fp);
	// 	$rs->Close();
	// }
	    $db->Close();
	
?>