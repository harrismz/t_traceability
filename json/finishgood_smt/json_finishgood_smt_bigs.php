<?php
    date_default_timezone_set('Asia/jakarta');
    $boardid = @$_REQUEST['boardid'];
    $model = @$_REQUEST['model'];
    $lotno = @$_REQUEST['lotno'];
    $pwbname = @$_REQUEST['pwbname'];
	$pjgboard = strlen($boardid);

    if ( $lotno == '' ){
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
            
            for($i=0;!$rs->EOF;$i++){
                $return[$i]['start_code']   = trim($rs->fields['0']);
                $return[$i]['end_code']     = trim($rs->fields['1']);
                $return[$i]['side']         = trim($rs->fields['2']);
                $return[$i]['cavity']       = trim($rs->fields['3']);
                $return[$i]['seq_start']    = trim($rs->fields['4']);
                $return[$i]['seq_end']      = trim($rs->fields['5']);
                $return[$i]['line']         = trim($rs->fields['6']);
                $return[$i]['model']        = trim($rs->fields['7']);
                $return[$i]['pwbname']      = trim($rs->fields['8']);
                $return[$i]['pwbno']        = trim($rs->fields['9']);
                $return[$i]['prod_no']      = trim($rs->fields['10']);
                $return[$i]['process']      = trim($rs->fields['11']);
                $return[$i]['qty']          = trim($rs->fields['12']);
                $return[$i]['ynumber']      = trim($rs->fields['13']);
                $return[$i]['start_serial'] = trim($rs->fields['14']);
                $rs->MoveNext();
            }
            
            $x = array(
                "success"=>true,
                "rows"=>$return);
            
            echo json_encode($x);
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

            for($i=0;!$rs_big24->EOF;$i++){
                $return[$i]['start_code']   = trim($rs_big24->fields['0']);
                $return[$i]['end_code']     = trim($rs_big24->fields['1']);
                $return[$i]['side']         = trim($rs_big24->fields['2']);
                $return[$i]['cavity']       = trim($rs_big24->fields['3']);
                $return[$i]['line']         = trim($rs_big24->fields['4']);
                $return[$i]['model']        = trim($rs_big24->fields['5']);
                $return[$i]['pwbname']      = trim($rs_big24->fields['6']);
                $return[$i]['pwbno']        = trim($rs_big24->fields['7']);
                $return[$i]['prod_no']      = trim($rs_big24->fields['8']);
                $return[$i]['process']      = trim($rs_big24->fields['9']);
                $return[$i]['qty']          = trim($rs_big24->fields['10']);
                $return[$i]['ynumber']      = trim($rs_big24->fields['11']);
                $return[$i]['start_serial'] = trim($rs_big24->fields['12']);
               
                $rs_big24->MoveNext();
            }

            $j = array(
                "success"=>true,
                "rows"=>$return);

            echo json_encode($j);
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

        for($i=0;!$rs_big24->EOF;$i++){
            $return[$i]['start_code']   = trim($rs_big24->fields['0']);
            $return[$i]['end_code']     = trim($rs_big24->fields['1']);
            $return[$i]['side']         = trim($rs_big24->fields['2']);
            $return[$i]['cavity']       = trim($rs_big24->fields['3']);
            $return[$i]['line']         = trim($rs_big24->fields['4']);
            $return[$i]['model']        = trim($rs_big24->fields['5']);
            $return[$i]['pwbname']      = trim($rs_big24->fields['6']);
            $return[$i]['pwbno']        = trim($rs_big24->fields['7']);
            $return[$i]['prod_no']      = trim($rs_big24->fields['8']);
            $return[$i]['process']      = trim($rs_big24->fields['9']);
            $return[$i]['qty']          = trim($rs_big24->fields['10']);
            $return[$i]['ynumber']      = trim($rs_big24->fields['11']);
            $return[$i]['start_serial'] = trim($rs_big24->fields['12']);
           
            $rs_big24->MoveNext();
        }

        $j = array(
            "success"=>true,
            "rows"=>$return);

        echo json_encode($j);
        $rs_big24->Close();
        $db_big24->Close();  
    }
    
?>
