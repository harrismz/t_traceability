Ext.onReady(function() {

//	=======================================================    MODEL    =========================================
	//	BOARD ID GENERATOR
		Ext.define('model_bigs', {
			extend: 'Ext.data.Model',
			//fields: ['schedule_id', 'lot_size', 'model_code', 'prod_no_code', 'side', 'cavity', 'seq_start', 'seq_end', 'line', 'model', 'pwbname', 'pwbno', 'process', 'rev_date', 'qty', 'ynumber', 'start_serial']
			//fields: [ 'side', 'cavity', 'seq_start', 'seq_end', 'line', 'model', 'pwbname', 'process', 'qty', 'ynumber', 'start_serial']
			fields: [ 'side', 'cavity', 'line', 'model', 'pwbname', 'process', 'qty', 'ynumber', 'start_serial']
		});
		// 	Ext.define('model_bigs', {
			// 		extend: 'Ext.data.Model',
			// 		fields: ['id', 'cavity', 'model', 'model_code', 'process', 'prod_no', 'prod_no_code', 'pwbname', 'pwbno', 'ynumber', 'side', 'model_id', 'start_serial', 'lot_size', 'seq_start', 'seq_end', 'qty', 'history_id', 'schedule_id', 'line', 'rev_date' ]
			// 	});

//	=======================================================    DATASTORE    =====================================
	//	BOARD ID GENERATOR
		var store_bigs = Ext.create('Ext.data.Store', {
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
						model 	= store.getAt(0).get('model');
						proces	= store.getAt(0).get('process');
						pwbno	= store.getAt(0).get('pwbno');
						cavity 	= store.getAt(0).get('cavity');
						boardid = Ext.getCmp('boardid_scan').getValue();
						
						store_smt_mounter_header.proxy.setExtraParam('boardid', boardid);
						store_smt_mounter_header.loadPage(1);

						store_mapros_board.proxy.setExtraParam('boardid', boardid);
						store_mapros_board.proxy.setExtraParam('cavity', cavity);
						store_mapros_board.loadPage(1);

						store_mapros_master.proxy.setExtraParam('boardid', boardid);
						store_mapros_master.proxy.setExtraParam('cavity', cavity);
						store_mapros_master.loadPage(1);

						store_mapros_panel.proxy.setExtraParam('boardid', boardid);
						store_mapros_panel.proxy.setExtraParam('cavity', cavity);
						store_mapros_panel.loadPage(1);
						
					} else {
						Ext.Msg.alert('Warning', 'No Data Found ! <br> Please try again with the correct PCB ID.');
					}
				}
			}
		});
		// var store_bigs = Ext.create('Ext.data.Store', {
			// 	model 		: 'model_bigs',
			// 	pageSize  	: itemperpage,
			// 	singleton  	: true,
			//     alternateClassName : 'AppBaseUrl',
			//     requires 	:['Ext.Ajax'],
			//  	disableChacing:false,
			//     config 		: {
			//         baseUrl 	:'http://svrdbn/big24/public/api/dashboards'
			//     },
			 
			//     constructor  : function(config) {
			//             this.initConfig(config);
			//             Ext.Ajax.on('beforerequest', this.onBeforeAjaxRequest, this);
			//     },
			 
			//     onBeforeAjaxRequest : function(connection, options) {
			//               options.url = this.getBaseUrl() + options.url;
			//     }
			// });
		// var store_bigs = Ext.create('Ext.data.Store', {
			// 	model      :  "model_bigs",
			//          id          :  "store_bigs",
			//          autoLoad    :  false,
			//          remoteSort  :  true,
			//          pageSize    :  10,
			//          proxy       :  {
			// 		type            : "ajax",
			// 		url             : "http://136.198.117.48/big24/public/api/dashboards",
			// 		limitParam      : undefined,
			// 		startParam      : undefined,
			// 		simpleSortMode  : true,
			// 		pageParam       : undefined,
			// 		noCache         : false,
			// 		actionMethods   : {
			// 		   method  : "POST"
			// 		},
			// 		reader           : {
			// 		   type            : "json",
			// 		   root            : "data",
			// 		   totalProperty   : "total"
			// 		}
			//         	}
			// });

//	=======================================================    GRID    ==========================================
	//	BOARD ID GENERATOR
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
					width 	 : 100,
					renderer : upsize
				}, 
				{ 	header 	 : 'SIDE',
					dataIndex: 'side',
					width 	 : 60,
					renderer : upsize
				},
				{ 	header 	 : 'CAVITY',
					dataIndex: 'cavity',
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
					width 	 : 60,
					renderer : upsize
				}, 
				{ 	header 	 : 'MODEL',
					dataIndex: 'model',
					width 	 : 120,
					renderer : upsize
				}, 
				{ 	header 	 : 'PWB NAME',
					dataIndex: 'pwbname',
					flex 	 : 1,
					renderer : upsize
				}, 
				{ 	header 	 : 'PROD NO',
					dataIndex: 'prod_no',
					flex 	 : 1,
					renderer : upsize
				}, 
				{ 	header 	 : 'PROCESS',
					dataIndex: 'process',
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

//	=======================================================  TAB  PANEL    =========================================
	//	BOARD ID GENERATOR
	// var panel_bigs = Ext.create('Ext.panel.Panel', {
	// 	id 				:'panel_bigs',
	// 	renderTo 		: 'panel_bigs',
	// 	width			: '100%',
	// 	layout 			: {
	// 		type: 'fit',
	// 		align: 'stretch',
	// 		pack: 'center'	
	// 	},
	// 	height			: 100,
	// 	border			: false,
	// 	frame			: true,
	// 	hidden			: false,
	// 	defaults		: {
	// 		split		: true,
	// 		collapsible	: false
	// 	},
	// 	items			: [grid_bigs]
	// });
});