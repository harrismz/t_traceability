<?php
/*
****	create by Harris
****	on 20 Feb 2019
****	modify by Harris
****	on 20 Mar 2019
****	remark: revise dwnload by model lotno
*/
date_default_timezone_set('Asia/jakarta');
include '../../../adodb/con_smtpros.php';

//	get paramater
$boardid	= @$_REQUEST['pcb'];
$model 		= @$_REQUEST['mdl'];
$lotno 		= @$_REQUEST['l'];
$pwbname 	= @$_REQUEST['pwb'];
$side 		= @$_REQUEST['sd'];
$totcavity	= @$_REQUEST['tc'];
$pjgboard 	= strlen($boardid);

try{
	$sql    = "exec download_aoiPoint '{$boardid}','{$model}','{$lotno}','{$pwbname}','{$side}','{$totcavity}'";
	$rs_point     = $db->Execute($sql);
	$return = array();
}
catch (Exception $ex){
	echo '[[[SQLSERVER-SVRDBN_TRC-AOI-POINT]]] :::'.$ex->getMessage();
}

//	save file
$fpcbserial2='';
$fmodel2='';
$flotno2='';
$fpwbname2='';
if ( $boardid != '' ) { $fpcbserial2 = "_".$boardid; }
if ( $model != '' ) { $fmodel2 = "_".$model; }
if ( $lotno != '' ) { $flotno2 = "_".$lotno; }
if ( $pwbname != '' ) { $fpwbname2 = "_".$pwbname; }

$fname = "Traceability_PCBSerial_AOI_POINT{$fpcbserial2}{$fmodel2}{$flotno2}{$fpwbname2}.csv";

//	input data in file
header("Content-type: text/csv");
header("Content-Disposition: attachment; filename=$fname");
header("Pragma: no-cache");
header("Expires: 0");

$fp = fopen("php://output", "w");
$headers = 'MCH NAME, PCB ID, PCB GUID, COMPONENT GUID, UNAME, PCB SERIAL, START DATE, END DATE, PART NUMBER, PART NAME, AOI JUDGEMENT, PIC JUDGEMENT' . "\n";
fwrite($fp,$headers);

while(!$rs_point->EOF)
{
	fputcsv($fp, array(	$rs_point->fields['0'], $rs_point->fields['1'], $rs_point->fields['2'],
						$rs_point->fields['3'], $rs_point->fields['4'], $rs_point->fields['5'],
						$rs_point->fields['6'], $rs_point->fields['7'], $rs_point->fields['8'], 
						$rs_point->fields['9'], $rs_point->fields['10'], $rs_point->fields['11']));
	$rs_point->MoveNext();
}

//	connection close
fclose($fp);
$rs_point->Close();

$db->Close();

?>