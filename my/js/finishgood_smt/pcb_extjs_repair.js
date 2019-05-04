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
		// autoLoad: false,
		pageSize: itemperpage,
		// filters: [{
  //           property: 'text',
  //           value:'WeWantToFilterOutEverything'
  //       }],
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
			emptyText 	 		: '<div class="empty-txt">Select Board ID Generator for this result.</div>',
			deferEmptyText 		: false,
			enableTextSelection	: true,
			listeners			: {
				refresh : function(dataview){
					Ext.each(dataview.panel.columns, function(column){
						if (column.autoSizeColumn === true ){
							column.autoSize();
						}
					})
				}
			}
		},
		columns 	: [
			{ 	header : 'ID',				dataIndex : 'inputid', 		width : 50,		renderer : upsize,	hidden : true },
			{ 	header : 'BOARD ID', 		dataIndex : 'boardid', 		width : 200,	renderer : upsize,	hidden : true  },
			{ 	header : 'REPAIR DATE',		dataIndex : 'dateid', 		componentCls: 'headergrid',	flex: getFlexPCBSerialRepair(), autoSizeColumn: getWidthPCBSerialRepair(),	renderer : upsize },
			{ 	header : 'GROUP',			dataIndex : 'group',		componentCls: 'headergrid',	flex: getFlexPCBSerialRepair(), autoSizeColumn: getWidthPCBSerialRepair(),	renderer : upsize },
			{ 	header : 'SHIFT',			dataIndex : 'shift',		componentCls: 'headergrid',	flex: getFlexPCBSerialRepair(), autoSizeColumn: getWidthPCBSerialRepair(),	renderer : upsize },
			{ 	header : 'M/C Name', 		dataIndex : 'mch', 			componentCls: 'headergrid',	flex: getFlexPCBSerialRepair(), autoSizeColumn: getWidthPCBSerialRepair(),	renderer : upsize },
			{ 	header : 'MODEL NAME', 		dataIndex : 'model_name', 	width : 130, 	renderer : upsize,	hidden : true },
			{ 	header : 'START SERIAL', 	dataIndex : 'start_serial', componentCls: 'headergrid',	flex: getFlexPCBSerialRepair(), autoSizeColumn: getWidthPCBSerialRepair(),	renderer : upsize },
			{ 	header : 'SERIAL NO', 		dataIndex : 'serial_no', 	width : 75, 	renderer : upsize,	hidden : true },
			{ 	header : 'LOT NO', 			dataIndex : 'lot_no', 		width : 80, 	renderer : upsize,	hidden : true },
			{ 	header : 'PCB NAME', 		dataIndex : 'pcb_name', 	width : 80, 	renderer : upsize,	hidden : true  },
			{ 	header : 'PWB NO', 			dataIndex : 'pwb_no', 		componentCls: 'headergrid',	flex: getFlexPCBSerialRepair(), autoSizeColumn: getWidthPCBSerialRepair(),	renderer : upsize },
			{ 	header : 'PROCESS', 		dataIndex : 'process', 		width : 90, 	renderer : upsize,	hidden : true },
			{ 	header : 'AI',				dataIndex : 'ai', 			width : 75,		renderer : upsize,	hidden : true },
			{ 	header : 'SYMPTOM', 		dataIndex : 'smt', 			componentCls: 'headergrid',	flex: getFlexPCBSerialRepair(), autoSizeColumn: getWidthPCBSerialRepair(),	renderer : upsize },
			{ 	header : 'LOC', 			dataIndex : 'loc', 			componentCls: 'headergrid',	flex: getFlexPCBSerialRepair(), autoSizeColumn: getWidthPCBSerialRepair(),	renderer : upsize },
			{ 	header : 'MAGZ NO', 		dataIndex : 'magazineno', 	componentCls: 'headergrid',	flex: getFlexPCBSerialRepair(), autoSizeColumn: getWidthPCBSerialRepair(),	renderer : upsize },
			{ 	header : 'NG FOUND BY', 	dataIndex : 'ng',			componentCls: 'headergrid',	flex: getFlexPCBSerialRepair(), autoSizeColumn: getWidthPCBSerialRepair(),	renderer : upsize },
			{ 	header : 'BOARD NG QTY', 	dataIndex : 'boardqty', 	componentCls: 'headergrid',	flex: getFlexPCBSerialRepair(), autoSizeColumn: getWidthPCBSerialRepair(),	renderer : upsize, hidden: true },
			{ 	header : 'POINT NG QTY', 	dataIndex : 'pointqty', 	componentCls: 'headergrid',	flex: getFlexPCBSerialRepair(), autoSizeColumn: getWidthPCBSerialRepair(),	renderer : upsize, hidden: true },
			{ 	header : 'REPAIR DATE', 	dataIndex : 'inputdate', 	width : 90,		renderer : upsize,	hidden : true }
		],
		bbar	: Ext.create('Ext.PagingToolbar', {
			pageSize		: itemperpage,
			store			: store_smt_repair,
			displayInfo		: true,
			// displayMsg		: 'Data {0} - {1} from {2} data',
			// emptyMsg		: "Page not found",
			// beforePageText  : 'Page',
			// afterPageText   : 'from {0} Pages',
			// firstText       : 'First Page',
			// prevText        : 'Previous Page',
			// nextText        : 'Next page',
			// lastText        : 'Last Page',
			// plugins       	: Ext.create('Ext.ux.ProgressBarPager', {}),
			listeners 		: {
				afterrender: function (cmp) {
					cmp.getComponent("refresh").hide();
					cmp.getComponent("first").hide();
					cmp.getComponent("last").hide();
				}
			}
		})
	});

	grid_smt_repair.getStore().on('load', function() {
        grid_smt_repair.getView().stripeRows 			= true;
		grid_smt_repair.getView().deferEmptyText 		= false;
		grid_smt_repair.getView().enableTextSelection	= true;
        grid_smt_repair.getView().emptyText = '<div class="empty-txt2">Data Not Available.</div>';
        grid_smt_repair.getView().refresh();
    });
//	=======================================================  TAB  PANEL     =====================================
	var panel_repair = Ext.create('Ext.panel.Panel', {
		id 				: 'panel_repair',
		renderTo 		: 'panel_repair',
		maxHeight		: 400,
		minHeight 		: 150,
		items			: [grid_smt_repair]
	});
});