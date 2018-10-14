<?php
	date_default_timezone_set('Asia/jakarta');
    include '../../../adodb/con_smtpros.php';

    $page 		= @$_REQUEST["page"];
	$limit 		= @$_REQUEST["limit"];
	$start		= (($page*$limit)-$limit)+1;
	$boardid    = @$_REQUEST['boardid'];
    $smt_date2  = @$_REQUEST['smt_date'];
    $getdate    = '';
    $smt_date   = '';

    if ($smt_date2) {
        $getdate    = substr($_REQUEST['smt_date'],0,10);
        $smt_date   = date('Y-m-d', strtotime($getdate));
    }
    else {
        $smt_date   = '';
    }

    //$rs         = $db->Execute("exec traceability_smt_good_aoi_point '{$boardid}','{$smt_date}'");
    // $getimage        = $db->Execute("select cast((select image2d as '*' for xml path('')) as varchar(max)) as images from tblAOIResultPoint where barcode = '{$boardid}'");

    $sql        = "declare @totalcount as int; exec traceability_smt_good_aoi_point $start, $limit, '{$boardid}', '{$smt_date}', @totalcount=@totalcount out";
    $rs         = $db->Execute($sql);
    $totalcount = $rs->fields['13'];
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
        $return[$i]['rowid']          = trim($rs->fields['12']);
        
        $getimage = $db->Execute("select cast((select image2d as '*' for xml path('')) as varchar(max)) as images from tblAOIResultPoint where rowid = '{$rs->fields[12]}'");
        $return[$i]['image2d'] = $getimage->fields['0'];

        //$return[$i]['image2d']        = $getimage->fields[0];
        //$return[$i]['image2d']        = $rs->fields['12'];
       
        $rs->MoveNext();
    }
    $x = array(
        "success"=>true,
        "totalCount"=>$totalcount,
        "rows"=>$return);

    echo json_encode($x);

    //$getimage->Close();
    $db->Close();
?>
