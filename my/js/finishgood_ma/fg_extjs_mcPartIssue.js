Ext.onReady(function() {
	var itemperpage = 25;
	//	=======================================================    MODEL        =====================================
		Ext.define('modelMcIssueMa', {
			extend: 'Ext.data.Model',
			fields: ['issdate', 'partno', 'partname', 'scanqty', 'po', 'model_name', 'lot', 'line', 'so', 'reqqty','proddatesupp','lotnosupp']
		});
		Ext.define('modelMcIssueMecha', {
			extend: 'Ext.data.Model',
			fields: ['issdate', 'partno', 'partname', 'scanqty', 'po', 'model_name', 'lot', 'line', 'so', 'reqqty','proddatesupp','lotnosupp']
		});
		
	//	=======================================================    DATASTORE    =====================================
		var storeMcIssueMa = Ext.create('Ext.data.Store', {
			storeId	: 'storeMcIssueMa',
			model 	: 'modelMcIssueMa',
			autoLoad: false,
			pageSize: itemperpage,
			proxy 	: {
				type 	: 'ajax',
				url 	: 'json/finishgood_ma/json_mcIssueMa.php',
				reader 	: {
					type 		 : 'json',
					root 		 : 'rows',
					totalProperty: 'totalCount'
				},
			}
		});
		var storeMcIssueMecha = Ext.create('Ext.data.Store', {
			storeId : 'storeMcIssueMecha',
			model 	: 'modelMcIssueMecha',
			autoLoad: false,
			pageSize: itemperpage,
			proxy 	: {
				type 	: 'ajax',
				url 	: 'json/finishgood_ma/json_mcIssueMecha.php',
				reader 	: {
					type 		 : 'json',
					root 		 : 'rows',
					totalProperty: 'totalCount'
				},
			}
		});
		
	//	=======================================================    GRID         =====================================
		var grid_mcIssueMa = Ext.create('Ext.grid.Panel', {
			id				: 'grid_mcIssueMa',
			autoWidth 		: '100%',
			height			: 300,
			columnLines		: true,
			store			: storeMcIssueMa,
			viewConfig		: {
				stripeRows			: true,
				emptyText			: '<div class="empty-txt">Select Finishgood Table for showing this data.</div>',
				deferEmptyText		: false,
				enableTextSelection	: true
			},
			columns			: [
				{ header		: 'Date Issue',
					dataIndex	: 'issdate',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 		: fontstyle
				},
				{ header		: 'Part Number',
					dataIndex	: 'partno',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 		: fontstyle,
					filter		: {
						type		: 'string',
						dataIndex	: 'partno'
					},
					items: getGridItems('partno')
				},
				{ header		: 'Part Name',
					dataIndex	: 'partname',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 		: fontstyle
				},
				{ header			: 'QTY',
					dataIndex		: 'scanqty',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 		: fontstyle,
					summaryType		: 'sum',
					summaryRenderer	: function(value, summaryData, dataIndex) {
						return ((value === 0 || value > 1) ? '(' + value + ' Total Issue)' : '(0 Total Issue)');
					}
				},
				{ header		: 'PO',
					dataIndex	: 'po',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 		: fontstyle,
					items: getGridItems('po')
				},
				{ header		: 'Req Qty',
					dataIndex	: 'reqqty',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 		: fontstyle,
					hidden		: true
				},
				{ header		: 'Model Name',
					dataIndex	: 'model_name',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 		: fontstyle,
					hidden		: true
				},
				{ header		: 'Prod No',
					dataIndex	: 'lot',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 		: fontstyle,
					hidden		: true
				},
				{ header		: 'Line Name',
					dataIndex	: 'line',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 		: fontstyle
				},
				{ header		: 'SO',
					dataIndex	: 'so',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 		: fontstyle,
					items: getGridItems('so')
				},
				{ header		: 'Prod Date',
					dataIndex	: 'proddatesupp',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 		: fontstyle,
					hidden 	: true
				},
				{ header		: 'Lotno Supplier',
					dataIndex	: 'lotnosupp',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 		: fontstyle,
					hidden 	: true
				}
			],
			bbar	: Ext.create('Ext.PagingToolbar', {
				pageSize		: itemperpage,
				store			: storeMcIssueMa,
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
			}),
			// features		: [
				// 	{
				// 		ftype	: 'filters',
				// 		encode: encode, // json encode the filter query
				// 		local	: local
				// 	},
				// 	{
				// 		id		: 'group',
				// 		ftype	: 'groupingsummary'
				// 	}
			// ]
		});
		grid_mcIssueMa.getStore().on('load', function() {
	        grid_mcIssueMa.getView().stripeRows 			= true;
			grid_mcIssueMa.getView().deferEmptyText 		= false;
			grid_mcIssueMa.getView().enableTextSelection	= true;
	        grid_mcIssueMa.getView().emptyText = '<div class="empty-txt-main">Data Not Available.</div>';
	        grid_mcIssueMa.getView().refresh();
	    });
	    var grid_mcIssueMecha = Ext.create('Ext.grid.Panel', {
			id 			: 'grid_mcIssueMecha',
			autoWidth 	: '100%',
			height		: 300,
			columnLines	: true,
			store 		: storeMcIssueMecha,
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
			columns: [
				{ header		: 'Date Issue',
					dataIndex	: 'issdate',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 		: fontstyle
				},
				{ header		: 'Part Number',
					dataIndex	: 'partno',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 		: fontstyle,
					filter		: {
						type		: 'string',
						dataIndex	: 'partno'
					}
				},
				{ header		: 'Part Name',
					dataIndex	: 'partname',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 		: fontstyle
				},
				{ header			: 'QTY',
					dataIndex		: 'scanqty',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 		: fontstyle,
					summaryType		: 'sum',
					summaryRenderer	: function(value, summaryData, dataIndex) {
						return ((value === 0 || value > 1) ? '(' + value + ' Total Issue)' : '(0 Total Issue)');
					}
				},
				{ header		: 'PO',
					dataIndex	: 'po',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 		: fontstyle
				},
				{ header		: 'Req Qty',
					dataIndex	: 'reqqty',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 		: fontstyle,
					hidden		: true
				},
				{ header		: 'Model Name',
					dataIndex	: 'model_name',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 		: fontstyle,
					hidden		: true
				},
				{ header		: 'Prod No',
					dataIndex	: 'lot',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 		: fontstyle,
					hidden		: true
				},
				{ header		: 'Line Name',
					dataIndex	: 'line',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 		: fontstyle
				},
				{ header		: 'SO',
					dataIndex	: 'so',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 		: fontstyle
				},
				{ header		: 'Prod Date',
					dataIndex	: 'proddatesupp',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 		: fontstyle
				},
				{ header		: 'Lotno Supplier',
					dataIndex	: 'lotnosupp',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 		: fontstyle
				}
			],
			bbar	: Ext.create('Ext.PagingToolbar', {
				pageSize		: itemperpage,
				store			: storeMcIssueMecha,
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
			}),
			// features: [{
				// 	ftype: 'filters',
				// 	encode: encode, // json encode the filter query
				// 	local: local
				// }, {
				// 	id: 'group',
				// 	ftype: 'groupingsummary'
			// }]
		});
		grid_mcIssueMecha.getStore().on('load', function() {
	        grid_mcIssueMecha.getView().stripeRows 			= true;
			grid_mcIssueMecha.getView().deferEmptyText 		= false;
			grid_mcIssueMecha.getView().enableTextSelection	= true;
	        grid_mcIssueMecha.getView().emptyText = '<div class="empty-txt-main">Data Not Available.</div>';
	        grid_mcIssueMecha.getView().refresh();
	    });
    //	=======================================================	   PANEL 	 	=====================================
		var panelMcIssue = Ext.create('Ext.tab.Panel', {
			id 			: 'panelMcIssue',
			renderTo  	: 'mc_partiss',
			plain 		: true,
			autoWidth 	: '100%',
			height 		: 340,
			autoScroll 	: true,
			frame 		: true,
			style		: 'padding:5px;-background:#157FCC;',
			tabBar 		: {
				flex	: 1,
				layout 	: {
					pack 	: 'center',
					align 	: 'stretch'
				}
			},
			items: [
				{	title 	 	: 'MC Issue to MA',
				 	id  	 	: 'showGridMcMa',
					reorderable : false,
					items 		: [grid_mcIssueMa]
				},
				{	title		: 'MC Issue to MECHA',
					id  		: 'showGridMcMecha',
					reorderable : false,
					items 		: [grid_mcIssueMecha]
				}
			]
		});

	/* custom function  */
	function getGridItems(colName) {
		return Ext.custom.getGridItems(colName);
	}
});