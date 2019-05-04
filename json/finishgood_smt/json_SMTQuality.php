<?php
	include '../../../ADODB/con_iqrs.php';
	date_default_timezone_set("Asia/Jakarta");
	
	/*
		_dc	 1476784954417
		limit 5
		model KW-V820BTKN
		page 1
		prod_date	 2016-10-04
		src_cat	 sp
		start	 0
	*/
	
	$model			= isset($_REQUEST['model'])?$_REQUEST['model']:'';
	$start_serial	= isset($_REQUEST['start_serial'])?$_REQUEST['start_serial']:'';
	$pcbname		= isset($_REQUEST['pcbname'])?$_REQUEST['pcbname']:'';
	$lotno			= isset($_REQUEST['lotno'])?$_REQUEST['lotno']:'';
	$dmsides		= isset($_REQUEST['dmsides'])?$_REQUEST['dmsides']:'';
	
	//$model			= 'DDX317BTEN';
	//$prod_date		= '2016-10-08';
	/**	run query **/
	$sqlQuality		= "exec Traceability_DisplayInqual '$model', '$start_serial', '$pcbname', '$lotno', '$dmsides'";
	$rs 			= $db->Execute($sqlQuality);
	$return 		= array();
			
	//	-----***-----  //
	
	
	for ($i = 0; !$rs->EOF; $i++) {
		
		$return[$i]['inputid']		= trim($rs->fields['0']);
		$return[$i]['dateid']		= trim($rs->fields['1']);
		$return[$i]['group']		= trim($rs->fields['2']);
		$return[$i]['shift']		= trim($rs->fields['3']);
		$return[$i]['mch']			= trim($rs->fields['4']);
		$return[$i]['model_name']	= trim($rs->fields['5']);
		$return[$i]['start_serial']	= trim($rs->fields['6']);
		$return[$i]['serial_no']	= trim($rs->fields['7']);
		$return[$i]['lot_no']		= trim($rs->fields['8']);
		$return[$i]['lot_qty']		= trim($rs->fields['9']);
		$return[$i]['pcb_name']		= trim($rs->fields['10']);
		$return[$i]['pwb_no']		= trim($rs->fields['11']);
		$return[$i]['process']		= trim($rs->fields['12']);
		$return[$i]['ai']			= trim($rs->fields['13']);
		$return[$i]['smt']			= trim($rs->fields['14']);
		$return[$i]['loc']			= trim($rs->fields['15']);
		$return[$i]['magazineno']	= trim($rs->fields['16']);
		$return[$i]['ng']			= trim($rs->fields['17']);
		$return[$i]['boardke']		= trim($rs->fields['18']);
		$return[$i]['boardqty']		= (float)trim($rs->fields['19']);
		$return[$i]['pointqty']		= (float)trim($rs->fields['20']);
		$return[$i]['inputdate']	= $rs->fields['21'];
		$rs->MoveNext();
	}
	
	
	$o = array(
		"success"=>true,
		//"totalCount"=>$totalcount,
		"rows"=>$return);
	
	echo json_encode($o);
	
	$rs->Close();
	$db->Close();
	$db=null;
?>