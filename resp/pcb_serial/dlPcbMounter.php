<?php
/*
****	create by Harris
****	on 20 Feb 2019
****	modify by Harris
****	on 20 Mar 2019
****	remark: revise dwnload by model lotno
*/
date_default_timezone_set('Asia/jakarta');
include '../../../adodb/con_mounter.php';

//	get paramater
$boardid	= @$_REQUEST['pcb'];
$model 		= @$_REQUEST['mdl'];
$lotno 		= @$_REQUEST['l'];
$pwbname 	= @$_REQUEST['pwb'];
$side 		= @$_REQUEST['sd'];
$pjgboard 	= strlen($boardid);

//	save file
$fpcbserial='';
$fmodel='';
$flotno='';
$fpwbname='';
if ( $boardid != '' ) { $fpcbserial = "_".$boardid; }
if ( $model != '' ) { $fmodel = "_".$model; }
if ( $lotno != '' ) { $flotno = "_".$lotno; }
if ( $pwbname != '' ) { $fpwbname = "_".$pwbname; }

$fname = "Traceability_PCBSerial_Mounter{$fpcbserial}{$fmodel}{$flotno}{$fpwbname}.csv";

//	input data in file
header("Content-type: text/csv");
header("Content-Disposition: attachment; filename=$fname");
header("Pragma: no-cache");
header("Expires: 0");

// $fp = fopen("php://output", "w");
// $headers = 'LINE, PCB SERIAL, MODEL, PWB NO, PWB NAME, PROCESS, LOT NO, DATE IN, DATE OUT, JOB NO, PART LOC, MODE, PART NO, FEEDER, FEEDER SERIAL, FEEDER NO, COMP ID, SCAN DATE, START SERIAL' . "\n";
// fwrite($fp,$headers);

try{
	$sql    = "exec download_mounter '{$boardid}'";
	$rs     = $db->Execute($sql);
	$return = array();

	$fp = fopen("php://output", "w");
	$headers = 'LINE, PCB SERIAL, MODEL, PWB NO, PWB NAME, PROCESS, LOT NO, DATE IN, DATE OUT, JOB NO, PART LOC, MODE, PART NO, FEEDER, FEEDER SERIAL, FEEDER NO, COMP ID, SCAN DATE, START SERIAL' . "\n";
	fwrite($fp,$headers);
	while(!$rs->EOF){
		fputcsv($fp, array(	$rs->fields['0'], $rs->fields['1'], $rs->fields['2'], $rs->fields['3'], 
							$rs->fields['4'], $rs->fields['5'], $rs->fields['6'], $rs->fields['7'], 
							$rs->fields['8'], $rs->fields['9'], $rs->fields['10'], $rs->fields['11'], 
							$rs->fields['12'], $rs->fields['13'], $rs->fields['14'], $rs->fields['15'], 
							$rs->fields['16'], $rs->fields['17'], $rs->fields['18']
							));
		$rs->MoveNext();
	}
	fclose($fp);
	$rs->Close();
	

}
catch (Exception $ex){
	// echo '[[[SQLSERVER-SVRDBN_TRC-MOUNTER]]] :::'.$ex->getMessage();
	$fp = fopen("php://output", "w");
	$headers = 'PLEASE GENERATE YOUR MOUNTER BEFORE DOWNLOAD !' . "\n";
	fwrite($fp,$headers);
	fclose($fp);	
}

//	connection close
$db->Close();

?>