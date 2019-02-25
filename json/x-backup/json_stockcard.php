<?php
	/*
	****	create by Mohamad Yunus
	****	on 15 Maret 2018
	****	remark: -
	*/
	include('../../ADODB/con_logistic.php');

	//	get paramater
	$stdate			= trim(@$_REQUEST["valstdate"]);
	$endate			= trim(@$_REQUEST["valendate"]);
	$status			= trim(@$_REQUEST["valstatus"]);
	$idstockcard	= trim(@$_REQUEST["validstockcard"]);
	$model			= trim(@$_REQUEST["valmodel"]);
	$line			= trim(@$_REQUEST["valline"]);
	$lotno			= trim(@$_REQUEST["vallotno"]);
    $page			= @$_REQUEST["page"];
	$limit			= @$_REQUEST["limit"];
	$start			= (($page*$limit)-$limit)+1;

	//	execute query
    $sql 		= "exec traceability_dispStockcard '{$stdate}', '{$endate}', '{$status}', '{$idstockcard}', '{$model}', '{$line}', '{$lotno}'";
    $rs 		= $db->Execute($sql);

	//	array data
	$return = array();

	for ($i = 0; !$rs->EOF; $i++) {
		$return[$i]['idstockcard'] 	= $rs->fields[0];
		$return[$i]['model'] 		= $rs->fields[1];
		$return[$i]['lotno'] 		= $rs->fields[2];
		$return[$i]['line']			= $rs->fields[3];
		$return[$i]['startsn'] 		= $rs->fields[4];
		$return[$i]['endsn'] 		= $rs->fields[5];
		$return[$i]['qty'] 			= $rs->fields[6];
		$return[$i]['remark'] 		= $rs->fields[7];
		$return[$i]['status'] 		= $rs->fields[8];
		$return[$i]['input_user'] 	= $rs->fields[9];
		$return[$i]['input_date'] 	= $rs->fields[10];
		$return[$i]['update_user'] 	= $rs->fields[11];
		$return[$i]['update_date'] 	= $rs->fields[12];
		$rs->MoveNext();
	}

	$o = array(
		"success"=>true,
		"rows"=>$return);

	echo json_encode($o);

	//	connection close
	$rs->Close();
	$db->Close();
?>
