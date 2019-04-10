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
	$sql    = "exec download_aoiBoard '{$boardid}','{$model}','{$lotno}','{$pwbname}','{$side}','{$totcavity}'";
	$rs_board     = $db->Execute($sql);
	$return = array();
}
catch (Exception $ex){
	echo '[[[SQLSERVER-SVRDBN_TRC-AOI-BOARD]]] :::'.$ex->getMessage();
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

$fname = "Traceability_PCBSerial_AOI_BOARD{$fpcbserial}{$fmodel}{$flotno}{$fpwbname}.csv";

//	input data in file
header("Content-type: text/csv");
header("Content-Disposition: attachment; filename=$fname");
header("Pragma: no-cache");
header("Expires: 0");

$fp = fopen("php://output", "w");
$headers = 'MCH NAME, PCB ID, PCB GUID, PCB SERIAL, START DATE, END DATE, AOI JUDGEMENT, PIC JUDGEMENT' . "\n";
fwrite($fp,$headers);

while(!$rs_board->EOF)
{
	fputcsv($fp, array(	$rs_board->fields['0'], $rs_board->fields['1'], $rs_board->fields['2'],
						$rs_board->fields['3'], $rs_board->fields['4'], $rs_board->fields['5'],
						$rs_board->fields['6'], $rs_board->fields['7']));
	$rs_board->MoveNext();
}

//	connection close
fclose($fp);
$rs_board->Close();
$db->Close();

?>