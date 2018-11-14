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
		if (x == '' || x == '-' || x == '---'){
			return '<font class="fontsize12" style="color:red;font-weight: bold;"> --- </font>';
		}
		else if (x == 'NG' || x == 'STOP'){
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
				var itemperpage_detail = 6;
				var date 		= new Date();
			
		//	=======================================================    MODEL    =========================================
			//	BOARD ID GENERATOR
				Ext.define('model_bigs', {
					extend: 'Ext.data.Model',
					//fields: ['schedule_id', 'lot_size', 'model_code', 'prod_no_code', 'side', 'cavity', 'seq_start', 'seq_end', 'line', 'model', 'pwbname', 'pwbno', 'process', 'rev_date', 'qty', 'ynumber', 'start_serial']
					fields: [ 'side', 'cavity', 'seq_start', 'seq_end', 'line', 'model', 'pwbname', 'process', 'qty', 'ynumber', 'start_serial']
				});
				// 	Ext.define('model_bigs', {
					// 		extend: 'Ext.data.Model',
					// 		fields: ['id', 'cavity', 'model', 'model_code', 'process', 'prod_no', 'prod_no_code', 'pwbname', 'pwbno', 'ynumber', 'side', 'model_id', 'start_serial', 'lot_size', 'seq_start', 'seq_end', 'qty', 'history_id', 'schedule_id', 'line', 'rev_date' ]
					// 	});
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
					// fields: ['mjsid','puside','partloc','jobno','model','board','pwbno','process',
	    			//  		'mode','partno','feeder','feederserial','feederno','compid1','compid2',
	    			//  		'compid3','compid4','compid5','scandate']
					fields: ['row','line','boardid','model','pwbno','pwbname','process','lotno',
	                			'datein','dateout','jobno','partloc','mode','partno','feeder',
	                			'feederserial','feederno','compid1','scandate']
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
				Ext.define('model_mapros_fwdn',{
	                extend: 'Ext.data.Model',
	                fields: ['idfwdn','dateinspec','serial', 'sn','jigno','judge','inspectime',
	                		'artfilename','ngcontent','input_user','input_date']
	           	});
	          	Ext.define('model_mapros_fwdn_detail',{
	                extend: 'Ext.data.Model',
	                fields: ['idfwdn','step','stepdata', 'measure','measuredata','input_user','input_date']
	           	});
	          	Ext.define('model_mapros_flash',{
	                extend: 'Ext.data.Model',
	                fields: ['idflash','dateinspec','serial', 'sn','jigno','judge','inspectime',
	                		'artfilename','ngcontent','input_user','input_date']
	           	});
				Ext.define('model_mapros_avntest',{
					extend: 'Ext.data.Model',
	                fields: ['idavnt','dateinspec','serial', 'sn','jigno','judge','inspectime',
	                		'artfilename','ngcontent','input_user','input_date']
	           	});
	          	Ext.define('model_mapros_avntest_detail',{
					extend: 'Ext.data.Model',
	                fields: ['idavnt','step','stepdata','measure','measuredata','input_user','input_date']
	           	});
	          	Ext.define('model_mapros_avmt',{
					extend: 'Ext.data.Model',
	                fields: ['idavmt','barcode','sn', 'program','stdate','endate','lap',
	                		'judgment','input_user','input_date','update_user','update_date']
	           	});
	          	Ext.define('model_mapros_avmt_detail',{
					extend: 'Ext.data.Model',
					fields: ['autoid','idavmt','barcode', 'step','type','name','judgment',
	                		'volt','curr','freq','lvll','dstl','dstr','rell','relr','snl','snr','remark','input_user'
	                		,'input_date','update_user','update_date']
	           	});
	          	Ext.define('model_mapros_line0',{
	                extend: 'Ext.data.Model',
	                fields: ['idlinezero','dateinspec','serial', 'sn','jigno','judge','inspectime',
	                		'artfilename','ngcontent','input_user','input_date']
	           	});
	          	Ext.define('model_mapros_line0_detail',{
	                extend: 'Ext.data.Model',
	                fields: ['idlinezero','rownumber','step','stepdata', 'measure','measuredata','input_user','input_date']
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
								
								store_smt_mounter.proxy.setExtraParam('boardid', boardid);
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
				var store_mapros_fwdn = Ext.create('Ext.data.Store',{
					model	: 'model_mapros_fwdn',
					autoLoad: false,
					// pageSize: itemperpage,
					proxy   : {
						type    : 'ajax',
						url     : 'json/finishgood_smt/json_good_smt_mapros_fwdn.php',
						reader  : {
							type    : 'json',
							root    : 'rows',
							// totalProperty: 'totalCount'
						}
					}
				});
				var store_mapros_fwdn_detail = Ext.create('Ext.data.Store',{
					model	: 'model_mapros_fwdn_detail',
					autoLoad: false,
					pageSize: itemperpage_detail,
					proxy   : {
						type    : 'ajax',
						url     : 'json/finishgood_smt/json_good_smt_mapros_fwdn_detail.php',
						reader  : {
							type    : 'json',
							root    : 'rows',
							totalProperty: 'totalCount'
						}
					}
				});
				var store_mapros_flash = Ext.create('Ext.data.Store',{
					model	: 'model_mapros_flash',
					autoLoad: false,
					pageSize: itemperpage,
					proxy   : {
						type    : 'ajax',
						url     : 'json/finishgood_smt/json_good_smt_mapros_flash.php',
						reader  : {
							type    : 'json',
							root    : 'rows',
							totalProperty: 'totalCount'
						}
					}
				});
				var store_mapros_avntest = Ext.create('Ext.data.Store',{
					model	: 'model_mapros_avntest',
					autoLoad: false,
					pageSize: itemperpage,
					proxy   : {
						type    : 'ajax',
						url     : 'json/finishgood_smt/json_good_smt_mapros_avntest.php',
						reader  : {
							type    : 'json',
							root    : 'rows',
							//totalProperty: 'totalCount'
						}
					}
				});
				var store_mapros_avntest_detail = Ext.create('Ext.data.Store',{
					model	: 'model_mapros_avntest_detail',
					autoLoad: false,
					pageSize: itemperpage_detail,
					proxy   : {
						type    : 'ajax',
						url     : 'json/finishgood_smt/json_good_smt_mapros_avntest_detail.php',
						reader  : {
							type    : 'json',
							root    : 'rows',
							totalProperty: 'totalCount'
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
							root    : 'rows',
							//totalProperty: 'totalCount'
						}
					}
				});
				var store_mapros_avmt_detail = Ext.create('Ext.data.Store',{
					model	: 'model_mapros_avmt_detail',
					autoLoad: false,
					pageSize: itemperpage_detail,
					proxy   : {
						type    : 'ajax',
						url     : 'json/finishgood_smt/json_good_smt_mapros_avmt_detail.php',
						reader  : {
							type    : 'json',
							root    : 'rows',
							totalProperty: 'totalCount'
						}
					}
				});
				var store_mapros_line0 = Ext.create('Ext.data.Store',{
					model	: 'model_mapros_line0',
					autoLoad: false,
					pageSize: itemperpage,
					proxy   : {
						type    : 'ajax',
						url     : 'json/finishgood_smt/json_good_smt_mapros_line0.php',
						reader  : {
							type    : 'json',
							root    : 'rows',
							// totalProperty: 'totalCount'
						}
					}
				});
				var store_mapros_line0_detail = Ext.create('Ext.data.Store',{
					model	: 'model_mapros_line0_detail',
					autoLoad: false,
					pageSize: itemperpage_detail,
					proxy   : {
						type    : 'ajax',
						url     : 'json/finishgood_smt/json_good_smt_mapros_line0_detail.php',
						reader  : {
							type    : 'json',
							root    : 'rows',
							totalProperty: 'totalCount'
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
							width 	 	: 200,
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
							width 		: 150,
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
						{ 	header : 'NO',				dataIndex : 'row', 			width : 50,		renderer : upsize },
						{ 	header : 'LINE',			dataIndex : 'line', 		width : 60, 	renderer : upsize },
						{ 	header : 'BOARD',			dataIndex : 'boardid',		width : 200,	renderer : upsize,	hidden : true },
						{ 	header : 'MODEL',			dataIndex : 'model',		width : 120,	renderer : upsize,	hidden : true },
						{ 	header : 'PWB NO', 			dataIndex : 'pwbno', 		width : 100, 	renderer : upsize,	hidden : true },
						{ 	header : 'PWV NAME', 		dataIndex : 'pwbname', 		width : 75, 	renderer : upsize,	hidden : true },
						{ 	header : 'PROCESS', 		dataIndex : 'process', 		width : 90, 	renderer : upsize },
						{ 	header : 'LOT NO', 			dataIndex : 'lotno', 		width : 75, 	renderer : upsize,	hidden : true },
						{ 	header : 'START', 			dataIndex : 'datein', 		width : 90, 	renderer : upsize },
						{ 	header : 'END', 			dataIndex : 'dateout', 		width : 90, 	renderer : upsize },
						{ 	header : 'JOBNO', 			dataIndex : 'jobno', 		width : 150, 	renderer : upsize },
						{ 	header : 'LOCATION', 		dataIndex : 'partloc', 		width : 90, 	renderer : upsize },
						{ 	header : 'MODE',			dataIndex : 'mode', 		width : 75,		renderer : upsize },
						{ 	header : 'PARTNO', 			dataIndex : 'partno', 		width : 120, 	renderer : upsize },
						{ 	header : 'FEEDER', 			dataIndex : 'feeder', 		width : 75, 	renderer : upsize },
						{ 	header : 'FEEDER SERIAL', 	dataIndex : 'feederserial',	width : 130,	renderer : upsize },
						{ 	header : 'FEEDER NO', 		dataIndex : 'feederno', 	width : 100,	renderer : upsize },
						{ 	header : 'SCANNING', 		dataIndex : 'compid1', 		width : 140,	renderer : upsize },
						{ 	header : 'SCAN DATE', 		dataIndex : 'scandate', 	width : 90,		renderer : upsize }
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
					//features: [filters], selModel: { selType: 'cellmodel' }, plugins: [cellEditing]
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
					maxHeight		: 400,
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
					maxHeight			: 200,
					columnLines 	: true,
					store 			: store_mapros_fwdn,
					viewConfig 		: {
						stripeRows 			: true,
						emptyText 	 		: '<div class="empty-txt">No data to display.</div>',
						deferEmptyText 		: false,
						enableTextSelection	: true
					},
					columns 		: [
						{ 	header 		: 'FWDN',
							dataIndex 	: 'idfwdn',
							width 		: 180,
							renderer	: upsize
						},
						{	header 		: 'INSP DATE',
							dataIndex 	: 'dateinspec',
							width 		: 100,
							renderer	: upsize
						},
						{	header 		: 'TOTAL TIME',
							dataIndex 	: 'inspectime',
							width 		: 80,
							renderer	: upsize
						},
						{	header 		: 'SERIAL',
							dataIndex 	: 'serial',
							width 		: 210,
							renderer	: upsize
						},
						{	header 		: 'SN',
							dataIndex 	: 'sn',
							width 		: 60,
							renderer	: upsize
						},
						{	header 		: 'JIG NO',
							dataIndex 	: 'jigno',
							width 		: 60,
							renderer	: upsize
						},
						{	header 		: 'JUDGE',
							dataIndex 	: 'judge',
							width 		: 90,
							renderer	: upsize
						},
						{	header 		: 'FILE',
							dataIndex 	: 'artfilename',
							width 		: 60,
							renderer	: upsize
						},
						{	header 		: 'NG',
							dataIndex 	: 'ngcontent',
							width 		: 60,
							renderer	: upsize
						},
						{	header 		: 'MCH CODE',
							dataIndex 	: 'input_user',
							width 		: 100,
							renderer	: upsize
						},
						{	header 		: 'OPT SCAN',
							dataIndex 	: 'input_date',
							width 		: 120,
							renderer	: upsize,
							hidden 		: true
						}
					],
					plugins			: [
						{
	        				ptype	: 'rowwidget',
	        				widget	: {
					            xtype	: 'grid',
					            autoLoad: true,
					            store 	: store_mapros_fwdn_detail,
					            bind	: {
					                title : 'Orders for ( {record.idfwdn} )'
					            },
					            columns : [
					            			{	header 		: 'FWDN',
												dataIndex 	: 'idfwdn',
												flex 		: 1,
												renderer	: upsize,
												hidden 		: true
											},
											{	header 		: 'STEP',
												dataIndex 	: 'step',
												flex 		: 1,
												renderer	: upsize
											},
											{	header 		: 'STEP DATA',
												dataIndex 	: 'stepdata',
												flex 		: 1,
												renderer	: upsize
											},
											{	header 		: 'MEASURE',
												dataIndex 	: 'measure',
												flex 		: 1,
												renderer	: upsize
											},
											{	header 		: 'MEASURE DATA',
												dataIndex 	: 'measuredata',
												flex 		: 1,
												renderer	: upsize
											},
											{	header 		: 'OPERATOR',
												dataIndex 	: 'input_user',
												flex 		: 1,
												renderer	: upsize
											},
											{	header 		: 'INSP DATE',
												dataIndex 	: 'input_date',
												flex 		: 1,
												renderer	: upsize
											}
								]
							}
				    	}
			    	],
					// bbar			: Ext.create('Ext.PagingToolbar', {
					// 	pageSize		: itemperpage,
					// 	store			: store_mapros_fwdn,
					// 	displayInfo		: true,
					// 	displayMsg		: 'Data {0} - {1} from {2} data',
					// 	emptyMsg		: "Page not found",
					// 	beforePageText  : 'Page',
					// 	afterPageText   : 'from {0} Pages',
					// 	firstText       : 'First Page',
					// 	prevText        : 'Previous Page',
					// 	nextText        : 'Next page',
					// 	lastText        : 'Last Page',
					// 	plugins       	: Ext.create('Ext.ux.ProgressBarPager', {}),
					// 	listeners 		: {
					// 		afterrender : function (cmp) {
					// 			cmp.getComponent("refresh").hide();
					// 		}
					// 	}
					// }),
					listeners: {
			    		select: function(grid, rowIndex, colIndex) {
			    			var rec = this.getSelectionModel().getSelection();
			    			var fwdn = rec[0].data.idfwdn;
			    			
			    			store_mapros_fwdn_detail.proxy.setExtraParam('idfwdn',fwdn);
			    			store_mapros_fwdn_detail.loadPage(1);

			    		}
			    	},
					//features: [filters],
					// selModel: {
					// 	selType: 'cellmodel'
					// },
					// plugins: [cellEditing]
				});
				var grid_mapros_fwdn_detail = Ext.create('Ext.grid.Panel', {
					id 				: 'grid_mapros_fwdn_detail',
					title 			: '<div style="text-align:center;">==== &nbsp; DETAIL &nbsp; ====</div>',
					autoWidth 		: '80%',
					height			: 400,
					columnLines 	: true,
					store 			: store_mapros_fwdn_detail,
					viewConfig 		: {
						stripeRows 			: true,
						emptyText 	 		: '<div class="empty-txt">No data to display.</div>',
						deferEmptyText 		: false,
						enableTextSelection	: true
					},
					columns 	: [
						{	header 		: 'FWDN',
							dataIndex 	: 'idfwdn',
							flex 		: 1,
							renderer	: upsize,
							hidden 		: true
						},
						{	header 		: 'STEP',
							dataIndex 	: 'step',
							flex 		: 1,
							renderer	: upsize
						},
						{	header 		: 'STEP DATA',
							dataIndex 	: 'stepdata',
							flex 		: 1,
							renderer	: upsize
						},
						{	header 		: 'MEASURE',
							dataIndex 	: 'measure',
							flex 		: 1,
							renderer	: upsize
						},
						{	header 		: 'MEASURE DATA',
							dataIndex 	: 'measuredata',
							flex 		: 1,
							renderer	: upsize
						},
						{	header 		: 'OPERATOR',
							dataIndex 	: 'input_user',
							flex 		: 1,
							renderer	: upsize
						},
						{	header 		: 'INSP DATE',
							dataIndex 	: 'input_date',
							flex 		: 1,
							renderer	: upsize
						}
					],
					bbar			: Ext.create('Ext.PagingToolbar', {
						pageSize		: itemperpage,
						store			: store_mapros_fwdn_detail,
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
							afterrender : function (cmp) {
								cmp.getComponent("refresh").hide();
							}
						}
					}),
					//features: [filters],
					// selModel: {
					// 	selType: 'cellmodel'
					// },
					// plugins: [cellEditing]
				});
				var grid_mapros_flash = Ext.create('Ext.grid.Panel', {
					id 				: 'grid_mapros_flash',
					autoWidth 		: '100%',
					height			: 500,
					columnLines 	: true,
					store 			: store_mapros_flash,
					viewConfig 		: {
						stripeRows 			: true,
						emptyText 	 		: '<div class="empty-txt">No data to display.</div>',
						deferEmptyText 		: false,
						enableTextSelection	: true
					},
					columns 		: [
						{	header 		: 'FLASH',
							dataIndex 	: 'idflash',
							width 		: 200,
							renderer	: upsize
						},
						{	header 		: 'INSP DATE',
							dataIndex 	: 'dateinspec',
							width 		: 100,
							renderer	: upsize
						},
						{	header 		: 'TOTAL TIME',
							dataIndex 	: 'inspectime',
							width 		: 80,
							renderer	: upsize
						},
						{	header 		: 'SERIAL',
							dataIndex 	: 'serial',
							width 		: 140,
							renderer	: upsize
						},
						{	header 		: 'SN',
							dataIndex 	: 'sn',
							width 		: 80,
							renderer	: upsize
						},
						{	header 		: 'JIG NO',
							dataIndex 	: 'jigno',
							width 		: 80,
							renderer	: upsize
						},
						{	header 		: 'JUDGE',
							dataIndex 	: 'judge',
							width 		: 90,
							renderer	: upsize
						},
						{	header 		: 'FILE',
							dataIndex 	: 'artfilename',
							width 		: 80,
							renderer	: upsize
						},
						{	header 		: 'NG',
							dataIndex 	: 'ngcontent',
							width 		: 80,
							renderer	: upsize
						},
						{	header 		: 'OPERATOR',
							dataIndex 	: 'input_user',
							width 		: 120,
							renderer	: upsize
						},
						{	header 		: 'OPT SCAN',
							dataIndex 	: 'input_date',
							width 		: 120,
							renderer	: upsize
						}
					],
					// plugins			: [{
	    //     				ptype	: 'rowwidget',
	    //     				widget	: {
				 //            xtype	: 'grid',
				 //            autoLoad: true,
				 //            bind	: {
				 //                store : '{record.idfwdn}',
				 //                title : 'Orders for {record.idflash}'
				 //            },
				 //            columns : [{
				 //                text 		: 'Order Id',
				 //                dataIndex 	: 'id',
				 //                width 		: 75
				 //            }, {
				 //                text 		: 'Procuct code',
				 //                dataIndex 	: 'productCode',
				 //                width 		: 265
				 //            }]
					 //        }
					 //    }],
					bbar			: Ext.create('Ext.PagingToolbar', {
						pageSize		: itemperpage,
						store			: store_mapros_fwdn,
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
							afterrender : function (cmp) {
								cmp.getComponent("refresh").hide();
							}
						}
					}),
					//features: [filters],
					// selModel: {
					// 	selType: 'cellmodel'
					// },
					// plugins: [cellEditing]
				});
				var grid_mapros_avmt = Ext.create('Ext.grid.Panel', {
					id 				: 'grid_mapros_avmt',
					autoWidth 		: '80%',
					maxheight		: 150,
					columnLines 	: true,
					store 			: store_mapros_avmt,
					viewConfig 		: {
						stripeRows 			: true,
						emptyText 	 		: '<div class="empty-txt">No data to display.</div>',
						deferEmptyText 		: false,
						enableTextSelection	: true
					},
					columns 	: [
						{ 	header 		: 'AVMT',
							dataIndex 	: 'idavmt',
							width 		: 170,
							renderer	: upsize
						},
						{	header 		: 'DUMMY MASTER',
							dataIndex 	: 'barcode',
							width 		: 130,
							renderer	: upsize
						},
						{	header 		: 'SERIAL NO',
							dataIndex 	: 'sn',
							width 		: 130,
							renderer	: upsize
						},
						{	header 		: 'MODEL PROG',
							dataIndex 	: 'program',
							width 		: 140,
							renderer	: upsize
						},
						{	header 		: 'START',
							dataIndex 	: 'stdate',
							width 		: 90,
							renderer	: upsize
						},
						{	header 		: 'END',
							dataIndex 	: 'endate',
							width 		: 90,
							renderer	: upsize
						},
						{	header 		: 'LAP',
							dataIndex 	: 'lap',
							width 		: 90,
							renderer	: upsize
						},
						{	header 		: 'JUDGE',
							dataIndex 	: 'judgment',
							width 		: 80,
							renderer	: upsize
						},
						{	header 		: 'MCHNAME',
							dataIndex 	: 'input_user',
							width 		: 100,
							renderer	: upsize
						},
						{	header 		: 'DATE',
							dataIndex 	: 'input_date',
							width 		: 120,
							renderer	: upsize
						},
						{	header 		: 'update_user',
							dataIndex 	: 'update_user',
							width 		: 120,
							renderer	: upsize,
							hidden		: true
						},
						{	header 		: 'update_date',
							dataIndex 	: 'update_date',
							width 		: 120,
							renderer	: upsize,
							hidden		: true
						}
					],
					plugins			: [
						{
	        				ptype	: 'rowwidget',
	        				widget	: {
					            xtype	: 'grid',
					            autoLoad: true,
					            store 	: store_mapros_avmt_detail,
					            bind	: {
					                title : 'Orders for ( {record.idavmt} )'
					            },
					            columns : [
					       	    			{	header 		: 'autoid',
												dataIndex 	: 'autoid',
												flex 		: 1,
												renderer	: upsize,
												hidden 		: true
											},
											{	header 		: 'ID AVMT',
												dataIndex 	: 'idavmt',
												flex 		: 1,
												renderer	: upsize,
												hidden 		: true
											},
											{	header 		: 'DUMMY MASTER',
												dataIndex 	: 'barcode',
												flex 		: 1,
												renderer	: upsize,
												hidden 		: true
											},
											{	header 		: 'STEP',
												dataIndex 	: 'step',
												flex 		: 1,
												renderer	: upsize
											},
											{	header 		: 'TYPE',
												dataIndex 	: 'type',
												flex 		: 1,
												renderer	: upsize
											},
											{	header 		: 'NAME',
												dataIndex 	: 'name',
												flex 		: 1,
												renderer	: upsize
											},
											{	header 		: 'JUDGE',
												dataIndex 	: 'judgment',
												flex 		: 1,
												renderer	: upsize
											},
											{	header 		: 'VOLT',
												dataIndex 	: 'volt',
												flex 		: 1,
												renderer	: upsize
											},
											{	header 		: 'CURR',
												dataIndex 	: 'curr',
												flex 		: 1,
												renderer	: upsize
											},
											{	header 		: 'FREQ',
												dataIndex 	: 'freq',
												flex 		: 1,
												renderer	: upsize
											},
											{	header 		: 'LVLL',
												dataIndex 	: 'lvll',
												flex 		: 1,
												renderer	: upsize
											},
											{	header 		: 'DSTL',
												dataIndex 	: 'dstl',
												flex 		: 1,
												renderer	: upsize
											},
											{	header 		: 'DSTR',
												dataIndex 	: 'dstr',
												flex 		: 1,
												renderer	: upsize
											},
											{	header 		: 'RELL',
												dataIndex 	: 'rell',
												flex 		: 1,
												renderer	: upsize
											},
											{	header 		: 'RELR',
												dataIndex 	: 'relr',
												flex 		: 1,
												renderer	: upsize
											},
											{	header 		: 'SNL',
												dataIndex 	: 'snl',
												flex 		: 1,
												renderer	: upsize
											},
											{	header 		: 'SNR',
												dataIndex 	: 'snr',
												flex 		: 1,
												renderer	: upsize
											},
											{	header 		: 'REMARK',
												dataIndex 	: 'remark',
												flex 		: 1,
												renderer	: upsize
											},
											{	header 		: 'MCH NAME',
												dataIndex 	: 'input_user',
												flex 		: 1,
												renderer	: upsize
											},
											{	header 		: 'DATE',
												dataIndex 	: 'input_date',
												flex 		: 1,
												renderer	: upsize
											},
											{	header 		: 'update_user',
												dataIndex 	: 'update_user',
												flex 		: 1,
												renderer	: upsize,
												hidden 		: true
											},
											{	header 		: 'update_date',
												dataIndex 	: 'update_date',
												flex 		: 1,
												renderer	: upsize,
												hidden 		: true
											}
								]
							}
				    	}
			    	],
			    	listeners: {
			    		select: function(grid, rowIndex, colIndex) {
			    			var rec = this.getSelectionModel().getSelection();
			    			var avmt = rec[0].data.idavmt;
			    			
			    			store_mapros_avmt_detail.proxy.setExtraParam('avmt',avmt);
			    			store_mapros_avmt_detail.loadPage(1);

			    		}
			    	},
					// bbar			: Ext.create('Ext.PagingToolbar', {
						// 	pageSize		: itemperpage,
						// 	store			: store_mapros_avmt,
						// 	displayInfo		: true,
						// 	displayMsg		: 'Data {0} - {1} from {2} data',
						// 	emptyMsg		: "Page not found",
						// 	beforePageText  : 'Page',
						// 	afterPageText   : 'from {0} Pages',
						// 	firstText       : 'First Page',
						// 	prevText        : 'Previous Page',
						// 	nextText        : 'Next page',
						// 	lastText        : 'Last Page',
						// 	plugins       	: Ext.create('Ext.ux.ProgressBarPager', {}),
						// 	listeners 		: {
						// 		afterrender : function (cmp) {
						// 			cmp.getComponent("refresh").hide();
						// 		}
						// 	}
						// }),
						//features: [filters],
						// selModel: {
						// 	selType: 'cellmodel'
						// },
						// plugins: [cellEditing]
				});
				var grid_mapros_avmt_detail = Ext.create('Ext.grid.Panel', {
					id 				: 'grid_mapros_avmt_detail',
					title 			: '<div style="text-align:center;">== &nbsp; DETAIL &nbsp; ==</div>',
					autoWidth 		: '80%',
					Height			: 450,
					columnLines 	: true,
					store 			: store_mapros_avmt_detail,
					viewConfig 		: {
						stripeRows 			: true,
						emptyText 	 		: '<div class="empty-txt">No data to display.</div>',
						deferEmptyText 		: false,
						enableTextSelection	: true
					},
					columns 	: [
						{	header 		: 'autoid',
							dataIndex 	: 'autoid',
							flex 		: 1,
							renderer	: upsize,
							hidden 		: true
						},
						{	header 		: 'ID AVMT',
							dataIndex 	: 'idavmt',
							flex 		: 1,
							renderer	: upsize,
							hidden 		: true
						},
						{	header 		: 'DUMMY MASTER',
							dataIndex 	: 'barcode',
							flex 		: 1,
							renderer	: upsize,
							hidden 		: true
						},
						{	header 		: 'STEP',
							dataIndex 	: 'step',
							width 		: 90,
							renderer	: upsize
						},
						{	header 		: 'TYPE',
							dataIndex 	: 'type',
							width 		: 90,
							renderer	: upsize
						},
						{	header 		: 'NAME',
							dataIndex 	: 'name',
							width 		: 180,
							renderer	: upsize
						},
						{	header 		: 'JUDGE',
							dataIndex 	: 'judgment',
							width 		: 80,
							renderer	: upsize
						},
						{	header 		: 'VOLT',
							dataIndex 	: 'volt',
							width 		: 75,
							renderer	: upsize
						},
						{	header 		: 'CURR',
							dataIndex 	: 'curr',
							width 		: 75,
							renderer	: upsize
						},
						{	header 		: 'FREQ',
							dataIndex 	: 'freq',
							width 		: 75,
							renderer	: upsize
						},
						{	header 		: 'LVLL',
							dataIndex 	: 'lvll',
							width 		: 75,
							renderer	: upsize
						},
						{	header 		: 'DSTL',
							dataIndex 	: 'dstl',
							width 		: 75,
							renderer	: upsize
						},
						{	header 		: 'DSTR',
							dataIndex 	: 'dstr',
							width 		: 75,
							renderer	: upsize
						},
						{	header 		: 'RELL',
							dataIndex 	: 'rell',
							width 		: 75,
							renderer	: upsize
						},
						{	header 		: 'RELR',
							dataIndex 	: 'relr',
							width 		: 75,
							renderer	: upsize
						},
						{	header 		: 'SNL',
							dataIndex 	: 'snl',
							width 		: 75,
							renderer	: upsize
						},
						{	header 		: 'SNR',
							dataIndex 	: 'snr',
							width 		: 75,
							renderer	: upsize
						},
						{	header 		: 'REMARK',
							dataIndex 	: 'remark',
							width 		: 100,
							renderer	: upsize
						},
						{	header 		: 'MCH NAME',
							dataIndex 	: 'input_user',
							width 		: 100,
							renderer	: upsize
						},
						{	header 		: 'INSP DATE',
							dataIndex 	: 'input_date',
							width 		: 100,
							renderer	: upsize
						},
						{	header 		: 'update_user',
							dataIndex 	: 'update_user',
							flex 		: 1,
							renderer	: upsize,
							hidden 		: true
						},
						{	header 		: 'update_date',
							dataIndex 	: 'update_date',
							flex 		: 1,
							renderer	: upsize,
							hidden 		: true
						}
					],
					bbar			: Ext.create('Ext.PagingToolbar', {
						pageSize		: itemperpage,
						store			: store_mapros_avmt_detail,
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
							afterrender : function (cmp) {
								cmp.getComponent("refresh").hide();
							}
						}
					}),
					//features: [filters],
					// selModel: {
					// 	selType: 'cellmodel'
					// },
					// plugins: [cellEditing]
				});
				var grid_mapros_avntest = Ext.create('Ext.grid.Panel', {
					id 				: 'grid_mapros_avntest',
					autoWidth 		: '100%',
					maxHeight		: 150,
					columnLines 	: true,
					store 			: store_mapros_avntest,
					viewConfig 		: {
						stripeRows 			: true,
						emptyText 	 		: '<div class="empty-txt">No data to display.</div>',
						deferEmptyText 		: false,
						enableTextSelection	: true
					},
					columns 	: [
						{	header 		: 'AVNTEST',
							dataIndex 	: 'idavnt',
							width 		: 200,
							renderer	: upsize
						},
						{	header 		: 'INSP DATE',
							dataIndex 	: 'dateinspec',
							width 		: 100,
							renderer	: upsize
						},
						{	header 		: 'TOTAL TIME',
							dataIndex 	: 'inspectime',
							width 		: 80,
							renderer	: upsize
						},
						{	header 		: 'SERIAL',
							dataIndex 	: 'serial',
							width 		: 140,
							renderer	: upsize
						},
						{	header 		: 'SN',
							dataIndex 	: 'sn',
							width 		: 80,
							renderer	: upsize
						},
						{	header 		: 'JIG NO',
							dataIndex 	: 'jigno',
							width 		: 80,
							renderer	: upsize
						},
						{	header 		: 'JUDGE',
							dataIndex 	: 'judge',
							width 		: 90,
							renderer	: upsize
						},
						{	header 		: 'FILE',
							dataIndex 	: 'artfilename',
							width 		: 80,
							renderer	: upsize
						},
						{	header 		: 'NG',
							dataIndex 	: 'ngcontent',
							width 		: 200,
							renderer	: upsize
						},
						{	header 		: 'OPERATOR',
							dataIndex 	: 'input_user',
							width 		: 120,
							renderer	: upsize
						},
						{	header 		: 'OPT SCAN',
							dataIndex 	: 'input_date',
							width 		: 120,
							renderer	: upsize
						}
					],
					plugins			: [{
	        				ptype	: 'rowwidget',
	        				widget	: {
				            xtype	: 'grid',
				            autoLoad: true,
				            bind	: {
				                store : '{store_mapros_avntest_detail}',
				                title : 'Orders for {record.idavnt}',
				                selection: '{idavnt}',
				            },
				            columns : [
				            			{	header 		: 'AVNTEST',
											dataIndex 	: 'idavnt',
											flex 		: 1,
											renderer	: upsize,
											hidden 		: true
										},
										{	header 		: 'STEP',
											dataIndex 	: 'step',
											flex 		: 1,
											renderer	: upsize
										},
										{	header 		: 'STEP DATA',
											dataIndex 	: 'stepdata',
											flex 		: 1,
											renderer	: upsize
										},
										{	header 		: 'MEASURE',
											dataIndex 	: 'measure',
											flex 		: 1,
											renderer	: upsize
										},
										{	header 		: 'MEASURE DATA',
											dataIndex 	: 'measuredata',
											flex 		: 1,
											renderer	: upsize
										},
										{	header 		: 'OPERATOR',
											dataIndex 	: 'input_user',
											flex 		: 1,
											renderer	: upsize
										},
										{	header 		: 'INSP DATE',
											dataIndex 	: 'input_date',
											flex 		: 1,
											renderer	: upsize
										}
									]
				        }
				    }],
			    	listeners: {
			    		select: function(grid, rowIndex, colIndex) {
			    			var rec = this.getSelectionModel().getSelection();
			    			var avnt = rec[0].data.idavnt;
			    			store_mapros_avntest_detail.proxy.setExtraParam('avnt',avnt);
			    			store_mapros_avntest_detail.loadPage(1);

			    		}
			    	},
					// bbar			: Ext.create('Ext.PagingToolbar', {
						// 	pageSize		: itemperpage,
						// 	store			: store_mapros_avntest,
						// 	displayInfo		: true,
						// 	displayMsg		: 'Data {0} - {1} from {2} data',
						// 	emptyMsg		: "Page not found",
						// 	beforePageText  : 'Page',
						// 	afterPageText   : 'from {0} Pages',
						// 	firstText       : 'First Page',
						// 	prevText        : 'Previous Page',
						// 	nextText        : 'Next page',
						// 	lastText        : 'Last Page',
						// 	plugins       	: Ext.create('Ext.ux.ProgressBarPager', {}),
						// 	listeners 		: {
						// 		afterrender : function (cmp) {
						// 			cmp.getComponent("refresh").hide();
						// 		}
						// 	}
						// }),
					//features: [filters],
						// selModel: {
						// 	selType: 'cellmodel'
						// },
						// plugins: [cellEditing]
				});
				var grid_mapros_avntest_detail = Ext.create('Ext.grid.Panel', {
					id 				: 'grid_mapros_avntest_detail',
					title 			: '<div style="text-align:center;">==== &nbsp; DETAIL &nbsp; ====</div>',
					autoWidth 		: '80%',
					Height			: 450,
					columnLines 	: true,
					store 			: store_mapros_avntest_detail,
					viewConfig 		: {
						stripeRows 			: true,
						emptyText 	 		: '<div class="empty-txt">No data to display.</div>',
						deferEmptyText 		: false,
						enableTextSelection	: true
					},
					columns 	: [
						{	header 		: 'AVNTEST',
							dataIndex 	: 'idavnt',
							flex 		: 1,
							renderer	: upsize,
							hidden 		: true
						},
						{	header 		: 'STEP',
							dataIndex 	: 'step',
							flex 		: 1,
							renderer	: upsize
						},
						{	header 		: 'STEP DATA',
							dataIndex 	: 'stepdata',
							flex 		: 1,
							renderer	: upsize
						},
						{	header 		: 'MEASURE',
							dataIndex 	: 'measure',
							flex 		: 1,
							renderer	: upsize
						},
						{	header 		: 'MEASURE DATA',
							dataIndex 	: 'measuredata',
							flex 		: 1,
							renderer	: upsize
						},
						{	header 		: 'MCH NAME',
							dataIndex 	: 'input_user',
							flex 		: 1,
							renderer	: upsize
						},
						{	header 		: 'INSP DATE',
							dataIndex 	: 'input_date',
							flex 		: 1,
							renderer	: upsize
						}
					],
					bbar			: Ext.create('Ext.PagingToolbar', {
						pageSize		: itemperpage,
						store			: store_mapros_avntest_detail,
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
							afterrender : function (cmp) {
								cmp.getComponent("refresh").hide();
							}
						}
					}),
					//features: [filters],
					// selModel: {
					// 	selType: 'cellmodel'
					// },
					// plugins: [cellEditing]
				});
				var grid_mapros_auto0 = Ext.create('Ext.grid.Panel', {
					id 				: 'grid_mapros_auto0',
					autoWidth 		: '100%',
					maxHeight		: 200,
					columnLines 	: true,
					store 			: store_mapros_line0,
					viewConfig 		: {
						stripeRows 			: true,
						emptyText 	 		: '<div class="empty-txt">No data to display.</div>',
						deferEmptyText 		: false,
						enableTextSelection	: true
					},
					columns 	: [
						{ 	header 		: 'ID',
							dataIndex 	: 'idlinezero',
							width 		: 200,
							renderer	: upsize
						},
						{	header 		: 'INSP DATE',
							dataIndex 	: 'dateinspec',
							width 		: 100,
							renderer	: upsize
						},
						{	header 		: 'TOTAL TIME',
							dataIndex 	: 'inspectime',
							width 		: 80,
							renderer	: upsize
						},
						{	header 		: 'SERIAL',
							dataIndex 	: 'serial',
							width 		: 140,
							renderer	: upsize
						},
						{	header 		: 'SN',
							dataIndex 	: 'sn',
							width 		: 150,
							renderer	: upsize
						},
						{	header 		: 'JIG NO',
							dataIndex 	: 'jigno',
							width 		: 80,
							renderer	: upsize
						},
						{	header 		: 'JUDGE',
							dataIndex 	: 'judge',
							width 		: 90,
							renderer	: upsize
						},
						{	header 		: 'FILE',
							dataIndex 	: 'artfilename',
							width 		: 80,
							renderer	: upsize
						},
						{	header 		: 'NG',
							dataIndex 	: 'ngcontent',
							width 		: 80,
							renderer	: upsize
						},
						{	header 		: 'MCH CODE',
							dataIndex 	: 'input_user',
							width 		: 120,
							renderer	: upsize
						},
						{	header 		: 'OPT SCAN',
							dataIndex 	: 'input_date',
							width 		: 120,
							renderer	: upsize,
							hidden 		: true
						}
					],
					plugins			: [
						{
	        				ptype	: 'rowwidget',
	        				widget	: {
					            xtype	: 'grid',
					            autoLoad: true,
					            store 	: store_mapros_line0_detail,
					            bind	: {
					                title : 'Orders for ( {record.idlinezero} )'
					            },
					            columns : [
					            			{	header 		: 'ID',
												dataIndex 	: 'idlinezero',
												flex 		: 1,
												renderer	: upsize,
												hidden 		: true
											},
											{	header 		: 'Row Number',
												dataIndex 	: 'rownumber',
												flex 		: 1,
												renderer	: upsize,
												hidden 		: true
											},
											{	header 		: 'STEP',
												dataIndex 	: 'step',
												flex 		: 1,
												renderer	: upsize
											},
											{	header 		: 'STEP DATA',
												dataIndex 	: 'stepdata',
												flex 		: 1,
												renderer	: upsize
											},
											{	header 		: 'MEASURE',
												dataIndex 	: 'measure',
												flex 		: 1,
												renderer	: upsize
											},
											{	header 		: 'MEASURE DATA',
												dataIndex 	: 'measuredata',
												flex 		: 1,
												renderer	: upsize
											},
											{	header 		: 'OPERATOR',
												dataIndex 	: 'input_user',
												flex 		: 1,
												renderer	: upsize
											},
											{	header 		: 'INSP DATE',
												dataIndex 	: 'input_date',
												flex 		: 1,
												renderer	: upsize
											}
								]
							}
				    	}
			    	],
					// bbar			: Ext.create('Ext.PagingToolbar', {
					// 	pageSize		: itemperpage,
					// 	store			: store_mapros_line0,
					// 	displayInfo		: true,
					// 	displayMsg		: 'Data {0} - {1} from {2} data',
					// 	emptyMsg		: "Page not found",
					// 	beforePageText  : 'Page',
					// 	afterPageText   : 'from {0} Pages',
					// 	firstText       : 'First Page',
					// 	prevText        : 'Previous Page',
					// 	nextText        : 'Next page',
					// 	lastText        : 'Last Page',
					// 	plugins       	: Ext.create('Ext.ux.ProgressBarPager', {}),
					// 	listeners 		: {
					// 		afterrender : function (cmp) {
					// 			cmp.getComponent("refresh").hide();
					// 		}
					// 	}
					// }),
					listeners: {
			    		select: function(grid, rowIndex, colIndex) {
			    			var rec = this.getSelectionModel().getSelection();
			    			var idlinezero = rec[0].data.idlinezero;
			    			store_mapros_line0_detail.proxy.setExtraParam('idline0',idlinezero);
			    			store_mapros_line0_detail.loadPage(1);

			    		}
			    	},
					//features: [filters],
					// selModel: {
					// 	selType: 'cellmodel'
					// },
					// plugins: [cellEditing]
				});
				var grid_mapros_auto0_detail = Ext.create('Ext.grid.Panel', {
					id 				: 'grid_mapros_auto0_detail',
					title 			: '<div style="text-align:center;">==== &nbsp; DETAIL &nbsp; ====</div>',
					autoWidth 		: '80%',
					height			: 450,
					columnLines 	: true,
					store 			: store_mapros_line0_detail,
					viewConfig 		: {
						stripeRows 			: true,
						emptyText 	 		: '<div class="empty-txt">No data to display.</div>',
						deferEmptyText 		: false,
						enableTextSelection	: true
					},
					columns 	: [
						{	header 		: 'ID',
							dataIndex 	: 'idlinezero',
							flex 		: 1,
							renderer	: upsize,
							hidden 		: true
						},
						{	header 		: 'Row Number',
							dataIndex 	: 'rownumber',
							flex 		: 1,
							renderer	: upsize,
							hidden 		: true
						},
						{	header 		: 'STEP',
							dataIndex 	: 'step',
							flex 		: 1,
							renderer	: upsize
						},
						{	header 		: 'STEP DATA',
							dataIndex 	: 'stepdata',
							flex 		: 1,
							renderer	: upsize
						},
						{	header 		: 'MEASURE',
							dataIndex 	: 'measure',
							flex 		: 1,
							renderer	: upsize
						},
						{	header 		: 'MEASURE DATA',
							dataIndex 	: 'measuredata',
							flex 		: 1,
							renderer	: upsize
						},
						{	header 		: 'OPERATOR',
							dataIndex 	: 'input_user',
							flex 		: 1,
							renderer	: upsize
						},
						{	header 		: 'INSP DATE',
							dataIndex 	: 'input_date',
							flex 		: 1,
							renderer	: upsize
						}
					],
					bbar			: Ext.create('Ext.PagingToolbar', {
						pageSize		: itemperpage_detail,
						store			: store_mapros_line0_detail,
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
							afterrender : function (cmp) {
								cmp.getComponent("refresh").hide();
							}
						}
					}),
			    	
					//features: [filters],
					// selModel: {
					// 	selType: 'cellmodel'
					// },
					// plugins: [cellEditing]
				});
				
				
		
		//	=======================================================  PANEL    =========================================
			var panel_fwdn = Ext.create('Ext.panel.Panel',{
			    border: true,
			    layout: 'border',
			   	defaults: {
				     split: false,
				     plain: true
			    },
			   	items: [{
				   region: 'north', // GRID SIDE
				   layout: 'fit',
				   items: grid_mapros_fwdn
				   }, {
				   region: 'center', // GRID SIDE
				   layout: 'fit',
				   items: grid_mapros_fwdn_detail
				   }]
		  	});
			var panel_avmt = Ext.create('Ext.panel.Panel',{
			    border: true,
			    layout: 'border',
			   	defaults: {
				     split: false,
				     plain: true
			    },
			   	items: [{
				   region: 'north', // GRID SIDE
				   layout: 'fit',
				   items: grid_mapros_avmt
				   }, {
				   region: 'center', // GRID SIDE
				   layout: 'fit',
				   items: grid_mapros_avmt_detail
				   }]
			  });
			var panel_avntest = Ext.create('Ext.panel.Panel',{
			    border: true,
			    layout: 'border',
			   	defaults: {
				     split: false,
				     plain: true
			    },
			   	items: [{
				   region: 'north', // GRID SIDE
				   layout: 'fit',
				   items: grid_mapros_avntest
				   }, {
				   region: 'center', // GRID SIDE
				   layout: 'fit',
				   items: grid_mapros_avntest_detail
				   }]
			  });
			var panel_auto0 = Ext.create('Ext.panel.Panel',{
			    border: true,
			    layout: 'border',
			   	defaults: {
				     split: false,
				     plain: true
			    },
			   	items: [{
				   region: 'north', // GRID SIDE
				   layout: 'fit',
				   items: grid_mapros_auto0
				   }, {
				   region: 'center', // GRID SIDE
				   layout: 'fit',
				   items: grid_mapros_auto0_detail
				   }]
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
					height		: 500,
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
							layout		: 'fit',
							items 		: [panel_fwdn]
						}, 
						{	title 		: 'FLASH',
						 	id  		: 'show_grid_flash',
							reorderable : false,
							items 		: [grid_mapros_flash]
						}, 
						{	title 		: 'AVN TEST',
						 	id  		: 'show_grid_avntest',
							reorderable : false,
							layout		: 'fit',
							items 		: [panel_avntest]
						}, 
						{	title 		: 'AVMT',
						 	id  		: 'show_grid_avmt',
							reorderable : false,
							layout		: 'fit',
							items 		: [panel_avmt]
						}, 
						{	title 		: 'AUTO LINE ZERO',
						 	id  		: 'show_grid_zero',
							reorderable : false,
							layout		: 'fit',
							items 		: [panel_auto0]
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
					//value:  	'000267B000010001',
					//value:  	'YJ5224A00VT_01B7002A0001',
					value:  	'YJ5224A01MN_00A7010A0002',
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
															store_mapros_fwdn.proxy.setExtraParam('boardid', boardid);
															store_mapros_fwdn.loadPage(1);
															store_mapros_fwdn_detail.proxy.setExtraParam('idfwdn', '');
															store_mapros_fwdn_detail.loadPage(1);
															store_mapros_flash.proxy.setExtraParam('boardid', boardid);
															store_mapros_flash.loadPage(1);
															store_mapros_avntest.proxy.setExtraParam('boardid', boardid);
															store_mapros_avntest.loadPage(1);
															store_mapros_avntest_detail.proxy.setExtraParam('avnt', '');
															store_mapros_avntest_detail.loadPage(1);
															store_mapros_avmt.proxy.setExtraParam('boardid', boardid);
															store_mapros_avmt.loadPage(1);
															store_mapros_avmt_detail.proxy.setExtraParam('avmt','');
			    											store_mapros_avmt_detail.loadPage(1);
															store_mapros_line0.proxy.setExtraParam('boardid', boardid);
															store_mapros_line0.loadPage(1);
															store_mapros_line0_detail.proxy.setExtraParam('idline0','');
			    											store_mapros_line0_detail.loadPage(1);

														}
													}
												}
								}
				});
		
		//	==** end **==

	});