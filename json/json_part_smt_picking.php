<?php
	/*
	****	modify by Harris
	****	on 27 May 2018
	****	revise: get prepare part from SMT Picking navigation
	
	****	modify by Mohamad Yunus
	****	on 30 Oct 2016
	****	revise: enddate tambah seminggu
	*/


	date_default_timezone_set('Asia/jakarta');
    include '../../adodb/con_part_im.php';

    //$page 		= @$_REQUEST["page"];
	//$limit 		= @$_REQUEST["limit"];
	//$start		= (($page*$limit)-$limit)+1;
	$src_cat	= $_REQUEST['src_cat'];
	if($src_cat == 'sp'){
		$model      = $_REQUEST['model'];
		$serial		= 0;
		$getdate    = substr($_REQUEST['prod_date'],0,10);
		$proddate 		= date('Y-m-d', strtotime($getdate));
		//$sdate 		= date('Y-m-d', strtotime($getdate."- 7 days"));
		//$edate      = date('Y-m-d', strtotime($getdate."+7 days"));
	} else {
		$model      = $_REQUEST['model'];
		$serial		= $_REQUEST['st_serial'];
		$getdate    = substr($_REQUEST['prod_date'],0,10);
		$proddate 		= date('Y-m-d', strtotime($getdate));
		//$sdate 		= date('Y-m-d', strtotime($getdate."- 7 days"));
		//$edate      = date('Y-m-d', strtotime($getdate."+7 days"));
	}
	echo "select * from show_part('{$model}', '{$serial}', '{$proddate}', '{$src_cat}')";
    $rs    = $db->Execute("select * from show_part('{$model}', '{$serial}', '{$proddate}', '{$src_cat}')");
    $return = array();

    for($i=0;!$rs->EOF;$i++){
        $return[$i]['jobdate']		= trim($rs->fields['0']);
        $return[$i]['jobtime']		= trim(date('H:i:s', strtotime($rs->fields['1'])));
        $return[$i]['line']			= trim($rs->fields['2']);
        $return[$i]['model_name']	= trim($rs->fields['3']);
        $return[$i]['pwb_name'] 	= trim($rs->fields['4']);
        $return[$i]['start_serial']	= trim($rs->fields['5']);
        $return[$i]['lot']			= trim($rs->fields['6']);
        $return[$i]['zfeeder']		= trim($rs->fields['7']);
        $return[$i]['part_no']		= trim($rs->fields['8']);
        $return[$i]['demand']		= trim($rs->fields['9']);

        $rs->MoveNext();
    }
    $x = array(
        "success"=>true,
        //"totalCount"=>$totalcount,
        "rows"=>$return);

    echo json_encode($x);

    $db->Close();
?>
