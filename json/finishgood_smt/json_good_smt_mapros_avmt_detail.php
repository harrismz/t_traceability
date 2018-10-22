<?php
	date_default_timezone_set('Asia/jakarta');
    include '../../../adodb/con_mapros_SQL.php';

    // $page       = @$_REQUEST["page"];
    // $limit      = @$_REQUEST["limit"];
    // $start      = (($page*$limit)-$limit)+1;
    $idavmt     = @$_REQUEST['idavmt'];
	
    $sql        = "EXEC traceability_smt_avmt_detail '{$idavmt}'";
    $rs         = $db->Execute($sql);
    $return     = array();
    for($i=0;!$rs->EOF;$i++){
        $return[$i]['autoid']       = trim($rs->fields['0']);
        $return[$i]['idavmt']       = trim($rs->fields['1']);
        $return[$i]['barcode']      = trim($rs->fields['2']);
        $return[$i]['step']         = trim($rs->fields['3']);
        $return[$i]['type']         = trim($rs->fields['4']);
        $return[$i]['name']         = trim($rs->fields['5']);
        $return[$i]['judgment']     = trim($rs->fields['6']);
        $return[$i]['volt']         = trim($rs->fields['7']);
        $return[$i]['curr']         = trim($rs->fields['8']);
        $return[$i]['freq']         = trim($rs->fields['9']);
        $return[$i]['lvll']         = trim($rs->fields['10']);
        $return[$i]['lvlr']         = trim($rs->fields['11']);
        $return[$i]['dstl']         = trim($rs->fields['12']);
        $return[$i]['dstr']         = trim($rs->fields['13']);
        $return[$i]['rell']         = trim($rs->fields['14']);
        $return[$i]['relr']         = trim($rs->fields['15']);
        $return[$i]['snl']          = trim($rs->fields['16']);
        $return[$i]['snr']          = trim($rs->fields['17']);
        $return[$i]['remark']       = trim($rs->fields['18']);
        $return[$i]['input_user']   = trim($rs->fields['19']);
        $return[$i]['input_date']   = trim($rs->fields['20']);
        $return[$i]['update_user']  = trim($rs->fields['21']);
        $return[$i]['update_date']  = trim($rs->fields['22']);
       
        $rs->MoveNext();
    }
    $x = array(
        "success"=>true,
        "rows"=>$return);
    echo json_encode($x);
    $db->Close();
?>
