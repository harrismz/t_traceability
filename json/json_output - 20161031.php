<?php
    //error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);
    include '../../adodb/con_ocs.php';
    
    //$page 		= @$_REQUEST["page"];
	//$limit 		= @$_REQUEST["limit"];
	//$start		= (($page*$limit)-$limit)+1;
	$src_cat	= $_REQUEST['src_cat'];
	if ($src_cat == "sp"){
		$model      = $_REQUEST['model'];
		$prodno     = $_REQUEST['prod_no'];
		$st_serial  = 0;
		$lot_size	= NULL;
	} else {
		$model      = $_REQUEST['model'];
		$prodno     = $_REQUEST['prod_no'];
		$st_serial  = $_REQUEST['st_serial'];
		$lot_size	= $_REQUEST['lot_size'];
	}

    $rs    = $db->Execute("select * from show_output('{$model}', '{$prodno}', '{$st_serial}', '{$lot_size}', '{$src_cat}')");
    $return = array();

    for($i=0;!$rs->EOF;$i++){
        $return[$i]['prod_date']    = trim($rs->fields['0']);
        $return[$i]['line_name']    = trim($rs->fields['1']);
        $return[$i]['model_name']   = trim($rs->fields['2']);
        $return[$i]['shift']     	= trim($rs->fields['3']);
        $return[$i]['output'] 		= (float)trim($rs->fields['4']);
        
        $rs->MoveNext();
    }
    $x = array(
        "success"=>true,
        //"totalCount"=>$totalcount,
        "rows"=>$return);

    echo json_encode($x);

    $db->Close();
?>