<?php
	date_default_timezone_set('Asia/jakarta');
    include '../../../adodb/con_mapros_SQL.php';

    $page       = @$_REQUEST["page"];
    $limit      = @$_REQUEST["limit"];
    $model      = @$_REQUEST['valmodel'];
    $serialnoid = substr(@$_REQUEST['valserialno'],-8);
    $dummySerial= @$_REQUEST['dummySerial'];
    $start      = (($page*$limit)-$limit)+1;
	
    $sql        = "declare @totalcount as int; EXEC traceability_ma_flash $start, $limit, '{$model}','{$serialnoid}','{$dummySerial}',@totalcount=@totalcount out;";
    $rs         = $db->Execute($sql);
    $totalcount = $rs->fields['11'];
    $return     = array();

    for($i=0;!$rs->EOF;$i++){
        $return[$i]['idflash']      = trim($rs->fields['0']);
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
        "totalCount"=>$totalcount,
        "rows"=>$return);
    echo json_encode($x);
    $rs->Close();
    $db->Close();
?>
