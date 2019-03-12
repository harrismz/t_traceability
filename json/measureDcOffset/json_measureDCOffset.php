<?php
	date_default_timezone_set('Asia/jakarta');
    include '../../../adodb/con_mapros_SQL.php';

    $model      = @$_REQUEST['valmodel'];
    $serialnoid = substr(@$_REQUEST['valserial'],-8);
    $lotno      = @$_REQUEST['vallotno'];
    $rundate    = @$_REQUEST['valrundate'];
    $sql        = "EXEC traceability_measureDcOffset '{$rundate}','{$model}','{$serialnoid}','{$lotno}'";
    $rs         = $db->Execute($sql);
    $return     = array();

    for($i=0;!$rs->EOF;$i++){
        $return[$i]['idlinezero']   = trim($rs->fields['0']);
        $return[$i]['dateinspec']   = trim($rs->fields['1']);
        $return[$i]['serial']       = trim($rs->fields['2']);
        $return[$i]['guid_master']  = trim($rs->fields['3']);
        $return[$i]['sn']           = trim($rs->fields['4']);
        $return[$i]['judge']        = trim($rs->fields['5']);
        $return[$i]['inspectime']   = trim($rs->fields['6']);
        $return[$i]['ngcontent']    = trim($rs->fields['7']);
        $return[$i]['rownumber']    = trim($rs->fields['8']);   
        $return[$i]['step']         = trim($rs->fields['9']);
        $return[$i]['stepdata']     = trim($rs->fields['10']);
        $return[$i]['measure']      = trim($rs->fields['11']);
        $return[$i]['measuredata']  = trim($rs->fields['12']);
        $return[$i]['input_user']   = trim($rs->fields['13']);
        $return[$i]['input_date']   = trim($rs->fields['14']);
        $return[$i]['lotno']        = trim($rs->fields['15']);
       
        $rs->MoveNext();
    }
    $x = array(
        "success"=>true,
        "rows"=>$return);
    echo json_encode($x);
    $rs->Close();
    $db->Close();
?>
