<?php

	date_default_timezone_set('Asia/jakarta');
  include '../../adodb/con_wiqci.php';

  	$page 		= @$_REQUEST["page"];
	$limit 		= @$_REQUEST["limit"];
	$start		= (($page*$limit)-$limit)+1;
	$model 		= $_REQUEST['model'];
	$lot		= $_REQUEST['prod_no'];
	$getdate	= substr($_REQUEST['prod_date'],0,10);
	$proddate 	= date('Y-m-d', strtotime($getdate));
	// $sdate = date('Y-m-d', strtotime($getdate."- 7 days"));
	// $edate = date('Y-m-d', strtotime($getdate."+ 15 days"));
	$query = $conn->prepare("declare @totalcount as int 
								exec traceability_partinsp_dispsc_2 $start, $limit, '{$model}','{$lot}','{$proddate}', @totalcount=@totalcount out");

	// echo "declare @totalcount as int 
	// 							exec traceability_partinsp_dispsc $start, $limit, '{$model}','{$lot}','{$proddate}', @totalcount=@totalcount out";
								
	// $conn->SetFetchMode(ADODB_FETCH_ASSOC);
	// $result = $conn->Execute($query);
	// $return = array();

	$result = $conn->Execute($query);
	$totalcount 	= $result->fields['12'];
	$return = array();

	for ($i=0; !$result->EOF;$i++){
		//	var_dump($result->fields); //check hasil query
		//	$return[] = $result->fields; // menampilkan semua hasil query

		$return[$i]['deliv_date']    = trim(date('Y-m-d', strtotime($result->fields['0'])));
		$return[$i]['partno']        = trim($result->fields['1']);
		$return[$i]['supplier']      = trim($result->fields['2']);
		$return[$i]['pic']           = trim($result->fields['3']);
		$return[$i]['qty_sampling']  = (float)trim($result->fields['4']);
		$return[$i]['qty_rejection'] = (float)trim($result->fields['5']);
		$return[$i]['po']            = trim($result->fields['6']);
		$return[$i]['qty_delivery']  = (float)trim($result->fields['7']);
		$return[$i]['lot_out']       = trim($result->fields['8']);
		$return[$i]['time_finish']   = trim(date('H:i:s', strtotime($result->fields['9'])));
		$return[$i]['fld_remark']    = trim($result->fields['10']);
		$return[$i]['date_input']    = trim($result->fields['11']);

		$result->MoveNext();
	}

  $o = array(
    "success"=>true,
    "totalCount"=>$totalcount,
    "rows"=>$return);

  echo json_encode($o);

	$result->Close();
  $conn->Close();
?>
