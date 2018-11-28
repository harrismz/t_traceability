Ext.onReady(function() {

//	=======================================================    MODEL        =====================================
	Ext.define('model_bigs', {
		extend: 'Ext.data.Model',
		fields: [ 'side', 'cavity', 'line', 'model', 'pwbname','pwbno', 'process', 'qty', 'ynumber', 'start_serial']
	});
//	=======================================================    DATASTORE    =====================================
	var store_bigs = Ext.create('Ext.data.Store', {
		storeId : 'store_bigs',
		model: 'model_bigs',
		pageSize : itemperpage,
		proxy: {
			type: 'ajax',
			url: 'json/finishgood_smt/json_finishgood_smt_bigs.php',
			reader: {
				type: 'json',
				root: 'rows',
				totalProperty: 'totalCount'
			},
			load: false
		},
		listeners: {
			load: function(store, records) {
				if (records != "") {
					cavity 	= store.getAt(0).get('cavity');
					model   = store.getAt(0).get('model');
					pwbname = store.getAt(0).get('pwbname');
					//line 	= store.getAt(0).get('line');
					boardid = document.getElementById('pcbserial').value;
					
					Ext.getStore('store_smt_mounter_header').proxy.setExtraParam('boardid', boardid);
					Ext.getStore('store_smt_mounter_header').loadPage(1);

					Ext.getStore('store_mapros_board').proxy.setExtraParam('boardid', boardid);
					Ext.getStore('store_mapros_board').proxy.setExtraParam('cavity', cavity);
					Ext.getStore('store_mapros_board').proxy.setExtraParam('model', model);
					Ext.getStore('store_mapros_board').proxy.setExtraParam('pwbname', pwbname);
					//Ext.getStore('store_mapros_board').proxy.setExtraParam('line', line);
					Ext.getStore('store_mapros_board').loadPage(1);

					Ext.getStore('store_mapros_master').proxy.setExtraParam('boardid', boardid);
					Ext.getStore('store_mapros_master').proxy.setExtraParam('cavity', cavity);
					Ext.getStore('store_mapros_master').loadPage(1);

					Ext.getStore('store_mapros_panel').proxy.setExtraParam('boardid', boardid);
					Ext.getStore('store_mapros_panel').proxy.setExtraParam('cavity', cavity);
					Ext.getStore('store_mapros_panel').loadPage(1);
					
				} else {
					Ext.Msg.alert('Warning', 'No Data Found ! <br> Please try again with the correct PCB ID.');
				}
			}
		}
	});
//	=======================================================    GRID         =====================================
	var grid_bigs = Ext.create('Ext.grid.Panel', {
		id 			: 'grid_bigs',
		renderTo 	: 'panel_bigs',
		columnLines	: true,
		maxHeight 	: 300,
		minHeight 	: 150,
		store 		: store_bigs,
		viewConfig	: {
			stripeRows 			: true,
			emptyText 			: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText 		: false,
			enableTextSelection : true
		},
		columns 	: [
			{	header 	 : 'schedule_id',
				dataIndex: 'schedule_id',
				width 	 : 50,
				renderer : upsize,
				hidden	 : true
			}, 	
			{	header 	 : 'lot_size',
				dataIndex: 'lot_size',
				width 	 : 85,
				renderer : upsize,
				hidden	 : true
			}, 
			{	header 	 : 'model_code',
				dataIndex: 'model_code',
				width 	 : 125,
				renderer : upsize,
				hidden	 : true
			},
			{ 	header 	 : 'prod_no_code',
				dataIndex: 'prod_no_code',
				width 	 : 70,
				renderer : upsize,
				hidden	 : true
			},
			{ 	header 	 : 'YNUMBER',
				dataIndex: 'ynumber',
				componentCls: 'headergrid',
				width 	 : 100,
				renderer : upsize
			}, 
			{ 	header 	 : 'SIDE',
				dataIndex: 'side',
				componentCls: 'headergrid',
				width 	 : 60,
				renderer : upsize
			},
			{ 	header 	 : 'CAVITY',
				dataIndex: 'cavity',
				componentCls: 'headergrid',
				width 	 : 70,
				renderer : upsize
			}, 
			// { 	header 	 : 'SEQ START',
			// 	dataIndex: 'seq_start',
			// 	width 	 : 70,
			// 	renderer : upsize
			// }, 
			// { 	header 	 : 'SEQ END',
			// 	dataIndex: 'seq_end',
			// 	width 	 : 70,
			// 	renderer : upsize
			// }, 
			{ 	header 	 : 'LINE',
				dataIndex: 'line',
				componentCls: 'headergrid',
				width 	 : 60,
				renderer : upsize
			}, 
			{ 	header 	 : 'MODEL',
				dataIndex: 'model',
				componentCls: 'headergrid',
				width 	 : 120,
				renderer : upsize
			}, 
			{ 	header 	 : 'PWB NAME',
				dataIndex: 'pwbname',
				componentCls: 'headergrid',
				flex 	 : 1,
				renderer : upsize
			}, 
			{ 	header 	 : 'PROD NO',
				dataIndex: 'prod_no',
				componentCls: 'headergrid',
				flex 	 : 1,
				renderer : upsize
			}, 
			{ 	header 	 : 'PROCESS',
				dataIndex: 'process',
				componentCls: 'headergrid',
				flex 	 : 1,
				renderer : upsize
			}, 
			{ 	header 	 : 'rev_date',
				dataIndex: 'rev_date',
				flex 	 : 1,
				renderer : upsize,
				hidden	 : true
			}, 
			{ 	header 	 : 'QUANTITY',
				dataIndex: 'qty',
				componentCls: 'headergrid',
				flex 	 : 1,
				renderer : upsize
			}
		],
		bbar	: Ext.create('Ext.PagingToolbar', {
			pageSize		: itemperpage,
			store			: store_bigs,
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

});