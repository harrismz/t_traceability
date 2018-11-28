Ext.onReady(function() {

	//	=======================================================	MODEL 		=====================================
	Ext.define('model_mapros_board',{
		extend: 'Ext.data.Model',
		fields: [	'tbone_id','tbone_line','tbone_model','tbone_boardid','tbone_lineprocess', 'IN_time','IN_judge',
					'IN_nik','OUT_time','OUT_judge','OUT_nik','tbone_timerange','tbone_guidmaster',
					'tbone_guidticket','tbone_idproces']});
	
	Ext.define('model_mapros_panel',{
		extend: 'Ext.data.Model',
		fields: ['ticket_no','guid_master','guid_ticket','modelname', 'scanner_id','status','scan_nik',
					'judge','created_at','updated_at','lineprocess','line']});

	Ext.define('model_mapros_master',{
		extend: 'Ext.data.Model',
		fields: ['ticket_no_master','guid_master','modelname', 'scanner_id','status','scan_nik','judge',
					'created_at','updated_at','lineprocess','line']});

	Ext.define('model_mapros_critical',{
	    extend: 'Ext.data.Model',
		fields: ['unique_id','supp_code','part_no','po', 'prodsup','lotnosup','qty','scan_nik','created_at',
					'process','code','line','serial_no']});

	//	=======================================================	DATASTORE 	=====================================
	var store_mapros_board = Ext.create('Ext.data.Store',{
		storeId : 'store_mapros_board',
		model	: 'model_mapros_board',
		autoLoad: false,
		pageSize: itemperpage,
		proxy   : {
			type    : 'ajax',
			url     : 'json/finishgood_smt/json_good_smt_mapros_board.php',
			reader  : {
				type    : 'json',
				root    : 'rows'
			}
		}
	});
	var store_mapros_panel = Ext.create('Ext.data.Store',{
		storeId : 'store_mapros_panel',
		model	: 'model_mapros_panel',
		autoLoad: false,
		pageSize: itemperpage,
		proxy   : {
			type    : 'ajax',
			url     : 'json/finishgood_smt/json_good_smt_mapros_panel.php',
			reader  : {
				type    : 'json',
				root    : 'rows'
			}
		}
	});
	var store_mapros_master = Ext.create('Ext.data.Store',{
		storeId : 'store_mapros_master',
		model	: 'model_mapros_master',
		autoLoad: false,
		pageSize: itemperpage,
		proxy   : {
			type    : 'ajax',
			url     : 'json/finishgood_smt/json_good_smt_mapros_master.php',
			reader  : {
				type    : 'json',
				root    : 'rows'
			}
		}
	});
	var store_mapros_critical = Ext.create('Ext.data.Store',{
		storeId : 'store_mapros_critical',
		model	: 'model_mapros_critical',
		autoLoad: false,
		pageSize: itemperpage,
		proxy   : {
			type    : 'ajax',
			url     : 'json/finishgood_smt/json_good_smt_mapros_critical.php',
			reader  : {
				type    : 'json',
				root    : 'rows',
				totalProperty: 'totalCount'
			}
		}
	});

	//	=======================================================	GRID 		=====================================
	var grid_mapros_board = Ext.create('Ext.grid.Panel', {
		id 				: 'grid_mapros_board',
		autoWidth 		: '100%',
		maxHeight		: 400,
		columnLines 	: true,
		store 			: store_mapros_board,
		viewConfig 		: 	{
								stripeRows 			: true,
								deferEmptyText 		: false,
								enableTextSelection	: true,
								emptyText 			: '<div class="empty-txt">No data to display.</div>',
								getRowClass			: 	function(record, rowIndex, rowParams, store) {
															if (record.get('status')==='IN') return 'colorin';
															else if (record.get('status')==='OUT') return 'colorout';
														},
							},
		columns 		: 	[
								{ header: 'guid_master',	dataIndex: 'tbone_guidmaster',	componentCls: 'headergrid',	flex: 1,	renderer:upsize,	hidden:true },
								{ header: 'guid_ticket',	dataIndex: 'tbone_guidticket',	componentCls: 'headergrid',	flex: 1,	renderer:upsize,	hidden:true },
								{ header: 'MODEL',			dataIndex: 'tbone_model',		componentCls: 'headergrid',	flex: 1, 	renderer:upsize,	hidden:true	},
								{ header: 'LINE',			dataIndex: 'tbone_line',		componentCls: 'headergrid',	width: 90,	renderer:upsize },
								{ header: 'BOARD ID',		dataIndex: 'tbone_boardid',		componentCls: 'headergrid',	width: 200,	renderer:upsize },
								{ header: 'PROCESS',		dataIndex: 'tbone_lineprocess',	componentCls: 'headergrid',	width: 90 },
								{
									header: 'IN STATUS',
									componentCls: 'headergrid',
									columns: [
										{text:'TIME', 	dataIndex: 'IN_time',	componentCls: 'headergrid',	width: 90,	renderer:upsize},
										{text:'JUDGE', 	dataIndex: 'IN_judge',	componentCls: 'headergrid',	width: 90,	renderer:upsize},
										{text:'EMP NO',	dataIndex: 'IN_nik',	componentCls: 'headergrid',	width: 90,	renderer:upsize}
									]
								},
								{
									header: 'OUT STATUS',
									componentCls: 'headergrid',
									columns: [
										{text:'TIME',	dataIndex: 'OUT_time',	componentCls: 'headergrid',	width: 90,	renderer:upsize},
										{text:'JUDGE',	dataIndex: 'OUT_judge',	componentCls: 'headergrid',	width: 90,	renderer:upsize},
										{text:'EMP NO',	dataIndex: 'OUT_nik',	componentCls: 'headergrid',	width: 90,	renderer:upsize}
									]
								},
								{ header: 'TACTIME',	dataIndex: 'tbone_timerange',	componentCls: 'headergrid',	flex: 1,	renderer:secondtime	},
								{ header: 'GUIDMASTER',	dataIndex: 'tbone_guidmaster',	width: 90,	renderer:upsize,	hidden: true	},
								{ header: 'GUIDTICKET',	dataIndex: 'tbone_guidticket',	width: 90,	renderer:upsize,	hidden: true	},
								{ header: 'IDPROCESS',	dataIndex: 'tbone_idproces',	width: 90,	renderer:upsize,	hidden: true	}
								
							]
		// 'tbone_id','tbone_line','tbone_model','tbone_boardid','tbone_lineprocess', 'IN_time','IN_judge',
		//'IN_nik','OUT_time','OUT_judge','OUT_nik','tbone_timerange','tbone_guidmaster',
		//	'tbone_guidticket','tbone_idproces'

	});
	var grid_mapros_panel = Ext.create('Ext.grid.Panel', {
		id 				: 'grid_mapros_panel',
		autoWidth 		: '100%',
		maxHeight		: 290,
		columnLines 	: true,
		store 			: store_mapros_panel,
		viewConfig 		: {
			stripeRows 			: true,
			emptyText 	 		: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText 		: false,
			enableTextSelection	: true,
			getRowClass			: function(record, rowIndex, rowParams, store) {
				if (record.get('status')==='IN') return 'colorin';
				else if (record.get('status')==='OUT') return 'colorout';
			}
			
		},
		columns 	: [
			{	header 		: 'PANLE NO',
				dataIndex 	: 'ticket_no',
				width 		: 140,
				renderer	: upsize
			},
			{	header 		: 'guid_master',
				dataIndex 	: 'guid_master',
				flex 		: 1,
				renderer	: upsize,
				hidden		: true
			},
			{	header 		: 'guid_ticket',
				dataIndex 	: 'guid_ticket',
				flex 		: 1,
				renderer	: upsize,
				hidden		: true
			},
			{	header 		: 'MODEL',
				dataIndex 	: 'modelname',
				flex 		: 1,
				renderer	: upsize
			},
			{	header 		: 'LINE',
				dataIndex 	: 'line',
				width 	 	: 90,
				renderer	: upsize
			},
			{	header 		: 'PROCESS',
				dataIndex 	: 'lineprocess',
				width 	 	: 90,
				renderer	: upsize
			},
			{	header 		: 'scanner_id',
				dataIndex 	: 'scanner_id',
				flex 		: 1,
				renderer	: upsize,
				hidden		: true
			},
			{	header 		: 'STATUS',
				dataIndex 	: 'status',
				width 	 	: 90,
				renderer	: upsize
			},
			{	header 		: 'JUDGE',
				dataIndex 	: 'judge',
				width 	 	: 90,
				renderer	: upsize
			},
			{	header 		: 'SCAN TIME',
				dataIndex 	: 'created_at',
				flex 		: 1,
				renderer	: upsize
			},
			{	header 		: 'EMP NO',
				dataIndex 	: 'scan_nik',
				flex 		: 1,
				renderer	: upsize
			},
			{	header 		: 'updated_at',
				dataIndex 	: 'updated_at',
				flex 		: 1,
				renderer	: upsize,
				hidden		: true
			}
		],
	});
	var grid_mapros_master = Ext.create('Ext.grid.Panel', {
		id 				: 'grid_mapros_master',
		autoWidth 		: '100%',
		maxHeight		: 290,
		columnLines 	: true,
		store 			: store_mapros_master,
		viewConfig 		: {
			stripeRows 			: true,
			emptyText 	 		: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText 		: false,
			enableTextSelection	: true,
			getRowClass			: function(record, rowIndex, rowParams, store) {
				if (record.get('status')==='IN') return 'colorin';
				else if (record.get('status')==='OUT') return 'colorout';
			}
		},
		columns 	: [
			{	header 		: 'MASTER NO',
				dataIndex 	: 'ticket_no_master',
				width 		: 140,
				renderer	: upsize
			},
			{	header 		: 'guid_master',
				dataIndex 	: 'guid_master',
				flex 		: 1,
				renderer	: upsize,
				hidden		: true
			},
			{	header 		: 'MODEL',
				dataIndex 	: 'modelname',
				flex 		: 1,
				renderer	: upsize
			},
			{	header 		: 'LINE',
				dataIndex 	: 'line',
				width 	 	: 90,
				renderer	: upsize
			},
			{	header 		: 'PROCESS',
				dataIndex 	: 'lineprocess',
				width 	 	: 90,
				renderer	: upsize
			},
			{	header 		: 'scanner_id',
				dataIndex 	: 'scanner_id',
				flex 		: 1,
				renderer	: upsize,
				hidden		: true
			},
			{	header 		: 'STATUS',
				dataIndex 	: 'status',
				width 	 	: 90,
				renderer	: upsize
			},
			{	header 		: 'JUDGE',
				dataIndex 	: 'judge',
				width 	 	: 90,
				renderer	: upsize
			},
			{	header 		: 'SCAN TIME',
				dataIndex 	: 'created_at',
				flex 		: 1,
				renderer	: upsize
			},
			{	header 		: 'EMP NO',
				dataIndex 	: 'scan_nik',
				flex 		: 1,
				renderer	: upsize
			},
			{	header 		: 'updated_at',
				dataIndex 	: 'updated_at',
				flex 		: 1,
				renderer	: upsize,
				hidden		: true
			}
		],
	});
	var grid_mapros_critical = Ext.create('Ext.grid.Panel', {
		id 				: 'grid_mapros_critical',
		autoWidth 		: '100%',
		maxHeight		: 290,
		columnLines 	: true,
		store 			: store_mapros_critical,
		viewConfig 		: {
			stripeRows 			: true,
			emptyText 	 		: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText 		: false,
			enableTextSelection	: true,
		},
		columns 	: [
			{	header : 'UNIQUE ID',	dataIndex : 'unique_id', 	width : 200, 	renderer : upsize, hidden : true },
			{	header : 'LINE', 		dataIndex : 'line', 		flex : 1, 	renderer : upsize },
			{	header : 'INSP DATE', 	dataIndex : 'created_at', 	width : 90, 	renderer : upsize },
			{	header : 'SUPP CODE', 	dataIndex : 'supp_code', 	flex : 1, 	renderer : upsize },
			{	header : 'PART NO', 	dataIndex : 'part_no', 		flex : 1, 	renderer : upsize },
			{	header : 'PO', 			dataIndex : 'po', 			flex : 1,	renderer : upsize },
			{	header : 'PROD DATE<br>SUPPLIER', 	dataIndex : 'prodsup', 		flex : 1,	renderer : upsize },
			{	header : 'LOT NO<br>SUPPLIER', 		dataIndex : 'lotnosup', 	flex : 1, 	renderer : upsize },
			{	header : 'QTY', 		dataIndex : 'qty', 			flex : 1, 	renderer : upsize }
		],
	});
			
	//	=======================================================	TAB  PANEL	=====================================
	var panel_pcb_mapros = Ext.create('Ext.tab.Panel', {
		id 			: 'panel_pcb_mapros',
		renderTo 	: 'panel_pcb_mapros',
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
			{	title 		: 'PCB SERIAL',
			 	id  		: 'show_grid_board',
				reorderable : false,
				items 		: [grid_mapros_board]
			}, 
			{	title 		: 'PANEL NO',
			 	id  		: 'show_grid_ticket',
				reorderable : false,
				items 		: [grid_mapros_panel]
			}, 
			{	title 		: 'DUMMY SERIAL',
			 	id  		: 'show_grid_master',
				reorderable : false,
				items 		: [grid_mapros_master]
			}, 
			{	title 		: 'CRITICAL PART',
			 	id  		: 'show_grid_critical',
				reorderable : false,
				items 		: [grid_mapros_critical]
			}
		]
	});
});