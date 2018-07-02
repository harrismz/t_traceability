<?php
	/*
	****	create by Mohamad Yunus
	****	on 1 Nov 2016
	****	revise:  -
	*/

	
	//	get paramater
	$stdate		= trim(@$_REQUEST["valstyear"]);
	$endate		= trim(@$_REQUEST["valenyear"]);
	$symptom	= trim(@$_REQUEST["valsymptom"]);
	$cek		= trim(@$_REQUEST["valrbprod"]);
	
	//	execute query
	if($cek == 'ma'){
		include '../../adodb/con_fadaq.php';
		$sql = "select * from show_reject_sympthom('{$stdate}','{$endate}','{$symptom}') order by rejectdate desc";
		$rs = $db->Execute($sql);
	}
	else{
		include '../../adodb/con_mecha.php';
		$sql = "select * from show_reject_sympthom('{$stdate}','{$endate}','{$symptom}') order by rejectdate desc";
		$rs = $db->Execute($sql);
	}
		
    
	//	array data
	$return 	= array();
    for ($i=0; !$rs->EOF; $i++){
        $return[$i]['rejdate']    	= $rs->fields['0'];
        $return[$i]['line_name']    = $rs->fields['1'];
        $return[$i]['model_name']  	= $rs->fields['2'];
        $return[$i]['lot_size']    	= $rs->fields['3'];
        $return[$i]['start_serial']	= $rs->fields['4'];
        $return[$i]['defcause']    	= $rs->fields['5'];
        $return[$i]['plcdisp']    	= $rs->fields['6'];
        $return[$i]['totrej']    	= $rs->fields['7'];
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