<?php
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
	} else {
		$model      = $_REQUEST['model'];
		$serial		= $_REQUEST['st_serial'];
		$getdate    = substr($_REQUEST['prod_date'],0,10);
		$proddate 		= date('Y-m-d', strtotime($getdate));
	}
	//echo "select * from show_part_install('{$model}', '{$serial}', '{$proddate}', '{$src_cat}')";
    $rs    = $db->Execute("select * from show_part_install('{$model}', '{$serial}', '{$proddate}', '{$src_cat}')");
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
        $return[$i]['install']	    = trim($rs->fields['10']);
        $return[$i]['install_nik']	= trim($rs->fields['11']);
        $return[$i]['install_time']	= trim($rs->fields['12']);
       
        $rs->MoveNext();
    }
    $x = array(
        "success"=>true,
        //"totalCount"=>$totalcount,
        "rows"=>$return);

    echo json_encode($x);

    $db->Close();
?>
