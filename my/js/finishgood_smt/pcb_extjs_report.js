Ext.onReady(function() {
	var item3 = 3;
	var item5 = 5;
	var item10 = 10;
	//	=======================================================    MODEL        =====================================
		Ext.define('modelSMTQuality',{
			extend: 'Ext.data.Model',
			fields	: ['inputid','dateid','group','shift','mch','model_name','start_serial','serial_no','lot_no','lot_qty','pcb_name','pwb_no','process','ai','smt','loc','ng','magazineno','boardke','boardqty','pointqty','inputdate']
		});
		Ext.define('modelSmtProdRes',{
			extend: 'Ext.data.Model',
			fields: ['tgl','bln','thn','date','line_name','shift','model_name','lot','prod_no','st_serial','serial_output','symptom','def_cause','p_disposal','responsible']
		});

		// Ext.define('modelMaprosBoard',{
			// extend: 'Ext.data.Model',
			// fields: ['board_id','guid_master','guid_ticket','modelname','lotno',
			// 'scanner_id','status','scan_nik','judge','created_at',
			// 'updated_at','lineprocess','line','totalCount']
			// });
			// Ext.define('modelMaprosBoardSymptom',{
			// extend: 'Ext.data.Model',
			// fields: ['pwbid','refno','category','lineprocess','boardid',
			// 'guidmaster','guidticket','modelname','lotno','scannerid',
			// 'status','scannik','judge','created_at','update_at']
			// });
			// Ext.define('modelMaprosPanel',{
			// extend: 'Ext.data.Model',
			// fields: ['ticket_no','guid_master','guid_ticket','modelname',
			// 'scanner_id','status','scan_nik','judge','created_at',
			// 'updated_at','lineprocess','line']
			// });
			// Ext.define('modelMaprosLCD',{
			// extend: 'Ext.data.Model',
			// fields: ['barcode','guid_master','guid_ticket','modelname',
			// 'scanner_id','status','scan_nik','judge','created_at',
			// 'updated_at','lineprocess','line']
			// });
			// Ext.define('modelMaprosMecha',{
			// extend: 'Ext.data.Model',
			// fields: ['barcode','guid_master','guid_ticket','modelname',
			// 'scanner_id','status','scan_nik','judge','created_at',
			// 'updated_at','lineprocess','line']
			// });
			// Ext.define('modelMaprosMain',{
			// extend: 'Ext.data.Model',
			// fields: ['ticket_no_master','guid_master','modelname',
			// 'scanner_id','status','scan_nik','judge','created_at',
			// 'updated_at','lineprocess','line', 'serial_no']
			// });
			// Ext.define('modelMaprosMainSymptom',{
			// extend: 'Ext.data.Model',
			// fields: ['master_id','serial_no','judge',
			// 'symptom_id','category','created_at','updated_at','line_id',
			// 'lineprocess_id','lineprocess','line']
			// });
			// Ext.define('modelMaprosCritical',{
			// extend: 'Ext.data.Model',
			// fields: ['qrcode_mc','guid_master_ticket','supp_code',
			// 'part_no','po','prod_date','qty','modelname','scan_nik',
			// 'created_at','updated_at', 'lineprocessname','line']
			// });


			// im_quality.proxy.setExtraParam('prod_date', prod_date);
			// im_quality.proxy.setExtraParam('model', model);
			// im_quality.proxy.setExtraParam('st_serial', serial_no);
			// //im_quality.proxy.setExtraParam('serial_no', serialno_id);
			// im_quality.loadPage(1);
		
	//	=======================================================    DATASTORE    =====================================
		var storeSmtQuality = Ext.create('Ext.data.Store',{ //zaki 20161017 _Z_
			storeId	: 'storeSmtQuality',
			model	: 'modelSMTQuality',
			autoLoad: false,
			proxy   : {
				type    : 'ajax',
				url     : 'json/finishgood_smt/json_SMTQuality.php',
				reader  : {
					type    : 'json',
					root    : 'rows'
					// totalProperty  : 'totalCount'
				}
			}
		});

		var storeSmtProdRes = Ext.create('Ext.data.Store',{
				id		: 'storeSmtProdRes',
				model	: 'modelSmtProdRes',
				autoLoad: false,
				pageSize: itemperpage,
				proxy   : {
                    type    : 'ajax',
                    url     : 'json/json_prd_res.php',
                    reader  : {
                        type    : 'json',
                        root    : 'rows',
                        totalProperty  : 'totalCount'
                    }
                }
			});
		// var storeMaprosBoard = Ext.create('Ext.data.Store',{
			// 	storeId : 'storeMaprosBoard',
			// 	model	: 'modelMaprosBoard',
			// 	autoLoad: false,
			// 	// pageSize: item5,
			// 	proxy   : {
			// 		type    : 'ajax',
			// 		url     : 'json/finishgood_ma/json_maprosBoard.php',
			// 		reader  : {
			// 			type    : 'json',
			// 			root    : 'rows',
			// 			totalProperty : 'totalCount'
			// 		}
			// 	},
			// 	listeners: {
			// 		load: function(store, records) {
			// 			if (records != "") {
			// 				Ext.getStore('storeMaprosBoardSymptom').loadPage(1);
			// 				Ext.getStore('storeMaprosPanel').loadPage(1);
			// 			} 
			// 		}
			// 	}
			// });
			// var storeMaprosBoardSymptom = Ext.create('Ext.data.Store',{
			// 	storeId : 'storeMaprosBoardSymptom',
			// 	model	: 'modelMaprosBoardSymptom',
			// 	autoLoad: false,
			// 	// pageSize: item3,
			// 	proxy   : {
			// 		type    : 'ajax',
			// 		url     : 'json/finishgood_ma/json_maprosBoardSymptom.php',
			// 		reader  : {
			// 			type    : 'json',
			// 			root    : 'rows'
			// 		}
			// 	}
			// });
			// var storeMaprosPanel = Ext.create('Ext.data.Store',{
			// 	storeId : 'storeMaprosPanel',
			// 	model	: 'modelMaprosPanel',
			// 	autoLoad: false,
			// 	// pageSize: itemperpage,
			// 	proxy   : {
			// 		type    : 'ajax',
			// 		url     : 'json/finishgood_ma/json_maprosPanel.php',
			// 		reader  : {
			// 			type    : 'json',
			// 			root    : 'rows'
			// 		}
			// 	},
			// 	listeners: {
			// 		load: function(store, records) {
			// 			if (records != "") {
			// 				var guidticket = store.getAt(0).get('guid_ticket');
			// 				///alert(guidticket);
			// 				Ext.getStore('storeMaprosLCD').loadPage(1);
			// 				Ext.getStore('storeMaprosMecha').loadPage(1);
			// 				Ext.getStore('storeMaprosMain').loadPage(1);
			// 				Ext.getStore('storeMaQualityReport').proxy.setExtraParam('valguidticket', guidticket);
			// 			} 
			// 		}
			// 	}
			// });
			// var storeMaprosLCD = Ext.create('Ext.data.Store',{
			// 	storeId : 'storeMaprosLCD',
			// 	model	: 'modelMaprosLCD',
			// 	autoLoad: false,
			// 	// pageSize: itemperpage,
			// 	proxy   : {
			// 		type    : 'ajax',
			// 		url     : 'json/finishgood_ma/json_maprosLCD.php',
			// 		reader  : {
			// 			type    : 'json',
			// 			root    : 'rows'
			// 		}
			// 	}
			// });
			// var storeMaprosMecha = Ext.create('Ext.data.Store',{
			// 	storeId : 'storeMaprosMecha',
			// 	model	: 'modelMaprosMecha',
			// 	autoLoad: false,
			// 	// pageSize: itemperpage,
			// 	proxy   : {
			// 		type    : 'ajax',
			// 		url     : 'json/finishgood_ma/json_maprosMecha.php',
			// 		reader  : {
			// 			type    : 'json',
			// 			root    : 'rows'
			// 		}
			// 	}
			// });
			// var storeMaprosMain = Ext.create('Ext.data.Store',{
			// 	storeId	: 'storeMaprosMain',
			// 	model	: 'modelMaprosMain',
			// 	autoLoad: false,
			// 	// pageSize: itemperpage,
			// 	proxy   : {
			// 		type    : 'ajax',
			// 		url     : 'json/finishgood_ma/json_maprosMain.php',
			// 		reader  : {
			// 			type    : 'json',
			// 			root    : 'rows'
			// 		}
			// 	},
			// 	listeners: {
			// 		load: function(store, records) {
			// 			if (records != "") {
			// 				Ext.getStore('storeMaprosMainSymptom').loadPage(1);
			// 				Ext.getStore('storeMaprosCritical').loadPage(1);
			// 			} 
			// 		}
			// 	}
			// });
			// var storeMaprosMainSymptom = Ext.create('Ext.data.Store',{
			// 	storeId	: 'storeMaprosMainSymptom',
			// 	model	: 'modelMaprosMainSymptom',
			// 	autoLoad: false,
			// 	// pageSize: itemperpage,
			// 	proxy   : {
			// 		type    : 'ajax',
			// 		url     : 'json/finishgood_ma/json_maprosMainSymptom.php',
			// 		reader  : {
			// 			type    : 'json',
			// 			root    : 'rows'
			// 		}
			// 	},
			// 	// listeners: {
			// 	// 	load: function(store, records) {
			// 	// 		if (records != "") {

			// 	// 			storeMaprosBoard.proxy.setExtraParam('model', boardid);
			// 	// 			storeMaprosBoard.proxy.setExtraParam('serial_no', cavity);
			// 	// 			storeMaprosBoard.loadPage(1);
			// 	// 			store_mapros_panel_fg.proxy.setExtraParam('boardid', boardid);
			// 	// 			store_mapros_panel_fg.proxy.setExtraParam('cavity', cavity);
			// 	// 			store_mapros_panel_fg.loadPage(1);
			// 	// 		} k
			// 	// 	}
			// 	// }
			// });
			// var storeMaprosCritical = Ext.create('Ext.data.Store',{
			// 	storeId	: 'storeMaprosCritical',
			// 	model	: 'modelMaprosCritical',
			// 	autoLoad: false,
			// 	// pageSize: itemperpage,
			// 	proxy   : {
			// 		type    : 'ajax',
			// 		url     : 'json/finishgood_ma/json_maprosCritical.php',
			// 		reader  : {
			// 			type    : 'json',
			// 			root    : 'rows'
			// 		}
			// 	},
			// 	// listeners: {
			// 	// 	load: function(store, records) {
			// 	// 		if (records != "") {

			// 	// 			storeMaprosBoard.proxy.setExtraParam('model', boardid);
			// 	// 			storeMaprosBoard.proxy.setExtraParam('serial_no', cavity);
			// 	// 			storeMaprosBoard.loadPage(1);
			// 	// 			store_mapros_panel_fg.proxy.setExtraParam('boardid', boardid);
			// 	// 			store_mapros_panel_fg.proxy.setExtraParam('cavity', cavity);
			// 	// 			store_mapros_panel_fg.loadPage(1);
			// 	// 		} 
			// 	// 	}
			// 	// }
			// });
	//	=======================================================    GRID         =====================================
        var grid_QReport = Ext.create('Ext.grid.Panel',{
            id          : 'grid_QReport',
            width       : '100%',
            height  	: 380,
            columnLines : true,
            store       : storeSmtQuality,
            viewConfig  : {
                stripeRows  : true,
				emptyText	: '<div class="empty-txt">Select the AOI Board for this result</div>',
				deferEmptyText: false,
				enableTextSelection	: true
            },
            columns     : [
				{ 	header: 'InputID',		dataIndex: 'inputid', 	 componentCls: 'headergrid', flex: 1,	 hidden:true },
				{ 	header: 'Date',			dataIndex: 'dateid',	 componentCls: 'headergrid', width: 80,	 renderer: Ext.util.Format.dateRenderer('Y-m-d') },
				{ 	header: 'Group',		dataIndex: 'group',		 componentCls: 'headergrid', width: 50,	},
				{ 	header: 'Shift',		dataIndex: 'shift',		 componentCls: 'headergrid', width: 50,	},
				{ 	header: 'Machine Name',	dataIndex: 'mch',		 componentCls: 'headergrid', width: 60,	},
				{ 	header: 'Model Name',	dataIndex: 'model_name', componentCls: 'headergrid', width: 100,	},
				{ 	header: 'Start Serial', dataIndex: 'start_serial', componentCls: 'headergrid', 	width: 60,	},
				{ 	header: 'Start Number', dataIndex: 'serial_no', componentCls: 'headergrid', width: 100,	},
				{ 	header: 'Lot No', 		dataIndex: 'lot_no', 	componentCls: 'headergrid', width: 50, 	},
				{ 	header: 'Lot Qty', 		dataIndex: 'lot_qty', 	componentCls: 'headergrid', width: 60, 	},
				{ 	header: 'PCB Name', 	dataIndex: 'pcb_name', 	componentCls: 'headergrid', width: 70,  summaryType: 'count' },
				{ 	header: 'PWB No', 		dataIndex: 'pwb_no', 	componentCls: 'headergrid', width: 80, },
				{ 	header: 'Process', 		dataIndex: 'process', 	componentCls: 'headergrid', width: 60,	},
				{ 	header: 'AI', 			dataIndex: 'ai', 		componentCls: 'headergrid', width: 100,  hidden: true },
				{ 	header: 'Problem/Symptom', dataIndex: 'smt',	componentCls: 'headergrid', width: 150, },
				{ 	header: 'Location', 	dataIndex: 'loc', 		componentCls: 'headergrid', width: 70 },
				{	header: 'Magazine No', 	dataIndex: 'magazineno', componentCls: 'headergrid', width: 100 },
				{ 	header: 'NG Found By',	dataIndex: 'ng', 		componentCls: 'headergrid', width: 100 },
				{ 	header: 'Board No',	 	dataIndex: 'boardke', 	componentCls: 'headergrid', width: 70 },
				{ 	header: 'Board NG Qty', dataIndex: 'boardqty', 	componentCls: 'headergrid', width: 100, summaryType: 'sum' },
				{ 	header: 'Point NG Qty', dataIndex: 'pointqty', 	componentCls: 'headergrid', width: 100, summaryType: 'sum' },
				{	header: 'Input Date', 	dataIndex: 'inputdate', componentCls: 'headergrid', width: 130 }
            ],
			features:[
			// {
			// 	ftype	: 'filters',
			// 	encode	: encode,
			// 	local	: local
			// }
			],
			bbar	: Ext.create('Ext.PagingToolbar', {
				pageSize		: itemperpage,
				store			: storeSmtQuality,
				displayInfo		: true,
				// displayMsg		: 'Data {0} - {1} from {2} data',
				// emptyMsg		: "Page not found",
				// beforePageText  : 'Page',
				// afterPageText   : 'from {0} Pages',
				// firstText       : 'First Page',
				// prevText        : 'Previous Page',
				// nextText        : 'Next page',
				// lastText        : 'Last Page',
				// plugins       	: Ext.create('Ext.ux.ProgressBarPager', {}),
				listeners 		: {
					afterrender: function (cmp) {
						cmp.getComponent("refresh").hide();
						cmp.getComponent("first").hide();
						cmp.getComponent("last").hide();
					}
				}
			})
        });

        grid_QReport.getStore().on('load', function() {
            grid_QReport.getView().stripeRows 			= true;
			grid_QReport.getView().deferEmptyText 		= false;
			grid_QReport.getView().enableTextSelection	= true;
            grid_QReport.getView().emptyText = '<div class="empty-txt2">Please input Serial Number in IQRS System.<br><br><a href="http://136.198.117.48/iqrs/home.php?page=page1" target="_blank">Click Here to going to IQRS System</a></div>';
            grid_QReport.getView().refresh();
        });

     	var grid_ProdRes = Ext.create('Ext.grid.Panel',{
            id          : 'grid_ProdRes',
            width       : '100%',
            height  	: 295,
            columnLines : true,
            store       : storeSmtProdRes,
            viewConfig  : {
                stripeRows  : true,
				emptyText	: '<div class="empty-txt">No data to display.</div>',
				deferEmptyText: false,
				enableTextSelection	: true
            },
            columns     : [
                { header      : 'Prod. Date',	  dataIndex   : 'date', 			width:100,	renderer: upsize },
                { header      : 'Line Name',	  dataIndex   : 'line_name',		width:90,	renderer: upsize, hidden: true },
                { header      : 'Shift',	  	  dataIndex   : 'shift',			width:50,	renderer: upsize },
                { header      : 'Model Name',	  dataIndex   : 'model_name',		width:130,	renderer: upsize, hidden: true },
                { header      : 'Lot Size',	  	  dataIndex   : 'lot',				width:70,	renderer: upsize },
                { header      : 'Prod No',	  	  dataIndex   : 'prod_no',			flex:1,		renderer: upsize, hidden: true },
                { header      : 'Start Serial',	  dataIndex   : 'st_serial',		flex:1,		renderer: upsize, hidden: true },
                { header      : 'SN O/P',	  	  dataIndex   : 'serial_output',	flex:1,		renderer: upsize, hidden: true },
                { header      : 'Symptom',	  	  dataIndex   : 'symptom',			flex:1,		renderer: upsize },
                { header      : 'Defective Cause',dataIndex   : 'def_cause',		flex:1,		renderer: upsize },
                { header      : 'P. Disposal',	  dataIndex   : 'p_disposal',		flex:1,		renderer: upsize },
                { header      : 'Responsible',	  dataIndex   : 'responsible',		flex:1,		renderer: upsize },
            ],
            /*tbar    : [
                {
                    xtype       : 'tbspacer', width:5
                },{
                    xtype       : 'button',
                    id          : 'btn-refresh',
                    iconCls     : 'refresh',
                    name        : 'btn-refresh',
                    text        : '<div class="btn-refresh">Refresh</div>',
                    scale       : 'medium'
                }
            ],
			bbar        : Ext.create('Ext.PagingToolbar',{
                pageSize    : itemperpage,
                store       : prd_res_store,
                displayInfo : true,
                plugins     : Ext.create('Ext.ux.ProgressBarPager',{}),
                listeners   : {
                    afterrender : function(cmp){
                        this.getComponent("refresh").hide();
                    }
                }
            })*/
        });


  //       var grid_maprosBoard = Ext.create('Ext.grid.Panel', {
		// 	id 				: 'grid_maprosBoard',
		// 	autoWidth 		: '100%',
		// 	height			: 300,
		// 	columnLines 	: true,
		// 	store 			: storeMaprosBoard,
		// 	viewConfig	: {
		// 		stripeRows 			: true,
		// 		emptyText 			: '<div class="empty-txt-main">Select Plan Table for show this data.</div>',
		// 		deferEmptyText 		: false,
		// 		enableTextSelection	: true,
		// 		getRowClass			: function(record, rowIndex, rowParams, store) {
		// 			if (record.get('status')==='IN') return 'colorin';
		// 			else if (record.get('status')==='OUT') return 'colorout';
		// 		},
		// 		listeners 			: {
		// 			refresh : function (dataview) {
		// 				Ext.each(dataview.panel.columns, function (column) {
		// 					if (column.autoSizeColumn === true)
		// 						column.autoSize();
		// 				})
		// 			}
		// 		}
		// 	},
		// 	tbar		: [
		// 		{
		// 			xtype	: 'button',
		// 			id		: 'dlPCB',
		// 			iconCls	: 'download',
		// 			text 	: 'Download',
		// 			tooltip	: 'Download',
		// 			handler : function (){
		// 				var rbCheck 	= $("#valOfCategory").val();
		// 				var modelName 	= $("#model-name").val().toUpperCase();
		// 				var serialNo 	= $("#serial-no").val().toUpperCase();
		// 				var lotNo 		= $("#lot-no").val().toUpperCase();
		// 				var dummySerial = $("#dummy-serial").val().toUpperCase();

		// 				console.log('rbCheck 		= '+rbCheck);
		// 				console.log('modelName 		= '+modelName);
		// 				console.log('serialNo 		= '+serialNo);
		// 				console.log('lotNo 			= '+lotNo);
		// 				console.log('dummySerial 	= '+dummySerial);
		// 				window.open('resp/finishgood_ma/dlFgMaprosPcbSerial.php?rb='+rbCheck+'&mdl='+modelName+'&s='+serialNo+'&l='+lotNo+'&ds='+dummySerial+'');
		// 			}
		// 		}
		// 	],
		// 	columns 	: [
		// 		{	header 		: 'PCB SERIAL',
		// 			dataIndex 	: 'board_id',
		// 			componentCls	: 'headergrid',
		// 			flex 			: false,
		// 			autoSizeColumn 	: true,
		// 			renderer 		: upsize
		// 		},
		// 		{	header 		: 'guid_master',
		// 			dataIndex 	: 'guid_master',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer 		: upsize,
		// 			hidden		: true
		// 		},
		// 		{	header 		: 'guid_ticket',
		// 			dataIndex 	: 'guid_ticket',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer 		: upsize,
		// 			hidden		: true
		// 		},
		// 		{	header 		: 'MODEL',
		// 			dataIndex 	: 'modelname',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer 		: upsize,
		// 			hidden		: true
		// 		},
		// 		{	header 		: 'LINE',
		// 			dataIndex 	: 'line',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize
		// 		},
		// 		{	header 		: 'lotno',
		// 			dataIndex 	: 'lotno',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize,
		// 			hidden		: true
		// 		},
		// 		{	header 		: 'Process',
		// 			dataIndex 	: 'lineprocess',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize
		// 		},
		// 		{	header 		: 'scanner_id',
		// 			dataIndex 	: 'scanner_id',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize,
		// 			hidden		: true
		// 		},
		// 		{	header 		: 'Status',
		// 			dataIndex 	: 'status',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize
		// 		},
		// 		{	header 		: 'Judge',
		// 			dataIndex 	: 'judge',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize
		// 		},
		// 		{	header 		: 'Emp No',
		// 			dataIndex 	: 'scan_nik',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize
		// 		},
		// 		{	header 		: 'Process Date',
		// 			dataIndex 	: 'created_at',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize
		// 		},
		// 		{	header 		: 'updated_at',
		// 			dataIndex 	: 'updated_at',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize,
		// 			hidden		: true
		// 		}
		// 	],
		// 	listeners: {
		// 		select: function(grid, rowIndex, colIndex){
		// 			var rec  	 	= this.getSelectionModel().getSelection();
		// 			var guidmaster  = rec[0].data.guid_ticket;
					
		// 			Ext.getStore('storeMaQualityReport').proxy.setExtraParam('valguidmaster', guidmaster);
		// 			Ext.getStore('storeMaQualityReport').loadPage(1);
		// 			Ext.getStore('storeMaFwdn').loadPage(1);
		// 			Ext.getStore('storeMaFlash').loadPage(1);
		// 			Ext.getStore('storeMaLine0').loadPage(1);
		// 			Ext.getStore('storeMaAvntest').loadPage(1);
		// 		}
		// 	}
		// 	// bbar		: Ext.create('Ext.PagingToolbar', {
		// 	// 	// pageSize	: item5,
		// 	// 	store		: storeMaprosBoard,
		// 	// 	displayInfo	: true,
		// 	// 	listeners 	: {
		// 	// 		afterrender: function (cmp) {
		// 	// 			cmp.getComponent("refresh").hide();
		// 	// 			cmp.getComponent("first").hide();
		// 	// 			cmp.getComponent("last").hide();
		// 	// 		}
		// 	// 	}
		// 	// })
		// 	//features: [filters],
		// 	// selModel: {
		// 	// 	selType: 'cellmodel'
		// 	// },
		// 	// plugins: [cellEditing]
		// });
		
		// grid_maprosBoard.getStore().on('load', function() {
	 //        grid_maprosBoard.getView().stripeRows 			= true;
		// 	grid_maprosBoard.getView().deferEmptyText 		= false;
		// 	grid_maprosBoard.getView().enableTextSelection	= true;
	 //        grid_maprosBoard.getView().emptyText = '<div class="empty-txt-main">Data Not Available.</div>';
	 //        grid_maprosBoard.getView().refresh();
	 //    });

		// var grid_maprosPanel = Ext.create('Ext.grid.Panel', {
		// 	id 				: 'grid_maprosPanel',
		// 	autoWidth 		: '100%',
		// 	maxHeight		: 600,
		// 	columnLines 	: true,
		// 	store 			: storeMaprosPanel,
		// 	viewConfig		: {
		// 		stripeRows 			: true,
		// 		emptyText 			: '<div class="empty-txt-main">Select Plan Table for show this data.</div>',
		// 		deferEmptyText 		: false,
		// 		enableTextSelection	: true,
		// 		getRowClass			: function(record, rowIndex, rowParams, store) {
		// 			if (record.get('status')==='IN') return 'colorin';
		// 			else if (record.get('status')==='OUT') return 'colorout';
		// 		},
		// 		listeners 			: {
		// 			refresh : function (dataview) {
		// 				Ext.each(dataview.panel.columns, function (column) {
		// 					if (column.autoSizeColumn === true)
		// 						column.autoSize();
		// 				})
		// 			}
		// 		}
		// 	},
		// 	tbar		: [
		// 		{
		// 			xtype	: 'button',
		// 			id		: 'dlPanel',
		// 			iconCls	: 'download',
		// 			text 	: 'Download',
		// 			tooltip	: 'Download',
		// 			handler : function (){
		// 				var rbCheck 	= $("#valOfCategory").val();
		// 				var modelName 	= $("#model-name").val().toUpperCase();
		// 				var serialNo 	= $("#serial-no").val().toUpperCase();
		// 				var lotNo 		= $("#lot-no").val().toUpperCase();
		// 				var dummySerial = $("#dummy-serial").val().toUpperCase();

		// 				console.log('rbCheck 		= '+rbCheck);
		// 				console.log('modelName 		= '+modelName);
		// 				console.log('serialNo 		= '+serialNo);
		// 				console.log('lotNo 			= '+lotNo);
		// 				console.log('dummySerial 	= '+dummySerial);
		// 				window.open('resp/finishgood_ma/dlFgMaprosPanel.php?rb='+rbCheck+'&mdl='+modelName+'&s='+serialNo+'&l='+lotNo+'&ds='+dummySerial+'');
		// 			}
		// 		}
		// 	],
		// 	columns 	: [
		// 		{	header 		: 'PANEL NO',
		// 			dataIndex 	: 'ticket_no',
		// 			componentCls	: 'headergrid',
		// 			flex 			: false,
		// 			autoSizeColumn 	: true,
		// 			renderer	: upsize
		// 		},
		// 		{	header 		: 'guid_master',
		// 			dataIndex 	: 'guid_master',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize,
		// 			hidden		: true
		// 		},
		// 		{	header 		: 'guid_ticket',
		// 			dataIndex 	: 'guid_ticket',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize,
		// 			hidden		: true
		// 		},
		// 		{	header 		: 'MODEL',
		// 			dataIndex 	: 'modelname',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize,
		// 			hidden		: true
		// 		},
		// 		{	header 		: 'LINE',
		// 			dataIndex 	: 'line',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize
		// 		},
		// 		{	header 		: 'PROCESS',
		// 			dataIndex 	: 'lineprocess',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize
		// 		},
		// 		{	header 		: 'scanner_id',
		// 			dataIndex 	: 'scanner_id',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize,
		// 			hidden		: true
		// 		},
		// 		{	header 		: 'STATUS',
		// 			dataIndex 	: 'status',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize
		// 		},
		// 		{	header 		: 'JUDGE',
		// 			dataIndex 	: 'judge',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize
		// 		},
		// 		{	header 		: 'PROCESS DATE',
		// 			dataIndex 	: 'created_at',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize
		// 		},
		// 		{	header 		: 'EMP NO',
		// 			dataIndex 	: 'scan_nik',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize
		// 		},
		// 		{	header 		: 'updated_at',
		// 			dataIndex 	: 'updated_at',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize,
		// 			hidden		: true
		// 		}
		// 	],
		// 	//features: [filters],
		// 	// selModel: {
		// 	// 	selType: 'cellmodel'
		// 	// },
		// 	// plugins: [cellEditing]
		// });

		// grid_maprosPanel.getStore().on('load', function() {
	 //        grid_maprosPanel.getView().stripeRows 			= true;
		// 	grid_maprosPanel.getView().deferEmptyText 		= false;
		// 	grid_maprosPanel.getView().enableTextSelection	= true;
	 //        grid_maprosPanel.getView().emptyText = '<div class="empty-txt-main">Data Not Available.</div>';
	 //        grid_maprosPanel.getView().refresh();
	 //    });

		// var grid_maprosLCD = Ext.create('Ext.grid.Panel', {
		// 	id 				: 'grid_maprosLCD',
		// 	autoWidth 		: '100%',
		// 	maxHeight		: 600,
		// 	columnLines 	: true,
		// 	store 			: storeMaprosLCD,
		// 	viewConfig		: {
		// 		stripeRows 			: true,
		// 		emptyText 			: '<div class="empty-txt-main">Select Plan Table for show this data.</div>',
		// 		deferEmptyText 		: false,
		// 		enableTextSelection	: true,
		// 		getRowClass			: function(record, rowIndex, rowParams, store) {
		// 			if (record.get('status')==='IN') return 'colorin';
		// 			else if (record.get('status')==='OUT') return 'colorout';
		// 		},
		// 		listeners 			: {
		// 			refresh : function (dataview) {
		// 				Ext.each(dataview.panel.columns, function (column) {
		// 					if (column.autoSizeColumn === true)
		// 						column.autoSize();
		// 				})
		// 			}
		// 		}
		// 	},
		// 	tbar		: [
		// 		{
		// 			xtype	: 'button',
		// 			id		: 'dlLCD',
		// 			iconCls	: 'download',
		// 			text 	: 'Download',
		// 			tooltip	: 'Download',
		// 			handler : function (){
		// 				var rbCheck 	= $("#valOfCategory").val();
		// 				var modelName 	= $("#model-name").val().toUpperCase();
		// 				var serialNo 	= $("#serial-no").val().toUpperCase();
		// 				var lotNo 		= $("#lot-no").val().toUpperCase();
		// 				var dummySerial = $("#dummy-serial").val().toUpperCase();

		// 				console.log('rbCheck 		= '+rbCheck);
		// 				console.log('modelName 		= '+modelName);
		// 				console.log('serialNo 		= '+serialNo);
		// 				console.log('lotNo 			= '+lotNo);
		// 				console.log('dummySerial 	= '+dummySerial);
		// 				window.open('resp/finishgood_ma/dlFgMaprosLCD.php?rb='+rbCheck+'&mdl='+modelName+'&s='+serialNo+'&l='+lotNo+'&ds='+dummySerial+'');
		// 			}
		// 		}
		// 	],
		// 	columns 	: [
		// 		{	header 		: 'LCD ID',
		// 			dataIndex 	: 'barcode',
		// 			componentCls	: 'headergrid',
		// 			flex 			: false,
		// 			autoSizeColumn 	: true,
		// 			renderer	: upsize
		// 		},
		// 		{	header 		: 'guid_master',
		// 			dataIndex 	: 'guid_master',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize,
		// 			hidden		: true
		// 		},
		// 		{	header 		: 'guid_ticket',
		// 			dataIndex 	: 'guid_ticket',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize,
		// 			hidden		: true
		// 		},
		// 		{	header 		: 'MODEL',
		// 			dataIndex 	: 'modelname',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize,
		// 			hidden		: true
		// 		},
		// 		{	header 		: 'LINE',
		// 			dataIndex 	: 'line',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize
		// 		},
		// 		{	header 		: 'PROCESS',
		// 			dataIndex 	: 'lineprocess',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize
		// 		},
		// 		{	header 		: 'scanner_id',
		// 			dataIndex 	: 'scanner_id',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize,
		// 			hidden		: true
		// 		},
		// 		{	header 		: 'STATUS',
		// 			dataIndex 	: 'status',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize
		// 		},
		// 		{	header 		: 'JUDGE',
		// 			dataIndex 	: 'judge',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize
		// 		},
		// 		{	header 		: 'PROCESS DATE',
		// 			dataIndex 	: 'created_at',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize
		// 		},
		// 		{	header 		: 'EMP NO',
		// 			dataIndex 	: 'scan_nik',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize
		// 		},
		// 		{	header 		: 'updated_at',
		// 			dataIndex 	: 'updated_at',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize,
		// 			hidden		: true
		// 		}
		// 	],
		// 	//features: [filters],
		// 	// selModel: {
		// 	// 	selType: 'cellmodel'
		// 	// },
		// 	// plugins: [cellEditing]
		// });

		// grid_maprosLCD.getStore().on('load', function() {
	 //        grid_maprosLCD.getView().stripeRows 			= true;
		// 	grid_maprosLCD.getView().deferEmptyText 		= false;
		// 	grid_maprosLCD.getView().enableTextSelection	= true;
	 //        grid_maprosLCD.getView().emptyText = '<div class="empty-txt-main">Data Not Available.</div>';
	 //        grid_maprosLCD.getView().refresh();
	 //    });

		// var grid_maprosMecha = Ext.create('Ext.grid.Panel', {
		// 	id 				: 'grid_maprosMecha',
		// 	autoWidth 		: '100%',
		// 	maxHeight		: 600,
		// 	columnLines 	: true,
		// 	store 			: storeMaprosMecha,
		// 	viewConfig		: {
		// 		stripeRows 			: true,
		// 		emptyText 			: '<div class="empty-txt-main">Select Plan Table for show this data.</div>',
		// 		deferEmptyText 		: false,
		// 		enableTextSelection	: true,
		// 		getRowClass			: function(record, rowIndex, rowParams, store) {
		// 			if (record.get('status')==='IN') return 'colorin';
		// 			else if (record.get('status')==='OUT') return 'colorout';
		// 		},
		// 		listeners 			: {
		// 			refresh : function (dataview) {
		// 				Ext.each(dataview.panel.columns, function (column) {
		// 					if (column.autoSizeColumn === true)
		// 						column.autoSize();
		// 				})
		// 			}
		// 		}
		// 	},
		// 	tbar		: [
		// 		{
		// 			xtype	: 'button',
		// 			id		: 'dlMecha',
		// 			iconCls	: 'download',
		// 			text 	: 'Download',
		// 			tooltip	: 'Download',
		// 			handler : function (){
		// 				var rbCheck 	= $("#valOfCategory").val();
		// 				var modelName 	= $("#model-name").val().toUpperCase();
		// 				var serialNo 	= $("#serial-no").val().toUpperCase();
		// 				var lotNo 		= $("#lot-no").val().toUpperCase();
		// 				var dummySerial = $("#dummy-serial").val().toUpperCase();

		// 				console.log('rbCheck 		= '+rbCheck);
		// 				console.log('modelName 		= '+modelName);
		// 				console.log('serialNo 		= '+serialNo);
		// 				console.log('lotNo 			= '+lotNo);
		// 				console.log('dummySerial 	= '+dummySerial);
		// 				window.open('resp/finishgood_ma/dlFgMaprosMecha.php?rb='+rbCheck+'&mdl='+modelName+'&s='+serialNo+'&l='+lotNo+'&ds='+dummySerial+'');
		// 			}
		// 		}
		// 	],
		// 	columns 	: [
		// 		{	header 		: 'Mecha ID',
		// 			dataIndex 	: 'barcode',
		// 			componentCls	: 'headergrid',
		// 			flex 			: false,
		// 			autoSizeColumn 	: true,
		// 			renderer	: upsize
		// 		},
		// 		{	header 		: 'guid_master',
		// 			dataIndex 	: 'guid_master',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize,
		// 			hidden		: true
		// 		},
		// 		{	header 		: 'guid_ticket',
		// 			dataIndex 	: 'guid_ticket',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize,
		// 			hidden		: true
		// 		},
		// 		{	header 		: 'MODEL',
		// 			dataIndex 	: 'modelname',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize,
		// 			hidden		: true
		// 		},
		// 		{	header 		: 'LINE',
		// 			dataIndex 	: 'line',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize
		// 		},
		// 		{	header 		: 'PROCESS',
		// 			dataIndex 	: 'lineprocess',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize
		// 		},
		// 		{	header 		: 'scanner_id',
		// 			dataIndex 	: 'scanner_id',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize,
		// 			hidden		: true
		// 		},
		// 		{	header 		: 'STATUS',
		// 			dataIndex 	: 'status',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize
		// 		},
		// 		{	header 		: 'JUDGE',
		// 			dataIndex 	: 'judge',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize
		// 		},
		// 		{	header 		: 'PROCESS DATE',
		// 			dataIndex 	: 'created_at',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize
		// 		},
		// 		{	header 		: 'EMP NO',
		// 			dataIndex 	: 'scan_nik',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize
		// 		},
		// 		{	header 		: 'updated_at',
		// 			dataIndex 	: 'updated_at',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize,
		// 			hidden		: true
		// 		}
		// 	],
		// 	//features: [filters],
		// 	// selModel: {
		// 	// 	selType: 'cellmodel'
		// 	// },
		// 	// plugins: [cellEditing]
		// });

		// grid_maprosMecha.getStore().on('load', function() {
	 //        grid_maprosMecha.getView().stripeRows 			= true;
		// 	grid_maprosMecha.getView().deferEmptyText 		= false;
		// 	grid_maprosMecha.getView().enableTextSelection	= true;
	 //        grid_maprosMecha.getView().emptyText = '<div class="empty-txt-main">Data Not Available.</div>';
	 //        grid_maprosMecha.getView().refresh();
	 //    });

		// var grid_maprosMain = Ext.create('Ext.grid.Panel', {
		// 	id 				: 'grid_maprosMain',
		// 	autoWidth 		: '100%',
		// 	height			: 300,
		// 	columnLines 	: true,
		// 	store 			: storeMaprosMain,
		// 	viewConfig		: {
		// 		stripeRows 			: true,
		// 		emptyText 			: '<div class="empty-txt-main">Select Plan Table for show this data.</div>',
		// 		deferEmptyText 		: false,
		// 		enableTextSelection	: true,
		// 		getRowClass			: function(record, rowIndex, rowParams, store) {
		// 			if (record.get('status')==='IN') return 'colorin';
		// 			else if (record.get('status')==='OUT') return 'colorout';
		// 		},
		// 		listeners 			: {
		// 			refresh : function (dataview) {
		// 				Ext.each(dataview.panel.columns, function (column) {
		// 					if (column.autoSizeColumn === true)
		// 						column.autoSize();
		// 				})
		// 			}
		// 		}
		// 	},
		// 	tbar		: [
		// 		{
		// 			xtype	: 'button',
		// 			id		: 'dlMaster',
		// 			iconCls	: 'download',
		// 			text 	: 'Download',
		// 			tooltip	: 'Download',
		// 			handler : function (){
		// 				var rbCheck 	= $("#valOfCategory").val();
		// 				var modelName 	= $("#model-name").val().toUpperCase();
		// 				var serialNo 	= $("#serial-no").val().toUpperCase();
		// 				var lotNo 		= $("#lot-no").val().toUpperCase();
		// 				var dummySerial = $("#dummy-serial").val().toUpperCase();

		// 				console.log('rbCheck 		= '+rbCheck);
		// 				console.log('modelName 		= '+modelName);
		// 				console.log('serialNo 		= '+serialNo);
		// 				console.log('lotNo 			= '+lotNo);
		// 				console.log('dummySerial 	= '+dummySerial);
		// 				window.open('resp/finishgood_ma/dlFgMaprosMaster.php?rb='+rbCheck+'&mdl='+modelName+'&s='+serialNo+'&l='+lotNo+'&ds='+dummySerial+'');
		// 			}
		// 		}
		// 	],
		// 	columns 	: [
		// 		{	header 		: 'DUMMY SERIAL',
		// 			dataIndex 	: 'ticket_no_master',
		// 			componentCls	: 'headergrid',
		// 			flex 			: false,
		// 			autoSizeColumn 	: true,
		// 			renderer	: upsize
		// 		},
		// 		{	header 		: 'guid_master',
		// 			dataIndex 	: 'guid_master',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize,
		// 			hidden		: true
		// 		},
		// 		{	header 		: 'MODEL',
		// 			dataIndex 	: 'modelname',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize,
		// 			hidden		: true
		// 		},
		// 		{	header 		: 'LINE',
		// 			dataIndex 	: 'line',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize
		// 		},
		// 		{	header 		: 'PROCESS',
		// 			dataIndex 	: 'lineprocess',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize
		// 		},
		// 		{	header 		: 'scanner_id',
		// 			dataIndex 	: 'scanner_id',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize,
		// 			hidden		: true
		// 		},
		// 		{	header 		: 'STATUS',
		// 			dataIndex 	: 'status',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize
		// 		},
		// 		{	header 		: 'JUDGE',
		// 			dataIndex 	: 'judge',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize
		// 		},
		// 		{	header 		: 'PROCESS DATE',
		// 			dataIndex 	: 'created_at',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize
		// 		},
		// 		{	header 		: 'EMP NO',
		// 			dataIndex 	: 'scan_nik',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize
		// 		},
		// 		{	header 		: 'updated_at',
		// 			dataIndex 	: 'updated_at',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize,
		// 			hidden		: true
		// 		},
		// 		{	header 		: 'serial_no',
		// 			dataIndex 	: 'serial_no',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize,
		// 			hidden		: true
		// 		}
		// 	],
		// 	listeners: {
		// 		select: function(grid, rowIndex, colIndex){
		// 			var rec  	 	= this.getSelectionModel().getSelection();
		// 			var guidmaster  = rec[0].data.guid_master;
					
		// 			Ext.getStore('storeMaQualityReport').proxy.setExtraParam('valguidmaster', guidmaster);
		// 			Ext.getStore('storeMaQualityReport').loadPage(1);
		// 			Ext.getStore('storeMaAvmt').loadPage(1);
		// 		}
		// 	}
		// 	//features: [filters],
		// 	// selModel: {
		// 	// 	selType: 'cellmodel'
		// 	// },
		// 	// plugins: [cellEditing]
		// });

		// grid_maprosMain.getStore().on('load', function() {
	 //        grid_maprosMain.getView().stripeRows 			= true;
		// 	grid_maprosMain.getView().deferEmptyText 		= false;
		// 	grid_maprosMain.getView().enableTextSelection	= true;
	 //        grid_maprosMain.getView().emptyText = '<div class="empty-txt-main">Data Not Available.</div>';
	 //        grid_maprosMain.getView().refresh();
	 //    });

		// var grid_maprosCritical = Ext.create('Ext.grid.Panel', {
		// 	id 				: 'grid_maprosCritical',
		// 	autoWidth 		: '100%',
		// 	height			: 500,
		// 	columnLines 	: true,
		// 	store 			: storeMaprosCritical,
		// 	viewConfig		: {
		// 		stripeRows 			: true,
		// 		emptyText 			: '<div class="empty-txt-main">Select Plan Table for show this data.</div>',
		// 		deferEmptyText 		: false,
		// 		enableTextSelection	: true,
		// 		getRowClass			: function(record, rowIndex, rowParams, store) {
		// 			if (record.get('status')==='IN') return 'colorin';
		// 			else if (record.get('status')==='OUT') return 'colorout';
		// 		},
		// 		listeners 			: {
		// 			refresh : function (dataview) {
		// 				Ext.each(dataview.panel.columns, function (column) {
		// 					if (column.autoSizeColumn === true)
		// 						column.autoSize();
		// 				})
		// 			}
		// 		}
		// 	},
		// 	tbar		: [
		// 		{
		// 			xtype	: 'button',
		// 			id		: 'dlCritical',
		// 			iconCls	: 'download',
		// 			text 	: 'Download',
		// 			tooltip	: 'Download',
		// 			handler : function (){
		// 				var rbCheck 	= $("#valOfCategory").val();
		// 				var modelName 	= $("#model-name").val().toUpperCase();
		// 				var serialNo 	= $("#serial-no").val().toUpperCase();
		// 				var lotNo 		= $("#lot-no").val().toUpperCase();
		// 				var dummySerial = $("#dummy-serial").val().toUpperCase();

		// 				console.log('rbCheck 		= '+rbCheck);
		// 				console.log('modelName 		= '+modelName);
		// 				console.log('serialNo 		= '+serialNo);
		// 				console.log('lotNo 			= '+lotNo);
		// 				console.log('dummySerial 	= '+dummySerial);
		// 				window.open('resp/finishgood_ma/dlFgMaprosCritical.php?rb='+rbCheck+'&mdl='+modelName+'&s='+serialNo+'&l='+lotNo+'&ds='+dummySerial+'');
		// 			}
		// 		}
		// 	],
		// 	columns 	: [

				
		// 		{	header 		: 'MC Label',
		// 			dataIndex 	: 'qrcode_mc',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize
		// 		},
		// 		{	header 		: 'Unique Code',
		// 			dataIndex 	: 'guid_master_ticket',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize
		// 		},
		// 		{	header 		: 'Supp Code',
		// 			dataIndex 	: 'supp_code',
		// 			componentCls	: 'headergrid',
		// 			flex 			: false,
		// 			autoSizeColumn 	: true,
		// 			renderer	: upsize
		// 		},
		// 		{	header 		: 'Partno',
		// 			dataIndex 	: 'part_no',
		// 			componentCls	: 'headergrid',
		// 			flex 			: true,
		// 			autoSizeColumn 	: false,
		// 			renderer	: upsize
		// 		},
		// 		{	header 		: 'PO',
		// 			dataIndex 	: 'po',
		// 			componentCls	: 'headergrid',
		// 			flex 			: false,
		// 			autoSizeColumn 	: true,
		// 			renderer	: upsize
		// 		},
		// 		{	header 		: 'Prod. Date',
		// 			dataIndex 	: 'prod_date',
		// 			componentCls	: 'headergrid',
		// 			flex 			: false,
		// 			autoSizeColumn 	: true,
		// 			renderer	: upsize
		// 		},
		// 		{	header 		: 'QTY',
		// 			dataIndex 	: 'qty',
		// 			componentCls	: 'headergrid',
		// 			flex 			: false,
		// 			autoSizeColumn 	: true,
		// 			renderer	: upsize
		// 		},
		// 		{	header 		: 'Model',
		// 			dataIndex 	: 'modelname',
		// 			componentCls	: 'headergrid',
		// 			flex 			: false,
		// 			autoSizeColumn 	: true,
		// 			renderer	: upsize
		// 		},
		// 		{	header 		: 'Emp No',
		// 			dataIndex 	: 'scan_nik',
		// 			componentCls	: 'headergrid',
		// 			flex 			: false,
		// 			autoSizeColumn 	: true,
		// 			renderer	: upsize
		// 		},
		// 		{	header 		: 'Created Date',
		// 			dataIndex 	: 'created_at',
		// 			componentCls	: 'headergrid',
		// 			flex 			: false,
		// 			autoSizeColumn 	: true,
		// 			renderer	: upsize
		// 		},
		// 		{	header 		: 'Update Date',
		// 			dataIndex 	: 'updated_at',
		// 			componentCls	: 'headergrid',
		// 			flex 			: false,
		// 			autoSizeColumn 	: true,
		// 			renderer	: upsize
		// 		},
		// 		{	header 		: 'Line Process',
		// 			dataIndex 	: 'lineprocessname',
		// 			componentCls	: 'headergrid',
		// 			flex 			: false,
		// 			autoSizeColumn 	: true,
		// 			renderer	: upsize
		// 		},
		// 		{	header 		: 'Line',
		// 			dataIndex 	: 'line',
		// 			componentCls	: 'headergrid',
		// 			flex 			: false,
		// 			autoSizeColumn 	: true,
		// 			renderer	: upsize
		// 		}
		// 	],
		// 	//features: [filters],
		// 	// selModel: {
		// 	// 	selType: 'cellmodel'
		// 	// },
		// 	// plugins: [cellEditing]
		// });

		// grid_maprosCritical.getStore().on('load', function() {
	 //        grid_maprosCritical.getView().stripeRows 			= true;
		// 	grid_maprosCritical.getView().deferEmptyText 		= false;
		// 	grid_maprosCritical.getView().enableTextSelection	= true;
	 //        grid_maprosCritical.getView().emptyText = '<div class="empty-txt-main">Data Not Available.</div>';
	 //        grid_maprosCritical.getView().refresh();
	 //    });
		
		
	//	=======================================================	TAB PANEL    	=====================================

		var smt_report = Ext.create('Ext.tab.Panel', {
			id  		: 'smt_report',
			renderTo 	: 'smtReport',
			plain 		: true,
			activeTab 	: 0,
			autoWidth 	: '100%',
			height		: 430,
			autoScroll 	: true,
			frame 		: true,
			style 		: 'padding:5px;-background:#157FCC;',
			tabBar 		: {
				flex	: 1,
				layout 	: {
					pack 	: 'center',
					align 	: 'stretch'
				}
			},
			items 		: [
				{	title 		: 'Quality Report',
				 	id  		: 'show_gridQReport',
					reorderable : false,
					items 		: [grid_QReport]
				},
				{	title 		: 'Downtime Report',
				 	id  		: 'show_gridDowntime',
					reorderable : false,
					// items 		: [grid_Downtime]
				},
				{	title 		: 'Production Result',
				 	id  		: 'show_gridProdRes',
					reorderable : false,
					items 		: [grid_ProdRes]
				}
			]
		});
});