<?php
	include('../../../ADODB/con_logistic.php');
	
	//	get paramater
	$model		= trim(@$_REQUEST["valmodel"]);
	$serialnoid = substr(@$_REQUEST['valserialno'],-8);
	$page		= @$_REQUEST["page"];
	$limit		= @$_REQUEST["limit"];
	$start		= (($page*$limit)-$limit)+1;
	
	//	execute query
    $sql 		= "declare @totalcount as int; exec traceability_scanout $start, $limit, '{$model}', '{$serialnoid}', @totalcount=@totalcount out";
    $rs 		= $db->Execute($sql);
    $totalcount = $rs->fields[12];
	//	array data
	$return = array();
	
	for ($i = 0; !$rs->EOF; $i++) {
		$return[$i]['contno'] 		= $rs->fields[0];
		$return[$i]['vanningid'] 	= $rs->fields[1];
		$return[$i]['vanningdate'] 	= $rs->fields[2];
		$return[$i]['dest']		 	= $rs->fields[3];
		$return[$i]['shipout']	 	= $rs->fields[4];
		$return[$i]['idnumber'] 	= $rs->fields[5];
		$return[$i]['model']		= $rs->fields[6];
		$return[$i]['serial'] 		= $rs->fields[7];
		$return[$i]['input_user'] 	= $rs->fields[8];
		$return[$i]['input_date'] 	= $rs->fields[9];
		$return[$i]['update_user'] 	= $rs->fields[10];
		$return[$i]['update_date'] 	= $rs->fields[11];
		$rs->MoveNext();
	}
	
	$o = array(
		"success"=>true,
		"totalcount"=>$totalcount,
		"rows"=>$return);
		
	echo json_encode($o);
	
	//	connection close
	$rs->Close();
	$db->Close();
?>