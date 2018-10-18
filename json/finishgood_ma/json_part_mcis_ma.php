<?php
	date_default_timezone_set('Asia/jakarta');
  	include '../../../adodb/con_mc.php';
  	
  	$page       = @$_REQUEST["page"];
    $limit      = @$_REQUEST["limit"];
    $start      = (($page*$limit)-$limit)+1;
	$boardid    = @$_REQUEST['boardid'];
    $getdate2  	= @$_REQUEST['prod_date'];
    $model    	= @$_REQUEST['model'];
	$lot	  	= @$_REQUEST['prod_no'];
  	$proddate   = '';
   
    if ($getdate2) {
        $getdate1    = substr($getdate2,0,10);
        $proddate   = date('Y-m-d', strtotime($getdate1));
    }
    else {
        $proddate   = '';
    }

    $sql		= "declare @totalcount as int; exec traceability_partiss  $start, $limit, '{$model}','{$lot}','{$proddate}','ma', @totalcount=@totalcount out";
	$rs 		= $db->Execute($sql);
	$totalcount = $rs->fields['12'];

  	$return 	= array();

  	for($i=0;!$rs->EOF;$i++){
	    $return[$i]['issdate']	  = trim(date('Y-m-d H:i:s', strtotime($rs->fields['0'])));
		$return[$i]['partno']	  = trim($rs->fields['1']);
		$return[$i]['partname']	  = trim($rs->fields['2']);
		$return[$i]['scanqty']	  = (float)trim($rs->fields['3']);
		$return[$i]['po']		  = trim($rs->fields['4']);
		$return[$i]['model_name'] = trim($rs->fields['5']);
		$return[$i]['lot']		  = trim($rs->fields['6']);
		$return[$i]['line']		  = trim($rs->fields['7']);
		$return[$i]['so']    	  = trim($rs->fields['8']);
	    $return[$i]['reqqty']	  = (float)trim($rs->fields['9']);
	    $return[$i]['proddatesupp'] = trim($rs->fields['10']);
	    $return[$i]['lotnosupp']  = trim($rs->fields['11']);
	    $rs->MoveNext();
  	}

  	$o = array(
	    "success"=>true,
        "totalCount"=>$totalcount,
        "rows"=>$return
	);

  	echo json_encode($o);

	$rs->Close();
  	$db->Close();
?>
