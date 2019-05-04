<?php
	include '../../../adodb/con_smtrepair.php';
	
	//	Setting Jam Indonesia //
		date_default_timezone_set('Asia/Jakarta');
	//	================= //
	
	//	Setting Pagination //
		$page 	= @$_REQUEST["page"]-1;
		$limit 	= @$_REQUEST["limit"];
		$start	= ($page*$limit)+1;
	//	================= //

	//	Get Parameter //
		$boardid 	= isset($_REQUEST['src_boardid']) ? $_REQUEST['src_boardid'] : '';
		$modelname 	= isset($_REQUEST['model']) ? $_REQUEST['model'] : '';
		$lotno 		= isset($_REQUEST['lotno']) ? $_REQUEST['lotno'] : '';
		$pwbname	= isset($_REQUEST['pwbname']) ? $_REQUEST['pwbname'] : '';
		$side		= isset($_REQUEST['side']) ? $_REQUEST['side'] : '';
		$process	= isset($_REQUEST['process']) ? $_REQUEST['process'] : '';
	
	//	================= //

	//	Query //
		try{
			$sql 	= " declare @totalcount as int 
						exec traceability_smtrepair_rev2
						$start, $limit, '{$boardid}', '{$modelname}', '{$lotno}', '{$pwbname}', '{$side}', '{$process}', @totalcount=@totalcount out";
			$rs 	= $db->Execute($sql);
			$return = array();
		}
		catch (Exception $ex){
		    echo '[SQLSERVER-SVRDBN-db_imquality] :::'.$ex->getMessage();
		}
	//	================= //

	//	Result of Query //
		$totalcount = $rs->fields['16'];
	
		for ($i = 0; !$rs->EOF; $i++) {
			$return[$i]['inputdate']	= trim($rs->fields['0']);
			$return[$i]['group']		= trim($rs->fields['1']);
			$return[$i]['shift']		= trim($rs->fields['2']);
			$return[$i]['mch']			= trim($rs->fields['3']);
			$return[$i]['start_serial']	= trim($rs->fields['4']);
			$return[$i]['pwb_no']		= trim($rs->fields['5']);
			$return[$i]['problem']		= trim($rs->fields['6']);
			$return[$i]['loc']			= trim($rs->fields['7']);
			$return[$i]['magazineno']	= trim($rs->fields['8']);
			$return[$i]['ng']			= trim($rs->fields['9']);
			$return[$i]['process']		= trim($rs->fields['10']);
			$return[$i]['picrepair']	= trim($rs->fields['11']);
			$return[$i]['howtorepair']	= trim($rs->fields['12']);
			$return[$i]['partno']		= trim($rs->fields['13']);
			$return[$i]['lot_no']		= trim($rs->fields['14']);
			$return[$i]['lot_qty']		= trim(substr($rs->fields['15'],0,3)*1000);
			//$return[$i]['totcount']		= $rs->fields['23'];
			/*$newdate					= date_create($rs->fields['20']);
			$inputdate					= date_format($newdate, "Y-m-d H:i:s");
			$return[$i]['inputdate']	= $inputdate;*/
			$rs->MoveNext();
		}
	//	================= //
	
	//	Send Result to JSON Format //
		$o 	= 	array(
					"success"=>true,
					"totalCount"=>$totalcount,
					"rows"=>$return
				);
		echo json_encode($o);
	//	================= //

	//	Close Connection //
		$rs->Close();
		$db->Close();
		$db=null;
	//	================= //
?>