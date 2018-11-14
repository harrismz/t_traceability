<?php
	date_default_timezone_set('Asia/jakarta');
    include '../../../adodb/con_mapros_SQL.php';

    // $page       = @$_REQUEST["page"];
    // $limit      = @$_REQUEST["limit"];
    $boardid    = @$_REQUEST['boardid'];
    // $start      = (($page*$limit)-$limit)+1;
	
    // echo $sql        = "declare @totalcount as int; EXEC traceability_smt_line0 $start, $limit, '{$boardid}', @totalcount=@totalcount out;";

    $sql        = "declare @totalcount as int; EXEC traceability_smt_line0_rev1 '{$boardid}'";
    $rs         = $db->Execute($sql);
    // $totalcount = $rs->fields['11'];
    $return     = array();

    for($i=0;!$rs->EOF;$i++){
        $return[$i]['idlinezero']   = trim($rs->fields['0']);
        $return[$i]['dateinspec']   = trim($rs->fields['1']);
        $return[$i]['serial']       = trim($rs->fields['2']);
        $return[$i]['sn']           = trim($rs->fields['3']);
        $return[$i]['jigno']        = trim($rs->fields['4']);
        $return[$i]['judge']        = trim($rs->fields['5']);
        $return[$i]['inspectime']   = trim($rs->fields['6']);
        $return[$i]['artfilename']  = trim($rs->fields['7']);
        $return[$i]['ngcontent']    = trim($rs->fields['8']);   
        $return[$i]['input_user']   = trim($rs->fields['9']);
        $return[$i]['input_date']   = trim($rs->fields['10']);
       
        $rs->MoveNext();
    }
    $x = array(
        "success"=>true,
        // "totalCount"=>$totalcount,
        "rows"=>$return);
    echo json_encode($x);
    $db->Close();
?>
