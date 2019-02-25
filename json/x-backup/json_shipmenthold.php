<?php
	/*
	****	create by Mohamad Yunus
	****	on 11 September 2017
	****	remark: -
	*/  
	include('../../ADODB/con_logistic.php');
	
	//	get paramater
	$stdate			= trim(@$_REQUEST["valstdate"]);
	$endate			= trim(@$_REQUEST["valendate"]);
	$status			= trim(@$_REQUEST["valstatus"]);
	$idshipmenthold	= trim(@$_REQUEST["validshipmenthold"]);
	$model			= trim(@$_REQUEST["valmodel"]);
	$problem		= trim(@$_REQUEST["valproblem"]);
    $page			= @$_REQUEST["page"];
	$limit			= @$_REQUEST["limit"];
	$start			= (($page*$limit)-$limit)+1;
	
	//	execute query
    $sql 		= "declare @totalcount as int; exec dispShipmenthold $start, $limit, '{$stdate}', '{$endate}', '{$status}', '{$idshipmenthold}', '{$model}', '{$problem}', @totalcount=@totalcount out";
    $rs 		= $db->Execute($sql);
    $totalcount = $rs->fields[16];
	
	//	array data
	$return = array();
	
	for ($i = 0; !$rs->EOF; $i++) {
		$return[$i]['idshipmenthold'] 	= $rs->fields[0];
		$return[$i]['model'] 			= $rs->fields[1];
		$return[$i]['lotno'] 			= $rs->fields[2];
		$return[$i]['problem']			= $rs->fields[3];
		$return[$i]['status'] 			= $rs->fields[4];
		$return[$i]['startsn'] 			= $rs->fields[5];
		$return[$i]['endsn'] 			= $rs->fields[6];
		$return[$i]['remark'] 			= $rs->fields[7];
		$return[$i]['qtyrequest'] 		= $rs->fields[8];
		$return[$i]['qtywh'] 			= $rs->fields[9];
		$return[$i]['qtyshipout'] 		= $rs->fields[10];
		$return[$i]['qtyhold'] 			= $rs->fields[11];
		$return[$i]['input_user'] 		= $rs->fields[12];
		$return[$i]['input_date'] 		= $rs->fields[13];
		$return[$i]['update_user'] 		= $rs->fields[14];
		$return[$i]['update_date'] 		= $rs->fields[15];
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