<?php
	date_default_timezone_set('Asia/jakarta');
    include '../../../adodb/con_mounter.php';

    $page       = @$_REQUEST["page"];
    $limit      = @$_REQUEST["limit"];
    $start      = (($page*$limit)-$limit)+1;
    $boardid    = @$_REQUEST['boardid'];
    $sql    = "DECLARE  @return_value int,
                        @totalcount int

                EXEC    @return_value = [dbo].[traceability_good_smt_spi_rev1]
                        @start = '{$start}',
                        @maxct = '{$limit}',
                        @boardid = N'{$boardid}',
                        @totalcount = @totalcount OUTPUT";
    $rs    = $db->Execute($sql);
    $totalcount = $rs->fields['10'];
    $return = array();
    
    for($i=0;!$rs->EOF;$i++){
        $return[$i]['mchname']              = trim($rs->fields['0']);
        $return[$i]['inspectiondatetime']   = trim($rs->fields['1']);
        $return[$i]['inspectiondate']       = trim($rs->fields['2']);
        $return[$i]['inspectiontime']       = trim($rs->fields['3']);
        $return[$i]['filename']             = trim($rs->fields['4']);
        $return[$i]['pcbid']                = trim($rs->fields['5']);
        $return[$i]['barcode']              = trim($rs->fields['6']);
        $return[$i]['spijudge']             = trim($rs->fields['7']);
        $return[$i]['opjudge']              = trim($rs->fields['8']);
        $return[$i]['defectcnt']            = trim($rs->fields['9']);
       
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
