<?php
	/*
	****	modify by Mohamad Yunus
	****	on 31 Oct 2016
	****	revise: enddate tambah seminggu 
	*/


	
    date_default_timezone_set('Asia/jakarta');
    include '../../adodb/con_ocs_im.php';
    
    //$page 		= @$_REQUEST["page"];
	//$limit 		= @$_REQUEST["limit"];
	//$start		= (($page*$limit)-$limit)+1;
	$src_cat	= $_REQUEST['src_cat'];
	if($src_cat == "sp"){
		$model      = $_REQUEST['model'];
		$serial		= 0;
		$getdate    = substr($_REQUEST['prod_date'],0,10);
		$sdate 		= date('Y-m-d', strtotime($getdate."- 7 days"));
		$edate      = date('Y-m-d', strtotime($getdate."+ 7 days"));
	} else {
		$model      = $_REQUEST['model'];
		$serial		= $_REQUEST['st_serial'];
		$getdate    = substr($_REQUEST['prod_date'],0,10);
		$sdate 		= date('Y-m-d', strtotime($getdate."- 7 days"));
		$edate      = date('Y-m-d', strtotime($getdate."+ 7 days"));
	}

    $rs    = $db->Execute("select * from show_downtime('{$model}', '{$serial}', '{$sdate}', '{$edate}', '{$src_cat}')");
    $return = array();

    for($i=0;!$rs->EOF;$i++){
        $return[$i]['id']    		= trim($rs->fields['0']);
        $return[$i]['line_name']   	= trim($rs->fields['1']);
        $return[$i]['date_id']      = date('Y-m-d H:i:s',strtotime($rs->fields['2']));
        $return[$i]['e_date_id']    = date('Y-m-d H:i:s',strtotime($rs->fields['3']));
        $return[$i]['duration'] 	= trim($rs->fields['4']);
        $return[$i]['downtime'] 	= trim($rs->fields['5']);
        $return[$i]['shift']		= trim($rs->fields['6']);
        $return[$i]['confirm']		= trim($rs->fields['7']);
        $return[$i]['err_code']		= trim($rs->fields['8']);
        $return[$i]['bn']    		= trim($rs->fields['9']);
        $return[$i]['model_name']	= trim($rs->fields['10']);
        $return[$i]['pwb_name']		= trim($rs->fields['11']);
        $return[$i]['process']		= trim($rs->fields['12']);
        $return[$i]['start_serial']	= trim($rs->fields['13']);
        $return[$i]['reason']		= trim($rs->fields['15']);
        $return[$i]['cause1']		= trim($rs->fields['16']);
        $return[$i]['cause2']		= trim($rs->fields['17']);
        $return[$i]['cause3']		= trim($rs->fields['18']);
        $return[$i]['cause4']		= trim($rs->fields['19']);
		
        if($rs->fields['7'] == 1){$return[$i]['confirm'] = "Confirmed";} else {$return[$i]['confirm'] = "Not Confirmed";}
		
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