<?php
	date_default_timezone_set('Asia/jakarta');
    include '../../../adodb/con_mounter.php';

    $boardid    = @$_REQUEST["boardid"];

    // echo "exec [traceability_scanreaderline] '{$boardid}'";
    $rs         = $db->Execute("exec [traceability_scanreaderline] '{$boardid}'");
    $return     = array();

    for($i=0;!$rs->EOF;$i++){
        $return[$i]['line']         = trim($rs->fields['0']);
        $return[$i]['boardid']      = trim($rs->fields['1']);
        $return[$i]['datein']       = trim($rs->fields['2']);
        $return[$i]['dateout']      = trim($rs->fields['3']);
       
        $rs->MoveNext();
    }
    $x = array(
        "success"=>true,
        "rows"=>$return);
    echo json_encode($x);
    $rs->Close();
    $db->Close();
?>
