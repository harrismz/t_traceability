<?php
	date_default_timezone_set('Asia/jakarta');
    include '../../../adodb/con_mapros_MYSQL.php';

    //$page 		= @$_REQUEST["page"];
	//$limit 		= @$_REQUEST["limit"];
	//$start		= (($page*$limit)-$limit)+1;
	//  $getdate    = substr($_REQUEST['smt_date'],0,10);
    //  $smt_date   = date('Y-m-d', strtotime($getdate));

    $model      = @$_REQUEST['valmodel'];
    $serialnoid = substr(@$_REQUEST['valserialno'],-8);
    $dummySerial    = @$_REQUEST['dummySerial'];


	//echo "call traceability_mapros_master ('{$boardid}','{$cavity}')";
    $sql   = "call traceability_maprosMainSymptom ('{$model}','{$serialnoid}','{$dummySerial}')";
    $rs    = $db->Execute($sql);
    $return = array();
 
    for($i=0;!$rs->EOF;$i++){

        $return[$i]['master_id']	    = trim($rs->fields['0']);
        $return[$i]['serial_no']		= trim($rs->fields['1']);
        $return[$i]['judge']   		    = trim($rs->fields['2']);
        $return[$i]['symptom_id']     	= trim($rs->fields['3']);
        $return[$i]['category']         = trim($rs->fields['4']);
        $return[$i]['created_at']    	= trim($rs->fields['5']);
        $return[$i]['updated_at']       = trim($rs->fields['6']);
        $return[$i]['line_id']      	= trim($rs->fields['7']);
        $return[$i]['lineprocess_id']   = trim($rs->fields['8']);
        $return[$i]['lineprocess']    	= trim($rs->fields['9']);
        $return[$i]['line']             = trim($rs->fields['10']);
        $rs->MoveNext();
    }
    $x = array(
        "success"=>true,
        //"totalCount"=>$totalcount,
        "rows"=>$return);

    echo json_encode($x);
    $rs->Close();
    $db->Close();
?>
