<?php
/*
****	create by Harris
****	on 20 Feb 2019
****	modify by Harris
****	on 20 Mar 2019
****	modify by Harris
****	on 10 April 2019 ( flow switch cavity )
****	remark: revise dwnload by model lotno
*/
date_default_timezone_set('Asia/jakarta');
include '../../../adodb/con_mounter.php';

//	get paramater
$boardid	= @$_REQUEST['pcb'];
$smtdate	= @$_REQUEST['smtdt'];
$model 		= @$_REQUEST['mdl'];
$lotno 		= @$_REQUEST['l'];
$pwbname 	= @$_REQUEST['pwb'];
$side 		= @$_REQUEST['sd'];
$totcavity  = @$_REQUEST['tc'];
$pjgboard 	= strlen($boardid);

try{
	$sql    = "exec download_reflow '{$boardid}','{$smtdate}','{$model}','{$lotno}','{$pwbname}','{$side}','{$totcavity}'";
	$rs     = $db->Execute($sql);
	$return = array();
}
catch (Exception $ex){
	echo '[[[SQLSERVER-SVRDBN_TRC-REFLOW]]] :::'.$ex->getMessage();
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

$fname = "Traceability_PCBSerial_Reflow{$fpcbserial}{$fmodel}{$flotno}{$fpwbname}.csv";

//	input data in file
header("Content-type: text/csv");
header("Content-Disposition: attachment; filename=$fname");
header("Pragma: no-cache");
header("Expires: 0");

$fp = fopen("php://output", "w");
$headers = 'PCB SERIAL, REFLOW DATE, IN, OUT, PCB ID' . "\n";
fwrite($fp,$headers);

while(!$rs->EOF)
{
	fputcsv($fp, array(	$rs->fields['0'], $rs->fields['1'], $rs->fields['2'],
						$rs->fields['3'], $rs->fields['6']));
	$rs->MoveNext();
}

//	connection close
fclose($fp);
$rs->Close();
$db->Close();

?>