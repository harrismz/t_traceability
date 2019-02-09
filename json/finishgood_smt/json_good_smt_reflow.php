<?php
	date_default_timezone_set('Asia/jakarta');
    include '../../../adodb/con_mounter.php';

    $page       = @$_REQUEST["page"];
    $limit      = @$_REQUEST["limit"];
    $start      = (($page*$limit)-$limit)+1;
    $boardid    = @$_REQUEST['boardid'];
    $smt_date2  = @$_REQUEST['smt_date'];
    $getdate    = '';
    $smt_date   = '';

    if ($smt_date2) {
        $getdate    = substr($_REQUEST['smt_date'],0,10);
        $smt_date   = date('Y-m-d', strtotime($getdate));
    }
    else {
        $smt_date   = '';
    }

	//echo "exec traceability_good_smt_reflow '{$model}','{$proddate}'";
    //$rs    = $db->Execute("exec [traceability_good_smt_reflow] '{$model}','{$proddate}'");
    $sql        = "declare @totalcount as int; exec traceability_good_smt_reflow_rev1 $start, $limit, '{$boardid}', '{$smt_date}', @totalcount=@totalcount out";
    $rs         = $db->Execute($sql);
    $totalcount = $rs->fields['7'];
    
    $return     = array();

    for($i=0;!$rs->EOF;$i++){
        $return[$i]['board_id']          = trim($rs->fields['0']);
        $return[$i]['scan_date']         = trim($rs->fields['1']);
        $return[$i]['reflow_start_time'] = trim($rs->fields['2']);
        $return[$i]['reflow_end_time']   = trim($rs->fields['3']);
        $return[$i]['boardlen']          = trim($rs->fields['4']);
        $return[$i]['diffdate']          = trim($rs->fields['5']);
        $return[$i]['pcbid']	         = trim($rs->fields['6']);
       
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
