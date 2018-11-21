<?php
	date_default_timezone_set('Asia/Jakarta');
    //error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);
    include '../../adodb/con_mecha.php';

    $page 		= @$_REQUEST["page"]-1;
	$limit 		= @$_REQUEST["limit"];
	//$limit 		= 10;
	//$start		= 1;
	$start		= ($page*$limit)+1;

    $model      = $_REQUEST['mecha_model'];
    $lot     	= $_REQUEST['mecha_lot'];
echo "select * from show_mecha_res('{$model}', '{$lot}')";
    $rs    			= $db->Execute("select * from show_mecha_res('{$model}', '{$lot}')");
	$totalcount 	= $rs->fields['22'];
    $return 	= array();

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
        $return[$i]['responsible']	= trim($rs->fields['21']);


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
