<?php
    //error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);
    include '../../adodb/con_ocs_mecha.php';
    
    //$page 		= @$_REQUEST["page"];
	//$limit 		= @$_REQUEST["limit"];
	//$start		= (($page*$limit)-$limit)+1;
    $model      = $_REQUEST['mecha_model'];
    $prodno     = $_REQUEST['mecha_lot'];

    $rs    = $db->Execute("select * from show_mecha_output('{$model}', '{$prodno}')");
    $return = array();

    for($i=0;!$rs->EOF;$i++){
        $return[$i]['prod_date']    = $rs->fields['0'];
        $return[$i]['line_name']    = $rs->fields['1'];
        $return[$i]['model_name']   = $rs->fields['2'];
        $return[$i]['shift']     	= $rs->fields['3'];
        $return[$i]['output'] 		= $rs->fields['4'];
        $return[$i]['stime'] 		= $rs->fields['5'];
        
        $rs->MoveNext();
    }
    $x = array(
        "success"=>true,
        //"totalCount"=>$totalcount,
        "rows"=>$return);

    echo json_encode($x);
    $rs->Close();
    $db->Close();
?>