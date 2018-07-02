<?php
    //error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);
    include '../../adodb/con_ocs.php';
    
    //$page 		= @$_REQUEST["page"];
	//$limit 		= @$_REQUEST["limit"];
	//$start		= (($page*$limit)-$limit)+1;
	$src_cat	= $_REQUEST['src_cat'];
	if($src_cat == "sp"){
		$model      = $_REQUEST['model'];
		$prodno     = $_REQUEST['prod_no'];
		$s_no       = 0;
		$serialid   = 0;
	} else {
		$model      = $_REQUEST['model'];
		$prodno     = $_REQUEST['prod_no'];
		$s_no       = (int)$_REQUEST['serial_no'];
		$serialid   = (int)$_REQUEST['serial_id'];
	}
	
    $rs    = $db->Execute("select * from show_schedule_new('{$model}', '{$prodno}', '{$s_no}', '{$serialid}', '{$src_cat}')");
    $return = array();

    for($i=0;!$rs->EOF;$i++){
        $return[$i]['prod_date']    = $rs->fields['0'];
        $return[$i]['line_name']    = $rs->fields['1'];
        $return[$i]['model_name']   = $rs->fields['2'];
        $return[$i]['prod_no']     	= $rs->fields['3'];
        $return[$i]['lot_size'] 	= $rs->fields['4'];
        $return[$i]['start_serial'] = $rs->fields['5'];
        
        $rs->MoveNext();
    }
    $x = array(
        "success"=>true,
        //"totalCount"=>$totalcount,
        "rows"=>$return);

    echo json_encode($x);

    $db->Close();
?>