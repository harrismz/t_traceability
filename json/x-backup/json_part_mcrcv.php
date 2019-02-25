<?php
date_default_timezone_set('Asia/jakarta');
    include '../../receiving/koneksi.php';
    
    //$page 		= @$_REQUEST["page"];
	//$limit 		= @$_REQUEST["limit"];
	//$start		= (($page*$limit)-$limit)+1;
    $model      = $_REQUEST['model'];
	$lot}		= $_REQUEST['lot'];
    $getdate    = substr($_REQUEST['prod_date'],0,10);
	$sdate 		= date('Y-m-d', strtotime($getdate."- 7 days"));
    $edate      = substr($_REQUEST['prod_date'],0,10);
	
	$rs    = $db->Execute("SELECT * FROM PARTISS WHERE MODEL = '{$model}' AND LOT = '{$lot}' AND ISSDATE <= '{$sdate}' AND ISSDATE >= '{$edate}'");
    $return = array();

    for($i=0;!$rs->EOF;$i++){
        $return[$i]['so']    		= trim($rs->fields['0']);
        $return[$i]['partno']		= trim($rs->fields['0']);
        $return[$i]['partname']		= trim($rs->fields['0']);
        $return[$i]['po']			= trim($rs->fields['0']);
        $return[$i]['reqqty']		= trim($rs->fields['0']);
        $return[$i]['scanqty']		= trim($rs->fields['0']);
        $return[$i]['lot']			= trim($rs->fields['0']);
        $return[$i]['line']			= trim($rs->fields['0']);
        $return[$i]['model']		= trim($rs->fields['0']);
        $return[$i]['issdate']		= trim($rs->fields['0']);
		
        if($rs->fields['7'] == 1){$return[$i]['confirm'] = "Confirmed";} else {$return[$i]['confirm'] = "Not Confirmed";}
		
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