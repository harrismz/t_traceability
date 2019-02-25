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
	
	/**	run query **/
		//echo "EXEC TRACE_part_problem 'mc', '$model', '$lotno', '$symptom', '$prod_date', '$src_cat';";
		//$rs     = $db_pi->Execute("EXEC TRACE_part_problem 'mc', '{$model}', '{$lotno}', '{$symptom}', '{$prod_date}', '{$src_cat}';");
		if($src_cat=='fg'){
			$rs     = $db_pi->Execute("SELECT a.[id_quality], a.[prod_date], (SELECT division from t_div where id_div = a.id_div) as div,
										(SELECT department from t_dept where id_dept = a.id_dept) as dept, a.[line], a.[shift], 
										a.[model], a.[lot_no], a.[id_symptom], 
										(SELECT symptom FROM t_symptom where id_symptom = a.id_symptom) as symptom, a.[id_defcause], (SELECT defcause FROM t_defcause where id_defcause = a.id_defcause) as defcause, 
										a.[reject_rate], a.[reject_qty], a.[id_resp],
										a.read_status, a.input_userid, a.input_nik, a.id_condition, 
										(SELECT condition from t_condition where id_condition = a.id_condition) as condition
									FROM [t_quality] a
									where a.id_dept = '4'
									and ISNULL(a.model, '') like '$model%'
									order by a.prod_date desc");
		}
		elseif($src_cat=='sp'){
			$rs     = $db_pi->Execute("SELECT a.[id_quality], a.[prod_date], (SELECT division from t_div where id_div = a.id_div) as div,
										(SELECT department from t_dept where id_dept = a.id_dept) as dept, a.[line], a.[shift], 
										a.[model], a.[lot_no], a.[id_symptom], 
										(SELECT symptom FROM t_symptom where id_symptom = a.id_symptom) as symptom, a.[id_defcause], 
										(SELECT defcause FROM t_defcause where id_defcause = a.id_defcause) as defcause, 
										a.[reject_rate], a.[reject_qty], a.[id_resp],
										a.read_status, a.input_userid, a.input_nik, a.id_condition, 
										(SELECT condition from t_condition where id_condition = a.id_condition) as condition
									FROM [t_quality] a
									where a.id_dept = '4'
									and ISNULL(a.model, '') like '$model%'
									order by a.prod_date desc");
		}
		elseif($src_cat=='ml'){
			$rs     = $db_pi->Execute("SELECT a.[id_quality], a.[prod_date], (SELECT division from t_div where id_div = a.id_div) as div,
										(SELECT department from t_dept where id_dept = a.id_dept) as dept, a.[line], a.[shift], 
										a.[model], a.[lot_no], a.[id_symptom], 
										(SELECT symptom FROM t_symptom where id_symptom = a.id_symptom) as symptom, a.[id_defcause], 
										(SELECT defcause FROM t_defcause where id_defcause = a.id_defcause) as defcause, 
										a.[reject_rate], a.[reject_qty], a.[id_resp],
										a.read_status, a.input_userid, a.input_nik, a.id_condition, 
										(SELECT condition from t_condition where id_condition = a.id_condition) as condition
									FROM [t_quality] a
									where a.id_dept = '4'
									and ISNULL(a.model, '') like '$model%'
									and ISNULL(a.lot_no, '') like '$lotno%'
									order by a.prod_date desc");
		}
		else{
			$rs     = $db_pi->Execute("SELECT a.[id_quality], a.[prod_date], (SELECT division from t_div where id_div = a.id_div) as div,
										(SELECT department from t_dept where id_dept = a.id_dept) as dept, a.[line], a.[shift], 
										a.[model], a.[lot_no], a.[id_symptom], 
										(SELECT symptom FROM t_symptom where id_symptom = a.id_symptom) as symptom, a.[id_defcause], (SELECT defcause FROM t_defcause where id_defcause = a.id_defcause) as defcause, 
										a.[reject_rate], a.[reject_qty], a.[id_resp],
										a.read_status, a.input_userid, a.input_nik, a.id_condition, 
										(SELECT condition from t_condition where id_condition = a.id_condition) as condition
									FROM [t_quality] a
									where a.id_dept = '4'
									and ISNULL(a.model, '') like '$model%'
									order by a.prod_date desc");
		}
		
		//and convert(varchar(10), a.prod_date, 120) BETWEEN DATEADD (day , -3 , getdate() ) AND DATEADD (day , +3 , getdate() ) FOR FG AND ELSE
		// and convert(varchar(10), a.prod_date, 120) BETWEEN DATEADD (day , -3 , '$prod_date' ) AND DATEADD (day , +3 , '$prod_date' ) 
									
		$return = array();
			
	//	-----***-----  //
	
	for ($i = 0; !$rs->EOF; $i++) {
		$return[$i]['id_quality']  = trim($rs->fields['0']);
		$return[$i]['prod_date']   = date_format(date_create(trim($rs->fields['1'])), 'd M Y');
		$return[$i]['div']         = trim($rs->fields['2']);
		$return[$i]['dept']        = trim($rs->fields['3']);
		$return[$i]['line']        = trim($rs->fields['4']);
		$return[$i]['shift']       = trim($rs->fields['5']);
		$return[$i]['model']       = trim($rs->fields['6']);
		$return[$i]['lot_no']      = trim($rs->fields['7']);
		$return[$i]['id_symptom']  = trim($rs->fields['8']);
		$return[$i]['symptom']     = trim($rs->fields['9']);
		$return[$i]['id_defcause'] = trim($rs->fields['10']);
		$return[$i]['defcause']    = trim($rs->fields['11']);
		$return[$i]['reject'] 	   = trim($rs->fields['12']).' / '.trim($rs->fields['13']);
		$return[$i]['id_resp']     = trim($rs->fields['14']);
		$return[$i]['read_status'] = trim($rs->fields['15']);
		$return[$i]['input_userid']= trim($rs->fields['16']);
		$return[$i]['input_nik']   = trim($rs->fields['17']);
		$return[$i]['id_condition']= trim($rs->fields['18']);
		$return[$i]['condition']   = trim($rs->fields['19']);
		
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