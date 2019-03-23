<?php
	/*
	****	create by Harris
	****	on 20 Feb 2019
	****	remark: -
	*/
	date_default_timezone_set('Asia/jakarta');
	    //error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);
    include '../../../adodb/con_ocs.php';

   	$valRbCheck		= trim(@$_REQUEST["rb"]);
	$valModelName	= trim(@$_REQUEST["mdl"]);
	$valSerialNo	= trim(@$_REQUEST["s"]);
	$valLotNo		= trim(@$_REQUEST["l"]);
	$valDummySerial	= trim(@$_REQUEST["ds"]);

    // echo "select * from traceability_finishgood (1,10,'DDXGT500RA9N',{$s_no},'016A')";
    //echo "select * from traceability_finishgood ({$start},{$limit},'{$model}', '{$s_no}', '{$lotno}')";
    // $where = '';
    // IF ( $valSerialNo == 'NULL' ){
    //     $where = "('{$valModelName}', {$valSerialNo}, '{$valLotNo}')";
    // }
    // ELSEIF ( $valLotNo == 'NULL' ){
    //     $where = "('{$valModelName}', '{$valSerialNo}', {$valLotNo})";
    // }
    // $sql = "select * from download_finishgood ".$where;
	// $sql = "";
    /*IF ( $valSerialNo == 'NULL' ){
        $sql = "select * from download_finishgood ('{$valModelName}', {$valSerialNo}, '{$valLotNo}')";
    }
    ELSEIF ( $valLotNo == 'NULL' ){
        $sql = "select * from download_finishgood ('{$valModelName}', '{$valSerialNo}', {$valLotNo})";
    }*/
    $sql = "select * from download_finishgood ('{$valModelName}', '{$valSerialNo}', '{$valLotNo}')";
    $rs    = $db->Execute($sql);
    // $rs    = $db->Execute("select * from traceability_finishgood (1,10,'DDXGT500RA9N',{$s_no},'016A')");

	//	save file
		$fmodel='';
		$flotno=''; 
		$fserial=''; 
		
		if ( $valModelName != '' ) { $fmodel = "_".$valModelName; }
		if ( $valSerialNo != '' ) { $fserial = "_".$valSerialNo; }
		if ( $valLotNo != '' ) { $flotno = "_".$valLotNo; }
		
		$fname = "Traceability_Finishgood_OCS{$fmodel}{$flotno}{$fserial}.csv";
		
		//	input data in file
		header("Content-type: text/csv");
		header("Content-Disposition: attachment; filename=$fname");
		header("Pragma: no-cache");
		header("Expires: 0");
		
		$fp = fopen("php://output", "w");
		$headers = 'SERIAL NO, LINE, PROD DATE, PROD NO, LOT SIZE, START SERIAL, MECHA MODEL, MECHA LOT' . "\n";
		fwrite($fp,$headers);
		
		while(!$rs->EOF)
		{
			fputcsv($fp, array(	$rs->fields['7'], 
								$rs->fields['0'], 
								$rs->fields['1'], 
								$rs->fields['4'], 
								$rs->fields['5'], 
								$rs->fields['6'], 
								$rs->fields['9'], 
								$rs->fields['10']));
			$rs->MoveNext();
		}
		
		//	connection close
		fclose($fp);
		$rs->Close();
	    $db->Close();
	
?>