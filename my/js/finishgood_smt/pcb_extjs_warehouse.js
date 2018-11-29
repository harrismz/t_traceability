Ext.onReady(function() {

	//	=======================================================	MODEL 		=====================================
	Ext.define('model_mapros_board',{
		extend: 'Ext.data.Model',
		fields: [	'tbone_id','tbone_line','tbone_model','tbone_boardid','tbone_lineprocess', 'IN_time','IN_judge',
					'IN_nik','OUT_time','OUT_judge','OUT_nik','tbone_timerange','tbone_guidmaster',
					'tbone_guidticket','tbone_idproces']});
	
	//	=======================================================	DATASTORE 	=====================================
	// var store_mapros_board = Ext.create('Ext.data.Store',{
	// 	storeId : 'store_mapros_board',
	// 	model	: 'model_mapros_board',
	// 	autoLoad: false,
	// 	pageSize: itemperpage,
	// 	proxy   : {
	// 		type    : 'ajax',
	// 		url     : 'json/finishgood_smt/json_good_smt_mapros_board.php',
	// 		reader  : {
	// 			type    : 'json',
	// 			root    : 'rows'
	// 		}
	// 	}
	// });
	
	//	=======================================================	GRID 		=====================================
	// var grid_mapros_board = Ext.create('Ext.grid.Panel', {
	// 	id 				: 'grid_mapros_board',
	// 	autoWidth 		: '100%',
	// 	maxHeight		: 400,
	// 	columnLines 	: true,
	// 	store 			: store_mapros_board,
	// 	viewConfig 		: 	{
	// 							stripeRows 			: true,
	// 							deferEmptyText 		: false,
	// 							enableTextSelection	: true,
	// 							emptyText 			: '<div class="empty-txt">No data to display.</div>',
	// 							getRowClass			: 	function(record, rowIndex, rowParams, store) {
	// 														if (record.get('status')==='IN') return 'colorin';
	// 														else if (record.get('status')==='OUT') return 'colorout';
	// 													},
	// 						},
	// 	columns 		: 	[
	// 							{ header: 'guid_master',	dataIndex: 'tbone_guidmaster',	componentCls: 'headergrid',	flex: 1,	renderer:upsize,	hidden:true },
	// 							{ header: 'guid_ticket',	dataIndex: 'tbone_guidticket',	componentCls: 'headergrid',	flex: 1,	renderer:upsize,	hidden:true },
	// 							{ header: 'MODEL',			dataIndex: 'tbone_model',		componentCls: 'headergrid',	flex: 1, 	renderer:upsize,	hidden:true	},
	// 							{ header: 'LINE',			dataIndex: 'tbone_line',		componentCls: 'headergrid',	width: 90,	renderer:upsize },
	// 							{ header: 'BOARD ID',		dataIndex: 'tbone_boardid',		componentCls: 'headergrid',	width: 200,	renderer:upsize },
	// 							{ header: 'PROCESS',		dataIndex: 'tbone_lineprocess',	componentCls: 'headergrid',	width: 90 },
	// 							{
	// 								header: 'IN STATUS',
	// 								componentCls: 'headergrid',
	// 								columns: [
	// 									{text:'TIME', 	dataIndex: 'IN_time',	componentCls: 'headergrid',	width: 90,	renderer:upsize},
	// 									{text:'JUDGE', 	dataIndex: 'IN_judge',	componentCls: 'headergrid',	width: 90,	renderer:upsize},
	// 									{text:'EMP NO',	dataIndex: 'IN_nik',	componentCls: 'headergrid',	width: 90,	renderer:upsize}
	// 								]
	// 							},
	// 							{
	// 								header: 'OUT STATUS',
	// 								componentCls: 'headergrid',
	// 								columns: [
	// 									{text:'TIME',	dataIndex: 'OUT_time',	componentCls: 'headergrid',	width: 90,	renderer:upsize},
	// 									{text:'JUDGE',	dataIndex: 'OUT_judge',	componentCls: 'headergrid',	width: 90,	renderer:upsize},
	// 									{text:'EMP NO',	dataIndex: 'OUT_nik',	componentCls: 'headergrid',	width: 90,	renderer:upsize}
	// 								]
	// 							},
	// 							{ header: 'TACTIME',	dataIndex: 'tbone_timerange',	componentCls: 'headergrid',	flex: 1,	renderer:secondtime	},
	// 							{ header: 'GUIDMASTER',	dataIndex: 'tbone_guidmaster',	width: 90,	renderer:upsize,	hidden: true	},
	// 							{ header: 'GUIDTICKET',	dataIndex: 'tbone_guidticket',	width: 90,	renderer:upsize,	hidden: true	},
	// 							{ header: 'IDPROCESS',	dataIndex: 'tbone_idproces',	width: 90,	renderer:upsize,	hidden: true	}
								
	// 						]
	// 	// 'tbone_id','tbone_line','tbone_model','tbone_boardid','tbone_lineprocess', 'IN_time','IN_judge',
	// 	//'IN_nik','OUT_time','OUT_judge','OUT_nik','tbone_timerange','tbone_guidmaster',
	// 	//	'tbone_guidticket','tbone_idproces'

	// });
			
	//	=======================================================	TAB  PANEL	=====================================
	var panel_pcb_warehouse = Ext.create('Ext.tab.Panel', {
		id 			: 'panel_pcb_warehouse',
		//renderTo 	: 'panel_pcb_warehouse',
		plain 		: true,
		activeTab 	: 0,
		autoWidth 	: '100%',
		height		: 500,
		autoScroll 	: true,
		frame 		: true,
		//style 	: 'padding:5px;-background:#157FCC;',
		tabBar		: {
			flex 	: 1,
			layout	: {
				pack 	: 'center',
				align 	: 'stretch'
			}
		},
		items 		: [
			{	title 		: 'STOCKCARD',
			 	id  		: 'show_grid_log_stockcard',
				reorderable : false,
				//items 		: [grid_log_stockcard]
			},
			{	title 		: 'SHIPMENTHOLD',
				id  		: 'show_grid_log_shipmenthold',
				reorderable : false,
				//items 		: [grid_log_shipmenthold]
			},
			{	title 		: 'SCAN IN',
				id  		: 'show_grid_part_iqc',
				reorderable : false,
				//items		: [grid_log_scan_in]
			},
			{	title 		: 'BORROW',
				id  		: 'show_grid_log_borrow',
				reorderable : false,
				//items		: [grid_log_borrow]
			},
			{	title 		: 'VANNING PLAN',
				id  		: 'show_grid_log_vanningplan',
				reorderable : false,
				//items		: [grid_log_vanningplan]
			},
			{	title 		: 'SCAN OUT',
				id  		: 'show_grid_log_scan_out',
				reorderable : false,
				//items		: [grid_log_scan_out]
			}
		]
	});
});