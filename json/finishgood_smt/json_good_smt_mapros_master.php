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


	// echo "call traceability_goodsmt_master ('{$boardid}','{$cavity}')";
    $rs    = $db->Execute("call traceability_goodsmt_master ('{$boardid}','{$cavity}')");
    $return = array();
 
    for($i=0;!$rs->EOF;$i++){
		$return[$i]['ticket_no_master']	= trim($rs->fields['0']);
        $return[$i]['guid_master']		= trim($rs->fields['1']);
        $return[$i]['modelname']   		= trim($rs->fields['2']);
        $return[$i]['scanner_id']     	= trim($rs->fields['3']);
        $return[$i]['status']         	= trim($rs->fields['4']);
        $return[$i]['scan_nik']    		= trim($rs->fields['5']);
        $return[$i]['judge']        	= trim($rs->fields['6']);
        $return[$i]['created_at']      	= trim($rs->fields['7']);
        $return[$i]['updated_at']       = trim($rs->fields['8']);
        $return[$i]['lineprocess']    	= trim($rs->fields['9']);
        $return[$i]['line']             = trim($rs->fields['10']);
        $return[$i]['serial_no']		= trim($rs->fields['11']);
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
