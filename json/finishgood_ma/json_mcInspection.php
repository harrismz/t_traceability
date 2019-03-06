<?php
	include '../../../adodb/con_wiqci.php';
	
	$page    = @$_REQUEST["page"];
    $limit   = @$_REQUEST["limit"];
    $start   = (($page*$limit)-$limit)+1;
	$model   = $_REQUEST['valmodel'];
	$lot	 = $_REQUEST['vallotno'];
	$getdate2= @$_REQUEST['valProdDate'];
	$proddate= '';
   
    if ($getdate2) {
        $getdate1	= substr($getdate2,0,10);
        $proddate 	= date('Y-m-d', strtotime($getdate1));
    }
    else {
        $proddate   = '';
    }
	//$sdate   = date('Y-m-d', strtotime($getdate."- 7 days"));
	//$edate   = date('Y-m-d', strtotime($getdate."+ 10 days"));
	//$edate   = date('Y-m-d', strtotime($getdate));
	
	$sql	 	= "declare @totalcount as int; exec traceability_partinsp_dispsc_4 $start, $limit, '{$model}','{$lot}','{$proddate}', @totalcount=@totalcount out";
	$rs2 	 	= $conn->Execute($sql);
	$totalcount = $rs2->fields['12'];
	$return  	= array();

	//echo "exec traceability_receivepart '{$model}','{$lot}','{$sdate}','{$edate}'";

	for ($i = 0; !$rs2->EOF; $i++) {
		$return[$i]['deliv_date'] 	= trim($rs2->fields['0']);
		$return[$i]['partno_slip'] 	= trim($rs2->fields['1']);
		$return[$i]['supplier'] 	= trim($rs2->fields['2']);
		$return[$i]['pic'] 			= trim($rs2->fields['3']);
		$return[$i]['qty_sampling'] = trim($rs2->fields['4']);
		$return[$i]['qty_rejection']= trim($rs2->fields['5']);
		$return[$i]['po_slip'] 		= trim($rs2->fields['6']);
		$return[$i]['qty_delivery'] = trim($rs2->fields['7']);
		$return[$i]['lot_out'] 		= trim($rs2->fields['8']);
		$return[$i]['time_finish'] 	= trim($rs2->fields['9']);
		$return[$i]['fld_remark'] 	= trim($rs2->fields['10']);
		$return[$i]['date_input'] 	= trim($rs2->fields['11']);

		$rs2->MoveNext();
	}

  $x = array(
        "success"=>true,
        "totalCount"=>$totalcount,
        "rows"=>$return);

    echo json_encode($x);

    $db_qrinvoice->Close();
?>