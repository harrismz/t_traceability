<?php
	date_default_timezone_set('Asia/jakarta');
    include '../../../adodb/con_mounter.php';

    $page       = @$_REQUEST["page"];
    $limit      = @$_REQUEST["limit"];
    $start      = (($page*$limit)-$limit)+1;
	$boardid    = @$_REQUEST["boardid"];

    // echo "declare @totalcount as int; exec traceability_good_smt_mounter_test1 $start, $limit, '{$model}','{$process}','{$pwbno}','{$spidate}', @totalcount=@totalcount out";
    $rs         = $db->Execute("declare @totalcount as int; exec [traceability_dispReaderMounter_rev2] $start, $limit, '{$boardid}', @totalcount=@totalcount out");
    $totalcount = $rs->fields['19'];
    $return     = array();

    for($i=0;!$rs->EOF;$i++){
        $return[$i]['row']          = trim($rs->fields['0']);
        $return[$i]['line']         = trim($rs->fields['1']);
        $return[$i]['boardid']      = trim($rs->fields['2']);
        $return[$i]['model']        = trim($rs->fields['3']);
        $return[$i]['pwbno']        = trim($rs->fields['4']);
        $return[$i]['pwbname']      = trim($rs->fields['5']);
        $return[$i]['process']      = trim($rs->fields['6']);
        $return[$i]['lotno']        = trim($rs->fields['7']);
        $return[$i]['datein']       = trim($rs->fields['8']);
        $return[$i]['dateout']      = trim($rs->fields['9']);
        $return[$i]['jobno']        = trim($rs->fields['10']);
        $return[$i]['partloc']      = trim($rs->fields['11']);
        $return[$i]['mode']         = trim($rs->fields['12']);
        $return[$i]['partno']       = trim($rs->fields['13']);
        $return[$i]['feeder']       = trim($rs->fields['14']);
        $return[$i]['feederserial'] = trim($rs->fields['15']);
        $return[$i]['feederno']     = trim($rs->fields['16']);
        $return[$i]['compid1']      = trim($rs->fields['17']);
        $return[$i]['scandate']     = trim($rs->fields['18']);
       
        $rs->MoveNext();
    }
    $x = array(
        "success"=>true,
        "totalCount"=>$totalcount,
        "rows"=>$return);
    echo json_encode($x);
    $db->Close();
?>
