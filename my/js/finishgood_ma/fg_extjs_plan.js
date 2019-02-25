Ext.onReady(function() {
	//	=======================================================    MODEL        =====================================
		Ext.define('model_sched', {
			extend: 'Ext.data.Model',
			fields: ['prod_date', 'line_name', 'model_name', 'prod_no', 'lot_size', 'start_serial', 'serial_id']
		});
	//	=======================================================    DATASTORE    =====================================
		var store_sched = Ext.create('Ext.data.Store', {
			storeId : 'store_sched',
			model 	: 'model_sched',
			pageSize: 5,
			autoLoad: false,
			proxy	: {
				type  : 'ajax',
				url	  : 'json/finishgood_ma/json_sched.php',
				reader: {
					type 		  : 'json',
					root 		  : 'rows',
					totalProperty : 'totalCount'
				}
			}
		});
	//	=======================================================    GRID         =====================================
		var finishgood_plan = Ext.create('Ext.grid.Panel', {
			id 			:'finishgood_plan',
			renderTo 	: 'finishgood_plan',
			border		: false,
			width		: '100%',
			height		: 204,
			store  		: store_sched,
			centered	: true,
			viewConfig 	: {
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
				{	header 		: 'Prod Date',
					dataIndex 	: 'prod_date',
					componentCls: 'headergrid',
					flex 			: getFlexFgPlan(),
					autoSizeColumn 	: getWidthFgPlan(),
					renderer 		: fontstyle
				},
				{	header 		: 'Line',
					dataIndex 	: 'line_name',
					componentCls: 'headergrid',
					flex 			: getFlexFgPlan(),
					autoSizeColumn 	: getWidthFgPlan(),
					renderer 		: fontstyle
				},
				{ 	header 		: 'Model Name',
					dataIndex 	: 'model_name',
					componentCls: 'headergrid',
					flex 			: getFlexFgPlan(),
					autoSizeColumn 	: getWidthFgPlan(),
					hidden 		: true,
					renderer 		: fontstyle
				},
				{ 	header 		: 'Prod No',
					dataIndex 	: 'prod_no',
					componentCls: 'headergrid',
					flex 			: getFlexFgPlan(),
					autoSizeColumn 	: getWidthFgPlan(),
					hidden 		: true,
					renderer 		: fontstyle
				},
				{ 	header 		: 'Lot Size',
					dataIndex 	: 'lot_size',
					componentCls: 'headergrid',
					flex 			: getFlexFgPlan(),
					autoSizeColumn 	: getWidthFgPlan(),
					renderer 		: fontstyle
				},
				{ 	header 		: 'Start Serial',
					dataIndex 	: 'start_serial',
					componentCls: 'headergrid',
					flex 			: getFlexFgPlan(),
					autoSizeColumn 	: getWidthFgPlan(),
					renderer 		: fontstyle
				}
			],
			bbar		: Ext.create('Ext.PagingToolbar', {
				pageSize		: 5,
				store			: store_sched,
				displayInfo		: true,
				listeners 		: {
					afterrender: function (cmp) {
						cmp.getComponent("refresh").hide();
						cmp.getComponent("first").hide();
						cmp.getComponent("last").hide();
					}
				}
			})
		});

		

	finishgood_plan.getStore().on('load', function() {
        finishgood_plan.getView().stripeRows 			= true;
		finishgood_plan.getView().deferEmptyText 		= false;
		finishgood_plan.getView().enableTextSelection	= true;
        finishgood_plan.getView().emptyText = '<div class="empty-txt-main">Data Not Available.</div>';
        finishgood_plan.getView().refresh();
    });
});