<?php
	include '../../../adodb/con_qrinvoice.php';
	
	$page    = @$_REQUEST["page"];
    $limit   = @$_REQUEST["limit"];
    $start   = (($page*$limit)-$limit)+1;
	$model   = $_REQUEST['model'];
	$lot	 = $_REQUEST['prod_no'];
	$getdate2= @$_REQUEST['prod_date'];
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
	
	$sql	 	= "declare @totalcount as int; exec traceability_receivepart $start, $limit, '{$model}','{$lot}','{$proddate}', @totalcount=@totalcount out";
	$rs2 	 	= $db_qrinvoice->Execute($sql);
	$totalcount = $rs2->fields['9'];
	$return  	= array();

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

		$rs2->MoveNext();
	}

  $x = array(
        "success"=>true,
        "totalCount"=>$totalcount,
        "rows"=>$return);

    echo json_encode($x);

    $db_qrinvoice->Close();
?>