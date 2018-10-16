	Ext.Loader.setConfig({ enabled: true });
	Ext.Loader.setPath('Ext.ux', '../framework/extjs-6.2.0/packages/ux/classic/src');
	Ext.Loader.setPath('Ext.ajax', '../framework/extjs-6.2.0/packages/ux/src');
	
	Ext.override(Ext.form.TextField, {
		enableKeyEvents: true,
		onKeyUp: function(e, o) {
			var value = this.getValue().toUpperCase();
			this.setValue(value);
			this.fireEvent('keyup', this, e);
		}
	});

	//function untuk fontsize grid
	function upsize(val) {
		var x = val;
		if (x == '' || x == '-'){
			return '<font class="fontsize12" style="color:red;font-weight: bold;"> --- </font>';
		}
		else if (x == 'NG'){
			return '<font class="fontsize12" style="color:red;font-weight: bold;"> ' + x + ' </font>';
		}
		else if (x == 'OK' || x == 'PASS' || x == 'SOLDER' || x == 'GOOD'){
			return '<font class="fontsize12" style="color:green;font-weight: bold;"> ' + x + ' </font>';
		}
		else{
			return '<font class="fontsize12">' + x + '</font>';
		};
	}
	function spimchjudge(val) {
		var x = val;
		if (x == '' || x == '-'){
			return '<font class="fontsize12" style="color:red;font-weight: bold;"> --- </font>';
		}
		else if (x == '2'){
			return '<font class="fontsize12" style="color:red;font-weight: bold;"> NG </font>';
		}
		else if (x == '0'){
			return '<font class="fontsize12" style="color:green;font-weight: bold;"> OK </font>';
		}
		else{
			return '<font class="fontsize12">' + x + '</font>';
		};
	}
	function spiopjudge(val) {
		var x = val;
		if (x > '0'){
			return '<font class="fontsize12" style="color:red;font-weight: bold;"> Unknown </font>';
		}
		else if (x == '0' || x == ''){
			return '<font class="fontsize12" style="color:green;font-weight: bold;"> OK </font>';
		}
		else{
			return '<font class="fontsize12">' + x + '</font>';
		};
	}


	//function mode for part im navigation
	function mode(val) {
		if (val == "Mode2") {
			return '<font class="upsize">CHANGE PART</font>';
		}
		else if (val === "Mode3") {
			return '<font class="upsize">CHECK PART NON SEQUENTIAL</font>';
		}
		else if (val === "Mode4") {
			return '<font class="upsize">CHECK PART SEQUENTIAL</font>';
		}
		else {
			return '<font class="upsize">CHANGE FEEDER</font>';
		}
	}

	function fileimage(val) {
		return '<a href="detailpic/' + val + '" target="_blank"> <img style="max-width:120px; max-height:120px;" src="detailpic/' + val + '" /> </a>';
	}

	// Start
	Ext.onReady(function() {

		//	=======================================================    VARIABLE    =======================================
			// configure whether filter query is encoded or not (initially)
			var encode = false;

			// configure whether filtering is performed locally or remotely (initially)
			var local = true;
			Ext.QuickTips.init();

			//	end function untuk column bigsize
			var itemperpage = 10;
			var date 		= new Date();
			
		//	=======================================================    MODEL    =========================================
			//	BOARD ID GENERATOR
				Ext.define('model_bigs', {
					extend: 'Ext.data.Model',
					fields: ['schedule_id', 'lot_size', 'model_code', 'prod_no_code', 'side', 'cavity', 'seq_start', 'seq_end', 'line', 'model', 'pwbname', 'pwbno', 'process', 'rev_date', 'qty', 'ynumber', 'start_serial']
				});
			//	AOI
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
			//	REFLOW
				Ext.define('model_smt_reflow',{
	                extend: 'Ext.data.Model',
	                fields: ['board_id', 'scan_date', 'reflow_start_time', 'reflow_end_time','boardlen','diffdate','pcbid']
	           	});
           	//	MOUNTER
				Ext.define('model_smt_mounter',{
	                extend: 'Ext.data.Model',
					fields: ['mjsid','puside','partloc','jobno','model','board','pwbno','process',
	                			'mode','partno','feeder','feederserial','feederno','compid1','compid2',
	                			'compid3','compid4','compid5','scandate']
	           	});
           	//	SPI
				Ext.define('model_smt_spi',{
	                extend: 'Ext.data.Model',
					fields: ['mchname','inspectiondatetime','inspectiondate','inspectiontime','filename',
							'pcbid','barcode','spijudge','opjudge','defectcnt']
	           	});
			//	MAPROS
				Ext.define('model_mapros_board',{
	                extend: 'Ext.data.Model',
	                fields: ['board_id','guid_master','guid_ticket','modelname','lotno',
							'scanner_id','status','scan_nik','judge','created_at','updated_at','lineprocess','line']
	           	});
				Ext.define('model_mapros_panel',{
	                extend: 'Ext.data.Model',
	                fields: ['ticket_no','guid_master','guid_ticket','modelname',
							'scanner_id','status','scan_nik','judge','created_at','updated_at','lineprocess','line']
	           	});
				Ext.define('model_mapros_master',{
	                extend: 'Ext.data.Model',
	                fields: ['ticket_no_master','guid_master','modelname',
							'scanner_id','status','scan_nik','judge','created_at','updated_at','lineprocess','line']
	           	});
				Ext.define('model_mapros_avmt',{
	                extend: 'Ext.data.Model',
	                fields: ['ticket_no_master','guid_master','modelname',
							'scanner_id','status','scan_nik','judge','created_at','updated_at','lineprocess','line']
	           	});

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
								
								store_smt_mounter.proxy.setExtraParam('model', model);
								store_smt_mounter.proxy.setExtraParam('process', proces);
								store_smt_mounter.proxy.setExtraParam('pwbno', pwbno);
								store_smt_mounter.loadPage(1);

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
			//	AOI
				var store_good_smt_aoi_board = Ext.create('Ext.data.Store',{
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
					// ,listeners : {
					// 	load : function(store, records){
					// 		if (records != 0) {
					// 			aoidate = store.getAt(0).get('stdate');
					// 			get_boardid = Ext.getCmp('boardid_scan').getValue();

					// 			store_smt_reflow.proxy.setExtraParam('boardid', get_boardid);
					// 			store_smt_reflow.proxy.setExtraParam('smt_date', aoidate);
					// 			store_smt_reflow.loadPage(1);
					// 		}
							

					// 	} 
					// }
				});
				var store_good_smt_aoi_point = Ext.create('Ext.data.Store',{
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
			//	REFLOW
				var store_smt_reflow = Ext.create('Ext.data.Store',{
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
			//	MOUNTER
				var store_smt_mounter = Ext.create('Ext.data.Store',{
					model	: 'model_smt_mounter',
					autoLoad: false,
					pageSize: itemperpage,
					proxy   : {
						type    : 'ajax',
						url     : 'json/finishgood_smt/json_good_smt_mounter.php',
						reader  : {
							type    : 'json',
							root    : 'rows',
							totalProperty: 'totalCount'
						}
					}
				});
			//	SPI
				var store_smt_spi = Ext.create('Ext.data.Store',{
					model	: 'model_smt_spi',
					autoLoad: false,
					pageSize: itemperpage,
					proxy   : {
						type    : 'ajax',
						url     : 'json/finishgood_smt/json_good_smt_spi.php',
						reader  : {
							type    : 'json',
							root    : 'rows',
							totalProperty: 'totalCount'
						}
					},
					listeners : {
						load : function(store, records){
							if (records != 0) {
								//alert (store.getAt(0).get('inspectiondate'));
								 get_boardid = Ext.getCmp('boardid_scan').getValue();
								 spidate = store.getAt(0).get('inspectiondate');

								 //alert (get_boardid + spidate);
								store_smt_reflow.proxy.setExtraParam('boardid', get_boardid);
								store_smt_reflow.proxy.setExtraParam('smt_date', spidate);
								store_smt_reflow.loadPage(1);
							}
							

						} 
					}
				
				});
			//	MAPROS
				var store_mapros_board = Ext.create('Ext.data.Store',{
					model	: 'model_mapros_board',
					autoLoad: false,
					pageSize: itemperpage,
					proxy   : {
						type    : 'ajax',
						url     : 'json/finishgood_smt/json_good_smt_mapros_board.php',
						reader  : {
							type    : 'json',
							root    : 'rows'
						}
					}
				});
				var store_mapros_panel = Ext.create('Ext.data.Store',{
					model	: 'model_mapros_panel',
					autoLoad: false,
					pageSize: itemperpage,
					proxy   : {
						type    : 'ajax',
						url     : 'json/finishgood_smt/json_good_smt_mapros_panel.php',
						reader  : {
							type    : 'json',
							root    : 'rows'
						}
					}
				});
				var store_mapros_master = Ext.create('Ext.data.Store',{
					model	: 'model_mapros_master',
					autoLoad: false,
					pageSize: itemperpage,
					proxy   : {
						type    : 'ajax',
						url     : 'json/finishgood_smt/json_good_smt_mapros_master.php',
						reader  : {
							type    : 'json',
							root    : 'rows'
						}
					}
				});
				var store_mapros_avmt = Ext.create('Ext.data.Store',{
					model	: 'model_mapros_avmt',
					autoLoad: false,
					pageSize: itemperpage,
					proxy   : {
						type    : 'ajax',
						url     : 'json/finishgood_smt/json_good_smt_mapros_avmt.php',
						reader  : {
							type    : 'json',
							root    : 'rows'
						}
					}
				});

		//	=======================================================    GRID    ==========================================
			
			//	BOARD ID GENERATOR
					var grid_bigs = Ext.create('Ext.grid.Panel', {
						id 			: 'grid_bigs',
						renderTo 	: 'panel_bigs',
						columnLines	: true,
						maxHeight 	: 300,
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
								width 	 : 90,
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
							{ 	header 	 : 'SEQ START',
								dataIndex: 'seq_start',
								width 	 : 70,
								renderer : upsize
							}, 
							{ 	header 	 : 'SEQ END',
								dataIndex: 'seq_end',
								width 	 : 70,
								renderer : upsize
							}, 
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
							{ 	header 	 : 'PWB NO',
								dataIndex: 'pwbno',
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
			//	AOI
					var grid_smt_aoi_board = Ext.create('Ext.grid.Panel', {
						id 			: 'grid_smt_aoi_board',
						name		: 'grid_smt_aoi_board',
						autoWidth 	: '100%',
						maxHeight	: 330,
						columnLines : true,
						store 		: store_good_smt_aoi_board,
						viewConfig 	: {
							stripeRows 			: true,
							emptyText 			: '<div class="empty-txt">No data to display.</div>',
							deferEmptyText 		: false,
							enableTextSelection : true
						},
						columns: [
							{ 	header 		: 'BARCODE',
								dataIndex 	: 'barcode',
								width 	 	: 135,
								renderer 	: upsize
							},
							{ 	header 		: 'MCH NAME',
								dataIndex 	: 'linkedserver',
								width 	 	: 90,
								renderer 	: upsize
							}, 
							{ 	header 		: 'PCB ID',
								dataIndex 	: 'pcbid',
								width 	 	: 75,
								renderer 	: upsize,
								hidden  	: true
							}, 
							{ 	header 		: 'PCB GUID',
								dataIndex 	: 'pcbguid',
								flex 		: 1,
								renderer 	: upsize,
								hidden  	: true
							}, 
							{ 	header 		: 'START DATE',
								dataIndex 	: 'stdate',
								flex 		: 1,
								renderer 	: upsize
							},
							{ 	header 		: 'END DATE',
								dataIndex 	: 'enddate',
								flex 		: 1,
								renderer 	: upsize,
								filters 	: {
									type 	: 'string'
								}
							}, 
							{ 	header 		: 'MCH JUDGE',
								dataIndex 	: 'aoijudgment',
								flex 		: 1,
								renderer 	: upsize
							}, 
							{ 	header 		: 'OP JUDGE',
								dataIndex 	: 'userjudgment',
								flex 		: 1,
								renderer 	: upsize
							}
						],
						bbar	: Ext.create('Ext.PagingToolbar', {
							pageSize		: itemperpage,
							store			: store_good_smt_aoi_board,
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
						//features: [filters],
						// selModel: {
						// 	selType: 'cellmodel'
						// },
						// plugins: [cellEditing]
					});
					var grid_smt_aoi_point = Ext.create('Ext.grid.Panel', {
						id 				: 'grid_smt_aoi_point',
						autoWidth 	 	: '100%',
						maxHeight		: 330,
						columnLines 	: true,
						store 			: store_good_smt_aoi_point,
						viewConfig 		: {
							stripeRows 	 		: true,
							emptyText 			: '<div class="empty-txt">No data to display.</div>',
							deferEmptyText 		: false,
							enableTextSelection : true
						},
						columns: [
							{ 	header 		: 'BARCODE',
								dataIndex 	: 'barcode',
								width 	 	: 135,
								renderer 	: upsize
							}, 
							{ 	header 		: 'MCH NAME',
								dataIndex 	: 'linkedserver',
								width 	 	: 90,
								renderer 	: upsize
							}, 
							{ 	header 		: 'PCB ID',
								dataIndex 	: 'pcbid',
								width 	 	: 75,
								renderer 	: upsize,
								hidden  	: true
							}, 
							{ 	header 		: 'PCB GUID',
								dataIndex 	: 'pcbguid',
								flex 		: 1,
								renderer 	: upsize,
								hidden  	: true
							}, 
							{ 	header 		: 'COMPONENT GUID',
								dataIndex 	: 'componentguid',
								flex 		: 1,
								renderer 	: upsize,
								hidden 		: true
							}, 
							{ 	header 		: 'UNAME',
								dataIndex 	: 'uname',
								width 	 	: 75,
								renderer 	: upsize,
								hidden  	: true
							}, 
							{ 	header 		: 'INSP START',
								dataIndex 	: 'stdate',
								flex 		: 1,
								renderer 	: upsize
							},
							{ 	header 		: 'INSP END',
								dataIndex 	: 'enddate',
								flex 		: 1,
								renderer 	: upsize,
								filters 	: {
									type 	: 'string'
								}
							}, 
							{ 	header 		: 'PART NO',
								dataIndex 	: 'partno',
								width 		: 180,
								renderer 	: upsize,
								filter 		: {
									type 	: 'string'
								}
							}, 
							{ 	header 		: 'PART NAME',
								dataIndex 	: 'partname',
								flex 		: 1,
								renderer 	: upsize
							}, 
							{ 	header 		: 'IMAGE',
								dataIndex 	: 'image2d',
								text 		: this.i18nColIconBmp,
								width 		: 100,
								renderer 	: function(value, metaData, record, rowIndex, colIndex, store) {
									if ( !value ){
										return '<font class="fontsize12" style="color:red;font-weight: bold;"> No Image </font>';
									}
									else{
										return '<img src="data:image/jpg;base64,' + value +  '" width="80"/>';
									}
									
								}
							}, 
							{ 	header 		: 'MCH JUDGE',
								dataIndex 	: 'aoijudgment',
								flex 		: 1,
								renderer 	: upsize
							}, 
							{ 	header 		: 'OP JUDGE',
								dataIndex 	: 'userjudgment',
								flex 		: 1,
								renderer 	: upsize
							}
						],
						bbar	: Ext.create('Ext.PagingToolbar', {
							pageSize		: itemperpage,
							store			: store_good_smt_aoi_point,
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
						//features: [filters],
						// selModel: {
						// 	selType: 'cellmodel'
						// },
						// plugins: [cellEditing]
					});
			//	REFLOW
					var grid_smt_reflow = Ext.create('Ext.grid.Panel', {
						id 			: 'grid_smt_reflow',
						autoWidth 	: '100%',
						maxHeight	: 290,
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
								flex: 1,
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
						//features: [filters],
						// selModel: {
						// 	selType: 'cellmodel'
						// },
						// plugins: [cellEditing]
					});
			//	MOUNTER
					var grid_smt_mounter = Ext.create('Ext.grid.Panel', {
						id 				: 'grid_smt_mounter',
						autoWidth 		: '100%',
						maxHeight		: 350,
						columnLines 	: true,
						store 			: store_smt_mounter,
						viewConfig 		: {
							stripeRows 			: true,
							emptyText 	 		: '<div class="empty-txt">No data to display.</div>',
							deferEmptyText 		: false,
							enableTextSelection	: true
						},
						columns 	: [
							{ 	header 		: 'MJS ID',
								dataIndex 	: 'mjsid',
								width 		: 140,
								renderer	: upsize
							},
							{ 	header 		: 'PART LOC',
								dataIndex 	: 'partloc',
								width 		: 70,
								renderer	: upsize
							},
							{ 	header 		: 'BOARD',
								dataIndex 	: 'board',
								width 		: 100,
								renderer	: upsize
							},
							{ 	header 		: 'MODE',
								dataIndex 	: 'mode',
								width 		: 70,
								renderer	: upsize
							},
							{ 	header 		: 'PART NO',
								dataIndex 	: 'partno',
								width 		: 130,
								renderer	: upsize
							},
							{ 	header 		: 'FEEDER',
								dataIndex 	: 'feeder',
								width 		: 75,
								renderer	: upsize
							},
							{ 	header 		: 'FEEDER<br>SERIAL',
								dataIndex 	: 'feederserial',
								width 		: 130,
								renderer	: upsize
							},
							{ 	header 		: 'FEEDER NO',
								dataIndex 	: 'feederno',
								width 		: 130,
								renderer	: upsize
							},
							
							{ 	header 		: 'SCAN DATE',
								dataIndex 	: 'scandate',
								width 		: 90,
								renderer	: upsize
							},
							{ 	header 		: 'JOB NO',
								dataIndex 	: 'jobno',
								width 		: 180,
								renderer	: upsize
							},
							{ 	header 		: 'puside',
								dataIndex 	: 'puside',
								width 		: 90,
								renderer	: upsize,
								hidden		: true
							},
							{ 	header 		: 'PWB NO',
								dataIndex 	: 'pwbno',
								flex 		: 1,
								renderer	: upsize,
								hidden		: true
							},
							{ 	header 		: 'PROCESS',
								dataIndex 	: 'process',
								flex 		: 1,
								renderer	: upsize,
								hidden		: true
							},
							{ 	header 		: 'compid1',
								dataIndex 	: 'compid1',
								flex 		: 1,
								renderer	: upsize,
								hidden		: true
							},
							{ 	header 		: 'compid2',
								dataIndex 	: 'compid2',
								flex 		: 1,
								renderer	: upsize,
								hidden		: true
							},
							{ 	header 		: 'compid3',
								dataIndex 	: 'compid3',
								flex 		: 1,
								renderer	: upsize,
								hidden		: true
							},
							{ 	header 		: 'compid4',
								dataIndex 	: 'compid4',
								flex 		: 1,
								renderer	: upsize,
								hidden		: true
							},
							{ 	header 		: 'compid5',
								dataIndex 	: 'compid5',
								flex 		: 1,
								renderer	: upsize,
								hidden		: true
							},
							{ 	header 		: 'MODEL',
								dataIndex 	: 'model',
								flex 		: 1,
								renderer	: upsize,
								hidden		: true
							}
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
						//features: [filters],
						// selModel: {
						// 	selType: 'cellmodel'
						// },
						// plugins: [cellEditing]
					});
			//	SPI
					var grid_smt_spi = Ext.create('Ext.grid.Panel', {
						id 				: 'grid_smt_spi',
						autoWidth 		: '100%',
						maxHeight		: 290,
						columnLines 	: true,
						store 			: store_smt_spi,
						viewConfig 		: {
							stripeRows 			: true,
							emptyText 	 		: '<div class="empty-txt">No data to display.</div>',
							deferEmptyText 		: false,
							enableTextSelection	: true
						},
						columns 	: [
							{	header 		: 'BARCODE',
								dataIndex 	: 'barcode',
								flex 		: 1,
								renderer	: upsize
							},
							{	header 		: 'MCH NAME',
								dataIndex 	: 'mchname',
								width 		: 80,
								renderer	: upsize
							},
							{	header 		: 'INSP DATE',
								dataIndex 	: 'inspectiondatetime',
								flex 		: 1,
								renderer	: upsize
							},
							{	header 		: 'inspectiondate',
								dataIndex 	: 'inspectiondate',
								flex 		: 1,
								renderer	: upsize,
								hidden 		: true
							},
							{	header 		: 'inspectiontime',
								dataIndex 	: 'inspectiontime',
								flex 		: 1,
								renderer	: upsize,
								hidden 		: true
							},
							{	header 		: 'FILE NAME',
								dataIndex 	: 'filename',
								flex 		: 1,
								renderer	: upsize,
								hidden 		: true
							},
							{	header 		: 'PCB ID',
								dataIndex 	: 'pcbid',
								width 		: 70,
								renderer	: upsize,
								hidden 		: true
							},
							{	header 		: 'MCH JUDGE',
								dataIndex 	: 'spijudge',
								width 		: 80,
								renderer	: spimchjudge
							},
							{	header 		: 'OP JUDGE',
								dataIndex 	: 'opjudge',
								width 		: 80,
								renderer	: spiopjudge
							},
							{	header 		: 'DEFECT CNT',
								dataIndex 	: 'defectcnt',
								width 		: 80,
								renderer	: upsize
							}
						],
						bbar	: Ext.create('Ext.PagingToolbar', {
							pageSize		: itemperpage,
							store			: store_smt_spi,
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
						//features: [filters],
						// selModel: {
						// 	selType: 'cellmodel'
						// },
						// plugins: [cellEditing]
					});
			//	MAPROS
					var grid_mapros_board = Ext.create('Ext.grid.Panel', {
						id 				: 'grid_mapros_board',
						autoWidth 		: '100%',
						maxHeight		: 290,
						columnLines 	: true,
						store 			: store_mapros_board,
						viewConfig 		: {
							stripeRows 			: true,
							deferEmptyText 		: false,
							enableTextSelection	: true,
							getRowClass			: function(record, rowIndex, rowParams, store) {
								if (record.get('status')==='IN') return 'colorin';
								else if (record.get('status')==='OUT') return 'colorout';
							},
							emptyText 	 		: '<div class="empty-txt">No data to display.</div>',
						},
						columns 	: [
							{	header 		: 'BOARD ID',
								dataIndex 	: 'board_id',
								width 		: 140,
								renderer	: upsize
							},
							{	header 		: 'guid_master',
								dataIndex 	: 'guid_master',
								flex 		: 1,
								renderer	: upsize,
								hidden		: true
							},
							{	header 		: 'guid_ticket',
								dataIndex 	: 'guid_ticket',
								flex 		: 1,
								renderer	: upsize,
								hidden		: true
							},
							{	header 		: 'MODEL',
								dataIndex 	: 'modelname',
								flex 		: 1,
								renderer	: upsize
							},
							{	header 		: 'LINE',
								dataIndex 	: 'line',
								width 	 	: 90,
								renderer	: upsize
							},
							{	header 		: 'lotno',
								dataIndex 	: 'lotno',
								flex 		: 1,
								renderer	: upsize,
								hidden		: true
							},
							{	header 		: 'PROCESS',
								dataIndex 	: 'lineprocess',
								width 	 	: 90,
								renderer	: upsize
							},
							{	header 		: 'scanner_id',
								dataIndex 	: 'scanner_id',
								flex 		: 1,
								renderer	: upsize,
								hidden		: true
							},
							{	header 		: 'STATUS',
								dataIndex 	: 'status',
								width 	 	: 90,
								renderer	: upsize
							},
							{	header 		: 'JUDGE',
								dataIndex 	: 'judge',
								width 	 	: 90,
								renderer	: upsize
							},
							{	header 		: 'SCAN TIME',
								dataIndex 	: 'created_at',
								flex 		: 1,
								renderer	: upsize
							},
							{	header 		: 'SCAN NIK',
								dataIndex 	: 'scan_nik',
								flex 		: 1,
								renderer	: upsize
							},
							{	header 		: 'updated_at',
								dataIndex 	: 'updated_at',
								flex 		: 1,
								renderer	: upsize,
								hidden		: true
							}
						],
						//features: [filters],
						// selModel: {
						// 	selType: 'cellmodel'
						// },
						// plugins: [cellEditing]
					});
					var grid_mapros_panel = Ext.create('Ext.grid.Panel', {
						id 				: 'grid_mapros_panel',
						autoWidth 		: '100%',
						maxHeight		: 290,
						columnLines 	: true,
						store 			: store_mapros_panel,
						viewConfig 		: {
							stripeRows 			: true,
							emptyText 	 		: '<div class="empty-txt">No data to display.</div>',
							deferEmptyText 		: false,
							enableTextSelection	: true,
							getRowClass			: function(record, rowIndex, rowParams, store) {
								if (record.get('status')==='IN') return 'colorin';
								else if (record.get('status')==='OUT') return 'colorout';
							}
							
						},
						columns 	: [
							{	header 		: 'PANLE NO',
								dataIndex 	: 'ticket_no',
								width 		: 140,
								renderer	: upsize
							},
							{	header 		: 'guid_master',
								dataIndex 	: 'guid_master',
								flex 		: 1,
								renderer	: upsize,
								hidden		: true
							},
							{	header 		: 'guid_ticket',
								dataIndex 	: 'guid_ticket',
								flex 		: 1,
								renderer	: upsize,
								hidden		: true
							},
							{	header 		: 'MODEL',
								dataIndex 	: 'modelname',
								flex 		: 1,
								renderer	: upsize
							},
							{	header 		: 'LINE',
								dataIndex 	: 'line',
								width 	 	: 90,
								renderer	: upsize
							},
							{	header 		: 'PROCESS',
								dataIndex 	: 'lineprocess',
								width 	 	: 90,
								renderer	: upsize
							},
							{	header 		: 'scanner_id',
								dataIndex 	: 'scanner_id',
								flex 		: 1,
								renderer	: upsize,
								hidden		: true
							},
							{	header 		: 'STATUS',
								dataIndex 	: 'status',
								width 	 	: 90,
								renderer	: upsize
							},
							{	header 		: 'JUDGE',
								dataIndex 	: 'judge',
								width 	 	: 90,
								renderer	: upsize
							},
							{	header 		: 'SCAN TIME',
								dataIndex 	: 'created_at',
								flex 		: 1,
								renderer	: upsize
							},
							{	header 		: 'SCAN NIK',
								dataIndex 	: 'scan_nik',
								flex 		: 1,
								renderer	: upsize
							},
							{	header 		: 'updated_at',
								dataIndex 	: 'updated_at',
								flex 		: 1,
								renderer	: upsize,
								hidden		: true
							}
						],
						//features: [filters],
						// selModel: {
						// 	selType: 'cellmodel'
						// },
						// plugins: [cellEditing]
					});
					var grid_mapros_master = Ext.create('Ext.grid.Panel', {
						id 				: 'grid_mapros_master',
						autoWidth 		: '100%',
						maxHeight		: 290,
						columnLines 	: true,
						store 			: store_mapros_master,
						viewConfig 		: {
							stripeRows 			: true,
							emptyText 	 		: '<div class="empty-txt">No data to display.</div>',
							deferEmptyText 		: false,
							enableTextSelection	: true,
							getRowClass			: function(record, rowIndex, rowParams, store) {
								if (record.get('status')==='IN') return 'colorin';
								else if (record.get('status')==='OUT') return 'colorout';
							}
						},
						columns 	: [
							{	header 		: 'MASTER NO',
								dataIndex 	: 'ticket_no_master',
								width 		: 140,
								renderer	: upsize
							},
							{	header 		: 'guid_master',
								dataIndex 	: 'guid_master',
								flex 		: 1,
								renderer	: upsize,
								hidden		: true
							},
							{	header 		: 'MODEL',
								dataIndex 	: 'modelname',
								flex 		: 1,
								renderer	: upsize
							},
							{	header 		: 'LINE',
								dataIndex 	: 'line',
								width 	 	: 90,
								renderer	: upsize
							},
							{	header 		: 'PROCESS',
								dataIndex 	: 'lineprocess',
								width 	 	: 90,
								renderer	: upsize
							},
							{	header 		: 'scanner_id',
								dataIndex 	: 'scanner_id',
								flex 		: 1,
								renderer	: upsize,
								hidden		: true
							},
							{	header 		: 'STATUS',
								dataIndex 	: 'status',
								width 	 	: 90,
								renderer	: upsize
							},
							{	header 		: 'JUDGE',
								dataIndex 	: 'judge',
								width 	 	: 90,
								renderer	: upsize
							},
							{	header 		: 'SCAN TIME',
								dataIndex 	: 'created_at',
								flex 		: 1,
								renderer	: upsize
							},
							{	header 		: 'SCAN NIK',
								dataIndex 	: 'scan_nik',
								flex 		: 1,
								renderer	: upsize
							},
							{	header 		: 'updated_at',
								dataIndex 	: 'updated_at',
								flex 		: 1,
								renderer	: upsize,
								hidden		: true
							}
						],
						//features: [filters],
						// selModel: {
						// 	selType: 'cellmodel'
						// },
						// plugins: [cellEditing]
					});
					var grid_mapros_fwdn = Ext.create('Ext.grid.Panel', {
						id 				: 'grid_mapros_fwdn',
						autoWidth 		: '100%',
						maxHeight		: 290,
						columnLines 	: true,
						//store 			: store_mapros_fwdn,
						viewConfig 		: {
							stripeRows 			: true,
							emptyText 	 		: '<div class="empty-txt">Under Development</div>',
							deferEmptyText 		: false,
							enableTextSelection	: true
						},
						columns 	: [
							{	header 		: 'BARCODE',
								dataIndex 	: 'barcode',
								width 		: 140,
								renderer	: upsize
							},
							{	header 		: 'SERIAL',
								dataIndex 	: 'modelname',
								flex 		: 1,
								renderer	: upsize
							},
							{	header 		: 'LINE',
								dataIndex 	: 'line',
								width 	 	: 90,
								renderer	: upsize
							},
							{	header 		: 'PROCESS',
								dataIndex 	: 'lineprocess',
								width 	 	: 90,
								renderer	: upsize
							},
							{	header 		: 'scanner_id',
								dataIndex 	: 'scanner_id',
								flex 		: 1,
								renderer	: upsize,
								hidden		: true
							},
							{	header 		: 'STATUS',
								dataIndex 	: 'status',
								width 	 	: 90,
								renderer	: upsize
							},
							{	header 		: 'JUDGE',
								dataIndex 	: 'judge',
								width 	 	: 90,
								renderer	: upsize
							},
							{	header 		: 'SCAN TIME',
								dataIndex 	: 'created_at',
								flex 		: 1,
								renderer	: upsize
							},
							{	header 		: 'SCAN NIK',
								dataIndex 	: 'scan_nik',
								flex 		: 1,
								renderer	: upsize
							},
							{	header 		: 'updated_at',
								dataIndex 	: 'updated_at',
								flex 		: 1,
								renderer	: upsize,
								hidden		: true
							}
						],
						//features: [filters],
						// selModel: {
						// 	selType: 'cellmodel'
						// },
						// plugins: [cellEditing]
					});
					var grid_mapros_flash = Ext.create('Ext.grid.Panel', {
						id 				: 'grid_mapros_flash',
						autoWidth 		: '100%',
						maxHeight		: 290,
						columnLines 	: true,
						//store 			: store_mapros_flash,
						viewConfig 		: {
							stripeRows 			: true,
							emptyText 	 		: '<div class="empty-txt">Under Development</div>',
							deferEmptyText 		: false,
							enableTextSelection	: true
						},
						columns 	: [
							{	header 		: 'BARCODE',
								dataIndex 	: 'barcode',
								width 		: 140,
								renderer	: upsize
							},
							{	header 		: 'SERIAL',
								dataIndex 	: 'modelname',
								flex 		: 1,
								renderer	: upsize
							},
							{	header 		: 'LINE',
								dataIndex 	: 'line',
								width 	 	: 90,
								renderer	: upsize
							},
							{	header 		: 'PROCESS',
								dataIndex 	: 'lineprocess',
								width 	 	: 90,
								renderer	: upsize
							},
							{	header 		: 'scanner_id',
								dataIndex 	: 'scanner_id',
								flex 		: 1,
								renderer	: upsize,
								hidden		: true
							},
							{	header 		: 'STATUS',
								dataIndex 	: 'status',
								width 	 	: 90,
								renderer	: upsize
							},
							{	header 		: 'JUDGE',
								dataIndex 	: 'judge',
								width 	 	: 90,
								renderer	: upsize
							},
							{	header 		: 'SCAN TIME',
								dataIndex 	: 'created_at',
								flex 		: 1,
								renderer	: upsize
							},
							{	header 		: 'SCAN NIK',
								dataIndex 	: 'scan_nik',
								flex 		: 1,
								renderer	: upsize
							},
							{	header 		: 'updated_at',
								dataIndex 	: 'updated_at',
								flex 		: 1,
								renderer	: upsize,
								hidden		: true
							}
						],
						//features: [filters],
						// selModel: {
						// 	selType: 'cellmodel'
						// },
						// plugins: [cellEditing]
					});
					var grid_mapros_avmt = Ext.create('Ext.grid.Panel', {
						id 				: 'grid_mapros_avmt',
						autoWidth 		: '100%',
						maxHeight		: 290,
						columnLines 	: true,
						store 			: store_mapros_avmt,
						viewConfig 		: {
							stripeRows 			: true,
							emptyText 	 		: '<div class="empty-txt">Under Development</div>',
							deferEmptyText 		: false,
							enableTextSelection	: true
						},
						columns 	: [
							{	header 		: 'BARCODE',
								dataIndex 	: 'barcode',
								width 		: 140,
								renderer	: upsize
							},
							{	header 		: 'SERIAL',
								dataIndex 	: 'modelname',
								flex 		: 1,
								renderer	: upsize
							},
							{	header 		: 'LINE',
								dataIndex 	: 'line',
								width 	 	: 90,
								renderer	: upsize
							},
							{	header 		: 'PROCESS',
								dataIndex 	: 'lineprocess',
								width 	 	: 90,
								renderer	: upsize
							},
							{	header 		: 'scanner_id',
								dataIndex 	: 'scanner_id',
								flex 		: 1,
								renderer	: upsize,
								hidden		: true
							},
							{	header 		: 'STATUS',
								dataIndex 	: 'status',
								width 	 	: 90,
								renderer	: upsize
							},
							{	header 		: 'JUDGE',
								dataIndex 	: 'judge',
								width 	 	: 90,
								renderer	: upsize
							},
							{	header 		: 'SCAN TIME',
								dataIndex 	: 'created_at',
								flex 		: 1,
								renderer	: upsize
							},
							{	header 		: 'SCAN NIK',
								dataIndex 	: 'scan_nik',
								flex 		: 1,
								renderer	: upsize
							},
							{	header 		: 'updated_at',
								dataIndex 	: 'updated_at',
								flex 		: 1,
								renderer	: upsize,
								hidden		: true
							}
						],
						//features: [filters],
						// selModel: {
						// 	selType: 'cellmodel'
						// },
						// plugins: [cellEditing]
					});
					var grid_mapros_avntest = Ext.create('Ext.grid.Panel', {
						id 				: 'grid_mapros_avntest',
						autoWidth 		: '100%',
						maxHeight		: 290,
						columnLines 	: true,
						//store 			: store_mapros_avmt,
						viewConfig 		: {
							stripeRows 			: true,
							emptyText 	 		: '<div class="empty-txt">Under Development</div>',
							deferEmptyText 		: false,
							enableTextSelection	: true
						},
						columns 	: [
							{	header 		: 'MASTER NO',
								dataIndex 	: 'ticket_no_master',
								width 		: 140,
								renderer	: upsize
							},
							{	header 		: 'guid_master',
								dataIndex 	: 'guid_master',
								flex 		: 1,
								renderer	: upsize,
								hidden		: true
							},
							{	header 		: 'MODEL',
								dataIndex 	: 'modelname',
								flex 		: 1,
								renderer	: upsize
							},
							{	header 		: 'LINE',
								dataIndex 	: 'line',
								width 	 	: 90,
								renderer	: upsize
							},
							{	header 		: 'PROCESS',
								dataIndex 	: 'lineprocess',
								width 	 	: 90,
								renderer	: upsize
							},
							{	header 		: 'scanner_id',
								dataIndex 	: 'scanner_id',
								flex 		: 1,
								renderer	: upsize,
								hidden		: true
							},
							{	header 		: 'STATUS',
								dataIndex 	: 'status',
								width 	 	: 90,
								renderer	: upsize
							},
							{	header 		: 'JUDGE',
								dataIndex 	: 'judge',
								width 	 	: 90,
								renderer	: upsize
							},
							{	header 		: 'SCAN TIME',
								dataIndex 	: 'created_at',
								flex 		: 1,
								renderer	: upsize
							},
							{	header 		: 'SCAN NIK',
								dataIndex 	: 'scan_nik',
								flex 		: 1,
								renderer	: upsize
							},
							{	header 		: 'updated_at',
								dataIndex 	: 'updated_at',
								flex 		: 1,
								renderer	: upsize,
								hidden		: true
							}
						],
						//features: [filters],
						// selModel: {
						// 	selType: 'cellmodel'
						// },
						// plugins: [cellEditing]
					});
					var grid_mapros_auto0 = Ext.create('Ext.grid.Panel', {
						id 				: 'grid_mapros_auto0',
						autoWidth 		: '100%',
						maxHeight		: 290,
						columnLines 	: true,
						//store 			: store_mapros_avmt,
						viewConfig 		: {
							stripeRows 			: true,
							emptyText 	 		: '<div class="empty-txt">Under Development</div>',
							deferEmptyText 		: false,
							enableTextSelection	: true
						},
						columns 	: [
							{	header 		: 'MASTER NO',
								dataIndex 	: 'ticket_no_master',
								width 		: 140,
								renderer	: upsize
							},
							{	header 		: 'guid_master',
								dataIndex 	: 'guid_master',
								flex 		: 1,
								renderer	: upsize,
								hidden		: true
							},
							{	header 		: 'MODEL',
								dataIndex 	: 'modelname',
								flex 		: 1,
								renderer	: upsize
							},
							{	header 		: 'LINE',
								dataIndex 	: 'line',
								width 	 	: 90,
								renderer	: upsize
							},
							{	header 		: 'PROCESS',
								dataIndex 	: 'lineprocess',
								width 	 	: 90,
								renderer	: upsize
							},
							{	header 		: 'scanner_id',
								dataIndex 	: 'scanner_id',
								flex 		: 1,
								renderer	: upsize,
								hidden		: true
							},
							{	header 		: 'STATUS',
								dataIndex 	: 'status',
								width 	 	: 90,
								renderer	: upsize
							},
							{	header 		: 'JUDGE',
								dataIndex 	: 'judge',
								width 	 	: 90,
								renderer	: upsize
							},
							{	header 		: 'SCAN TIME',
								dataIndex 	: 'created_at',
								flex 		: 1,
								renderer	: upsize
							},
							{	header 		: 'SCAN NIK',
								dataIndex 	: 'scan_nik',
								flex 		: 1,
								renderer	: upsize
							},
							{	header 		: 'updated_at',
								dataIndex 	: 'updated_at',
								flex 		: 1,
								renderer	: upsize,
								hidden		: true
							}
						],
						//features: [filters],
						// selModel: {
						// 	selType: 'cellmodel'
						// },
						// plugins: [cellEditing]
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
			//	AOI
					var panel_aoi = Ext.create('Ext.tab.Panel', {
						id 			: 'panel_aoi',
						renderTo 	: 'panel_aoi',
						//autoHeight	: true,
						plain 		: true,
						//activeTab 	: 0,
						autoWidth 	: '100%',
						height 		: 350,
						autoScroll 	: true,
						frame 		: true,
						style 	: 'padding:5px;-background:#157FCC;',
						tabBar: {
							flex: 1,
							layout: {
								pack: 'center',
								align: 'stretch'
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
			//	MOUNTER
					var panel_mounter = Ext.create('Ext.panel.Panel', {
						id 				: 'panel_mounter',
						renderTo 		: 'panel_mounter',
						autoWidth		: '100%',
						maxHeight		: 820,
						border			: false,
						frame			: true,
						hidden			: false,
						defaults		: {
							split		: true,
							collapsible	: false
						},
						items			: [grid_smt_mounter]
					});
			//	SPI
					var panel_spi = Ext.create('Ext.panel.Panel', {
						id 				: 'panel_spi',
						renderTo 		: 'panel_spi',
						autoWidth		: '100%',
						maxHeight		: 820,
						border			: false,
						frame			: true,
						hidden			: false,
						defaults		: {
							split		: true,
							collapsible	: false
						},
						items			: [grid_smt_spi]
					});
			//	MAPROS
					var panel_mapros = Ext.create('Ext.tab.Panel', {
						id 			: 'panel_mapros',
						renderTo 	: 'panel_mapros',
						plain 		: true,
						activeTab 	: 0,
						autoWidth 	: '100%',
						height		: 330,
						autoScroll 	: true,
						frame 		: true,
						//style 	: 'padding:5px;-background:#157FCC;',
						tabBar		: {
							flex 	: 1,
							layout	: {
								pack 	: 'center',
								align 	: 'stretch'
							}
						},
						items 		: [
							{	title 		: 'PCB',
							 	id  		: 'show_grid_board',
								reorderable : false,
								items 		: [grid_mapros_board]
							}, 
							{	title 		: 'PANEL AND MECHA',
							 	id  		: 'show_grid_ticket',
								reorderable : false,
								items 		: [grid_mapros_panel]
							}, 
							{	title 		: 'MASTER',
							 	id  		: 'show_grid_master',
								reorderable : false,
								items 		: [grid_mapros_master]
							}, 
							{	title 		: 'FWDN',
							 	id  		: 'show_grid_fwdn',
								reorderable : false,
								items 		: [grid_mapros_fwdn]
							}, 
							{	title 		: 'FLASH',
							 	id  		: 'show_grid_flash',
								reorderable : false,
								items 		: [grid_mapros_flash]
							}, 
							{	title 		: 'AVN TEST',
							 	id  		: 'show_grid_avntest',
								reorderable : false,
								items 		: [grid_mapros_avntest]
							}, 
							{	title 		: 'AVMT',
							 	id  		: 'show_grid_avmt',
								reorderable : false,
								items 		: [grid_mapros_avmt]
							}, 
							{	title 		: 'AUTO LINE ZERO',
							 	id  		: 'show_grid_zero',
								reorderable : false,
								items 		: [grid_mapros_auto0]
							}
						]
					});
		
		//	=======================================================    POPUP SEARCH DATA    =============================
		
			//	Form Search FinishGood
				Ext.create('Ext.form.field.Text',{
						renderTo 	: boardid_scan,
						width 	 	: '100%',
						id 			: 'boardid_scan',
						name 		: 'boardid_scan',
						fieldCls	: 'biggertext',
						emptyText	: 'Search Model',
						margins		: '0 6 0 0',
						height 		: 30,
						flex		: 1,
						//value:  	'00013IA000010015',
						//value:  	'000207B000010002',
						//value:  	'000157A000010009',
						//value:  	'000177A020010012',
						value:  	'000267B000010001',
						listeners	: {
							afterrender : function() {
								this.inputEl.setStyle('text-align', 'center');
								this.inputEl.setStyle('backgroundColor', '#0067AE');
								this.inputEl.setStyle('color', '#fff');
								this.inputEl.setStyle('fontSize', '20px');
								var me = this,
						            inputElement = me.inputElement;
						 
						        if (inputElement && inputElement.dom.focus) {
						            inputElement.dom.focus();
						        }
						        //return me;
							},
							specialkey : function(field, e) {
								if (e.getKey() == 13) {
									var boardid = Ext.getCmp('boardid_scan').getValue();

									//var smtdate = Ext.getCmp('smt_date').getValue();

									if (!boardid) {
										Ext.Msg.alert('Warning', 'PCB ID cannot be null !!!');
									} 
									else {
										store_bigs.proxy.setExtraParam('boardid', boardid);
										store_bigs.proxy.setExtraParam('smt_date', '');
										store_bigs.loadPage(1);
										
										store_good_smt_aoi_board.proxy.setExtraParam('boardid', boardid);
										store_good_smt_aoi_board.proxy.setExtraParam('smt_date', '');
										store_good_smt_aoi_board.loadPage(1);
										
										store_good_smt_aoi_point.proxy.setExtraParam('boardid', boardid);
										store_good_smt_aoi_point.proxy.setExtraParam('smt_date', '');
										store_good_smt_aoi_point.loadPage(1);
										
										store_smt_spi.proxy.setExtraParam('boardid', boardid);
										store_smt_spi.proxy.setExtraParam('smt_date', '');
										store_smt_spi.loadPage(1);
									}
								}
							}
						}
				});
				// Ext.create('Ext.form.field.Date',{
					// 	//renderTo 	: src_reflow_date,
					// 	width 		: '100%',
					// 	id 			: 'smt_date',
					// 	name 		: 'smt_date',
					// 	fieldCls	: 'biggertext',
					// 	emptyText	: 'Search Date',
					// 	margins		: '0 6 0 0',
					// 	height 		: 30,
					// 	flex		: 1,
					// 	format		: 'd F Y',
					// 	submitFormat: 'Y-m-d',
					// 	mode		: 'local',  
					// 	value 		: new Date(),
					// 	editable 	: false,
					// 	listeners	: {
					// 			afterrender : function() {
					// 				this.inputEl.setStyle('text-align', 'center');
					// 				this.inputEl.setStyle('backgroundColor', '#0067AE');
					// 				this.inputEl.setStyle('color', '#fff');
					// 				this.inputEl.setStyle('fontSize', '20px');
					// 				var me = this,
					// 		            inputElement = me.inputElement;
							 
					// 		        if (inputElement && inputElement.dom.focus) {
					// 		            inputElement.dom.focus();
					// 		        }
					// 		        return me;
					// 			},
					// 			specialkey : function(field, e) {
					// 				if (e.getKey() == 13) {
					// 					var reflow_date = Ext.getCmp('src_reflow_date').getValue();
										
					// 					if (!reflow_date) {
					// 						Ext.Msg.alert('Warning', 'Reflow date cannot be null !!!');
					// 					} else {
											
					// 						store_smt_reflow.proxy.setExtraParam('src_cat', 'fg');
					// 						store_smt_reflow.proxy.setExtraParam('prod_date', reflow_date);
					// 						store_smt_reflow.proxy.setExtraParam('model', 'nomodel');
					// 						store_smt_reflow.loadPage(1);
					// 					}
					// 				}
					// 			}
					// 		}
				// });
		
		//	==** end **==

	});