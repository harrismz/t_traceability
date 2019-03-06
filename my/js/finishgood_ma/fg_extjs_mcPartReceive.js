Ext.onReady(function() {
	//	=======================================================    MODEL        =====================================
		Ext.define('modelMcReceiving', {
			extend: 'Ext.data.Model',
			fields: ['userid', 'supp', 'inv', 'part', 'po', 'qty', 'rcvdate', 'custom', 'category']
		});
	//	=======================================================    DATASTORE    =====================================
		var storeMcReceiving = Ext.create('Ext.data.Store', {
			storeId	: 'storeMcReceiving',
			model 	: 'modelMcReceiving',
			autoLoad: false,
			//pageSize: itemperpage,
			proxy 	: {
				type   : 'ajax',
				url    : 'json/finishgood_ma/json_mcReceiving.php',
				reader : {
					type 		 : 'json',
					root		 : 'rows',
					totalProperty: 'totalCount'
				}
			}
		});
	//	=======================================================    GRID         =====================================
		var grid_mcReceiving = Ext.create('Ext.grid.Panel', {
			id				: 'grid_mcReceicing',
			renderTo		: 'mc_receiving',
			autoWidth		: '100%',
			//height 		: '100%',
			maxHeight		: 295,
			columnLines		: true,
			store			: storeMcReceiving,
			viewConfig	: {
				stripeRows 			: true,
				emptyText 			: '<div class="empty-txt-main">Select Finishgood Table for show this data.</div>',
				deferEmptyText 		: false,
				enableTextSelection	: true,
				listeners 			: {
					refresh : function (dataview) {
						Ext.each(dataview.panel.columns, function (column) {
							if (column.autoSizeColumn === true)
								column.autoSize();
						})
					}
				}
			},
			columns			: [
				{	header 		: 'Date Receive', 
					dataIndex 	: 'rcvdate', 
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 	: fontstyle 
				},
				{	header 		: 'Supplier', 
					dataIndex 	: 'supp', 
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 	: fontstyle 
				},
				{ 	header 		: 'Part Number', 
					dataIndex 	: 'part', 
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 	: fontstyle,
					// filter 		: {
					// 	type 	  : 'string',
					// 	dataIndex : 'partno'
					// }
				},
				{	header 		: 'PO', 
					dataIndex 	: 'po', 
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 	: fontstyle 
				},
				{	header 		: 'QTY', 
					dataIndex 	: 'qty', 
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 	: fontstyle 
				},
				{	header 		: 'userid', 
					dataIndex 	: 'userid', 
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 	: fontstyle,
					hidden		: true 
				},
				{	header 		: 'Custom', 
					dataIndex 	: 'custom', 
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 	: fontstyle 
				},
				{	header 		: 'Category', 
					dataIndex 	: 'category', 
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 	: fontstyle 
				}
			],
			bbar	: Ext.create('Ext.PagingToolbar', {
				pageSize		: 25,
				store			: storeMcReceiving,
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
		grid_mcReceiving.getStore().on('load', function() {
	        grid_mcReceiving.getView().stripeRows 			= true;
			grid_mcReceiving.getView().deferEmptyText 		= false;
			grid_mcReceiving.getView().enableTextSelection	= true;
	        grid_mcReceiving.getView().emptyText = '<div class="empty-txt-main">Data Not Available.</div>';
	        grid_mcReceiving.getView().refresh();
	    });
    //	=======================================================	 GRID DETAIL 	=====================================
	
});