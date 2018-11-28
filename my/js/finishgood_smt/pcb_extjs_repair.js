Ext.onReady(function() {

	//	=======================================================    MODEL        =====================================
		Ext.define('model_smt_repair',{
            extend: 'Ext.data.Model',
			fields: ['inputid','dateid','group','shift','mch','model_name','start_serial','serial_no',
            			'lot_no','lot_qty','pcb_name','pwb_no','process','ai','smt',
            			'loc','magazineno','ng','boardid','boardke','boardqty','pointqty','inputdate']
        });
	//	=======================================================    DATASTORE    =====================================
		var store_smt_repair = Ext.create('Ext.data.Store',{
			storeId : 'store_smt_repair',
			model	: 'model_smt_repair',
			autoLoad: false,
			pageSize: itemperpage,
			proxy   : {
				type    : 'ajax',
				url     : 'json/finishgood_smt/json_good_smt_repair.php',
				reader  : {
					type    : 'json',
					root    : 'rows',
					totalProperty: 'totalCount'
				}
			}
		});
	//	=======================================================    GRID         =====================================
		var grid_smt_repair = Ext.create('Ext.grid.Panel', {
			id 				: 'grid_smt_repair',
			maxHeight		: 300,
			minHeight 		: 150,
			columnLines 	: true,
			store 			: store_smt_repair,
			viewConfig 		: {
				stripeRows 			: true,
				emptyText 	 		: '<div class="empty-txt">No data to display.</div>',
				deferEmptyText 		: false,
				enableTextSelection	: true
			},
			columns 	: [
				{ 	header : 'ID',				dataIndex : 'inputid', 		width : 50,		renderer : upsize,	hidden : true },
				{ 	header : 'BOARD ID', 		dataIndex : 'boardid', 		width : 200,	renderer : upsize,	hidden : true  },
				{ 	header : 'REPAIR DATE',		dataIndex : 'dateid', 		componentCls: 'headergrid',	width : 100, 	renderer : upsize },
				{ 	header : 'GROUP',			dataIndex : 'group',		componentCls: 'headergrid',	width : 80,		renderer : upsize },
				{ 	header : 'SHIFT',			dataIndex : 'shift',		componentCls: 'headergrid',	width : 80,		renderer : upsize },
				{ 	header : 'MCH NAME', 		dataIndex : 'mch', 			componentCls: 'headergrid',	width : 90, 	renderer : upsize },
				{ 	header : 'MODEL NAME', 		dataIndex : 'model_name', 	width : 130, 	renderer : upsize,	hidden : true },
				{ 	header : 'START SERIAL', 	dataIndex : 'start_serial', componentCls: 'headergrid',	width : 80, 	renderer : upsize },
				{ 	header : 'SERIAL NO', 		dataIndex : 'serial_no', 	width : 75, 	renderer : upsize,	hidden : true },
				{ 	header : 'LOT NO', 			dataIndex : 'lot_no', 		width : 80, 	renderer : upsize,	hidden : true },
				{ 	header : 'PCB NAME', 		dataIndex : 'pcb_name', 	width : 80, 	renderer : upsize,	hidden : true  },
				{ 	header : 'PWB NO', 			dataIndex : 'pwb_no', 		componentCls: 'headergrid',	width : 90, 	renderer : upsize },
				{ 	header : 'PROCESS', 		dataIndex : 'process', 		width : 90, 	renderer : upsize,	hidden : true },
				{ 	header : 'AI',				dataIndex : 'ai', 			width : 75,		renderer : upsize,	hidden : true },
				{ 	header : 'SYMPTOM', 		dataIndex : 'smt', 			componentCls: 'headergrid',	width : 120, 	renderer : upsize },
				{ 	header : 'LOC', 			dataIndex : 'loc', 			componentCls: 'headergrid',	width : 75, 	renderer : upsize },
				{ 	header : 'MAGZ NO', 		dataIndex : 'magazineno', 	componentCls: 'headergrid',	width : 75, 	renderer : upsize },
				{ 	header : 'NG FOUND BY', 	dataIndex : 'ng',			componentCls: 'headergrid',	width : 100,	renderer : upsize },
				{ 	header : 'BOARD NG QTY', 	dataIndex : 'boardqty', 	componentCls: 'headergrid',	width : 90,		renderer : upsize },
				{ 	header : 'POINT NG QTY', 	dataIndex : 'pointqty', 	componentCls: 'headergrid',	width : 90,		renderer : upsize },
				{ 	header : 'REPAIR DATE', 	dataIndex : 'inputdate', 	width : 90,		renderer : upsize,	hidden : true }
			],
			bbar	: Ext.create('Ext.PagingToolbar', {
				pageSize		: itemperpage,
				store			: store_smt_repair,
				displayInfo		: true,
				displayMsg		: 'Data {0} - {1} from {2} data',
				emptyMsg		: "Page not found",
				beforePageText  : 'Page',
				afterPageText   : 'from {0} Pages',
				firstText       : 'First Page',
				prevText        : 'Previous Page',
				nextText        : 'Next page',
				lastText        : 'Last Page',
				plugins       	: Ext.create('Ext.ux.ProgressBarPager', {}),
				listeners 		: {
					afterrender: function (cmp) {
						cmp.getComponent("refresh").hide();
					}
				}
			})
		});
	//	=======================================================  TAB  PANEL     =====================================
		var panel_repair = Ext.create('Ext.panel.Panel', {
			id 				: 'panel_repair',
			renderTo 		: 'panel_repair',
			//autoWidth		: '100%',
			maxHeight		: 400,
			minHeight 		: 150,
			//border			: false,
			//frame			: true,
			//hidden			: false,
			// defaults		: {
				//split		: true,
				//collapsible	: false
			// },
			items			: [grid_smt_repair]
		});
			
});