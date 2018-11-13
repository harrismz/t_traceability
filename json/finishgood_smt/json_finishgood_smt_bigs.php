<?php
	date_default_timezone_set('Asia/jakarta');
   

    //$page        = @$_REQUEST["page"];
	//$limit       = @$_REQUEST["limit"];
	//$start       = (($page*$limit)-$limit)+1;
	$boardid       = $_REQUEST['boardid'];
	$getdate       = substr($_REQUEST['smt_date'],0,10);
	$proddate 	   = date('Y-m-d', strtotime($getdate));

	//echo "exec traceability_smt_big '{$boardid}','{$proddate}'";
    $pjgboard = strlen($boardid);

    if ( $pjgboard == 16 ){
         include '../../../adodb/con_big.php';

        $sql = "exec traceability_smt_big '{$boardid}','{$proddate}'";
        $rs    = $db->Execute($sql);
        $return = array();

        for($i=0;!$rs->EOF;$i++){
            $return[$i]['side']         = trim($rs->fields['0']);
            $return[$i]['cavity']       = trim($rs->fields['1']);
            $return[$i]['seq_start']    = trim($rs->fields['2']);
            $return[$i]['seq_end']      = trim($rs->fields['3']);
            $return[$i]['line']         = trim($rs->fields['4']);
            $return[$i]['model']        = trim($rs->fields['5']);
            $return[$i]['pwbname']      = trim($rs->fields['6']);
            $return[$i]['prod_no']      = trim($rs->fields['7']);
            $return[$i]['process']      = trim($rs->fields['8']);
            $return[$i]['qty']          = trim($rs->fields['9']);
            $return[$i]['ynumber']      = trim($rs->fields['10']);
            $return[$i]['start_serial'] = trim($rs->fields['11']);
           
            $rs->MoveNext();
        }
        $x = array(
            "success"=>true,
            //"totalCount"=>$totalcount,
            "rows"=>$return);

        echo json_encode($x);

        $db->Close();
    }
    else if($pjgboard == 24){
        include '../../../adodb/con_big24.php';

        //echo "exec traceability_smt_big24 '{$boardid}','{$proddate}'";
        $rs_big24    = $db_big24->Execute("exec traceability_smt_big24 '{$boardid}','{$proddate}'");
        $return = array();

        for($i=0;!$rs_big24->EOF;$i++){
            $return[$i]['side']         = trim($rs_big24->fields['0']);
            $return[$i]['cavity']       = trim($rs_big24->fields['1']);
            $return[$i]['seq_start']    = trim($rs_big24->fields['2']);
            $return[$i]['seq_end']      = trim($rs_big24->fields['3']);
            $return[$i]['line']         = trim($rs_big24->fields['4']);
            $return[$i]['model']        = trim($rs_big24->fields['5']);
            $return[$i]['pwbname']      = trim($rs_big24->fields['6']);
            $return[$i]['prod_no']      = trim($rs_big24->fields['7']);
            $return[$i]['process']      = trim($rs_big24->fields['8']);
            $return[$i]['qty']          = trim($rs_big24->fields['9']);
            $return[$i]['ynumber']      = trim($rs_big24->fields['10']);
            $return[$i]['start_serial'] = trim($rs_big24->fields['11']);
           
            $rs_big24->MoveNext();
        }
        $j = array(
            "success"=>true,
            //"totalCount"=>$totalcount,
            "rows"=>$return);

        echo json_encode($j);

        $db_big24->Close();
    }
    
?>
