<?php
//start session
ob_start();
session_start();
ob_end_clean();

date_default_timezone_set('Asia/jakarta');
include '../../../adodb/con_mapros_SQL.php';

$model         = @$_REQUEST['valmodel'];
$serialnoid    = @$_REQUEST['valserial'];
$lotno         = @$_REQUEST['vallotno'];
$rundate2	     = @$_REQUEST['valrundate'];
$rundate       = '';
if ($rundate2 != ''){
     $rundate1 = strtotime($rundate2);
     $rundate  = date('Y-m-d', $rundate1);
}
$sql        = "EXEC traceability_measureDcOffset_download '{$rundate}','{$model}','{$serialnoid}','{$lotno}'";
$rs         = $db->Execute($sql);
$return     = array();

//create file name
if ($rundate != "") { $rundate = '_'.$rundate; }
if ($model != "") { $model = '_'.$model; }
if ($serialnoid != "") { $serialnoid = '_'.$serialnoid; }
if ($lotno != "") { $lotno = '_'.$lotno; }
$fname = 'DAILY_REPORT_DCOFFSET'.$rundate.$model.$serialnoid.$lotno.'.csv';

//echo $fname;

header("Content-type: text/csv");
header("Content-Disposition: attachment; filename=$fname");
header("Pragma: no-cache");
header("Expires: 0");

$fp 		= fopen("php://output", "w");
$headers 	= 'NO,SERIAL NUMBER,LOT NO,RESULT,MEASUREMENT,REMARK,INSPECTION DATE,INSPECTION TIME,MCH NAME' . "\n";
fwrite($fp,$headers);

$no=0;
while(!$rs->EOF)
{
     $no++;
     $get_inspDate       = trim($rs->fields['1']);
     $get_serialno       = trim($rs->fields['2']);
     $get_sn 	          = trim($rs->fields['4']);
     $get_remark        	= trim($rs->fields['5']);
     $get_inspTime		= trim($rs->fields['6']);
     $get_measure    	= 'miliVolt [mV]';  //trim($rs->fields['11']);
     $get_measureData  	= trim($rs->fields['12'])*1000;
     $get_mchName   	= trim($rs->fields['13']);
     $get_lotno        	= trim($rs->fields['15']);

     fputcsv($fp,array(	$no,$get_sn,$get_lotno,$get_measureData,$get_measure,$get_remark,$get_inspDate,$get_inspTime,$get_mchName ));
     $rs->MoveNext();
} 
fclose($fp);
$rs->Close();

$db->Close();
$db=null;
?>