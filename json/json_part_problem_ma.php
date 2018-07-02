<?php
	include '../../ADODB/con_probleminfo.php';
	date_default_timezone_set("Asia/Jakarta");
	
	$model       = isset($_REQUEST['model'])?$_REQUEST['model']:'';
	$lotno  	 = isset($_REQUEST['lotno'])?$_REQUEST['lotno']:'';
	$symptom	 = isset($_REQUEST['symptom'])?$_REQUEST['symptom']:'';
	$prod_date   = isset($_REQUEST['prod_date'])?$_REQUEST['prod_date']:'';
	$src_cat     = isset($_REQUEST['src_cat'])?$_REQUEST['src_cat']:'';
	             
	//$model     = 'DNR916WSITA9N';
	//$prod_date = '2016-10-08';
	//$src_cat   = 'fg';
	/*			{"id_dept":"1","div":"PROD. CONTROL","department":"LOG"},
				{"id_dept":"2","div":"PROD. CONTROL","department":"MC"},
				{"id_dept":"3","div":"PRODUCTION","department":"MA"},
				{"id_dept":"4","div":"PRODUCTION","department":"MECHA"},
				{"id_dept":"5","div":"PRODUCTION","department":"IM"},
				{"id_dept":"6","div":"PURCHASING","department":"PURCH-ELC"},
				{"id_dept":"7","div":"PURCHASING","department":"PURCH-MCH"},
				{"id_dept":"8","div":"QC","department":"IQC"},
				{"id_dept":"9","div":"QC","department":"QA"},
				{"id_dept":"10","div":"SMT","department":"SMT"}
				{"id_dept":"11","div":"PROD. CONTROL","department":"PLA"},
				{"id_dept":"12","div":"ENG","department":"PE"},
				{"id_dept":"13","div":"ENG","department":"FAC-INV"},
				{"id_dept":"14","div":"ENG","department":"IT"},
				{"id_dept":"15","div":"ENG","department":"ENG"},				*/
	/**	run query **/
		//echo "EXEC TRACE_part_problem 'mc', '$model', '$lotno', '$symptom', '$prod_date', '$src_cat';";
		//$rs     = $db_pi->Execute("EXEC TRACE_part_problem 'mc', '{$model}', '{$lotno}', '{$symptom}', '{$prod_date}', '{$src_cat}';");
		if($src_cat=='fg'){
			$rs     = $db_pi->Execute("SELECT a.[id_part] ,a.[line] ,a.[shift] ,a.[prod_date]
									,(SELECT division from t_div where id_div = a.id_div) as div
									,(SELECT department from t_dept where id_dept = a.id_dept) as dept
									,a.[model_name] ,a.[lotno] ,a.[part_name] ,a.[partno] ,a.[shortage_qty]
									,a.[supplier_name] ,a.[id_resp]
									,(SELECT department FROM t_dept where id_dept = a.id_resp) as resp
									,a.[comment], a.paging, a.line_from, a.read_status, a.input_userid, a.input_nik, a.id_condition
									,(SELECT condition from t_condition where id_condition = a.id_condition) as condition
									FROM [t_part] a
									where a.id_dept = 3
									and a.model_name like '%$model%'
									order by a.prod_date desc");
		}
		elseif($src_cat=='sp'){
			$rs     = $db_pi->Execute("SELECT a.[id_part] ,a.[line] ,a.[shift] ,a.[prod_date]
									,(SELECT division from t_div where id_div = a.id_div) as div
									,(SELECT department from t_dept where id_dept = a.id_dept) as dept
									,a.[model_name] ,a.[lotno] ,a.[part_name] ,a.[partno] ,a.[shortage_qty]
									,a.[supplier_name] ,a.[id_resp]
									,(SELECT department FROM t_dept where id_dept = a.id_resp) as resp
									,a.[comment], a.paging, a.line_from, a.read_status, a.input_userid, a.input_nik, a.id_condition
									,(SELECT condition from t_condition where id_condition = a.id_condition) as condition
									FROM [t_part] a
									where a.id_dept = 3
									and a.model_name like '%$model%'
									order by a.prod_date desc");
		}
		elseif($src_cat=='ml'){
			$rs     = $db_pi->Execute("SELECT a.[id_part] ,a.[line] ,a.[shift] ,a.[prod_date]
										,(SELECT division from t_div where id_div = a.id_div) as div
										,(SELECT department from t_dept where id_dept = a.id_dept) as dept
										,a.[model_name] ,a.[lotno] ,a.[part_name] ,a.[partno] ,a.[shortage_qty]
										,a.[supplier_name] ,a.[id_resp]
										,(SELECT department FROM t_dept where id_dept = a.id_resp) as resp
										,a.[comment], a.paging, a.line_from, a.read_status, a.input_userid, a.input_nik, a.id_condition
										,(SELECT condition from t_condition where id_condition = a.id_condition) as condition
										FROM [t_part] a
										where a.id_dept = 3
										and a.model_name like '%$model%'
										and a.[lotno] like '%$lotno%'
										order by a.prod_date desc");
		}
		else{
			$rs     = $db_pi->Execute("SELECT a.[id_part] ,a.[line] ,a.[shift] ,a.[prod_date]
									,(SELECT division from t_div where id_div = a.id_div) as div
									,(SELECT department from t_dept where id_dept = a.id_dept) as dept
									,a.[model_name] ,a.[lotno] ,a.[part_name] ,a.[partno] ,a.[shortage_qty]
									,a.[supplier_name] ,a.[id_resp]
									,(SELECT department FROM t_dept where id_dept = a.id_resp) as resp
									,a.[comment], a.paging, a.line_from, a.read_status, a.input_userid, a.input_nik, a.id_condition
									,(SELECT condition from t_condition where id_condition = a.id_condition) as condition
									FROM [t_part] a
									where a.id_dept = 3
									and a.model_name like '%$model%'
									order by a.prod_date desc");
		}
		
		// and convert(varchar(10), a.prod_date, 120)  BETWEEN DATEADD (day , -3 , getdate() ) AND DATEADD (day , +3 , getdate() ) FOR FG AND ELSE
		//and convert(varchar(10), a.prod_date, 120) BETWEEN DATEADD (day , -3 , $prod_date ) AND DATEADD (day , +3 , $prod_date )
										
									
		$return = array();
			
	//	-----***-----  //
	
	for ($i = 0; !$rs->EOF; $i++) {
		$return[$i]['id_part']      = trim($rs->fields['0']);
		$return[$i]['line']         = trim($rs->fields['1']);
		$return[$i]['shift']        = trim($rs->fields['2']);
		$return[$i]['prod_date']    = date_format(date_create(trim($rs->fields['3'])), 'd M Y');
		$return[$i]['div']          = trim($rs->fields['4']);
		$return[$i]['dept']         = trim($rs->fields['5']);
		$return[$i]['model_name']   = trim($rs->fields['6']);
		$return[$i]['lotno']        = trim($rs->fields['7']);
		$return[$i]['part_name']    = trim($rs->fields['8']);
		$return[$i]['partno']       = trim($rs->fields['9']);
		$return[$i]['shortage_qty'] = trim($rs->fields['10']);
		$return[$i]['supplier_name']= trim($rs->fields['11']);
		$return[$i]['id_resp']      = trim($rs->fields['12']);
		$return[$i]['resp']         = trim($rs->fields['13']);
		$return[$i]['comment']      = trim($rs->fields['14']);
		$return[$i]['paging']       = trim($rs->fields['15']);
		$return[$i]['line_from']    = trim($rs->fields['16']);
		$return[$i]['read_status']  = trim($rs->fields['17']);
		$return[$i]['input_userid'] = trim($rs->fields['18']);
		$return[$i]['input_nik']    = trim($rs->fields['19']);
		$return[$i]['id_condition'] = trim($rs->fields['20']);
		$return[$i]['condition']    = trim($rs->fields['21']);
		$rs->MoveNext();
	}
	
	$o = array(
		"success"=>true,
		"rows"=>$return);
	echo json_encode($o);
	
	$rs->Close();
	$db_pi->Close();
	$db_pi=null;
?>