<?php
	date_default_timezone_set('Asia/Jakarta');
    //error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);
    include '../../adodb/con_lost_time.php';
    
    //$page 		= @$_REQUEST["page"];
	$limit 		= @$_REQUEST["limit"]*@$_REQUEST["page"];
	$start		= @$_REQUEST["limit"]*@$_REQUEST["page"]-9;
	//$limit 		= 10;
	//$start		= 11;
	
    $model      = $_REQUEST['model'];
    $line     	= trim($_REQUEST['line']);
	$prod_date	= $_REQUEST['prod_date'];
	$fdate = date('Y-m-01', strtotime($prod_date));
	$edate = date('Y-m-t', strtotime($prod_date));

    $rs    			= $db->Execute("select * from show_losttime('{$model}', '{$line}', '{$fdate}', '{$edate}')");
	$totalcount 	= $rs->fields['10'];
    $return 	= array();

    for($i=0;!$rs->EOF;$i++){
        $return[$i]['date_id']   	= $rs->fields['0'];
        $return[$i]['line_name']   	= $rs->fields['1'];
        $return[$i]['model_name']   = $rs->fields['2'];
        $return[$i]['lost_detail']  = trim($rs->fields['3']);
        $return[$i]['responsible']	= $rs->fields['4'];
        $return[$i]['prod_no']  	= trim($rs->fields['5']);
        $return[$i]['time_start']	= trim($rs->fields['6']);
        $return[$i]['time_end']   	= trim($rs->fields['7']);
        $return[$i]['shift']		= $rs->fields['8'];
        $return[$i]['dept']			= trim($rs->fields['9']);
        
        $rs->MoveNext();
    }
    $x = array(
        "success"=>true,
        "totalCount"=>$totalcount,
        "rows"=>$return);

    echo json_encode($x);

    $db->Close();
?>