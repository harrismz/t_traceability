<?php
	date_default_timezone_set('Asia/jakarta');
    include '../../adodb/con_mounter.php';

    //$page 		= @$_REQUEST["page"];
	//$limit 		= @$_REQUEST["limit"];
	//$start		= (($page*$limit)-$limit)+1;
	$src_cat	    = $_REQUEST['src_cat'];
	
	$model      = $_REQUEST['model'];
	$getdate    = substr($_REQUEST['prod_date'],0,10);
	$proddate 	= date('Y-m-d', strtotime($getdate));

	//echo "exec traceability_reflow '{$model}','{$proddate}'";
    $rs    = $db->Execute("exec traceability_reflow '{$model}','{$proddate}'");
    $return = array();

    for($i=0;!$rs->EOF;$i++){
        $return[$i]['board_id']          = trim($rs->fields['0']);
        $return[$i]['scan_date']         = trim($rs->fields['1']);
        $return[$i]['reflow_start_time'] = trim($rs->fields['2']);
        $return[$i]['reflow_end_time']   = trim($rs->fields['3']);
        $return[$i]['reflow_end_time']   = trim($rs->fields['4']);
        $return[$i]['reflow_end_time']   = trim($rs->fields['5']);
        $return[$i]['pcbid']	         = trim($rs->fields['6']);
       
        $rs->MoveNext();
    }
    $x = array(
        "success"=>true,
        //"totalCount"=>$totalcount,
        "rows"=>$return);

    echo json_encode($x);

    $db->Close();
?>
