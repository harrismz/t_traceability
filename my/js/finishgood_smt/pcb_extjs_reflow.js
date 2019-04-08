Ext.onReady(function() {

//	=======================================================	MODEL 		=====================================
	Ext.define('model_smt_reflow',{
        extend: 'Ext.data.Model',
        fields: ['board_id', 'scan_date', 'reflow_start_time', 'reflow_end_time','boardlen','diffdate','pcbid']
   	});
//	=======================================================	DATASTORE 	=====================================
	var store_smt_reflow = Ext.create('Ext.data.Store',{
		storeId : 'store_smt_reflow',
		model	: 'model_smt_reflow',
		autoLoad: false,
		pageSize: itemperpage,
		proxy   : {
			type    : 'ajax',
			url     : 'json/finishgood_smt/json_good_smt_reflow.php',
			reader  : {
				type    : 'json',
				root    : 'rows',
				totalProperty: 'totalCount'
			}
		}
	});
//	=======================================================	GRID 		=====================================
	var grid_smt_reflow = Ext.create('Ext.grid.Panel', {
		id 			: 'grid_smt_reflow',
		autoWidth 	: '100%',
		maxHeight	: 290,
		minHeight 	: 150,
		columnLines : true,
		store 		: store_smt_reflow,
		viewConfig 		: {
			stripeRows 			: true,
			emptyText 	 		: '<div class="empty-txt">Select Board ID Generator for this result.</div>',
			deferEmptyText 		: false,
			enableTextSelection	: true,
			// forceFit			: false,
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
			{
				header 			: 'BOARD ID',
				dataIndex 		: 'board_id',
				componentCls 	: 'headergrid',
				autoSizeColumn 	: true,
				renderer 		: upsize
			}, {
				header 			: 'REFLOW DATE',
				dataIndex 		: 'scan_date',
				componentCls 	: 'headergrid',
				flex 			: getFlexPCBSerialReflow(),
				autoSizeColumn 	: getWidthPCBSerialReflow(),
				renderer 		: upsize
			}, {
				header 			: 'IN',
				dataIndex 		: 'reflow_start_time',
				componentCls 	: 'headergrid',
				flex 			: getFlexPCBSerialReflow(),
				autoSizeColumn 	: getWidthPCBSerialReflow(),
				renderer 		: upsize
			}, {
				header 			: 'OUT',
				dataIndex 		: 'reflow_end_time',
				componentCls 	: 'headergrid',
				flex 			: getFlexPCBSerialReflow(),
				autoSizeColumn 	: getWidthPCBSerialReflow(),
				renderer 		: upsize
			}, {
				header 			: 'PCB ID',
				dataIndex 		: 'pcbid',
				componentCls 	: 'headergrid',
				flex 			: getFlexPCBSerialReflow(),
				autoSizeColumn 	: getWidthPCBSerialReflow(),
				renderer 		: upsize
			}
		],
		listeners: {
    		select: function(grid, rowIndex, colIndex) {
    			var rec 		= this.getSelectionModel().getSelection();
    			// var boardid 	= document.getElementById('pcbserial').value;
    			var boardid 	= rec[0].data.board_id;
    			console.log('REFLOW SELECTED : '+boardid);
    			Ext.getStore('store_good_smt_aoi_board').proxy.setExtraParam('boardid', boardid);
    			Ext.getStore('store_good_smt_aoi_board').proxy.setExtraParam('model', '');
    			Ext.getStore('store_good_smt_aoi_board').proxy.setExtraParam('lotno', '');
    			Ext.getStore('store_good_smt_aoi_board').proxy.setExtraParam('pwbname', '');
    			Ext.getStore('store_good_smt_aoi_board').proxy.setExtraParam('side', '');
				Ext.getStore('store_good_smt_aoi_board').loadPage(1);
				Ext.getStore('store_good_smt_aoi_point').proxy.setExtraParam('boardid', boardid);
				Ext.getStore('store_good_smt_aoi_point').proxy.setExtraParam('model', '');
				Ext.getStore('store_good_smt_aoi_point').proxy.setExtraParam('lotno', '');
				Ext.getStore('store_good_smt_aoi_point').proxy.setExtraParam('pwbname', '');
				Ext.getStore('store_good_smt_aoi_point').proxy.setExtraParam('side', '');
				Ext.getStore('store_good_smt_aoi_point').loadPage(1);
    		}
    	},
		bbar	: Ext.create('Ext.PagingToolbar', {
			pageSize		: itemperpage,
			store			: store_smt_reflow,
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
	
	grid_smt_reflow.getStore().on('load', function() {
        grid_smt_reflow.getView().stripeRows 			= true;
		grid_smt_reflow.getView().deferEmptyText 		= false;
		grid_smt_reflow.getView().enableTextSelection	= true;
        grid_smt_reflow.getView().emptyText = '<div class="empty-txt2">Data Not Available.</div>';
        grid_smt_reflow.getView().refresh();
    });
//	=======================================================	 PANEL	=====================================
	var panel_reflow = Ext.create('Ext.panel.Panel', {
		id 				:'panel_reflow',
		renderTo 		: 'panel_reflow',
		autoWidth		: '100%',
		maxHeight		: 300,
		border			: false,
		frame			: false,
		defaults		: {
			split		: true,
			collapsible	: false
		},
		items			: [grid_smt_reflow]
	});
		
});