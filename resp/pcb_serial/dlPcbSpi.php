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

try{
	$sql    = "exec download_spi '{$boardid}','{$model}','{$lotno}','{$pwbname}','{$side}'";
	$rs     = $db->Execute($sql);
	$return = array();
}
catch (Exception $ex){
	echo '[[[SQLSERVER-SVRDBN_TRC-SPI]]] :::'.$ex->getMessage();
}

//	save file
$fpcbserial='';
$fmodel='';
$flotno='';
$fpwbname='';
if ( $boardid != '' ) { $fpcbserial = "_".$boardid; }
if ( $model != '' ) { $fmodel = "_".$model; }
if ( $lotno != '' ) { $flotno = "_".$lotno; }
if ( $pwbname != '' ) { $fpwbname = "_".$pwbname; }

$fname = "Traceability_PCBSerial_SPI{$fpcbserial}{$fmodel}{$flotno}{$fpwbname}.csv";

//	input data in file
header("Content-type: text/csv");
header("Content-Disposition: attachment; filename=$fname");
header("Pragma: no-cache");
header("Expires: 0");

$fp = fopen("php://output", "w");
$headers = 'MCH NAME, INSPECTION DATE, FILE NAME, PCB ID, PCB SERIAL, SPI JUDGE, PIC JUDGE, DEFECT COUNT' . "\n";
fwrite($fp,$headers);

while(!$rs->EOF)
{
	fputcsv($fp, array(	$rs->fields['0'], $rs->fields['1'], $rs->fields['4'],
						$rs->fields['5'], $rs->fields['6'], $rs->fields['7'],
						$rs->fields['8'], $rs->fields['9']));
	$rs->MoveNext();
}

//	connection close
fclose($fp);
$rs->Close();
$db->Close();

?>