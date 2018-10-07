<?php
	//	get paramater
	
	date_default_timezone_set('Asia/jakarta');
	$years		= date(Y);
	$stdate		= isset($_REQUEST["valstyear"]) ? $_REQUEST["valstyear"] : $years;
	$endate		= isset($_REQUEST["valenyear"]) ? $_REQUEST["valenyear"] : $years;
	$symptom	= trim(@$_REQUEST["valsymptom"]);
	$cek		= trim(@$_REQUEST["dept"]);
	
	//	execute query
	if($cek == 'ma'){
		include '../../../adodb/con_fadaq.php';
		echo "select * from show_reject_sympthom('{$stdate}','{$endate}','{$symptom}') order by rejectdate desc";
		$sql = "select * from show_reject_sympthom('{$stdate}','{$endate}','{$symptom}') order by rejectdate desc";
		$rs = $db->Execute($sql);
	}
	else{
		include '../../../adodb/con_mecha.php';
		echo "select * from show_reject_sympthom('{$stdate}','{$endate}','{$symptom}') order by rejectdate desc";
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