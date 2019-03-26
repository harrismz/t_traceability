Ext.onReady(function() {
	var item3 = 3;
	var item5 = 5;
	var itemperpage = 10;
	//	=======================================================    MODEL        =====================================
		Ext.define('modelMaQualityReport',{
			extend: 'Ext.data.Model',
			fields: ['tgl','bln','thn','date','line_name','shift','model_name',
					'lot','prod_no','st_serial','serial_output','symptom','def_cause',
					'p_disposal','responsible','id_quality','board','pic_nik','process_code',
					'process_name','ip_addrs','action_item']
		});
		Ext.define('modelMaFwdn',{
            extend: 'Ext.data.Model',
            fields: ['idfwdn','dateinspec','serial', 'sn','jigno','judge','inspectime',
            		'artfilename','ngcontent','input_user','input_date']
       	});
      	Ext.define('modelMaFwdnDetail',{
            extend: 'Ext.data.Model',
            fields: ['idfwdn','step','stepdata', 'measure','measuredata','input_user','input_date']
       	});
      	Ext.define('modelMaFlash',{
            extend: 'Ext.data.Model',
            fields: ['idflash','dateinspec','serial', 'sn','jigno','judge','inspectime',
            		'artfilename','ngcontent','input_user','input_date']
       	});
		Ext.define('modelMaAvntest',{
			extend: 'Ext.data.Model',
            fields: ['idavnt','dateinspec','serial', 'sn','jigno','judge','inspectime',
            		'artfilename','ngcontent','input_user','input_date']
       	});
      	Ext.define('modelMaAvntestDetail',{
			extend: 'Ext.data.Model',
            fields: ['idavnt','step','stepdata','measure','measuredata','input_user','input_date']
       	});
      	Ext.define('modelMaAvmt',{
			extend: 'Ext.data.Model',
            fields: ['idavmt','barcode','sn', 'program','stdate','endate','lap',
            		'judgment','input_user','input_date','update_user','update_date']
       	});
      	Ext.define('modelMaAvmtDetail',{
			extend: 'Ext.data.Model',
			fields: ['autoid','idavmt','barcode', 'step','type','name','judgment',
            		'volt','curr','freq','lvll','dstl','dstr','rell','relr','snl','snr','remark','input_user'
            		,'input_date','update_user','update_date']
       	});
      	Ext.define('modelMaLine0',{
            extend: 'Ext.data.Model',
            fields: ['idlinezero','dateinspec','serial', 'sn','jigno','judge','inspectime',
            		'artfilename','ngcontent','input_user','input_date','guid_master']
       	});
      	Ext.define('modelMaLine0Detail',{
            extend: 'Ext.data.Model',
            fields: ['idlinezero','rownumber','step','stepdata', 'measure','measuredata','input_user','input_date']
       	});
	//	=======================================================    DATASTORE    =====================================
		var storeMaQualityReport = Ext.create('Ext.data.Store',{
			storeId	: 'storeMaQualityReport',
			model	: 'modelMaQualityReport',
			autoLoad: false,
			// pageSize: itemperpage,
			proxy   : {
                type    : 'ajax',
                url     : 'json/finishgood_ma/json_maQualityReport.php',
                reader  : {
                    type    : 'json',
                    root    : 'rows',
                    totalProperty  : 'totalCount'
                }
            }
		});
		var storeMaFwdn = Ext.create('Ext.data.Store',{
			storeId	: 'storeMaFwdn',
			model	: 'modelMaFwdn',
			autoLoad: false,
			// pageSize: itemperpage,
			proxy   : {
				type    : 'ajax',
				url     : 'json/finishgood_ma/json_maFwdn.php',
				reader  : {
					type    : 'json',
					root    : 'rows',
					// totalProperty: 'totalCount'
				}
			}
		});
		var storeMaFwdnDetail = Ext.create('Ext.data.Store',{
			model	: 'modelMaFwdnDetail',
			autoLoad: false,
			pageSize: 11,
			proxy   : {
				type    : 'ajax',
				url     : 'json/finishgood_ma/json_maFwdnDetail.php',
				reader  : {
					type    : 'json',
					root    : 'rows',
					totalProperty: 'totalCount'
				}
			}
		});
		var storeMaFlash = Ext.create('Ext.data.Store',{
			storeId : 'storeMaFlash',
			model	: 'modelMaFlash',
			autoLoad: false,
			// pageSize: itemperpage,
			proxy   : {
				type    : 'ajax',
				url     : 'json/finishgood_ma/json_maFlash.php',
				reader  : {
					type    : 'json',
					root    : 'rows',
					totalProperty: 'totalCount'
				}
			}
		});
		var storeMaAvntest = Ext.create('Ext.data.Store',{
			storeId : 'storeMaAvntest',
			model	: 'modelMaAvntest',
			autoLoad: false,
			// pageSize: itemperpage,
			proxy   : {
				type    : 'ajax',
				url     : 'json/finishgood_ma/json_maAvntest.php',
				reader  : {
					type    : 'json',
					root    : 'rows',
					//totalProperty: 'totalCount'
				}
			}
		});
		var storeMaAvntestDetail = Ext.create('Ext.data.Store',{
			storeId : 'storeMaAvntestDetail',
			model	: 'modelMaAvntestDetail',
			autoLoad: false,
			pageSize: 9,
			proxy   : {
				type    : 'ajax',
				url     : 'json/finishgood_ma/json_maAvntestDetail.php',
				reader  : {
					type    : 'json',
					root    : 'rows',
					totalProperty: 'totalCount'
				}
			}
		});
		var storeMaAvmt = Ext.create('Ext.data.Store',{
			storeId : 'storeMaAvmt',
			model	: 'modelMaAvmt',
			autoLoad: false,
			// pageSize: itemperpage,
			proxy   : {
				type    : 'ajax',
				url     : 'json/finishgood_ma/json_maAvmt.php',
				reader  : {
					type    : 'json',
					root    : 'rows',
					//totalProperty: 'totalCount'
				}
			}
		});
		var storeMaAvmtDetail = Ext.create('Ext.data.Store',{
			storeId : 'storeMaAvmtDetail',
			model	: 'modelMaAvmtDetail',
			autoLoad: false,
			// pageSize: itemperpage,
			proxy   : {
				type    : 'ajax',
				url     : 'json/finishgood_ma/json_maAvmtDetail.php',
				reader  : {
					type    : 'json',
					root    : 'rows',
					totalProperty: 'totalCount'
				}
			}
		});
		var storeMaLine0 = Ext.create('Ext.data.Store',{
			storeId : 'storeMaLine0',
			model	: 'modelMaLine0',
			autoLoad: false,
			// pageSize: itemperpage,
			proxy   : {
				type    : 'ajax',
				url     : 'json/finishgood_ma/json_maLine0.php',
				reader  : {
					type    : 'json',
					root    : 'rows',
					// totalProperty: 'totalCount'
				}
			}
		});
		var storeMaLine0Detail = Ext.create('Ext.data.Store',{
			storeId : 'storeMaLine0Detail',
			model	: 'modelMaLine0Detail',
			autoLoad: false,
			pageSize: 7,
			proxy   : {
				type    : 'ajax',
				url     : 'json/finishgood_ma/json_maLine0Detail.php',
				reader  : {
					type    : 'json',
					root    : 'rows',
					totalProperty: 'totalCount'
				}
			}
		});
	//	=======================================================    GRID         =====================================
		var grid_maQuality = Ext.create('Ext.grid.Panel',{
            id          : 'grid_maQuality',
            width       : '100%',
            height  	: 500,
            columnLines : true,
            store       : storeMaQualityReport,
            viewConfig	: {
				stripeRows			: true,
				emptyText 			: '<div class="empty-txt-main">Select Mapros Main table for show this data.</div>',
				deferEmptyText 		: false,
				enableTextSelection	: true,
				listeners 			: {
					refresh : function(dataview){
						Ext.each(dataview.panel.columns, function(column){
							if (column.autoSizeColumn === true)
								column.autoSize();
						})
					}
				}
			},
			tbar		: [
				'->',{
					xtype	: 'button',
					id		: 'dlQuality',
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
            columns     : [
				{ header      : 'Prod. Date',	  dataIndex   : 'date', 			componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontstyle },
                { header      : 'Line Name',	  dataIndex   : 'line_name',		componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontstyle, hidden: true },
                { header      : 'Shift',	  	  dataIndex   : 'shift',			componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontstyle },
                { header      : 'Model Name',	  dataIndex   : 'model_name',		componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontstyle, hidden: true },
                { header      : 'Lot Size',	  	  dataIndex   : 'lot',				componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontstyle },
                { header      : 'Prod No',	  	  dataIndex   : 'prod_no',			componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontstyle, hidden: true },
                { header      : 'Start Serial',	  dataIndex   : 'st_serial',		componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontstyle, hidden: true },
                { header      : 'SN O/P',	  	  dataIndex   : 'serial_output',	componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontstyle, hidden: true },
                { header      : 'Symptom',	  	  dataIndex   : 'symptom',			componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontstyle },
                { header      : 'Defective Cause',dataIndex   : 'def_cause',		componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontstyle },
                { header      : 'P. Disposal',	  dataIndex   : 'p_disposal',		componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontstyle },
                { header      : 'Responsible',	  dataIndex   : 'responsible',		componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontstyle },
                { header      : 'ID Quality',	  dataIndex   : 'id_quality',		componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontstyle },
                { header      : 'Board',	 	  dataIndex   : 'board',			componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontstyle },
                { header      : 'Emp No',	 	  dataIndex   : 'pic_nik',			componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontstyle },
                { header      : 'Process Code',	  dataIndex   : 'process_code',		componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontstyle },
                { header      : 'Process Name',	  dataIndex   : 'process_name',		componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontstyle },
                { header      : 'IP Addrs',	   	  dataIndex   : 'ip_addrs',			componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontstyle },
                { header      : 'Action Item',	  dataIndex   : 'action_item',		componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontstyle },
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
		grid_maQuality.getStore().on('load', function() {
	        grid_maQuality.getView().stripeRows 			= true;
			grid_maQuality.getView().deferEmptyText 		= false;
			grid_maQuality.getView().enableTextSelection	= true;
	        grid_maQuality.getView().emptyText = '<div class="empty-txt-main">Data Not Available.</div>';
	        grid_maQuality.getView().refresh();
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
			// 	columns 	: [
			// 		{	header 		: 'PCB SERIAL',
			// 			dataIndex 	: 'board_id',
			// 			componentCls	: 'headergrid',
			// 			flex 			: false,
			// 			autoSizeColumn 	: true,
			// 			renderer 		: fontstyle
			// 		},
			// 		{	header 		: 'guid_master',
			// 			dataIndex 	: 'guid_master',
			// 			componentCls	: 'headergrid',
			// 			flex 			: getFlexFgFinishgood(),
			// 			autoSizeColumn 	: getWidthFgFinishgood(),
			// 			renderer 		: fontstyle,
			// 			hidden		: true
			// 		},
			// 		{	header 		: 'guid_ticket',
			// 			dataIndex 	: 'guid_ticket',
			// 			componentCls	: 'headergrid',
			// 			flex 			: getFlexFgFinishgood(),
			// 			autoSizeColumn 	: getWidthFgFinishgood(),
			// 			renderer 		: fontstyle,
			// 			hidden		: true
			// 		},
			// 		{	header 		: 'MODEL',
			// 			dataIndex 	: 'modelname',
			// 			componentCls	: 'headergrid',
			// 			flex 			: getFlexFgFinishgood(),
			// 			autoSizeColumn 	: getWidthFgFinishgood(),
			// 			renderer 		: fontstyle,
			// 			hidden		: true
			// 		},
			// 		{	header 		: 'LINE',
			// 			dataIndex 	: 'line',
			// 			componentCls	: 'headergrid',
			// 			flex 			: getFlexFgFinishgood(),
			// 			autoSizeColumn 	: getWidthFgFinishgood(),
			// 			renderer	: fontstyle
			// 		},
			// 		{	header 		: 'lotno',
			// 			dataIndex 	: 'lotno',
			// 			componentCls	: 'headergrid',
			// 			flex 			: getFlexFgFinishgood(),
			// 			autoSizeColumn 	: getWidthFgFinishgood(),
			// 			renderer	: fontstyle,
			// 			hidden		: true
			// 		},
			// 		{	header 		: 'Process',
			// 			dataIndex 	: 'lineprocess',
			// 			componentCls	: 'headergrid',
			// 			flex 			: getFlexFgFinishgood(),
			// 			autoSizeColumn 	: getWidthFgFinishgood(),
			// 			renderer	: fontstyle
			// 		},
			// 		{	header 		: 'scanner_id',
			// 			dataIndex 	: 'scanner_id',
			// 			componentCls	: 'headergrid',
			// 			flex 			: getFlexFgFinishgood(),
			// 			autoSizeColumn 	: getWidthFgFinishgood(),
			// 			renderer	: fontstyle,
			// 			hidden		: true
			// 		},
			// 		{	header 		: 'Status',
			// 			dataIndex 	: 'status',
			// 			componentCls	: 'headergrid',
			// 			flex 			: getFlexFgFinishgood(),
			// 			autoSizeColumn 	: getWidthFgFinishgood(),
			// 			renderer	: fontstyle
			// 		},
			// 		{	header 		: 'Judge',
			// 			dataIndex 	: 'judge',
			// 			componentCls	: 'headergrid',
			// 			flex 			: getFlexFgFinishgood(),
			// 			autoSizeColumn 	: getWidthFgFinishgood(),
			// 			renderer	: fontstyle
			// 		},
			// 		{	header 		: 'Emp No',
			// 			dataIndex 	: 'scan_nik',
			// 			componentCls	: 'headergrid',
			// 			flex 			: getFlexFgFinishgood(),
			// 			autoSizeColumn 	: getWidthFgFinishgood(),
			// 			renderer	: fontstyle
			// 		},
			// 		{	header 		: 'Process Date',
			// 			dataIndex 	: 'created_at',
			// 			componentCls	: 'headergrid',
			// 			flex 			: getFlexFgFinishgood(),
			// 			autoSizeColumn 	: getWidthFgFinishgood(),
			// 			renderer	: fontstyle
			// 		},
			// 		{	header 		: 'updated_at',
			// 			dataIndex 	: 'updated_at',
			// 			componentCls	: 'headergrid',
			// 			flex 			: getFlexFgFinishgood(),
			// 			autoSizeColumn 	: getWidthFgFinishgood(),
			// 			renderer	: fontstyle,
			// 			hidden		: true
			// 		}
			// 	],
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
		var grid_maFwdn = Ext.create('Ext.grid.Panel', {
			id 				: 'grid_maFwdn',
			autoWidth 		: '100%',
			maxHeight		: 200,
			columnLines 	: true,
			store 			: storeMaFwdn,
			viewConfig	: {
				stripeRows 			: true,
				emptyText 			: '<div class="empty-txt-main">Select Mapros PCB Serial for show this data.</div>',
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
			tbar		: [
				{
					xtype	: 'button',
					id		: 'dlFwdn',
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
						console.log('ALOW POP UP !!!');
						console.log('resp/finishgood_ma/dlFgFwdn.php?rb='+rbCheck+'&mdl='+modelName+'&s='+serialNo+'&l='+lotNo+'&ds='+dummySerial+'');
						window.open('resp/finishgood_ma/dlFgFwdn.php?rb='+rbCheck+'&mdl='+modelName+'&s='+serialNo+'&l='+lotNo+'&ds='+dummySerial+'', target='_blank');
						console.log('resp/finishgood_ma/dlFgFwdnDetail.php?rb='+rbCheck+'&mdl='+modelName+'&s='+serialNo+'&l='+lotNo+'&ds='+dummySerial+'');
						window.open('resp/finishgood_ma/dlFgFwdnDetail.php?rb='+rbCheck+'&mdl='+modelName+'&s='+serialNo+'&l='+lotNo+'&ds='+dummySerial+'', target='_blank');
					}
				}
			],
			columns 		: [
				{ 	header 		: 'FWDN',
					dataIndex 	: 'idfwdn',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle,
					hidden		: true
				},
				{	header 		: 'INSP DATE',
					dataIndex 	: 'dateinspec',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'TOTAL TIME',
					dataIndex 	: 'inspectime',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'MCH NAME',
					dataIndex 	: 'input_user',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'PCB SERIAL',
					dataIndex 	: 'serial',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer	: fontstyle
				},
				{	header 		: 'SN',
					dataIndex 	: 'sn',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle,
					hidden		: true
				},
				{	header 		: 'JIG NO',
					dataIndex 	: 'jigno',
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
				{	header 		: 'FILE',
					dataIndex 	: 'artfilename',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'NG',
					dataIndex 	: 'ngcontent',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'OPT SCAN',
					dataIndex 	: 'input_date',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle,
					hidden 		: true
				}
			],
			listeners: {
	    		select: function(grid, rowIndex, colIndex) {
	    			var rec = this.getSelectionModel().getSelection();
	    			var fwdn = rec[0].data.idfwdn;
	    			
	    			storeMaFwdnDetail.proxy.setExtraParam('idfwdn',fwdn);
	    			storeMaFwdnDetail.loadPage(1);
	    		}
	    	}
		});
		grid_maFwdn.getStore().on('load', function() {
	        grid_maFwdn.getView().stripeRows 			= true;
			grid_maFwdn.getView().deferEmptyText 		= false;
			grid_maFwdn.getView().enableTextSelection	= true;
	        grid_maFwdn.getView().emptyText = '<div class="empty-txt-main">Data Not Available.</div>';
	        grid_maFwdn.getView().refresh();
	    });
		var grid_maFwdnDetail = Ext.create('Ext.grid.Panel', {
			id 				: 'grid_maFwdnDetail',
			title 			: '<div style="text-align:center;">==== &nbsp; DETAIL &nbsp; ====</div>',
			autoWidth 		: '80%',
			height			: 400,
			columnLines 	: true,
			store 			: storeMaFwdnDetail,
			viewConfig 		: {
				stripeRows 			: true,
				emptyText 	 		: '<div class="empty-txt">Select Header to show Detail</div>',
				deferEmptyText 		: false,
				enableTextSelection	: true
			},
			columns 	: [
				{	header 		: 'FWDN',
					dataIndex 	: 'idfwdn',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle,
					hidden 		: true
				},
				{	header 		: 'STEP NO',
					dataIndex 	: 'step',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'STEP DATA',
					dataIndex 	: 'stepdata',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'MEASURE',
					dataIndex 	: 'measure',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'MEASURE DATA',
					dataIndex 	: 'measuredata',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'MCH NAME',
					dataIndex 	: 'input_user',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle,
					hidden		: true
				},
				{	header 		: 'INSP DATE',
					dataIndex 	: 'input_date',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle,
					hidden		: true
				}
			],
			bbar			: Ext.create('Ext.PagingToolbar', {
				pageSize		: 11,
				store			: storeMaFwdnDetail,
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
			})
		});
		grid_maFwdnDetail.getStore().on('load', function() {
	        grid_maFwdnDetail.getView().stripeRows 			= true;
			grid_maFwdnDetail.getView().deferEmptyText 		= false;
			grid_maFwdnDetail.getView().enableTextSelection	= true;
	        grid_maFwdnDetail.getView().emptyText = '<div class="empty-txt-main">Data Not Available.</div>';
	        grid_maFwdnDetail.getView().refresh();
	    });
		var grid_maFlash = Ext.create('Ext.grid.Panel', {
			id 				: 'grid_maFlash',
			autoWidth 		: '100%',
			height			: 440,
			columnLines 	: true,
			store 			: storeMaFlash,
			viewConfig 		: {
				stripeRows 			: true,
				emptyText 	 		: '<div class="empty-txt">Select Mapros PCB Serial table for show this data.</div>',
				deferEmptyText 		: false,
				enableTextSelection	: true
			},
			tbar		: [
				'->',{
					xtype	: 'button',
					id		: 'dlFlash',
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
			columns 		: [
				{	header 		: 'FLASH',
					dataIndex 	: 'idflash',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle,
					hidden		: true
				},
				{	header 		: 'INSP DATE',
					dataIndex 	: 'dateinspec',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'TOTAL TIME',
					dataIndex 	: 'inspectime',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'MCH NAME',
					dataIndex 	: 'input_user',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'PCB SERIAL',
					dataIndex 	: 'serial',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'SN',
					dataIndex 	: 'sn',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle,
					hidden		: true
				},
				{	header 		: 'JIG NO',
					dataIndex 	: 'jigno',
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
				{	header 		: 'FILE',
					dataIndex 	: 'artfilename',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'NG',
					dataIndex 	: 'ngcontent',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'OPT SCAN',
					dataIndex 	: 'input_date',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle,
					hidden 		: true
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
				pageSize		: 10,
				store			: storeMaFlash,
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
		grid_maFlash.getStore().on('load', function() {
	        grid_maFlash.getView().stripeRows 			= true;
			grid_maFlash.getView().deferEmptyText 		= false;
			grid_maFlash.getView().enableTextSelection	= true;
	        grid_maFlash.getView().emptyText = '<div class="empty-txt-main">Data Not Available.</div>';
	        grid_maFlash.getView().refresh();
	    });
		var grid_maAvntest = Ext.create('Ext.grid.Panel', {
			id 				: 'grid_maAvntest',
			autoWidth 		: '100%',
			maxHeight		: 150,
			columnLines 	: true,
			store 			: storeMaAvntest,
			viewConfig 		: {
				stripeRows 			: true,
				emptyText 	 		: '<div class="empty-txt">Select Mapros PCB Serial table for show this data.</div>',
				deferEmptyText 		: false,
				enableTextSelection	: true
			},
			tbar		: [
				'->',{
					xtype	: 'button',
					id		: 'dlAvntest',
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
				{	header 		: 'AVNTEST',
					dataIndex 	: 'idavnt',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle,
					hidden 		: true
				},
				{	header 		: 'INSP DATE',
					dataIndex 	: 'dateinspec',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'TOTAL TIME',
					dataIndex 	: 'inspectime',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'MCH NAME',
					dataIndex 	: 'input_user',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'PCB SERIAL',
					dataIndex 	: 'serial',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer	: fontstyle
				},
				{	header 		: 'SN',
					dataIndex 	: 'sn',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle,
					hidden 		: true
				},
				{	header 		: 'JIG NO',
					dataIndex 	: 'jigno',
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
				{	header 		: 'FILE',
					dataIndex 	: 'artfilename',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'NG',
					dataIndex 	: 'ngcontent',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'SCAN DATE',
					dataIndex 	: 'input_date',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle,
					hidden 		: true
				}
			],
			// plugins			: [{
			    //     				ptype	: 'rowwidget',
			    //     				widget	: {
						 //            xtype	: 'grid',
						 //            autoLoad: true,
						 //            bind	: {
						 //                store : '{store_maAvntestDetail}',
						 //                title : 'Orders for {record.idavnt}',
						 //                selection: '{idavnt}',
						 //            },
						 //            columns : [
						 //            			{	header 		: 'AVNTEST',
							// 						dataIndex 	: 'idavnt',
							// 						flex 		: 1,
							// 						renderer	: fontstyle,
							// 						hidden 		: true
							// 					},
							// 					{	header 		: 'STEP NO',
							// 						dataIndex 	: 'step',
							// 						flex 		: 1,
							// 						renderer	: fontstyle
							// 					},
							// 					{	header 		: 'STEP DATA',
							// 						dataIndex 	: 'stepdata',
							// 						flex 		: 1,
							// 						renderer	: fontstyle
							// 					},
							// 					{	header 		: 'MEASURE',
							// 						dataIndex 	: 'measure',
							// 						flex 		: 1,
							// 						renderer	: fontstyle
							// 					},
							// 					{	header 		: 'MEASURE DATA',
							// 						dataIndex 	: 'measuredata',
							// 						flex 		: 1,
							// 						renderer	: fontstyle
							// 					},
							// 					{	header 		: 'MCH NAME',
							// 						dataIndex 	: 'input_user',
							// 						flex 		: 1,
							// 						renderer	: fontstyle
							// 					},
							// 					{	header 		: 'INSP DATE',
							// 						dataIndex 	: 'input_date',
							// 						flex 		: 1,
							// 						renderer	: fontstyle
							// 					}
							// 				]
						 //        }
			//    }],
	    	listeners: {
	    		select: function(grid, rowIndex, colIndex) {
	    			var rec = this.getSelectionModel().getSelection();
	    			var avnt = rec[0].data.idavnt;
	    			storeMaAvntestDetail.proxy.setExtraParam('avnt',avnt);
	    			storeMaAvntestDetail.loadPage(1);

	    		}
	    	},
			// bbar			: Ext.create('Ext.PagingToolbar', {
				// 	pageSize		: itemperpage,
				// 	store			: storeMaAvntest,
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
		grid_maAvntest.getStore().on('load', function() {
	        grid_maAvntest.getView().stripeRows 			= true;
			grid_maAvntest.getView().deferEmptyText 		= false;
			grid_maAvntest.getView().enableTextSelection	= true;
	        grid_maAvntest.getView().emptyText = '<div class="empty-txt-main">Data Not Available.</div>';
	        grid_maAvntest.getView().refresh();
	    });
		var grid_maAvntestDetail = Ext.create('Ext.grid.Panel', {
			id 				: 'grid_maAvntestDetail',
			title 			: '<div style="text-align:center;">==== &nbsp; DETAIL &nbsp; ====</div>',
			autoWidth 		: '80%',
			Height			: 450,
			columnLines 	: true,
			store 			: storeMaAvntestDetail,
			viewConfig 		: {
				stripeRows 			: true,
				emptyText 	 		: '<div class="empty-txt">Select Header to show Detail</div>',
				deferEmptyText 		: false,
				enableTextSelection	: true
			},
			columns 	: [
				{	header 		: 'AVNTEST',
					dataIndex 	: 'idavnt',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle,
					hidden 		: true
				},
				{	header 		: 'STEP NO',
					dataIndex 	: 'step',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'STEP DATA',
					dataIndex 	: 'stepdata',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'MEASURE',
					dataIndex 	: 'measure',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'MEASURE DATA',
					dataIndex 	: 'measuredata',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'MCH NAME',
					dataIndex 	: 'input_user',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle,
					hidden 		: true
				},
				{	header 		: 'INSP DATE',
					dataIndex 	: 'input_date',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle,
					hidden 		: true
				}
			],
			bbar			: Ext.create('Ext.PagingToolbar', {
				pageSize		: 9,
				store			: storeMaAvntestDetail,
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
		grid_maAvntestDetail.getStore().on('load', function() {
	        grid_maAvntestDetail.getView().stripeRows 			= true;
			grid_maAvntestDetail.getView().deferEmptyText 		= false;
			grid_maAvntestDetail.getView().enableTextSelection	= true;
	        grid_maAvntestDetail.getView().emptyText = '<div class="empty-txt-main">Data Not Available.</div>';
	        grid_maAvntestDetail.getView().refresh();
	    });
		var grid_maAvmt = Ext.create('Ext.grid.Panel', {
			id 				: 'grid_maAvmt',
			autoWidth 		: '80%',
			maxheight		: 150,
			columnLines 	: true,
			store 			: storeMaAvmt,
			viewConfig 		: {
				stripeRows 			: true,
				emptyText 	 		: '<div class="empty-txt">Select Mapros Main Table for show this data.</div>',
				deferEmptyText 		: false,
				enableTextSelection	: true
			},
			tbar		: [
				{	xtype : 'textfield',
					id : 'serial_avmt',
					hidden: true
				},
				{
					xtype	: 'button',
					id		: 'dlAvmt',
					iconCls	: 'download',
					text 	: 'Download',
					tooltip	: 'Download',
					handler : function (){
						var rbCheck 	= $("#valOfCategory").val();
						var modelName 	= $("#model-name").val().toUpperCase();
						var serialNo 	= Ext.getCmp('serial_avmt').getValue();
						// $("#serial-no").val().toUpperCase();
						var lotNo 		= "";
						// $("#lot-no").val().toUpperCase();
						var dummySerial = $("#dummy-serial").val().toUpperCase();

						console.log('rbCheck 		= '+rbCheck);
						console.log('modelName 		= '+modelName);
						console.log('serialNo 		= '+serialNo);
						console.log('lotNo 			= '+lotNo);
						console.log('dummySerial 	= '+dummySerial);
						console.log('ALOW POP UP !!!');
						console.log('resp/finishgood_ma/dlFgAvmt.php?rb='+rbCheck+'&mdl='+modelName+'&s='+serialNo+'&l='+lotNo+'&ds='+dummySerial+'');
						window.open('resp/finishgood_ma/dlFgAvmt.php?rb='+rbCheck+'&mdl='+modelName+'&s='+serialNo+'&l='+lotNo+'&ds='+dummySerial+'', target='_blank');
						console.log('resp/finishgood_ma/dlFgAvmtDetail.php?rb='+rbCheck+'&mdl='+modelName+'&s='+serialNo+'&l='+lotNo+'&ds='+dummySerial+'');
						window.open('resp/finishgood_ma/dlFgAvmtDetail.php?rb='+rbCheck+'&mdl='+modelName+'&s='+serialNo+'&l='+lotNo+'&ds='+dummySerial+'', target='_blank');
					}
				}
			],
			columns 	: [
				{ 	header 		: 'AVMT',
					dataIndex 	: 'idavmt',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle,
					hidden		: true
				},
				{	header 		: 'INSP START',
					dataIndex 	: 'stdate',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'INSP END',
					dataIndex 	: 'endate',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'MCH NAME',
					dataIndex 	: 'input_user',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'DUMMY SERIAL',
					dataIndex 	: 'barcode',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer	: fontstyle
				},
				{	header 		: 'SERIAL NO',
					dataIndex 	: 'sn',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle,
					hidden 		: true
				},
				{	header 		: 'MODEL PROG',
					dataIndex 	: 'program',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle,
					hidden		: true
				},
				{	header 		: 'LAP',
					dataIndex 	: 'lap',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'JUDGE',
					dataIndex 	: 'judgment',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'DATE',
					dataIndex 	: 'input_date',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle,
					hidden		: true
				},
				{	header 		: 'update_user',
					dataIndex 	: 'update_user',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle,
					hidden		: true
				},
				{	header 		: 'update_date',
					dataIndex 	: 'update_date',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle,
					hidden		: true
				}
			],
			// plugins			: [
				// 	{
			    //     				ptype	: 'rowwidget',
			    //     				widget	: {
				//             xtype	: 'grid',
				//             autoLoad: true,
				//             store 	: storeMaAvmtDetail,
				//             bind	: {
				//                 title : 'Orders for ( {record.idavmt} )'
				//             },
				//             columns : [
				//        	    			{	header 		: 'autoid',
				// 							dataIndex 	: 'autoid',
				// 							flex 		: 1,
				// 							renderer	: fontstyle,
				// 							hidden 		: true
				// 						},
				// 						{	header 		: 'ID AVMT',
				// 							dataIndex 	: 'idavmt',
				// 							flex 		: 1,
				// 							renderer	: fontstyle,
				// 							hidden 		: true
				// 						},
				// 						{	header 		: 'DUMMY MASTER',
				// 							dataIndex 	: 'barcode',
				// 							flex 		: 1,
				// 							renderer	: fontstyle,
				// 							hidden 		: true
				// 						},
				// 						{	header 		: 'STEP NO',
				// 							dataIndex 	: 'step',
				// 							flex 		: 1,
				// 							renderer	: fontstyle
				// 						},
				// 						{	header 		: 'TYPE',
				// 							dataIndex 	: 'type',
				// 							flex 		: 1,
				// 							renderer	: fontstyle
				// 						},
				// 						{	header 		: 'NAME',
				// 							dataIndex 	: 'name',
				// 							flex 		: 1,
				// 							renderer	: fontstyle
				// 						},
				// 						{	header 		: 'JUDGE',
				// 							dataIndex 	: 'judgment',
				// 							flex 		: 1,
				// 							renderer	: fontstyle
				// 						},
				// 						{	header 		: 'VOLT',
				// 							dataIndex 	: 'volt',
				// 							flex 		: 1,
				// 							renderer	: fontstyle
				// 						},
				// 						{	header 		: 'CURR',
				// 							dataIndex 	: 'curr',
				// 							flex 		: 1,
				// 							renderer	: fontstyle
				// 						},
				// 						{	header 		: 'FREQ',
				// 							dataIndex 	: 'freq',
				// 							flex 		: 1,
				// 							renderer	: fontstyle
				// 						},
				// 						{	header 		: 'LVLL',
				// 							dataIndex 	: 'lvll',
				// 							flex 		: 1,
				// 							renderer	: fontstyle
				// 						},
				// 						{	header 		: 'DSTL',
				// 							dataIndex 	: 'dstl',
				// 							flex 		: 1,
				// 							renderer	: fontstyle
				// 						},
				// 						{	header 		: 'DSTR',
				// 							dataIndex 	: 'dstr',
				// 							flex 		: 1,
				// 							renderer	: fontstyle
				// 						},
				// 						{	header 		: 'RELL',
				// 							dataIndex 	: 'rell',
				// 							flex 		: 1,
				// 							renderer	: fontstyle
				// 						},
				// 						{	header 		: 'RELR',
				// 							dataIndex 	: 'relr',
				// 							flex 		: 1,
				// 							renderer	: fontstyle
				// 						},
				// 						{	header 		: 'SNL',
				// 							dataIndex 	: 'snl',
				// 							flex 		: 1,
				// 							renderer	: fontstyle
				// 						},
				// 						{	header 		: 'SNR',
				// 							dataIndex 	: 'snr',
				// 							flex 		: 1,
				// 							renderer	: fontstyle
				// 						},
				// 						{	header 		: 'REMARK',
				// 							dataIndex 	: 'remark',
				// 							flex 		: 1,
				// 							renderer	: fontstyle
				// 						},
				// 						{	header 		: 'MCH NAME',
				// 							dataIndex 	: 'input_user',
				// 							flex 		: 1,
				// 							renderer	: fontstyle
				// 						},
				// 						{	header 		: 'DATE',
				// 							dataIndex 	: 'input_date',
				// 							flex 		: 1,
				// 							renderer	: fontstyle
				// 						},
				// 						{	header 		: 'update_user',
				// 							dataIndex 	: 'update_user',
				// 							flex 		: 1,
				// 							renderer	: fontstyle,
				// 							hidden 		: true
				// 						},
				// 						{	header 		: 'update_date',
				// 							dataIndex 	: 'update_date',
				// 							flex 		: 1,
				// 							renderer	: fontstyle,
				// 							hidden 		: true
				// 						}
				// 			]
				// 		}
			 //    	}
	  		//   	],
	    	listeners: {
	    		select: function(grid, rowIndex, colIndex) {
	    			var rec = this.getSelectionModel().getSelection();
	    			var avmt = rec[0].data.idavmt;
	    			
	    			storeMaAvmtDetail.proxy.setExtraParam('avmt',avmt);
	    			storeMaAvmtDetail.loadPage(1);

	    		}
	    	},
			// bbar			: Ext.create('Ext.PagingToolbar', {
				// 	pageSize		: itemperpage,
				// 	store			: storeMaAvmt,
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
		grid_maAvmt.getStore().on('load', function() {
	        grid_maAvmt.getView().stripeRows 			= true;
			grid_maAvmt.getView().deferEmptyText 		= false;
			grid_maAvmt.getView().enableTextSelection	= true;
	        grid_maAvmt.getView().emptyText = '<div class="empty-txt-main">Data Not Available.</div>';
	        grid_maAvmt.getView().refresh();
	    });
		var grid_maAvmtDetail = Ext.create('Ext.grid.Panel', {
			id 				: 'grid_maAvmtDetail',
			title 			: '<div style="text-align:center;">== &nbsp; DETAIL &nbsp; ==</div>',
			autoWidth 		: '80%',
			Height			: 450,
			columnLines 	: true,
			store 			: storeMaAvmtDetail,
			viewConfig 		: {
				stripeRows 			: true,
				emptyText 	 		: '<div class="empty-txt">Selected Header to show Detail</div>',
				deferEmptyText 		: false,
				enableTextSelection	: true
			},
			columns 	: [
				{	header 		: 'autoid',
					dataIndex 	: 'autoid',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer	: fontstyle,
					hidden 		: true
				},
				{	header 		: 'ID AVMT',
					dataIndex 	: 'idavmt',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer	: fontstyle,
					hidden 		: true
				},
				{	header 		: 'DUMMY MASTER',
					dataIndex 	: 'barcode',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer	: fontstyle,
					hidden 		: true
				},
				{	header 		: 'STEP NO',
					dataIndex 	: 'step',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer	: fontstyle
				},
				{	header 		: 'TYPE',
					dataIndex 	: 'type',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer	: fontstyle
				},
				{	header 		: 'NAME',
					dataIndex 	: 'name',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer	: fontstyle
				},
				{	header 		: 'JUDGE',
					dataIndex 	: 'judgment',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer	: fontstyle
				},
				{	header 		: 'VOLT',
					dataIndex 	: 'volt',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer	: fontstyle
				},
				{	header 		: 'CURR',
					dataIndex 	: 'curr',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer	: fontstyle
				},
				{	header 		: 'FREQ',
					dataIndex 	: 'freq',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer	: fontstyle
				},
				{	header 		: 'LVLL',
					dataIndex 	: 'lvll',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer	: fontstyle
				},
				{	header 		: 'DSTL',
					dataIndex 	: 'dstl',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer	: fontstyle
				},
				{	header 		: 'DSTR',
					dataIndex 	: 'dstr',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer	: fontstyle
				},
				{	header 		: 'RELL',
					dataIndex 	: 'rell',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer	: fontstyle
				},
				{	header 		: 'RELR',
					dataIndex 	: 'relr',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer	: fontstyle
				},
				{	header 		: 'SNL',
					dataIndex 	: 'snl',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer	: fontstyle
				},
				{	header 		: 'SNR',
					dataIndex 	: 'snr',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer	: fontstyle
				},
				{	header 		: 'RATIO',
					dataIndex 	: 'ratio',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer	: fontstyle
				},
				{	header 		: 'HPOS 0',
					dataIndex 	: 'hpos0',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer	: fontstyle
				},
				{	header 		: 'REMARK',
					dataIndex 	: 'remark',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer	: fontstyle
				},
				{	header 		: 'MCH NAME',
					dataIndex 	: 'input_user',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer	: fontstyle,
					hidden 	 	: true
				},
				{	header 		: 'INSP DATE',
					dataIndex 	: 'input_date',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer	: fontstyle,
					hidden 		: true
				},
				{	header 		: 'Update User',
					dataIndex 	: 'update_user',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer	: fontstyle,
					hidden 		: true
				},
				{	header 		: 'Update Date',
					dataIndex 	: 'update_date',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer	: fontstyle,
					hidden 		: true
				}
			],
			bbar			: Ext.create('Ext.PagingToolbar', {
				pageSize		: itemperpage,
				store			: storeMaAvmtDetail,
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
		grid_maAvmtDetail.getStore().on('load', function() {
	        grid_maAvmtDetail.getView().stripeRows 			= true;
			grid_maAvmtDetail.getView().deferEmptyText 		= false;
			grid_maAvmtDetail.getView().enableTextSelection	= true;
	        grid_maAvmtDetail.getView().emptyText = '<div class="empty-txt-main">Data Not Available.</div>';
	        grid_maAvmtDetail.getView().refresh();
	    });
		
		var grid_maAuto0 = Ext.create('Ext.grid.Panel', {
			id 				: 'grid_maAuto0',
			autoWidth 		: '100%',
			maxHeight		: 200,
			columnLines 	: true,
			store 			: storeMaLine0,
			viewConfig 		: {
				stripeRows 			: true,
				emptyText 	 		: '<div class="empty-txt">Select Mapros PCB Serial table for show this data.</div>',
				deferEmptyText 		: false,
				enableTextSelection	: true
			},
			tbar		: [
				'->',{
					xtype	: 'button',
					id		: 'dlAutoLineZero',
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
				{ 	header 		: 'ID',
					dataIndex 	: 'idlinezero',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle,
					hidden 		: true
				},
				{ 	header 		: 'GUID MASTER',
					dataIndex 	: 'guid_master',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle,
					hidden 		: true
				},
				{	header 		: 'INSP DATE',
					dataIndex 	: 'dateinspec',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'TOTAL TIME',
					dataIndex 	: 'inspectime',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'MCH NAME',
					dataIndex 	: 'input_user',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer	: fontstyle
				},
				{	header 		: 'PCB SERIAL',
					dataIndex 	: 'serial',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer	: fontstyle
				},
				{	header 		: 'SN',
					dataIndex 	: 'sn',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle,
					hidden 		: true
				},
				{	header 		: 'JIG NO',
					dataIndex 	: 'jigno',
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
				{	header 		: 'FILE',
					dataIndex 	: 'artfilename',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'NG',
					dataIndex 	: 'ngcontent',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'OPT SCAN',
					dataIndex 	: 'input_date',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle,
					hidden 		: true
				}
			],
			// plugins			: [
				// 	{
			    //     				ptype	: 'rowwidget',
			    //     				widget	: {
					//             xtype	: 'grid',
					//             autoLoad: true,
					//             store 	: storeMaLine0Detail,
					//             bind	: {
					//                 title : 'Orders for ( {record.idlinezero} )'
					//             },
					//             columns : [
					//             			{	header 		: 'ID',
					// 							dataIndex 	: 'idlinezero',
					// 							flex 		: 1,
					// 							renderer	: fontstyle,
					// 							hidden 		: true
					// 						},
					// 						{	header 		: 'Row Number',
					// 							dataIndex 	: 'rownumber',
					// 							flex 		: 1,
					// 							renderer	: fontstyle,
					// 							hidden 		: true
					// 						},
					// 						{	header 		: 'STEP NO',
					// 							dataIndex 	: 'step',
					// 							flex 		: 1,
					// 							renderer	: fontstyle
					// 						},
					// 						{	header 		: 'STEP DATA',
					// 							dataIndex 	: 'stepdata',
					// 							flex 		: 1,
					// 							renderer	: fontstyle
					// 						},
					// 						{	header 		: 'MEASURE',
					// 							dataIndex 	: 'measure',
					// 							flex 		: 1,
					// 							renderer	: fontstyle
					// 						},
					// 						{	header 		: 'MEASURE DATA',
					// 							dataIndex 	: 'measuredata',
					// 							flex 		: 1,
					// 							renderer	: fontstyle
					// 						},
					// 						{	header 		: 'MCH NAME',
					// 							dataIndex 	: 'input_user',
					// 							flex 		: 1,
					// 							renderer	: fontstyle
					// 						},
					// 						{	header 		: 'INSP DATE',
					// 							dataIndex 	: 'input_date',
					// 							flex 		: 1,
					// 							renderer	: fontstyle
					// 						}
					// 			]
					// 		}
				 //    	}
			  	//   	],
			// bbar			: Ext.create('Ext.PagingToolbar', {
				// 	pageSize		: itemperpage,
				// 	store			: storeMaLine0,
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
	    			storeMaLine0Detail.proxy.setExtraParam('idline0',idlinezero);
	    			storeMaLine0Detail.loadPage(1);

	    		}
	    	},
			//features: [filters],
			// selModel: {
			// 	selType: 'cellmodel'
			// },
			// plugins: [cellEditing]
		});
		grid_maAuto0.getStore().on('load', function() {
	        grid_maAuto0.getView().stripeRows 			= true;
			grid_maAuto0.getView().deferEmptyText 		= false;
			grid_maAuto0.getView().enableTextSelection	= true;
	        grid_maAuto0.getView().emptyText = '<div class="empty-txt-main">Data Not Available.</div>';
	        grid_maAuto0.getView().refresh();
	    });
		var grid_maAuto0Detail = Ext.create('Ext.grid.Panel', {
			id 				: 'grid_maAuto0Detail',
			title 			: '<div style="text-align:center;">==== &nbsp; DETAIL &nbsp; ====</div>',
			autoWidth 		: '80%',
			height			: 450,
			columnLines 	: true,
			store 			: storeMaLine0Detail,
			viewConfig 		: {
				stripeRows 			: true,
				emptyText 	 		: '<div class="empty-txt">Selected Header to show Detail</div>',
				deferEmptyText 		: false,
				enableTextSelection	: true
			},
			columns 	: [
				{	header 		: 'ID',
					dataIndex 	: 'idlinezero',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle,
					hidden 		: true
				},
				{	header 		: 'Row Number',
					dataIndex 	: 'rownumber',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle,
					hidden 		: true
				},
				{	header 		: 'STEP NO',
					dataIndex 	: 'step',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'STEP DATA',
					dataIndex 	: 'stepdata',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'MEASURE',
					dataIndex 	: 'measure',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'MEASURE DATA',
					dataIndex 	: 'measuredata',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle
				},
				{	header 		: 'MCH NAME',
					dataIndex 	: 'input_user',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle,
					hidden 		: true
				},
				{	header 		: 'INSP DATE',
					dataIndex 	: 'input_date',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer	: fontstyle,
					hidden 		: true
				}
			],
			bbar			: Ext.create('Ext.PagingToolbar', {
				pageSize		: 7,
				store			: storeMaLine0Detail,
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
		grid_maAuto0Detail.getStore().on('load', function() {
	        grid_maAuto0Detail.getView().stripeRows 			= true;
			grid_maAuto0Detail.getView().deferEmptyText 		= false;
			grid_maAuto0Detail.getView().enableTextSelection	= true;
	        grid_maAuto0Detail.getView().emptyText = '<div class="empty-txt-main">Data Not Available.</div>';
	        grid_maAuto0Detail.getView().refresh();
	    });
		
	//  =======================================================	   PANEL GRID   =====================================	
		// var panel_board = Ext.create('Ext.panel.Panel',{
			//     border: true,
			//     layout: 'border',
			//    	defaults: {
			// 	     split: false,
			// 	     plain: true
			//     },
			//    	items: [{
			// 	   region: 'north', // GRID SIDE
			// 	   layout: 'fit',
			// 	   items: grid_maprosBoard
			// 	   }, {
			// 	   region: 'center', // GRID SIDE
			// 	   layout: 'fit',
			// 	   items: grid_maprosBoardSymptom
			// 	   }]
		 //  	});
		 //  	var panel_main = Ext.create('Ext.panel.Panel',{
			//     border: true,
			//     layout: 'border',
			//    	defaults: {
			// 	     split: false,
			// 	     plain: true
			//     },
			//    	items: [{
			// 	   region: 'north', // GRID SIDE
			// 	   layout: 'fit',
			// 	   items: grid_maprosMain
			// 	   }, {
			// 	   region: 'center', // GRID SIDE
			// 	   layout: 'fit',
			// 	   items: grid_maprosMainSymptom
			// 	   }]
		 //  	});
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
			   items: grid_maFwdn
			   }, {
			   region: 'center', // GRID SIDE
			   layout: 'fit',
			   items: grid_maFwdnDetail
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
			   items: grid_maAvntest
			   }, {
			   region: 'center', // GRID SIDE
			   layout: 'fit',
			   items: grid_maAvntestDetail
			   }
		   	]
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
			   items: grid_maAvmt
			   }, {
			   region: 'center', // GRID SIDE
			   layout: 'fit',
			   items: grid_maAvmtDetail
				}
			]
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
			   items: grid_maAuto0
			   }, {
			   region: 'center', // GRID SIDE
			   layout: 'fit',
			   items: grid_maAuto0Detail
			   }
		   	]
	  	});

	//	=======================================================	TAB PANEL    	=====================================

		// var part_ma = Ext.create('Ext.tab.Panel', {
			// 	id  		: 'part_ma',
			// 	renderTo 	: 'prod_mapros',
			// 	plain 		: true,
			// 	activeTab 	: 0,
			// 	autoWidth 	: '100%',
			// 	height		: 600,
			// 	autoScroll 	: true,
			// 	frame 		: true,
			// 	style 		: 'padding:5px;-background:#157FCC;',
			// 	tabBar 		: {
			// 		flex	: 1,
			// 		layout 	: {
			// 			pack 	: 'center',
			// 			align 	: 'stretch'
			// 		}
			// 	},
			// 	items 		: [
			// 		{	title 		: 'PCB Serial',
			// 		 	id  	 	: 'show_gridPCB',
			// 		 	layout 		: 'fit',
			// 			reorderable : false,
			// 			items 		: [panel_board]
			// 		},
			// 		{	title 		: 'Panel',
			// 		 	id  		: 'show_gridPanel',
			// 			reorderable : false,
			// 			items 		: [grid_maprosPanel]
			// 		},
			// 		{	title 		: 'LCD',
			// 		 	id  		: 'show_gridLCD',
			// 			reorderable : false,
			// 			items 		: [grid_maprosLCD]
			// 		},
			// 		{	title 		: 'Mecha',
			// 		 	id  		: 'show_gridMecha',
			// 			reorderable : false,
			// 			items 		: [grid_maprosMecha]
			// 		},
			// 		{	title 		: 'Main',
			// 		 	id  		: 'show_gridMain',
			// 		 	layout 		: 'fit',
			// 			reorderable : false,
			// 			items 		: [panel_main]
			// 		},
			// 		{	title 		: 'Critical Part',
			// 		 	id  		: 'show_gridCritical',
			// 			reorderable : false,
			// 			items 		: [grid_maprosCritical]
			// 		}
			// 		// {	title 		: 'QUALITY REPORT',
			// 		//  	id  		: 'show_grid_ma_quality',
			// 		// 	reorderable : false,
			// 		// 	items 	: [grid_ma_quality]
			// 		// },

			// 		// {	id : 'show_grid_ma_oee',
			// 		// 	title: 'OCS',
			// 		// 	reorderable: false,
			// 		// 	//items: [grid_part_smt_install]
			// 		// },
			// 		// { 	id : 'show_grid_ma_losttime',
			// 		// 	title: 'Lost Time',
			// 		// 	reorderable: false,
			// 		// 	items: [grd_ma_losttime]
			// 		// },
			// 		// { 	id : 'show_grid_jncp',
			// 		// 	title: 'Jig and Checker Usage',
			// 		// 	reorderable: false,
			// 		// 	//items: [grid_part_smt_install]
			// 		// },
			// 		// { 	id : 'show_grid_fscr',
			// 		// 	title: 'FSCR (Part & Process verification on change model)',
			// 		// 	reorderable: false,
			// 		// 	//items: [grid_part_smt_install]
			// 		// },
					
			// 	]
			// });
		var part_maInspection = Ext.create('Ext.tab.Panel', {
			id  		: 'part_maInspection',
			renderTo 	: 'prod_inspection',
			plain 		: true,
			activeTab 	: 0,
			autoWidth 	: '100%',
			height		: 500,
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
				 	id  		: 'show_gridMaQuality',
					reorderable : false,
					items 		: [grid_maQuality]
				},
				{	title 		: 'FWDN',
				 	id  		: 'show_gridMaFwdn',
					reorderable : false,
					layout		: 'fit',
					items 		: [panel_fwdn]
				}, 
				{	title 		: 'FLASH',
				 	id  		: 'show_grid_flash',
					reorderable : false,
					items 		: [grid_maFlash]
				}, 
				{	title 		: 'AVN Test',
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
				},
				// {	id : 'show_grid_ma_oee',
				// 	title: 'OCS',
				// 	reorderable: false,
				// 	//items: [grid_part_smt_install]
				// },
				// { 	id : 'show_grid_ma_losttime',
				// 	title: 'Lost Time',
				// 	reorderable: false,
				// 	items: [grd_ma_losttime]
				// },
				// { 	id : 'show_grid_jncp',
				// 	title: 'Jig and Checker Usage',
				// 	reorderable: false,
				// 	//items: [grid_part_smt_install]
				// },
				// { 	id : 'show_grid_fscr',
				// 	title: 'FSCR (Part & Process verification on change model)',
				// 	reorderable: false,
				// 	//items: [grid_part_smt_install]
				// },
			]
		});
});