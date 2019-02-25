<?php
	date_default_timezone_set('Asia/jakarta');
    include '../../../adodb/con_mapros_SQL.php';

    $page       = @$_REQUEST["page"];
    $limit      = @$_REQUEST["limit"];
    $start      = (($page*$limit)-$limit)+1;
    $idline0     = @$_REQUEST['idline0'];
	
    $sql        = "declare @totalcount as int; EXEC traceability_smt_line0_detail $start, $limit, '{$idline0}', @totalcount=@totalcount out;";
    $rs         = $db->Execute($sql);
    $totalcount = $rs->fields['8'];

    $return     = array();
    for($i=0;!$rs->EOF;$i++){
        $return[$i]['idline0']      = trim($rs->fields['0']);
        $return[$i]['rownumber']    = trim($rs->fields['1']);
        $return[$i]['step']         = trim($rs->fields['2']);
        $return[$i]['stepdata']     = trim($rs->fields['3']);
        $return[$i]['measure']      = trim($rs->fields['4']);
        $return[$i]['measuredata']  = trim($rs->fields['5']);
        $return[$i]['input_user']   = trim($rs->fields['6']);
        $return[$i]['input_date']   = trim($rs->fields['7']);
       
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
