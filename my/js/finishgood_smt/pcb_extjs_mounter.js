Ext.onReady(function() {

	//	=======================================================	MODEL 		=====================================
		//	MOUNTER
				Ext.define('model_smt_mounter_header',{
	                extend: 'Ext.data.Model',
					fields: ['line','boardid','datein','dateout']
	           	});
				Ext.define('model_smt_mounter',{
	                extend: 'Ext.data.Model',
					fields: ['row','line','boardid','model','pwbno','pwbname','process','lotno',
	                			'datein','dateout','jobno','partloc','mode','partno','feeder',
	                			'feederserial','feederno','compid1','scandate','lot']
	           	});
	           	
           	
	//	=======================================================	DATASTORE 	=====================================
		//	MOUNTER
				var store_smt_mounter_header = Ext.create('Ext.data.Store',{
					storeId : 'store_smt_mounter_header',
					model	: 'model_smt_mounter_header',
					autoLoad: false,
					proxy   : {
						type    : 'ajax',
						url     : 'json/finishgood_smt/json_good_smt_mounter_header.php',
						reader  : {
							type    : 'json',
							root    : 'rows'
						}
					}
				});
				var store_smt_mounter = Ext.create('Ext.data.Store',{
					storeId : 'store_smt_mounter',
					model	: 'model_smt_mounter',
					autoLoad: false,
					pageSize: itemperpage,
					proxy   : {
						type    : 'ajax',
						url     : 'json/finishgood_smt/json_good_smt_mounter.php',
						extraParams: {
							boardid: '123456789012345678901234'
						},
						reader  : {
							type    : 'json',
							root    : 'rows',
							totalProperty: 'totalCount'
						}
					}
				});
			
	//	=======================================================	GRID 		=====================================
		//	MOUNTER
				var grid_smt_mounter_header = Ext.create('Ext.grid.Panel', {
					id 				: 'grid_smt_mounter_header',
					maxHeight		: 250,
					minHeight 		: 80,
					store 			: store_smt_mounter_header,
					viewConfig 		: {
						stripeRows 			: true,
						emptyText 	 		: '<div class="empty-txt">No data to display.</div>',
						deferEmptyText 		: false,
						enableTextSelection	: true
					},
					columns 	: [
						{ 	header : 'LINE',			dataIndex : 'line', 		flex : 1, 	renderer : upsize },
						{ 	header : 'BOARD',			dataIndex : 'boardid',		flex : 1,	renderer : upsize,	hidden : true },
						{ 	header : 'BOARD IN', 		dataIndex : 'datein', 		flex : 1, 	renderer : upsize },
						{ 	header : 'BOARD OUT', 		dataIndex : 'dateout', 		flex : 1, 	renderer : upsize }
					],
					listeners: {
			    		select: function(grid, rowIndex, colIndex) {
			    			var rec = this.getSelectionModel().getSelection();
			    			var boardid = rec[0].data.boardid;
			    			Ext.getStore('store_smt_mounter').proxy.setExtraParam('boardid', boardid);
							Ext.getStore('store_smt_mounter').loadPage(1);
			    		}
			    	}
				});
				var grid_smt_mounter = Ext.create('Ext.grid.Panel', {
					id 				: 'grid_smt_mounter',
					 maxHeight		: 400,
					 minHeight 		: 150,
					store 			: store_smt_mounter,
					viewConfig 		: {
						stripeRows 			: true,
						emptyText 	 		: '<div class="empty-txt">Select Header for Show this data.</div>',
						deferEmptyText 		: false,
						enableTextSelection	: true
					},
					columns 	: [
						{ 	header : 'NO',				dataIndex : 'row', 			width : 50,		renderer : upsize },
						{ 	header : 'SCAN DATE', 		dataIndex : 'scandate', 	width : 90,		renderer : upsize },
						{ 	header : 'BOARD',			dataIndex : 'boardid',		width : 200,	renderer : upsize,	hidden : true },
						{ 	header : 'MODEL',			dataIndex : 'model',		width : 120,	renderer : upsize,	hidden : true },
						{ 	header : 'PWB NO', 			dataIndex : 'pwbno', 		width : 100, 	renderer : upsize,	hidden : true },
						{ 	header : 'PWV NAME', 		dataIndex : 'pwbname', 		width : 75, 	renderer : upsize,	hidden : true },
						{ 	header : 'PROCESS', 		dataIndex : 'process', 		width : 90, 	renderer : upsize,	hidden : true },
						{ 	header : 'LOT NO', 			dataIndex : 'lotno', 		width : 75, 	renderer : upsize,	hidden : true },
						{ 	header : 'LOCATION', 		dataIndex : 'partloc', 		width : 90, 	renderer : upsize },
						{ 	header : 'MODE',			dataIndex : 'mode', 		width : 75,		renderer : upsize },
						{ 	header : 'PARTNO', 			dataIndex : 'partno', 		width : 120, 	renderer : upsize },
						{ 	header : 'FEEDER', 			dataIndex : 'feeder', 		width : 75, 	renderer : upsize },
						{ 	header : 'FEEDER SERIAL', 	dataIndex : 'feederserial',	width : 130,	renderer : upsize },
						{ 	header : 'FEEDER NO', 		dataIndex : 'feederno', 	width : 100,	renderer : upsize },
						{ 	header : 'SCANNING', 		dataIndex : 'compid1', 		width : 140,	renderer : upsize },
						{ 	header : 'LOT', 			dataIndex : 'lot', 			width : 90,		renderer : upsize },
						{ 	header : 'JOBNO', 			dataIndex : 'jobno', 		width : 150, 	renderer : upsize }
					],
					bbar	: Ext.create('Ext.PagingToolbar', {
						pageSize		: itemperpage,
						store			: store_smt_mounter,
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
			//	MOUNTER
				var panel_mounter = Ext.create('Ext.panel.Panel',{
			    	id 			: 'panel_mounter',
					renderTo 	: 'panel_mounter',
					//autoWidth	: '100%',
					maxHeight	: 550,
					minHeight 	: 150,
					//border		: false,
					 //frame		: true,
					// hidden		: false,
				 //    layout		: 'fit',
				 //   	defaults	: {
					//      split: false,
					//      plain: true
				 //    },
				   	items		: [{
					   region	: 'north', // GRID SIDE
					   layout	: 'fit',
					   items	: [grid_smt_mounter_header]
					   }, {
					   region	: 'center', // GRID SIDE
					   layout	: 'fit',
					   title 	: '<div style="text-align:center;">==== &nbsp; DETAIL &nbsp; ====</div>',
					   items	: [grid_smt_mounter]
					   }]
			  	});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
			
});