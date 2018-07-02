<?php
	/*
	****	modify by Mohamad Yunus
	****	on 30 Oct 2016
	****	revise: enddate tambah seminggu 
	*/


	date_default_timezone_set('Asia/jakarta');
    include '../../adodb/con_imzdbs.php';
    
    //$page 		= @$_REQUEST["page"];
	//$limit 		= @$_REQUEST["limit"];
	//$start		= (($page*$limit)-$limit)+1;
    $model      = $_REQUEST['model'];
    $getdate    = substr($_REQUEST['prod_date'],0,10);
	$sdate 		= date('Y-m-d', strtotime($getdate."- 7 days"));
    $edate      = date('Y-m-d', strtotime($getdate."+ 7 days"));

    $rs    		= $db->Execute("select * from trxdatanew where model like '%{$model}%'
								and CONVERT(VARCHAR(10), SCANDATE, 120) >= '{$sdate}' 
								and CONVERT(VARCHAR(10), SCANDATE, 120) <= '{$edate}' 
								order by scandate asc");
    $return = array();

    for($i=0;!$rs->EOF;$i++){
        $return[$i]['place']		= trim($rs->fields['0']);
        $return[$i]['mode']			= trim($rs->fields['1']);
        $return[$i]['feeder']		= trim($rs->fields['3']);
        $return[$i]['compid1']		= trim($rs->fields['4']);
        $return[$i]['compid2']		= trim($rs->fields['5']);
        $return[$i]['model'] 		= trim($rs->fields['9']);
        $return[$i]['scandate'] 	= trim($rs->fields['10']);
        $return[$i]['partno']		= trim($rs->fields['12']);
        $return[$i]['lot']			= trim($rs->fields['13']);
		
        $rs->MoveNext();
    }
    $x = array(
        "success"=>true,
        //"totalCount"=>$totalcount,
        "rows"=>$return);

    echo json_encode($x);

    $db->Close();
?>