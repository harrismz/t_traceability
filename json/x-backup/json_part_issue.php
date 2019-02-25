<?php
	date_default_timezone_set('Asia/jakarta');
    include '../../adodb/con_mc.php';
    
    $page 		= @$_REQUEST["page"];
	$limit 		= @$_REQUEST["limit"];
	$start		= (($page*$limit)-$limit)+1;
    $partno     = $_REQUEST['partno'];
	$pono		= $_REQUEST['pono'];
	$sdate 		= $_REQUEST['startdt'];
    $edate      = $_REQUEST['enddt'];
	
	//echo "SELECT * FROM PARTISS WHERE MODEL = '{$model}' AND LOT = '{$lot}' AND ISSDATE <= '{$sdate}' AND ISSDATE >= '{$edate}'";
	$rs    		= $db->Execute("declare @totalcount as int
								exec show_partiss_1 $start, $limit, '{$partno}', '{$pono}', '{$sdate}', '{$edate}', @totalcount=@totalcount out");
	$totalcount	= $rs->fields['10'];
    $return 	= array();

    for($i=0;!$rs->EOF;$i++){
        $return[$i]['so']    		= trim($rs->fields['0']);
        $return[$i]['partno']		= trim($rs->fields['1']);
        $return[$i]['partname']		= trim($rs->fields['2']);
        $return[$i]['po']			= trim($rs->fields['3']);
        $return[$i]['reqqty']		= (float)trim($rs->fields['4']);
        $return[$i]['scanqty']		= (float)trim($rs->fields['5']);
        $return[$i]['lot']			= trim($rs->fields['6']);
        $return[$i]['line']			= trim($rs->fields['7']);
        $return[$i]['model_name']	= trim($rs->fields['8']);
        $return[$i]['issdate']		= $rs->fields['9'];
		
        $rs->MoveNext();
    }
    $x = array(
        "success"=>true,
        "totalCount"=>$totalcount,
        "rows"=>$return);

    echo json_encode($x);
    $rs->Close();
    $db->Close();
?>