<?php
	date_default_timezone_set('Asia/jakarta');
    include '../../../adodb/con_mapros_SQL_svrdbn.php';

    //$page 		= @$_REQUEST["page"];
	//$limit 		= @$_REQUEST["limit"];
	//$start		= (($page*$limit)-$limit)+1;
	
    $today    = date("Y-m-d");

    $getdate1 = isset($_REQUEST['measurement_date']) ? $_REQUEST['measurement_date'] : $today;
    $getdate  = substr($getdate1,0,10);
	$measurement_date 	= date('Y-m-d', strtotime($getdate));

	//echo "EXEC [traceability_ma_torque] '{$measurement_date}'";
    $rs    = $db->Execute("EXEC [traceability_ma_torque] '{$measurement_date}'");
    $return = array();
    
    for($i=0;!$rs->EOF;$i++){
        $return[$i]['id']              = trim($rs->fields['0']);
        $return[$i]['mchname']         = trim($rs->fields['1']);
        $return[$i]['dateinspection']  = trim($rs->fields['2']);
        $return[$i]['datetimein']      = trim($rs->fields['3']);
        $return[$i]['channel']         = trim($rs->fields['4']);
        $return[$i]['mode']            = trim($rs->fields['5']);
        $return[$i]['rotation']        = trim($rs->fields['6']);
        $return[$i]['torque']          = round(trim($rs->fields['7']),3);
        $return[$i]['unit']            = trim($rs->fields['8']);
        $return[$i]['result']          = trim($rs->fields['9']);
       
        $rs->MoveNext();
    }
    $x = array(
        "success"=>true,
        //"totalCount"=>$totalcount,
        "rows"=>$return);

    echo json_encode($x);
    $rs->Close();
    $db->Close();
?>
