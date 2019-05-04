<?php
	date_default_timezone_set('Asia/Jakarta');
    //error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);
    include '../../../adodb/con_fadaq.php';
    /*
    $page 		= @$_REQUEST["page"]-1;
	$limit 		= @$_REQUEST["limit"];
	//$limit 		= 10;
	//$start		= 1;
	$start		= ($page*$limit)+1;
	*/
	$model      = $_REQUEST['valmodel'];
	$serialnoid = substr(@$_REQUEST['valserialno'],-8);
	$guidmaster = $_REQUEST['valguidmaster'];
	$guidticket = $_REQUEST['valguidticket'];
    $pcbserial  = $_REQUEST['valpcbserial'];
    $lotno      = $_REQUEST['vallotno'];
	
	$sql 			= "select * from traceability_qualityreport('{$model}', '{$serialnoid}', '{$guidmaster}', '{$guidticket}','{$lotno}', '{$pcbserial}')";
    $rs    			= $db->Execute($sql);
	$totalcount 	= $rs->fields['13'];
    $return 		= array();

    for($i=0;!$rs->EOF;$i++){
    	$return[$i]['tgl']   		= $rs->fields['0'];
        $return[$i]['bln']   		= $rs->fields['1'];
        $return[$i]['thn']   		= $rs->fields['2'];
        $return[$i]['line_name']   	= $rs->fields['3'];
        $return[$i]['shift']   		= $rs->fields['4'];
        $return[$i]['model_name']  	= trim($rs->fields['5']);
        $return[$i]['lot']   		= trim($rs->fields['6']);
        $return[$i]['prod_no']   	= trim($rs->fields['7']);
        $return[$i]['st_serial']	= $rs->fields['8'];
        $return[$i]['serial_output']= trim($rs->fields['9']);
        $return[$i]['symptom']		= trim($rs->fields['10']);
        $return[$i]['def_cause']	= trim($rs->fields['11']);
        $return[$i]['p_disposal']	= trim($rs->fields['12']);
		$return[$i]['responsible']	= trim($rs->fields['22']);
		$return[$i]['id_quality']	= trim($rs->fields['23']);
		$return[$i]['board']		= trim($rs->fields['24']);
		$return[$i]['pic_nik']		= trim($rs->fields['25']);
		$return[$i]['process_code']	= trim($rs->fields['26']);
		$return[$i]['process_name']	= trim($rs->fields['27']);
		$return[$i]['ip_addrs']		= trim($rs->fields['28']);
		$return[$i]['action_item']	= trim($rs->fields['29']);
		
		
        $return[$i]['date']    = $rs->fields['2'].'-'.$rs->fields['1'].'-'.$rs->fields['0'];
        
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