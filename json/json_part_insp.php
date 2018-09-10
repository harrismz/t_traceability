<?php

	date_default_timezone_set('Asia/jakarta');
  include '../../adodb/con_wiqci.php';
  $model  = $_REQUEST['model'];
	$lot		= $_REQUEST['prod_no'];
  $getdate= substr($_REQUEST['prod_date'],0,10);
	$sdate 	= date('Y-m-d', strtotime($getdate."- 7 days"));
  $edate  = date('Y-m-d', strtotime($getdate."+ 15 days"));

	$query = $conn->prepare("exec traceability_partinsp_dispsc '{$model}','{$lot}','{$sdate}','{$edate}'");
	$conn->SetFetchMode(ADODB_FETCH_ASSOC);
	$result = $conn->Execute($query);
	$return = array();

	for ($i=0; !$result->EOF;$i++){
		//	var_dump($result->fields); //check hasil query
		//	$return[] = $result->fields; // menampilkan semua hasil query

	 	$return[$i]['noid']          = trim($result->fields['noid']);
		$return[$i]['deliv_date']    = trim(date('Y-m-d', strtotime($result->fields['deliv_date'])));
		$return[$i]['partno']        = trim($result->fields['tbslppartno']);
		$return[$i]['partname']      = trim($result->fields['partname']);
		$return[$i]['supplier']      = trim($result->fields['supplier']);
		$return[$i]['suppcode']      = trim($result->fields['suppcode']);
		$return[$i]['inspect_level'] = trim($result->fields['inspect_level']);
		$return[$i]['pic']           = trim($result->fields['pic']);
		$return[$i]['shift']         = trim($result->fields['shift']);
		$return[$i]['qty_sampling']  = (float)trim($result->fields['qty_sampling']);
		$return[$i]['qty_rejection'] = (float)trim($result->fields['qty_rejection']);
		$return[$i]['bc']            = trim($result->fields['bc']);
		$return[$i]['do']            = trim($result->fields['do']);
		$return[$i]['po']            = trim($result->fields['po']);
		$return[$i]['qty_delivery']  = (float)trim($result->fields['qty_delivery']);
		$return[$i]['lot_out']       = trim($result->fields['lot_out']);
		$return[$i]['pr_name']       = trim($result->fields['pr_name']);
		$return[$i]['time_finish']   = trim(date('H:i:s', strtotime($result->fields['time_finish'])));
		$return[$i]['fld_remark']    = trim($result->fields['fld_remark']);
		$return[$i]['sflag']         = trim($result->fields['sflag']);

		$result->MoveNext();
	}

  $o = array(
    "success"=>true,
    "rows"=>$return
	);

  echo json_encode($o);

	$result->Close();
  $conn->Close();
?>
