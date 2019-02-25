<?php
	//	get paramater
	$page   = @$_REQUEST["page"];
    $limit  = @$_REQUEST["limit"];
    $start  = (($page*$limit)-$limit);
    $cek	= trim(@$_REQUEST["catMecha"]);
	// $src_cat	= $_REQUEST['src_cat'];
	
	//	execute query
	if($cek == 'MCH'){
		include '../../../adodb/con_ocs_mecha.php';
		$model      = $_REQUEST['model'];
		$prodno     = $_REQUEST['prod_no'];
		$st_serial  = $_REQUEST['st_serial'];
		$lot_size	= $_REQUEST['lot_size'];
		$rs    = $db->Execute("select * from traceability_actual({$start},{$limit},'{$model}', '{$prodno}', '{$st_serial}', '{$lot_size}')");
	}
	else{
		include '../../../adodb/con_ocs.php';
		// $src_cat	= $_REQUEST['src_cat'];
		// if ($src_cat == "sp"){
		// 	$model      = $_REQUEST['model'];
		// 	$prodno     = $_REQUEST['prod_no'];
		// 	$st_serial  = 0;
		// 	$lot_size	= NULL;
		// } else {
			$model      = $_REQUEST['model'];
			$prodno     = $_REQUEST['prod_no'];
			$st_serial  = $_REQUEST['st_serial'];
			$lot_size	= $_REQUEST['lot_size'];
		// }
		$rs    = $db->Execute("select * from traceability_actual({$start},{$limit},'{$model}', '{$prodno}', '{$st_serial}', '{$lot_size}')");
	}	
	
	//	array data
	$totalcount = $rs->fields['6'];
    $return = array();
    for($i=0;!$rs->EOF;$i++){
        $return[$i]['prod_date']    = trim($rs->fields['0']);
        $return[$i]['line_name']    = trim($rs->fields['1']);
        $return[$i]['model_name']   = trim($rs->fields['2']);
        $return[$i]['shift']     	= trim($rs->fields['3']);
        $return[$i]['output'] 		= (float)trim($rs->fields['4']);
        $return[$i]['stime'] 		= $rs->fields['5'];
        $rs->MoveNext();
    }
	
    $o = array(
        "success"=>true,
        "totalCount"=>$totalcount,
        "rows"=>$return);
        
    echo json_encode($o);
    
	//	connection close
    $rs->Close();
    $db->Close();
?>