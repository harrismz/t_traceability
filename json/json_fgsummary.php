<?php
	date_default_timezone_set('Asia/jakarta');
    include '../connection.php';
    
    $model      = $_REQUEST['model'];
	
	//echo "SELECT * FROM PARTISS WHERE MODEL = '{$model}' AND LOT = '{$lot}' AND ISSDATE <= '{$sdate}' AND ISSDATE >= '{$edate}'";
	
	$rs    		= $db->Execute("select * from vstockallnew where modelid = '{$model}'");
    $return 	= array();

    for($i=0;!$rs->EOF;$i++){
        $return[$i]['model_name']	= trim($rs->fields['0']);
        $return[$i]['allstock']		= trim($rs->fields['1']);
        $return[$i]['tmpstock']		= $rs->fields['2'];
        $return[$i]['tmpstock_sc']	= $rs->fields['3'];
        $return[$i]['readystock']	= $rs->fields['4'];
        $return[$i]['holdstock']	= $rs->fields['5'];
		
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