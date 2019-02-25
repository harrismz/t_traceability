<?php
	/*
	****	modify by Mohamad Yunus
	****	on 30 Oct 2016
	****	revise: enddate tambah seminggu 
	*/


	date_default_timezone_set('Asia/jakarta');
    include '../../adodb/con_smtzdbs.php';
    
    //$page 		= @$_REQUEST["page"];
	//$limit 		= @$_REQUEST["limit"];
	//$start		= (($page*$limit)-$limit)+1;
    $model      = $_REQUEST['model'];
    $src_cat      = $_REQUEST['src_cat'];
    $getdate    = substr($_REQUEST['prod_date'],0,10);
    $proddate   = date('Y-m-d', strtotime($getdate));
	// $sdate 		= date('Y-m-d', strtotime($getdate."- 7 days"));
 //    $edate      = date('Y-m-d', strtotime($getdate."+ 7 days"));
   // echo "exec traceability_smtzdbs '$model', '$proddate','$src_cat'";
    $rs    		= $db->Execute("exec traceability_smtzdbs '$model', '$proddate','$src_cat'");
    $return = array();

    for($i=0;!$rs->EOF;$i++){
        $return[$i]['place']		= trim($rs->fields['0']);
        $return[$i]['mode']         = trim($rs->fields['1']);
        $return[$i]['operatorid']	= trim($rs->fields['2']);
        $return[$i]['feeder']		= trim($rs->fields['3']);
        $return[$i]['compid1']		= trim($rs->fields['4']);
        $return[$i]['compid2']      = trim($rs->fields['5']);
        $return[$i]['compid3']      = trim($rs->fields['6']);
        $return[$i]['compid4']      = trim($rs->fields['7']);
        $return[$i]['compid5']		= trim($rs->fields['8']);
        $return[$i]['model'] 		= trim($rs->fields['9']);
        $return[$i]['scandate']     = trim($rs->fields['10']);
        $return[$i]['ng'] 	        = trim($rs->fields['11']);
        $return[$i]['partno']		= trim($rs->fields['12']);
        $return[$i]['lot']          = trim($rs->fields['13']);
        $return[$i]['qty']			= trim($rs->fields['14']);
		
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