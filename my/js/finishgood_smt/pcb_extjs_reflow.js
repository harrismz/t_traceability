Ext.onReady(function() {

	//	=======================================================	MODEL 		=====================================
		//	REFLOW
				Ext.define('model_smt_reflow',{
	                extend: 'Ext.data.Model',
	                fields: ['board_id', 'scan_date', 'reflow_start_time', 'reflow_end_time','boardlen','diffdate','pcbid']
	           	});
           	
	//	=======================================================	DATASTORE 	=====================================
		//	REFLOW
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
		//	REFLOW
				var grid_smt_reflow = Ext.create('Ext.grid.Panel', {
					id 			: 'grid_smt_reflow',
					autoWidth 	: '100%',
					maxHeight	: 290,
					minHeight 	: 150,
					columnLines : true,
					store 		: store_smt_reflow,
					viewConfig 	: {
						stripeRows 			: true,
						emptyText 			: '<div class="empty-txt">No data to display.</div>',
						deferEmptyText 		: false,
						enableTextSelection : true
					},
					columns: [
						{
							header: 'BOARD ID',
							dataIndex: 'board_id',
							minWidth: 200,
							renderer: upsize
						}, {
							header: 'REFLOW DATE',
							dataIndex: 'scan_date',
							flex: 1,
							renderer: upsize
						}, {
							header: 'IN',
							dataIndex: 'reflow_start_time',
							flex: 1,
							renderer: upsize
						}, {
							header: 'OUT',
							dataIndex: 'reflow_end_time',
							flex: 1,
							renderer: upsize
						}, {
							header: 'PCB ID',
							dataIndex: 'pcbid',
							flex: 1,
							renderer: upsize
						}
					],
					bbar	: Ext.create('Ext.PagingToolbar', {
						pageSize		: itemperpage,
						store			: store_smt_reflow,
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
			
	//	=======================================================	 PANEL	=====================================
			//	REFLOW
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