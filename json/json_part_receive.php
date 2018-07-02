<?php
	/*
	****	create by Mohamad Yunus
	****	on 06 Sept 2016
	****	remark:

	****	Modify By Harris
	****	on 09 Feb 2018
	****	remark:  menambahkan status lotout, prname,fldremark
	*/

	include '../../adodb/con_qrinvoice.php';
	$model  = $_REQUEST['model'];
	$lot		= $_REQUEST['prod_no'];
	$getdate= substr($_REQUEST['prod_date'],0,10);
	$sdate 	= date('Y-m-d', strtotime($getdate."- 7 days"));
	$edate  = date('Y-m-d', strtotime($getdate."+ 15 days"));

	$rs 	= $db_qrinvoice->Execute("exec traceability_receivepart '{$model}','{$lot}','{$sdate}','{$edate}'");
	$return = array();

	for ($i = 0; !$rs->EOF; $i++) {

		$return[$i]['userid'] 		= trim($rs->fields['0']);
		$return[$i]['supp'] 			= trim($rs->fields['1']);
		$return[$i]['inv'] 				= trim($rs->fields['2']);
		$return[$i]['part'] 			= trim($rs->fields['3']);
		$return[$i]['po'] 				= trim($rs->fields['4']);
		$return[$i]['qty'] 				= trim($rs->fields['5']);
		$return[$i]['rcvdate'] 		= trim($rs->fields['6']);
		$return[$i]['custom'] 		= trim($rs->fields['7']);
		$return[$i]['category'] 	= trim($rs->fields['8']);
		$return[$i]['sendflag'] 	= trim($rs->fields['9']);
		$return[$i]['lot_out']  	= ucwords(strtolower(trim($rs->fields['10'])));
		$return[$i]['pr_name']		= ucwords(strtolower(trim($rs->fields['11'])));

		$rs->MoveNext();
	}

	echo json_encode($return);

	// Closing Database Connection
	$rs->Close();
	$db_qrinvoice->Close();
?>
