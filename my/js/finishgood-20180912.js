<script type="text/javascript">
	Ext.Loader.setConfig({ enabled: true });
	// Ext.Loader.setPath('Ext.ux','../extjs-4.2.2/examples/ux/');
	Ext.Loader.setPath('Ext.ux', '../framework/extjs-6.2.0/packages/ux/classic/src');
	Ext.Loader.setPath('Ext.ajax', '../framework/extjs-6.2.0/packages/ux/src');
	// Ext.require(['Ext.selection.CellModel', 'Ext.ux.grid.FiltersFeature', 'Ext.ux.ajax.JsonSimlet', 'Ext.ux.ajax.SimManager']);

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
		return '<font class="upsize">' + val + '</font>';
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

		// ==========================================================================    VARIABLE    =======================================
		// setup the state provider, all state information will be saved to a cookie
		// Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
		// configure whether filter query is encoded or not (initially)
		var encode = false;

		// configure whether filtering is performed locally or remotely (initially)
		var local = true;
		Ext.QuickTips.init();

		//	end function untuk column bigsize
		var itemperpage = 10;
		var date = new Date();
		//	=============================================================================    MODEL    ======================================
			//	Traceability model
					Ext.define('main_data', {
						extend: 'Ext.data.Model',
						fields: ['line_name', 'prod_date', 'host_ip', 'model_name', 'prod_no', 'lot_size', 'start_serial', 'serial_no_id', 'serial_id', 'mecha_model', 'mecha_lot']
					});
			//	Plan Model
					Ext.define('model_sched', {
						extend: 'Ext.data.Model',
						fields: ['prod_date', 'line_name', 'model_name', 'prod_no', 'lot_size', 'start_serial', 'serial_id']
					});
			//	Actual Model
					Ext.define('model_output', {
						extend: 'Ext.data.Model',
						fields: ['prod_date', 'line_name', 'model_name', 'shift', 'output', 'stime']
					});

			//	Part Handling Model
				//Receiving Part
					Ext.define('model_rcvpart', {
						extend: 'Ext.data.Model',
						fields: ['userid', 'supp', 'inv', 'part', 'po', 'qty', 'rcvdate', 'custom', 'category', 'sendflag', 'lot_out', 'pr_name']
					});
				//Part Inspection
					Ext.define('model_part_insp', {
						extend: 'Ext.data.Model',
						fields: ['noid', 'deliv_date', 'tbslppartno', 'partname', 'supplier', 'suppcode', 'inspect_level', 'pic', 'shift', 'qty_sampling', 'qty_rejection', 'do', 'bc', 'po', 'qty_delivery', 'lot_out', 'pr_name', 'time_finish', 'fld_remark', 'sflag']
					});
				//Part Issuing
					Ext.define('part_mc_issue_ma', {
						extend: 'Ext.data.Model',
						fields: ['issdate', 'partno', 'partname', 'scanqty', 'po', 'model_name', 'lot', 'line', 'so', 'reqqty']
					});
					// Ext.define('part_mc_issue_mecha', {
					// 	extend: 'Ext.data.Model',
					// 	//fields: ['so', 'partno', 'partname', 'po', 'reqqty', 'scanqty', 'lot', 'line', 'model_name', 'issdate']
					// 	fields: ['issdate', 'partno', 'partname', 'scanqty', 'po', 'model_name', 'lot', 'line', 'so', 'reqqty']
					// });
			//	---   END OF Part Handling Model  ---

			//	Process Operational
				//SMT DEPARTMENT
					// Ext.define('m_part_smt_prep', {
					// 	extend: 'Ext.data.Model',
					// 	fields: ['jobdate', 'jobtime', 'line', 'model_name', 'pwb_name', 'start_serial', 'lot', 'zfeeder', 'part_no', 'demand']
					// });
					// Ext.define('m_part_smt_zdbs', {
					// 	extend: 'Ext.data.Model',
					// 	fields: ['place', 'mode', 'feeder', 'compid1', 'compid2', 'model', 'scandate', 'partno', 'lot']
					// });
					// Ext.define('m_proc_smt_output', {
					// 	extend: 'Ext.data.Model',
					// 	fields: ['prod_date', 'line_name', 'model_name', 'pwb', 'process', 'shift', 'output', 'stime']
					// });
					// Ext.define('m_proc_smt_downtime', {
					// 	extend: 'Ext.data.Model',
					// 	fields: ['id', 'line_name', 'date_id', 'e_date_id', 'duration', 'downtime', 'shift', 'confirm', 'err_code', 'bn', 'model_name', 'pwb_name', 'process', 'start_serial', 'reason', 'cause1', 'cause2', 'cause3', 'cause4']
					// });
					// Ext.define('m_proc_smt_quality', {
					// 	extend: 'Ext.data.Model',
					// 	fields: ['inputid', 'dateid', 'group', 'shift', 'mch', 'model_name', 'start_serial', 'serial_no', 'lot_no', 'lot_qty', 'pcb_name', 'pwb_no', 'process', 'ai', 'smt', 'loc', 'ng', 'magazineno', 'boardke', 'boardqty', 'pointqty', 'inputdate']
					// });

				//PCB & MA DEPARTMENT
					// Ext.define('prd_res_data', {
					// 	extend: 'Ext.data.Model',
					// 	fields: ['tgl', 'bln', 'thn', 'date', 'line_name', 'shift', 'model_name', 'lot', 'prod_no', 'st_serial', 'serial_output', 'symptom', 'def_cause', 'p_disposal', 'responsible']
					// });
					// Ext.define('prd_lost_time', {
					// 	extend: 'Ext.data.Model',
					// 	fields: ['date_id', 'line_name', 'model_name', 'lost_detail', 'responsible', 'prod_no', 'time_start', 'time_end', 'shift', 'dept']
					// });

			 	//Mecha DEPARTMENT
					// Ext.define('mecha_lost_time', {
					//  extend: 'Ext.data.Model',
					//  fields: ['date_id', 'line_name', 'model_name', 'lost_detail', 'responsible', 'prod_no', 'time_start', 'time_end', 'shift', 'dept']
					// });
					// Ext.define('mecha_res_data', {
					//  extend: 'Ext.data.Model',
					//  fields: ['tgl', 'bln', 'thn', 'date', 'line_name', 'shift', 'model_name', 'lot', 'prod_no', 'st_serial', 'serial_output', 'symptom', 'def_cause', 'p_disposal', 'responsible']
					// });
					// Ext.define('mecha_output', {
					//  extend: 'Ext.data.Model',
					//  fields: ['prod_date', 'line_name', 'model_name', 'shift', 'output', 'stime']
					// });
			//	---   END OF Part Handling Model  ---

			//	Outgoing Quality Control
					// Ext.define('part_mchcal', {
					// 	extend: 'Ext.data.Model',
					// 	fields: ['symptom', 'probcause', 'model', 'line', 'shift', 'part_no', 'part_name', 'supplier', 'rejectqty', 'filepicture', 'corrmethod', 'mp', 'duration', 'total', 'actionsupp', 'status', 'remark', 'action_user', 'input_date', 'vw_inputdate', 'id']
					// });
					// Ext.define('part_mchnism', {
					// 	extend: 'Ext.data.Model',
					// 	fields: ['symptom', 'probcause', 'model', 'line', 'shift', 'part_no', 'part_name', 'supplier', 'rejectqty', 'filepicture', 'corrmethod', 'mp', 'duration', 'total', 'actionsupp', 'status', 'remark', 'action_user', 'input_date', 'vw_inputdate', 'id']
					// });
					// Ext.define('part_mchtronics', {
					// 	extend: 'Ext.data.Model',
					// 	fields: ['symptom', 'probcause', 'model', 'line', 'shift', 'part_no', 'part_name', 'supplier', 'rejectqty', 'filepicture', 'corrmethod', 'mp', 'duration', 'total', 'actionsupp', 'status', 'remark', 'action_user', 'input_date', 'vw_inputdate', 'id']
					// });

			//	Finished Goods
					// Ext.define('model_stockcard',{
					// 	extend:'Ext.data.Model',
					// 	fields:[ 'idstockcard', 'model', 'lotno', 'line', 'startsn', 'endsn', 'qty', 'remark', 'status', 'input_user', 'input_date', 'update_user', 'update_date' ]
					// });
					// Ext.define('model_shipmenthold',{
					// 	extend:'Ext.data.Model',
					// 	fields:[ 'idshipmenthold', 'model', 'lotno', 'problem', 'status', 'startsn', 'endsn', 'remark', 'qtyrequest', 'qtywh', 'qtyshipout', 'qtyhold', 'input_user', 'input_date', 'update_user', 'update_date' ]
					// });
					// Ext.define('model_scanin',{
					// 	extend:'Ext.data.Model',
					// 	fields:[ 'idnumber', 'model', 'serial', 'lotno', 'status', 'input_user', 'input_date', 'update_user', 'update_date' ]
					// });


					// // Ext.define('model_scanin', {
					// // 	extend: 'Ext.data.Model',
					// // 	fields: ['model_name', 'serialno_id', 'start_serial', 'scandate', 'inputdate', 'updatedate']
					// // });
					// Ext.define('model_scanout', {
					// 	extend: 'Ext.data.Model',
					// 	fields: ['model_name', 'serialno_id', 'scandate', 'inputdate', 'updatedate']
					// });
					// Ext.define('fgsum_model', {
					// 	extend: 'Ext.data.Model',
					// 	fields: ['model_name', 'allstock', 'tmpstock', 'tmpstock_sc', 'readystock', 'holdstock']
					// });

			//	Problem Information
					// Ext.define('part_problem_mc', {
					// 	extend: 'Ext.data.Model',
					// 	fields: ['id_part', 'line', 'shift', 'prod_date', 'div', 'dept', 'model_name', 'lotno', 'part_name', 'partno', 'shortage_qty', 'supplier_name', 'id_resp', 'resp', 'comment', 'paging', 'line_from', 'read_status', 'input_userid', 'input_nik', 'id_condition', 'condition']
					// });
					// Ext.define('qty_problem_mc', {
					// 	extend: 'Ext.data.Model',
					// 	fields: ['id_quality', 'prod_date', 'div', 'dept', 'line', 'shift', 'model', 'lot_no', 'id_symptom', 'symptom', 'id_defcause', 'defcause', 'reject', 'id_resp', 'read_status', 'input_userid', 'input_nik', 'id_condition', 'condition']
					// });
					// Ext.define('part_problem_iqc', {
					// 	extend: 'Ext.data.Model',
					// 	fields: ['id_part', 'line', 'shift', 'prod_date', 'div', 'dept', 'model_name', 'lotno', 'part_name', 'partno', 'shortage_qty', 'supplier_name', 'id_resp', 'resp', 'comment', 'paging', 'line_from', 'read_status', 'input_userid', 'input_nik', 'id_condition', 'condition']
					// });
					// Ext.define('qty_problem_iqc', {
					// 	extend: 'Ext.data.Model',
					// 	fields: ['id_quality', 'prod_date', 'div', 'dept', 'line', 'shift', 'model', 'lot_no', 'id_symptom', 'symptom', 'id_defcause', 'defcause', 'reject', 'id_resp', 'read_status', 'input_userid', 'input_nik', 'id_condition', 'condition']
					// });
					// Ext.define('part_problem_ma', {
					// 	extend: 'Ext.data.Model',
					// 	fields: ['id_part', 'line', 'shift', 'prod_date', 'div', 'dept', 'model_name', 'lotno', 'part_name', 'partno', 'shortage_qty', 'supplier_name', 'id_resp', 'resp', 'comment', 'paging', 'line_from', 'read_status', 'input_userid', 'input_nik', 'id_condition', 'condition']
					// });
					// Ext.define('qty_problem_ma', {
					// 	extend: 'Ext.data.Model',
					// 	fields: ['id_quality', 'prod_date', 'div', 'dept', 'line', 'shift', 'model', 'lot_no', 'id_symptom', 'symptom', 'id_defcause', 'defcause', 'reject', 'id_resp', 'read_status', 'input_userid', 'input_nik', 'id_condition', 'condition']
					// });
					// Ext.define('part_problem_mecha', {
					// 	extend: 'Ext.data.Model',
					// 	fields: ['id_part', 'line', 'shift', 'prod_date', 'div', 'dept', 'model_name', 'lotno', 'part_name', 'partno', 'shortage_qty', 'supplier_name', 'id_resp', 'resp', 'comment', 'paging', 'line_from', 'read_status', 'input_userid', 'input_nik', 'id_condition', 'condition']
					// });
					// Ext.define('qty_problem_mecha', {
					// 	extend: 'Ext.data.Model',
					// 	fields: ['id_quality', 'prod_date', 'div', 'dept', 'line', 'shift', 'model', 'lot_no', 'id_symptom', 'symptom', 'id_defcause', 'defcause', 'reject', 'id_resp', 'read_status', 'input_userid', 'input_nik', 'id_condition', 'condition']
					// });

		//	=========================================================================    DATASTORE    =====================================

			//	Traceability model
				var main_store = Ext.create('Ext.data.Store', {
					model: 'main_data',
					//autoLoad: false,
					//pageSize: itemperpage,
					proxy: {
						type: 'ajax',
						url: 'json/json_main.php',
						reader: {
							type: 'json',
							root: 'rows',
							totalProperty: 'totalCount'
						}
					},
					listeners: {
						load: function(store, records) {
							if (records != "") {
								 var line = store.getAt(0).get('line_name');
								 var prod_date = store.getAt(0).get('prod_date');
								 var model = store.getAt(0).get('model_name');
								 var prodno = store.getAt(0).get('prod_no');
								 var lot_size = store.getAt(0).get('lot_size');
								 var serial_no = store.getAt(0).get('start_serial');
								 var serial_id = store.getAt(0).get('serial_id');
								// var serialno_id = store.getAt(0).get('serial_no_id');
								// var mecha_model = store.getAt(0).get('mecha_model');
								// var mecha_lot = store.getAt(0).get('mecha_lot');
								store_sched.proxy.setExtraParam('line', line);
								store_sched.proxy.setExtraParam('model', model);
								store_sched.proxy.setExtraParam('prod_no', prodno);
								store_sched.proxy.setExtraParam('serial_no', serial_no);
								store_sched.proxy.setExtraParam('serial_id', serial_id);
								store_sched.loadPage(1);
								store_output.proxy.setExtraParam('model', model);
								store_output.proxy.setExtraParam('prod_no', prodno);
								store_output.proxy.setExtraParam('lot_size', lot_size);
								store_output.proxy.setExtraParam('st_serial', serial_no);
								store_output.loadPage(1);
								store_part_receiving.proxy.setExtraParam('prod_date', prod_date);
								store_part_receiving.proxy.setExtraParam('prod_no', prodno);
								store_part_receiving.proxy.setExtraParam('model', model);
								store_part_receiving.loadPage(1);
								store_part_insp.proxy.setExtraParam('prod_date', prod_date);
								store_part_insp.proxy.setExtraParam('prod_no', prodno);
								store_part_insp.proxy.setExtraParam('model', model);
								store_part_insp.loadPage(1);
								store_part_mc_issue_ma.proxy.setExtraParam('prod_date', prod_date);
								store_part_mc_issue_ma.proxy.setExtraParam('model', model);
								store_part_mc_issue_ma.proxy.setExtraParam('prod_no', prodno);
								store_part_mc_issue_ma.loadPage(1);
								// prd_lost_time.proxy.setExtraParam('prod_date', prod_date);
								// prd_lost_time.proxy.setExtraParam('line', line);
								// prd_lost_time.loadPage(1);
								// mecha_res_store.proxy.setExtraParam('mecha_model', mecha_model);
								// mecha_res_store.proxy.setExtraParam('mecha_lot', mecha_lot);
								// mecha_res_store.loadPage(1);
								// mecha_lost_time.proxy.setExtraParam('prod_date', prod_date);
								// mecha_output.proxy.setExtraParam('mecha_model', mecha_model);
								// mecha_output.proxy.setExtraParam('mecha_lot', mecha_lot);
								// mecha_output.loadPage(1);
								// store_proc_smt_output.proxy.setExtraParam('model', model);
								// store_proc_smt_output.proxy.setExtraParam('prod_no', prodno);
								// store_proc_smt_output.proxy.setExtraParam('lot_size', lot_size);
								// store_proc_smt_output.proxy.setExtraParam('st_serial', serial_no);
								// store_proc_smt_output.proxy.setExtraParam('prod_date', prod_date);
								// store_proc_smt_output.loadPage(1);
								// store_proc_smt_downtime.proxy.setExtraParam('prod_date', prod_date);
								// store_proc_smt_downtime.proxy.setExtraParam('model', model);
								// store_proc_smt_downtime.proxy.setExtraParam('st_serial', serial_no);
								// store_proc_smt_downtime.loadPage(1);
								// store_proc_smt_quality.proxy.setExtraParam('prod_date', prod_date);
								// store_proc_smt_quality.proxy.setExtraParam('model', model);
								// store_proc_smt_quality.proxy.setExtraParam('st_serial', serial_no);
								// store_proc_smt_quality.loadPage(1);
								// store_part_smt_prep.proxy.setExtraParam('prod_date', prod_date);
								// store_part_smt_prep.proxy.setExtraParam('model', model);
								// store_part_smt_prep.proxy.setExtraParam('st_serial', serial_no);
								// store_part_smt_prep.loadPage(1);
								// part_mchcal.proxy.setExtraParam('prod_date', prod_date);
								// part_mchcal.proxy.setExtraParam('model', model);
								// part_mchcal.loadPage(1);
								// part_mchnism.proxy.setExtraParam('prod_date', prod_date);
								// part_mchnism.proxy.setExtraParam('model', model);
								// part_mchnism.loadPage(1);
								// part_mchtronics.proxy.setExtraParam('prod_date', prod_date);
								// part_mchtronics.proxy.setExtraParam('model', model);
								// part_mchtronics.loadPage(1);
								// store_part_smt_zdbs.proxy.setExtraParam('prod_date', prod_date);
								// store_part_smt_zdbs.proxy.setExtraParam('model', model);
								// store_part_smt_zdbs.loadPage(1);
								// store_part_mc_issue_mecha.proxy.setExtraParam('prod_date', prod_date);
								// store_part_mc_issue_mecha.proxy.setExtraParam('model', model);
								// store_part_mc_issue_mecha.proxy.setExtraParam('prod_no', prodno);
								// store_part_mc_issue_mecha.loadPage(1);

								// scanin_store.proxy.setExtraParam('model', model);
								// scanin_store.proxy.setExtraParam('prod_no', prodno);
								// scanin_store.proxy.setExtraParam('serialno_id', serialno_id);
								// scanin_store.loadPage(1);
								// scanout_store.proxy.setExtraParam('model', model);
								// scanout_store.proxy.setExtraParam('prod_no', prodno);
								// scanout_store.proxy.setExtraParam('serialno_id', serialno_id);
								// scanout_store.loadPage(1);
								// fgsum_store.proxy.setExtraParam('model', model);
								// fgsum_store.loadPage(1);
							} else {
								Ext.Msg.alert('Warning', 'No Data Found ! <br> Please try again with the correct Model and Serial Number.');
							}
						}
					}
				});

			//	Plan Model
				var store_sched = Ext.create('Ext.data.Store', {
					model: 'model_sched',
					autoLoad: false,
					//pageSize: itemperpage,
					proxy: {
						type: 'ajax',
						url: 'json/json_sched.php',
						reader: {
							type: 'json',
							root: 'rows',
							totalProperty: 'totalCount'
						}
					}
				});

			//	Actual Model
				var store_output = Ext.create('Ext.data.Store', {
					model: 'model_output',
					autoLoad: false,
					//pageSize: itemperpage,
					//groupField: 'line_name',
					proxy: {
						type: 'ajax',
						url: 'json/json_output.php',
						reader: {
							type: 'json',
							root: 'rows',
							totalProperty: 'totalCount'
						}
					}
				});

			//	Part Handling Model
				//Receiving Part
				var store_part_receiving = Ext.create('Ext.data.Store', {
					model: 'model_rcvpart',
					autoLoad: false,
					pageSize: itemperpage,
					//groupField	: 'partno',
					proxy: {
						type: 'ajax',
						url: 'json/json_part_receive.php',
						reader: {
							type: 'json',
							root: 'rows',
							totalProperty: 'totalCount'
						}
					}
				});

				//Part Inspection
				var store_part_insp = Ext.create('Ext.data.Store', {
					model: 'model_part_insp',
					autoLoad: false,
					pageSize: itemperpage,
					//groupField	: 'partno',
					proxy: {
						type: 'ajax',
						url: 'json/json_part_insp.php',
						reader: {
							type: 'json',
							root: 'rows',
							totalProperty: 'totalCount'
						}
					}
				});

				//Part Issuing
				var store_part_mc_issue_ma = Ext.create('Ext.data.Store', {
					model: 'part_mc_issue_ma',
					autoLoad: false,
					pageSize: itemperpage,
					//groupField	: 'partno',
					proxy: {
						type: 'ajax',
						url: 'json/json_part_mcis_ma.php',
						reader: {
							type: 'json',
							root: 'rows',
							totalProperty: 'totalCount'
						}
					}
				});
				// var store_part_mc_issue_mecha = Ext.create('Ext.data.Store', {
				// 	model: 'part_mc_issue_mecha',
				// 	autoLoad: false,
				// 	pageSize: itemperpage,
				// 	//groupField	: 'partno',
				// 	proxy: {
				// 		type: 'ajax',
				// 		url: 'json/json_part_mcis_mecha.php',
				// 		reader: {
				// 			type: 'json',
				// 			root: 'rows',
				// 			totalProperty: 'totalCount'
				// 		}
				// 	}
				// });
			//	---   END OF Part Handling Model  ---

			//	Process Operational
			 	//SMT DEPARTMENT
				  // var store_part_smt_prep = Ext.create('Ext.data.Store', {
					//  	model: 'm_part_smt_prep',
					//  	autoLoad: false,
					//  	pageSize: itemperpage,
					//  	proxy: {
					//  		type: 'ajax',
					//  		url: 'json/json_part_smt_prep.php',
					//  		reader: {
					//  			type: 'json',
					//  			root: 'rows',
					//  			totalProperty: 'totalCount'
					//  		}
					//  	}
					// });
				 	// var store_part_smt_zdbs = Ext.create('Ext.data.Store', {
					//  	model: 'm_part_smt_zdbs',
					//  	autoLoad: false,
					//  	pageSize: itemperpage,
					//  	proxy: {
					//  		type: 'ajax',
					//  		url: 'json/json_part_im_zdbs.php',
					//  		reader: {
					//  			type: 'json',
					//  			root: 'rows',
					//  			totalProperty: 'totalCount'
					//  		}
					//  	}
					//  });
					// var store_proc_smt_output = Ext.create('Ext.data.Store', {
					// 	model: 'm_proc_smt_output',
					// 	autoLoad: false,
					// 	pageSize: itemperpage,
					// 	proxy: {
					// 		type: 'ajax',
					// 		url: 'json/json_smt_output.php',
					// 		reader: {
					// 			type: 'json',
					// 			root: 'rows',
					// 			totalProperty: 'totalCount'
					// 		}
					// 	}
					// });
					// var store_proc_smt_downtime = Ext.create('Ext.data.Store', {
					// 	model: 'm_proc_smt_downtime',
					// 	autoLoad: false,
					// 	pageSize: itemperpage,
					// 	proxy: {
					// 		type: 'ajax',
					// 		url: 'json/json_im_downtime.php',
					// 		reader: {
					// 			type: 'json',
					// 			root: 'rows',
					// 			totalProperty: 'totalCount'
					// 		}
					// 	}
					// });
					// var store_proc_smt_quality = Ext.create('Ext.data.Store', {
					// 	model: 'm_proc_smt_quality',
					// 	autoLoad: false,
					// 	proxy: {
					// 		type: 'ajax',
					// 		url: 'json/json_im_quality.php',
					// 		reader: {
					// 			type: 'json',
					// 			root: 'rows',
					// 			totalProperty: 'totalCount'
					// 		}
					// 	}
					// });
					//
					// var prd_res_store = Ext.create('Ext.data.Store', {
					// 	model: 'prd_res_data',
					// 	autoLoad: false,
					// 	pageSize: itemperpage,
					// 	proxy: {
					// 		type: 'ajax',
					// 		url: 'json/json_prd_res.php',
					// 		reader: {
					// 			type: 'json',
					// 			root: 'rows',
					// 			totalProperty: 'totalCount'
					// 		}
					// 	}
					// });
					// var prd_lost_time = Ext.create('Ext.data.Store', {
					// 	model: 'prd_lost_time',
					// 	autoLoad: false,
					// 	//buffered: true,
					// 	//purgePageCount		: 0,
					// 	pageSize: itemperpage,
					// 	//leadingBufferZone	: itemperpage,
					// 	proxy: {
					// 		type: 'ajax',
					// 		url: 'json/json_prd_losttime.php',
					// 		reader: {
					// 			type: 'json',
					// 			root: 'rows',
					// 			totalProperty: 'totalCount'
					// 		}
					// 	}
					// });
					// var mecha_res_store = Ext.create('Ext.data.Store', {
					// 	model: 'mecha_res_data',
					// 	autoLoad: false,
					// 	pageSize: itemperpage,
					// 	proxy: {
					// 		type: 'ajax',
					// 		url: 'json/json_mecha_res.php',
					// 		reader: {
					// 			type: 'json',
					// 			root: 'rows',
					// 			totalProperty: 'totalCount'
					// 		}
					// 	},
					// 	listeners: {
					// 		load: function(store, records) {
					// 			//var mecha_model = store.getAt(0).get('model_name');
					// 			var mecha_prodno = store.getAt(0).get('prod_no');
					// 			//mecha_lost_time.proxy.setExtraParam('model', mecha_model);
					// 			mecha_lost_time.proxy.setExtraParam('prod_no', mecha_prodno);
					// 			mecha_lost_time.loadPage(1);
					// 		}
					// 	}
					// });
					// var mecha_lost_time = Ext.create('Ext.data.Store', {
					// 	model: 'mecha_lost_time',
					// 	autoLoad: false,
					// 	pageSize: itemperpage,
					// 	proxy: {
					// 		type: 'ajax',
					// 		url: 'json/json_mecha_losttime.php',
					// 		reader: {
					// 			type: 'json',
					// 			root: 'rows',
					// 			totalProperty: 'totalCount'
					// 		}
					// 	}
					// });
					// var mecha_output = Ext.create('Ext.data.Store', {
					// 	model: 'mecha_output',
					// 	autoLoad: false,
					// 	pageSize: itemperpage,
					// 	proxy: {
					// 		type: 'ajax',
					// 		url: 'json/json_mecha_out.php',
					// 		reader: {
					// 			type: 'json',
					// 			root: 'rows',
					// 			totalProperty: 'totalCount'
					// 		}
					// 	}
					// });
					// var scanin_store = Ext.create('Ext.data.Store', {
					// 	model: 'model_scanin',
					// 	autoLoad: false,
					// 	pageSize: itemperpage,
					// 	proxy: {
					// 		type: 'ajax',
					// 		url: 'json/json_scanin.php',
					// 		reader: {
					// 			type: 'json',
					// 			root: 'rows',
					// 			totalProperty: 'totalCount'
					// 		}
					// 	}
					// });
					// var scanout_store = Ext.create('Ext.data.Store', {
					// 	model: 'model_scanout',
					// 	autoLoad: false,
					// 	pageSize: itemperpage,
					// 	proxy: {
					// 		type: 'ajax',
					// 		url: 'json/json_scanout.php',
					// 		reader: {
					// 			type: 'json',
					// 			root: 'rows',
					// 			totalProperty: 'totalCount'
					// 		}
					// 	}
					// });
					// var fgsum_store = Ext.create('Ext.data.Store', {
					// 	model: 'fgsum_model',
					// 	autoLoad: false,
					// 	pageSize: itemperpage,
					// 	proxy: {
					// 		type: 'ajax',
					// 		url: 'json/json_fgsummary.php',
					// 		reader: {
					// 			type: 'json',
					// 			root: 'rows',
					// 			totalProperty: 'totalCount'
					// 		}
					// 	}
					// });
					// var part_mchcal = Ext.create('Ext.data.Store', {
					// 	model: 'part_mchcal',
					// 	autoLoad: false,
					// 	//pageSize: itemperpage,
					// 	proxy: {
					// 		type: 'ajax',
					// 		url: 'json/json_part_mechanical.php',
					// 		reader: {
					// 			type: 'json',
					// 			root: 'rows',
					// 			//    totalProperty  : 'totalCount'
					// 		}
					// 	}
					// });
					// var part_mchnism = Ext.create('Ext.data.Store', {
					// 	model: 'part_mchnism',
					// 	autoLoad: false,
					// 	//pageSize: itemperpage,
					// 	proxy: {
					// 		type: 'ajax',
					// 		url: 'json/json_part_mechanism.php',
					// 		reader: {
					// 			type: 'json',
					// 			root: 'rows',
					// 			//    totalProperty  : 'totalCount'
					// 		}
					// 	}
					// });
					// var part_mchtronics = Ext.create('Ext.data.Store', {
					// 	model: 'part_mchtronics',
					// 	autoLoad: false,
					// 	//pageSize: itemperpage,
					// 	proxy: {
					// 		type: 'ajax',
					// 		url: 'json/json_part_mechatronics.php',
					// 		reader: {
					// 			type: 'json',
					// 			root: 'rows',
					// 			//    totalProperty  : 'totalCount'
					// 		}
					// 	}
					// });
					// var part_problem_mc = Ext.create('Ext.data.Store', {
					// 	model: 'part_problem_mc',
					// 	autoLoad: false,
					// 	proxy: {
					// 		type: 'ajax',
					// 		url: 'json/json_part_problem_mc.php',
					// 		reader: {
					// 			type: 'json',
					// 			root: 'rows'
					// 		}
					// 	}
					// });
					// var qty_problem_mc = Ext.create('Ext.data.Store', {
					// 	model: 'qty_problem_mc',
					// 	autoLoad: false,
					// 	proxy: {
					// 		type: 'ajax',
					// 		url: 'json/json_qty_problem_mc.php',
					// 		reader: {
					// 			type: 'json',
					// 			root: 'rows'
					// 		}
					// 	}
					// });
					// var part_problem_iqc = Ext.create('Ext.data.Store', {
					// 	model: 'part_problem_iqc',
					// 	autoLoad: false,
					// 	proxy: {
					// 		type: 'ajax',
					// 		url: 'json/json_part_problem_iqc.php',
					// 		reader: {
					// 			type: 'json',
					// 			root: 'rows'
					// 		}
					// 	}
					// });
					// var qty_problem_iqc = Ext.create('Ext.data.Store', {
					// 	model: 'qty_problem_iqc',
					// 	autoLoad: false,
					// 	proxy: {
					// 		type: 'ajax',
					// 		url: 'json/json_qty_problem_iqc.php',
					// 		reader: {
					// 			type: 'json',
					// 			root: 'rows'
					// 		}
					// 	}
					// });
					// var part_problem_ma = Ext.create('Ext.data.Store', {
					// 	model: 'part_problem_ma',
					// 	autoLoad: false,
					// 	proxy: {
					// 		type: 'ajax',
					// 		url: 'json/json_part_problem_ma.php',
					// 		reader: {
					// 			type: 'json',
					// 			root: 'rows'
					// 		}
					// 	}
					// });
					// var qty_problem_ma = Ext.create('Ext.data.Store', {
					// 	model: 'qty_problem_ma',
					// 	autoLoad: false,
					// 	proxy: {
					// 		type: 'ajax',
					// 		url: 'json/json_qty_problem_ma.php',
					// 		reader: {
					// 			type: 'json',
					// 			root: 'rows'
					// 		}
					// 	}
					// });
					// var part_problem_mecha = Ext.create('Ext.data.Store', {
					// 	model: 'part_problem_mecha',
					// 	autoLoad: false,
					// 	proxy: {
					// 		type: 'ajax',
					// 		url: 'json/json_part_problem_mecha.php',
					// 		reader: {
					// 			type: 'json',
					// 			root: 'rows'
					// 		}
					// 	}
					// });
					// var qty_problem_mecha = Ext.create('Ext.data.Store', {
					// 	model: 'qty_problem_mecha',
					// 	autoLoad: false,
					// 	proxy: {
					// 		type: 'ajax',
					// 		url: 'json/json_qty_problem_mecha.php',
					// 		reader: {
					// 			type: 'json',
					// 			root: 'rows'
					// 		}
					// 	}
					// });
					// // var rcv_partiss = Ext.create('Ext.data.Store', {
					// // 	autoDestroy: true,
					// // 	model: 'rcv_partiss',
					// // 	autoLoad: false,
					// // 	pageSize: 20,
					// // 	proxy: {
					// // 		type: 'ajax',
					// // 		url: 'json/json_part_issue.php',
					// // 		reader: {
					// // 			type: 'json',
					// // 			root: 'rows',
					// // 			totalProperty: 'totalCount'
					// // 		}
					// // 	}
					// // });
					// var sglprt_output_store = Ext.create('Ext.data.Store', {
					// 	model: 'output_data',
					// 	autoLoad: false,
					// 	pageSize: itemperpage,
					// 	proxy: {
					// 		type: 'ajax',
					// 		url: 'json/json_output.php',
					// 		reader: {
					// 			type: 'json',
					// 			root: 'rows',
					// 			totalProperty: 'totalCount'
					// 		}
					// 	}
					// });
					//
					// // var partimoutset_store = Ext.create('Ext.data.Store', {
					// // 	model: 'part_im',
					// // 	autoLoad: false,
					// // 	pageSize: itemperpage,
					// // 	proxy: {
					// // 		type: 'ajax',
					// // 		url: 'json/json_part_im.php',
					// // 		reader: {
					// // 			type: 'json',
					// // 			root: 'rows',
					// // 			totalProperty: 'totalCount'
					// // 		}
					// // 	}
					// // });
					// // var partimnav_store = Ext.create('Ext.data.Store', {
					// // 	model: 'part_im_zdbs',
					// // 	autoLoad: false,
					// // 	pageSize: itemperpage,
					// // 	proxy: {
					// // 		type: 'ajax',
					// // 		url: 'json/json_part_im_zdbs.php',
					// // 		reader: {
					// // 			type: 'json',
					// // 			root: 'rows',
					// // 			totalProperty: 'totalCount'
					// // 		}
					// // 	}
					// // });
					// var store_proc_smt_prodresult = Ext.create('Ext.data.Store', {
					// 	model: 'm_proc_smt_output',
					// 	autoLoad: false,
					// 	pageSize: itemperpage,
					// 	proxy: {
					// 		type: 'ajax',
					// 		url: 'json/json_smt_output.php',
					// 		reader: {
					// 			type: 'json',
					// 			root: 'rows',
					// 			totalProperty: 'totalCount'
					// 		}
					// 	}
					// });
					// var procimdownrep_store = Ext.create('Ext.data.Store', {
					// 	model: 'm_proc_smt_downtime',
					// 	autoLoad: false,
					// 	pageSize: itemperpage,
					// 	proxy: {
					// 		type: 'ajax',
					// 		url: 'json/json_im_downtime.php',
					// 		reader: {
					// 			type: 'json',
					// 			root: 'rows',
					// 			totalProperty: 'totalCount'
					// 		}
					// 	}
					// });
					// var procimquality_store = Ext.create('Ext.data.Store', {
					// 	model: 'm_proc_smt_quality',
					// 	autoLoad: false,
					// 	pageSize: itemperpage,
					// 	proxy: {
					// 		type: 'ajax',
					// 		url: 'json/json_im_quality.php',
					// 		reader: {
					// 			type: 'json',
					// 			root: 'rows',
					// 			totalProperty: 'totalCount'
					// 		}
					// 	}
					// });
					// var procmaqrep_store = Ext.create('Ext.data.Store', {
					// 	model: 'prd_res_data',
					// 	autoLoad: false,
					// 	pageSize: itemperpage,
					// 	proxy: {
					// 		type: 'ajax',
					// 		url: 'json/json_prd_res.php',
					// 		reader: {
					// 			type: 'json',
					// 			root: 'rows',
					// 			totalProperty: 'totalCount'
					// 		}
					// 	}
					// });
					// var procmaltr_store = Ext.create('Ext.data.Store', {
					// 	model: 'prd_lost_time',
					// 	autoLoad: false,
					// 	pageSize: itemperpage,
					// 	proxy: {
					// 		type: 'ajax',
					// 		url: 'json/json_prd_losttime.php',
					// 		reader: {
					// 			type: 'json',
					// 			root: 'rows',
					// 			totalProperty: 'totalCount'
					// 		}
					// 	}
					// });
					// var fg_scanin_store = Ext.create('Ext.data.Store', {
					// 	model: 'model_scanin',
					// 	autoLoad: false,
					// 	pageSize: itemperpage,
					// 	proxy: {
					// 		type: 'ajax',
					// 		url: 'json/json_scanin.php',
					// 		reader: {
					// 			type: 'json',
					// 			root: 'rows',
					// 			totalProperty: 'totalCount'
					// 		}
					// 	}
					// });
					// var fg_scanout_store = Ext.create('Ext.data.Store', {
					// 	model: 'model_scanout',
					// 	autoLoad: false,
					// 	pageSize: itemperpage,
					// 	proxy: {
					// 		type: 'ajax',
					// 		url: 'json/json_scanout.php',
					// 		reader: {
					// 			type: 'json',
					// 			root: 'rows',
					// 			totalProperty: 'totalCount'
					// 		}
					// 	}
					// });
					// var part_fgsum_store = Ext.create('Ext.data.Store', {
					// 		model: 'fgsum_model',
					// 		autoLoad: false,
					// 		pageSize: itemperpage,
					// 		proxy: {
					// 			type: 'ajax',
					// 			url: 'json/json_fgsummary.php',
					// 			reader: {
					// 				type: 'json',
					// 				root: 'rows',
					// 				totalProperty: 'totalCount'
					// 			}
					// 		}
					// 	});

			// Finished goods
					// var store_log_stockcard = Ext.create('Ext.data.JsonStore', {
					// 	model       : 'model_stockcard',
					// 	autoLoad    : true,
					// 	//pageSize    : itemperpage,
					// 	proxy		: {
					// 		type	: 'ajax',
					// 		url		: 'json/json_stockcard.php',
					// 		extraParams: {
					// 			 valstdate: Ext.Date.format(new Date(date.getFullYear(), date.getMonth(), 1), 'Ymd'),
					// 			 valendate: Ext.Date.format(new Date(), 'Ymd')
					// 		},
					// 		reader	: {
					// 			type			: 'json',
					// 			root			: 'rows'
					// 		}
					// 	}
					// });
					// var store_log_shipmenthold = Ext.create('Ext.data.JsonStore', {
					// 	model       : 'model_shipmenthold',
					// 	autoLoad    : true,
					// 	pageSize    : itemperpage,
					// 	proxy		: {
					// 		type	: 'ajax',
					// 		url		: 'json/json_shipmenthold.php',
					// 		extraParams: {
					// 			valstdate: Ext.Date.format(new Date(date.getFullYear(), date.getMonth(), 1), 'Ymd'),
					// 			valendate: Ext.Date.format(new Date(), 'Ymd')
					// 		},
					// 		reader	: {
					// 			type			: 'json',
					// 			root			: 'rows',
					// 			totalProperty	: 'totalcount'
					// 		}
					// 	}
					// });
					// var store_log_scanin = Ext.create('Ext.data.JsonStore', {
					// 	model       : 'model_scanin',
					// 	autoLoad    : true,
					// 	pageSize    : itemperpage,
					// 	proxy		: {
					// 		type	: 'ajax',
					// 		url		: 'json/json_scanin.php',
					// 		reader	: {
					// 			type			: 'json',
					// 			root			: 'rows',
					// 			totalProperty	: 'totalcount'
					// 		}
					// 	}
					// });

		//	==============================================================================    GRID    ===================================
			//	Traceability Grid
				var main_grid = Ext.create('Ext.grid.Panel', {
					id: 'main_grid',
					columnLines: true,
					width: '100%',
					height: '100%',
					store: main_store,
					viewConfig: {
						stripeRows: true,
						emptyText: '<div class="empty-txt-main">No data to display.</div>',
						deferEmptyText: false,
						enableTextSelection: true
					},
					columns: [{
						header: 'Line',
						dataIndex: 'line_name',
						width: 55,
						renderer: upsize
					}, {
						header: 'Prod Date',
						dataIndex: 'prod_date',
						flex: 1,
						renderer: upsize
					}, {
						header: 'Model Name',
						dataIndex: 'model_name',
						flex: 1,
						renderer: upsize
					}, {
						header: 'Prod No',
						dataIndex: 'prod_no',
						width: 65,
						renderer: upsize
					}, {
						header: 'Lot Size',
						dataIndex: 'lot_size',
						width: 65,
						renderer: upsize
					}, {
						header: 'Start Serial',
						dataIndex: 'start_serial',
						width: 90,
						renderer: upsize
					}, {
						header: 'Serial No ID',
						dataIndex: 'serial_no_id',
						flex: 1,
						renderer: upsize
					}, {
						header: 'Host IP',
						dataIndex: 'host_ip',
						flex: 1,
						hidden: true
					}, {
						header: 'Serial ID',
						dataIndex: 'serial_id',
						flex: 1,
						hidden: true
					}, {
						header: 'Mecha Model',
						dataIndex: 'mecha_model',
						flex: 1,
						renderer: upsize
					}, {
						header: 'Mecha Lot',
						dataIndex: 'mecha_lot',
						flex: 1,
						renderer: upsize
					}]
				});
			//	Plan & Actual Grid
					var schedule = Ext.create('Ext.grid.Panel', {
						id:'schedule',
						width: '100%',
						height: '100%',
						store: store_sched,
						viewConfig: {
							stripeRows: true,
							emptyText: '<div class="empty-txt-main">No data to display.</div>',
							deferEmptyText: false,
							enableTextSelection: true
						},
						columns: [
							{ header: 'Prod Date',
								dataIndex: 'prod_date',
								flex: 1,
								renderer: upsize
							},
							{	header: 'Line',
								dataIndex: 'line_name',
								width: 70,
								renderer: upsize
							},
							{ header: 'Model Name',
								dataIndex: 'model_name',
								flex: 1,
								renderer: upsize,
								hidden: true
							},
							{ header: 'Prod No',
								dataIndex: 'prod_no',
								width: 90,
								renderer: upsize,
								hidden: true
							},
							{ header: 'Lot Size',
								dataIndex: 'lot_size',
								width: 80,
								renderer: upsize
							},
							{ header: 'Start Serial',
								dataIndex: 'start_serial',
								flex: 1,
								renderer: upsize
							}
						]
					});
					var outcount = Ext.create('Ext.grid.Panel', {
						id:'outcount',
						width: '100%',
						height: '100%',
						store: store_output,
						viewConfig: {
							stripeRows: true,
							emptyText: '<div class="empty-txt-main">No data to display.</div>',
							deferEmptyText: false,
							enableTextSelection: true
						},
						columns: [
							{ header: 'Prod Date',
								dataIndex: 'prod_date',
								flex: 1,
								renderer: upsize,
								summaryRenderer: function() {
									return 'Output :'
								}
							},
							{ header: 'First Output',
								dataIndex: 'stime',
								flex: 1,
								renderer: upsize
							},
							{	header: 'Line',
								dataIndex: 'line_name',
								flex: 1,
								renderer: upsize
							},
							{ header: 'Model Name',
								dataIndex: 'model_name',
								flex: 1,
								renderer: upsize,
								hidden: true
							},
							{ header: 'Shift',
								dataIndex: 'shift',
								flex: 1,
								renderer: upsize
							},
							{ header: 'Output',
								dataIndex: 'output',
								flex: 1,
								renderer: upsize,
								summaryType: 'sum'
							}
						],
						features: [
							{
								id: 'linegroup',
								ftype: 'groupingsummary',
								//groupHeaderTpl	: 'Line {name}',
								//startCollapsed	: true
								//hideGroupedHeader: true,
								//enableGroupingMenu: false
							}
						]
					});

		//	=============================================================================    PANEL    ==========================
			//	Traceability Panel
					var induk_finishgood = Ext.create('Ext.panel.Panel', {
						id 				:'finishgood_main',
						renderTo 	: 'maindata',
						border		: false,
						width			: '100%',
						height		: 80,
						frame			: true,
						hidden		: false,
						defaults	: {
							split				: true,
							collapsible	: false
						},
						items			: [main_grid]
					});
			//	Plan & Actual Panel
					var finishgood_plan 	= Ext.create('Ext.panel.Panel', {
						id 				:'finishgood_plan',
						renderTo 	: 'finishgood_plan',
						border		: false,
						width			: '100%',
						height		: 150,
						defaults	: {
							split				: true,
							collapsible	: false
						},
						items			: [schedule]
					});
					var finishgood_actual = Ext.create('Ext.panel.Panel', {
						id 				:'finishgood_actual',
						renderTo	: 'finishgood_actual',
						border		: false,
						width			: '100%',
						height		: 150,
						defaults	: {
							split				: true,
							collapsible	: false
						},
						items			: [outcount],
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

			//	Part Handling
				//Receiving Part
					var grid_part_receiving = Ext.create('Ext.grid.Panel', {
						id					: 'grid_part_receiving',
						width 				: '100%',
						height 				: '100%',
						//height			: 295,
						columnLines	: true,
						store				: store_part_receiving,
						viewConfig	: {
							stripeRows					: true,
							emptyText						: '<div class="empty-txt">No data to display.</div>',
							deferEmptyText			: false,
							enableTextSelection	: true
						},
						columns			: [
							{ header: 'rcvdate', dataIndex: 'rcvdate', flex: 1, renderer: upsize },
							{ header: 'supp', dataIndex: 'supp', flex: 1, renderer: upsize },
							{ header: 'Part Number', dataIndex: 'part', flex: 1, renderer: upsize,
								filter: {
									type: 'string',
									dataIndex: 'partno'
								}
							},
							{ header: 'po', dataIndex: 'po', flex: 1, renderer: upsize },
							{ header: 'qty', dataIndex: 'qty', flex: 1, renderer: upsize },
							{ header: 'userid', dataIndex: 'userid', flex: 1, renderer: upsize },
							{ header: 'custom', dataIndex: 'custom', flex: 1, renderer: upsize },
							{ header: 'category', dataIndex: 'category', flex: 1, renderer: upsize },
							{ header: 'sendflag', dataIndex: 'sendflag', flex: 1, renderer: upsize },
							{ header: 'lot_out', dataIndex: 'lot_out', flex: 1, renderer: upsize },
							{ header: 'pr_name', dataIndex: 'pr_name', flex: 1, renderer: upsize }
						],
					});
					var finishgood_part_receiving = Ext.create('Ext.panel.Panel', {
						id 				: 'finishgood_part_receiving',
						renderTo 	: 'finishgood_receivingpart',
						border		: false,
						width			: '100%',
						height		: 295,
						defaults	: {
							split				: true,
							collapsible	: false
						},
						items			: [grid_part_receiving]
					});

				//Part Inspection
					var grid_part_insp = Ext.create('Ext.grid.Panel', {
						id					: 'grid_part_insp',
						width 				: '100%',
						height 				: '100%',
						//height			: 295,
						columnLines	: true,
						 store			: store_part_insp,
						viewConfig	: {
							stripeRows					: true,
							emptyText						: '<div class="empty-txt">No data to display.</div>',
							deferEmptyText			: false,
							enableTextSelection	: true
						},
						columns			: [
						{ header: 'noid', dataIndex: 'noid', minwidth:10, renderer: upsize, hidden:true },
						{ header: 'deliv_date', dataIndex: 'deliv_date', flex: 1, renderer: upsize },
						{ header: 'Part Number', dataIndex: 'partno', flex: 1, renderer: upsize,
							filter: {
								type: 'string',
								dataIndex: 'partno'
							}
						},
						{ header: 'Part Name', dataIndex: 'partname', flex: 1, renderer: upsize, hidden:true },
					  { header: 'supplier', dataIndex: 'supplier', flex: 1, renderer: upsize,  hidden:true },
						{ header: 'suppcode', dataIndex: 'suppcode', flex: 1, renderer: upsize },
						{ header: 'inspect level', dataIndex: 'inspect_level', flex: 1, hidden:true },
						{ header: 'pic', dataIndex: 'pic', flex: 1, renderer: upsize },
						{ header: 'shift', dataIndex: 'shift', flex: 1, renderer: upsize },
					  { header: 'qty sampling', dataIndex: 'qty_sampling', flex: 1, renderer: upsize },
						{ header: 'qty rejection', dataIndex: 'qty_rejection', flex: 1, renderer: upsize },
						{ header: 'do', dataIndex: 'do', flex: 1, renderer: upsize },
						{ header: 'bc', dataIndex: 'bc', flex: 1, renderer: upsize },
						{ header: 'po', dataIndex: 'po', flex: 1, renderer: upsize },
						{ header: 'qty delivery', dataIndex: 'qty_delivery', flex: 1, renderer: upsize },
						{ header: 'lot out', dataIndex: 'lot_out', flex: 1, renderer: upsize },
						{ header: 'pr name', dataIndex: 'pr_name', flex: 1, renderer: upsize, hidden:true },
						{ header: 'time finish', dataIndex: 'time_finish', flex: 1, renderer: upsize },
						{ header: 'fld remark', dataIndex: 'fld_remark', flex: 1, renderer: upsize },
						{ header: 'sflag', dataIndex: 'sflag', flex: 1, renderer: upsize, hidden:true },
						//
						//
					  // {
						// 	header: 'Issue Qty',
						// 	dataIndex: 'scanqty',
						// 	flex: 1,
						// 	renderer: upsize,
						// 	summaryType: 'sum',
						// 	summaryRenderer: function(value, summaryData, dataIndex) {
						// 		return ((value === 0 || value > 1) ? '(' + value + ' Total Issue)' : '(0 Total Issue)');
						// 	}
						// }, {
						// 	header: 'PO',
						// 	dataIndex: 'po',
						// 	flex: 1,
						// 	renderer: upsize
						// }, {
						// 	header: 'Req Qty',
						// 	dataIndex: 'reqqty',
						// 	flex: 1,
						// 	renderer: upsize,
						// 	hidden: true
						// },{
						// 	header: 'Model Name',
						// 	dataIndex: 'model_name',
						// 	flex: 1,
						// 	renderer: upsize,
						// 	hidden: true
						// }, {
						// 	header: 'Prod No',
						// 	dataIndex: 'lot',
						// 	flex: 1,
						// 	renderer: upsize,
						// 	hidden: true
						// },  {
						// 	header: 'Line Name',
						// 	dataIndex: 'line',
						// 	flex: 1,
						// 	renderer: upsize,
						// 	hidden: true
						// },  {
						// 	header: 'so',
						// 	dataIndex: 'so',
						// 	flex: 1,
						// 	renderer: upsize
						// }
					],
						// features: [{
						// 	ftype: 'filters',
						// 	encode: encode, // json encode the filter query
						// 	local: local
						// }, {
						// 	id: 'group',
						// 	ftype: 'groupingsummary'
						// }]
					});
					var finishgood_part_insp = Ext.create('Ext.panel.Panel', {
						id 				:'finishgood_part_insp',
						renderTo 	: 'finishgood_part_insp',
					  border		: false,
						width 				: '100%',
						height 				: '100%',
						//height		: 300,
						defaults	: {
							split				: true,
							collapsible	: false
						},
						items			: [grid_part_insp]
					});

				//Part Issuing
					var grid_part_mc_ma = Ext.create('Ext.grid.Panel', {
						id					: 'grid_part_mc_ma',
						width 				: '100%',
						height 				: '100%',
						//height			: 295,
						columnLines	: true,
						store				: store_part_mc_issue_ma,
						viewConfig	: {
							stripeRows					: true,
							emptyText						: '<div class="empty-txt">No data to display.</div>',
							deferEmptyText			: false,
							enableTextSelection	: true
						},
						columns			: [
							{ header		: 'issdate',
								dataIndex	: 'issdate',
								flex			: 1,
								renderer	: upsize
							},
							{ header		: 'Part Number',
								dataIndex	: 'partno',
								flex			: 1,
								renderer	: upsize,
								filter		: {
									type			: 'string',
									dataIndex	: 'partno'
								}
							},
							{ header		: 'Part Name',
								dataIndex	: 'partname',
								flex			: 1,
								renderer	: upsize
							},
							{ header					: 'Issue Qty',
								dataIndex				: 'scanqty',
								flex						: 1,
								renderer				: upsize,
								summaryType			: 'sum',
								summaryRenderer	: function(value, summaryData, dataIndex) {
									return ((value === 0 || value > 1) ? '(' + value + ' Total Issue)' : '(0 Total Issue)');
								}
							},
							{ header		: 'PO',
								dataIndex	: 'po',
								flex			: 1,
								renderer	: upsize
							},
							{ header		: 'Req Qty',
								dataIndex	: 'reqqty',
								flex			: 1,
								renderer	: upsize,
								hidden		: true
							},
							{ header		: 'Model Name',
								dataIndex	: 'model_name',
								flex			: 1,
								renderer	: upsize,
								hidden		: true
							},
							{ header		: 'Prod No',
								dataIndex	: 'lot',
								flex			: 1,
								renderer	: upsize,
								hidden		: true
							},
							{ header		: 'Line Name',
								dataIndex	: 'line',
								flex			: 1,
								renderer	: upsize
							},
							{ header		: 'so',
								dataIndex	: 'so',
								flex			: 1,
								renderer	: upsize
							}
						],
						// features		: [
						// 	{
						// 		ftype	: 'filters',
						// 		encode: encode, // json encode the filter query
						// 		local	: local
						// 	},
						// 	{
						// 		id		: 'group',
						// 		ftype	: 'groupingsummary'
						// 	}
						// ]
					});
					var grid_part_mc_mecha = Ext.create('Ext.grid.Panel', {
						id: 'grid_part_mc_mecha',
						width 				: '100%',
						height 				: '100%',
						//height: 295,
						columnLines: true,
						// store: store_part_mc_issue_mecha,
						viewConfig: {
							stripeRows: true,
							emptyText: '<div class="empty-txt">No data to display.</div>',
							deferEmptyText: false,
							enableTextSelection: true
						},
						columns: [
							{
							header: 'SO',
							dataIndex: 'so',
							flex: 1,
							renderer: upsize
						}, {
							header: 'Part Number',
							dataIndex: 'partno',
							flex: 1,
							renderer: upsize,
							filter: {
								type: 'string',
								dataIndex: 'partno'
							}
						}, {
							header: 'Part Name',
							dataIndex: 'partname',
							flex: 1,
							renderer: upsize
						}, {
							header: 'PO',
							dataIndex: 'po',
							flex: 1,
							renderer: upsize
						}, {
							header: 'Req Qty',
							dataIndex: 'reqqty',
							flex: 1,
							renderer: upsize,
							hidden: true
						}, {
							header: 'Issue Qty',
							dataIndex: 'scanqty',
							flex: 1,
							renderer: upsize,
							summaryType: 'sum',
							summaryRenderer: function(value, summaryData, dataIndex) {
								return ((value === 0 || value > 1) ? '(' + value + ' Total Issue)' : '(0 Total Issue)');
							}
						}, {
							header: 'Line Name',
							dataIndex: 'line',
							flex: 1,
							renderer: upsize,
							hidden: true
						}, {
							header: 'Model Name',
							dataIndex: 'model_name',
							flex: 1,
							renderer: upsize,
							hidden: true
						}, {
							header: 'Prod No',
							dataIndex: 'lot',
							flex: 1,
							renderer: upsize,
							hidden: true
						}, {
							header: 'Issue Date',
							dataIndex: 'issdate',
							flex: 1,
							renderer: upsize
						}],
						// features: [{
						// 	ftype: 'filters',
						// 	encode: encode, // json encode the filter query
						// 	local: local
						// }, {
						// 	id: 'group',
						// 	ftype: 'groupingsummary'
						// }]
					});
					var grid_part_mc_mecha = Ext.create('Ext.grid.Panel', {
						id: 'grid_part_mc_mecha',
						width 				: '100%',
						height 				: '100%',
						//height: 295,
						columnLines: true,
						// store: store_part_mc_issue_mecha,
						viewConfig: {
							stripeRows: true,
							emptyText: '<div class="empty-txt">No data to display.</div>',
							deferEmptyText: false,
							enableTextSelection: true
						},
						columns: [
							{
							header: 'SO',
							dataIndex: 'so',
							flex: 1,
							renderer: upsize
						}, {
							header: 'Part Number',
							dataIndex: 'partno',
							flex: 1,
							renderer: upsize,
							filter: {
								type: 'string',
								dataIndex: 'partno'
							}
						}, {
							header: 'Part Name',
							dataIndex: 'partname',
							flex: 1,
							renderer: upsize
						}, {
							header: 'PO',
							dataIndex: 'po',
							flex: 1,
							renderer: upsize
						}, {
							header: 'Req Qty',
							dataIndex: 'reqqty',
							flex: 1,
							renderer: upsize,
							hidden: true
						}, {
							header: 'Issue Qty',
							dataIndex: 'scanqty',
							flex: 1,
							renderer: upsize,
							summaryType: 'sum',
							summaryRenderer: function(value, summaryData, dataIndex) {
								return ((value === 0 || value > 1) ? '(' + value + ' Total Issue)' : '(0 Total Issue)');
							}
						}, {
							header: 'Line Name',
							dataIndex: 'line',
							flex: 1,
							renderer: upsize,
							hidden: true
						}, {
							header: 'Model Name',
							dataIndex: 'model_name',
							flex: 1,
							renderer: upsize,
							hidden: true
						}, {
							header: 'Prod No',
							dataIndex: 'lot',
							flex: 1,
							renderer: upsize,
							hidden: true
						}, {
							header: 'Issue Date',
							dataIndex: 'issdate',
							flex: 1,
							renderer: upsize
						}],
						// features: [{
						// 	ftype: 'filters',
						// 	encode: encode, // json encode the filter query
						// 	local: local
						// }, {
						// 	id: 'group',
						// 	ftype: 'groupingsummary'
						// }]
					});
					var grd_part_mchcal = Ext.create('Ext.grid.Panel',{
						id          : 'grd_part_mchcal',
						width 				: '100%',
						height 				: '100%',
						//height  	: 295,
						columnLines : true,
						// store       : part_mchcal,
						viewConfig  : {
							stripeRows  : true,
							emptyText	: '<div class="empty-txt">No data to display.</div>',
							deferEmptyText: false,
							enableTextSelection	: true
						},
						columns     : [
								{ header: 'input_date', dataIndex: 'input_date', hidden: true },
								{ header: 'id', 		dataIndex: 'id',		 hidden: true },
								{ header: 'STATUS', 				dataIndex: 'status', 		width: 80, renderer: status, align: 'center' },
								{ header: 'PIC', 					dataIndex: 'action_user', 	width: 150, renderer: upsize },
								{ header: 'DATE INPUT', 			dataIndex: 'vw_inputdate', 	width: 150, renderer: upsize, align: 'center' },
								{ header: 'SYMPTOM', 				dataIndex: 'symptom', 		width: 150, renderer: upsize },
								{ header: 'PROBLEM AND CAUSE',		dataIndex: 'probcause', 	width: 250, renderer: upsize },
								{ header: 'MODEL', 					dataIndex: 'model', 		width: 100, renderer: upsize },
								{ header: 'OCCURRED PLACE',
								  columns: [
									{ header: 'LINE', 		dataIndex: 'line', 	width: 70, renderer: upsize },
									{ header: 'SHIFT', 		dataIndex: 'shift', width: 50, renderer: upsize }
								  ]
								},
								{ header: 'PART NO', 				dataIndex: 'part_no', 		width: 150, renderer: upsize },
								{ header: 'PART NAME', 				dataIndex: 'part_name', 	width: 180, renderer: upsize },
								{ header: 'SUPPLIER', 				dataIndex: 'supplier', 		width: 200, renderer: upsize },
								{ header: 'REJECT QTY', 			dataIndex: 'rejectqty', 	width: 80, 	renderer: upsize },
								{ header: 'DETAIL PICTURE<BR>(CLICK IMAGE FOR ZOOM)', 			dataIndex: 'filepicture', width: 200, renderer: fileimage, align: 'center' },
								{ header: 'CORRECTION & METHOD',	dataIndex: 'corrmethod', 	width: 500, renderer: upsize },
								{ header: 'LOSS TIME CORRECTION BY IQC ',
								  columns: [
									{ header: 'MAN POWER', 	dataIndex: 'mp', 		width: 50, renderer: upsize },
									{ header: 'TIME (H)', 	dataIndex: 'duration',	width: 50, renderer: upsize },
									{ header: 'TOTAL', 		dataIndex: 'total', 	width: 50, renderer: upsize }
								  ]
								},
								{ header: 'ACTION ON SUPLIER', 		dataIndex: 'actionsupp', 	width: 500, renderer: upsize },
								{ header: 'REMARK', 				dataIndex: 'remark', 		width: 200, renderer: upsize }
		              	],
		          	});
		          //-----------------------------------------//
					var grd_part_mchnism = Ext.create('Ext.grid.Panel',{
		              	id          : 'grd_part_mchnism',
		              	width 				: '100%',
						height 				: '100%',
						height  	: 295,
						columnLines : true,
						// store       : part_mchnism,
						viewConfig  : {
						 	stripeRows  : true,
							emptyText	: '<div class="empty-txt">No data to display.</div>',
							deferEmptyText: false,
							enableTextSelection	: true
						},
		              	columns     : [
								{ header: 'input_date', dataIndex: 'input_date', hidden: true },
								{ header: 'id', 		dataIndex: 'id',		 hidden: true },
								{ header: 'STATUS', 				dataIndex: 'status', 		width: 80, renderer: status, align: 'center' },
								{ header: 'PIC', 					dataIndex: 'action_user', 	width: 150, renderer: upsize },
								{ header: 'DATE INPUT', 			dataIndex: 'vw_inputdate', 	width: 150, renderer: upsize, align: 'center' },
								{ header: 'SYMPTOM', 				dataIndex: 'symptom', 		width: 150, renderer: upsize },
								{ header: 'PROBLEM AND CAUSE',		dataIndex: 'probcause', 	width: 250, renderer: upsize },
								{ header: 'MODEL', 					dataIndex: 'model', 		width: 100, renderer: upsize },
								{ header: 'OCCURRED PLACE',
								  columns: [
									{ header: 'LINE', 		dataIndex: 'line', 	width: 70, renderer: upsize },
									{ header: 'SHIFT', 		dataIndex: 'shift', width: 50, renderer: upsize }
								  ]
								},
								{ header: 'PART NO', 				dataIndex: 'part_no', 		width: 150, renderer: upsize },
								{ header: 'PART NAME', 				dataIndex: 'part_name', 	width: 180, renderer: upsize },
								{ header: 'SUPPLIER', 				dataIndex: 'supplier', 		width: 200, renderer: upsize },
								{ header: 'REJECT QTY', 			dataIndex: 'rejectqty', 	width: 80, 	renderer: upsize },
								{ header: 'DETAIL PICTURE<BR>(CLICK IMAGE FOR ZOOM)', 			dataIndex: 'filepicture', width: 200, renderer: fileimage, align: 'center' },
								{ header: 'CORRECTION & METHOD',	dataIndex: 'corrmethod', 	width: 500, renderer: upsize },
								{ header: 'LOSS TIME CORRECTION BY IQC ',
								  columns: [
									{ header: 'MAN POWER', 	dataIndex: 'mp', 		width: 50, renderer: upsize },
									{ header: 'TIME (H)', 	dataIndex: 'duration',	width: 50, renderer: upsize },
									{ header: 'TOTAL', 		dataIndex: 'total', 	width: 50, renderer: upsize }
								  ]
								},
								{ header: 'ACTION ON SUPLIER', 		dataIndex: 'actionsupp', 	width: 500, renderer: upsize },
								{ header: 'REMARK', 				dataIndex: 'remark', 		width: 200, renderer: upsize }
		              ],
		          });
		          //-----------------------------------------//
					var grd_part_mchtronics = Ext.create('Ext.grid.Panel',{
				        id          : 'grd_part_mchtronics',
				        width 				: '100%',
						height 				: '100%',
						//height  	: 295,
				        columnLines : true,
				        // store       : part_mchtronics,
				        viewConfig  : {
				            stripeRows  : true,
										emptyText	: '<div class="empty-txt">No data to display.</div>',
										deferEmptyText: false,
										enableTextSelection	: true
				        },
				        columns     : [
									{ header: 'input_date', dataIndex: 'input_date', hidden: true },
									{ header: 'id', 		dataIndex: 'id',		 hidden: true },
									{ header: 'STATUS', 				dataIndex: 'status', 		idth: 80, renderer: status, align: 'center' },
									{ header: 'PIC', 					dataIndex: 'action_user', 	width: 150, renderer: upsize },
									{ header: 'DATE INPUT', 			dataIndex: 'vw_inputdate', 	width: 150, renderer: upsize, align: 'center' },
									{ header: 'SYMPTOM', 				dataIndex: 'symptom', 		width: 150, renderer: upsize },
									{ header: 'PROBLEM AND CAUSE',		dataIndex: 'probcause', 	width: 250, renderer: upsize },
									{ header: 'MODEL', 					dataIndex: 'model', 		width: 100, renderer: upsize },
									{ header: 'OCCURRED PLACE',
									  columns: [
										{ header: 'LINE', 		dataIndex: 'line', 	width: 70, renderer: upsize },
										{ header: 'SHIFT', 		dataIndex: 'shift', width: 50, renderer: upsize }
									  ]
									},
									{ header: 'PART NO', 				dataIndex: 'part_no', 		width: 150, renderer: upsize },
									{ header: 'PART NAME', 				dataIndex: 'part_name', 	width: 180, renderer: upsize },
									{ header: 'SUPPLIER', 				dataIndex: 'supplier', 		width: 200, renderer: upsize },
									{ header: 'REJECT QTY', 			dataIndex: 'rejectqty', 	width: 80, 	renderer: upsize },
									{ header: 'DETAIL PICTURE<BR>(CLICK IMAGE FOR ZOOM)', 			dataIndex: 'filepicture', width: 200, renderer: fileimage, align: 'center' },
									{ header: 'CORRECTION & METHOD',	dataIndex: 'corrmethod', 	width: 500, renderer: upsize },
									{ header: 'LOSS TIME CORRECTION BY IQC ',
									  columns: [
										{ header: 'MAN POWER', 	dataIndex: 'mp', 		width: 50, renderer: upsize },
										{ header: 'TIME (H)', 	dataIndex: 'duration',	width: 50, renderer: upsize },
										{ header: 'TOTAL', 		dataIndex: 'total', 	width: 50, renderer: upsize }
									  ]
									},
									{ header: 'ACTION ON SUPLIER', 		dataIndex: 'actionsupp', 	width: 500, renderer: upsize },
									{ header: 'REMARK', 				dataIndex: 'remark', 		width: 200, renderer: upsize }
				      	],
			     	});
	    			var tab_part_iqc	= Ext.create('Ext.tab.Panel',{
						tabPosition	: 'left',
										autoHeight  : true,
										activeTab   : 0,
										width       : '100%',
						style		: 'padding:5px;-background:#157FCC;',
										items       : [
							{
								title       : 'Mechanical',
								reorderable	: false,
								items		: [grd_part_mchcal]
							},{
								title       : 'Mechanism',
								reorderable	: false,
								items		: [grd_part_mchnism]
							},{
								title       : 'Mechatronics',
								reorderable	: false,
								items		: [grd_part_mchtronics]
							}
						]
					});
					var part_mc = Ext.create('Ext.tab.Panel', {
						id : 'part_mc',
						renderTo : 'finishgood_part_issue',
						autoHeight: true,
						plain: true,
						activeTab: 0,
						width 				: '100%',
						height 				: '100%',
						//height: 295,
						autoScroll: true,
						frame: true,
						//style: 'padding:5px;-background:#157FCC;',
						items: [{
							id : 'show_grid_mc_ma',
							title: 'MC Issue to MA',
								reorderable: false,
								items: [grid_part_mc_ma]
							},
							{
								id : 'show_grid_mc_mecha',
								title: 'MC Issue to MECHA',
								reorderable: false,
								items: [grid_part_mc_mecha]
							},
							{
								id : 'show_grid_part_iqc',
								title: 'IQC',
								reorderable: false,
								items		: [tab_part_iqc]
							}
						]
					});

		//	Process Operational
			//	SMT DEPARTMENT
					var grid_part_smt_prep = Ext.create('Ext.grid.Panel', {
						id: 'grid_part_smt_prep',
						width 				: '100%',
						height 				: '100%',
						//height: 295,
						columnLines: true,
						// store: store_part_smt_prep,
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
						}],
						//features: [filters],
						// selModel: {
						// 	selType: 'cellmodel'
						// },
						// plugins: [cellEditing]
					});
					var grid_part_smt_zdbs = Ext.create('Ext.grid.Panel', {
						id: 'grid_part_smt_zdbs',
						width 				: '100%',
						height 				: '100%',
						//height: 295,
						columnLines: true,
						// store: store_part_smt_zdbs,
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
					var grd_proc_smt_qualityreport = Ext.create('Ext.grid.Panel', {
						id: 'grd_proc_smt_qualityreport',
						width 				: '100%',
						height 				: '100%',
						//height: 295,
						columnLines: true,
						// store: store_proc_smt_quality,
						viewConfig: {
							stripeRows: true,
							emptyText: '<div class="empty-txt">No data to display.</div>',
							deferEmptyText: false,
							enableTextSelection: true
						},
						columns: [{
							header: 'InputID',
							dataIndex: 'inputid',
							flex: 1,
							locked: true,
							hidden: true
						}, {
							header: 'Date',
							dataIndex: 'dateid',
							width: 80,
							locked: true,
							renderer: Ext.util.Format.dateRenderer('Y-m-d')
						}, {
							header: 'Group',
							dataIndex: 'group',
							width: 50,
							locked: true
						}, {
							header: 'Shift',
							dataIndex: 'shift',
							width: 50,
							locked: true
						}, {
							header: 'Machine Name',
							dataIndex: 'mch',
							width: 60,
							locked: true
						}, {
							header: 'Model Name',
							dataIndex: 'model_name',
							width: 100,
							locked: true
						}, {
							header: 'Start Serial',
							dataIndex: 'start_serial',
							width: 60,
							locked: true
						}, {
							header: 'Start Number',
							dataIndex: 'serial_no',
							width: 100,
							locked: true
						}, {
							header: 'Lot No',
							dataIndex: 'lot_no',
							width: 50,
							locked: true
						}, {
							header: 'Lot Qty',
							dataIndex: 'lot_qty',
							width: 60,
							locked: true
						}, {
							header: 'PCB Name',
							dataIndex: 'pcb_name',
							width: 70,
							locked: true,
							summaryType: 'count'
						}, {
							header: 'PWB No',
							dataIndex: 'pwb_no',
							width: 80,
							locked: true
						}, {
							header: 'Process',
							dataIndex: 'process',
							width: 60,
							locked: true
						}, {
							header: 'AI',
							dataIndex: 'ai',
							width: 100,
							locked: true,
							hidden: true
						}, {
							header: 'Problem/Symptom',
							dataIndex: 'smt',
							width: 150,
							locked: true
						}, {
							header: 'Location',
							dataIndex: 'loc',
							width: 70
						}, {
							header: 'Magazine No',
							dataIndex: 'magazineno',
							width: 100
						}, {
							header: 'NG Found By',
							dataIndex: 'ng',
							width: 100
						}, {
							header: 'Board No',
							dataIndex: 'boardke',
							width: 70
						}, {
							header: 'Board NG Qty',
							dataIndex: 'boardqty',
							width: 100,
							summaryType: 'sum'
						}, {
							header: 'Point NG Qty',
							dataIndex: 'pointqty',
							width: 100,
							summaryType: 'sum'
						}, {
							header: 'Input Date',
							dataIndex: 'inputdate',
							width: 130
						}],
						// features: [{
						// 	ftype: 'filters',
						// 	encode: encode,
						// 	local: local
						// }]
					});
					var grd_proc_smt_downtime = Ext.create('Ext.grid.Panel', { //_Z_ Finish good
						id: 'grd_proc_smt_downtime',
						width 				: '100%',
						height 				: '100%',
						//height: 295,
						columnLines: true,
						// store: store_proc_smt_downtime,
						viewConfig: {
							stripeRows: true,
							emptyText: '<div class="empty-txt">No data to display.</div>',
							deferEmptyText: false,
							enableTextSelection: true
						},
						columns: [{
							header: 'Starting',
							dataIndex: 'date_id',
							flex: 1,
							renderer: upsize
						}, {
							header: 'Duration',
							dataIndex: 'downtime',
							flex: 1,
							renderer: upsize
						}, {
							header: 'Shift',
							dataIndex: 'shift',
							width: 50,
							renderer: upsize
						}, {
							header: 'Machine',
							dataIndex: 'bn',
							flex: 1,
							renderer: upsize
						}, {
							header: 'Model Name',
							dataIndex: 'model_name',
							flex: 1,
							renderer: upsize,
							hidden: true
						}, {
							header: 'PWB',
							dataIndex: 'pwb_name',
							width: 80,
							renderer: upsize
						}, {
							header: 'Process',
							dataIndex: 'process',
							width: 60,
							renderer: upsize
						}, {
							header: 'Start Serial',
							dataIndex: 'start_serial',
							width: 85,
							renderer: upsize,
							hidden: true
						}, {
							header: 'Status',
							dataIndex: 'confirm',
							flex: 1,
							renderer: upsize
						}, {
							header: 'Reason',
							dataIndex: 'reason',
							flex: 1,
							renderer: upsize,
							filter: {
								type: 'string'
							}
						}, {
							header: 'Cause 1',
							dataIndex: 'cause1',
							flex: 1,
							renderer: upsize
						}, {
							header: 'Cause 2',
							dataIndex: 'cause2',
							flex: 1,
							renderer: upsize
						}, {
							header: 'Cause 3',
							dataIndex: 'cause3',
							flex: 1,
							renderer: upsize
						}, {
							header: 'Cause 4',
							dataIndex: 'cause4',
							flex: 1,
							renderer: upsize
						}, ],
						// features: [{
						// 	ftype: 'filters',
						// 	encode: encode,
						// 	local: local
						// }]
					});
					var grd_proc_smt_output = Ext.create('Ext.grid.Panel', {
						id: 'grd_proc_smt_output',
						width 				: '100%',
						height 				: '100%',
						//height: 295,
						columnLines: true,
						// store: store_proc_smt_prodresult,
						viewConfig: {
							stripeRows: true,
							emptyText: '<div class="empty-txt">No data to display.</div>',
							deferEmptyText: false,
							enableTextSelection: true
						},
						columns: [{
							header: 'Prod Date',
							dataIndex: 'prod_date',
							flex: 1,
							renderer: upsize
						}, {
							header: 'First Output',
							dataIndex: 'stime',
							flex: 1,
							renderer: upsize
						}, {
							header: 'Line Name',
							dataIndex: 'line_name',
							flex: 1,
							renderer: upsize
						}, {
							header: 'Shift',
							dataIndex: 'shift',
							flex: 1,
							renderer: upsize
						}, {
							header: 'PWB Name',
							dataIndex: 'pwb',
							flex: 1,
							renderer: upsize
						}, {
							header: 'Process',
							dataIndex: 'process',
							flex: 1,
							renderer: upsize
						}, {
							header: 'Model Name',
							dataIndex: 'model_name',
							flex: 1,
							renderer: upsize,
							hidden: true
						}, {
							header: 'Output',
							dataIndex: 'output',
							flex: 1,
							renderer: upsize
						}]
					});
					var part_smt = Ext.create('Ext.tab.Panel', {
						id : 'part_smt',
						renderTo : 'finishgood_part_smt',
						autoHeight: true,
						plain: true,
						activeTab: 0,
						width 				: '100%',
						height 				: '100%',
						//height: 295,
						autoScroll: true,
						frame: true,
						//style: 'padding:5px;-background:#157FCC;',
						items: [{
								id : 'show_grid_pickingpart',
								title: 'Picking Part',
								reorderable: false,
								items: [grid_part_smt_prep]
							}, {
								id : 'show_grid_installpart',
								title: 'Install Part',
								reorderable: false,
								//items: [grid_part_smt_install]
							}, {
								id : 'show_grid_checkingpart',
								title: 'Checking Part',
								reorderable: false,
								items: [grid_part_smt_zdbs]
							}, {
								id : 'show_grid_replacepart',
								title: 'Replace Part',
								reorderable: false,
								//items: [grid_part_smt_repalce]
							}, {
								id : 'show_grid_smt_boardid',
								title: 'Board ID Marking / laser',
								reorderable: false,
								//items: [grid_part_smt_repalce]
							}, {
								id : 'show_grid_smt_oee',
								title: 'OEE / OCS',
								reorderable: false,
								//items: [grid_part_smt_repalce]
							}, {
								id : 'show_grid_aoi',
								title: 'AOI',
								reorderable: false,
								//items: [grid_part_smt_repalce]
							}, {
								id : 'show_grid_quality',
								title: 'Quality Report',
								reorderable: false,
								items: [grd_proc_smt_qualityreport]
							}, {
								id : 'show_grid_machdowntime',
								title: 'Machine Downtime',
								reorderable: false,
								items: [grd_proc_smt_downtime]
							}, {
								id : 'show_grid_proc_smt_output',
								title: 'Production Result',
								reorderable: false,
								items: [grd_proc_smt_output]
							}
						]
					});

			//	PCB & MA Department
					var grd_ma_losttime = Ext.create('Ext.grid.Panel', {
					 	id: 'grd_prd_losttime',
					 	width 				: '100%',
						height 				: '100%',
						//height: 295,
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
					var part_ma = Ext.create('Ext.tab.Panel', {
						id : 'part_ma',
						renderTo : 'finishgood_part_ma_pcb',
						autoHeight: true,
						plain: true,
						activeTab: 0,
						width 				: '100%',
						height 				: '100%',
						//height: 295,
						autoScroll: true,
						frame: true,
						//style: 'padding:5px;-background:#157FCC;',
						items: [{
								id : 'show_grid_jncp',
								title: 'Jig and Checker Usage',
								reorderable: false,
								//items: [grid_part_smt_install]
							},
							{
								id : 'show_grid_fscr',
								title: 'FSCR (Part & Process verification on change model)',
								reorderable: false,
								//items: [grid_part_smt_install]
							},
							{
								id : 'show_grid_pcb_boardid',
								title: 'PCB Board ID Scanning',
								reorderable: false,
								//items: [grid_part_smt_install]
							},
							{
								id : 'show_grid_ma_boardid',
								title: 'MA Board ID Scanning',
								reorderable: false,
								//items: [grid_part_smt_install]
							},
							{
								id : 'show_grid_ma_oee',
								title: 'OCS',
								reorderable: false,
								//items: [grid_part_smt_install]
							},
							{
								id : 'show_grid_ma_quality',
								title: 'Quality Reprot',
								reorderable: false,
								//items: [grid_part_smt_install]
							},
							{
								id : 'show_grid_ma_losttime',
								title: 'Lost Time',
								reorderable: false,
								items: [grd_ma_losttime]
							}
						]
					});

			//	Outgoing Quality Control
				//	Quality Sampling ( QA )
				//	*******

			//	Finished Goods ( Logistic )
				//	Warehouse Management ( Stock Control )
					var grid_log_stockcard = Ext.create('Ext.grid.Panel', {
						id: 'grid_log_stockcard',
						width 				: '100%',
						height 				: '100%',
						//height: 295,
						columnLines: true,
						// store: store_log_stockcard,
						viewConfig: {
							stripeRows: true,
							emptyText: '<div class="empty-txt">No data to display.</div>',
							deferEmptyText: false,
							enableTextSelection: true
						},
						columns: [
							{
							header: 'idstockcard',
							dataIndex: 'idstockcard',
							flex: 1,
							renderer: upsize
						}, {
							header: 'startsn',
							dataIndex: 'startsn',
							flex: 1,
							renderer: upsize
						},{
							header: 'endsn',
							dataIndex: 'endsn',
							flex: 1,
							renderer: upsize
						}, {
							header: 'Qty',
							dataIndex: 'qty',
							flex: 1,
							renderer: upsize,
							summaryType: 'sum',
							summaryRenderer: function(value, summaryData, dataIndex) {
								return ((value === 0 || value > 1) ? '(' + value + ' Total Issue)' : '(0 Total Issue)');
							}
						}, {
							header: 'remark',
							dataIndex: 'remark',
							flex: 1,
							renderer: upsize
						}, {
							header: 'status',
							dataIndex: 'status',
							flex: 1,
							renderer: upsize
						},{
							header: 'Model Name',
							dataIndex: 'model',
							flex: 1,
							renderer: upsize,
							//hidden: true
						}, {
							header: 'Prod No',
							dataIndex: 'lotno',
							flex: 1,
							renderer: upsize,
							//hidden: true
						},  {
							header: 'Line Name',
							dataIndex: 'line',
							flex: 1,
							renderer: upsize,
							//hidden: true
						}],
						// features: [{
						// 	ftype: 'filters',
						// 	encode: encode, // json encode the filter query
						// 	local: local
						// }, {
						// 	id: 'group',
						// 	ftype: 'groupingsummary'
						// }]
					});
					var grid_log_shipmenthold = Ext.create('Ext.grid.Panel', {
						id: 'grid_part_mc_mecha',
						width 				: '100%',
						height 				: '100%',
						//height: 295,
						columnLines: true,
						// store: store_log_shipmenthold,
						viewConfig: {
							stripeRows: true,
							emptyText: '<div class="empty-txt">No data to display.</div>',
							deferEmptyText: false,
							enableTextSelection: true
						},
						columns: [
							{ header: 'idshipmenthold', dataIndex: 'idshipmenthold', flex: 1, renderer: upsize },
							{ header: 'model', dataIndex: 'model', flex: 1, renderer: upsize },
							{ header: 'lotno', dataIndex: 'lotno', flex: 1, renderer: upsize },
							{ header: 'problem', dataIndex: 'problem', flex: 1, renderer: upsize },
							{ header: 'status', dataIndex: 'status', flex: 1, renderer: upsize },
							{ header: 'startsn', dataIndex: 'startsn', flex: 1, renderer: upsize },
							{ header: 'endsn', dataIndex: 'endsn', flex: 1, renderer: upsize },
							{ header: 'remark', dataIndex: 'remark', flex: 1, renderer: upsize },
							{ header: 'qtyrequest', dataIndex: 'qtyrequest', flex: 1, renderer: upsize },
							{ header: 'qtywh', dataIndex: 'qtywh', flex: 1, renderer: upsize },
							{ header: 'qtyshipout', dataIndex: 'qtyshipout', flex: 1, renderer: upsize },
							{ header: 'qtyhold', dataIndex: 'qtyhold', flex: 1, renderer: upsize }

							// 	{
							// 	header: 'SO',
							// 	dataIndex: 'so',
							// 	flex: 1,
							// 	renderer: upsize
							// }, {
							// 	header: 'Part Number',
							// 	dataIndex: 'partno',
							// 	flex: 1,
							// 	renderer: upsize,
							// 	filter: {
							// 		type: 'string',
							// 		dataIndex: 'partno'
							// 	}
							// }, {
							// 	header: 'Part Name',
							// 	dataIndex: 'partname',
							// 	flex: 1,
							// 	renderer: upsize
							// }, {
							// 	header: 'PO',
							// 	dataIndex: 'po',
							// 	flex: 1,
							// 	renderer: upsize
							// }, {
							// 	header: 'Req Qty',
							// 	dataIndex: 'reqqty',
							// 	flex: 1,
							// 	renderer: upsize,
							// 	hidden: true
							// }, {
							// 	header: 'Issue Qty',
							// 	dataIndex: 'scanqty',
							// 	flex: 1,
							// 	renderer: upsize,
							// 	summaryType: 'sum',
							// 	summaryRenderer: function(value, summaryData, dataIndex) {
							// 		return ((value === 0 || value > 1) ? '(' + value + ' Total Issue)' : '(0 Total Issue)');
							// 	}
							// }, {
							// 	header: 'Line Name',
							// 	dataIndex: 'line',
							// 	flex: 1,
							// 	renderer: upsize,
							// 	hidden: true
							// }, {
							// 	header: 'Model Name',
							// 	dataIndex: 'model_name',
							// 	flex: 1,
							// 	renderer: upsize,
							// 	hidden: true
							// }, {
							// 	header: 'Prod No',
							// 	dataIndex: 'lot',
							// 	flex: 1,
							// 	renderer: upsize,
							// 	hidden: true
							// }, {
							// 	header: 'Issue Date',
							// 	dataIndex: 'issdate',
							// 	flex: 1,
							// 	renderer: upsize
							// }
						],
						// features: [{
						// 	ftype: 'filters',
						// 	encode: encode, // json encode the filter query
						// 	local: local
						// }, {
						// 	id: 'group',
						// 	ftype: 'groupingsummary'
						// }]
					});
					var grid_log_scan_in = Ext.create('Ext.grid.Panel', {
						id: 'grid_part_mc_mecha',
						width 				: '100%',
						height 				: '100%',
						//height: 295,
						columnLines: true,
						// store: store_log_scanin,
						viewConfig: {
							stripeRows: true,
							emptyText: '<div class="empty-txt">No data to display.</div>',
							deferEmptyText: false,
							enableTextSelection: true
						},
						columns: [
							{ header: 'idnumber', dataIndex: 'idnumber', flex: 1, renderer: upsize },
							{ header: 'model', dataIndex: 'model', flex: 1, renderer: upsize },
							{ header: 'serial', dataIndex: 'serial', flex: 1, renderer: upsize },
							{ header: 'lotno', dataIndex: 'lotno', flex: 1, renderer: upsize },
							{ header: 'status', dataIndex: 'status', flex: 1, renderer: upsize },
							{ header: 'input_user', dataIndex: 'input_user', flex: 1, renderer: upsize, hidden:true },
							{ header: 'input_date', dataIndex: 'input_date', flex: 1, renderer: upsize },
							{ header: 'update_user', dataIndex: 'update_user', flex: 1, renderer: upsize, hidden:true },
							{ header: 'update_date', dataIndex: 'update_date', flex: 1, renderer: upsize }

						// 	{
						// 	header: 'Part Number',
						// 	dataIndex: 'partno',
						// 	flex: 1,
						// 	renderer: upsize,
						// 	filter: {
						// 		type: 'string',
						// 		dataIndex: 'partno'
						// 	}
						// }, {
						// 	header: 'Part Name',
						// 	dataIndex: 'partname',
						// 	flex: 1,
						// 	renderer: upsize
						// }, {
						// 	header: 'PO',
						// 	dataIndex: 'po',
						// 	flex: 1,
						// 	renderer: upsize
						// }, {
						// 	header: 'Req Qty',
						// 	dataIndex: 'reqqty',
						// 	flex: 1,
						// 	renderer: upsize,
						// 	hidden: true
						// }, {
						// 	header: 'Issue Qty',
						// 	dataIndex: 'scanqty',
						// 	flex: 1,
						// 	renderer: upsize,
						// 	summaryType: 'sum',
						// 	summaryRenderer: function(value, summaryData, dataIndex) {
						// 		return ((value === 0 || value > 1) ? '(' + value + ' Total Issue)' : '(0 Total Issue)');
						// 	}
						// }, {
						// 	header: 'Line Name',
						// 	dataIndex: 'line',
						// 	flex: 1,
						// 	renderer: upsize,
						// 	hidden: true
						// }, {
						// 	header: 'Model Name',
						// 	dataIndex: 'model_name',
						// 	flex: 1,
						// 	renderer: upsize,
						// 	hidden: true
						// }, {
						// 	header: 'Prod No',
						// 	dataIndex: 'lot',
						// 	flex: 1,
						// 	renderer: upsize,
						// 	hidden: true
						// }, {
						// 	header: 'Issue Date',
						// 	dataIndex: 'issdate',
						// 	flex: 1,
						// 	renderer: upsize
						// }
						],
						// features: [{
						// 	ftype: 'filters',
						// 	encode: encode, // json encode the filter query
						// 	local: local
						// }, {
						// 	id: 'group',
						// 	ftype: 'groupingsummary'
						// }]
					});
					var grid_log_borrow = Ext.create('Ext.grid.Panel', {
						id: 'grid_part_mc_mecha',
						width 				: '100%',
						height 				: '100%',
						//height: 295,
						columnLines: true,
						//store: store_part_mc_issue_mecha,
						viewConfig: {
							stripeRows: true,
							emptyText: '<div class="empty-txt">No data to display.</div>',
							deferEmptyText: false,
							enableTextSelection: true
						},
						columns: [
							{
							header: 'SO',
							dataIndex: 'so',
							flex: 1,
							renderer: upsize
						}, {
							header: 'Part Number',
							dataIndex: 'partno',
							flex: 1,
							renderer: upsize,
							filter: {
								type: 'string',
								dataIndex: 'partno'
							}
						}, {
							header: 'Part Name',
							dataIndex: 'partname',
							flex: 1,
							renderer: upsize
						}, {
							header: 'PO',
							dataIndex: 'po',
							flex: 1,
							renderer: upsize
						}, {
							header: 'Req Qty',
							dataIndex: 'reqqty',
							flex: 1,
							renderer: upsize,
							hidden: true
						}, {
							header: 'Issue Qty',
							dataIndex: 'scanqty',
							flex: 1,
							renderer: upsize,
							summaryType: 'sum',
							summaryRenderer: function(value, summaryData, dataIndex) {
								return ((value === 0 || value > 1) ? '(' + value + ' Total Issue)' : '(0 Total Issue)');
							}
						}, {
							header: 'Line Name',
							dataIndex: 'line',
							flex: 1,
							renderer: upsize,
							hidden: true
						}, {
							header: 'Model Name',
							dataIndex: 'model_name',
							flex: 1,
							renderer: upsize,
							hidden: true
						}, {
							header: 'Prod No',
							dataIndex: 'lot',
							flex: 1,
							renderer: upsize,
							hidden: true
						}, {
							header: 'Issue Date',
							dataIndex: 'issdate',
							flex: 1,
							renderer: upsize
						}],
						// features: [{
						// 	ftype: 'filters',
						// 	encode: encode, // json encode the filter query
						// 	local: local
						// }, {
						// 	id: 'group',
						// 	ftype: 'groupingsummary'
						// }]
					});
					var grid_log_vanningplan = Ext.create('Ext.grid.Panel', {
						id: 'grid_part_mc_mecha',
						width 				: '100%',
						height 				: '100%',
						//height: 295,
						columnLines: true,
						// store: store_part_mc_issue_mecha,
						viewConfig: {
							stripeRows: true,
							emptyText: '<div class="empty-txt">No data to display.</div>',
							deferEmptyText: false,
							enableTextSelection: true
						},
						columns: [
							{
							header: 'SO',
							dataIndex: 'so',
							flex: 1,
							renderer: upsize
						}, {
							header: 'Part Number',
							dataIndex: 'partno',
							flex: 1,
							renderer: upsize,
							filter: {
								type: 'string',
								dataIndex: 'partno'
							}
						}, {
							header: 'Part Name',
							dataIndex: 'partname',
							flex: 1,
							renderer: upsize
						}, {
							header: 'PO',
							dataIndex: 'po',
							flex: 1,
							renderer: upsize
						}, {
							header: 'Req Qty',
							dataIndex: 'reqqty',
							flex: 1,
							renderer: upsize,
							hidden: true
						}, {
							header: 'Issue Qty',
							dataIndex: 'scanqty',
							flex: 1,
							renderer: upsize,
							summaryType: 'sum',
							summaryRenderer: function(value, summaryData, dataIndex) {
								return ((value === 0 || value > 1) ? '(' + value + ' Total Issue)' : '(0 Total Issue)');
							}
						}, {
							header: 'Line Name',
							dataIndex: 'line',
							flex: 1,
							renderer: upsize,
							hidden: true
						}, {
							header: 'Model Name',
							dataIndex: 'model_name',
							flex: 1,
							renderer: upsize,
							hidden: true
						}, {
							header: 'Prod No',
							dataIndex: 'lot',
							flex: 1,
							renderer: upsize,
							hidden: true
						}, {
							header: 'Issue Date',
							dataIndex: 'issdate',
							flex: 1,
							renderer: upsize
						}],
						// features: [{
						// 	ftype: 'filters',
						// 	encode: encode, // json encode the filter query
						// 	local: local
						// }, {
						// 	id: 'group',
						// 	ftype: 'groupingsummary'
						// }]
					});
					var grid_log_scan_out = Ext.create('Ext.grid.Panel', {
						id: 'grid_part_mc_mecha',
						width 				: '100%',
						height 				: '100%',
						//height: 295,
						columnLines: true,
						// store: store_part_mc_issue_mecha,
						viewConfig: {
							stripeRows: true,
							emptyText: '<div class="empty-txt">No data to display.</div>',
							deferEmptyText: false,
							enableTextSelection: true
						},
						columns: [
							{
							header: 'SO',
							dataIndex: 'so',
							flex: 1,
							renderer: upsize
						}, {
							header: 'Part Number',
							dataIndex: 'partno',
							flex: 1,
							renderer: upsize,
							filter: {
								type: 'string',
								dataIndex: 'partno'
							}
						}, {
							header: 'Part Name',
							dataIndex: 'partname',
							flex: 1,
							renderer: upsize
						}, {
							header: 'PO',
							dataIndex: 'po',
							flex: 1,
							renderer: upsize
						}, {
							header: 'Req Qty',
							dataIndex: 'reqqty',
							flex: 1,
							renderer: upsize,
							hidden: true
						}, {
							header: 'Issue Qty',
							dataIndex: 'scanqty',
							flex: 1,
							renderer: upsize,
							summaryType: 'sum',
							summaryRenderer: function(value, summaryData, dataIndex) {
								return ((value === 0 || value > 1) ? '(' + value + ' Total Issue)' : '(0 Total Issue)');
							}
						}, {
							header: 'Line Name',
							dataIndex: 'line',
							flex: 1,
							renderer: upsize,
							hidden: true
						}, {
							header: 'Model Name',
							dataIndex: 'model_name',
							flex: 1,
							renderer: upsize,
							hidden: true
						}, {
							header: 'Prod No',
							dataIndex: 'lot',
							flex: 1,
							renderer: upsize,
							hidden: true
						}, {
							header: 'Issue Date',
							dataIndex: 'issdate',
							flex: 1,
							renderer: upsize
						}],
						// features: [{
						// 	ftype: 'filters',
						// 	encode: encode, // json encode the filter query
						// 	local: local
						// }, {
						// 	id: 'group',
						// 	ftype: 'groupingsummary'
						// }]
					});
					var part_log = Ext.create('Ext.tab.Panel', {
						id : 'part_log',
						renderTo : 'finishgood_logistic',
						autoHeight: true,
						plain: true,
						activeTab: 0,
						width 				: '100%',
						height 				: '100%',
						//height: 295,
						autoScroll: true,
						frame: true,
						//style: 'padding:5px;-background:#157FCC;',
						items: [{
							id : 'show_grid_log_stockcard',
							title: 'STOCKCARD',
								reorderable: false,
								items: [grid_log_stockcard]
							},
							{
								id : 'show_grid_log_shipmenthold',
								title: 'SHIPMENTHOLD',
								reorderable: false,
								items: [grid_log_shipmenthold]
							},
							{
								id : 'show_grid_part_iqc',
								title: 'SCAN IN',
								reorderable: false,
								items		: [grid_log_scan_in]
							},
							{
								id : 'show_grid_log_borrow',
								title: 'BORROW',
								reorderable: false,
								items		: [grid_log_borrow]
							},
							{
								id : 'show_grid_log_vanningplan',
								title: 'VANNING PLAN',
								reorderable: false,
								items		: [grid_log_vanningplan]
							},
							{
								id : 'show_grid_log_scan_out',
								title: 'SCAN OUT',
								reorderable: false,
								items		: [grid_log_scan_out]
							}
						]
					});

		//	=================================================================    POPUP SEARCH DATA    ==========================
			//	Form Search FinishGood
					Ext.create('Ext.form.field.Text',{
							renderTo: finishgood_model,
							width: '100%',
							id: 'finishgood_model',
							name: 'finishgood_model',
							fieldCls	: 'biggertext',
							emptyText	: 'Search Model',
							margins		: '0 6 0 0',
							height 		: 30,
							flex		: 1,
							//value: 'DPX5000BTITA9N',
							value: 'A9K4-V6-650JN',
							listeners	: {
								afterrender : function() {
									this.inputEl.setStyle('text-align', 'center');
									this.inputEl.setStyle('backgroundColor', '#0067AE');
									this.inputEl.setStyle('color', '#fff');
									this.inputEl.setStyle('fontSize', '20px');
								},
								specialkey : function(field, e) {
									if (e.getKey() == 13) {
										var model = Ext.getCmp('finishgood_model').getValue();
										var s_no = Ext.getCmp('finishgood_serial').getValue();
										if (((!model) || (!s_no)) || ((!model) && (!s_no))) {
											Ext.Msg.alert('Warning', 'Model or Serial Number cannot be null !!!');
										} else {
											//Ext.Msg.alert('Model',model);
											//var x = Ext.getCmp('rb').getValue()['src_cat'];
											main_store.proxy.setExtraParam('model', model);
											main_store.proxy.setExtraParam('serial_no', s_no);
											main_store.loadPage(1);
											store_sched.proxy.setExtraParam('src_cat', 'fg');
											store_output.proxy.setExtraParam('src_cat', 'fg');
											// store_proc_smt_output.proxy.setExtraParam('src_cat', 'fg');
											// store_proc_smt_downtime.proxy.setExtraParam('src_cat', 'fg');
											// store_proc_smt_quality.proxy.setExtraParam('model', model);
											// store_proc_smt_quality.proxy.setExtraParam('serial_no', s_no);
											// store_proc_smt_quality.proxy.setExtraParam('src_cat', 'fg');
											// store_proc_smt_quality.loadPage(1);
											// part_mchcal.proxy.setExtraParam('model', model);
											// part_mchcal.proxy.setExtraParam('src_cat', 'fg');
											// part_mchcal.loadPage(1);
											// part_mchnism.proxy.setExtraParam('model', model);
											// part_mchnism.proxy.setExtraParam('src_cat', 'fg');
											// part_mchnism.loadPage(1);
											// part_mchtronics.proxy.setExtraParam('model', model);
											// part_mchtronics.proxy.setExtraParam('src_cat', 'fg');
											// part_mchtronics.loadPage(1);
											/*======== problem info =============*/
											// part_problem_mc.proxy.setExtraParam('model', model);
											// part_problem_mc.proxy.setExtraParam('src_cat', 'fg');
											// part_problem_mc.loadPage(1);
											// qty_problem_mc.proxy.setExtraParam('model', model);
											// qty_problem_mc.proxy.setExtraParam('src_cat', 'fg');
											// qty_problem_mc.loadPage(1);
											// part_problem_iqc.proxy.setExtraParam('model', model);
											// part_problem_iqc.proxy.setExtraParam('src_cat', 'fg');
											// part_problem_iqc.loadPage(1);
											// qty_problem_iqc.proxy.setExtraParam('model', model);
											// qty_problem_iqc.proxy.setExtraParam('src_cat', 'fg');
											// qty_problem_iqc.loadPage(1);
											// part_problem_ma.proxy.setExtraParam('model', model);
											// part_problem_ma.proxy.setExtraParam('src_cat', 'fg');
											// part_problem_ma.loadPage(1);
											// qty_problem_ma.proxy.setExtraParam('model', model);
											// qty_problem_ma.proxy.setExtraParam('src_cat', 'fg');
											// qty_problem_ma.loadPage(1);
											// part_problem_mecha.proxy.setExtraParam('model', model);
											// part_problem_mecha.proxy.setExtraParam('src_cat', 'fg');
											// part_problem_mecha.loadPage(1);
											// qty_problem_mecha.proxy.setExtraParam('model', model);
											// qty_problem_mecha.proxy.setExtraParam('src_cat', 'fg');
											// qty_problem_mecha.loadPage(1);
											/*========* problem info *=============*/
											// store_part_smt_prep.proxy.setExtraParam('src_cat', 'fg');
											// scanin_store.proxy.setExtraParam('src_cat', 'fg');
											// scanout_store.proxy.setExtraParam('src_cat', 'fg');
											// prd_res_store.proxy.setExtraParam('model', model);
											// prd_res_store.proxy.setExtraParam('serial_no', s_no);
											// prd_res_store.proxy.setExtraParam('src_cat', 'fg');
											// prd_res_store.loadPage(1);
											// prd_lost_time.proxy.setExtraParam('line', Ext.getCmp('line_name').getValue());
											// prd_lost_time.proxy.setExtraParam('model', model);
											// scanin_store.proxy.setExtraParam('serial_no', s_no);
											// scanin_store.loadPage(1);
											// scanout_store.proxy.setExtraParam('serial_no', s_no);
											// scanout_store.loadPage(1);
										}
									}
								}
							}
						});
					Ext.create('Ext.form.field.Text',{
						renderTo: finishgood_serial,
						width: '100%',
						id: 'finishgood_serial',
						name: 'finishgood_serial',
						fieldCls	: 'biggertext',
						emptyText	: 'Search Serial',
						margins		: '0 6 0 0',
						height 		: 30,
						flex		: 1,
						//value : '151X0001',
						value : '103X0251',
						listeners	: {
							afterrender : function() {
								this.inputEl.setStyle('text-align', 'center');
								this.inputEl.setStyle('backgroundColor', '#0067AE');
								this.inputEl.setStyle('color', '#fff');
								this.inputEl.setStyle('fontSize', '20px');
							},
							specialkey : function(field, e) {
								if (e.getKey() == 13) {
									var model = Ext.getCmp('finishgood_model').getValue();
									var s_no = Ext.getCmp('finishgood_serial').getValue();
									if (((!model) || (!s_no)) || ((!model) && (!s_no))) {
										Ext.Msg.alert('Warning', 'Model or Serial Number cannot be null !!!');
										//alert(model + s_no);
									} else {
						 						//Ext.Msg.alert('Model',model);
										//var x = Ext.getCmp('rb').getValue()['src_cat'];
										main_store.proxy.setExtraParam('model', model);
										main_store.proxy.setExtraParam('serial_no', s_no);
										main_store.loadPage(1);
										store_sched.proxy.setExtraParam('src_cat', 'fg');
										store_output.proxy.setExtraParam('src_cat', 'fg');

										//	store_proc_smt_output.proxy.setExtraParam('src_cat', 'fg');
										//	store_proc_smt_downtime.proxy.setExtraParam('src_cat', 'fg');
										store_proc_smt_quality.proxy.setExtraParam('model', model); // _Z_ by zaki20161017
										store_proc_smt_quality.proxy.setExtraParam('serial_no', s_no); // _Z_ by zaki20161017
										store_proc_smt_quality.proxy.setExtraParam('src_cat', 'fg'); // _Z_ by zaki20161017
										store_proc_smt_quality.loadPage(1);
										part_mchcal.proxy.setExtraParam('model', model); // _Z_ by zaki 20161031
										part_mchcal.proxy.setExtraParam('src_cat', 'fg'); // _Z_ by zaki 20161031
										part_mchcal.loadPage(1); // _Z_ by zaki 20161031
										part_mchnism.proxy.setExtraParam('model', model); // _Z_ by zaki 20161031
										part_mchnism.proxy.setExtraParam('src_cat', 'fg'); // _Z_ by zaki 20161031
										part_mchnism.loadPage(1); // _Z_ by zaki 20161031
										part_mchtronics.proxy.setExtraParam('model', model); // _Z_ by zaki 20161031
										part_mchtronics.proxy.setExtraParam('src_cat', 'fg'); // _Z_ by zaki 20161031
										part_mchtronics.loadPage(1); // _Z_ by zaki 20161031
										/*======== problem info =============*/
										part_problem_mc.proxy.setExtraParam('model', model); // _Z_ by zaki 20161031
										part_problem_mc.proxy.setExtraParam('src_cat', 'fg'); // _Z_ by zaki 20161031
										part_problem_mc.loadPage(1); // _Z_ by zaki 20161031
										qty_problem_mc.proxy.setExtraParam('model', model); // _Z_ by zaki 20161031
										qty_problem_mc.proxy.setExtraParam('src_cat', 'fg'); // _Z_ by zaki 20161031
										qty_problem_mc.loadPage(1); // _Z_ by zaki 20161031
										part_problem_iqc.proxy.setExtraParam('model', model); // _Z_ by zaki 20161031
										part_problem_iqc.proxy.setExtraParam('src_cat', 'fg'); // _Z_ by zaki 20161031
										part_problem_iqc.loadPage(1); // _Z_ by zaki 20161031
										qty_problem_iqc.proxy.setExtraParam('model', model); // _Z_ by zaki 20161031
										qty_problem_iqc.proxy.setExtraParam('src_cat', 'fg'); // _Z_ by zaki 20161031
										qty_problem_iqc.loadPage(1); // _Z_ by zaki 20161031
										part_problem_ma.proxy.setExtraParam('model', model); // _Z_ by zaki 20161031
										part_problem_ma.proxy.setExtraParam('src_cat', 'fg'); // _Z_ by zaki 20161031
										part_problem_ma.loadPage(1); // _Z_ by zaki 20161031
										qty_problem_ma.proxy.setExtraParam('model', model); // _Z_ by zaki 20161031
										qty_problem_ma.proxy.setExtraParam('src_cat', 'fg'); // _Z_ by zaki 20161031
										qty_problem_ma.loadPage(1); // _Z_ by zaki 20161031
										part_problem_mecha.proxy.setExtraParam('model', model); // _Z_ by zaki 20161031
										part_problem_mecha.proxy.setExtraParam('src_cat', 'fg'); // _Z_ by zaki 20161031
										part_problem_mecha.loadPage(1); // _Z_ by zaki 20161031
										qty_problem_mecha.proxy.setExtraParam('model', model); // _Z_ by zaki 20161031
										qty_problem_mecha.proxy.setExtraParam('src_cat', 'fg'); // _Z_ by zaki 20161031
										qty_problem_mecha.loadPage(1);
										/*========* problem info *=============*/
										store_part_smt_prep.proxy.setExtraParam('src_cat', 'fg');
										scanin_store.proxy.setExtraParam('src_cat', 'fg');
										scanout_store.proxy.setExtraParam('src_cat', 'fg');
										prd_res_store.proxy.setExtraParam('model', model);
										prd_res_store.proxy.setExtraParam('serial_no', s_no);
										prd_res_store.proxy.setExtraParam('src_cat', 'fg');
										prd_res_store.loadPage(1);
										scanin_store.proxy.setExtraParam('serial_no', s_no);
										scanin_store.loadPage(1);
										scanout_store.proxy.setExtraParam('serial_no', s_no);
										scanout_store.loadPage(1);
									}
								}
							}
						}
					});
		//	==** end **==

	});


</script>
