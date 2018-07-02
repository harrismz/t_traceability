<?php
	/*
	****	modify by Mohamad Yunus
	****	on 31 Oct 2016
	****	revise:  menambahkan param valrbprod untuk kondisi query mecha dan ma
	*/

	
	//	get paramater
	$cek		= trim(@$_REQUEST["valrbprod"]);
	$src_cat	= $_REQUEST['src_cat'];
	
	//	execute query
	if($cek == 'mecha'){
		include '../../adodb/con_ocs_mecha.php';
		$model      = $_REQUEST['model'];
		$prodno     = $_REQUEST['prod_no'];
		$st_serial  = $_REQUEST['st_serial'];
		$lot_size	= $_REQUEST['lot_size'];
		$rs    = $db->Execute("select * from show_output('{$model}', '{$prodno}', '{$st_serial}', '{$lot_size}', '{$src_cat}')");
	}
	else{
		include '../../adodb/con_ocs.php';
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
	}	
	
	//	array data
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
        "rows"=>$return);
        
    echo json_encode($o);
    
	//	connection close
    $rs->Close();
    $db->Close();
?>