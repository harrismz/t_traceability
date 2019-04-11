Ext.onReady(function() {

	//	=======================================================	MODEL 		=====================================
	Ext.define('model_good_smt_aoi_board',{
        extend: 'Ext.data.Model',
		fields: ['linkedserver', 'pcbid', 'pcbguid', 'barcode', 'stdate',
        			'enddate','aoijudgment','userjudgment']
	});
	Ext.define('model_good_smt_aoi_point',{
		extend: 'Ext.data.Model',
		fields: ['linkedserver', 'pcbid', 'pcbguid', 'componentguid', 'uname', 'barcode', 'stdate',
        			'enddate','partno','partname','aoijudgment','userjudgment']
   	});
	//	=======================================================	DATASTORE 	=====================================
	var store_good_smt_aoi_board = Ext.create('Ext.data.Store',{
		storeId : 'store_good_smt_aoi_board',
		model	: 'model_good_smt_aoi_board',
		autoLoad: false,
		pageSize: itemperpage,
		proxy   : {
			type    : 'ajax',
			url     : 'json/finishgood_smt/json_good_smt_aoi_board.php',
			reader  : {
				type    : 'json',
				root    : 'rows'
			}
		}
	});
	var store_good_smt_aoi_point = Ext.create('Ext.data.Store',{
		storeId : 'store_good_smt_aoi_point',
		model	: 'model_good_smt_aoi_point',
		autoLoad: false,
		pageSize: itemperpage,
		proxy   : {
			type    : 'ajax',
			url     : 'json/finishgood_smt/json_good_smt_aoi_point.php',
			reader  : {
				type    : 'json',
				root    : 'rows',
				totalProperty: 'totalCount'
			}
		}
	});
	//	=======================================================	GRID 		=====================================
	var grid_smt_aoi_board = Ext.create('Ext.grid.Panel', {
		id 			: 'grid_smt_aoi_board',
		title 		: '<div style="text-align:center;">AOI - Board</div>',
		autoScroll 	: true,
		maxHeight	: 450,
		minHeight 	: 300, 	
		columnLines : true,
		store 		: store_good_smt_aoi_board,
		viewConfig 	: {
			stripeRows 			: true,
			emptyText 			: '<div class="empty-txt">Select Reflow for this result.</div>',
			deferEmptyText 		: false,
			enableTextSelection : true,
			listeners : {
				refresh : function (dataview) {
					Ext.each(dataview.panel.columns, function (column) {
						if (column.autoSizeColumn === true)
						column.autoSize();
					})
				}
		    }
		},
		columns: [
			{ 	header 		: 'BARCODE',
				dataIndex 	: 'barcode',
				componentCls: 'headergrid',
				flex 			: false,
				autoSizeColumn 	: true,
				renderer 	: upsize
			},
			{ 	header 		: 'MCH NAME',
				dataIndex 	: 'linkedserver',
				componentCls: 'headergrid',
				flex 			: getFlexPCBSerialAOIBoard(),
				autoSizeColumn 	: getWidthPCBSerialAOIBoard(),
				renderer 	: upsize
			}, 
			{ 	header 		: 'PCB ID',
				dataIndex 	: 'pcbid',
				flex 			: getFlexPCBSerialAOIBoard(),
				autoSizeColumn 	: getWidthPCBSerialAOIBoard(),
				renderer 	: upsize,
				hidden  	: true
			}, 
			{ 	header 		: 'PCB GUID',
				dataIndex 	: 'pcbguid',
				flex 			: getFlexPCBSerialAOIBoard(),
				autoSizeColumn 	: getWidthPCBSerialAOIBoard(),
				renderer 	: upsize,
				hidden  	: true
			}, 
			{ 	header 		: 'START DATE',
				dataIndex 	: 'stdate',
				componentCls: 'headergrid',
				flex 			: getFlexPCBSerialAOIBoard(),
				autoSizeColumn 	: getWidthPCBSerialAOIBoard(),
				renderer 	: upsize
			},
			{ 	header 		: 'END DATE',
				dataIndex 	: 'enddate',
				componentCls: 'headergrid',
				flex 			: getFlexPCBSerialAOIBoard(),
				autoSizeColumn 	: getWidthPCBSerialAOIBoard(),
				renderer 	: upsize,
				filters 	: {
					type 	: 'string'
				}
			}, 
			{ 	header 		: 'MCH JUDGE',
				dataIndex 	: 'aoijudgment',
				componentCls: 'headergrid',
				flex 			: getFlexPCBSerialAOIBoard(),
				autoSizeColumn 	: getWidthPCBSerialAOIBoard(),
				renderer 	: upsize
			}, 
			{ 	header 		: 'OP JUDGE',
				dataIndex 	: 'userjudgment',
				componentCls: 'headergrid',
				componentCls: 'headergrid',
				flex 			: getFlexPCBSerialAOIBoard(),
				autoSizeColumn 	: getWidthPCBSerialAOIBoard(),
				renderer 	: upsize
			}
		],
		listeners: {
    		select: function(grid, rowIndex, colIndex) {
    			var rec 		= this.getSelectionModel().getSelection();
    			var boardid 	= document.getElementById('pcbserial').value;

    			Ext.getStore('store_mapros_board').proxy.setExtraParam('boardid', boardid);
				Ext.getStore('store_mapros_board').loadPage(1);
    		}
    	},
		bbar	: Ext.create('Ext.PagingToolbar', {
			pageSize		: itemperpage,
			store			: store_good_smt_aoi_board,
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

	grid_smt_aoi_board.getStore().on('load', function() {
        grid_smt_aoi_board.getView().stripeRows 			= true;
		grid_smt_aoi_board.getView().deferEmptyText 		= false;
		grid_smt_aoi_board.getView().enableTextSelection	= true;
        grid_smt_aoi_board.getView().emptyText = '<div class="empty-txt2">Data Not Available.</div>';
        grid_smt_aoi_board.getView().refresh();
    });

	var grid_smt_aoi_point = Ext.create('Ext.grid.Panel', {
		id 			: 'grid_smt_aoi_point',
		title 		: '<div style="text-align:center;">AOI - Point</div>',
		maxHeight	: 450,
		minHeight 	: 300,
		autoScroll 	: true,
		store 		: store_good_smt_aoi_point,
		viewConfig 	: {
			stripeRows 			: true,
			emptyText 			: '<div class="empty-txt">Select Reflow for this result.</div>',
			deferEmptyText 		: false,
			enableTextSelection : true,
			listeners : {
				refresh : function (dataview) {
					Ext.each(dataview.panel.columns, function (column) {
						if (column.autoSizeColumn === true)
						column.autoSize();
					})
				}
		    }
		},
		columns 	: [
			{ 	header 		 	: 'BARCODE',
				dataIndex 	 	: 'barcode',
				componentCls 	: 'headergrid',
				flex 			: false,
				autoSizeColumn 	: true,
				renderer 	 	: upsize
			}, 
			{ 	header 		 	: 'MCH NAME',
				dataIndex 	 	: 'linkedserver',
				componentCls 	: 'headergrid',
				flex 			: getFlexPCBSerialAOIPoint(),
				autoSizeColumn 	: getWidthPCBSerialAOIPoint(),
				renderer 		: upsize
			}, 
			{ 	header 		 	: 'PCB ID',
				dataIndex 	 	: 'pcbid',
				componentCls 	: 'headergrid',
				flex 			: getFlexPCBSerialAOIPoint(),
				autoSizeColumn 	: getWidthPCBSerialAOIPoint(),
				renderer 		: upsize,
				hidden  		: true
			}, 
			{ 	header 		 	: 'PCB GUID',
				dataIndex 		: 'pcbguid',
				componentCls 	: 'headergrid',
				flex 			: getFlexPCBSerialAOIPoint(),
				autoSizeColumn 	: getWidthPCBSerialAOIPoint(),
				renderer 	 	: upsize,
				hidden  	 	: true
			}, 
			{ 	header 		 	: 'COMPONENT GUID',
				dataIndex 	 	: 'componentguid',
				componentCls 	: 'headergrid',
				flex 			: getFlexPCBSerialAOIPoint(),
				autoSizeColumn 	: getWidthPCBSerialAOIPoint(),
				renderer 		: upsize,
				hidden 			: true
			}, 
			{ 	header 			: 'UNAME',
				dataIndex 		: 'uname',
				componentCls 	: 'headergrid',
				flex 			: getFlexPCBSerialAOIPoint(),
				autoSizeColumn 	: getWidthPCBSerialAOIPoint(),
				renderer 		: upsize,
				hidden  		: true
			}, 
			{ 	header 		 	: 'INSP START',
				dataIndex 		: 'stdate',
				componentCls 	: 'headergrid',
				flex 			: getFlexPCBSerialAOIPoint(),
				autoSizeColumn 	: getWidthPCBSerialAOIPoint(),
				renderer 	 	: upsize
			},
			{ 	header 		 	: 'INSP END',
				dataIndex 	 	: 'enddate',
				componentCls 	: 'headergrid',
				flex 			: getFlexPCBSerialAOIPoint(),
				autoSizeColumn 	: getWidthPCBSerialAOIPoint(),
				renderer 	 	: upsize,
				filters 	 	: {
					type 	 	: 'string'
				}
			}, 
			{ 	header 			: 'PART NO',
				dataIndex 		: 'partno',
				componentCls 	: 'headergrid',
				flex 			: getFlexPCBSerialAOIPoint(),
				autoSizeColumn 	: getWidthPCBSerialAOIPoint(),
				renderer 		: upsize,
				filter 			: {
					type 		: 'string'
				}
			}, 
			{ 	header 			: 'PART NAME',
				dataIndex 		: 'partname',
				componentCls	: 'headergrid',
				flex 			: getFlexPCBSerialAOIPoint(),
				autoSizeColumn 	: getWidthPCBSerialAOIPoint(),
				renderer 		: upsize
			}, 
			{ 	header 			: 'IMAGE',
				dataIndex 		: 'image2d',
				componentCls	: 'headergrid',
				text 			: this.i18nColIconBmp,
				flex 			: getFlexPCBSerialAOIPoint(),
				autoSizeColumn 	: getWidthPCBSerialAOIPoint(),
				renderer 		: renderImage
			}, 
			{ 	header 			: 'MCH JUDGE',
				dataIndex 		: 'aoijudgment',
				componentCls	: 'headergrid',
				flex 			: getFlexPCBSerialAOIPoint(),
				autoSizeColumn 	: getWidthPCBSerialAOIPoint(),
				renderer 		: upsize
			}, 
			{ 	header 			: 'OP JUDGE',
				dataIndex 		: 'userjudgment',
				componentCls	: 'headergrid',
				flex 			: getFlexPCBSerialAOIPoint(),
				autoSizeColumn 	: getWidthPCBSerialAOIPoint(),
				renderer 		: upsize
			}
		],
		listeners: {
    		select: function(grid, rowIndex, colIndex) {
    			var rec 		= this.getSelectionModel().getSelection();
    			var boardid 	= document.getElementById('pcbserial').value;
    		}
    	},
		bbar	: Ext.create('Ext.PagingToolbar', {
			pageSize		: itemperpage,
			store			: store_good_smt_aoi_point,
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

	grid_smt_aoi_point.getStore().on('load', function() {
        grid_smt_aoi_point.getView().stripeRows 			= true;
		grid_smt_aoi_point.getView().deferEmptyText 		= false;
		grid_smt_aoi_point.getView().enableTextSelection	= true;
        grid_smt_aoi_point.getView().emptyText = '<div class="empty-txt2">Data Not Available.</div>';
        grid_smt_aoi_point.getView().refresh();
    });

	//	=======================================================	TAB  PANEL	=====================================
	var panel_aoi = Ext.create('Ext.tab.Panel', {
		id 			: 'panel_aoi2',
		renderTo 	: 'panel_aoi',
		activeTab 	: 0,
		plain		: true,
		frame 		: true,
		maxHeight   : 500,
		tabBar		: {
			flex	: 1,
			layout	: {
				pack	: 'center',
				align	: 'stretch'
			}
		},
		items 		: [
			{	title 		: 'BOARD',
			 	id  		: 'show_grid_aoi_board',
				reorderable : false,
				layout		: 'fit',
				items 		: [grid_smt_aoi_board]
			}, 
			{	title 		: 'POINT',
			 	id  		: 'show_grid_aoi_point',
				reorderable	: false,
				layout		: 'fit',
				items 		: [grid_smt_aoi_point]
			}
		]
	});
});