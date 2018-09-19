<?php
	date_default_timezone_set('Asia/jakarta');
    include '../../../adodb/con_mapros_SQL.php';

    //$page 		= @$_REQUEST["page"];
	//$limit 		= @$_REQUEST["limit"];
	//$start		= (($page*$limit)-$limit)+1;
	
	$getdate            = substr($_REQUEST['measurement_date'],0,10);
	$measurement_date 	= date('Y-m-d', strtotime($getdate));

	//echo "EXEC [traceability_ma_thermohumidity] '{$measurement_date}'";
    $rs    = $db->Execute("EXEC [traceability_ma_thermohumidity] '{$measurement_date}'");
    $return = array();

    for($i=0;!$rs->EOF;$i++){
        $return[$i]['unid']         = trim($rs->fields['0']);
        $return[$i]['id']           = trim($rs->fields['1']);
        $return[$i]['model']        = trim($rs->fields['2']);
        $return[$i]['serial']       = trim($rs->fields['3']);
        $return[$i]['datetimein']   = trim($rs->fields['4']);
        $return[$i]['alm']          = trim($rs->fields['5']);
        $return[$i]['t_ch1']        = round(trim($rs->fields['6']),2);
        $return[$i]['h_ch2']        = round(trim($rs->fields['7']),2);
        $return[$i]['alm1']         = trim($rs->fields['8']);
        $return[$i]['alm2']         = trim($rs->fields['9']);
       
        $rs->MoveNext();
    }
    $x = array(
        "success"=>true,
        //"totalCount"=>$totalcount,
        "rows"=>$return);

    echo json_encode($x);

    $db->Close();
?>
