<?php
	date_default_timezone_set('Asia/jakarta'); 
    include '../../../adodb/con_smtpros.php';

    $page       = @$_REQUEST["page"];
    $limit      = @$_REQUEST["limit"];
    $start      = (($page*$limit)-$limit)+1;
	
    $boardid    = @$_REQUEST['boardid'];
    // $smt_date2  = @$_REQUEST['smt_date'];
    // $getdate    = '';
    // $smt_date   = '';

    // if ($smt_date2) {
    //     $getdate    = substr($_REQUEST['smt_date'],0,10);
    //     $smt_date   = date('Y-m-d', strtotime($getdate));
    // }
    // else {
    //     $smt_date   = '';
    // }

    //echo "declare @totalcount as int; exec traceability_smt_good_aoi_board $start, $limit, '{$boardid}', '{$smt_date}', @totalcount=@totalcount out";
    // echo "declare @totalcount as int; exec traceability_smt_good_aoi_board $start, $limit, '{$boardid}', '{$smt_date}', @totalcount=@totalcount out";
    //$rs         = $db->Execute("exec traceability_smt_good_aoi_board '{$boardid}','{$smt_date}'");
    
    $sql        = " declare @totalcount as int; 
                    exec traceability_smt_good_aoi_board $start, $limit, '{$boardid}', @totalcount=@totalcount out";
    $rs         = $db->Execute($sql);
    $totalcount = $rs->fields['8'];
    $return     = array();

    for($i=0;!$rs->EOF;$i++){
		$return[$i]['linkedserver']   = trim($rs->fields['0']);
        $return[$i]['pcbid']          = trim($rs->fields['1']);
        $return[$i]['pcbguid']        = trim($rs->fields['2']);
        $return[$i]['barcode']        = trim($rs->fields['3']);
        $return[$i]['stdate']         = trim($rs->fields['4']);
        $return[$i]['enddate']        = trim($rs->fields['5']);
        $return[$i]['aoijudgment']    = trim($rs->fields['6']);
        $return[$i]['userjudgment']   = trim($rs->fields['7']);
       
        $rs->MoveNext();
    }

    $x = array(
            "success"=>true,
            "totalCount"=>$totalcount,
            "rows"=>$return
        );

    echo json_encode($x);
    $rs->Close();
    $db->Close();
?>