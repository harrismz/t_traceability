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
		return '<font class="fontsize12">' + val + '</font>';
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
			
																					
			//	for grid part > im > partnavigation
			//	Traceability model
					Ext.define('model_bigs', {
						extend: 'Ext.data.Model',
						fields: ['schedule_id', 'lot_size', 'model_code', 'prod_no_code', 'side', 'cavity', 'seq_start', 'seq_end', 'line', 'model', 'pwbname', 'pwbno', 'process', 'rev_date', 'qty']
					});
			//	Process Operational
				//SMT DEPARTMENT
					Ext.define('part_smt_picking',{
		                extend: 'Ext.data.Model',
		                fields: ['jobdate','jobtime','line','model_name','pwb_name','start_serial','lot','zfeeder','part_no','demand', 'loose_reel','full_reel','loose_nik','loose_time','full_nik','full_time']
		            });
		            Ext.define('model_part_smt_install',{
		                extend: 'Ext.data.Model',
		                fields: ['jobdate','jobtime','line','model_name','pwb_name','start_serial','lot','zfeeder','part_no','demand', 'install','install_nik','install_time']
		            });
		            Ext.define('model_part_smt_zdbs',{
		                extend: 'Ext.data.Model',
		                fields: ['place', 'mode', 'operatorid', 'feeder', 'compid1', 'compid2', 'compid3', 'compid4', 'compid5', 
		                		'model', 'scandate','ng', 'partno', 'lot', 'qty']
		           	});
					Ext.define('model_smt_reflow',{
		                extend: 'Ext.data.Model',
		                fields: ['board_id', 'scan_date', 'reflow_start_time', 'reflow_end_time']
		           	});
					Ext.define('model_good_smt_aoi_board',{
		                extend: 'Ext.data.Model',
						fields: ['linkedserver', 'pcbid', 'pcbguid', 'componentguid', 'uname', 'barcode', 'stdate',
		                			'enddate','partno','partname','aoijudgment','userjudgment']
		           	});
					Ext.define('model_good_smt_aoi_point',{
						extend: 'Ext.data.Model',
						fields: ['linkedserver', 'pcbid', 'pcbguid', 'componentguid', 'uname', 'barcode', 'stdate',
		                			'enddate','partno','partname','aoijudgment','userjudgment']
		           	});
					Ext.define('model_smt_quality',{
		                extend: 'Ext.data.Model',
		                fields: ['inputid', 'dateid', 'group', 'shift', 'mch', 'model_name', 'start_serial', 
		                			'serial_no', 'lot_no', 'lot_qty', 'pcb_name', 'pwb_no', 'process', 'ai',
		                			'smt','loc','magazineno','ng','boardke','boardqty','pointqty','inputdate']
		            });

				//PCB & MA DEPARTMENT
					Ext.define('model_mapros_board',{
					    extend: 'Ext.data.Model',
		                fields: ['board_id','guid_master','guid_ticket','modelname','lotno','scanner_id','status']
		            })
		
		//	=======================================================    DATASTORE    =====================================

					var store_bigs = Ext.create('Ext.data.Store', {
						model: 'model_bigs',
						proxy: {
							type: 'ajax',
							url: 'json/json_finishgood_smt_bigs.php',
							reader: {
								type: 'json',
								root: 'rows',
								totalProperty: 'totalCount'
							}
						},
						listeners: {
							load: function(store, records) {
								if (records != "") {
									// line 		= store.getAt(0).get('line_name');
									// prod_date 	= store.getAt(0).get('prod_date');
									// model 		= store.getAt(0).get('model_name');
									// model_mecha	= store.getAt(0).get('mecha_model');
									// prodno 		= store.getAt(0).get('prod_no');
									// lot_size 	= store.getAt(0).get('lot_size');
									// serial_no 	= store.getAt(0).get('start_serial');
									// serial_id 	= store.getAt(0).get('serial_id');
									
									// store_part_receiving.proxy.setExtraParam('prod_date', prod_date);
									// store_part_receiving.proxy.setExtraParam('prod_no', prodno);
									// store_part_receiving.proxy.setExtraParam('model', model);
									// store_part_receiving.loadPage(1);

									
								} else {
									Ext.Msg.alert('Warning', 'No Data Found ! <br> Please try again with the correct PCB ID.');
								}
							}
						}
					});
					var store_part_smt_picking = Ext.create('Ext.data.Store',{
						model	: 'part_smt_picking',
						autoLoad: false,
						pageSize: itemperpage,
						proxy   : {
		                    type    : 'ajax',
		                    url     : 'json/json_part_smt_picking.php',
		                    reader  : {
		                        type    : 'json',
		                        root    : 'rows',
		                        totalProperty  : 'totalCount'
		                    }
		                }
					});
					var store_part_smt_install = Ext.create('Ext.data.Store',{
						model	: 'model_part_smt_install',
						autoLoad: false,
						pageSize: itemperpage,
						proxy   : {
		                    type    : 'ajax',
		                    url     : 'json/json_part_smt_install.php',
		                    reader  : {
		                        type    : 'json',
		                        root    : 'rows',
		                        totalProperty  : 'totalCount'
		                    }
		                }
					});
					var store_part_smt_zdbs = Ext.create('Ext.data.Store',{
						model	: 'model_part_smt_zdbs',
						autoLoad: false,
						pageSize: itemperpage,
						proxy   : {
							type    : 'ajax',
							url     : 'json/json_part_smtzdbs.php',
							reader  : {
								type    : 'json',
								root    : 'rows'
							}
						}
					});
					var store_smt_mounter = Ext.create('Ext.data.Store',{
						//model	: 'model_smt_mounter',
						autoLoad: false,
						pageSize: itemperpage,
						proxy   : {
							type    : 'ajax',
							url     : 'json/json_smt_mounter.php',
							reader  : {
								type    : 'json',
								root    : 'rows'
							}
						}
					});
					
					var store_smt_reflow = Ext.create('Ext.data.Store',{
						model	: 'model_smt_reflow',
						autoLoad: false,
						pageSize: itemperpage,
						proxy   : {
							type    : 'ajax',
							url     : 'json/json_smt_reflow.php',
							reader  : {
								type    : 'json',
								root    : 'rows'
							}
						}
					});
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
								root    : 'rows'
							}
						}
					});
					
					var store_smt_quality = Ext.create('Ext.data.Store',{
						model	: 'model_smt_quality',
						autoLoad: false,
						pageSize: itemperpage,
						proxy   : {
							type    : 'ajax',
							url     : 'json/json_smt_quality.php',
							reader  : {
								type    : 'json',
								root    : 'rows'
							}
						}
					});

				//PCB & MA Department
					var store_mapros_board = Ext.create('Ext.data.Store',{
						model	: 'model_mapros_board',
						autoLoad: false,
						pageSize: itemperpage,
						proxy   : {
		                    type    : 'ajax',
		                    url     : 'json/json_mapros_board.php',
		                    reader  : {
		                        type    : 'json',
		                        root    : 'rows',
		                        totalProperty  : 'totalCount'
		                    }
		                }
					});
		//	=======================================================    GRID    ==========================================
			
			//	Traceability Grid SMT
					var grid_bigs = Ext.create('Ext.grid.Panel', {
						id 			: 'grid_bigs',
						columnLines	: true,
						width 		: '100%',
						height 		: '100%',
						store 		: store_bigs,
						viewConfig	: {
							stripeRows: true,
							emptyText: '<div class="empty-txt-main">No data to display.</div>',
							deferEmptyText: false,
							enableTextSelection: true
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
						]
					});
			//	Process Operational
				
				//	SMT DEPARTMENT
					var grid_part_smt_picking = Ext.create('Ext.grid.Panel', {
						id: 'grid_part_smt_picking',
						autoWidth 	: '100%',
						maxHeight	: 295,
						columnLines: true,
						//store: store_part_smt_picking,
						viewConfig: {
							stripeRows: true,
							emptyText: '<div class="empty-txt">No data to display.</div>',
							deferEmptyText: false,
							enableTextSelection: true
						},
						columns: [{
							header: 'Req. Date',
							dataIndex: 'jobdate',
							flex: 1,
							renderer: upsize
						}, {
							header: 'Req. Time',
							dataIndex: 'jobtime',
							flex: 1,
							renderer: upsize
						}, {
							header: 'Line',
							dataIndex: 'line',
							flex: 1,
							renderer: upsize
						}, {
							header: 'Model Name',
							dataIndex: 'model_name',
							flex: 1,
							renderer: upsize,
							hidden: true
						}, {
							header: 'PWB Name',
							dataIndex: 'pwb_name',
							flex: 1,
							renderer: upsize,
							hidden: true
						}, {
							header: 'Start Serial',
							dataIndex: 'start_serial',
							flex: 1,
							renderer: upsize,
							hidden: true
						}, {
							header: 'Lot',
							dataIndex: 'lot',
							flex: 1,
							renderer: upsize,
							hidden: true
						}, {
							header: 'Zfeeder',
							dataIndex: 'zfeeder',
							flex: 1,
							renderer: upsize,
							filter: {
								type: 'string'
							}
						}, {
							header: 'Part Number',
							dataIndex: 'part_no',
							flex: 1,
							renderer: upsize,
							filter: {
								type: 'string'
							}
						}, {
							header: 'Demand Qty',
							dataIndex: 'demand',
							flex: 1,
							renderer: upsize
						}, {
							header: 'Loose Reel',
							dataIndex: 'loose_reel',
							flex: 1,
							renderer: upsize
						}, {
							header: 'Loose NIK',
							dataIndex: 'loose_nik',
							flex: 1,
							renderer: upsize
						}, {
							header: 'Loose Time',
							dataIndex: 'loose_time',
							flex: 1,
							renderer: upsize
						}, {
							header: 'Full Reel',
							dataIndex: 'full_reel',
							flex: 1,
							renderer: upsize
						}, {
							header: 'Full NIK',
							dataIndex: 'full_nik',
							flex: 1,
							renderer: upsize
						}, {
							header: 'Full time',
							dataIndex: 'full_time',
							flex: 1,
							renderer: upsize
						}],
						//features: [filters],
						// selModel: {
						// 	selType: 'cellmodel'
						// },
						// plugins: [cellEditing]
					});
					var grid_part_smt_install = Ext.create('Ext.grid.Panel', {
						id: 'grid_part_smt_install',
						autoWidth 	: '100%',
						maxHeight	: 295,
						columnLines: true,
						//store: store_part_smt_install,
						viewConfig: {
							stripeRows: true,
							emptyText: '<div class="empty-txt">No data to display.</div>',
							deferEmptyText: false,
							enableTextSelection: true
						},
						columns: [{
							header: 'Req. Date',
							dataIndex: 'jobdate',
							flex: 1,
							renderer: upsize
						}, {
							header: 'Req. Time',
							dataIndex: 'jobtime',
							flex: 1,
							renderer: upsize
						}, {
							header: 'Line',
							dataIndex: 'line',
							flex: 1,
							renderer: upsize
						}, {
							header: 'Model Name',
							dataIndex: 'model_name',
							flex: 1,
							renderer: upsize,
							hidden: true
						}, {
							header: 'PWB Name',
							dataIndex: 'pwb_name',
							flex: 1,
							renderer: upsize,
							hidden: true
						}, {
							header: 'Start Serial',
							dataIndex: 'start_serial',
							flex: 1,
							renderer: upsize,
							hidden: true
						}, {
							header: 'Lot',
							dataIndex: 'lot',
							flex: 1,
							renderer: upsize,
							hidden: true
						}, {
							header: 'Zfeeder',
							dataIndex: 'zfeeder',
							flex: 1,
							renderer: upsize,
							filter: {
								type: 'string'
							}
						}, {
							header: 'Part Number',
							dataIndex: 'part_no',
							flex: 1,
							renderer: upsize,
							filter: {
								type: 'string'
							}
						}, {
							header: 'Demand Qty',
							dataIndex: 'demand',
							flex: 1,
							renderer: upsize
						}, {
							header: 'Status',
							dataIndex: 'install',
							flex: 1,
							renderer: upsize
						}, {
							header: 'PIC',
							dataIndex: 'install_nik',
							flex: 1,
							renderer: upsize
						}, {
							header: 'Scan Date',
							dataIndex: 'install_time',
							flex: 1,
							renderer: upsize
						}],
						//features: [filters],
						// selModel: {
						// 	selType: 'cellmodel'
						// },
						// plugins: [cellEditing]
					});
					var grid_part_smt_zdbs = Ext.create('Ext.grid.Panel', {
						id: 'grid_part_smt_zdbs',
						autoWidth 	: '100%',
						maxHeight	: 295,
						columnLines: true,
						//store: store_part_smt_zdbs,
						viewConfig: {
							stripeRows: true,
							emptyText: '<div class="empty-txt">No data to display.</div>',
							deferEmptyText: false,
							enableTextSelection: true
						},
						columns: [{
							header: 'Location',
							dataIndex: 'place',
							flex: 1,
							renderer: upsize
						}, {
							header: 'Mode',
							dataIndex: 'mode',
							flex: 1,
							renderer: mode
						}, {
							header: 'Feeder',
							dataIndex: 'feeder',
							flex: 1,
							renderer: upsize,
							filter: {
								type: 'string'
							}
						}, {
							header: 'Installed Feeder',
							dataIndex: 'compid1',
							flex: 1,
							renderer: upsize,
							filter: {
								type: 'string'
							}
						}, {
							header: 'Replaced Feeder',
							dataIndex: 'compid2',
							flex: 1,
							renderer: upsize,
							filter: {
								type: 'string'
							}
						}, {
							header: 'Model',
							dataIndex: 'model',
							flex: 1,
							renderer: upsize,
							hidden: true
						}, {
							header: 'Part No',
							dataIndex: 'partno',
							flex: 1,
							renderer: upsize,
							filter: {
								type: 'string'
							}
						}, {
							header: 'Lot',
							dataIndex: 'lot',
							flex: 1,
							renderer: upsize,
							hidden: true
						}, {
							header: 'Scan Date',
							dataIndex: 'scandate',
							flex: 1,
							renderer: upsize
						}],
						//features: [filters],
						// selModel: {
						// 	selType: 'cellmodel'
						// }
					});
					var grid_smt_feeder = Ext.create('Ext.grid.Panel', {
						id: 'grid_smt_feeder',
						autoWidth 	: '100%',
						maxHeight	: 295,
						columnLines: true,
						//store: store_part_smt_feeder,
						viewConfig: {
							stripeRows: true,
							emptyText: '<div class="empty-txt">No data to display.</div>',
							deferEmptyText: false,
							enableTextSelection: true
						},
						columns: [{
							header: 'Req. Date',
							dataIndex: 'jobdate',
							flex: 1,
							renderer: upsize
						}, {
							header: 'Req. Time',
							dataIndex: 'jobtime',
							flex: 1,
							renderer: upsize
						}, {
							header: 'Line',
							dataIndex: 'line',
							flex: 1,
							renderer: upsize
						}, {
							header: 'Model Name',
							dataIndex: 'model_name',
							flex: 1,
							renderer: upsize,
							hidden: true
						}, {
							header: 'PWB Name',
							dataIndex: 'pwb_name',
							flex: 1,
							renderer: upsize,
							hidden: true
						}, {
							header: 'Start Serial',
							dataIndex: 'start_serial',
							flex: 1,
							renderer: upsize,
							hidden: true
						}, {
							header: 'Lot',
							dataIndex: 'lot',
							flex: 1,
							renderer: upsize,
							hidden: true
						}, {
							header: 'Zfeeder',
							dataIndex: 'zfeeder',
							flex: 1,
							renderer: upsize,
							filter: {
								type: 'string'
							}
						}, {
							header: 'Part Number',
							dataIndex: 'part_no',
							flex: 1,
							renderer: upsize,
							filter: {
								type: 'string'
							}
						}, {
							header: 'Demand Qty',
							dataIndex: 'demand',
							flex: 1,
							renderer: upsize
						}, {
							header: 'Status',
							dataIndex: 'install',
							flex: 1,
							renderer: upsize
						}, {
							header: 'PIC',
							dataIndex: 'install_nik',
							flex: 1,
							renderer: upsize
						}, {
							header: 'Scan Date',
							dataIndex: 'install_time',
							flex: 1,
							renderer: upsize
						}],
						//features: [filters],
						// selModel: {
						// 	selType: 'cellmodel'
						// },
						// plugins: [cellEditing]
					});
					// var grd_proc_smt_qualityreport = Ext.create('Ext.grid.Panel', {
						// 	id: 'grd_proc_smt_qualityreport',
						// 	autoWidth 	: '100%',
						// 	maxHeight	: 295,
						// 	columnLines: true,
						// 	// store: store_proc_smt_quality,
						// 	viewConfig: {
						// 		stripeRows: true,
						// 		emptyText: '<div class="empty-txt">No data to display.</div>',
						// 		deferEmptyText: false,
						// 		enableTextSelection: true
						// 	},
						// 	columns: [{
						// 		header: 'InputID',
						// 		dataIndex: 'inputid',
						// 		flex: 1,
						// 		locked: true,
						// 		hidden: true
						// 	}, {
						// 		header: 'Date',
						// 		dataIndex: 'dateid',
						// 		width: 80,
						// 		locked: true,
						// 		renderer: Ext.util.Format.dateRenderer('Y-m-d')
						// 	}, {
						// 		header: 'Group',
						// 		dataIndex: 'group',
						// 		width: 50,
						// 		locked: true
						// 	}, {
						// 		header: 'Shift',
						// 		dataIndex: 'shift',
						// 		width: 50,
						// 		locked: true
						// 	}, {
						// 		header: 'Machine Name',
						// 		dataIndex: 'mch',
						// 		width: 60,
						// 		locked: true
						// 	}, {
						// 		header: 'Model Name',
						// 		dataIndex: 'model_name',
						// 		width: 100,
						// 		locked: true
						// 	}, {
						// 		header: 'Start Serial',
						// 		dataIndex: 'start_serial',
						// 		width: 60,
						// 		locked: true
						// 	}, {
						// 		header: 'Start Number',
						// 		dataIndex: 'serial_no',
						// 		width: 100,
						// 		locked: true
						// 	}, {
						// 		header: 'Lot No',
						// 		dataIndex: 'lot_no',
						// 		width: 50,
						// 		locked: true
						// 	}, {
						// 		header: 'Lot Qty',
						// 		dataIndex: 'lot_qty',
						// 		width: 60,
						// 		locked: true
						// 	}, {
						// 		header: 'PCB Name',
						// 		dataIndex: 'pcb_name',
						// 		width: 70,
						// 		locked: true,
						// 		summaryType: 'count'
						// 	}, {
						// 		header: 'PWB No',
						// 		dataIndex: 'pwb_no',
						// 		width: 80,
						// 		locked: true
						// 	}, {
						// 		header: 'Process',
						// 		dataIndex: 'process',
						// 		width: 60,
						// 		locked: true
						// 	}, {
						// 		header: 'AI',
						// 		dataIndex: 'ai',
						// 		width: 100,
						// 		locked: true,
						// 		hidden: true
						// 	}, {
						// 		header: 'Problem/Symptom',
						// 		dataIndex: 'smt',
						// 		width: 150,
						// 		locked: true
						// 	}, {
						// 		header: 'Location',
						// 		dataIndex: 'loc',
						// 		width: 70
						// 	}, {
						// 		header: 'Magazine No',
						// 		dataIndex: 'magazineno',
						// 		width: 100
						// 	}, {
						// 		header: 'NG Found By',
						// 		dataIndex: 'ng',
						// 		width: 100
						// 	}, {
						// 		header: 'Board No',
						// 		dataIndex: 'boardke',
						// 		width: 70
						// 	}, {
						// 		header: 'Board NG Qty',
						// 		dataIndex: 'boardqty',
						// 		width: 100,
						// 		summaryType: 'sum'
						// 	}, {
						// 		header: 'Point NG Qty',
						// 		dataIndex: 'pointqty',
						// 		width: 100,
						// 		summaryType: 'sum'
						// 	}, {
						// 		header: 'Input Date',
						// 		dataIndex: 'inputdate',
						// 		width: 130
						// 	}],
						// 	// features: [{
						// 	// 	ftype: 'filters',
						// 	// 	encode: encode,
						// 	// 	local: local
						// 	// }]
						// });
						// var grd_proc_smt_downtime = Ext.create('Ext.grid.Panel', { //_Z_ Finish good
						// 	id: 'grd_proc_smt_downtime',
						// 	autoWidth 	: '100%',
						// 	maxHeight	: 295,
						// 	columnLines: true,
						// 	// store: store_proc_smt_downtime,
						// 	viewConfig: {
						// 		stripeRows: true,
						// 		emptyText: '<div class="empty-txt">No data to display.</div>',
						// 		deferEmptyText: false,
						// 		enableTextSelection: true
						// 	},
						// 	columns: [{
						// 		header: 'Starting',
						// 		dataIndex: 'date_id',
						// 		flex: 1,
						// 		renderer: upsize
						// 	}, {
						// 		header: 'Duration',
						// 		dataIndex: 'downtime',
						// 		flex: 1,
						// 		renderer: upsize
						// 	}, {
						// 		header: 'Shift',
						// 		dataIndex: 'shift',
						// 		width: 50,
						// 		renderer: upsize
						// 	}, {
						// 		header: 'Machine',
						// 		dataIndex: 'bn',
						// 		flex: 1,
						// 		renderer: upsize
						// 	}, {
						// 		header: 'Model Name',
						// 		dataIndex: 'model_name',
						// 		flex: 1,
						// 		renderer: upsize,
						// 		hidden: true
						// 	}, {
						// 		header: 'PWB',
						// 		dataIndex: 'pwb_name',
						// 		width: 80,
						// 		renderer: upsize
						// 	}, {
						// 		header: 'Process',
						// 		dataIndex: 'process',
						// 		width: 60,
						// 		renderer: upsize
						// 	}, {
						// 		header: 'Start Serial',
						// 		dataIndex: 'start_serial',
						// 		width: 85,
						// 		renderer: upsize,
						// 		hidden: true
						// 	}, {
						// 		header: 'Status',
						// 		dataIndex: 'confirm',
						// 		flex: 1,
						// 		renderer: upsize
						// 	}, {
						// 		header: 'Reason',
						// 		dataIndex: 'reason',
						// 		flex: 1,
						// 		renderer: upsize,
						// 		filter: {
						// 			type: 'string'
						// 		}
						// 	}, {
						// 		header: 'Cause 1',
						// 		dataIndex: 'cause1',
						// 		flex: 1,
						// 		renderer: upsize
						// 	}, {
						// 		header: 'Cause 2',
						// 		dataIndex: 'cause2',
						// 		flex: 1,
						// 		renderer: upsize
						// 	}, {
						// 		header: 'Cause 3',
						// 		dataIndex: 'cause3',
						// 		flex: 1,
						// 		renderer: upsize
						// 	}, {
						// 		header: 'Cause 4',
						// 		dataIndex: 'cause4',
						// 		flex: 1,
						// 		renderer: upsize
						// 	}, ],
						// 	// features: [{
						// 	// 	ftype: 'filters',
						// 	// 	encode: encode,
						// 	// 	local: local
						// 	// }]
						// });
						// var grd_proc_smt_output = Ext.create('Ext.grid.Panel', {
						// 	id: 'grd_proc_smt_output',
						// 	autoWidth 	: '100%',
						// 	maxHeight	: 295,
						// 	columnLines: true,
						// 	// store: store_proc_smt_prodresult,
						// 	viewConfig: {
						// 		stripeRows: true,
						// 		emptyText: '<div class="empty-txt">No data to display.</div>',
						// 		deferEmptyText: false,
						// 		enableTextSelection: true
						// 	},
						// 	columns: [{
						// 		header: 'Prod Date',
						// 		dataIndex: 'prod_date',
						// 		flex: 1,
						// 		renderer: upsize
						// 	}, {
						// 		header: 'First Output',
						// 		dataIndex: 'stime',
						// 		flex: 1,
						// 		renderer: upsize
						// 	}, {
						// 		header: 'Line Name',
						// 		dataIndex: 'line_name',
						// 		flex: 1,
						// 		renderer: upsize
						// 	}, {
						// 		header: 'Shift',
						// 		dataIndex: 'shift',
						// 		flex: 1,
						// 		renderer: upsize
						// 	}, {
						// 		header: 'PWB Name',
						// 		dataIndex: 'pwb',
						// 		flex: 1,
						// 		renderer: upsize
						// 	}, {
						// 		header: 'Process',
						// 		dataIndex: 'process',
						// 		flex: 1,
						// 		renderer: upsize
						// 	}, {
						// 		header: 'Model Name',
						// 		dataIndex: 'model_name',
						// 		flex: 1,
						// 		renderer: upsize,
						// 		hidden: true
						// 	}, {
						// 		header: 'Output',
						// 		dataIndex: 'output',
						// 		flex: 1,
						// 		renderer: upsize
						// 	}]
						// });
					var grid_smt_mounter = Ext.create('Ext.grid.Panel', {
						id: 'grid_smt_mounter',
						autoWidth 	: '100%',
						maxHeight	: 290,
						columnLines : true,
						store 		: store_smt_mounter,
						viewConfig 	: {
							stripeRows 			: true,
							emptyText 			: '<div class="empty-txt">No data to display.</div>',
							deferEmptyText 		: false,
							enableTextSelection : true
						},
						columns 	: [
							{	header 		: 'BOARD ID',
								dataIndex 	: 'board_id',
								flex 		: 1,
								renderer 	: upsize
							}, 
							{ 	header: 'SCAN DATE',
								dataIndex: 'scan_date',
								flex: 1,
								renderer: upsize
							}, 
							{ 	header: 'START TIME',
								dataIndex: 'reflow_start_time',
								flex: 1,
								renderer: upsize
							}, 
							{ 	header: 'END TIME',
								dataIndex: 'reflow_end_time',
								flex: 1,
								renderer: upsize
							}
						],
						//features: [filters],
						// selModel: {
						// 	selType: 'cellmodel'
						// },
						// plugins: [cellEditing]
					});
					var grid_smt_aoi_point = Ext.create('Ext.grid.Panel', {
						id: 'grid_smt_aoi_point',
						autoWidth 	: '100%',
						maxHeight	: 290,
						columnLines: true,
						store: store_good_smt_aoi_point,
						viewConfig: {
							stripeRows: true,
							emptyText: '<div class="empty-txt">No data to display.</div>',
							deferEmptyText: false,
							enableTextSelection: true
						},
						columns: [

						{ 	header: 'SERVER',
							dataIndex: 'linkedserver',
							flex: 1,
							renderer: upsize
						}, 
						{ 	header: 'PCB ID',
							dataIndex: 'pcbid',
							flex: 1,
							renderer: upsize
						}, 
						{ 	header: 'PCB GUID',
							dataIndex: 'pcbguid',
							flex: 1,
							renderer: upsize,
							hidden : true
						}, 
						{ 	header: 'COMPONENT GUID',
							dataIndex: 'componentguid',
							flex: 1,
							renderer: upsize,
							hidden: true
						}, 
						{ 	header: 'UNAME',
							dataIndex: 'uname',
							flex: 1,
							renderer: upsize
						}, 
						{ 	header: 'BARCODE',
							dataIndex: 'barcode',
							flex: 1,
							renderer: upsize
						}, 
						{ 	header: 'START DATE',
							dataIndex: 'stdate',
							flex: 1,
							renderer: upsize
						},
						{ 	header: 'END DATE',
							dataIndex: 'enddate',
							flex: 1,
							renderer: upsize,
							filter: {
								type: 'string'
							}
						}, 
						{ 	header: 'PART NO',
							dataIndex: 'partno',
							flex: 1,
							renderer: upsize,
							filter: {
								type: 'string'
							}
						}, 
						{ 	header: 'PART NAME',
							dataIndex: 'partname',
							flex: 1,
							renderer: upsize
						}, 
						{ 	header: 'AOI JUDGEMENT',
							dataIndex: 'aoijudgment',
							flex: 1,
							renderer: upsize
						}, 
						{ 	header: 'USER JUDGEMENT',
							dataIndex: 'userjudgment',
							flex: 1,
							renderer: upsize
						}],
						//features: [filters],
						// selModel: {
						// 	selType: 'cellmodel'
						// },
						// plugins: [cellEditing]
					});
					var grid_smt_aoi_board = Ext.create('Ext.grid.Panel', {
						id: 'grid_smt_aoi_board',
						autoWidth 	: '100%',
						maxHeight	: 290,
						columnLines: true,
						store: store_good_smt_aoi_board,
						viewConfig: {
							stripeRows: true,
							emptyText: '<div class="empty-txt">No data to display.</div>',
							deferEmptyText: false,
							enableTextSelection: true
						},
						columns: [

						{ 	header: 'SERVER',
							dataIndex: 'linkedserver',
							flex: 1,
							renderer: upsize
						}, 
						{ 	header: 'PCB ID',
							dataIndex: 'pcbid',
							flex: 1,
							renderer: upsize
						}, 
						{ 	header: 'PCB GUID',
							dataIndex: 'pcbguid',
							flex: 1,
							renderer: upsize,
							hidden : true
						}, 
						{ 	header: 'COMPONENT GUID',
							dataIndex: 'componentguid',
							flex: 1,
							renderer: upsize,
							hidden: true
						}, 
						{ 	header: 'UNAME',
							dataIndex: 'uname',
							flex: 1,
							renderer: upsize
						}, 
						{ 	header: 'BARCODE',
							dataIndex: 'barcode',
							flex: 1,
							renderer: upsize
						}, 
						{ 	header: 'START DATE',
							dataIndex: 'stdate',
							flex: 1,
							renderer: upsize
						},
						{ 	header: 'END DATE',
							dataIndex: 'enddate',
							flex: 1,
							renderer: upsize,
							filter: {
								type: 'string'
							}
						}, 
						{ 	header: 'PART NO',
							dataIndex: 'partno',
							flex: 1,
							renderer: upsize,
							filter: {
								type: 'string'
							}
						}, 
						{ 	header: 'PART NAME',
							dataIndex: 'partname',
							flex: 1,
							renderer: upsize
						}, 
						{ 	header: 'AOI JUDGEMENT',
							dataIndex: 'aoijudgment',
							flex: 1,
							renderer: upsize
						}, 
						{ 	header: 'USER JUDGEMENT',
							dataIndex: 'userjudgment',
							flex: 1,
							renderer: upsize
						}],
						//features: [filters],
						// selModel: {
						// 	selType: 'cellmodel'
						// },
						// plugins: [cellEditing]
					});
					var grid_smt_reflow = Ext.create('Ext.grid.Panel', {
						id: 'grid_smt_reflow',
						autoWidth 	: '100%',
						maxHeight	: 290,
						columnLines: true,
						store: store_smt_reflow,
						viewConfig: {
							stripeRows: true,
							emptyText: '<div class="empty-txt">No data to display.</div>',
							deferEmptyText: false,
							enableTextSelection: true
						},
						columns: [{
							header: 'BOARD ID',
							dataIndex: 'board_id',
							flex: 1,
							renderer: upsize
						}, {
							header: 'SCAN DATE',
							dataIndex: 'scan_date',
							flex: 1,
							renderer: upsize
						}, {
							header: 'START TIME',
							dataIndex: 'reflow_start_time',
							flex: 1,
							renderer: upsize
						}, {
							header: 'END TIME',
							dataIndex: 'reflow_end_time',
							flex: 1,
							renderer: upsize
						}],
						//features: [filters],
						// selModel: {
						// 	selType: 'cellmodel'
						// },
						// plugins: [cellEditing]
					});
					var grid_smt_quality = Ext.create('Ext.grid.Panel', {
						id 			: 'grid_smt_quality',
						autoWidth 	: '100%',
						maxHeight	: 295,
						columnLines : true,
						store 		: store_smt_quality,
						viewConfig 	: {
							stripeRows 	 		: true,
							emptyText 			: '<div class="empty-txt">No data to display.</div>',
							deferEmptyText 		: false,
							enableTextSelection : true
						},
						columns 	: [
						{ 	header 		: 'INPUTID',
							dataIndex	: 'inputid',
							flex 		: 1,
							renderer 	: upsize,
							hidden 		: true
						},
						{ 	header 		: 'DATEID',
							dataIndex	: 'dateid',
							flex 		: 1,
							renderer 	: upsize,
							hidden 		: true
						},
						{ 	header 		: 'GROUP',
							dataIndex	: 'group',
							flex 		: 1,
							renderer 	: upsize,
							hidden 		: true
						},
						{ 	header 		: 'SHIFT',
							dataIndex	: 'shift',
							flex 		: 1,
							renderer 	: upsize,
							hidden 		: true
						},
						{ 	header 		: 'MECHA',
							dataIndex	: 'mch',
							flex 		: 1,
							renderer 	: upsize,
							hidden 		: true
						},
						{ 	header 		: 'MODEL NAME',
							dataIndex	: 'model_name',
							flex 		: 1,
							renderer 	: upsize,
							hidden 		: true
						},
						{ 	header 		: 'START SERIAL',
							dataIndex	: 'start_serial',
							flex 		: 1,
							renderer 	: upsize,
							hidden 		: true
						},
						{ 	header 		: 'SERIAL NO',
							dataIndex	: 'serial_no',
							flex 		: 1,
							renderer 	: upsize,
							hidden 		: true
						},
						{ 	header 		: 'LOT NO',
							dataIndex	: 'lot_no',
							flex 		: 1,
							renderer 	: upsize,
							hidden 		: true
						},
						{ 	header 		: 'LOT QTY',
							dataIndex	: 'lot_qty',
							flex 		: 1,
							renderer 	: upsize
						},
						{ 	header 		: 'PCB NAME',
							dataIndex	: 'pcb_name',
							flex 		: 1,
							renderer 	: upsize,
							hidden 		: true
						},
						{ 	header 		: 'PWB NO',
							dataIndex	: 'pwb_no',
							flex 		: 1,
							renderer 	: upsize,
							hidden 		: true
						},
						{ 	header 		: 'PROCESS',
							dataIndex	: 'process',
							flex 		: 1,
							renderer 	: upsize
						},
						{ 	header 		: 'AI',
							dataIndex	: 'ai',
							flex 		: 1,
							renderer 	: upsize,
							hidden 		: true
						},
						{ 	header 		: 'SMT',
							dataIndex	: 'smt',
							flex 		: 1,
							renderer 	: upsize
						},
						{ 	header 		: 'LOC',
							dataIndex	: 'loc',
							flex 		: 1,
							renderer 	: upsize
						},
						{ 	header 		: 'MAGAZINE NO',
							dataIndex	: 'magazineno',
							flex 		: 1,
							renderer 	: upsize,
							hidden 		: true
						},
						{ 	header 		: 'STATUS',
							dataIndex	: 'ng',
							flex 		: 1,
							renderer 	: upsize
						},
						{ 	header 		: 'BOARD TO',
							dataIndex	: 'boardke',
							flex 		: 1,
							renderer 	: upsize,
							hidden 		: true
						},
						{ 	header 		: 'BOARD QTY',
							dataIndex	: 'boardqty',
							flex 		: 1,
							renderer 	: upsize
						},
						{ 	header 		: 'POINT QTY',
							dataIndex	: 'pointqty',
							flex 		: 1,
							renderer 	: upsize
						},
						{ 	header 		: 'DATE',
							dataIndex	: 'inputdate',
							flex 		: 1,
							renderer 	: upsize
						}
						],
						//features: [filters],
						// selModel: {
						// 	selType: 'cellmodel'
						// },
						// plugins: [cellEditing]
					});
					
				//	PCB & MA Department
					var grd_ma_losttime = Ext.create('Ext.grid.Panel', {
					 	id: 'grd_prd_losttime',
					 	autoWidth 	: '100%',
						maxHeight	: 295,
						columnLines: true,
					 	// store: prd_lost_time,
					 	viewConfig: {
					 		stripeRows: true,
					 		emptyText: '<div class="empty-txt">No data to display.</div>',
					 		deferEmptyText: false,
					 		enableTextSelection: true
					 	},
					 	columns: [{
					 		header: 'Date ID',
					 		dataIndex: 'date_id',
					 		width: 120,
					 		renderer: upsize
					 	}, {
					 		header: 'Line Name',
					 		dataIndex: 'line_name',
					 		width: 85,
					 		renderer: upsize
					 	}, {
					 		header: 'Shift',
					 		dataIndex: 'shift',
					 		width: 50,
					 		renderer: upsize
					 	}, {
					 		header: 'Prod No',
					 		dataIndex: 'prod_no',
					 		width: 80,
					 		renderer: upsize
					 	}, {
					 		header: 'Start Time',
					 		dataIndex: 'time_start',
					 		width: 90,
					 		renderer: upsize
					 	}, {
					 		header: 'End Time',
					 		dataIndex: 'time_end',
					 		width: 90,
					 		renderer: upsize
					 	}, {
					 		header: 'Model Name',
					 		dataIndex: 'model_name',
					 		width: 130,
					 		renderer: upsize,
					 		hidden: true
					 	}, {
					 		header: 'Lost Detail',
					 		dataIndex: 'lost_detail',
					 		flex: 1,
					 		renderer: upsize
					 	}, {
					 		header: 'Responsible',
					 		dataIndex: 'responsible',
					 		width: 95,
					 		renderer: upsize
					 	}, {
					 		header: 'Department',
					 		dataIndex: 'dept',
					 		width: 95,
					 		renderer: upsize
					 	}],
					 	/*bbar        : Ext.create('Ext.PagingToolbar',{
					               pageSize    : itemperpage,
					               store       : prd_lost_time,
					               displayInfo : true,
					               plugins     : Ext.create('Ext.ux.ProgressBarPager',{}),
					               listeners   : {
					                   afterrender : function(cmp){
					                       this.getComponent("refresh").hide();
					                   }
					               }
					           })*/
					});
					var grid_ma_pcb = Ext.create('Ext.grid.Panel', {
					 	id: 'grid_ma_pcb',
					 	autoWidth 	: '100%',
						maxHeight	: 295,
						columnLines: true,
					 	store: store_mapros_board,
					 	viewConfig: {
					 		stripeRows: true,
					 		emptyText: '<div class="empty-txt">No data to display.</div>',
					 		deferEmptyText: false,
					 		enableTextSelection: true
					 	},
					 	columns: [{
					 		header: 'Date ID',
					 		dataIndex: 'date_id',
					 		width: 120,
					 		renderer: upsize
					 	}, {
					 		header: 'Line Name',
					 		dataIndex: 'line_name',
					 		width: 85,
					 		renderer: upsize
					 	}, {
					 		header: 'Shift',
					 		dataIndex: 'shift',
					 		width: 50,
					 		renderer: upsize
					 	}, {
					 		header: 'Prod No',
					 		dataIndex: 'prod_no',
					 		width: 80,
					 		renderer: upsize
					 	}, {
					 		header: 'Start Time',
					 		dataIndex: 'time_start',
					 		width: 90,
					 		renderer: upsize
					 	}, {
					 		header: 'End Time',
					 		dataIndex: 'time_end',
					 		width: 90,
					 		renderer: upsize
					 	}, {
					 		header: 'Model Name',
					 		dataIndex: 'model_name',
					 		width: 130,
					 		renderer: upsize,
					 		hidden: true
					 	}, {
					 		header: 'Lost Detail',
					 		dataIndex: 'lost_detail',
					 		flex: 1,
					 		renderer: upsize
					 	}, {
					 		header: 'Responsible',
					 		dataIndex: 'responsible',
					 		width: 95,
					 		renderer: upsize
					 	}, {
					 		header: 'Department',
					 		dataIndex: 'dept',
					 		width: 95,
					 		renderer: upsize
					 	}],
					 	/*bbar        : Ext.create('Ext.PagingToolbar',{
					               pageSize    : itemperpage,
					               store       : prd_lost_time,
					               displayInfo : true,
					               plugins     : Ext.create('Ext.ux.ProgressBarPager',{}),
					               listeners   : {
					                   afterrender : function(cmp){
					                       this.getComponent("refresh").hide();
					                   }
					               }
					           })*/
					});
				
		//	=======================================================    PANEL    =========================================
			
			//	BOARD ID GENERATOR
					var panel_bigs = Ext.create('Ext.panel.Panel', {
						id 				:'finishgood_main',
						renderTo 		: 'panel_bigs',
						width			: '100%',
						height			: 80,
						border			: false,
						frame			: true,
						hidden			: false,
						defaults		: {
							split		: true,
							collapsible	: false
						},
						items			: [grid_bigs]
					});
			//	AOI
					var panel_aoi = Ext.create('Ext.tab.Panel', {
						id 			: 'panel_aoi',
						renderTo 	: 'panel_aoi',
						plain 		: true,
						activeTab 	: 0,
						autoWidth 	: '100%',
						maxHeight	: 300,
						autoScroll 	: true,
						frame 		: true,
						//style 	: 'padding:5px;-background:#157FCC;',
						items 		: [
							{	title 		: 'BOARD',
							 	id  		: 'show_grid_aoi_board',
								reorderable : false,
								items 		: [grid_smt_aoi_board]
							}, 
							{	title 		: 'POINT',
							 	id  		: 'show_grid_aoi_point',
								reorderable	: false,
								items 		: [grid_smt_aoi_point]
							}
						]
					});

					var finishgood_plan   = Ext.create('Ext.panel.Panel', {
						id 				:'finishgood_plan',
						//	renderTo 	: 'finishgood_plan',
						border			: false,
						width			: '100%',
						height			: 150,
						defaults		: {
							split		: true,
							collapsible	: false
						}
						//items			: [schedule]
					});
					var finishgood_actual = Ext.create('Ext.panel.Panel', {
						id 				:'finishgood_actual',
						//	renderTo	: 'finishgood_actual',
						border		: false,
						width			: '100%',
						height		: 150,
						defaults	: {
							split				: true,
							collapsible	: false
						},
						//items			: [outcount],
						// listeners: {
						// 	select: function(selModel, record, index, options) {
						// 		var x = Ext.getCmp('rb2').getValue()['src_cat2'];
						// 		procmaqrep_store.proxy.setExtraParam('model', record.get('model_name'));
						// 		procmaqrep_store.proxy.setExtraParam('line_name', record.get('line_name'));
						// 		procmaqrep_store.proxy.setExtraParam('prod_date', record.get('prod_date'));
						// 		procmaqrep_store.proxy.setExtraParam('src_cat', x);
						// 		procmaqrep_store.loadPage(1);
						// 		procmaltr_store.proxy.setExtraParam('model', record.get('model_name'));
						// 		procmaltr_store.proxy.setExtraParam('line', record.get('line_name'));
						// 		procmaltr_store.proxy.setExtraParam('prod_date', record.get('prod_date'));
						// 		procmaltr_store.proxy.setExtraParam('src_cat', x);
						// 		procmaltr_store.loadPage(1);
						// 		procimprodres_store.proxy.setExtraParam('model', record.get('model_name'));
						// 		procimprodres_store.proxy.setExtraParam('prod_date', record.get('prod_date'));
						// 		procimprodres_store.proxy.setExtraParam('src_cat', x);
						// 		procimprodres_store.loadPage(1);
						// 		procimdownrep_store.proxy.setExtraParam('model', record.get('model_name'));
						// 		procimdownrep_store.proxy.setExtraParam('prod_date', record.get('prod_date'));
						// 		procimdownrep_store.proxy.setExtraParam('src_cat', x);
						// 		procimdownrep_store.loadPage(1);
						// 		procimquality_store.proxy.setExtraParam('model', record.get('model_name')); //_Z_ imquality2nd 20161018
						// 		procimquality_store.proxy.setExtraParam('prod_date', record.get('prod_date')); //_Z_ imquality2nd 20161018
						// 		procimquality_store.proxy.setExtraParam('src_cat', x); //_Z_ imquality2nd 20161018
						// 		procimquality_store.loadPage(1); //_Z_ imquality2nd 20161018
						// 		/*============ problem info ==========*/
						// 		part_problem_mc.proxy.setExtraParam('model', record.get('model_name')); // _Z_ by zaki 20161031
						// 		part_problem_mc.proxy.setExtraParam('prod_date', record.get('prod_date')); //_Z_ imquality2nd 20161018
						// 		part_problem_mc.proxy.setExtraParam('src_cat', x); // _Z_ by zaki 20161031
						// 		part_problem_mc.loadPage(1); // _Z_ by zaki 20161031
						// 		qty_problem_mc.proxy.setExtraParam('model', record.get('model_name')); // _Z_ by zaki 20161031
						// 		qty_problem_mc.proxy.setExtraParam('prod_date', record.get('prod_date')); //_Z_ imquality2nd 20161018
						// 		qty_problem_mc.proxy.setExtraParam('src_cat', x); // _Z_ by zaki 20161031
						// 		qty_problem_mc.loadPage(1); // _Z_ by zaki 20161031
						// 		part_problem_iqc.proxy.setExtraParam('model', record.get('model_name')); // _Z_ by zaki 20161031
						// 		part_problem_iqc.proxy.setExtraParam('prod_date', record.get('prod_date')); //_Z_ imquality2nd 20161018
						// 		part_problem_iqc.proxy.setExtraParam('src_cat', x); // _Z_ by zaki 20161031
						// 		part_problem_iqc.loadPage(1); // _Z_ by zaki 20161031
						// 		qty_problem_iqc.proxy.setExtraParam('model', record.get('model_name')); // _Z_ by zaki 20161031
						// 		qty_problem_iqc.proxy.setExtraParam('prod_date', record.get('prod_date')); //_Z_ imquality2nd 20161018
						// 		qty_problem_iqc.proxy.setExtraParam('src_cat', x); // _Z_ by zaki 20161031
						// 		qty_problem_iqc.loadPage(1); // _Z_ by zaki 20161031
						// 		part_problem_ma.proxy.setExtraParam('model', record.get('model_name')); // _Z_ by zaki 20161031
						// 		part_problem_ma.proxy.setExtraParam('prod_date', record.get('prod_date')); //_Z_ imquality2nd 20161018
						// 		part_problem_ma.proxy.setExtraParam('src_cat', x); // _Z_ by zaki 20161031
						// 		part_problem_ma.loadPage(1); // _Z_ by zaki 20161031
						// 		qty_problem_ma.proxy.setExtraParam('model', record.get('model_name')); // _Z_ by zaki 20161031
						// 		qty_problem_ma.proxy.setExtraParam('prod_date', record.get('prod_date')); //_Z_ imquality2nd 20161018
						// 		qty_problem_ma.proxy.setExtraParam('src_cat', x); // _Z_ by zaki 20161031
						// 		qty_problem_ma.loadPage(1); // _Z_ by zaki 20161031
						// 		part_problem_mecha.proxy.setExtraParam('model', record.get('model_name')); // _Z_ by zaki 20161031
						// 		part_problem_mecha.proxy.setExtraParam('prod_date', record.get('prod_date')); //_Z_ imquality2nd 20161018
						// 		part_problem_mecha.proxy.setExtraParam('src_cat', x); // _Z_ by zaki 20161031
						// 		part_problem_mecha.loadPage(1); // _Z_ by zaki 20161031
						// 		qty_problem_mecha.proxy.setExtraParam('model', record.get('model_name')); // _Z_ by zaki 20161031
						// 		qty_problem_mecha.proxy.setExtraParam('prod_date', record.get('prod_date')); //_Z_ imquality2nd 20161018
						// 		qty_problem_mecha.proxy.setExtraParam('src_cat', x); // _Z_ by zaki 20161031
						// 		qty_problem_mecha.loadPage(1); // _Z_ by zaki 20161031
						// 		/*============ problem info ==========*/
						// 		partimoutset_store.proxy.setExtraParam('model', record.get('model_name'));
						// 		partimoutset_store.proxy.setExtraParam('prod_date', record.get('prod_date'));
						// 		partimoutset_store.proxy.setExtraParam('src_cat', x);
						// 		partimoutset_store.loadPage(1);
						// 		partimnav_store.proxy.setExtraParam('model', record.get('model_name'));
						// 		partimnav_store.proxy.setExtraParam('prod_date', record.get('prod_date'));
						// 		partimnav_store.proxy.setExtraParam('src_cat', x);
						// 		partimnav_store.loadPage(1);
						// 		fg_scanin_store.proxy.setExtraParam('model', record.get('model_name'));
						// 		fg_scanin_store.proxy.setExtraParam('prod_no', Ext.getCmp('fld_prod_no').getValue());
						// 		fg_scanin_store.proxy.setExtraParam('src_cat', x);
						// 		fg_scanin_store.loadPage(1);
						// 		fg_scanout_store.proxy.setExtraParam('model', record.get('model_name'));
						// 		fg_scanout_store.proxy.setExtraParam('prod_no', Ext.getCmp('fld_prod_no').getValue());
						// 		fg_scanout_store.proxy.setExtraParam('src_cat', x);
						// 		fg_scanout_store.loadPage(1);
						// 		part_fgsum_store.proxy.setExtraParam('model', record.get('model_name'));
						// 		part_fgsum_store.loadPage(1);
						// 		//how to get parameter prod_no ???
						// 	}
						// }
					});
			//	Process Operational
				//	SMT DEPARTMENT
					var part_smt = Ext.create('Ext.tab.Panel', {
						id 			: 'part_smt',
						//	renderTo 	: 'finishgood_part_smt',
						plain 		: true,
						activeTab 	: 0,
						autoWidth 	: '100%',
						maxHeight	: 300,
						autoScroll 	: true,
						frame 		: true,
						//style 	: 'padding:5px;-background:#157FCC;',
						items 		: [
							{	title 		: 'PICKING PART',
							 	id  		: 'show_grid_pickingpart',
								reorderable : false,
								items 		: [grid_part_smt_picking]
							}, 
							{	title 		: 'INSTALL PART',
							 	id  		: 'show_grid_installpart',
								reorderable	: false,
								items 		: [grid_part_smt_install]
							}, 
							{	title	 	: 'SMT ZDBS',
								id  		: 'show_grid_imzdbs',
								reorderable : false,
								items		: [grid_part_smt_zdbs]
							}, 
							{	title 		: 'FEEDER SCANNING',
							 	id  		: 'show_grid_feeder',
								reorderable : false,
								items 		: [grid_smt_feeder]
							},
							{	title 		: 'CRITICAL SCANNING',
							 	id  		: 'show_grid_critical',
								reorderable : false,
								//items	 	: [grid_smt_critical]
							},
							{	title 		: 'REFLOW',
							 	id  		: 'show_grid_reflow',
								reorderable : false,
								items	 	: [grid_smt_reflow]
							},
							{	title 		: 'MOUNTER',
							 	id  		: 'show_grid_mounter',
								reorderable : false,
								items 		: [grid_smt_mounter]
							},
							{	title 		: 'AOI',
							 	id  		: 'show_grid_aoi',
								reorderable : false,
							//	items 		: [grid_smt_aoi]
							}, 
							{	title 		: 'QUALITY REPORT',
							 	id  		: 'show_grid_quality',
								reorderable : false,
								items 		: [grid_smt_quality]
							}, 
							// {	id : 'show_grid_checkingpart',
							// 	title: 'Checking Part',
							// 	reorderable: false,
							// 	items: [grid_part_smt_zdbs]
							// }, 
							// { 	id : 'show_grid_replacepart',
							// 	title: 'Replace Part',
							// 	reorderable: false,
							// 	//items: [grid_part_smt_repalce]
							// }, 
							// { 	id : 'show_grid_smt_boardid',
							// 	title: 'Board ID Marking / laser',
							// 	reorderable: false,
							// 	//items: [grid_part_smt_repalce]
							// }, 
							// { 	id : 'show_grid_smt_oee',
							// 	title: 'OEE / OCS',
							// 	reorderable: false,
							// 	//items: [grid_part_smt_repalce]
							// }, 
							// { 	id : 'show_grid_machdowntime',
							// 	title: 'Machine Downtime',
							// 	reorderable: false,
							// 	items: [grd_proc_smt_downtime]
							// }, 
							// { 	id : 'show_grid_proc_smt_output',
							// 	title: 'Production Result',
							// 	reorderable: false,
							// 	items: [grd_proc_smt_output]
							// }
						]
					});

				//	PCB & MA Department
					var part_ma = Ext.create('Ext.tab.Panel', {
						id  		: 'part_ma',
						//	renderTo 	: 'finishgood_part_ma_pcb',
						plain 		: true,
						activeTab 	: 0,
						autoWidth 	: '100%',
						maxHeight	: 295,
						autoScroll 	: true,
						frame 		: true,
						style 		: 'padding:5px;-background:#157FCC;',
						items 		: [
							{	title 		: 'PCB BOARD ID SCANNING',
							 	id  	 	: 'show_grid_pcb_boardid',
								reorderable : false,
								items 		: [grid_ma_pcb]
							},
							{	title 		: 'PANEL SCANNING',
							 	id  		: 'show_grid_ma_panel',
								reorderable : false,
								//items 		: [grid_ma_panel]
							},
							{	title 		: 'MASTER SCANNING',
							 	id  		: 'show_grid_ma_master',
								reorderable : false,
								//items 		: [grid_ma_master]
							},
							{	title 		: 'CRITICAL SCANNING',
							 	id  		: 'show_grid_ma_critical',
								reorderable : false,
								//items 		: [grid_ma_master]
							},
							{	title 		: 'QUALITY REPORT',
							 	id  		: 'show_grid_ma_quality',
								reorderable : false,
								//items 	: [grid_ma_quality]
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
						value:  	'00013IA000010015',
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
									var smtdate = Ext.getCmp('smt_date').getValue();

									if (!boardid) {
										Ext.Msg.alert('Warning', 'PCB ID cannot be null !!!');
									} 
									else {
										store_bigs.proxy.setExtraParam('boardid', boardid);
										store_bigs.proxy.setExtraParam('smt_date', smtdate);
										store_bigs.loadPage(1);
										
										store_good_smt_aoi_board.proxy.setExtraParam('boardid', boardid);
										store_good_smt_aoi_board.proxy.setExtraParam('smt_date', smtdate);
										store_good_smt_aoi_board.loadPage(1);
										
										store_good_smt_aoi_point.proxy.setExtraParam('boardid', boardid);
										store_good_smt_aoi_point.proxy.setExtraParam('smt_date', smtdate);
										store_good_smt_aoi_point.loadPage(1);
										
									}
								}
							}
						}
				});
				Ext.create('Ext.form.field.Date',{
					//renderTo 	: src_reflow_date,
					width 		: '100%',
					id 			: 'smt_date',
					name 		: 'smt_date',
					fieldCls	: 'biggertext',
					emptyText	: 'Search Date',
					margins		: '0 6 0 0',
					height 		: 30,
					flex		: 1,
					format		: 'd F Y',
					submitFormat: 'Y-m-d',
					mode		: 'local',  
					value 		: new Date(),
					editable 	: false,
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
						        return me;
							},
							specialkey : function(field, e) {
								if (e.getKey() == 13) {
									var reflow_date = Ext.getCmp('src_reflow_date').getValue();
									
									if (!reflow_date) {
										Ext.Msg.alert('Warning', 'Reflow date cannot be null !!!');
									} else {
										
										store_smt_reflow.proxy.setExtraParam('src_cat', 'fg');
										store_smt_reflow.proxy.setExtraParam('prod_date', reflow_date);
										store_smt_reflow.proxy.setExtraParam('model', 'nomodel');
										store_smt_reflow.loadPage(1);
									}
								}
							}
						}
				});
		//	==** end **==

	});


