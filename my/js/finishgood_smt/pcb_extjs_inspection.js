Ext.onReady(function() {

	//	=======================================================	MODEL 		=====================================
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
	//	=======================================================	DATASTORE 	=====================================
	var store_mapros_fwdn = Ext.create('Ext.data.Store',{
		storeId : 'store_mapros_fwdn',
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
		storeId : 'store_mapros_fwdn_detail',
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
		storeId : 'store_mapros_flash',
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
		storeId : 'store_mapros_avntest',
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
		storeId : 'store_mapros_avntest_detail',
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
		storeId : 'store_mapros_avmt',
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
		storeId : 'store_mapros_avmt_detail',
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
		storeId : 'store_mapros_line0',
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
		storeId : 'store_mapros_line0_detail',
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
	var store_mapros_critical = Ext.create('Ext.data.Store',{
		storeId : 'store_mapros_critical',
		model	: 'model_mapros_critical',
		autoLoad: false,
		pageSize: itemperpage,
		proxy   : {
			type    : 'ajax',
			url     : 'json/finishgood_smt/json_good_smt_mapros_critical.php',
			reader  : {
				type    : 'json',
				root    : 'rows',
				totalProperty: 'totalCount'
			}
		}
	});

	//	=======================================================	GRID 		=====================================
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
				componentCls: 'headergrid',	
				width 		: 180,
				renderer	: upsize
			},
			{	header 		: 'INSP DATE',
				dataIndex 	: 'dateinspec',
				componentCls: 'headergrid',	
				width 		: 100,
				renderer	: upsize
			},
			{	header 		: 'TOTAL TIME',
				dataIndex 	: 'inspectime',
				componentCls: 'headergrid',	
				width 		: 80,
				renderer	: upsize
			},
			{	header 		: 'SERIAL',
				dataIndex 	: 'serial',
				componentCls: 'headergrid',	
				width 		: 210,
				renderer	: upsize
			},
			{	header 		: 'SN',
				dataIndex 	: 'sn',
				componentCls: 'headergrid',	
				width 		: 60,
				renderer	: upsize
			},
			{	header 		: 'JIG NO',
				dataIndex 	: 'jigno',
				componentCls: 'headergrid',	
				width 		: 60,
				renderer	: upsize
			},
			{	header 		: 'JUDGE',
				dataIndex 	: 'judge',
				componentCls: 'headergrid',	
				width 		: 90,
				renderer	: upsize
			},
			{	header 		: 'FILE',
				dataIndex 	: 'artfilename',
				componentCls: 'headergrid',	
				width 		: 60,
				renderer	: upsize
			},
			{	header 		: 'NG',
				dataIndex 	: 'ngcontent',
				componentCls: 'headergrid',	
				width 		: 60,
				renderer	: upsize
			},
			{	header 		: 'MCH CODE',
				dataIndex 	: 'input_user',
				componentCls: 'headergrid',	
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
		listeners: {
			select: function(grid, rowIndex, colIndex) {
				var rec = this.getSelectionModel().getSelection();
				var fwdn = rec[0].data.idfwdn;
				
				store_mapros_fwdn_detail.proxy.setExtraParam('idfwdn',fwdn);
				store_mapros_fwdn_detail.loadPage(1);

			}
		}
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
				componentCls: 'headergrid',	
				flex 		: 1,
				renderer	: upsize,
				hidden 		: true
			},
			{	header 		: 'STEP',
				dataIndex 	: 'step',
				componentCls: 'headergrid',	
				flex 		: 1,
				renderer	: upsize
			},
			{	header 		: 'STEP DATA',
				dataIndex 	: 'stepdata',
				componentCls: 'headergrid',	
				flex 		: 1,
				renderer	: upsize
			},
			{	header 		: 'MEASURE',
				dataIndex 	: 'measure',
				componentCls: 'headergrid',	
				flex 		: 1,
				renderer	: upsize
			},
			{	header 		: 'MEASURE DATA',
				dataIndex 	: 'measuredata',
				componentCls: 'headergrid',	
				flex 		: 1,
				renderer	: upsize
			},
			{	header 		: 'OPERATOR',
				dataIndex 	: 'input_user',
				componentCls: 'headergrid',	
				flex 		: 1,
				renderer	: upsize
			},
			{	header 		: 'INSP DATE',
				dataIndex 	: 'input_date',
				componentCls: 'headergrid',	
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
		})
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
				componentCls: 'headergrid',	
				width 		: 170,
				renderer	: upsize
			},
			{	header 		: 'DUMMY MASTER',
				dataIndex 	: 'barcode',
				componentCls: 'headergrid',	
				width 		: 130,
				renderer	: upsize
			},
			{	header 		: 'SERIAL NO',
				dataIndex 	: 'sn',
				componentCls: 'headergrid',	
				width 		: 130,
				renderer	: upsize
			},
			{	header 		: 'MODEL PROG',
				dataIndex 	: 'program',
				componentCls: 'headergrid',	
				width 		: 140,
				renderer	: upsize
			},
			{	header 		: 'START',
				dataIndex 	: 'stdate',
				componentCls: 'headergrid',	
				width 		: 90,
				renderer	: upsize
			},
			{	header 		: 'END',
				dataIndex 	: 'endate',
				componentCls: 'headergrid',	
				width 		: 90,
				renderer	: upsize
			},
			{	header 		: 'LAP',
				dataIndex 	: 'lap',
				componentCls: 'headergrid',	
				width 		: 90,
				renderer	: upsize
			},
			{	header 		: 'JUDGE',
				dataIndex 	: 'judgment',
				componentCls: 'headergrid',	
				width 		: 80,
				renderer	: upsize
			},
			{	header 		: 'MCHNAME',
				dataIndex 	: 'input_user',
				componentCls: 'headergrid',	
				width 		: 100,
				renderer	: upsize
			},
			{	header 		: 'DATE',
				dataIndex 	: 'input_date',
				componentCls: 'headergrid',	
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

	//	=======================================================	TAB  PANEL	=====================================
	var panel_pcb_inspection = Ext.create('Ext.tab.Panel', {
		id 			: 'panel_pcb_inspection',
		renderTo 	: 'panel_pcb_inspection',
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
});