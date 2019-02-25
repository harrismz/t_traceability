<?php
    //error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);
    include '../../../adodb/con_ocs.php';

    $page 		= @$_REQUEST["page"];
    $limit 		= @$_REQUEST["limit"];
	$start		= (($page*$limit)-$limit);
    $model      = strtoupper(($_REQUEST['modelName']) ? $_REQUEST['modelName'] : 'NULL');
    $s_no       = strtoupper(($_REQUEST['serialNo']) ? $_REQUEST['serialNo'] : 'NULL');
    $lotno      = strtoupper(($_REQUEST['lotNo']) ? $_REQUEST['lotNo'] : 'NULL');

    // echo "select * from traceability_finishgood (1,10,'DDXGT500RA9N',{$s_no},'016A')";
    //echo "select * from traceability_finishgood ({$start},{$limit},'{$model}', '{$s_no}', '{$lotno}')";
    IF ( $s_no == 'NULL' ){
        $where = "({$start},{$limit},'{$model}', {$s_no}, '{$lotno}')";
    }
    ELSEIF ( $lotno == 'NULL' ){
        $where = "({$start},{$limit},'{$model}', '{$s_no}', {$lotno})";
    }
    $sql = "select * from traceability_finishgood".$where;
    $rs    = $db->Execute($sql);
    // $rs    = $db->Execute("select * from traceability_finishgood (1,10,'DDXGT500RA9N',{$s_no},'016A')");

    $totalcount = $rs->fields['11'];
    $return = array();
    
    for($i=0;!$rs->EOF;$i++){
        $return[$i]['line_name']    = trim($rs->fields['0']);
        $return[$i]['prod_date']    = trim(date('Y-m-d', strtotime($rs->fields['1'])));
        $return[$i]['host_ip']      = $rs->fields['2'];
        $return[$i]['model_name']   = $rs->fields['3'];
        $return[$i]['prod_no']      = $rs->fields['4'];
        $return[$i]['lot_size']     = $rs->fields['5'];
        $return[$i]['start_serial'] = $rs->fields['6'];
        $return[$i]['serial_no_id'] = $rs->fields['7'];
        $return[$i]['serial_id']    = (int)trim($rs->fields['8']);
        $return[$i]['mecha_model']  = trim($rs->fields['9']);
        $return[$i]['mecha_lot']    = trim($rs->fields['10']);

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
