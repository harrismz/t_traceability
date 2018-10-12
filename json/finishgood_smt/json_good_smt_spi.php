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
	//echo "exec [traceability_good_smt_spi] '{$boardid}','{$smt_date}'";
    
    $sql    = "declare @totalcount as int; exec traceability_good_smt_spi $start, $limit, '{$boardid}', '{$smt_date}', @totalcount=@totalcount out";
    $rs    = $db->Execute($sql);
    $return = array();
    $totalcount = $rs->fields['10'];
    
    for($i=0;!$rs->EOF;$i++){
        $return[$i]['mchname']              = trim($rs->fields['0']);
        $return[$i]['inspectiondatetime']   = trim($rs->fields['1']);
        $return[$i]['inspectiondate']       = trim($rs->fields['2']);
        $return[$i]['inspectiontime']       = trim($rs->fields['3']);
        $return[$i]['filename']             = trim($rs->fields['4']);
        $return[$i]['pcbid']                = trim($rs->fields['5']);
        $return[$i]['barcode']              = trim($rs->fields['6']);
        $return[$i]['spijudge']             = trim($rs->fields['7']);
        $return[$i]['opjudge']              = trim($rs->fields['8']);
        $return[$i]['defectcnt']            = trim($rs->fields['9']);
        
       
        $rs->MoveNext();
    }
    $x = array(
        "success"=>true,
        "totalCount"=>$totalcount,
        "rows"=>$return);

    echo json_encode($x);

    $db->Close();
?>
