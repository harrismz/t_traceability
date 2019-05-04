Ext.onReady(function() {
	//	=======================================================    MODEL        =====================================
		Ext.define('main_data', {
			extend: 'Ext.data.Model',
			fields: ['line_name', 'prod_date', 'host_ip', 'model_name', 'prod_no', 'lot_size', 'start_serial',
					 'serial_no_id', 'serial_id', 'mecha_model', 'mecha_lot']
		});
	//	=======================================================    DATASTORE    =====================================
		var finishgood_store = Ext.create('Ext.data.Store', {
			storeId	: 'finishgood_store',
			model 	: 'main_data',
			pageSize: 8,
			proxy 	: {
				type: 'ajax',
				url: 'json/finishgood_ma/json_finishgood.php',
				reader: {
					type: 'json',
					root: 'rows',
					totalProperty: 'totalCount'
				}
			},
			listeners: {
				load: function(store, records) {
					if (records = ""){
						Ext.Msg.alert('Warning', 'No Data Found ! <br> Please try again with the correct Model and Serial Number.');
					}
					// if (records != "") {
					// 	// line 		= store.getAt(0).get('line_name');
					// 	// prod_date 	= store.getAt(0).get('prod_date');
					// 	// model 		= store.getAt(0).get('model_name');
					// 	// model_mecha	= store.getAt(0).get('mecha_model');
					// 	// prodno 		= store.getAt(0).get('prod_no');
					// 	// lot_size 	= store.getAt(0).get('lot_size');
					// 	// serial_no 	= store.getAt(0).get('start_serial');
					// 	// serial_id 	= store.getAt(0).get('serial_id');


					// 	// serialcode	= Ext.getCmp('finishgood_serial').getValue();
						
					// 	// store_part_receiving.proxy.setExtraParam('prod_date', prod_date);
					// 	// store_part_receiving.proxy.setExtraParam('prod_no', prodno);
					// 	// store_part_receiving.proxy.setExtraParam('model', model);
					// 	// store_part_receiving.loadPage(1);

					// 	// store_sched.proxy.setExtraParam('line', line);
					// 	// store_sched.proxy.setExtraParam('model', model);
					// 	// store_sched.proxy.setExtraParam('prod_no', prodno);
					// 	// store_sched.proxy.setExtraParam('serial_no', serial_no);
					// 	// store_sched.proxy.setExtraParam('serial_id', serial_id);
					// 	// store_sched.proxy.setExtraParam('serialcode', serialcode);
					// 	// store_sched.loadPage(1);
						
					// 	// store_output.proxy.setExtraParam('model', model);
					// 	// store_output.proxy.setExtraParam('prod_no', prodno);
					// 	// store_output.proxy.setExtraParam('lot_size', lot_size);
					// 	// store_output.proxy.setExtraParam('st_serial', serial_no);
					// 	// store_output.loadPage(1);
						
					// 	// store_part_insp.proxy.setExtraParam('prod_date', prod_date);
					// 	// store_part_insp.proxy.setExtraParam('prod_no', prodno);
					// 	// store_part_insp.proxy.setExtraParam('model', model);
					// 	// store_part_insp.loadPage(1);
						
					// 	// store_part_mc_issue_ma.proxy.setExtraParam('prod_date', prod_date);
					// 	// store_part_mc_issue_ma.proxy.setExtraParam('model', model);
					// 	// store_part_mc_issue_ma.proxy.setExtraParam('prod_no', prodno);
					// 	// store_part_mc_issue_ma.loadPage(1);
						
					// 	// store_part_mc_issue_mecha.proxy.setExtraParam('prod_date', prod_date);
					// 	// store_part_mc_issue_mecha.proxy.setExtraParam('model', model_mecha);
					// 	// store_part_mc_issue_mecha.proxy.setExtraParam('prod_no', prodno);
					// 	// store_part_mc_issue_mecha.loadPage(1);

					// 	// store_part_smt_picking.proxy.setExtraParam('src_cat', 'fg');
					// 	// store_part_smt_picking.proxy.setExtraParam('prod_date', prod_date);
					// 	// store_part_smt_picking.proxy.setExtraParam('model', model);
					// 	// store_part_smt_picking.proxy.setExtraParam('st_serial', serial_no);
					// 	// store_part_smt_picking.loadPage(1);

					// 	// store_part_smt_install.proxy.setExtraParam('src_cat', 'fg');
					// 	// store_part_smt_install.proxy.setExtraParam('prod_date', prod_date);
					// 	// store_part_smt_install.proxy.setExtraParam('model', model);
					// 	// store_part_smt_install.proxy.setExtraParam('st_serial', serial_no);
					// 	// store_part_smt_install.loadPage(1);

					// 	// store_part_smt_zdbs.proxy.setExtraParam('src_cat', 'fg');
					// 	// store_part_smt_zdbs.proxy.setExtraParam('prod_date', prod_date);
					// 	// store_part_smt_zdbs.proxy.setExtraParam('model', 	model);
					// 	// store_part_smt_zdbs.loadPage(1);
						
					// 	// store_smt_reflow.proxy.setExtraParam('src_cat', 'fg');
					// 	// store_smt_reflow.proxy.setExtraParam('prod_date', prod_date);
					// 	// store_smt_reflow.proxy.setExtraParam('model', 	model);
					// 	// store_smt_reflow.loadPage(1);
						
					// 	// store_smt_quality.proxy.setExtraParam('model', model);
					// 	// store_smt_quality.proxy.setExtraParam('st_serial', serial_no);
					// 	// store_smt_quality.proxy.setExtraParam('serial_no', serial_no);
					// 	// store_smt_quality.proxy.setExtraParam('prod_date', prod_date);
					// 	// store_smt_quality.proxy.setExtraParam('src_cat', 'fg');
					// 	// store_smt_quality.loadPage(1);

					// 	// store_smt_aoi.proxy.setExtraParam('prod_date', prod_date);
					// 	// store_smt_aoi.proxy.setExtraParam('model', 	model);
					// 	// store_smt_aoi.proxy.setExtraParam('src_cat', 'fg');
					// 	// store_smt_aoi.loadPage(1);
						
					// 	// store_ma_qualityreport.proxy.setExtraParam('model', model);
					// 	// store_ma_qualityreport.proxy.setExtraParam('serial_no', serialcode);
					// 	// store_ma_qualityreport.proxy.setExtraParam('src_cat', 'fg');
					// 	// store_ma_qualityreport.loadPage(1);

					// 	// store_mapros_critical.proxy.setExtraParam('model', model);
					// 	// store_mapros_critical.proxy.setExtraParam('serial_no', serialcode);
					// 	// store_mapros_critical.proxy.setExtraParam('boardid', '');
					// 	// store_mapros_critical.loadPage(1);

					// 	//// store_mapros_board.proxy.setExtraParam('model',model);
					// 	//// store_mapros_board.proxy.setExtraParam('prod_date',prod_date);
					// 	//// store_mapros_board.proxy.setExtraParam('prod_no',prod_no);
					// 	//// store_mapros_board.loadPage(1);

					// } else {
					// 	Ext.Msg.alert('Warning', 'No Data Found ! <br> Please try again with the correct Model and Serial Number.');
					// }
				}
			}
		});
	//	=======================================================    GRID         =====================================
		var main_grid = Ext.create('Ext.grid.Panel', {
			id 			: 'main_grid',
			renderTo 	: 'finishGood',
			columnLines	: true,
			maxHeight 	: 382,
			minHeight 	: 150,
			store 		: finishgood_store,
			viewConfig	: {
				stripeRows 			: true,
				emptyText 			: '<div class="empty-txt-main">Click Search / Enter for show this data.</div>',
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
				// {	header       	: 'No', 
				// 	xtype 			: 'rownumberer', 
				// 	componentCls	: 'headergrid',
				// 	width 			: 50, 
				// 	sortable 		: false,
				// 	renderer 		: fontstyle 
				// },
				{ 	header 	  		: 'Serial No ID',
					dataIndex 		: 'serial_no_id',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 		: fontstyle,
					items : Ext.custom.getGridItems('serial_no_id')
				}, 
				{	header 	 		: 'Line',
					dataIndex		: 'line_name',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer 		: fontstyle
				}, 	
				{	header 	  		: 'Prod Date',
					dataIndex 		: 'prod_date',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 		: fontstyle
				}, 
				{	header 	  		: 'Model Name',
					dataIndex 		: 'model_name',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer 		: fontstyle,
					hidden 			: true
				},
				{ 	header 	  		: 'Prod No',
					dataIndex 		: 'prod_no',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer 		: fontstyle
				}, 
				{ 	header 	  		: 'Lot Size',
					dataIndex 		: 'lot_size',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer 		: fontstyle
				},
				{ 	header 	  		: 'Start Serial',
					dataIndex 		: 'start_serial',
					componentCls	: 'headergrid',
					flex 			: false,
					autoSizeColumn 	: true,
					renderer 		: fontstyle
				}, 
				{ 	header 	  		: 'Host IP',
					dataIndex 		: 'host_ip',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					hidden 	  		: true,
					renderer 		: fontstyle
				}, 
				{ 	header 	 		: 'Serial ID',
					dataIndex 		: 'serial_id',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					hidden 	 		: true,
					renderer 		: fontstyle
				}, 
				{ 	header 	 		: 'Mecha Model',
					dataIndex 		: 'mecha_model',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 		: fontstyle
				}, 
				{ 	header 			: 'Mecha Lot',
					dataIndex 		: 'mecha_lot',
					componentCls	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
					renderer 		: fontstyle
				}
			],
			listeners: {
				select: function(grid, rowIndex, colIndex){
					var rec  	 	= this.getSelectionModel().getSelection();
					var catMecha 	= $("#valOfCatMecha").val();
					var model 	 	= rec[0].data.model_name;
					var prodNo 	 	= rec[0].data.prod_no;
					var stSerial 	= rec[0].data.start_serial;
					var lotSize 	= rec[0].data.lot_size;
					var serialID  	= rec[0].data.serial_id;
					var serialNoID 	= rec[0].data.serial_no_id;
					var valLine		= rec[0].data.line_name;
					var valProdDate	= rec[0].data.prod_date;

					Ext.getStore('store_sched').proxy.setExtraParam('model', model);
					Ext.getStore('store_sched').proxy.setExtraParam('prod_no', prodNo);
					Ext.getStore('store_sched').proxy.setExtraParam('st_serial', stSerial);
					Ext.getStore('store_sched').proxy.setExtraParam('lot_size', lotSize);
					Ext.getStore('store_sched').proxy.setExtraParam('serial_id', serialID);
					Ext.getStore('store_sched').proxy.setExtraParam('serial_no_id', serialNoID);
					Ext.getStore('store_sched').loadPage(1);

					Ext.getStore('store_output').proxy.setExtraParam('cat_mecha', catMecha);
					Ext.getStore('store_output').proxy.setExtraParam('model', model);
					Ext.getStore('store_output').proxy.setExtraParam('prod_no', prodNo);
					Ext.getStore('store_output').proxy.setExtraParam('st_serial', stSerial);
					Ext.getStore('store_output').proxy.setExtraParam('lot_size', lotSize);
					Ext.getStore('store_output').loadPage(1);

					Ext.getStore('storeStockcard').proxy.setExtraParam('valmodel', model);
					Ext.getStore('storeStockcard').proxy.setExtraParam('valline', valLine);
					Ext.getStore('storeStockcard').proxy.setExtraParam('vallotno', prodNo);
					Ext.getStore('storeStockcard').proxy.setExtraParam('valserialno', serialNoID);
					Ext.getStore('storeStockcard').loadPage(1);

					Ext.getStore('storeShipmentHold').proxy.setExtraParam('valmodel', model);
					Ext.getStore('storeShipmentHold').proxy.setExtraParam('vallotno', prodNo);
					Ext.getStore('storeShipmentHold').proxy.setExtraParam('valserialno', serialNoID);
					Ext.getStore('storeShipmentHold').loadPage(1);

					Ext.getStore('storeBorrow').proxy.setExtraParam('valmodel', model);
					Ext.getStore('storeBorrow').proxy.setExtraParam('valserialno', serialNoID);
					Ext.getStore('storeBorrow').loadPage(1);

					Ext.getStore('storeScanIN').proxy.setExtraParam('valmodel', model);
					Ext.getStore('storeScanIN').proxy.setExtraParam('valserialno', serialNoID);
					Ext.getStore('storeScanIN').loadPage(1);

					Ext.getStore('storeScanOUT').proxy.setExtraParam('valmodel', model);
					Ext.getStore('storeScanOUT').proxy.setExtraParam('valserialno', serialNoID);
					Ext.getStore('storeScanOUT').loadPage(1);

					Ext.getStore('storeMaprosBoard').proxy.setExtraParam('valmodel', model);
					Ext.getStore('storeMaprosBoard').proxy.setExtraParam('valserialno', serialNoID);
					Ext.getStore('storeMaprosBoard').proxy.setExtraParam('dummySerial', '');

					Ext.getStore('storeMaprosBoardSymptom').proxy.setExtraParam('valmodel', model);
					Ext.getStore('storeMaprosBoardSymptom').proxy.setExtraParam('valserialno', serialNoID);
					Ext.getStore('storeMaprosBoardSymptom').proxy.setExtraParam('dummySerial', '');

					Ext.getStore('storeMaprosPanel').proxy.setExtraParam('valmodel', model);
					Ext.getStore('storeMaprosPanel').proxy.setExtraParam('valserialno', serialNoID);
					Ext.getStore('storeMaprosPanel').proxy.setExtraParam('dummySerial', '');

					Ext.getStore('storeMaprosLCD').proxy.setExtraParam('valmodel', model);
					Ext.getStore('storeMaprosLCD').proxy.setExtraParam('valserialno', serialNoID);
					Ext.getStore('storeMaprosLCD').proxy.setExtraParam('dummySerial', '');

					Ext.getStore('storeMaprosMecha').proxy.setExtraParam('valmodel', model);
					Ext.getStore('storeMaprosMecha').proxy.setExtraParam('valserialno', serialNoID);
					Ext.getStore('storeMaprosMecha').proxy.setExtraParam('dummySerial', '');

					Ext.getStore('storeMaprosMain').proxy.setExtraParam('valmodel', model);
					Ext.getStore('storeMaprosMain').proxy.setExtraParam('valserialno', serialNoID);
					Ext.getStore('storeMaprosMain').proxy.setExtraParam('dummySerial', '');

					Ext.getStore('storeMaprosMainSymptom').proxy.setExtraParam('valmodel', model);
					Ext.getStore('storeMaprosMainSymptom').proxy.setExtraParam('valserialno', serialNoID);
					Ext.getStore('storeMaprosMainSymptom').proxy.setExtraParam('dummySerial', '');

					Ext.getStore('storeMaprosCritical').proxy.setExtraParam('valmodel', model);
					Ext.getStore('storeMaprosCritical').proxy.setExtraParam('valserialno', serialNoID);
					Ext.getStore('storeMaprosCritical').proxy.setExtraParam('dummySerial', '');

					Ext.getStore('storeMaQualityReport').proxy.setExtraParam('valmodel', model);
					Ext.getStore('storeMaQualityReport').proxy.setExtraParam('valserialno', serialNoID);
					
					Ext.getStore('storeMaFwdn').proxy.setExtraParam('valmodel', model);
					Ext.getStore('storeMaFwdn').proxy.setExtraParam('valserialno', serialNoID);
					Ext.getStore('storeMaFwdn').proxy.setExtraParam('dummySerial', '');

					Ext.getStore('storeMaFlash').proxy.setExtraParam('valmodel', model);
					Ext.getStore('storeMaFlash').proxy.setExtraParam('valserialno', serialNoID);
					Ext.getStore('storeMaFlash').proxy.setExtraParam('dummySerial', '');

					Ext.getStore('storeMaLine0').proxy.setExtraParam('valmodel', model);
					Ext.getStore('storeMaLine0').proxy.setExtraParam('valserialno', serialNoID);
					Ext.getStore('storeMaLine0').proxy.setExtraParam('dummySerial', '');

					Ext.getStore('storeMaAvntest').proxy.setExtraParam('valmodel', model);
					Ext.getStore('storeMaAvntest').proxy.setExtraParam('valserialno', serialNoID);
					Ext.getStore('storeMaAvntest').proxy.setExtraParam('dummySerial', '');

					Ext.getStore('storeMaAvmt').proxy.setExtraParam('valmodel', model);
					Ext.getStore('storeMaAvmt').proxy.setExtraParam('valserialno', serialNoID);
					Ext.getStore('storeMaAvmt').proxy.setExtraParam('dummySerial', '');

					Ext.getStore('storeMcReceiving').proxy.setExtraParam('valmodel', model);
					Ext.getStore('storeMcReceiving').proxy.setExtraParam('vallotno', prodNo);
					Ext.getStore('storeMcReceiving').proxy.setExtraParam('valProdDate', valProdDate);
					Ext.getStore('storeMcReceiving').loadPage(1);

					// Ext.getStore('storeMcPartInspection').proxy.setExtraParam('valmodel', model);
					// Ext.getStore('storeMcPartInspection').proxy.setExtraParam('vallotno', prodNo);
					// Ext.getStore('storeMcPartInspection').proxy.setExtraParam('valProdDate', valProdDate);
					// Ext.getStore('storeMcPartInspection').loadPage(1);

					Ext.getStore('storeMcIssueMa').proxy.setExtraParam('valmodel', model);
					Ext.getStore('storeMcIssueMa').proxy.setExtraParam('vallotno', prodNo);
					Ext.getStore('storeMcIssueMa').proxy.setExtraParam('valProdDate', valProdDate);
					Ext.getStore('storeMcIssueMa').loadPage(1);

					Ext.getStore('storeMcIssueMecha').proxy.setExtraParam('valmodel', model);
					Ext.getStore('storeMcIssueMecha').proxy.setExtraParam('vallotno', prodNo);
					Ext.getStore('storeMcIssueMecha').proxy.setExtraParam('valProdDate', valProdDate);
					Ext.getStore('storeMcIssueMecha').loadPage(1);

					Ext.getCmp('serial_avmt').setValue(serialNoID.substr(-8));
					$("#serial_avmt").value = serialNoID.substr(-8);
					console.log (serialNoID.substr(-8));
				}
			},
			bbar	: Ext.create('Ext.PagingToolbar', {
				pageSize		: 8,
				store			: finishgood_store,
				displayInfo		: true,
				listeners 		: {
					afterrender: function (cmp) {
						cmp.getComponent("refresh").hide();
						cmp.getComponent("first").hide();
						cmp.getComponent("last").hide();
					}
				}
			})
		});

	main_grid.getStore().on('load', function() {
        main_grid.getView().stripeRows 			= true;
		main_grid.getView().deferEmptyText 		= false;
		main_grid.getView().enableTextSelection	= true;
        main_grid.getView().emptyText = '<div class="empty-txt2">Data Not Available.</div>';
        main_grid.getView().refresh();
    });

});