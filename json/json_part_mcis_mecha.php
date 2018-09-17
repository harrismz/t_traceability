
<?php
  date_default_timezone_set('Asia/jakarta');
  include '../../adodb/con_mc.php';
  $model    = $_REQUEST['model'];
  $lot      = $_REQUEST['prod_no'];
  $getdate  = substr($_REQUEST['prod_date'],0,10);
  $proddate = date('Y-m-d', strtotime($getdate));
//echo "exec traceability_partiss '{$model}','{$lot}','{$proddate}','mecha'";
  $rs       = $db->Execute("exec traceability_partiss '{$model}','{$lot}','{$proddate}','mecha'");
  $return   = array();

  for($i=0;!$rs->EOF;$i++){
    $return[$i]['issdate']    = trim(date('Y-m-d H:i:s', strtotime($rs->fields['0'])));
    $return[$i]['partno']     = trim($rs->fields['1']);
    $return[$i]['partname']   = trim($rs->fields['2']);
    $return[$i]['scanqty']    = (float)trim($rs->fields['3']);
    $return[$i]['po']         = trim($rs->fields['4']);
    $return[$i]['model_name'] = trim($rs->fields['5']);
    $return[$i]['lot']        = trim($rs->fields['6']);
    $return[$i]['line']       = trim($rs->fields['7']);
    $return[$i]['so']         = trim($rs->fields['8']);
    $return[$i]['reqqty']     = (float)trim($rs->fields['9']);
    $rs->MoveNext();
  }

  $o = array(
    "success"=>true,
    "rows"=>$return
  );

  echo json_encode($o);

  $rs->Close();
  $db->Close();
?>



<!-- <?php
	// /*
	// ****	modify by Mohamad Yunus
	// ****	on 31 Oct 2016
	// ****	revise: enddate tambah seminggu

	// ****	modify by Harris Muhammad Zaki
	// ****	on 06 June 2018
	// ****	revise: change to storeprocedure for new traceability
	// */

	// date_default_timezone_set('Asia/jakarta');
 //  include '../../adodb/con_mc.php';
 //  $model  = $_REQUEST['model'];
	// $lot		= $_REQUEST['prod_no'];
 //  $getdate= substr($_REQUEST['prod_date'],0,10);
	// $sdate 	= date('Y-m-d', strtotime($getdate."- 7 days"));
 //  $edate  = date('Y-m-d', strtotime($getdate."+ 15 days"));
	// $rs    		= $db->Execute("exec traceability_partiss '{$model}','{$lot}','{$sdate}','{$edate}','mecha'");
 //  $return 	= array();

 //  for($i=0;!$rs->EOF;$i++){
 //    // $return[$i]['so']    			= trim($rs->fields['0']);
 //    // $return[$i]['partno']			= trim($rs->fields['1']);
 //    // $return[$i]['partname']		= trim($rs->fields['2']);
 //    // $return[$i]['po']					= trim($rs->fields['3']);
 //    // $return[$i]['reqqty']			= (float)trim($rs->fields['5']);
 //    // $return[$i]['scanqty']		= (float)trim($rs->fields['6']);
 //    // $return[$i]['lot']				= trim($rs->fields['7']);
 //    // $return[$i]['line']				= trim($rs->fields['8']);
 //    // $return[$i]['model_name']	= trim($rs->fields['9']);
 //    // $return[$i]['issdate']		= trim(date('Y-m-d H:i:s', strtotime($rs->fields['10'])));

	// 	$return[$i]['issdate']		= trim(date('Y-m-d H:i:s', strtotime($rs->fields['0'])));
	// 	$return[$i]['partno']			= trim($rs->fields['1']);
	// 	$return[$i]['partname']		= trim($rs->fields['2']);
	// 	$return[$i]['scanqty']		= (float)trim($rs->fields['3']);
	// 	$return[$i]['po']					= trim($rs->fields['4']);
	// 	$return[$i]['model_name']	= trim($rs->fields['5']);
	// 	$return[$i]['lot']				= trim($rs->fields['6']);
	// 	$return[$i]['line']				= trim($rs->fields['7']);
	// 	$return[$i]['so']    			= trim($rs->fields['8']);
 //    $return[$i]['reqqty']			= (float)trim($rs->fields['9']);
 //    $rs->MoveNext();
 //  }

 //  $o = array(
 //    "success"=>true,
 //    "rows"=>$return
	// );

 //  echo json_encode($o);

	// $rs->Close();
 //  $db->Close();
?>
 -->