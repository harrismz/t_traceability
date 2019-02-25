<?php
	include('../../../ADODB/con_logistic.php');
	
	//	get paramater
	$model		= trim(@$_REQUEST["valmodel"]);
	$serialnoid = substr(@$_REQUEST['valserialno'],-8);
	$status		= trim(@$_REQUEST["valstatus"]);
    $page		= @$_REQUEST["page"];
	$limit		= @$_REQUEST["limit"];
	$start		= (($page*$limit)-$limit)+1;
	
	//	execute query
    $sql 		= "declare @totalcount as int; exec traceability_scanin $start, $limit, '{$model}', '{$serialnoid}', '{$status}', @totalcount=@totalcount out";
    $rs 		= $db->Execute($sql);
    $totalcount = $rs->fields[9];
	//	array data
	$return = array();
	
	for ($i = 0; !$rs->EOF; $i++) {
		$return[$i]['idnumber'] 	= $rs->fields[0];
		$return[$i]['model']		= $rs->fields[1];
		$return[$i]['serial'] 		= $rs->fields[2];
		$return[$i]['lotno']		= $rs->fields[3];
		$return[$i]['status'] 		= $rs->fields[4];
		$return[$i]['input_user'] 	= $rs->fields[5];
		$return[$i]['input_date'] 	= $rs->fields[6];
		$return[$i]['update_user'] 	= $rs->fields[7];
		$return[$i]['update_date'] 	= $rs->fields[8];
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