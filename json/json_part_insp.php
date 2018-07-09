<?php
	/*
	****	modify by Mohamad Yunus
	****	on 31 Oct 2016
	****	revise: enddate tambah seminggu

	****	modify by Harris Muhammad Zaki
	****	on 06 June 2018
	****	revise: change to storeprocedure for new traceability
	*/

	date_default_timezone_set('Asia/jakarta');
  include '../../adodb/con_wiqci.php';
  $model  = $_REQUEST['model'];
	$lot		= $_REQUEST['prod_no'];
  $getdate= substr($_REQUEST['prod_date'],0,10);
	$sdate 	= date('Y-m-d', strtotime($getdate."- 7 days"));
  $edate  = date('Y-m-d', strtotime($getdate."+ 15 days"));
	$rs    		= $conn->Execute("exec traceability_partinsp_dispsc '{$model}','{$lot}','{$sdate}','{$edate}'");
  $return 	= array();

  for($i=0;!$rs->EOF;$i++){
		$return[$i]['noid']						= trim($rs->fields['0']);
		$return[$i]['deliv_date']			= trim(date('Y-m-d', strtotime($rs->fields['1'])));
		$return[$i]['partno']					= trim($rs->fields['2']);
		$return[$i]['partname']				= trim($rs->fields['3']);
		$return[$i]['supplier']				= trim($rs->fields['4']);
		$return[$i]['suppcode']				= trim($rs->fields['5']);
		$return[$i]['inspect_level']	= trim($rs->fields['6']);
		$return[$i]['pic']						= trim($rs->fields['7']);
		$return[$i]['shift']					= trim($rs->fields['8']);
		$return[$i]['qty_sampling']		= (float)trim($rs->fields['9']);
		$return[$i]['qty_rejection']	= (float)trim($rs->fields['10']);
		$return[$i]['bc']							= trim($rs->fields['11']);
		$return[$i]['do']							= trim($rs->fields['12']);
		$return[$i]['po']							= trim($rs->fields['13']);
		$return[$i]['qty_delivery']		= (float)trim($rs->fields['14']);
		$return[$i]['lot_out']				= trim($rs->fields['15']);
		$return[$i]['pr_name']				= trim($rs->fields['16']);
		$return[$i]['time_finish']		= trim(date('H:i:s', strtotime($rs->fields['17'])));
		$return[$i]['fld_remark']			= trim($rs->fields['18']);
		$return[$i]['sflag']					= trim($rs->fields['19']);

    $rs->MoveNext();
  }

  $o = array(
    "success"=>true,
    "rows"=>$return
	);

  echo json_encode($o);

	$rs->Close();
  $conn->Close();
?>
