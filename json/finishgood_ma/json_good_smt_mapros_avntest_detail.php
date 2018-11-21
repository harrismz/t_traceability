<?php
	date_default_timezone_set('Asia/jakarta');
    include '../../../adodb/con_mapros_SQL.php';

    $page       = @$_REQUEST["page"];
    $limit      = @$_REQUEST["limit"];
    $idavnt     = @$_REQUEST['avnt'];
    $start      = (($page*$limit)-$limit)+1;
	
    $sql        = "declare @totalcount int EXEC traceability_smt_avntest_detail  $start, $limit, '{$idavnt}', @totalcount=@totalcount out;";
    $rs         = $db->Execute($sql);
    $totalcount = $rs->fields['7'];
    $return     = array();

    for($i=0;!$rs->EOF;$i++){
        $return[$i]['idavnt']       = trim($rs->fields['0']);
        $return[$i]['step']         = trim($rs->fields['1']);
        $return[$i]['stepdata']     = trim($rs->fields['2']);
        $return[$i]['measure']      = trim($rs->fields['3']);
        $return[$i]['measuredata']  = trim($rs->fields['4']);
        $return[$i]['input_user']   = trim($rs->fields['5']);
        $return[$i]['input_date']   = trim($rs->fields['6']);
       
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
