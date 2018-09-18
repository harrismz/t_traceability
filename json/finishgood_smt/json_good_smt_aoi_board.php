<?php
	date_default_timezone_set('Asia/jakarta');
    include '../../../adodb/con_smtpros.php';

    //$page 		= @$_REQUEST["page"];
	//$limit 		= @$_REQUEST["limit"];
	//$start		= (($page*$limit)-$limit)+1;
	
    $boardid      = $_REQUEST['boardid'];
    $getdate    = substr($_REQUEST['smt_date'],0,10);
	$smt_date 	= date('Y-m-d', strtotime($getdate));

	//echo "exec traceability_aoi '{$model}','{$proddate}','fg'";
    $rs         = $db->Execute("exec traceability_smt_good_aoi_board '{$boardid}','{$smt_date}'");
    $return     = array();

    for($i=0;!$rs->EOF;$i++){
		$return[$i]['linkedserver']   = trim($rs->fields['0']);
        $return[$i]['pcbid']          = trim($rs->fields['1']);
        $return[$i]['pcbguid']        = trim($rs->fields['2']);
        $return[$i]['componentguid']  = trim($rs->fields['3']);
        $return[$i]['uname']          = trim($rs->fields['4']);
        $return[$i]['barcode']        = trim($rs->fields['5']);
        $return[$i]['stdate']         = trim($rs->fields['6']);
        $return[$i]['enddate']        = trim($rs->fields['7']);
        $return[$i]['partno']         = trim($rs->fields['8']);
        $return[$i]['partname']       = trim($rs->fields['9']);
        $return[$i]['aoijudgment']    = trim($rs->fields['10']);
        $return[$i]['userjudgment']   = trim($rs->fields['11']);
       
        $rs->MoveNext();
    }
    $x = array(
        "success"=>true,
        //"totalCount"=>$totalcount,
        "rows"=>$return);

    echo json_encode($x);

    $db->Close();
?>
