<?php
	date_default_timezone_set('Asia/jakarta');
    include '../../adodb/con_big.php';

    //$page        = @$_REQUEST["page"];
	//$limit       = @$_REQUEST["limit"];
	//$start       = (($page*$limit)-$limit)+1;
	$boardid       = $_REQUEST['boardid'];
	$getdate       = substr($_REQUEST['smt_date'],0,10);
	$proddate 	   = date('Y-m-d', strtotime($getdate));

	//echo "exec traceability_smt_big '{$boardid}','{$proddate}'";
    $rs    = $db->Execute("exec traceability_smt_big '{$boardid}','{$proddate}'");
    $return = array();



    for($i=0;!$rs->EOF;$i++){
        $return[$i]['schedule_id']  = trim($rs->fields['0']);
        $return[$i]['lot_size']     = trim($rs->fields['1']);
        $return[$i]['model_code']   = trim($rs->fields['2']);
        $return[$i]['prod_no_code'] = trim($rs->fields['3']);
        $return[$i]['side']         = trim($rs->fields['4']);
        $return[$i]['cavity']       = trim($rs->fields['5']);
        $return[$i]['seq_start']    = trim($rs->fields['6']);
        $return[$i]['seq_end']      = trim($rs->fields['7']);
        $return[$i]['line']         = trim($rs->fields['8']);
        $return[$i]['model']        = trim($rs->fields['9']);
        $return[$i]['pwbname']      = trim($rs->fields['10']);
        $return[$i]['pwbno']        = trim($rs->fields['11']);
        $return[$i]['prod_no']      = trim($rs->fields['12']);
        $return[$i]['process']      = trim($rs->fields['13']);
        $return[$i]['rev_date']     = trim($rs->fields['14']);
        $return[$i]['qty']	        = trim($rs->fields['15']);
       
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
