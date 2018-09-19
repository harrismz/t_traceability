<?php
    date_default_timezone_set('Asia/jakarta');
    include '../../../adodb/con_smtpros.php';

    //$page         = @$_REQUEST["page"];
    //$limit        = @$_REQUEST["limit"];
    //$start        = (($page*$limit)-$limit)+1;
    
    $today    = date("Y-m-d");

    $getdate1 = isset($_REQUEST['measurement_date']) ? $_REQUEST['measurement_date'] : $today;
    $getdate  = substr($getdate1,0,10);
    $measurement_date   = date('Y-m-d', strtotime($getdate));

    //echo "EXEC [traceability_smt_themperature] '{$measurement_date}'";
    $rs    = $db->Execute("EXEC [traceability_smt_themperature] '{$measurement_date}'");
    $return = array();

    for($i=0;!$rs->EOF;$i++){
        $return[$i]['unid']         = trim($rs->fields['0']);
        $return[$i]['id']           = trim($rs->fields['1']);
        $return[$i]['faddres']      = trim($rs->fields['2']);
        $return[$i]['Instid']       = trim($rs->fields['3']);
        $return[$i]['grno']         = trim($rs->fields['4']);
        $return[$i]['measid']       = trim($rs->fields['5']);
        $return[$i]['temp']         = trim($rs->fields['6']);
        $return[$i]['settemp']      = trim($rs->fields['7']);
        $return[$i]['datetimein']   = trim($rs->fields['8']);
        $return[$i]['status']       = trim($rs->fields['9']);
        $return[$i]['picupload']    = trim($rs->fields['10']);
       
        $rs->MoveNext();
    }
    $x = array(
        "success"=>true,
        //"totalCount"=>$totalcount,
        "rows"=>$return);

    echo json_encode($x);

    $db->Close();
?>
