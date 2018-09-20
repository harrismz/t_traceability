<?php
	date_default_timezone_set('Asia/jakarta');
    include '../../../adodb/con_mounter.php';

    //$page 		= @$_REQUEST["page"];
	//$limit 		= @$_REQUEST["limit"];
	//$start		= (($page*$limit)-$limit)+1;
	
    $model      = $_REQUEST['model'];
    $process    = $_REQUEST['process'];
	$pwbno      = $_REQUEST['pwbno'];
	
    //$getdate    = substr($_REQUEST['smt_date'],0,10);
	//$proddate 	= date('Y-m-d', strtotime($getdate));

	//echo "exec [traceability_good_smt_mounter] '{$model}','{$process}','{$pwbno}'";
    $rs    = $db->Execute("exec [traceability_good_smt_mounter] '{$model}','{$process}','{$pwbno}'");
    $return = array();
    
    for($i=0;!$rs->EOF;$i++){
        $return[$i]['mjsid']        = trim($rs->fields['0']);
        $return[$i]['puside']       = trim($rs->fields['1']);
        $return[$i]['partloc']      = trim($rs->fields['2']);
        $return[$i]['jobno']        = trim($rs->fields['3']);
        $return[$i]['model']        = trim($rs->fields['4']);
        $return[$i]['board']        = trim($rs->fields['5']);
        $return[$i]['pwbno']        = trim($rs->fields['6']);
        $return[$i]['process']      = trim($rs->fields['7']);
        $return[$i]['mode']         = trim($rs->fields['8']);
        $return[$i]['partno']       = trim($rs->fields['9']);
        $return[$i]['feeder']       = trim($rs->fields['10']);
        $return[$i]['feederserial'] = trim($rs->fields['11']);
        $return[$i]['feederno']     = trim($rs->fields['12']);
        $return[$i]['compid1']      = trim($rs->fields['13']);
        $return[$i]['compid2']      = trim($rs->fields['14']);
        $return[$i]['compid3']      = trim($rs->fields['15']);
        $return[$i]['compid4']      = trim($rs->fields['16']);
        $return[$i]['compid5']      = trim($rs->fields['17']);
        $return[$i]['scandate']     = trim($rs->fields['18']);
       
        $rs->MoveNext();
    }
    $x = array(
        "success"=>true,
        //"totalCount"=>$totalcount,
        "rows"=>$return);

    echo json_encode($x);

    $db->Close();
?>
