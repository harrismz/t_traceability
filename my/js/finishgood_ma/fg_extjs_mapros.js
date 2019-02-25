Ext.onReady(function() {
	//	=======================================================    MODEL        =====================================
		Ext.define('model_mapros_board_fg',{
	        extend: 'Ext.data.Model',
	        fields: ['board_id','guid_master','guid_ticket','modelname','lotno',
						'scanner_id','status','scan_nik','judge','created_at',
						'updated_at','lineprocess','line','refno','ngsymptom']
		});
		Ext.define('model_mapros_panel_fg',{
            extend: 'Ext.data.Model',
            fields: ['ticket_no','guid_master','guid_ticket','modelname',
					'scanner_id','status','scan_nik','judge','created_at','updated_at','lineprocess','line']
    	});
    	Ext.define('model_mapros_master_fg',{
            extend: 'Ext.data.Model',
            fields: ['ticket_no_master','guid_master','modelname',
					'scanner_id','status','scan_nik','judge','created_at','updated_at','lineprocess','line']
   		});
   		Ext.define('model_ma_qualityreport',{
        	extend: 'Ext.data.Model',
         	fields: ['tgl','bln','thn','date','line_name','shift','model_name','lot','prod_no','st_serial','serial_output','symptom','def_cause','p_disposal','responsible']
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
       	Ext.define('model_mapros_critical',{
            extend: 'Ext.data.Model',
			fields: ['unique_id','supp_code','part_no','po', 'prodsup','lotnosup','qty','scan_nik','created_at','process','code','line']
       	});
	//	=======================================================    DATASTORE    =====================================
		var store_mapros_board_fg = Ext.create('Ext.data.Store',{
			model	: 'model_mapros_board_fg',
			autoLoad: false,
			pageSize: itemperpage,
			proxy   : {
				type    : 'ajax',
				url     : 'json/finishgood_ma/json_mapros_board.php',
				reader  : {
					type    : 'json',
					root    : 'rows'
				}
			}
		});
		var store_mapros_panel_fg = Ext.create('Ext.data.Store',{
			model	: 'model_mapros_panel_fg',
			autoLoad: false,
			pageSize: itemperpage,
			proxy   : {
				type    : 'ajax',
				url     : 'json/finishgood_ma/json_mapros_panel.php',
				reader  : {
					type    : 'json',
					root    : 'rows'
				}
			}
		});
		var store_mapros_master_fg = Ext.create('Ext.data.Store',{
			model	: 'model_mapros_master_fg',
			autoLoad: false,
			pageSize: itemperpage,
			proxy   : {
				type    : 'ajax',
				url     : 'json/finishgood_ma/json_mapros_master.php',
				reader  : {
					type    : 'json',
					root    : 'rows'
				}
			},
			// listeners: {
			// 	load: function(store, records) {
			// 		if (records != "") {

			// 			store_mapros_board_fg.proxy.setExtraParam('model', boardid);
			// 			store_mapros_board_fg.proxy.setExtraParam('serial_no', cavity);
			// 			store_mapros_board_fg.loadPage(1);
			// 			store_mapros_panel_fg.proxy.setExtraParam('boardid', boardid);
			// 			store_mapros_panel_fg.proxy.setExtraParam('cavity', cavity);
			// 			store_mapros_panel_fg.loadPage(1);
			// 		} 
			// 	}
			// }
		});
		var store_mapros_critical = Ext.create('Ext.data.Store',{
			model	: 'model_mapros_critical',
			autoLoad: false,
			pageSize: itemperpage,
			proxy   : {
				type    : 'ajax',
				url     : 'json/finishgood_ma/json_mapros_critical.php',
				reader  : {
					type    : 'json',
					root    : 'rows',
					totalProperty: 'totalCount'
				}
			}
		});
		var store_ma_qualityreport = Ext.create('Ext.data.Store',{
			model	: 'model_ma_qualityreport',
			autoLoad: false,
			pageSize: itemperpage,
			proxy   : {
                type    : 'ajax',
                url     : 'json/finishgood_ma/json_ma_qualityreport.php',
                reader  : {
                    type    : 'json',
                    root    : 'rows',
                    totalProperty  : 'totalCount'
                }
            }
		});
		var store_mapros_fwdn = Ext.create('Ext.data.Store',{
			model	: 'model_mapros_fwdn',
			autoLoad: false,
			// pageSize: itemperpage,
			proxy   : {
				type    : 'ajax',
				url     : 'json/finishgood_ma/json_ma_mapros_fwdn.php',
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
			pageSize: 11,
			proxy   : {
				type    : 'ajax',
				url     : 'json/finishgood_ma/json_good_smt_mapros_fwdn_detail.php',
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
				url     : 'json/finishgood_ma/json_ma_mapros_flash.php',
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
				url     : 'json/finishgood_ma/json_ma_mapros_avntest.php',
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
			pageSize: 9,
			proxy   : {
				type    : 'ajax',
				url     : 'json/finishgood_ma/json_good_smt_mapros_avntest_detail.php',
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
				url     : 'json/finishgood_ma/json_ma_mapros_avmt.php',
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
			pageSize: itemperpage,
			proxy   : {
				type    : 'ajax',
				url     : 'json/finishgood_ma/json_good_smt_mapros_avmt_detail.php',
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
				url     : 'json/finishgood_ma/json_ma_mapros_line0.php',
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
			pageSize: 7,
			proxy   : {
				type    : 'ajax',
				url     : 'json/finishgood_ma/json_good_smt_mapros_line0_detail.php',
				reader  : {
					type    : 'json',
					root    : 'rows',
					totalProperty: 'totalCount'
				}
			}
		});
	//  =======================================================	   PANEL GRID   =====================================	
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

	//	=======================================================    GRID         =====================================

	//	=======================================================	TAB PANEL    	=====================================

		//	PCB & MA Department
			var part_ma = Ext.create('Ext.tab.Panel', {
				id  		: 'part_ma',
				renderTo 	: 'prod_mapros',
				plain 		: true,
				activeTab 	: 0,
				autoWidth 	: '100%',
				height		: 400,
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
					{	title 		: 'PCB PROCESS',
					 	id  	 	: 'show_grid_pcb_boardid',
						reorderable : false,
						items 		: [grid_mapros_board]
					},
					{	title 		: 'PANEL PROCESS',
					 	id  		: 'show_grid_ma_panel',
						reorderable : false,
						items 		: [grid_mapros_panel]
					},
					{	title 		: 'MAIN PROCESS',
					 	id  		: 'show_grid_ma_master',
						reorderable : false,
						items 		: [grid_mapros_master]
					},
					{	title 		: 'CRITICAL PROCESS',
					 	id  		: 'show_grid_ma_critical',
						reorderable : false,
						items 		: [grid_mapros_critical]
					}
					// {	title 		: 'QUALITY REPORT',
					//  	id  		: 'show_grid_ma_quality',
					// 	reorderable : false,
					// 	items 	: [grid_ma_quality]
					// },

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
		//	MA Inspection
			var part_ma_inspection = Ext.create('Ext.tab.Panel', {
				id  		: 'part_ma_inspection',
				renderTo 	: 'prod_inpsection',
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
					{	title 		: 'QUALITY REPORT',
					 	id  		: 'show_grid_ma_quality',
						reorderable : false,
						items 	: [grid_ma_quality]
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
					},
					// {	title 		: 'QUALITY REPORT',
					//  	id  		: 'show_grid_ma_quality',
					// 	reorderable : false,
					// 	items 	: [grid_ma_quality]
					// },

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