<?php
include '../../../adodb/con_mc.php';
include '../Helper.php';
$ADODB_FETCH_MODE = ADODB_FETCH_ASSOC;


$prodDate   = substr($_REQUEST['valProdDate'],0,10);
$days_ago = date('Y-m-d', strtotime('-10 days', strtotime( $prodDate )));

$request = $_GET;
$request['custom_filter'] = [
    [
        'property'=> 'model', 
        'value'   => $_REQUEST['valmodel']
    ],[
        'property' => 'lot',   
        'value' => $_REQUEST['vallotno']
    ],
];
$table = "PARTISS";
$query = "SELECT
    RTRIM( row.issdate ) as issdate
    ,RTRIM( row.partno ) as partno
    ,RTRIM( row.partname ) as partname
    ,RTRIM( row.scanqty ) as scanqty
    ,RTRIM( row.po ) as po
    ,RTRIM( row.model ) as model_name
    ,RTRIM( row.lot ) as lot
    ,RTRIM( row.line ) as line
    ,RTRIM( row.so ) as so
    ,RTRIM( row.reqqty ) as reqqty
    ,RTRIM( row.proddate ) as proddatesupp
    ,RTRIM( row.lotnosup ) as lotnosupp
FROM {$table} row ";
$changeProperty = [];
$primaryKey = 'replikasi';

$helper = new Helper($db, $table, $primaryKey, $query, $request, $changeProperty);
$helper->setExtraWhere(" WHERE 
    ( CONVERT(VARCHAR(20), ISSDATE, 120) >= '{$days_ago}' 
    AND CONVERT(VARCHAR(20), ISSDATE, 120) <= '{$prodDate}' )
    AND		line like 'N0%' ");

/* echo json_encode([
    'prod_date' => $prodDate,
    'days_ago'  => $days_ago,
    'extraWhere'=> $helper->getExtraWhere(),
    'query' => $helper->getQuery(),
    'countQuery' => $helper->getCountQuery(),
    'getFilter' => $helper->getFilter()
]); 
return;
 */

echo json_encode($helper->getResult(), JSON_NUMERIC_CHECK);

