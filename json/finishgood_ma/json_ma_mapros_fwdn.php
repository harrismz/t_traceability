<?php
	date_default_timezone_set('Asia/jakarta');
    include '../../../adodb/con_mapros_SQL.php';

    $model      = @$_REQUEST['model'];
    $serial     = @$_REQUEST['serial'];
    $sql        = "declare @totalcount as int; EXEC [traceability_ma_fwdn] '{$model}','{$serial}'";
    $rs         = $db->Execute($sql);
    $return     = array();

    for($i=0;!$rs->EOF;$i++){
        $return[$i]['idfwdn']       = trim($rs->fields['0']);
        $return[$i]['dateinspec']   = trim($rs->fields['1']);
        $return[$i]['serial']       = trim($rs->fields['2']);
        $return[$i]['sn']           = trim($rs->fields['3']);
        $return[$i]['jigno']        = trim($rs->fields['4']);
        $return[$i]['judge']        = trim($rs->fields['5']);
        $return[$i]['inspectime']   = trim($rs->fields['6']);
        $return[$i]['artfilename']  = trim($rs->fields['7']);
        $return[$i]['ngcontent']    = trim($rs->fields['8']);   
        $return[$i]['input_user']   = trim($rs->fields['9']);
        $return[$i]['input_date']   = trim($rs->fields['10']);
       
        $rs->MoveNext();
    }
    $x = array(
        "success"=>true,
        "rows"=>$return);
    echo json_encode($x);
    $db->Close();
?>
