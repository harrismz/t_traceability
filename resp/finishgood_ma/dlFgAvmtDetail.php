<?php
	/*
	****	create by Harris
	****	on 20 Feb 2019
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
		$sql = "EXEC download_avmtDetail '{$valModelName}','{$valSerialNo}','{$valDummySerial}'";
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
		
		$fname = "Traceability_Finishgood_Insp_AVMT_DETAIL{$fmodel}{$flotno}{$fserial}{$fdummy}.csv";
		
		//	input data in file
		header("Content-type: text/csv");
		header("Content-Disposition: attachment; filename=$fname");
		header("Pragma: no-cache");
		header("Expires: 0");
		
		$fp = fopen("php://output", "w");
		$headers = 'DUMMY SERIAL, ID AVMT, STEP, TYPE, NAME, JUDGEMENT, VOLT, CURR, FREQ, LVLL, LVLR, DSTL, DSTR, RELL, RELR, SNL, SNR, RATIO, HPOS0, REMARK, MCH NAME, DATE INSPECT' . "\n";
		fwrite($fp,$headers);
		
		while(!$rs->EOF)
		{
			fputcsv($fp, array(	$rs->fields['2'], 
								$rs->fields['1'], 
								$rs->fields['3'], 
								$rs->fields['4'], 
								$rs->fields['5'], 
								$rs->fields['6'], 
								$rs->fields['7'], 
								$rs->fields['8'], 
								$rs->fields['9'], 
								$rs->fields['10'], 
								$rs->fields['11'], 
								$rs->fields['12'], 
								$rs->fields['13'], 
								$rs->fields['14'], 
								$rs->fields['15'], 
								$rs->fields['16'], 
								$rs->fields['17'], 
								$rs->fields['18'], 
								$rs->fields['19'], 
								$rs->fields['20'], 
								$rs->fields['21'], 
								$rs->fields['22']));
		   
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
	// 	$headers = 'MODEL, MCH NAME, SERIAL NO, DUMMY SERIAL, ID AVMT,INSP START, INSP END, LAP, JUDGEMENT' . "\n";
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