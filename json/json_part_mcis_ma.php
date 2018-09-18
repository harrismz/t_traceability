<?php
	date_default_timezone_set('Asia/jakarta');
  	include '../../adodb/con_mc.php';
  	$model    = $_REQUEST['model'];
	$lot	  = $_REQUEST['prod_no'];
  	$getdate  = substr($_REQUEST['prod_date'],0,10);
	$proddate = date('Y-m-d', strtotime($getdate));

	$rs    	  = $db->Execute("exec traceability_partiss '{$model}','{$lot}','{$proddate}','ma'");
  	$return   = array();

  	for($i=0;!$rs->EOF;$i++){
	    $return[$i]['issdate']	  = trim(date('Y-m-d H:i:s', strtotime($rs->fields['0'])));
		$return[$i]['partno']	  = trim($rs->fields['1']);
		$return[$i]['partname']	  = trim($rs->fields['2']);
		$return[$i]['scanqty']	  = (float)trim($rs->fields['3']);
		$return[$i]['po']		  = trim($rs->fields['4']);
		$return[$i]['model_name'] = trim($rs->fields['5']);
		$return[$i]['lot']		  = trim($rs->fields['6']);
		$return[$i]['line']		  = trim($rs->fields['7']);
		$return[$i]['so']    	  = trim($rs->fields['8']);
	    $return[$i]['reqqty']	  = (float)trim($rs->fields['9']);
	    $rs->MoveNext();
  	}

  	$o = array(
	    "success"=>true,
	    "rows"=>$return
	);

  	echo json_encode($o);

	$rs->Close();
  	$db->Close();
?>
