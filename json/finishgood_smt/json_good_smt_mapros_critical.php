<?php
	date_default_timezone_set('Asia/jakarta');
    include '../../../adodb/con_mapros_MYSQL.php';


    $model      = @$_REQUEST['model'];
    $serial     = @$_REQUEST['serial_no'];
    $boardid    = @$_REQUEST['boardid'];
    $sql        = "call traceability_mapros_critical ('{$model}','{$serial}','{$boardid}')";
    $rs         = $db->Execute($sql);
    $return     = array();
 
    for($i=0;!$rs->EOF;$i++){
       
        $return[$i]['unique_id']    = $rs->fields['0'];
        $return[$i]['supp_code']    = $rs->fields['1'];
        $return[$i]['part_no']      = $rs->fields['2'];
        $return[$i]['po']           = $rs->fields['3'];
        $return[$i]['prodsup']      = $rs->fields['4'];
        $return[$i]['lotnosup']     = $rs->fields['5'];
        $return[$i]['qty']          = $rs->fields['6'];
        $return[$i]['scan_nik']     = $rs->fields['7'];
        $return[$i]['created_at']   = $rs->fields['8'];
        $return[$i]['process']      = $rs->fields['9'];
        $return[$i]['code']         = $rs->fields['10'];
        $return[$i]['line']         = $rs->fields['11'];
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
