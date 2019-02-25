<?php
	date_default_timezone_set('Asia/jakarta');
    include '../../../adodb/con_mapros_SQL_svrdbn.php';

    $page     = @$_REQUEST["page"];
    $limit    = @$_REQUEST["limit"];
    $start    = (($page*$limit)-$limit)+1;
    $today    = date("Y-m-d");
    $getdate1 = isset($_REQUEST['measurement_date']) ? $_REQUEST['measurement_date'] : $today;
    $getdate  = substr($getdate1,0,10);
	$measurement_date 	= date('Y-m-d', strtotime($getdate));

	//echo "EXEC [traceability_ma_esd] '{$measurement_date}'";
    $sql    = "declare @totalcount as int; exec traceability_ma_esd $start, $limit, '{$measurement_date}', @totalcount=@totalcount out";
    $rs     = $db->Execute($sql);
    $totalcount = trim($rs->fields['12']);
    $return = array();
    
    for($i=0;!$rs->EOF;$i++){
        $return[$i]['id']           = trim($rs->fields['0']);
        $return[$i]['dateesd']      = trim($rs->fields['1']);
        $return[$i]['datetimein']   = trim($rs->fields['2']);
        $return[$i]['mchname']      = trim($rs->fields['3']);
        $return[$i]['nik']          = trim($rs->fields['4']);
        $return[$i]['leftstatus']   = trim($rs->fields['5']);
        $return[$i]['leftfeet']     = trim($rs->fields['6']);
        $return[$i]['rightstatus']  = trim($rs->fields['7']);
        $return[$i]['rightfeet']    = trim($rs->fields['8']);
        $return[$i]['wirststatus']  = trim($rs->fields['9']);
        $return[$i]['wirstvalue']   = trim($rs->fields['10']);
        $return[$i]['judgement']    = trim($rs->fields['11']);
       
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
