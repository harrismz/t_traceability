Ext.onReady(function() {
	var item3 = 3;
	var item5 = 5;
	var item10 = 10;
	//	=======================================================    MODEL        =====================================
		Ext.define('modelMaprosBoard',{
	        extend: 'Ext.data.Model',
	        fields: ['board_id','guid_master','guid_ticket','modelname','lotno',
						'scanner_id','status','scan_nik','judge','created_at',
						'updated_at','lineprocess','line','totalCount']
		});
		Ext.define('modelMaprosBoardSymptom',{
	        extend: 'Ext.data.Model',
	        fields: ['pwbid','refno','category','lineprocess','boardid',
						'guidmaster','guidticket','modelname','lotno','scannerid',
						'status','scannik','judge','created_at','update_at']
		});
		Ext.define('modelMaprosPanel',{
            extend: 'Ext.data.Model',
            fields: ['ticket_no','guid_master','guid_ticket','modelname',
					'scanner_id','status','scan_nik','judge','created_at',
					'updated_at','lineprocess','line']
    	});
  		Ext.define('modelMaprosLCD',{
            extend: 'Ext.data.Model',
            fields: ['barcode','guid_master','guid_ticket','modelname',
					'scanner_id','status','scan_nik','judge','created_at',
					'updated_at','lineprocess','line']
    	});
     	Ext.define('modelMaprosMecha',{
            extend: 'Ext.data.Model',
            fields: ['barcode','guid_master','guid_ticket','modelname',
					'scanner_id','status','scan_nik','judge','created_at',
					'updated_at','lineprocess','line']
    	});
    	Ext.define('modelMaprosMain',{
            extend: 'Ext.data.Model',
            fields: ['ticket_no_master','guid_master','modelname',
					'scanner_id','status','scan_nik','judge','created_at',
					'updated_at','lineprocess','line', 'serial_no']
   		});
   		Ext.define('modelMaprosMainSymptom',{
            extend: 'Ext.data.Model',
            fields: ['master_id','serial_no','judge',
					'symptom_id','category','created_at','updated_at','line_id',
					'lineprocess_id','lineprocess','line']
   		});
   		Ext.define('modelMaprosCritical',{
            extend: 'Ext.data.Model',
            fields: ['qrcode_mc','guid_master_ticket','supp_code',
					'part_no','po','prod_date','qty','modelname','scan_nik',
					'created_at','update_at', 'lineprocessname','line']
   		});

	//	=======================================================    DATASTORE    =====================================
		var storeMaprosBoard = Ext.create('Ext.data.Store',{
			storeId : 'storeMaprosBoard',
			model	: 'modelMaprosBoard',
			autoLoad: false,
			// pageSize: item5,
			proxy   : {
				type    : 'ajax',
				url     : 'json/finishgood_ma/json_maprosBoard.php',
				reader  : {
					type    : 'json',
					root    : 'rows',
					totalProperty : 'totalCount'
				}
			},
			listeners: {
				load: function(store, records) {
					if (records != "") {
						Ext.getStore('storeMaprosBoardSymptom').loadPage(1);
						Ext.getStore('storeMaprosPanel').loadPage(1);
					} 
				}
			}
		});
		var storeMaprosBoardSymptom = Ext.create('Ext.data.Store',{
			storeId : 'storeMaprosBoardSymptom',
			model	: 'modelMaprosBoardSymptom',
			autoLoad: false,
			// pageSize: item3,
			proxy   : {
				type    : 'ajax',
				url     : 'json/finishgood_ma/json_maprosBoardSymptom.php',
				reader  : {
					type    : 'json',
					root    : 'rows'
				}
			}
		});
		var storeMaprosPanel = Ext.create('Ext.data.Store',{
			storeId : 'storeMaprosPanel',
			model	: 'modelMaprosPanel',
			autoLoad: false,
			// pageSize: itemperpage,
			proxy   : {
				type    : 'ajax',
				url     : 'json/finishgood_ma/json_maprosPanel.php',
				reader  : {
					type    : 'json',
					root    : 'rows'
				}
			},
			listeners: {
				load: function(store, records) {
					if (records != "") {
						var guidticket = store.getAt(0).get('guid_ticket');
						///alert(guidticket);
						Ext.getStore('storeMaprosLCD').loadPage(1);
						Ext.getStore('storeMaprosMecha').loadPage(1);
						Ext.getStore('storeMaprosMain').loadPage(1);
						Ext.getStore('storeMaQualityReport').proxy.setExtraParam('valguidticket', guidticket);
					} 
				}
			}
		});
		var storeMaprosLCD = Ext.create('Ext.data.Store',{
			storeId : 'storeMaprosLCD',
			model	: 'modelMaprosLCD',
			autoLoad: false,
			// pageSize: itemperpage,
			proxy   : {
				type    : 'ajax',
				url     : 'json/finishgood_ma/json_maprosLCD.php',
				reader  : {
					type    : 'json',
					root    : 'rows'
				}
			}
		});
		var storeMaprosMecha = Ext.create('Ext.data.Store',{
			storeId : 'storeMaprosMecha',
			model	: 'modelMaprosMecha',
			autoLoad: false,
			// pageSize: itemperpage,
			proxy   : {
				type    : 'ajax',
				url     : 'json/finishgood_ma/json_maprosMecha.php',
				reader  : {
					type    : 'json',
					root    : 'rows'
				}
			}
		});
		var storeMaprosMain = Ext.create('Ext.data.Store',{
			storeId	: 'storeMaprosMain',
			model	: 'modelMaprosMain',
			autoLoad: false,
			// pageSize: itemperpage,
			proxy   : {
				type    : 'ajax',
				url     : 'json/finishgood_ma/json_maprosMain.php',
				reader  : {
					type    : 'json',
					root    : 'rows'
				}
			},
			listeners: {
				load: function(store, records) {
					if (records != "") {
						Ext.getStore('storeMaprosMainSymptom').loadPage(1);
						Ext.getStore('storeMaprosCritical').loadPage(1);
					} 
				}
			}
		});
		var storeMaprosMainSymptom = Ext.create('Ext.data.Store',{
			storeId	: 'storeMaprosMainSymptom',
			model	: 'modelMaprosMainSymptom',
			autoLoad: false,
			// pageSize: itemperpage,
			proxy   : {
				type    : 'ajax',
				url     : 'json/finishgood_ma/json_maprosMainSymptom.php',
				reader  : {
					type    : 'json',
					root    : 'rows'
				}
			},
			// listeners: {
			// 	load: function(store, records) {
			// 		if (records != "") {

			// 			storeMaprosBoard.proxy.setExtraParam('model', boardid);
			// 			storeMaprosBoard.proxy.setExtraParam('serial_no', cavity);
			// 			storeMaprosBoard.loadPage(1);
			// 			store_mapros_panel_fg.proxy.setExtraParam('boardid', boardid);
			// 			store_mapros_panel_fg.proxy.setExtraParam('cavity', cavity);
			// 			store_mapros_panel_fg.loadPage(1);
			// 		} k
			// 	}
			// }
		});
		var storeMaprosCritical = Ext.create('Ext.data.Store',{
			storeId	: 'storeMaprosCritical',
			model	: 'modelMaprosCritical',
			autoLoad: false,
			// pageSize: itemperpage,
			proxy   : {
				type    : 'ajax',
				url     : 'json/finishgood_ma/json_maprosCritical.php',
				reader  : {
					type    : 'json',
					root    : 'rows'
				}
			},
			// listeners: {
			// 	load: function(store, records) {
			// 		if (records != "") {

			// 			storeMaprosBoard.proxy.setExtraParam('model', boardid);
			// 			storeMaprosBoard.proxy.setExtraParam('serial_no', cavity);
			// 			storeMaprosBoard.loadPage(1);
			// 			store_mapros_panel_fg.proxy.setExtraParam('boardid', boardid);
			// 			store_mapros_panel_fg.proxy.setExtraParam('cavity', cavity);
			// 			store_mapros_panel_fg.loadPage(1);
			// 		} 
			// 	}
			// }
		});
	//	=======================================================    GRID         =====================================
        var grid_maprosBoard = Ext.create('Ext.grid.Panel', {
			id 				: 'grid_maprosBoard',
			autoWidth 		: '100%',
			height			: 300,
			columnLines 	: true,
			store 			: storeMaprosBoard,
			viewConfig	: {
				stripeRows 			: true,
				emptyText 			: '<div class="empty-txt-main">Select Plan Table for show this data.</div>',
				deferEmptyText 		: false,
				enableTextSelection	: true,
				getRowClass			: function(record, rowIndex, rowParams, store) {
					if (record.get('status')==='IN') return 'colorin';
					else if (record.get('status')==='OUT') return 'colorout';
				},
				listeners 			: {
					refresh : function (dataview) {
						Ext.each(dataview.panel.columns, function (column) {
							if (column.autoSizeColumn === true)
								column.autoSize();
						})
					}
				}
			},
			tbar		: [
				{
					xtype	: 'button',
					id		: 'dlPCB',
					iconCls	: 'download',
					text 	: 'Download',
					tooltip	: 'Download',
					handler : function (){
						var rbCheck 	= $("#valOfCategory").val();
						var modelName 	= $("#model-name").val().toUpperCase();
						var serialNo 	= $("#serial-no").val().toUpperCase();
						var lotNo 		= $("#lot-no").val().toUpperCase();
						var dummySerial = $("#dummy-serial").val().toUpperCase();

						console.log('rbCheck 		= '+rbCheck);
						console.log('modelName 		= '+modelName);
						console.log('serialNo 		= '+serialNo);
						console.log('lotNo 			= '+lotNo);
						console.log('dummySerial 	= '+dummySerial);
						window.open('resp/finishgood_ma/dlFgMaprosPcbSerial.php?rb='+rbCheck+'&mdl='+modelName+'&s='+serialNo+'&l='+lotNo+'&ds='+dummySerial+'');
					
						// var valstdate 		= Ext.Date.format(new Ext.getCmp('valstdate').getValue(), 'Ymd');
						// var valendate 		= Ext.Date.format(new Ext.getCmp('valendate').getValue(), 'Ymd');
						// var valstatus 		= Ext.getCmp('valstatus').getValue();
						// var validstockcard 	= Ext.getCmp('validstockcard').getValue();
						// var valmodel 		= Ext.getCmp('valmodel').getValue();
						// var valline 		= Ext.getCmp('valline').getValue();
						// var vallotno 		= Ext.getCmp('vallotno').getValue();
						// window.open('resp/down_stockcard.php?valstdate='+valstdate+'&valendate='+valendate+'&valstatus='+valstatus+'&validstockcard='+validstockcard+'&valmodel='+valmodel+'&valline='+valline+'&vallotno='+vallotno+'');
					}
				}
			],
			columns 	: [
				{	header 		: 'PCB SERIAL',
					dataIndex 	: 'board_id',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer 		: fontstyle
				},
				{	header 		: 'guid_master',
					dataIndex 	: 'guid_master',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 		: fontstyle,
					hidden		: true
				},
				{	header 		: 'guid_ticket',
					dataIndex 	: 'guid_ticket',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 		: fontstyle,
					hidden		: true
				},
				{	header 		: 'MODEL',
					dataIndex 	: 'modelname',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 		: fontstyle,
					hidden		: true
				},
				{	header 		: 'LINE',
					dataIndex 	: 'line',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'lotno',
					dataIndex 	: 'lotno',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle,
					hidden		: true
				},
				{	header 		: 'Process',
					dataIndex 	: 'lineprocess',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'scanner_id',
					dataIndex 	: 'scanner_id',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle,
					hidden		: true
				},
				{	header 		: 'Status',
					dataIndex 	: 'status',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'Judge',
					dataIndex 	: 'judge',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'Emp No',
					dataIndex 	: 'scan_nik',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'Process Date',
					dataIndex 	: 'created_at',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'updated_at',
					dataIndex 	: 'updated_at',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle,
					hidden		: true
				}
			],
			listeners: {
				select: function(grid, rowIndex, colIndex){
					var rec  	 	= this.getSelectionModel().getSelection();
					var guidmaster  = rec[0].data.guid_ticket;
					
					Ext.getStore('storeMaQualityReport').proxy.setExtraParam('valguidmaster', guidmaster);
					Ext.getStore('storeMaQualityReport').loadPage(1);
					Ext.getStore('storeMaFwdn').loadPage(1);
					Ext.getStore('storeMaFlash').loadPage(1);
					Ext.getStore('storeMaLine0').loadPage(1);
					Ext.getStore('storeMaAvntest').loadPage(1);
				}
			}
			// bbar		: Ext.create('Ext.PagingToolbar', {
			// 	// pageSize	: item5,
			// 	store		: storeMaprosBoard,
			// 	displayInfo	: true,
			// 	listeners 	: {
			// 		afterrender: function (cmp) {
			// 			cmp.getComponent("refresh").hide();
			// 			cmp.getComponent("first").hide();
			// 			cmp.getComponent("last").hide();
			// 		}
			// 	}
			// })
			//features: [filters],
			// selModel: {
			// 	selType: 'cellmodel'
			// },
			// plugins: [cellEditing]
		});
		
		grid_maprosBoard.getStore().on('load', function() {
	        grid_maprosBoard.getView().stripeRows 			= true;
			grid_maprosBoard.getView().deferEmptyText 		= false;
			grid_maprosBoard.getView().enableTextSelection	= true;
	        grid_maprosBoard.getView().emptyText = '<div class="empty-txt-main">Data Not Available.</div>';
	        grid_maprosBoard.getView().refresh();
	    });

		var grid_maprosPanel = Ext.create('Ext.grid.Panel', {
			id 				: 'grid_maprosPanel',
			autoWidth 		: '100%',
			maxHeight		: 600,
			columnLines 	: true,
			store 			: storeMaprosPanel,
			viewConfig		: {
				stripeRows 			: true,
				emptyText 			: '<div class="empty-txt-main">Select Plan Table for show this data.</div>',
				deferEmptyText 		: false,
				enableTextSelection	: true,
				getRowClass			: function(record, rowIndex, rowParams, store) {
					if (record.get('status')==='IN') return 'colorin';
					else if (record.get('status')==='OUT') return 'colorout';
				},
				listeners 			: {
					refresh : function (dataview) {
						Ext.each(dataview.panel.columns, function (column) {
							if (column.autoSizeColumn === true)
								column.autoSize();
						})
					}
				}
			},
			tbar		: [
				'->',{
					xtype	: 'button',
					id		: 'dlPanel',
					iconCls	: 'download',
					text 	: 'Download',
					tooltip	: 'Download',
					handler : function (){
						var valstdate 		= Ext.Date.format(new Ext.getCmp('valstdate').getValue(), 'Ymd');
						var valendate 		= Ext.Date.format(new Ext.getCmp('valendate').getValue(), 'Ymd');
						var valstatus 		= Ext.getCmp('valstatus').getValue();
						var validstockcard 	= Ext.getCmp('validstockcard').getValue();
						var valmodel 		= Ext.getCmp('valmodel').getValue();
						var valline 		= Ext.getCmp('valline').getValue();
						var vallotno 		= Ext.getCmp('vallotno').getValue();
						window.open('resp/down_stockcard.php?valstdate='+valstdate+'&valendate='+valendate+'&valstatus='+valstatus+'&validstockcard='+validstockcard+'&valmodel='+valmodel+'&valline='+valline+'&vallotno='+vallotno+'');
					}
				}
			],
			columns 	: [
				{	header 		: 'PANEL NO',
					dataIndex 	: 'ticket_no',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer	: fontstyle
				},
				{	header 		: 'guid_master',
					dataIndex 	: 'guid_master',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle,
					hidden		: true
				},
				{	header 		: 'guid_ticket',
					dataIndex 	: 'guid_ticket',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle,
					hidden		: true
				},
				{	header 		: 'MODEL',
					dataIndex 	: 'modelname',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle,
					hidden		: true
				},
				{	header 		: 'LINE',
					dataIndex 	: 'line',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'PROCESS',
					dataIndex 	: 'lineprocess',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'scanner_id',
					dataIndex 	: 'scanner_id',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle,
					hidden		: true
				},
				{	header 		: 'STATUS',
					dataIndex 	: 'status',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'JUDGE',
					dataIndex 	: 'judge',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'PROCESS DATE',
					dataIndex 	: 'created_at',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'EMP NO',
					dataIndex 	: 'scan_nik',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'updated_at',
					dataIndex 	: 'updated_at',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle,
					hidden		: true
				}
			],
			//features: [filters],
			// selModel: {
			// 	selType: 'cellmodel'
			// },
			// plugins: [cellEditing]
		});

		grid_maprosPanel.getStore().on('load', function() {
	        grid_maprosPanel.getView().stripeRows 			= true;
			grid_maprosPanel.getView().deferEmptyText 		= false;
			grid_maprosPanel.getView().enableTextSelection	= true;
	        grid_maprosPanel.getView().emptyText = '<div class="empty-txt-main">Data Not Available.</div>';
	        grid_maprosPanel.getView().refresh();
	    });

		var grid_maprosLCD = Ext.create('Ext.grid.Panel', {
			id 				: 'grid_maprosLCD',
			autoWidth 		: '100%',
			maxHeight		: 600,
			columnLines 	: true,
			store 			: storeMaprosLCD,
			viewConfig		: {
				stripeRows 			: true,
				emptyText 			: '<div class="empty-txt-main">Select Plan Table for show this data.</div>',
				deferEmptyText 		: false,
				enableTextSelection	: true,
				getRowClass			: function(record, rowIndex, rowParams, store) {
					if (record.get('status')==='IN') return 'colorin';
					else if (record.get('status')==='OUT') return 'colorout';
				},
				listeners 			: {
					refresh : function (dataview) {
						Ext.each(dataview.panel.columns, function (column) {
							if (column.autoSizeColumn === true)
								column.autoSize();
						})
					}
				}
			},
			tbar		: [
				'->',{
					xtype	: 'button',
					id		: 'dlLCD',
					iconCls	: 'download',
					text 	: 'Download',
					tooltip	: 'Download',
					handler : function (){
						var valstdate 		= Ext.Date.format(new Ext.getCmp('valstdate').getValue(), 'Ymd');
						var valendate 		= Ext.Date.format(new Ext.getCmp('valendate').getValue(), 'Ymd');
						var valstatus 		= Ext.getCmp('valstatus').getValue();
						var validstockcard 	= Ext.getCmp('validstockcard').getValue();
						var valmodel 		= Ext.getCmp('valmodel').getValue();
						var valline 		= Ext.getCmp('valline').getValue();
						var vallotno 		= Ext.getCmp('vallotno').getValue();
						window.open('resp/down_stockcard.php?valstdate='+valstdate+'&valendate='+valendate+'&valstatus='+valstatus+'&validstockcard='+validstockcard+'&valmodel='+valmodel+'&valline='+valline+'&vallotno='+vallotno+'');
					}
				}
			],
			columns 	: [
				{	header 		: 'LCD ID',
					dataIndex 	: 'barcode',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer	: fontstyle
				},
				{	header 		: 'guid_master',
					dataIndex 	: 'guid_master',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle,
					hidden		: true
				},
				{	header 		: 'guid_ticket',
					dataIndex 	: 'guid_ticket',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle,
					hidden		: true
				},
				{	header 		: 'MODEL',
					dataIndex 	: 'modelname',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle,
					hidden		: true
				},
				{	header 		: 'LINE',
					dataIndex 	: 'line',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'PROCESS',
					dataIndex 	: 'lineprocess',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'scanner_id',
					dataIndex 	: 'scanner_id',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle,
					hidden		: true
				},
				{	header 		: 'STATUS',
					dataIndex 	: 'status',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'JUDGE',
					dataIndex 	: 'judge',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'PROCESS DATE',
					dataIndex 	: 'created_at',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'EMP NO',
					dataIndex 	: 'scan_nik',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'updated_at',
					dataIndex 	: 'updated_at',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle,
					hidden		: true
				}
			],
			//features: [filters],
			// selModel: {
			// 	selType: 'cellmodel'
			// },
			// plugins: [cellEditing]
		});

		grid_maprosLCD.getStore().on('load', function() {
	        grid_maprosLCD.getView().stripeRows 			= true;
			grid_maprosLCD.getView().deferEmptyText 		= false;
			grid_maprosLCD.getView().enableTextSelection	= true;
	        grid_maprosLCD.getView().emptyText = '<div class="empty-txt-main">Data Not Available.</div>';
	        grid_maprosLCD.getView().refresh();
	    });

		var grid_maprosMecha = Ext.create('Ext.grid.Panel', {
			id 				: 'grid_maprosMecha',
			autoWidth 		: '100%',
			maxHeight		: 600,
			columnLines 	: true,
			store 			: storeMaprosMecha,
			viewConfig		: {
				stripeRows 			: true,
				emptyText 			: '<div class="empty-txt-main">Select Plan Table for show this data.</div>',
				deferEmptyText 		: false,
				enableTextSelection	: true,
				getRowClass			: function(record, rowIndex, rowParams, store) {
					if (record.get('status')==='IN') return 'colorin';
					else if (record.get('status')==='OUT') return 'colorout';
				},
				listeners 			: {
					refresh : function (dataview) {
						Ext.each(dataview.panel.columns, function (column) {
							if (column.autoSizeColumn === true)
								column.autoSize();
						})
					}
				}
			},
			tbar		: [
				'->',{
					xtype	: 'button',
					id		: 'dlMecha',
					iconCls	: 'download',
					text 	: 'Download',
					tooltip	: 'Download',
					handler : function (){
						var valstdate 		= Ext.Date.format(new Ext.getCmp('valstdate').getValue(), 'Ymd');
						var valendate 		= Ext.Date.format(new Ext.getCmp('valendate').getValue(), 'Ymd');
						var valstatus 		= Ext.getCmp('valstatus').getValue();
						var validstockcard 	= Ext.getCmp('validstockcard').getValue();
						var valmodel 		= Ext.getCmp('valmodel').getValue();
						var valline 		= Ext.getCmp('valline').getValue();
						var vallotno 		= Ext.getCmp('vallotno').getValue();
						window.open('resp/down_stockcard.php?valstdate='+valstdate+'&valendate='+valendate+'&valstatus='+valstatus+'&validstockcard='+validstockcard+'&valmodel='+valmodel+'&valline='+valline+'&vallotno='+vallotno+'');
					}
				}
			],
			columns 	: [
				{	header 		: 'Mecha ID',
					dataIndex 	: 'barcode',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer	: fontstyle
				},
				{	header 		: 'guid_master',
					dataIndex 	: 'guid_master',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle,
					hidden		: true
				},
				{	header 		: 'guid_ticket',
					dataIndex 	: 'guid_ticket',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle,
					hidden		: true
				},
				{	header 		: 'MODEL',
					dataIndex 	: 'modelname',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle,
					hidden		: true
				},
				{	header 		: 'LINE',
					dataIndex 	: 'line',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'PROCESS',
					dataIndex 	: 'lineprocess',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'scanner_id',
					dataIndex 	: 'scanner_id',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle,
					hidden		: true
				},
				{	header 		: 'STATUS',
					dataIndex 	: 'status',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'JUDGE',
					dataIndex 	: 'judge',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'PROCESS DATE',
					dataIndex 	: 'created_at',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'EMP NO',
					dataIndex 	: 'scan_nik',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'updated_at',
					dataIndex 	: 'updated_at',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle,
					hidden		: true
				}
			],
			//features: [filters],
			// selModel: {
			// 	selType: 'cellmodel'
			// },
			// plugins: [cellEditing]
		});

		grid_maprosMecha.getStore().on('load', function() {
	        grid_maprosMecha.getView().stripeRows 			= true;
			grid_maprosMecha.getView().deferEmptyText 		= false;
			grid_maprosMecha.getView().enableTextSelection	= true;
	        grid_maprosMecha.getView().emptyText = '<div class="empty-txt-main">Data Not Available.</div>';
	        grid_maprosMecha.getView().refresh();
	    });

		var grid_maprosMain = Ext.create('Ext.grid.Panel', {
			id 				: 'grid_maprosMain',
			autoWidth 		: '100%',
			height			: 300,
			columnLines 	: true,
			store 			: storeMaprosMain,
			viewConfig		: {
				stripeRows 			: true,
				emptyText 			: '<div class="empty-txt-main">Select Plan Table for show this data.</div>',
				deferEmptyText 		: false,
				enableTextSelection	: true,
				getRowClass			: function(record, rowIndex, rowParams, store) {
					if (record.get('status')==='IN') return 'colorin';
					else if (record.get('status')==='OUT') return 'colorout';
				},
				listeners 			: {
					refresh : function (dataview) {
						Ext.each(dataview.panel.columns, function (column) {
							if (column.autoSizeColumn === true)
								column.autoSize();
						})
					}
				}
			},
			tbar		: [
				'->',{
					xtype	: 'button',
					id		: 'dlMain',
					iconCls	: 'download',
					text 	: 'Download',
					tooltip	: 'Download',
					handler : function (){
						var valstdate 		= Ext.Date.format(new Ext.getCmp('valstdate').getValue(), 'Ymd');
						var valendate 		= Ext.Date.format(new Ext.getCmp('valendate').getValue(), 'Ymd');
						var valstatus 		= Ext.getCmp('valstatus').getValue();
						var validstockcard 	= Ext.getCmp('validstockcard').getValue();
						var valmodel 		= Ext.getCmp('valmodel').getValue();
						var valline 		= Ext.getCmp('valline').getValue();
						var vallotno 		= Ext.getCmp('vallotno').getValue();
						window.open('resp/down_stockcard.php?valstdate='+valstdate+'&valendate='+valendate+'&valstatus='+valstatus+'&validstockcard='+validstockcard+'&valmodel='+valmodel+'&valline='+valline+'&vallotno='+vallotno+'');
					}
				}
			],
			columns 	: [
				{	header 		: 'DUMMY SERIAL',
					dataIndex 	: 'ticket_no_master',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer	: fontstyle
				},
				{	header 		: 'guid_master',
					dataIndex 	: 'guid_master',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle,
					hidden		: true
				},
				{	header 		: 'MODEL',
					dataIndex 	: 'modelname',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle,
					hidden		: true
				},
				{	header 		: 'LINE',
					dataIndex 	: 'line',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'PROCESS',
					dataIndex 	: 'lineprocess',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'scanner_id',
					dataIndex 	: 'scanner_id',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle,
					hidden		: true
				},
				{	header 		: 'STATUS',
					dataIndex 	: 'status',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'JUDGE',
					dataIndex 	: 'judge',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'PROCESS DATE',
					dataIndex 	: 'created_at',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'EMP NO',
					dataIndex 	: 'scan_nik',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'updated_at',
					dataIndex 	: 'updated_at',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle,
					hidden		: true
				},
				{	header 		: 'serial_no',
					dataIndex 	: 'serial_no',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle,
					hidden		: true
				}
			],
			listeners: {
				select: function(grid, rowIndex, colIndex){
					var rec  	 	= this.getSelectionModel().getSelection();
					var guidmaster  = rec[0].data.guid_master;
					
					Ext.getStore('storeMaQualityReport').proxy.setExtraParam('valguidmaster', guidmaster);
					Ext.getStore('storeMaQualityReport').loadPage(1);
					Ext.getStore('storeMaAvmt').loadPage(1);
				}
			}
			//features: [filters],
			// selModel: {
			// 	selType: 'cellmodel'
			// },
			// plugins: [cellEditing]
		});

		grid_maprosMain.getStore().on('load', function() {
	        grid_maprosMain.getView().stripeRows 			= true;
			grid_maprosMain.getView().deferEmptyText 		= false;
			grid_maprosMain.getView().enableTextSelection	= true;
	        grid_maprosMain.getView().emptyText = '<div class="empty-txt-main">Data Not Available.</div>';
	        grid_maprosMain.getView().refresh();
	    });

		var grid_maprosCritical = Ext.create('Ext.grid.Panel', {
			id 				: 'grid_maprosCritical',
			autoWidth 		: '100%',
			height			: 500,
			columnLines 	: true,
			store 			: storeMaprosCritical,
			viewConfig		: {
				stripeRows 			: true,
				emptyText 			: '<div class="empty-txt-main">Select Plan Table for show this data.</div>',
				deferEmptyText 		: false,
				enableTextSelection	: true,
				getRowClass			: function(record, rowIndex, rowParams, store) {
					if (record.get('status')==='IN') return 'colorin';
					else if (record.get('status')==='OUT') return 'colorout';
				},
				listeners 			: {
					refresh : function (dataview) {
						Ext.each(dataview.panel.columns, function (column) {
							if (column.autoSizeColumn === true)
								column.autoSize();
						})
					}
				}
			},
			tbar		: [
				'->',{
					xtype	: 'button',
					id		: 'dlCritical',
					iconCls	: 'download',
					text 	: 'Download',
					tooltip	: 'Download',
					handler : function (){
						var valstdate 		= Ext.Date.format(new Ext.getCmp('valstdate').getValue(), 'Ymd');
						var valendate 		= Ext.Date.format(new Ext.getCmp('valendate').getValue(), 'Ymd');
						var valstatus 		= Ext.getCmp('valstatus').getValue();
						var validstockcard 	= Ext.getCmp('validstockcard').getValue();
						var valmodel 		= Ext.getCmp('valmodel').getValue();
						var valline 		= Ext.getCmp('valline').getValue();
						var vallotno 		= Ext.getCmp('vallotno').getValue();
						window.open('resp/down_stockcard.php?valstdate='+valstdate+'&valendate='+valendate+'&valstatus='+valstatus+'&validstockcard='+validstockcard+'&valmodel='+valmodel+'&valline='+valline+'&vallotno='+vallotno+'');
					}
				}
			],
			columns 	: [

				
				{	header 		: 'MC Label',
					dataIndex 	: 'qrcode_mc',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer	: fontstyle
				},
				{	header 		: 'Unique Code',
					dataIndex 	: 'guid_master_ticket',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer	: fontstyle
				},
				{	header 		: 'Supp Code',
					dataIndex 	: 'supp_code',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer	: fontstyle
				},
				{	header 		: 'Partno',
					dataIndex 	: 'part_no',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer	: fontstyle
				},
				{	header 		: 'PO',
					dataIndex 	: 'po',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer	: fontstyle
				},
				{	header 		: 'Prod. Date',
					dataIndex 	: 'prod_date',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer	: fontstyle
				},
				{	header 		: 'QTY',
					dataIndex 	: 'qty',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer	: fontstyle
				},
				{	header 		: 'Model',
					dataIndex 	: 'modelname',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer	: fontstyle
				},
				{	header 		: 'Emp No',
					dataIndex 	: 'scan_nik',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer	: fontstyle
				},
				{	header 		: 'Created Date',
					dataIndex 	: 'created_at',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer	: fontstyle
				},
				{	header 		: 'Update Date',
					dataIndex 	: 'updated_at',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer	: fontstyle
				},
				{	header 		: 'Line Process',
					dataIndex 	: 'lineprocessname',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer	: fontstyle
				},
				{	header 		: 'Line',
					dataIndex 	: 'line',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer	: fontstyle
				}
			],
			//features: [filters],
			// selModel: {
			// 	selType: 'cellmodel'
			// },
			// plugins: [cellEditing]
		});

		grid_maprosCritical.getStore().on('load', function() {
	        grid_maprosCritical.getView().stripeRows 			= true;
			grid_maprosCritical.getView().deferEmptyText 		= false;
			grid_maprosCritical.getView().enableTextSelection	= true;
	        grid_maprosCritical.getView().emptyText = '<div class="empty-txt-main">Data Not Available.</div>';
	        grid_maprosCritical.getView().refresh();
	    });
		
	//	=======================================================	 GRID DETAIL 	=====================================
		var grid_maprosBoardSymptom = Ext.create('Ext.grid.Panel', {
			id 				: 'grid_maprosBoardSymptom',
			title 			: '<div style="text-align:center;">==== &nbsp; REFNO & SYMPTOM &nbsp; ====</div>',
			autoWidth 		: '80%',
			height			: 300,
			columnLines 	: true,
			store 			: storeMaprosBoardSymptom,
			viewConfig	: {
				stripeRows 			: true,
				emptyText 			: '<div class="empty-txt-main">Select Plan Table for show this data.</div>',
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
			columns 	: [
				{	header 			: 'PCB Serial',
					dataIndex 		: 'boardid',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer 		: fontstyle
				},
				{	header 			: 'Line Process',
					dataIndex 		: 'lineprocess',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 		: fontstyle
				},
				{	header 			: 'REF No',
					dataIndex 		: 'refno',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer 		: fontstyle
				},
				{	header 			: 'Category',
					dataIndex 		: 'category',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 		: fontstyle
				},
				{	header 			: 'PWB ID',
					dataIndex 		: 'pwbid',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 		: fontstyle,
					hidden			: true
				},
				{	header 			: 'Judge',
					dataIndex 		: 'judge',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 		: fontstyle
				},
				{	header 			: 'Emp No',
					dataIndex 		: 'scannik',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 		: fontstyle
				},
				{	header 			: 'Created Date',
					dataIndex 		: 'created_at',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 		: fontstyle
				},
				{	header 			: 'Status',
					dataIndex 		: 'status',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 		: fontstyle,
					hidden			: true
				},
				{	header 			: 'GUID Master',
					dataIndex 		: 'guidmaster',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 		: fontstyle,
					hidden			: true
				},
				{	header 			: 'GUID Panel',
					dataIndex 		: 'guidticket',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 		: fontstyle,
					hidden			: true
				},
				{	header 			: 'Model Name',
					dataIndex 		: 'modelname',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 		: fontstyle,
					hidden			: true
				},
				{	header 			: 'Lot No',
					dataIndex 		: 'lotno',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 		: fontstyle,
					hidden			: true
				},
				{	header 			: 'Scanner ID',
					dataIndex 		: 'scannerid',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 		: fontstyle,
					hidden			: true
				},
				{	header 			: 'Update Date',
					dataIndex 		: 'update_at',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 		: fontstyle,
					hidden			: true
				},
			],
			// bbar		: Ext.create('Ext.PagingToolbar', {
			// 	// pageSize	: item3,
			// 	store		: storeMaprosBoardSymptom,
			// 	displayInfo	: true,
			// 	listeners 	: {
			// 		afterrender: function (cmp) {
			// 			cmp.getComponent("refresh").hide();
			// 			cmp.getComponent("first").hide();
			// 			cmp.getComponent("last").hide();
			// 		}
			// 	}
			// })
			//features: [filters],
			// selModel: {
			// 	selType: 'cellmodel'
			// },
			// plugins: [cellEditing]
		});
		
		grid_maprosBoardSymptom.getStore().on('load', function() {
	        grid_maprosBoardSymptom.getView().stripeRows 			= true;
			grid_maprosBoardSymptom.getView().deferEmptyText 		= false;
			grid_maprosBoardSymptom.getView().enableTextSelection	= true;
	        grid_maprosBoardSymptom.getView().emptyText = '<div class="empty-txt-main">Data Not Available.</div>';
	        grid_maprosBoardSymptom.getView().refresh();
	    });

		var grid_maprosMainSymptom = Ext.create('Ext.grid.Panel', {
			id 				: 'grid_maprosMainSymptom',
			title 			: '<div style="text-align:center;">==== &nbsp; SYMPTOM &nbsp; ====</div>',
			autoWidth 		: '80%',
			height			: 300,
			columnLines 	: true,
			store 			: storeMaprosMainSymptom,
			viewConfig	: {
				stripeRows 			: true,
				emptyText 			: '<div class="empty-txt-main">Select Plan Table for show this data.</div>',
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
			columns 	: [
				{	header 			: 'master_id',
					dataIndex 		: 'master_id',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer 		: fontstyle
				},
				{	header 			: 'serial_no',
					dataIndex 		: 'serial_no',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 		: fontstyle
				},
				{	header 			: 'judge',
					dataIndex 		: 'judge',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer 		: fontstyle
				},
				{	header 			: 'symptom_id',
					dataIndex 		: 'symptom_id',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 		: fontstyle
				},
				{	header 			: 'category',
					dataIndex 		: 'category',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 		: fontstyle
				},
				{	header 			: 'created_at',
					dataIndex 		: 'created_at',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 		: fontstyle
				},
				{	header 			: 'updated_at',
					dataIndex 		: 'updated_at',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 		: fontstyle
				},
				{	header 			: 'line_id',
					dataIndex 		: 'line_id',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 		: fontstyle
				},
				{	header 			: 'lineprocess_id',
					dataIndex 		: 'lineprocess_id',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 		: fontstyle
				},
				{	header 			: 'lineprocess',
					dataIndex 		: 'lineprocess',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 		: fontstyle
				},
				{	header 			: 'line',
					dataIndex 		: 'line',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 		: fontstyle
				}				
			],
			// bbar		: Ext.create('Ext.PagingToolbar', {
			// 	// pageSize	: item3,
			// 	store		: storeMaprosBoardSymptom,
			// 	displayInfo	: true,
			// 	listeners 	: {
			// 		afterrender: function (cmp) {
			// 			cmp.getComponent("refresh").hide();
			// 			cmp.getComponent("first").hide();
			// 			cmp.getComponent("last").hide();
			// 		}
			// 	}
			// })
			//features: [filters],
			// selModel: {
			// 	selType: 'cellmodel'
			// },
			// plugins: [cellEditing]
		});

		grid_maprosMainSymptom.getStore().on('load', function() {
	        grid_maprosMainSymptom.getView().stripeRows 			= true;
			grid_maprosMainSymptom.getView().deferEmptyText 		= false;
			grid_maprosMainSymptom.getView().enableTextSelection	= true;
	        grid_maprosMainSymptom.getView().emptyText = '<div class="empty-txt-main">Data Not Available.</div>';
	        grid_maprosMainSymptom.getView().refresh();
	    });
		
	//  =======================================================	   PANEL GRID   =====================================	
		var panel_board = Ext.create('Ext.panel.Panel',{
		    border: true,
		    layout: 'border',
		   	defaults: {
			     split: false,
			     plain: true
		    },
		   	items: [{
			   region: 'north', // GRID SIDE
			   layout: 'fit',
			   items: grid_maprosBoard
			   }, {
			   region: 'center', // GRID SIDE
			   layout: 'fit',
			   items: grid_maprosBoardSymptom
			   }]
	  	});
	  	var panel_main = Ext.create('Ext.panel.Panel',{
		    border: true,
		    layout: 'border',
		   	defaults: {
			     split: false,
			     plain: true
		    },
		   	items: [{
			   region: 'north', // GRID SIDE
			   layout: 'fit',
			   items: grid_maprosMain
			   }, {
			   region: 'center', // GRID SIDE
			   layout: 'fit',
			   items: grid_maprosMainSymptom
			   }]
	  	});
	//	=======================================================	TAB PANEL    	=====================================

		var part_ma = Ext.create('Ext.tab.Panel', {
			id  		: 'part_ma',
			renderTo 	: 'prod_mapros',
			plain 		: true,
			activeTab 	: 0,
			autoWidth 	: '100%',
			height		: 600,
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
				{	title 		: 'PCB Serial',
				 	id  	 	: 'show_gridPCB',
				 	layout 		: 'fit',
					reorderable : false,
					items 		: [panel_board]
				},
				{	title 		: 'Panel',
				 	id  		: 'show_gridPanel',
					reorderable : false,
					items 		: [grid_maprosPanel]
				},
				{	title 		: 'LCD',
				 	id  		: 'show_gridLCD',
					reorderable : false,
					items 		: [grid_maprosLCD]
				},
				{	title 		: 'Mecha',
				 	id  		: 'show_gridMecha',
					reorderable : false,
					items 		: [grid_maprosMecha]
				},
				{	title 		: 'Main',
				 	id  		: 'show_gridMain',
				 	layout 		: 'fit',
					reorderable : false,
					items 		: [panel_main]
				},
				{	title 		: 'Critical Part',
				 	id  		: 'show_gridCritical',
					reorderable : false,
					items 		: [grid_maprosCritical]
				}
			]
		});



});