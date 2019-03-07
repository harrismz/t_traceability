<?php
	date_default_timezone_set('Asia/jakarta');
    include '../../../adodb/con_mapros_MYSQL.php';

    $page 		= @$_REQUEST["page"];
	$limit 		= @$_REQUEST["limit"];
	$start		= (($page*$limit)-$limit)+1;
	 // $getdate    = substr($_REQUEST['smt_date'],0,10);
  //    $smt_date   = date('Y-m-d', strtotime($getdate));
    $model      = @$_REQUEST['valmodel'];
    $serialnoid = substr(@$_REQUEST['valserialno'],-8);
    $dummySerial    = @$_REQUEST['dummySerial'];


	// echo "call traceability_goodsmt_board ('{$boardid}','{$cavity}')";
    //$sql    = "call traceability_maprosBoard ({$start},{$limit},'{$model}','{$serialnoid}');";
    $sql    = "call traceability_maprosBoard ('{$model}','{$serialnoid}','{$dummySerial}')";
    $rs    = $db->Execute($sql);
    $totalcount = $rs->fields[13];
    $return = array();
 
    for($i=0;!$rs->EOF;$i++){
        $return[$i]['board_id']      = trim($rs->fields['0']);
        $return[$i]['guid_master']   = trim($rs->fields['1']);
        $return[$i]['guid_ticket']   = trim($rs->fields['2']);
        $return[$i]['modelname']     = trim($rs->fields['3']);
        $return[$i]['lotno']         = trim($rs->fields['4']);
        $return[$i]['scanner_id']    = trim($rs->fields['5']);
        $return[$i]['status']        = trim($rs->fields['6']);
        $return[$i]['scan_nik']      = trim($rs->fields['7']);
        $return[$i]['judge']         = trim($rs->fields['8']);
        $return[$i]['created_at']    = trim($rs->fields['9']);
        $return[$i]['updated_at']    = trim($rs->fields['10']);
        $return[$i]['lineprocess']   = trim($rs->fields['11']);
        $return[$i]['line']          = trim($rs->fields['12']);
      
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
