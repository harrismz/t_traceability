<?php
    date_default_timezone_set('Asia/jakarta');
    include '../../../adodb/con_mapros_SQL.php';

    $model      = @$_REQUEST['model'];
    $serial     = @$_REQUEST['serial'];
    $sql        = "EXEC traceability_ma_avmt '{$model}','{$serial}'";
    $rs         = $db->Execute($sql);
    $return     = array();

    for($i=0;!$rs->EOF;$i++){
        $return[$i]['idavmt']       = trim($rs->fields['0']);
        $return[$i]['barcode']      = trim($rs->fields['1']);
        $return[$i]['sn']           = trim($rs->fields['2']);
        $return[$i]['program']      = trim($rs->fields['3']);
        $return[$i]['stdate']       = trim($rs->fields['4']);
        $return[$i]['endate']       = trim($rs->fields['5']);
        $return[$i]['lap']          = trim($rs->fields['6']);
        $return[$i]['judgment']     = trim($rs->fields['7']);
        $return[$i]['input_user']   = trim($rs->fields['8']);   
        $return[$i]['input_date']   = trim($rs->fields['9']);
        $return[$i]['update_user']  = trim($rs->fields['10']);
        $return[$i]['update_date']  = trim($rs->fields['11']);
       
        $rs->MoveNext();
    }
    $x = array(
        "success"=>true,
        "rows"=>$return);
    echo json_encode($x);
    $rs->Close();
    $db->Close();
?>
