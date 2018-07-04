<?php
    //error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);
    include '../../adodb/con_ocs.php';

    //$page 		= @$_REQUEST["page"];
	//$limit 		= @$_REQUEST["limit"];
	//$start		= (($page*$limit)-$limit)+1;
    $model      = $_REQUEST['model'];
    $s_no       = $_REQUEST['serial_no'];

    $rs    = $db->Execute("select * from show_trace('{$model}', '{$s_no}')");
    $return = array();

    for($i=0;!$rs->EOF;$i++){
        $return[$i]['line_name']    = trim($rs->fields['0']);
        $return[$i]['prod_date']    = $rs->fields['1'];
        $return[$i]['host_ip']      = $rs->fields['2'];
        $return[$i]['model_name']   = $rs->fields['3'];
        $return[$i]['prod_no']      = $rs->fields['4'];
        $return[$i]['lot_size']     = $rs->fields['5'];
        $return[$i]['start_serial'] = $rs->fields['6'];
        $return[$i]['serial_no_id'] = $rs->fields['7'];
        $return[$i]['serial_id']    = (int)trim($rs->fields['8']);
        $return[$i]['mecha_model']  = $rs->fields['9'];
        $return[$i]['mecha_lot']    = $rs->fields['10'];

        $rs->MoveNext();
    }
    $x = array(
        "success"=>true,
        //"totalCount"=>$totalcount,
        "rows"=>$return);

    echo json_encode($x);

    $db->Close();
?>
