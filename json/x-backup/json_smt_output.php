<?php
	/*
	****	modify by Mohamad Yunus
	****	on 31 Oct 2016
	****	revise:  menambahkan param valrbprod untuk kondisi query mecha dan ma
	*/
	include '../../adodb/con_ocs_im.php';


	//	get paramater
	$cek		= trim(@$_REQUEST["valrbprod"]);
	$src_cat	= $_REQUEST['src_cat'];

	//	execute query
	if ($src_cat == "sp") {
		$model      = $_REQUEST['model'];
		$prodno     = '';
		$st_serial  = 0;
		$lot_size	= '';
		$sdate		= substr($_REQUEST['prod_date'],0,10);
		$edate		= substr($_REQUEST['prod_date'],0,10);
	}else{
		$model      = $_REQUEST['model'];
		$prodno     = $_REQUEST['prod_no'];
		$st_serial  = $_REQUEST['st_serial'];
		$lot_size	= $_REQUEST['lot_size'];
		$sdate		= substr($_REQUEST['prod_date'],0,10);
		$edate		= substr($_REQUEST['prod_date'],0,10);
	}
	$rs    = $db->Execute("select * from show_output('{$model}', '{$prodno}', '{$st_serial}', '{$lot_size}','{$sdate}','{$edate}','{$src_cat}')");

	//	array data
	$return = array();
	for($i=0;!$rs->EOF;$i++){
		$return[$i]['prod_date']  = $rs->fields['0'];
		$return[$i]['line_name']  = $rs->fields['1'];
		$return[$i]['model_name'] = $rs->fields['2'];
		$return[$i]['pwb']   			= $rs->fields['3'];
		$return[$i]['process'] 		= $rs->fields['4'];
		$return[$i]['shift']     	= $rs->fields['5'];
		$return[$i]['output'] 		= $rs->fields['6'];
		$newtime									= date_create($rs->fields['7']);
		$start_time								= date_format($newtime, 'H:i:s');
    $return[$i]['stime'] 			= $start_time;
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
