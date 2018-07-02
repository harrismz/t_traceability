<?php
	/*
	****	create by Mohamad Yunus
	****	on 29 Oct 2016
	****	revise:  -
	*/

	
	//	get paramater
	$modelno	= trim(@$_REQUEST["valmodelno"]);
	$lotno		= trim(@$_REQUEST["vallotno"]);	
	$cek		= trim(@$_REQUEST["valrbprod"]);
	
	//	execute query
	if($cek == 'ma'){
		include '../../adodb/con_ocs.php';
		$sql = "select * from show_schedule_ma('{$modelno}', '{$lotno}')";
		$rs = $db->Execute($sql);
	}
	else{
		include '../../adodb/con_ocs_mecha.php';
		$sql = "select * from show_schedule_mecha('{$modelno}', '{$lotno}')";
		$rs = $db->Execute($sql);
	}
		
    
	//	array data
	$return 	= array();
    for ($i=0; !$rs->EOF; $i++){
        $return[$i]['prod_date']    = $rs->fields['0'];
        $return[$i]['line_name']    = $rs->fields['1'];
        $return[$i]['model_name']   = $rs->fields['2'];
        $return[$i]['prod_no']     	= $rs->fields['3'];
        $return[$i]['lot_size'] 	= $rs->fields['4'];
        $return[$i]['start_serial'] = $rs->fields['5'];
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