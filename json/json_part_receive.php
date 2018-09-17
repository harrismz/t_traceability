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
	$model   = $_REQUEST['model'];
	$lot	 = $_REQUEST['prod_no'];
	$getdate = substr($_REQUEST['prod_date'],0,10);
	$proddate= date('Y-m-d', strtotime($getdate));
	
	//$sdate   = date('Y-m-d', strtotime($getdate."- 7 days"));
	//$edate   = date('Y-m-d', strtotime($getdate."+ 10 days"));
	//$edate   = date('Y-m-d', strtotime($getdate));
	
	$sql	 = "exec traceability_receivepart '{$model}','{$lot}','{$proddate}'";
	$rs2 	 = $db_qrinvoice->Execute($sql);
	$return  = array();

	//echo "exec traceability_receivepart '{$model}','{$lot}','{$sdate}','{$edate}'";

	for ($i = 0; !$rs2->EOF; $i++) {

		$return[$i]['userid'] 		= trim($rs2->fields['0']);
		$return[$i]['supp'] 		= trim($rs2->fields['1']);
		$return[$i]['inv'] 			= trim($rs2->fields['2']);
		$return[$i]['part'] 		= trim($rs2->fields['3']);
		$return[$i]['po'] 			= trim($rs2->fields['4']);
		$return[$i]['qty'] 			= trim($rs2->fields['5']);
		$return[$i]['rcvdate'] 		= trim($rs2->fields['6']);
		$return[$i]['custom'] 		= trim($rs2->fields['7']);
		$return[$i]['category'] 	= trim($rs2->fields['8']);
		// $return[$i]['lot_out']  	= trim($rs2->fields['9']);
		// $return[$i]['pr_name']  	= trim($rs2->fields['10']);
		// $return[$i]['fld_remark']  	= trim($rs2->fields['11']);
		//$return[$i]['pr_name']		= trim($rs2->fields['10']);
		//$return[$i]['lot_out']  	= ucwords(strtolower(trim($rs2->fields['9'])));
		//$return[$i]['pr_name']		= ucwords(strtolower(trim($rs2->fields['10'])));

		$rs2->MoveNext();
	}

  $x = array(
        "success"=>true,
        //"totalCount"=>$totalcount,
        "rows"=>$return);

    echo json_encode($x);

    $db_qrinvoice->Close();
?>