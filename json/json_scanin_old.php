<?php
	date_default_timezone_set('Asia/jakarta');
    include '../connection.php';
    
	$src_cat	= $_REQUEST['src_cat'];
	if($src_cat == 'sp')
	{
		
		$model      = $_REQUEST['model'];
		$vallotno	= $_REQUEST['prod_no'];
		
		$rs = $db->execute("select sn_prod, startsn_range, endsn_range from setupproduction where 
							modelid = '{$model}'
							and lotno = '{$vallotno}'");
		$valsnprod 	= $rs->fields[0];
		$strange 	= $rs->fields[1];
		$enrange 	= $rs->fields[2];
		$rs->Close();
		
		//$rs    		= $db->Execute("SELECT * FROM DETAILSERIAL WHERE MODELID='{$model}' AND SERIALNO='{$snoid}' ORDER BY INPUT_DATE ASC");
		$rs    		= $db->Execute("select * from detailserial where 
									modelid = '{$model}'
									and substring(serialno, 1, 4) = '{$valsnprod}'
									and substring(serialno, 5, 5) >= $strange
									and substring(serialno, 5, 5) <= $enrange");
		$return 	= array();

		for($i=0;!$rs->EOF;$i++){
			$return[$i]['model_name']	= trim($rs->fields['7']);
			$return[$i]['serialno_id']	= trim($rs->fields['8']);
			$return[$i]['start_serial']	= trim($rs->fields['9']);
			$return[$i]['scandate']		= trim(date('d-m-Y H:i:s', strtotime($rs->fields['10'])));
			$return[$i]['inputdate']	= trim(date('d-m-Y H:i:s', strtotime($rs->fields['13'])));
			$return[$i]['updatedate']	= trim(date('d-m-Y H:i:s', strtotime($rs->fields['14'])));
			
			$rs->MoveNext();
		}
		$x = array(
			"success"=>true,
			//"totalCount"=>$totalcount,
			"rows"=>$return);

		echo json_encode($x);

		//	connection close
		$rs->Close();
		$db->Close();
	
	} else{
		
		$model      = $_REQUEST['model'];
		$snoid		= $_REQUEST['serial_no'];
		$vallotno	= $_REQUEST['prod_no'];
		$valsnprod	= substr($snoid, 0, 4);
		$valsnrange	= substr($snoid, 4, 5);
		
		//echo "SELECT * FROM PARTISS WHERE MODEL = '{$model}' AND LOT = '{$lot}' AND ISSDATE <= '{$sdate}' AND ISSDATE >= '{$edate}'";
		
		$rs = $db->execute("select startsn_range, endsn_range from setupproduction where 
							modelid = '{$model}'
							and lotno = '{$vallotno}'
							and sn_prod = '{$valsnprod}'
							and (cast(startsn_range as int) <= $valsnrange)
							and (cast(endsn_range as int) >= $valsnrange)");
		$strange = $rs->fields[0];
		$enrange = $rs->fields[1];
		$rs->Close();
		
		//$rs    		= $db->Execute("SELECT * FROM DETAILSERIAL WHERE MODELID='{$model}' AND SERIALNO='{$snoid}' ORDER BY INPUT_DATE ASC");
		$rs    		= $db->Execute("select * from detailserial where 
									modelid = '{$model}'
									and substring(serialno, 1, 4) = '{$valsnprod}'
									and substring(serialno, 5, 5) >= $strange
									and substring(serialno, 5, 5) < $enrange");
		$return 	= array();

		for($i=0;!$rs->EOF;$i++){
			$return[$i]['model_name']	= trim($rs->fields['7']);
			$return[$i]['serialno_id']	= trim($rs->fields['8']);
			$return[$i]['start_serial']	= trim($rs->fields['9']);
			$return[$i]['scandate']		= trim(date('d-m-Y H:i:s', strtotime($rs->fields['10'])));
			$return[$i]['inputdate']	= trim(date('d-m-Y H:i:s', strtotime($rs->fields['13'])));
			$return[$i]['updatedate']	= trim(date('d-m-Y H:i:s', strtotime($rs->fields['14'])));
			
			$rs->MoveNext();
		}
		$x = array(
			"success"=>true,
			//"totalCount"=>$totalcount,
			"rows"=>$return);

		echo json_encode($x);

		//	connection close
		$rs->Close();
		$db->Close();
	
	}
?>