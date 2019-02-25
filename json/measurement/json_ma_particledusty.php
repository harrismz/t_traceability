<?php
	date_default_timezone_set('Asia/jakarta');
    include '../../../adodb/con_mapros_SQL_svrdbn.php';

    $page               = @$_REQUEST["page"];
    $limit              = @$_REQUEST["limit"];
    $start              = (($page*$limit)-$limit)+1;
    $loc                = @$_REQUEST['loc'];
    $today              = date("Y-m-d");
    $getdate1           = isset($_REQUEST['measurement_date']) ? $_REQUEST['measurement_date'] : $today;
    $getdate            = substr($getdate1,0,10);
    $measurement_date   = date('Y-m-d', strtotime($getdate));

	$sql   = "declare @totalcount as int; exec traceability_ma_ParticleDusty $start, $limit, '{$measurement_date}', @totalcount=@totalcount out";
    $rs    = $db->Execute($sql);
    $totalcount = trim($rs->fields['13']);
    
    $return = array();

    for($i=0;!$rs->EOF;$i++){
        $return[$i]['id']               = trim($rs->fields['0']);
        $return[$i]['mchname']          = trim($rs->fields['1']);
        $return[$i]['model']            = trim($rs->fields['2']);
        $return[$i]['dateinspection']   = trim($rs->fields['3']);
        $return[$i]['datetimein']       = trim($rs->fields['4']);
        $return[$i]['serial']           = trim($rs->fields['5']);
        $return[$i]['alm']              = trim($rs->fields['6']);
        $return[$i]['t_ch1']            = round(trim($rs->fields['7']),2);
        $return[$i]['h_ch2']            = round(trim($rs->fields['8']),2);
        $return[$i]['h_ch3']            = round(trim($rs->fields['9']),2);
        $return[$i]['alm1']             = trim($rs->fields['10']);
        $return[$i]['alm2']             = trim($rs->fields['11']);
        $return[$i]['inputdate']        = trim($rs->fields['12']);
       
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
