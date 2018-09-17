<?php
    date_default_timezone_set('Asia/jakarta');
    include '../../adodb/con_iqcquality.php';
    
    $src_cat   = isset($_REQUEST['src_cat']) ? $_REQUEST['src_cat'] : '';
	$model     = isset($_REQUEST['model']) ? $_REQUEST['model'] : '';
	$symptom   = isset($_REQUEST['symptom']) ? $_REQUEST['symptom'] : '';
	$getprodate= isset($_REQUEST['prod_date']) ? $_REQUEST['prod_date'] : '';
	$getdate   = substr($getprodate,0,10);
	echo "exec TRACE_searchMechanical '$model', '$symptom', '$getdate', '$src_cat'";
    $rs    = $db->Execute("exec TRACE_searchMechanical '$model', '$symptom', '$getdate', '$src_cat'");
    $return = array();

    for($i=0;!$rs->EOF;$i++){
        $return[$i]['symptom'] 		= $rs->fields['0'];
		$return[$i]['probcause'] 	= $rs->fields['1'];
		$return[$i]['model'] 		= $rs->fields['2'];
		$return[$i]['line'] 		= $rs->fields['3'];
		$return[$i]['shift'] 		= $rs->fields['4'];
		$return[$i]['part_no'] 		= $rs->fields['5'];
		$return[$i]['part_name'] 	= $rs->fields['6'];
		$return[$i]['supplier'] 	= $rs->fields['7'];
		$return[$i]['rejectqty'] 	= $rs->fields['8'];
		$return[$i]['filepicture'] 	= $rs->fields['9'];
		$return[$i]['corrmethod'] 	= $rs->fields['10'];
		$return[$i]['mp'] 			= $rs->fields['11'];
		$return[$i]['duration'] 	= floatval($rs->fields['12']);
		$return[$i]['total'] 		= ($rs->fields['11']*$rs->fields['12']);
		$return[$i]['actionsupp'] 	= $rs->fields['13'];
		$return[$i]['status'] 		= $rs->fields['14'];
		$return[$i]['remark'] 		= $rs->fields['15'];
		$return[$i]['action_user'] 	= $rs->fields['16'];
		$return[$i]['input_date'] 	= $rs->fields['17'];
		$return[$i]['vw_inputdate'] = $rs->fields['18'];
		$return[$i]['id'] 			= $rs->fields['19'];
		
        $rs->MoveNext();
    }
    $x = array(
        "success"=>true,
        //"totalCount"=>$totalcount,
        "rows"=>$return);

    echo json_encode($x);

    //	connection close
	$rs->Close();
	$db->Close();
?>