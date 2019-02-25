<?php
    include '../../../adodb/con_ocs.php';
    
    $page           = @$_REQUEST["page"];
    $limit          = @$_REQUEST["limit"];
    $start          = (($page*$limit)-$limit);
    $model          = @$_REQUEST['model'];
    $prod_no        = @$_REQUEST['prod_no'];
    $st_serial      = @$_REQUEST['st_serial'];
    $lot_size       = @$_REQUEST['lot_size'];
    $serial_id      = @$_REQUEST['serial_id'];
    $serial_no_id   = substr(@$_REQUEST['serial_no_id'],-8);
	
	$sql_plan       = "select * from traceability_plan ({$start},{$limit},'{$model}','{$prod_no}','{$st_serial}','{$lot_size}','{$serial_id}','{$serial_no_id}')";
    $rs             = $db->Execute($sql_plan);
    $totalcount     = $rs->fields['6'];
    $return         = array();

    for($i=0;!$rs->EOF;$i++){
        $return[$i]['prod_date']    = $rs->fields['0'];
        $return[$i]['line_name']    = $rs->fields['1'];
        $return[$i]['model_name']   = $rs->fields['2'];
        $return[$i]['prod_no']     	= $rs->fields['3'];
        $return[$i]['start_serial'] = $rs->fields['4'];
        $return[$i]['lot_size']     = $rs->fields['5'];
        
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