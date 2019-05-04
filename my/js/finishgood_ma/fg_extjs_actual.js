Ext.onReady(function() {
	//	=======================================================    MODEL        =====================================
		Ext.define('model_output', {
			extend: 'Ext.data.Model',
			fields: ['prod_date', 'line_name', 'model_name', 'shift', { name: 'output', type: 'int' }, 'stime']
		});
	//	=======================================================    DATASTORE    =====================================
		var store_output = Ext.create('Ext.data.Store', {
			storeId	: 'store_output',
			model 	: 'model_output',
			pageSize: 5,
			autoLoad: false,
			proxy	: {
				type  : 'ajax',
				url   : 'json/finishgood_ma/json_output.php',
				reader: {
					type 		  : 'json',
					root		  : 'rows',
					totalProperty : 'totalCount'
				}
			}
		});
	//	=======================================================    GRID         =====================================
		var finishgood_actual = Ext.create('Ext.grid.Panel', {
			id 			: 'finishgood_actual',
			renderTo	: 'finishgood_actual',
			border		: false,
			width		: '100%',
			height		: 208,
			store 		: store_output,
			centered	: true,
			viewConfig	: {
				stripeRows 			: true,
				emptyText 			: '<div class="empty-txt-main">Select Finishgood table for show this data.</div>',
				deferEmptyText 		: false,
				enableTextSelection : true,
				listeners 			: {
					refresh : function(dataview) {
						Ext.each(dataview.panel.columns, function(column){
							if (column.autoSizeColumn === true)
								column.autoSize();
						})
					}
				}
			},
			columns 	: [
				// {	header       	: 'No', 
				// 	xtype 			: 'rownumberer', 
				// 	componentCls	: 'headergrid',
				// 	width 			: 50, 
				// 	sortable 		: false,
				// 	renderer 		: fontstyle 
				// },
				{ 	header 			: 'Prod Date',
					dataIndex 		: 'prod_date',
					componentCls 	: 'headergrid',
					renderer 		: fontstyle
				},
				{ 	header 			: 'First Output',
					dataIndex 		: 'stime',
					componentCls 	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer 		: fontstyle
					
				},
				{	header 			: 'Line',
					dataIndex 		: 'line_name',
					componentCls 	: 'headergrid',
					flex 			: getFlexFgActual(),
					autoSizeColumn 	: getWidthFgActual(),
					renderer 		: fontstyle
					
				},
				{ 	header 			: 'Model Name',
					dataIndex 		: 'model_name',
					componentCls 	: 'headergrid',
					flex 			: getFlexFgActual(),
					autoSizeColumn 	: getWidthFgActual(),					
					hidden 			: true,
					renderer 		: fontstyle
				},
				{ 	header 			: 'Shift',
					dataIndex 		: 'shift',
					componentCls 	: 'headergrid',
					flex 			: getFlexFgActual(),
					autoSizeColumn 	: getWidthFgActual(),
					renderer 		: fontstyle
				},
				{ 	header 			: 'Qty Output',
					dataIndex 		: 'output',
					componentCls 	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer 		: fontstyle
				}
			],
			bbar		: Ext.create('Ext.PagingToolbar', {
				pageSize	: 5,
				store		: store_output,
				displayInfo	: true,
				listeners 	: {
					afterrender: function (cmp) {
						cmp.getComponent("refresh").hide();
						cmp.getComponent("first").hide();
						cmp.getComponent("last").hide();
					}
				}
			})
			// features 	: [
			// 	{
			// 		id 				: 'linegroup',
			// 		ftype 			: 'groupingsummary',
			// 		//groupHeaderTpl: 'Line {name}',
			// 		//startCollapsed: true
			// 		//hideGroupedHeader: true,
			// 		//enableGroupingMenu: false
			// 	}
			// ],
			// listeners: {
			// 	select: function( grid, rowIndex, colIndex) {
			// 		var rec = this.getSelectionModel().getSelection();
			// 		var proddate = rec[0].data.prod_date;
			// 		var modelname = rec[0].data.model_name;
			// 		var output = rec[0].data.output;

			// 		console.log(proddate);
			// 	}
			// }
		});

		
	finishgood_actual.getStore().on('load', function() {
        finishgood_actual.getView().stripeRows 			= true;
		finishgood_actual.getView().deferEmptyText 		= false;
		finishgood_actual.getView().enableTextSelection	= true;
        finishgood_actual.getView().emptyText 			= '<div class="empty-txt-main">Data Not Available.</div>';
        finishgood_actual.getView().refresh();
    });
});