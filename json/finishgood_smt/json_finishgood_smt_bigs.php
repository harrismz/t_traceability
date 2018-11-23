<?php
    date_default_timezone_set('Asia/jakarta');
    $boardid = $_REQUEST['boardid'];
	$pjgboard = strlen($boardid);

    if ( $pjgboard == 16 ){
        include '../../../adodb/con_big.php';
        
        $sql    = "exec traceability_smt_big '{$boardid}'";
        $rs     = $db->Execute($sql);
        $return = array();
        
        for($i=0;!$rs->EOF;$i++){
            $return[$i]['side']         = trim($rs->fields['0']);
            $return[$i]['cavity']       = trim($rs->fields['1']);
            $return[$i]['seq_start']    = trim($rs->fields['2']);
            $return[$i]['seq_end']      = trim($rs->fields['3']);
            $return[$i]['line']         = trim($rs->fields['4']);
            $return[$i]['model']        = trim($rs->fields['5']);
            $return[$i]['pwbname']      = trim($rs->fields['6']);
            $return[$i]['pwbno']        = trim($rs->fields['7']);
            $return[$i]['prod_no']      = trim($rs->fields['8']);
            $return[$i]['process']      = trim($rs->fields['9']);
            $return[$i]['qty']          = trim($rs->fields['10']);
            $return[$i]['ynumber']      = trim($rs->fields['11']);
            $return[$i]['start_serial'] = trim($rs->fields['12']);
            $rs->MoveNext();
        }
        
        $x = array(
            "success"=>true,
            "rows"=>$return);
        
        echo json_encode($x);
        $rs->Close();
        $db->Close();
    }
    else if($pjgboard == 24){
        include '../../../adodb/con_big24.php';
        
        $rs_big24   = $db_big24->Execute("exec traceability_smt_big24 '{$boardid}'");
        $return     = array();

        for($i=0;!$rs_big24->EOF;$i++){
            $return[$i]['side']         = trim($rs_big24->fields['0']);
            $return[$i]['cavity']       = trim($rs_big24->fields['1']);
            $return[$i]['line']         = trim($rs_big24->fields['2']);
            $return[$i]['model']        = trim($rs_big24->fields['3']);
            $return[$i]['pwbname']      = trim($rs_big24->fields['4']);
            $return[$i]['pwbno']        = trim($rs_big24->fields['5']);
            $return[$i]['prod_no']      = trim($rs_big24->fields['6']);
            $return[$i]['process']      = trim($rs_big24->fields['7']);
            $return[$i]['qty']          = trim($rs_big24->fields['8']);
            $return[$i]['ynumber']      = trim($rs_big24->fields['9']);
            $return[$i]['start_serial'] = trim($rs_big24->fields['10']);
           
            $rs_big24->MoveNext();
        }
        $j = array(
            "success"=>true,
            "rows"=>$return);

        echo json_encode($j);
        $rs_big24->Close();
        $db_big24->Close();
    }
    
?>
