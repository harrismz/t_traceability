<?php
	/*
	****	create by Harris
	****	on 20 Feb 2019
	****	remark: -
	*/
	date_default_timezone_set('Asia/jakarta');
	// include '../../../adodb/con_mapros_MYSQL.php';
	// window.open('resp/finishgood_ma/dlFgMaprosPcbSerial.php?rb='+rbCheck+'&mdl='+modelName+'&s='+serialNo+'&l='+lotNo+'&ds='+dummySerial+'');
					

	//	get paramater
	$boardid = @$_REQUEST['pcb'];
    $model = @$_REQUEST['mdl'];
    $lotno = @$_REQUEST['l'];
    $pwbname = @$_REQUEST['pwb'];
	$pjgboard = strlen($boardid);
	if ( $lotno == '' ){
		//	execute query
		if ( $pjgboard == 16 ){
            include '../../../adodb/con_big.php';
            
            try{
                $sql    = "exec traceability_smt_big '{$boardid}','{$model}','{$lotno}','{$pwbname}'";
                $rs     = $db->Execute($sql);
                $return = array();
            }
            catch (Exception $ex){
                echo '[[[SQLSERVER-SVRDBN_TRC-BIG]]] :::'.$ex->getMessage();
            }

			//	save file
			$fpcbserial=''; 
			$fmodel=''; 
			$flotno=''; 
			$fpwbname='';

			if ( $boardid != '' ) { $fpcbserial = "_".$boardid; }
			if ( $model != '' ) { $fmodel = "_".$model; }
			if ( $lotno != '' ) { $flotno = "_".$lotno; }
			if ( $pwbname != '' ) { $fpwbname = "_".$pwbname; }
			
			$fname = "Traceability_PCBSerial_BIGS{$fpcbserial}{$fmodel}{$flotno}{$fpwbname}.csv";
		
			//	input data in file
			header("Content-type: text/csv");
			header("Content-Disposition: attachment; filename=$fname");
			header("Pragma: no-cache");
			header("Expires: 0");
		
			$fp = fopen("php://output", "w");
			$headers = 'START PCB_SERIAL, END PCB_SERIAL, YNUMBER, SIDE, CAVITY, LINE, MODEL, PWB NAME, LOT NO, PROCESS, QTY, START SERIAL' . "\n";
			fwrite($fp,$headers);
		
			while(!$rs->EOF)
			{
				fputcsv($fp, array(	$rs->fields['0'], $rs->fields['1'], $rs->fields['13'],
									$rs->fields['2'], $rs->fields['3'], $rs->fields['6'], 
									$rs->fields['7'], $rs->fields['8'], $rs->fields['10'], 
									$rs->fields['11'], $rs->fields['12'], $rs->fields['14']));
			   $rs->MoveNext();
			}
			
			//	connection close
			fclose($fp);
			$rs->Close();
		    $db->Close();
		}
		else if($pjgboard == 24){
			include '../../../adodb/con_big24.php';
            try{
                $rs_big24   = $db_big24->Execute("exec traceability_smt_big24 '{$boardid}','{$model}','{$lotno}','{$pwbname}'");
                $return     = array();
            }
            catch (Exception $ex){
                echo '[[[SQLSERVER-SVRDBN_TRC-smtpros]]] :::'.$ex->getMessage();
            }
            //	save file
			$fpcbserial=''; 
			$fmodel=''; 
			$flotno=''; 
			$fpwbname='';

			if ( $boardid != '' ) { $fpcbserial = "_".$boardid; }
			if ( $model != '' ) { $fmodel = "_".$model; }
			if ( $lotno != '' ) { $flotno = "_".$lotno; }
			if ( $pwbname != '' ) { $fpwbname = "_".$pwbname; }
			
			$fname = "Traceability_PCBSerial_BIGS{$fpcbserial}{$fmodel}{$flotno}{$fpwbname}.csv";
		
			//	input data in file
			header("Content-type: text/csv");
			header("Content-Disposition: attachment; filename=$fname");
			header("Pragma: no-cache");
			header("Expires: 0");
		
			$fp = fopen("php://output", "w");
			$headers = 'START PCB_SERIAL, END PCB_SERIAL, YNUMBER, SIDE, CAVITY, LINE, MODEL, PWB NAME, LOT NO, PROCESS, QTY, START SERIAL' . "\n";
			fwrite($fp,$headers);
		
			while(!$rs_big24->EOF)
			{
				fputcsv($fp, array(	$rs_big24->fields['0'], $rs_big24->fields['1'], $rs_big24->fields['11'],
									$rs_big24->fields['2'], $rs_big24->fields['3'], $rs_big24->fields['4'], 
									$rs_big24->fields['5'], $rs_big24->fields['6'], $rs_big24->fields['8'], 
									$rs_big24->fields['9'], $rs_big24->fields['10'], $rs_big24->fields['12']));
			   
				$rs_big24->MoveNext();
			}
			
			//	connection close
			fclose($fp);
			$rs_big24->Close();
		    $db_big24->Close();
		}
	}
	else{
		include '../../../adodb/con_big24.php';
        try{
            $rs_big24   = $db_big24->Execute("exec traceability_smt_big24 '{$boardid}','{$model}','{$lotno}','{$pwbname}'");
            $return     = array();
        }
        catch (Exception $ex){
            echo '[[[SQLSERVER-SVRDBN_TRC-smtpros]]] :::'.$ex->getMessage();
        }
        //	save file
		$fpcbserial=''; 
		$fmodel=''; 
		$flotno=''; 
		$fpwbname='';

		if ( $boardid != '' ) { $fpcbserial = "_".$boardid; }
		if ( $model != '' ) { $fmodel = "_".$model; }
		if ( $lotno != '' ) { $flotno = "_".$lotno; }
		if ( $pwbname != '' ) { $fpwbname = "_".$pwbname; }
		
		$fname = "Traceability_PCBSerial_BIGS{$fpcbserial}{$fmodel}{$flotno}{$fpwbname}.csv";
	
		//	input data in file
		header("Content-type: text/csv");
		header("Content-Disposition: attachment; filename=$fname");
		header("Pragma: no-cache");
		header("Expires: 0");
	
		$fp = fopen("php://output", "w");
		$headers = 'START PCB_SERIAL, END PCB_SERIAL, YNUMBER, SIDE, CAVITY, LINE, MODEL, PWB NAME, LOT NO, PROCESS, QTY, START SERIAL' . "\n";
		fwrite($fp,$headers);
	
		while(!$rs_big24->EOF)
		{
			fputcsv($fp, array(	$rs_big24->fields['0'], $rs_big24->fields['1'], $rs_big24->fields['11'],
								$rs_big24->fields['2'], $rs_big24->fields['3'], $rs_big24->fields['4'], 
								$rs_big24->fields['5'], $rs_big24->fields['6'], $rs_big24->fields['8'], 
								$rs_big24->fields['9'], $rs_big24->fields['10'], $rs_big24->fields['12']));
		   
			$rs_big24->MoveNext();
		}
		
		//	connection close
		fclose($fp);
		$rs_big24->Close();
	    $db_big24->Close();
	}
?>