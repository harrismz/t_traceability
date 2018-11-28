<?php
	date_default_timezone_set('Asia/jakarta');
    include '../../../adodb/con_mapros_MYSQL.php';

    //$page 		= @$_REQUEST["page"];
	//$limit 		= @$_REQUEST["limit"];
	//$start		= (($page*$limit)-$limit)+1;
	//  $getdate    = substr($_REQUEST['smt_date'],0,10);
    //  $smt_date   = date('Y-m-d', strtotime($getdate));
    $boardid    = @$_REQUEST['boardid'];
    $cavity     = @$_REQUEST['cavity'];
    $model      = @$_REQUEST['model'];
    $pwbname    = @$_REQUEST['pwbname'];

	// echo "call traceability_goodsmt_board_rev2 ('{$boardid}','{$cavity}', '{$model}','{$pwbname}')";
    $rs    = $db->Execute("call traceability_goodsmt_board_rev2 ('{$boardid}','{$cavity}', '{$model}','{$pwbname}')");
    $return = array();
 
    for($i=0;!$rs->EOF;$i++){
        $return[$i]['tbone_id']             = trim($rs->fields['0']);
        $return[$i]['tbone_line']           = trim($rs->fields['1']);
        $return[$i]['tbone_model']          = trim($rs->fields['2']);
        $return[$i]['tbone_boardid']        = trim($rs->fields['3']);
        $return[$i]['tbone_lineprocess']    = trim($rs->fields['4']);
        $return[$i]['IN_time']              = trim($rs->fields['5']);
        $return[$i]['IN_judge']             = trim($rs->fields['6']);
        $return[$i]['IN_nik']               = trim($rs->fields['7']);
        $return[$i]['OUT_time']             = trim($rs->fields['8']);
        $return[$i]['OUT_judge']            = trim($rs->fields['9']);
        $return[$i]['OUT_nik']              = trim($rs->fields['10']);
        $return[$i]['tbone_timerange']      = trim($rs->fields['11']);
        $return[$i]['tbone_guidmaster']     = trim($rs->fields['12']);
        $return[$i]['tbone_guidticket']     = trim($rs->fields['13']);
        $return[$i]['tbone_idproces']       = trim($rs->fields['14']);
      
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
