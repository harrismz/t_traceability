<?php
	/*
	****	create by Mohamad Yunus
	****	on 13 Maret 2018
	****	remark: -
	*/  
	include('../../ADODB/con_logistic.php');
	
	//	get paramater
	$contno		= trim(@$_REQUEST["valcontno"]);
	$idnumber	= trim(@$_REQUEST["validnumber"]);
	$model		= trim(@$_REQUEST["valmodel"]);
	$serial		= trim(@$_REQUEST["valserial"]);
	$dest		= trim(@$_REQUEST["valdest"]);
    $page		= @$_REQUEST["page"];
	$limit		= @$_REQUEST["limit"];
	$start		= (($page*$limit)-$limit)+1;
	
	//	execute query
    $sql 		= "declare @totalcount as int; exec dispScanout $start, $limit, '{$contno}', '{$idnumber}', '{$model}', '{$serial}', '{$dest}', @totalcount=@totalcount out";
    $rs 		= $db->Execute($sql);
    $totalcount = $rs->fields[11];
	//	array data
	$return = array();
	
	for ($i = 0; !$rs->EOF; $i++) {
		$return[$i]['contno'] 		= $rs->fields[0];
		$return[$i]['vanningid'] 	= $rs->fields[1];
		$return[$i]['idnumber'] 	= $rs->fields[2];
		$return[$i]['model']		= $rs->fields[3];
		$return[$i]['serial'] 		= $rs->fields[4];
		$return[$i]['lotno']		= $rs->fields[5];
		$return[$i]['dest'] 		= $rs->fields[6];
		$return[$i]['input_user'] 	= $rs->fields[7];
		$return[$i]['input_date'] 	= $rs->fields[8];
		$return[$i]['update_user'] 	= $rs->fields[9];
		$return[$i]['update_date'] 	= $rs->fields[10];
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