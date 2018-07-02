<script type="text/javascript">
Ext.Loader.setConfig({
	enabled: true
});
Ext.Loader.setPath('Ext.ux','../extjs-4.2.2/examples/ux/');
//Ext.Loader.setPath('Ext.ux', '../framework/extjs-6.2.0/packages/ux/classic/src/');
Ext.require(['Ext.selection.CellModel', 'Ext.ux.grid.FiltersFeature', 'Ext.ux.ajax.JsonSimlet', 'Ext.ux.ajax.SimManager']);
Ext.override(Ext.form.TextField, {
	enableKeyEvents: true,
	onKeyUp: function(e, o) {
		var value = this.getValue().toUpperCase();
		this.setValue(value);
		this.fireEvent('keyup', this, e);
	}
});
Ext.onReady(function() {
	// setup the state provider, all state information will be saved to a cookie
	// Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
	// configure whether filter query is encoded or not (initially)
	var encode = false;
	// configure whether filtering is performed locally or remotely (initially)
	var local = true;
	var filters = {
		ftype: 'filters',
		// encode and local configuration options defined previously for easier reuse
		encode: encode, // json encode the filter query
		local: local, // defaults to false (remote filtering)
		/*
		// Filters are most naturally placed in the column definition, but can also be
		// added here.
		filters: [{
			type: 'boolean',
			dataIndex: 'visible'
		}]
		*/
	};
	// cell selection or editing
	var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
		clicksToEdit: 1
	});
	// function mode for part im navigation
	function mode(val) {
		if (val == "Mode2") {
			return '<font class="upsize">CHANGE PART</font>';
		} else if (val === "Mode3") {
			return '<font class="upsize">CHECK PART NON SEQUENTIAL</font>';
		} else if (val === "Mode4") {
			return '<font class="upsize">CHECK PART SEQUENTIAL</font>';
		} else {
			return '<font class="upsize">CHANGE FEEDER</font>';
		}
	}
	//-----------------------------------//
	Ext.QuickTips.init();
	// Add the additional 'advanced' VTypes
	Ext.apply(Ext.form.field.VTypes, {
		daterange: function(val, field) {
			var date = field.parseDate(val);
			if (!date) {
				return false;
			}
			if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
				var start = field.up('form').down('#' + field.startDateField);
				start.setMaxValue(date);
				start.validate();
				this.dateRangeMax = date;
			} else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
				var end = field.up('form').down('#' + field.endDateField);
				end.setMinValue(date);
				end.validate();
				this.dateRangeMin = date;
			}
			/*
			 * Always return true since we're only using this vtype to set the
			 * min/max allowed values (these are tested for after the vtype test)
			 */
			return true;
		},
		daterangeText: 'Start date must be less than end date'
	});
	//	function untuk fontsize grid
	function upsize(val) {
		return '<font class="upsize">' + val + '</font>';
	}

	function problem_status(val) {
		if (VAL = '0') return '<font class="upsize" style="color: red !important;">OPEN</font>';
		else return '<font class="upsize" style="color: green !important;">CLOSE</font>';
	}

	function content(val) {
		return '<font size="2" style="font-family:sans-serif; white-space:normal;">' + Ext.String.ellipsis(val, 250, false) + '</font>';
	}
	//	end function untuk column bigsize
	var itemperpage = 5;
	//------------Sample Store-------------//
	Ext.define('main_data', {
		extend: 'Ext.data.Model',
		fields: ['line_name', 'prod_date', 'host_ip', 'model_name', 'prod_no', 'lot_size', 'start_serial', 'serial_no_id', 'serial_id', 'mecha_model', 'mecha_lot']
	});
	Ext.define('sched_data', {
		extend: 'Ext.data.Model',
		fields: ['prod_date', 'line_name', 'model_name', 'prod_no', 'lot_size', 'start_serial', 'serial_id']
	});
	Ext.define('output_data', {
		extend: 'Ext.data.Model',
		fields: ['prod_date', 'line_name', 'model_name', 'shift', 'output', 'stime']
	});
	Ext.define('prd_res_data', {
		extend: 'Ext.data.Model',
		fields: ['tgl', 'bln', 'thn', 'date', 'line_name', 'shift', 'model_name', 'lot', 'prod_no', 'st_serial', 'serial_output', 'symptom', 'def_cause', 'p_disposal', 'responsible']
	});
	Ext.define('prd_lost_time', {
		extend: 'Ext.data.Model',
		fields: ['date_id', 'line_name', 'model_name', 'lost_detail', 'responsible', 'prod_no', 'time_start', 'time_end', 'shift', 'dept']
	});
	Ext.define('mecha_lost_time', {
		extend: 'Ext.data.Model',
		fields: ['date_id', 'line_name', 'model_name', 'lost_detail', 'responsible', 'prod_no', 'time_start', 'time_end', 'shift', 'dept']
	});
	Ext.define('mecha_res_data', {
		extend: 'Ext.data.Model',
		fields: ['tgl', 'bln', 'thn', 'date', 'line_name', 'shift', 'model_name', 'lot', 'prod_no', 'st_serial', 'serial_output', 'symptom', 'def_cause', 'p_disposal', 'responsible']
	});
	Ext.define('mecha_output', {
		extend: 'Ext.data.Model',
		fields: ['prod_date', 'line_name', 'model_name', 'shift', 'output', 'stime']
	});
	Ext.define('im_output', {
		extend: 'Ext.data.Model',
		fields: ['prod_date', 'line_name', 'model_name', 'pwb', 'process', 'shift', 'output', 'stime']
	});
	Ext.define('im_downtime', {
		extend: 'Ext.data.Model',
		fields: ['id', 'line_name', 'date_id', 'e_date_id', 'duration', 'downtime', 'shift', 'confirm', 'err_code', 'bn', 'model_name', 'pwb_name', 'process', 'start_serial', 'reason', 'cause1', 'cause2', 'cause3', 'cause4']
	});
	Ext.define('im_quality', {
		extend: 'Ext.data.Model',
		fields: ['inputid', 'dateid', 'group', 'shift', 'mch', 'model_name', 'start_serial', 'serial_no', 'lot_no', 'lot_qty', 'pcb_name', 'pwb_no', 'process', 'ai', 'smt', 'loc', 'ng', 'magazineno', 'boardke', 'boardqty', 'pointqty', 'inputdate']
	});
	Ext.define('scanin_model', {
		extend: 'Ext.data.Model',
		fields: ['model_name', 'serialno_id', 'start_serial', 'scandate', 'inputdate', 'updatedate']
	});
	Ext.define('scanout_model', {
		extend: 'Ext.data.Model',
		fields: ['model_name', 'serialno_id', 'scandate', 'inputdate', 'updatedate']
	});
	Ext.define('fgsum_model', {
		extend: 'Ext.data.Model',
		fields: ['model_name', 'allstock', 'tmpstock', 'tmpstock_sc', 'readystock', 'holdstock']
	});
	Ext.define('part_im', {
		extend: 'Ext.data.Model',
		fields: ['jobdate', 'jobtime', 'line', 'model_name', 'pwb_name', 'start_serial', 'lot', 'zfeeder', 'part_no', 'demand']
	});
	Ext.define('part_im_zdbs', {
		extend: 'Ext.data.Model',
		fields: ['place', 'mode', 'feeder', 'compid1', 'compid2', 'model', 'scandate', 'partno', 'lot']
	});
	Ext.define('part_mc_issue', {
		extend: 'Ext.data.Model',
		fields: ['so', 'partno', 'partname', 'po', 'reqqty', 'scanqty', 'lot', 'line', 'model_name', 'issdate']
	});
	Ext.define('part_mchcal', {
		extend: 'Ext.data.Model',
		fields: ['symptom', 'probcause', 'model', 'line', 'shift', 'part_no', 'part_name', 'supplier', 'rejectqty', 'filepicture', 'corrmethod', 'mp', 'duration', 'total', 'actionsupp', 'status', 'remark', 'action_user', 'input_date', 'vw_inputdate', 'id']
	});
	Ext.define('part_mchnism', {
		extend: 'Ext.data.Model',
		fields: ['symptom', 'probcause', 'model', 'line', 'shift', 'part_no', 'part_name', 'supplier', 'rejectqty', 'filepicture', 'corrmethod', 'mp', 'duration', 'total', 'actionsupp', 'status', 'remark', 'action_user', 'input_date', 'vw_inputdate', 'id']
	});
	Ext.define('part_mchtronics', {
		extend: 'Ext.data.Model',
		fields: ['symptom', 'probcause', 'model', 'line', 'shift', 'part_no', 'part_name', 'supplier', 'rejectqty', 'filepicture', 'corrmethod', 'mp', 'duration', 'total', 'actionsupp', 'status', 'remark', 'action_user', 'input_date', 'vw_inputdate', 'id']
	});
	/*=========== problem info ============*/
	Ext.define('part_problem_mc', {
		extend: 'Ext.data.Model',
		fields: ['id_part', 'line', 'shift', 'prod_date', 'div', 'dept', 'model_name', 'lotno', 'part_name', 'partno', 'shortage_qty', 'supplier_name', 'id_resp', 'resp', 'comment', 'paging', 'line_from', 'read_status', 'input_userid', 'input_nik', 'id_condition', 'condition']
	});
	Ext.define('qty_problem_mc', {
		extend: 'Ext.data.Model',
		fields: ['id_quality', 'prod_date', 'div', 'dept', 'line', 'shift', 'model', 'lot_no', 'id_symptom', 'symptom', 'id_defcause', 'defcause', 'reject', 'id_resp', 'read_status', 'input_userid', 'input_nik', 'id_condition', 'condition']
	});
	Ext.define('part_problem_iqc', {
		extend: 'Ext.data.Model',
		fields: ['id_part', 'line', 'shift', 'prod_date', 'div', 'dept', 'model_name', 'lotno', 'part_name', 'partno', 'shortage_qty', 'supplier_name', 'id_resp', 'resp', 'comment', 'paging', 'line_from', 'read_status', 'input_userid', 'input_nik', 'id_condition', 'condition']
	});
	Ext.define('qty_problem_iqc', {
		extend: 'Ext.data.Model',
		fields: ['id_quality', 'prod_date', 'div', 'dept', 'line', 'shift', 'model', 'lot_no', 'id_symptom', 'symptom', 'id_defcause', 'defcause', 'reject', 'id_resp', 'read_status', 'input_userid', 'input_nik', 'id_condition', 'condition']
	});
	Ext.define('part_problem_ma', {
		extend: 'Ext.data.Model',
		fields: ['id_part', 'line', 'shift', 'prod_date', 'div', 'dept', 'model_name', 'lotno', 'part_name', 'partno', 'shortage_qty', 'supplier_name', 'id_resp', 'resp', 'comment', 'paging', 'line_from', 'read_status', 'input_userid', 'input_nik', 'id_condition', 'condition']
	});
	Ext.define('qty_problem_ma', {
		extend: 'Ext.data.Model',
		fields: ['id_quality', 'prod_date', 'div', 'dept', 'line', 'shift', 'model', 'lot_no', 'id_symptom', 'symptom', 'id_defcause', 'defcause', 'reject', 'id_resp', 'read_status', 'input_userid', 'input_nik', 'id_condition', 'condition']
	});
	Ext.define('part_problem_mecha', {
		extend: 'Ext.data.Model',
		fields: ['id_part', 'line', 'shift', 'prod_date', 'div', 'dept', 'model_name', 'lotno', 'part_name', 'partno', 'shortage_qty', 'supplier_name', 'id_resp', 'resp', 'comment', 'paging', 'line_from', 'read_status', 'input_userid', 'input_nik', 'id_condition', 'condition']
	});
	Ext.define('qty_problem_mecha', {
		extend: 'Ext.data.Model',
		fields: ['id_quality', 'prod_date', 'div', 'dept', 'line', 'shift', 'model', 'lot_no', 'id_symptom', 'symptom', 'id_defcause', 'defcause', 'reject', 'id_resp', 'read_status', 'input_userid', 'input_nik', 'id_condition', 'condition']
	});
	/*===========* problem info *============*/
	var main_store = Ext.create('Ext.data.Store', {
		model: 'main_data',
		//autoLoad: false,
		pageSize: itemperpage,
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
					var serialno_id = store.getAt(0).get('serial_no_id');
					var mecha_model = store.getAt(0).get('mecha_model');
					var mecha_lot = store.getAt(0).get('mecha_lot');
					Ext.getCmp('line_name').setValue(line);
					sched_store.proxy.setExtraParam('line', line);
					sched_store.proxy.setExtraParam('model', model);
					sched_store.proxy.setExtraParam('prod_no', prodno);
					sched_store.proxy.setExtraParam('serial_no', serial_no);
					sched_store.proxy.setExtraParam('serial_id', serial_id);
					sched_store.loadPage(1);
					output_store.proxy.setExtraParam('model', model);
					output_store.proxy.setExtraParam('prod_no', prodno);
					output_store.proxy.setExtraParam('lot_size', lot_size);
					output_store.proxy.setExtraParam('st_serial', serial_no);
					output_store.loadPage(1);
					prd_lost_time.proxy.setExtraParam('prod_date', prod_date);
					prd_lost_time.proxy.setExtraParam('line', line);
					prd_lost_time.loadPage(1);
					mecha_res_store.proxy.setExtraParam('mecha_model', mecha_model);
					mecha_res_store.proxy.setExtraParam('mecha_lot', mecha_lot);
					mecha_res_store.loadPage(1);
					mecha_lost_time.proxy.setExtraParam('prod_date', prod_date);
					mecha_output.proxy.setExtraParam('mecha_model', mecha_model);
					mecha_output.proxy.setExtraParam('mecha_lot', mecha_lot);
					mecha_output.loadPage(1);
					im_output.proxy.setExtraParam('model', model);
					im_output.proxy.setExtraParam('prod_no', prodno);
					im_output.proxy.setExtraParam('lot_size', lot_size);
					im_output.proxy.setExtraParam('st_serial', serial_no);
					im_output.proxy.setExtraParam('prod_date', prod_date);
					im_output.loadPage(1);
					im_downtime.proxy.setExtraParam('prod_date', prod_date);
					im_downtime.proxy.setExtraParam('model', model);
					im_downtime.proxy.setExtraParam('st_serial', serial_no);
					im_downtime.loadPage(1);
					im_quality.proxy.setExtraParam('prod_date', prod_date);
					im_quality.proxy.setExtraParam('model', model);
					im_quality.proxy.setExtraParam('st_serial', serial_no);
					//im_quality.proxy.setExtraParam('serial_no', serialno_id);
					im_quality.loadPage(1);
					part_im.proxy.setExtraParam('prod_date', prod_date);
					part_im.proxy.setExtraParam('model', model);
					part_im.proxy.setExtraParam('st_serial', serial_no);
					part_im.loadPage(1);
					part_mchcal.proxy.setExtraParam('prod_date', prod_date);
					part_mchcal.proxy.setExtraParam('model', model);
					part_mchcal.loadPage(1);
					part_mchnism.proxy.setExtraParam('prod_date', prod_date);
					part_mchnism.proxy.setExtraParam('model', model);
					part_mchnism.loadPage(1);
					part_mchtronics.proxy.setExtraParam('prod_date', prod_date);
					part_mchtronics.proxy.setExtraParam('model', model);
					part_mchtronics.loadPage(1);
					part_im_zdbs.proxy.setExtraParam('prod_date', prod_date);
					part_im_zdbs.proxy.setExtraParam('model', model);
					part_im_zdbs.loadPage(1);
					part_mc_issue.proxy.setExtraParam('prod_date', prod_date);
					part_mc_issue.proxy.setExtraParam('model', model);
					part_mc_issue.proxy.setExtraParam('prod_no', prodno);
					part_mc_issue.loadPage(1);
					scanin_store.proxy.setExtraParam('model', model);
					scanin_store.proxy.setExtraParam('prod_no', prodno);
					scanin_store.proxy.setExtraParam('serialno_id', serialno_id);
					scanin_store.loadPage(1);
					scanout_store.proxy.setExtraParam('model', model);
					scanout_store.proxy.setExtraParam('prod_no', prodno);
					scanout_store.proxy.setExtraParam('serialno_id', serialno_id);
					scanout_store.loadPage(1);
					fgsum_store.proxy.setExtraParam('model', model);
					fgsum_store.loadPage(1);
				} else {
					Ext.Msg.alert('Warning', 'No Data Found ! <br> Please try again with the correct Model and Serial Number.');
				}
			}
		}
	});
	var sched_store = Ext.create('Ext.data.Store', {
		model: 'sched_data',
		autoLoad: false,
		pageSize: itemperpage,
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
	var output_store = Ext.create('Ext.data.Store', {
		model: 'output_data',
		autoLoad: false,
		pageSize: itemperpage,
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
	var prd_res_store = Ext.create('Ext.data.Store', {
		model: 'prd_res_data',
		autoLoad: false,
		pageSize: itemperpage,
		proxy: {
			type: 'ajax',
			url: 'json/json_prd_res.php',
			reader: {
				type: 'json',
				root: 'rows',
				totalProperty: 'totalCount'
			}
		}
	});
	var prd_lost_time = Ext.create('Ext.data.Store', {
		model: 'prd_lost_time',
		autoLoad: false,
		//buffered: true,
		//purgePageCount		: 0,
		pageSize: itemperpage,
		//leadingBufferZone	: itemperpage,
		proxy: {
			type: 'ajax',
			url: 'json/json_prd_losttime.php',
			reader: {
				type: 'json',
				root: 'rows',
				totalProperty: 'totalCount'
			}
		}
	});
	var mecha_res_store = Ext.create('Ext.data.Store', {
		model: 'mecha_res_data',
		autoLoad: false,
		pageSize: itemperpage,
		proxy: {
			type: 'ajax',
			url: 'json/json_mecha_res.php',
			reader: {
				type: 'json',
				root: 'rows',
				totalProperty: 'totalCount'
			}
		},
		listeners: {
			load: function(store, records) {
				var mecha_model = store.getAt(0).get('model_name');
				var mecha_prodno = store.getAt(0).get('prod_no');
				mecha_lost_time.proxy.setExtraParam('model', mecha_model);
				mecha_lost_time.proxy.setExtraParam('prod_no', mecha_prodno);
				mecha_lost_time.loadPage(1);
			}
		}
	});
	var mecha_lost_time = Ext.create('Ext.data.Store', {
		model: 'mecha_lost_time',
		autoLoad: false,
		pageSize: itemperpage,
		proxy: {
			type: 'ajax',
			url: 'json/json_mecha_losttime.php',
			reader: {
				type: 'json',
				root: 'rows',
				totalProperty: 'totalCount'
			}
		}
	});
	var mecha_output = Ext.create('Ext.data.Store', {
		model: 'mecha_output',
		autoLoad: false,
		pageSize: itemperpage,
		proxy: {
			type: 'ajax',
			url: 'json/json_mecha_out.php',
			reader: {
				type: 'json',
				root: 'rows',
				totalProperty: 'totalCount'
			}
		}
	});
	var im_output = Ext.create('Ext.data.Store', {
		model: 'im_output',
		autoLoad: false,
		pageSize: itemperpage,
		proxy: {
			type: 'ajax',
			url: 'json/json_im_output.php',
			reader: {
				type: 'json',
				root: 'rows',
				totalProperty: 'totalCount'
			}
		}
	});
	var im_downtime = Ext.create('Ext.data.Store', {
		model: 'im_downtime',
		autoLoad: false,
		pageSize: itemperpage,
		proxy: {
			type: 'ajax',
			url: 'json/json_im_downtime.php',
			reader: {
				type: 'json',
				root: 'rows',
				totalProperty: 'totalCount'
			}
		}
	});
	var im_quality = Ext.create('Ext.data.Store', { //zaki 20161017 _Z_
		model: 'im_quality',
		autoLoad: false,
		proxy: {
			type: 'ajax',
			url: 'json/json_im_quality.php',
			reader: {
				type: 'json',
				root: 'rows',
				totalProperty: 'totalCount'
			}
		}
	});
	var scanin_store = Ext.create('Ext.data.Store', {
		model: 'scanin_model',
		autoLoad: false,
		pageSize: itemperpage,
		proxy: {
			type: 'ajax',
			url: 'json/json_scanin.php',
			reader: {
				type: 'json',
				root: 'rows',
				totalProperty: 'totalCount'
			}
		}
	});
	var scanout_store = Ext.create('Ext.data.Store', {
		model: 'scanout_model',
		autoLoad: false,
		pageSize: itemperpage,
		proxy: {
			type: 'ajax',
			url: 'json/json_scanout.php',
			reader: {
				type: 'json',
				root: 'rows',
				totalProperty: 'totalCount'
			}
		}
	});
	var fgsum_store = Ext.create('Ext.data.Store', {
		model: 'fgsum_model',
		autoLoad: false,
		pageSize: itemperpage,
		proxy: {
			type: 'ajax',
			url: 'json/json_fgsummary.php',
			reader: {
				type: 'json',
				root: 'rows',
				totalProperty: 'totalCount'
			}
		}
	});
	var part_im = Ext.create('Ext.data.Store', {
		model: 'part_im',
		autoLoad: false,
		pageSize: itemperpage,
		proxy: {
			type: 'ajax',
			url: 'json/json_part_im.php',
			reader: {
				type: 'json',
				root: 'rows',
				totalProperty: 'totalCount'
			}
		}
	});
	var part_im_zdbs = Ext.create('Ext.data.Store', {
		model: 'part_im_zdbs',
		autoLoad: false,
		pageSize: itemperpage,
		proxy: {
			type: 'ajax',
			url: 'json/json_part_im_zdbs.php',
			reader: {
				type: 'json',
				root: 'rows',
				totalProperty: 'totalCount'
			}
		}
	});
	var part_mc_issue = Ext.create('Ext.data.Store', {
		model: 'part_mc_issue',
		autoLoad: false,
		pageSize: itemperpage,
		//groupField	: 'partno',
		proxy: {
			type: 'ajax',
			url: 'json/json_part_mcis.php',
			reader: {
				type: 'json',
				root: 'rows',
				totalProperty: 'totalCount'
			}
		}
	});
	var part_mchcal = Ext.create('Ext.data.Store', {
		model: 'part_mchcal',
		autoLoad: false,
		//pageSize: itemperpage,
		proxy: {
			type: 'ajax',
			url: 'json/json_part_mechanical.php',
			reader: {
				type: 'json',
				root: 'rows',
				//    totalProperty  : 'totalCount'
			}
		}
	});
	var part_mchnism = Ext.create('Ext.data.Store', {
		model: 'part_mchnism',
		autoLoad: false,
		//pageSize: itemperpage,
		proxy: {
			type: 'ajax',
			url: 'json/json_part_mechanism.php',
			reader: {
				type: 'json',
				root: 'rows',
				//    totalProperty  : 'totalCount'
			}
		}
	});
	var part_mchtronics = Ext.create('Ext.data.Store', {
		model: 'part_mchtronics',
		autoLoad: false,
		//pageSize: itemperpage,
		proxy: {
			type: 'ajax',
			url: 'json/json_part_mechatronics.php',
			reader: {
				type: 'json',
				root: 'rows',
				//    totalProperty  : 'totalCount'
			}
		}
	});
	/*=========== PROBLEM INFO =======================*/
	var part_problem_mc = Ext.create('Ext.data.Store', { //zaki 20161017 _Z_
		model: 'part_problem_mc',
		autoLoad: false,
		proxy: {
			type: 'ajax',
			url: 'json/json_part_problem_mc.php',
			reader: {
				type: 'json',
				root: 'rows'
			}
		}
	});
	var qty_problem_mc = Ext.create('Ext.data.Store', { //zaki 20161017 _Z_
		model: 'qty_problem_mc',
		autoLoad: false,
		proxy: {
			type: 'ajax',
			url: 'json/json_qty_problem_mc.php',
			reader: {
				type: 'json',
				root: 'rows'
			}
		}
	});
	var part_problem_iqc = Ext.create('Ext.data.Store', { //zaki 20161017 _Z_
		model: 'part_problem_iqc',
		autoLoad: false,
		proxy: {
			type: 'ajax',
			url: 'json/json_part_problem_iqc.php',
			reader: {
				type: 'json',
				root: 'rows'
			}
		}
	});
	var qty_problem_iqc = Ext.create('Ext.data.Store', { //zaki 20161017 _Z_
		model: 'qty_problem_iqc',
		autoLoad: false,
		proxy: {
			type: 'ajax',
			url: 'json/json_qty_problem_iqc.php',
			reader: {
				type: 'json',
				root: 'rows'
			}
		}
	});
	var part_problem_ma = Ext.create('Ext.data.Store', { //zaki 20161017 _Z_
		model: 'part_problem_ma',
		autoLoad: false,
		proxy: {
			type: 'ajax',
			url: 'json/json_part_problem_ma.php',
			reader: {
				type: 'json',
				root: 'rows'
			}
		}
	});
	var qty_problem_ma = Ext.create('Ext.data.Store', { //zaki 20161017 _Z_
		model: 'qty_problem_ma',
		autoLoad: false,
		proxy: {
			type: 'ajax',
			url: 'json/json_qty_problem_ma.php',
			reader: {
				type: 'json',
				root: 'rows'
			}
		}
	});
	var part_problem_mecha = Ext.create('Ext.data.Store', { //zaki 20161017 _Z_
		model: 'part_problem_mecha',
		autoLoad: false,
		proxy: {
			type: 'ajax',
			url: 'json/json_part_problem_mecha.php',
			reader: {
				type: 'json',
				root: 'rows'
			}
		}
	});
	var qty_problem_mecha = Ext.create('Ext.data.Store', { //zaki 20161017 _Z_
		model: 'qty_problem_mecha',
		autoLoad: false,
		proxy: {
			type: 'ajax',
			url: 'json/json_qty_problem_mecha.php',
			reader: {
				type: 'json',
				root: 'rows'
			}
		}
	});
	/*===========* PROBLEM INFO *=======================*/
	//-----------------------------------//
	//~~~~~~~~~~~~~~~~~~~~~~Single Part~~~~~~~~~~~~~~~~~~~~//
	Ext.define('rcv_partiss', {
		extend: 'Ext.data.Model',
		fields: ['so', 'partno', 'partname', 'po', 'reqqty', 'scanqty', 'lot', 'line', 'model_name', 'issdate']
	});
	var rcv_partiss = Ext.create('Ext.data.Store', {
		autoDestroy: true,
		model: 'rcv_partiss',
		autoLoad: false,
		pageSize: 20,
		proxy: {
			type: 'ajax',
			url: 'json/json_part_issue.php',
			reader: {
				type: 'json',
				root: 'rows',
				totalProperty: 'totalCount'
			}
		}
	});
	var sglprt_sched_store = Ext.create('Ext.data.Store', {
		model: 'sched_data',
		autoLoad: false,
		pageSize: itemperpage,
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
	var sglprt_output_store = Ext.create('Ext.data.Store', {
		model: 'output_data',
		autoLoad: false,
		pageSize: itemperpage,
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
	var partimoutset_store = Ext.create('Ext.data.Store', {
		model: 'part_im',
		autoLoad: false,
		pageSize: itemperpage,
		proxy: {
			type: 'ajax',
			url: 'json/json_part_im.php',
			reader: {
				type: 'json',
				root: 'rows',
				totalProperty: 'totalCount'
			}
		}
	});
	var partimnav_store = Ext.create('Ext.data.Store', {
		model: 'part_im_zdbs',
		autoLoad: false,
		pageSize: itemperpage,
		proxy: {
			type: 'ajax',
			url: 'json/json_part_im_zdbs.php',
			reader: {
				type: 'json',
				root: 'rows',
				totalProperty: 'totalCount'
			}
		}
	});
	var procimprodres_store = Ext.create('Ext.data.Store', {
		model: 'im_output',
		autoLoad: false,
		pageSize: itemperpage,
		proxy: {
			type: 'ajax',
			url: 'json/json_im_output.php',
			reader: {
				type: 'json',
				root: 'rows',
				totalProperty: 'totalCount'
			}
		}
	});
	var procimdownrep_store = Ext.create('Ext.data.Store', {
		model: 'im_downtime',
		autoLoad: false,
		pageSize: itemperpage,
		proxy: {
			type: 'ajax',
			url: 'json/json_im_downtime.php',
			reader: {
				type: 'json',
				root: 'rows',
				totalProperty: 'totalCount'
			}
		}
	});
	var procimquality_store = Ext.create('Ext.data.Store', { //_Z_ imquality2nd 20161018
		model: 'im_quality',
		autoLoad: false,
		pageSize: itemperpage,
		proxy: {
			type: 'ajax',
			url: 'json/json_im_quality.php',
			reader: {
				type: 'json',
				root: 'rows',
				totalProperty: 'totalCount'
			}
		}
	});
	var procmaqrep_store = Ext.create('Ext.data.Store', {
		model: 'prd_res_data',
		autoLoad: false,
		pageSize: itemperpage,
		proxy: {
			type: 'ajax',
			url: 'json/json_prd_res.php',
			reader: {
				type: 'json',
				root: 'rows',
				totalProperty: 'totalCount'
			}
		}
	});
	var procmaltr_store = Ext.create('Ext.data.Store', {
		model: 'prd_lost_time',
		autoLoad: false,
		pageSize: itemperpage,
		proxy: {
			type: 'ajax',
			url: 'json/json_prd_losttime.php',
			reader: {
				type: 'json',
				root: 'rows',
				totalProperty: 'totalCount'
			}
		}
	});
	var fg_scanin_store = Ext.create('Ext.data.Store', {
		model: 'scanin_model',
		autoLoad: false,
		pageSize: itemperpage,
		proxy: {
			type: 'ajax',
			url: 'json/json_scanin.php',
			reader: {
				type: 'json',
				root: 'rows',
				totalProperty: 'totalCount'
			}
		}
	});
	var fg_scanout_store = Ext.create('Ext.data.Store', {
		model: 'scanout_model',
		autoLoad: false,
		pageSize: itemperpage,
		proxy: {
			type: 'ajax',
			url: 'json/json_scanout.php',
			reader: {
				type: 'json',
				root: 'rows',
				totalProperty: 'totalCount'
			}
		}
	});
	var part_fgsum_store = Ext.create('Ext.data.Store', {
		model: 'fgsum_model',
		autoLoad: false,
		pageSize: itemperpage,
		proxy: {
			type: 'ajax',
			url: 'json/json_fgsummary.php',
			reader: {
				type: 'json',
				root: 'rows',
				totalProperty: 'totalCount'
			}
		}
	});
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
	var clock = Ext.create('Ext.toolbar.TextItem', {
		text: Ext.Date.format(new Date(), 'M, D-Y g:i:s A'),
		style: 'color:#157FCC;font-size:12px;'
	});
	var clock2 = Ext.create('Ext.toolbar.TextItem', {
		text: Ext.Date.format(new Date(), 'M, D-Y g:i:s A'),
		style: 'color:#157FCC;font-size:12px;'
	});
	var clock3 = Ext.create('Ext.toolbar.TextItem', {
		text: Ext.Date.format(new Date(), 'M, D-Y g:i:s A'),
		style: 'color:#157FCC;font-size:12px;'
	});
	var clock4 = Ext.create('Ext.toolbar.TextItem', {
		text: Ext.Date.format(new Date(), 'M, D-Y g:i:s A'),
		style: 'color:#157FCC;font-size:12px;'
	});
	// --> Main grid
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
			header: 'Line Name',
			dataIndex: 'line_name',
			width: 100,
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
			width: 100,
			renderer: upsize
		}, {
			header: 'Lot Size',
			dataIndex: 'lot_size',
			width: 100,
			renderer: upsize
		}, {
			header: 'Start Serial',
			dataIndex: 'start_serial',
			width: 100,
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
	//-----------------------------------------//
	// --> Output Count
	var outcount = Ext.create('Ext.grid.Panel', {
		title: 'ACTUAL',
		width: '50%',
		height: '100%',
		store: output_store,
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
			renderer: upsize,
			summaryRenderer: function() {
				return 'Output :'
			}
		}, {
			header: 'First Output',
			dataIndex: 'stime',
			width: 100,
			renderer: upsize
		}, {
			header: 'Line Name',
			dataIndex: 'line_name',
			widht: 90,
			renderer: upsize
		}, {
			header: 'Model Name',
			dataIndex: 'model_name',
			width: 130,
			renderer: upsize,
			hidden: true
		}, {
			header: 'Shift',
			dataIndex: 'shift',
			width: 50,
			renderer: upsize
		}, {
			header: 'Output',
			dataIndex: 'output',
			flex: 1,
			renderer: upsize,
			summaryType: 'sum'
		}],
		features: [{
			id: 'linegroup',
			ftype: 'groupingsummary',
			//groupHeaderTpl	: 'Line {name}',
			//startCollapsed	: true
			//hideGroupedHeader: true,
			//enableGroupingMenu: false
		}]
	});
	//-----------------------------------------//
	// --> Schedule
	var schedule = Ext.create('Ext.grid.Panel', {
		title: 'PLAN',
		width: '50%',
		height: '100%',
		store: sched_store,
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
			header: 'Line Name',
			dataIndex: 'line_name',
			width: 90,
			renderer: upsize
		}, {
			header: 'Model Name',
			dataIndex: 'model_name',
			flex: 1,
			renderer: upsize,
			hidden: true
		}, {
			header: 'Prod No',
			dataIndex: 'prod_no',
			width: 90,
			renderer: upsize,
			hidden: true
		}, {
			header: 'Lot Size',
			dataIndex: 'lot_size',
			width: 80,
			renderer: upsize
		}, {
			header: 'Start Serial',
			dataIndex: 'start_serial',
			flex: 1,
			renderer: upsize
		}]
	});
	//-----------------------------------------//
	// --> Grid data Part IM
	var grd_part_im = Ext.create('Ext.grid.Panel', {
		id: 'grd_part_im',
		width: '100%',
		height: 295,
		columnLines: true,
		store: part_im,
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
		features: [filters],
		selModel: {
			selType: 'cellmodel'
		},
		plugins: [cellEditing]
	});
	//-----------------------------------------//
	// --> Grid data IM Zero Defect
	var grd_part_im_zdbs = Ext.create('Ext.grid.Panel', {
		id: 'grd_part_im_zdbs',
		width: '100%',
		height: 295,
		columnLines: true,
		store: part_im_zdbs,
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
		features: [filters],
		selModel: {
			selType: 'cellmodel'
		}
	});
	//-----------------------------------------//
	// --> Grid data IM Output
	var grd_im_output = Ext.create('Ext.grid.Panel', {
		id: 'grd_im_output',
		width: '100%',
		height: 295,
		columnLines: true,
		store: im_output,
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
	//-----------------------------------------//
	// --> Grid data IM Downtime Report
	var grd_im_downtime = Ext.create('Ext.grid.Panel', { //_Z_ Finish good
		id: 'grd_im_downtime',
		width: '100%',
		height: 295,
		columnLines: true,
		store: im_downtime,
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
		features: [{
			ftype: 'filters',
			encode: encode,
			local: local
		}]
	});
	//-----------------------------------------//
	// --> Grid data IM Quality Report ---------------------------// _Z_ created by Zaki 20161017
	var grd_im_quality = Ext.create('Ext.grid.Panel', {
		id: 'grd_im_quality',
		width: '100%',
		height: 295,
		columnLines: true,
		store: im_quality,
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
		features: [{
			ftype: 'filters',
			encode: encode,
			local: local
		}]
	});
	//-----------------------------------------//
	// --> Grid data Prod. Quality Report
	var grd_prd_quality = Ext.create('Ext.grid.Panel', {
		id: 'grd_prd_quality',
		width: '100%',
		height: 295,
		columnLines: true,
		store: prd_res_store,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText: false,
			enableTextSelection: true
		},
		columns: [{
			header: 'Prod. Date',
			dataIndex: 'date',
			width: 100,
			renderer: upsize
		}, {
			header: 'Line Name',
			dataIndex: 'line_name',
			width: 90,
			renderer: upsize,
			hidden: true
		}, {
			header: 'Shift',
			dataIndex: 'shift',
			width: 50,
			renderer: upsize
		}, {
			header: 'Model Name',
			dataIndex: 'model_name',
			width: 130,
			renderer: upsize,
			hidden: true
		}, {
			header: 'Lot Size',
			dataIndex: 'lot',
			width: 70,
			renderer: upsize
		}, {
			header: 'Prod No',
			dataIndex: 'prod_no',
			flex: 1,
			renderer: upsize,
			hidden: true
		}, {
			header: 'Start Serial',
			dataIndex: 'st_serial',
			flex: 1,
			renderer: upsize,
			hidden: true
		}, {
			header: 'SN O/P',
			dataIndex: 'serial_output',
			flex: 1,
			renderer: upsize,
			hidden: true
		}, {
			header: 'Symptom',
			dataIndex: 'symptom',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Defective Cause',
			dataIndex: 'def_cause',
			flex: 1,
			renderer: upsize
		}, {
			header: 'P. Disposal',
			dataIndex: 'p_disposal',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Responsible',
			dataIndex: 'responsible',
			flex: 1,
			renderer: upsize
		}, ],
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
	//-----------------------------------------//
	// --> Grid data Prod. Losttime Report
	var grd_prd_losttime = Ext.create('Ext.grid.Panel', {
		id: 'grd_prd_losttime',
		width: '100%',
		height: 295,
		columnLines: true,
		store: prd_lost_time,
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
	//-----------------------------------------//
	// --> Grid data Mecha Quality Report
	var grd_mecha_quality = Ext.create('Ext.grid.Panel', {
		id: 'grd_mecha_quality',
		width: '100%',
		height: 295,
		columnLines: true,
		store: mecha_res_store,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText: false,
			enableTextSelection: true
		},
		columns: [{
			header: 'Prod. Date',
			dataIndex: 'date',
			width: 100,
			renderer: upsize
		}, {
			header: 'Line Name',
			dataIndex: 'line_name',
			width: 90,
			renderer: upsize
		}, {
			header: 'Shift',
			dataIndex: 'shift',
			width: 50,
			renderer: upsize
		}, {
			header: 'Prod No',
			dataIndex: 'prod_no',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Model Name',
			dataIndex: 'model_name',
			width: 130,
			renderer: upsize
		}, {
			header: 'Lot Size',
			dataIndex: 'lot',
			width: 70,
			renderer: upsize
		}, {
			header: 'Start Serial',
			dataIndex: 'st_serial',
			flex: 1,
			renderer: upsize
		}, {
			header: 'SN O/P',
			dataIndex: 'serial_output',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Symptom',
			dataIndex: 'symptom',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Defective Cause',
			dataIndex: 'def_cause',
			flex: 1,
			renderer: upsize
		}, {
			header: 'P. Disposal',
			dataIndex: 'p_disposal',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Responsible',
			dataIndex: 'responsible',
			flex: 1,
			renderer: upsize
		}, ]
	});
	//-----------------------------------------//
	// --> Grid data Mecha Losttime Report
	var grd_mecha_losttime = Ext.create('Ext.grid.Panel', {
		id: 'grd_mecha_losttime',
		width: '100%',
		height: 295,
		columnLines: true,
		store: mecha_lost_time,
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
			renderer: upsize
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
		}]
	});
	//-----------------------------------------//
	// --> Grid Mecha Output
	var grd_mecha_output = Ext.create('Ext.grid.Panel', {
		id: 'grd_mecha_output',
		width: '100%',
		height: 295,
		store: mecha_output,
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
			header: 'Model Name',
			dataIndex: 'model_name',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Output',
			dataIndex: 'output',
			flex: 1,
			renderer: upsize
		}]
	});
	//-----------------------------------------//
	// --> Grid data MC Issue
	var grd_part_mcissue = Ext.create('Ext.grid.Panel', {
		id: 'grd_part_mcissue',
		width: '100%',
		height: 295,
		columnLines: true,
		store: part_mc_issue,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText: false,
			enableTextSelection: true
		},
		columns: [{
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
		features: [{
			ftype: 'filters',
			encode: encode, // json encode the filter query
			local: local
		}, {
			id: 'group',
			ftype: 'groupingsummary'
		}]
	});
	//-----------------------------------------//
	// --> Grid Scan IN
	var grd_scanin = Ext.create('Ext.grid.Panel', {
		id: 'grd_scanin',
		width: '100%',
		height: 295,
		columnLines: true,
		store: scanin_store,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText: false,
			enableTextSelection: true
		},
		columns: [{
			header: 'NO.',
			xtype: 'rownumberer',
			width: 45,
			sortable: false
		}, {
			header: 'Model Name',
			dataIndex: 'model_name',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Serial No ID',
			dataIndex: 'serialno_id',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Start Serial',
			dataIndex: 'start_serial',
			flex: 1,
			renderer: upsize,
			hidden: true
		}, {
			header: 'Scan Date',
			dataIndex: 'scandate',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Input Date',
			dataIndex: 'inputdate',
			flex: 1,
			renderer: upsize,
			hidden: true
		}, {
			header: 'Update Date',
			dataIndex: 'updatedate',
			flex: 1,
			renderer: upsize,
			hidden: true
		}]
	});
	// --> Grid Scan OUT
	var grd_scanout = Ext.create('Ext.grid.Panel', {
		id: 'grd_scanout',
		width: '100%',
		height: 295,
		columnLines: true,
		store: scanout_store,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText: false,
			enableTextSelection: true
		},
		columns: [{
			header: 'NO.',
			xtype: 'rownumberer',
			width: 45,
			sortable: false
		}, {
			header: 'Model Name',
			dataIndex: 'model_name',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Serial No ID',
			dataIndex: 'serialno_id',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Scan Date',
			dataIndex: 'scandate',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Input Date',
			dataIndex: 'inputdate',
			flex: 1,
			renderer: upsize,
			hidden: true
		}, {
			header: 'Update Date',
			dataIndex: 'updatedate',
			flex: 1,
			renderer: upsize,
			hidden: true
		}]
	});
	// --> Grid Finish Good Summary
	var grd_fgsum = Ext.create('Ext.grid.Panel', {
		id: 'grd_fgsum',
		width: '100%',
		height: 295,
		columnLines: true,
		store: fgsum_store,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText: false,
			enableTextSelection: true
		},
		columns: [{
			header: 'Model Name',
			dataIndex: 'model_name',
			flex: 1,
			renderer: upsize
		}, {
			header: 'All Stock',
			dataIndex: 'allstock',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Before Stockcard',
			dataIndex: 'tmpstock',
			flex: 1,
			renderer: upsize
		}, {
			header: 'After Stockcard',
			dataIndex: 'tmpstock_sc',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Ready Stock',
			dataIndex: 'readystock',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Hold Stock',
			dataIndex: 'holdstock',
			flex: 1,
			renderer: upsize
		}]
	});
	// --> Grid data Part Mechanical
	var grd_part_mchcal = Ext.create('Ext.grid.Panel', {
		id: 'grd_part_mchcal',
		width: '100%',
		height: 295,
		columnLines: true,
		store: part_mchcal,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText: false,
			enableTextSelection: true
		},
		columns: [{
			header: 'input_date',
			dataIndex: 'input_date',
			hidden: true
		}, {
			header: 'id',
			dataIndex: 'id',
			hidden: true
		}, {
			header: 'STATUS',
			dataIndex: 'status',
			width: 80,
			renderer: status,
			align: 'center'
		}, {
			header: 'PIC',
			dataIndex: 'action_user',
			width: 150,
			renderer: upsize
		}, {
			header: 'DATE INPUT',
			dataIndex: 'vw_inputdate',
			width: 150,
			renderer: upsize,
			align: 'center'
		}, {
			header: 'SYMPTOM',
			dataIndex: 'symptom',
			width: 150,
			renderer: upsize
		}, {
			header: 'PROBLEM AND CAUSE',
			dataIndex: 'probcause',
			width: 250,
			renderer: upsize
		}, {
			header: 'MODEL',
			dataIndex: 'model',
			width: 100,
			renderer: upsize
		}, {
			header: 'OCCURRED PLACE',
			columns: [{
				header: 'LINE',
				dataIndex: 'line',
				width: 70,
				renderer: upsize
			}, {
				header: 'SHIFT',
				dataIndex: 'shift',
				width: 50,
				renderer: upsize
			}]
		}, {
			header: 'PART NO',
			dataIndex: 'part_no',
			width: 150,
			renderer: upsize
		}, {
			header: 'PART NAME',
			dataIndex: 'part_name',
			width: 180,
			renderer: upsize
		}, {
			header: 'SUPPLIER',
			dataIndex: 'supplier',
			width: 200,
			renderer: upsize
		}, {
			header: 'REJECT QTY',
			dataIndex: 'rejectqty',
			width: 80,
			renderer: upsize
		}, {
			header: 'DETAIL PICTURE<BR>(CLICK IMAGE FOR ZOOM)',
			dataIndex: 'filepicture',
			width: 200,
			renderer: fileimage,
			align: 'center'
		}, {
			header: 'CORRECTION & METHOD',
			dataIndex: 'corrmethod',
			width: 500,
			renderer: upsize
		}, {
			header: 'LOSS TIME CORRECTION BY IQC ',
			columns: [{
				header: 'MAN POWER',
				dataIndex: 'mp',
				width: 50,
				renderer: upsize
			}, {
				header: 'TIME (H)',
				dataIndex: 'duration',
				width: 50,
				renderer: upsize
			}, {
				header: 'TOTAL',
				dataIndex: 'total',
				width: 50,
				renderer: upsize
			}]
		}, {
			header: 'ACTION ON SUPLIER',
			dataIndex: 'actionsupp',
			width: 500,
			renderer: upsize
		}, {
			header: 'REMARK',
			dataIndex: 'remark',
			width: 200,
			renderer: upsize
		}],
	});
	//-----------------------------------------//
	// --> Grid data Part Mechanism
	var grd_part_mchnism = Ext.create('Ext.grid.Panel', {
		id: 'grd_part_mchnism',
		width: '100%',
		height: 295,
		columnLines: true,
		store: part_mchnism,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText: false,
			enableTextSelection: true
		},
		columns: [{
			header: 'input_date',
			dataIndex: 'input_date',
			hidden: true
		}, {
			header: 'id',
			dataIndex: 'id',
			hidden: true
		}, {
			header: 'STATUS',
			dataIndex: 'status',
			width: 80,
			renderer: status,
			align: 'center'
		}, {
			header: 'PIC',
			dataIndex: 'action_user',
			width: 150,
			renderer: upsize
		}, {
			header: 'DATE INPUT',
			dataIndex: 'vw_inputdate',
			width: 150,
			renderer: upsize,
			align: 'center'
		}, {
			header: 'SYMPTOM',
			dataIndex: 'symptom',
			width: 150,
			renderer: upsize
		}, {
			header: 'PROBLEM AND CAUSE',
			dataIndex: 'probcause',
			width: 250,
			renderer: upsize
		}, {
			header: 'MODEL',
			dataIndex: 'model',
			width: 100,
			renderer: upsize
		}, {
			header: 'OCCURRED PLACE',
			columns: [{
				header: 'LINE',
				dataIndex: 'line',
				width: 70,
				renderer: upsize
			}, {
				header: 'SHIFT',
				dataIndex: 'shift',
				width: 50,
				renderer: upsize
			}]
		}, {
			header: 'PART NO',
			dataIndex: 'part_no',
			width: 150,
			renderer: upsize
		}, {
			header: 'PART NAME',
			dataIndex: 'part_name',
			width: 180,
			renderer: upsize
		}, {
			header: 'SUPPLIER',
			dataIndex: 'supplier',
			width: 200,
			renderer: upsize
		}, {
			header: 'REJECT QTY',
			dataIndex: 'rejectqty',
			width: 80,
			renderer: upsize
		}, {
			header: 'DETAIL PICTURE<BR>(CLICK IMAGE FOR ZOOM)',
			dataIndex: 'filepicture',
			width: 200,
			renderer: fileimage,
			align: 'center'
		}, {
			header: 'CORRECTION & METHOD',
			dataIndex: 'corrmethod',
			width: 500,
			renderer: upsize
		}, {
			header: 'LOSS TIME CORRECTION BY IQC ',
			columns: [{
				header: 'MAN POWER',
				dataIndex: 'mp',
				width: 50,
				renderer: upsize
			}, {
				header: 'TIME (H)',
				dataIndex: 'duration',
				width: 50,
				renderer: upsize
			}, {
				header: 'TOTAL',
				dataIndex: 'total',
				width: 50,
				renderer: upsize
			}]
		}, {
			header: 'ACTION ON SUPLIER',
			dataIndex: 'actionsupp',
			width: 500,
			renderer: upsize
		}, {
			header: 'REMARK',
			dataIndex: 'remark',
			width: 200,
			renderer: upsize
		}],
	});
	//-----------------------------------------//
	// --> Grid data Part Mechanical
	var grd_part_mchtronics = Ext.create('Ext.grid.Panel', {
		id: 'grd_part_mchtronics',
		width: '100%',
		height: 295,
		columnLines: true,
		store: part_mchtronics,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText: false,
			enableTextSelection: true
		},
		columns: [{
			header: 'input_date',
			dataIndex: 'input_date',
			hidden: true
		}, {
			header: 'id',
			dataIndex: 'id',
			hidden: true
		}, {
			header: 'STATUS',
			dataIndex: 'status',
			idth: 80,
			renderer: status,
			align: 'center'
		}, {
			header: 'PIC',
			dataIndex: 'action_user',
			width: 150,
			renderer: upsize
		}, {
			header: 'DATE INPUT',
			dataIndex: 'vw_inputdate',
			width: 150,
			renderer: upsize,
			align: 'center'
		}, {
			header: 'SYMPTOM',
			dataIndex: 'symptom',
			width: 150,
			renderer: upsize
		}, {
			header: 'PROBLEM AND CAUSE',
			dataIndex: 'probcause',
			width: 250,
			renderer: upsize
		}, {
			header: 'MODEL',
			dataIndex: 'model',
			width: 100,
			renderer: upsize
		}, {
			header: 'OCCURRED PLACE',
			columns: [{
				header: 'LINE',
				dataIndex: 'line',
				width: 70,
				renderer: upsize
			}, {
				header: 'SHIFT',
				dataIndex: 'shift',
				width: 50,
				renderer: upsize
			}]
		}, {
			header: 'PART NO',
			dataIndex: 'part_no',
			width: 150,
			renderer: upsize
		}, {
			header: 'PART NAME',
			dataIndex: 'part_name',
			width: 180,
			renderer: upsize
		}, {
			header: 'SUPPLIER',
			dataIndex: 'supplier',
			width: 200,
			renderer: upsize
		}, {
			header: 'REJECT QTY',
			dataIndex: 'rejectqty',
			width: 80,
			renderer: upsize
		}, {
			header: 'DETAIL PICTURE<BR>(CLICK IMAGE FOR ZOOM)',
			dataIndex: 'filepicture',
			width: 200,
			renderer: fileimage,
			align: 'center'
		}, {
			header: 'CORRECTION & METHOD',
			dataIndex: 'corrmethod',
			width: 500,
			renderer: upsize
		}, {
			header: 'LOSS TIME CORRECTION BY IQC ',
			columns: [{
				header: 'MAN POWER',
				dataIndex: 'mp',
				width: 50,
				renderer: upsize
			}, {
				header: 'TIME (H)',
				dataIndex: 'duration',
				width: 50,
				renderer: upsize
			}, {
				header: 'TOTAL',
				dataIndex: 'total',
				width: 50,
				renderer: upsize
			}]
		}, {
			header: 'ACTION ON SUPLIER',
			dataIndex: 'actionsupp',
			width: 500,
			renderer: upsize
		}, {
			header: 'REMARK',
			dataIndex: 'remark',
			width: 200,
			renderer: upsize
		}],
	});
	//-----------------------------------------//
	//----------------TAB PANEL----------------//
	var tab_part_im = Ext.create('Ext.tab.Panel', {
		tabPosition: 'left',
		autoHeight: true,
		activeTab: 0,
		width: '100%',
		style: 'padding:5px;-background:#157FCC;',
		items: [{
			title: 'Prepare Part', //Outset Inquiry
			reorderable: false,
			items: [grd_part_im]
		}, {
			title: 'Check Part', //IM Part Navigation
			reorderable: false,
			items: [grd_part_im_zdbs]
		}]
	});
	var tab_part_iqc = Ext.create('Ext.tab.Panel', {
		tabPosition: 'left',
		autoHeight: true,
		activeTab: 0,
		width: '100%',
		style: 'padding:5px;-background:#157FCC;',
		items: [{
			title: 'Mechanical',
			reorderable: false,
			items: [grd_part_mchcal]
		}, {
			title: 'Mechanism',
			reorderable: false,
			items: [grd_part_mchnism]
		}, {
			title: 'Mechatronics',
			reorderable: false,
			items: [grd_part_mchtronics]
		}]
	});
	var tab_part_mc = Ext.create('Ext.tab.Panel', {
		tabPosition: 'left',
		autoHeight: true,
		activeTab: 0,
		width: '100%',
		style: 'padding:5px;-background:#157FCC;',
		items: [{
			title: 'Part Issue to MA',
			reorderable: false,
			items: [grd_part_mcissue]
		}]
	});
	var proc_im = Ext.create('Ext.tab.Panel', {
		tabPosition: 'left',
		autoHeight: true,
		activeTab: 0,
		width: '100%',
		style: 'padding:5px;-background:#157FCC;',
		items: [{
			title: 'Production Result',
			reorderable: false,
			items: [grd_im_output]
		}, {
			title: 'Downtime Report',
			reorderable: false,
			items: [grd_im_downtime]
		}, {
			title: 'Quality Report',
			reorderable: false,
			items: [grd_im_quality]
		}]
	});
	var proc_ma = Ext.create('Ext.tab.Panel', {
		tabPosition: 'left',
		autoHeight: true,
		activeTab: 0,
		width: '100%',
		style: 'padding:5px;-background:#157FCC;',
		items: [{
			title: 'Quality Report',
			reorderable: false,
			items: [grd_prd_quality]
		}, {
			title: 'Lost Time Report',
			reorderable: false,
			items: [grd_prd_losttime],
		}]
	});
	var proc_mecha = Ext.create('Ext.tab.Panel', {
		tabPosition: 'left',
		autoHeight: true,
		activeTab: 0,
		width: '100%',
		style: 'padding:5px;-background:#157FCC;',
		items: [{
			title: 'Production Result',
			reorderable: false,
			items: [grd_mecha_output]
		}, {
			title: 'Quality Report',
			reorderable: false,
			items: [grd_mecha_quality]
		}, {
			title: 'Lost Time Report',
			reorderable: false,
			items: [grd_mecha_losttime]
		}]
	});
	var tab_process = Ext.create('Ext.tab.Panel', {
		title: 'Process',
		autoHeight: true,
		plain: true,
		activeTab: 0,
		width: '100%',
		style: 'padding:5px;-background:#157FCC;',
		items: [{
			title: 'IM',
			reorderable: false,
			items: [proc_im]
		}, {
			title: 'MA',
			reorderable: false,
			items: [proc_ma]
		}, {
			title: 'MECHA',
			reorderable: false,
			items: [proc_mecha],
		}]
		/*listeners: {
			tabchange: function(tab, eOpts)  {
				var gettab 	= tab.getActiveTab();
				var index	= tab.items.indexOf(gettab);
				if (index == 1){
					//alert(index);
					prd_lost_time.loadPage(1);
				}
			}
		}*/
	});
	var tab_part = Ext.create('Ext.tab.Panel', {
		title: 'Part',
		autoHeight: true,
		plain: true,
		activeTab: 0,
		width: '100%',
		style: 'padding:5px;-background:#157FCC;',
		items: [{
				title: 'IM',
				reorderable: false,
				items: [tab_part_im]
			}, {
				title: 'MC',
				reorderable: false,
				items: [tab_part_mc]
			}, {
				title: 'IQC',
				reorderable: false,
				items: [tab_part_iqc]
			}
			/*,{
							title		: 'MECHA',
							reorderable	: false,
							items		: [proc_mecha],
						}*/
		]
	});
	var tab_finishgood = Ext.create('Ext.tab.Panel', {
		title: 'Finished Good',
		autoHeight: true,
		plain: true,
		activeTab: 0,
		width: '100%',
		style: 'padding:5px;-background:#157FCC;',
		items: [{
			title: 'SCAN IN',
			reorderable: false,
			items: [grd_scanin]
		}, {
			title: 'SCAN OUT',
			reorderable: false,
			items: [grd_scanout]
		}, {
			title: 'SUMMARY',
			reorderable: false,
			items: [grd_fgsum],
		}]
	});
	/*================== PROBLEM INFORMATION TAB =================*/
	// --> GRID
	var grd_part_problem_mc = Ext.create('Ext.grid.Panel', {
		id: 'grd_part_problem_mc',
		width: '100%',
		height: 295,
		columnLines: true,
		//     store       : part_problem_mc,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText: false,
			enableTextSelection: true
		},
		columns: [
			// 	fields	: ['id_part','line','shift','prod_date','div','dept','model_name','lotno','part_name','partno','shortage_qty','supplier_name','id_resp','resp','comment','paging','line_form','read_status','input_userid','input_nik','id_condition','condition']
			{
				header: 'PROD. DATE',
				dataIndex: 'prod_date',
				flex: 1,
				renderer: upsize
			}, {
				header: 'STATUS',
				dataIndex: 'read_status',
				flex: 1,
				renderer: problem_status
			}, {
				header: 'CONDITION',
				dataIndex: 'condition',
				flex: 1,
				renderer: upsize
			}, {
				header: 'LINE',
				dataIndex: 'line',
				flex: 1,
				renderer: upsize
			}, {
				header: 'MODEL',
				dataIndex: 'model_name',
				flex: 1,
				renderer: upsize
			}, {
				header: 'LOT NO',
				dataIndex: 'lotno',
				flex: 1,
				renderer: upsize
			}, {
				header: 'PART NAME',
				dataIndex: 'part_name',
				flex: 1,
				renderer: upsize
			}, {
				header: 'PART NO',
				dataIndex: 'partno',
				flex: 1,
				renderer: upsize
			}, {
				header: 'SHORTAGE QTY',
				dataIndex: 'shortage_qty',
				flex: 1,
				renderer: upsize
			}, {
				header: 'SUPPLIER NAME',
				dataIndex: 'supplier_name',
				flex: 1,
				renderer: upsize
			}, {
				header: 'RESP',
				dataIndex: 'resp',
				flex: 1,
				renderer: upsize,
				hidden: true
			}, {
				header: 'REMARK',
				dataIndex: 'comment',
				flex: 1,
				renderer: upsize
			}, {
				header: 'USER ID',
				dataIndex: 'input_userid',
				flex: 1,
				renderer: upsize
			}
		]
	});
	var grd_qty_problem_mc = Ext.create('Ext.grid.Panel', {
		id: 'grd_qty_problem_mc',
		width: '100%',
		height: 295,
		columnLines: true,
		//    store       : qty_problem_mc,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText: false,
			enableTextSelection: true
		},
		columns: [
			//	fields	: ['id_quality','prod_date','div','dept','line','shift','model','lot_no','id_symptom','symptom','id_defcause','defcause','reject','id_resp','read_status','input_userid','input_nik','id_condition','condition']
			{
				header: 'PROD. DATE',
				dataIndex: 'prod_date',
				flex: 1,
				renderer: upsize
			}, {
				header: 'STATUS',
				dataIndex: 'read_status',
				flex: 1,
				renderer: problem_status
			}, {
				header: 'CONDITION',
				dataIndex: 'condition',
				flex: 1,
				renderer: upsize
			}, {
				header: 'LINE',
				dataIndex: 'line',
				flex: 1,
				renderer: upsize
			}, {
				header: 'MODEL',
				dataIndex: 'model',
				flex: 1,
				renderer: upsize
			}, {
				header: 'LOT NO',
				dataIndex: 'lot_no',
				flex: 1,
				renderer: upsize
			}, {
				header: 'SYMPTOM',
				dataIndex: 'symptom',
				flex: 1,
				renderer: upsize
			}, {
				header: 'DEFECT. CAUSE',
				dataIndex: 'defcause',
				flex: 1,
				renderer: upsize
			}, {
				header: 'REJECT',
				dataIndex: 'reject_rate',
				flex: 1,
				renderer: upsize
			}, {
				header: 'USER ID',
				dataIndex: 'input_userid',
				flex: 1,
				renderer: upsize
			}
		]
	});
	var grd_part_problem_ma = Ext.create('Ext.grid.Panel', {
		id: 'grd_part_problem_ma',
		width: '100%',
		height: 295,
		columnLines: true,
		store: part_problem_ma,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText: false,
			enableTextSelection: true
		},
		columns: [
			// 	fields	: ['id_part','line','shift','prod_date','div','dept','model_name','lotno','part_name','partno','shortage_qty','supplier_name','id_resp','resp','comment','paging','line_form','read_status','input_userid','input_nik','id_condition','condition']
			{
				header: 'PROD. DATE',
				dataIndex: 'prod_date',
				flex: 1,
				renderer: upsize
			}, {
				header: 'STATUS',
				dataIndex: 'read_status',
				flex: 1,
				renderer: problem_status
			}, {
				header: 'CONDITION',
				dataIndex: 'condition',
				flex: 1,
				renderer: upsize
			}, {
				header: 'LINE',
				dataIndex: 'line',
				flex: 1,
				renderer: upsize
			}, {
				header: 'MODEL',
				dataIndex: 'model_name',
				flex: 1,
				renderer: upsize
			}, {
				header: 'LOT NO',
				dataIndex: 'lotno',
				flex: 1,
				renderer: upsize
			}, {
				header: 'PART NAME',
				dataIndex: 'part_name',
				flex: 1,
				renderer: upsize
			}, {
				header: 'PART NO',
				dataIndex: 'partno',
				flex: 1,
				renderer: upsize
			}, {
				header: 'SHORTAGE QTY',
				dataIndex: 'shortage_qty',
				flex: 1,
				renderer: upsize
			}, {
				header: 'SUPPLIER NAME',
				dataIndex: 'supplier_name',
				flex: 1,
				renderer: upsize
			}, {
				header: 'RESP',
				dataIndex: 'resp',
				flex: 1,
				renderer: upsize,
				hidden: true
			}, {
				header: 'REMARK',
				dataIndex: 'comment',
				flex: 1,
				renderer: upsize
			}, {
				header: 'USER ID',
				dataIndex: 'input_userid',
				flex: 1,
				renderer: upsize
			}
		]
	});
	var grd_qty_problem_ma = Ext.create('Ext.grid.Panel', {
		id: 'grd_qty_problem_ma',
		width: '100%',
		height: 295,
		columnLines: true,
		store: qty_problem_ma,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText: false,
			enableTextSelection: true
		},
		columns: [
			//	fields	: ['id_quality','prod_date','div','dept','line','shift','model','lot_no','id_symptom','symptom','id_defcause','defcause','reject','id_resp','read_status','input_userid','input_nik','id_condition','condition']
			{
				header: 'PROD. DATE',
				dataIndex: 'prod_date',
				flex: 1,
				renderer: upsize
			}, {
				header: 'STATUS',
				dataIndex: 'read_status',
				flex: 1,
				renderer: problem_status
			}, {
				header: 'CONDITION',
				dataIndex: 'condition',
				flex: 1,
				renderer: upsize
			}, {
				header: 'LINE',
				dataIndex: 'line',
				flex: 1,
				renderer: upsize
			}, {
				header: 'MODEL',
				dataIndex: 'model',
				flex: 1,
				renderer: upsize
			}, {
				header: 'LOT NO',
				dataIndex: 'lot_no',
				flex: 1,
				renderer: upsize
			}, {
				header: 'SYMPTOM',
				dataIndex: 'symptom',
				flex: 1,
				renderer: upsize
			}, {
				header: 'DEFECT. CAUSE',
				dataIndex: 'defcause',
				flex: 1,
				renderer: upsize
			}, {
				header: 'REJECT',
				dataIndex: 'reject_rate',
				flex: 1,
				renderer: upsize
			}, {
				header: 'USER ID',
				dataIndex: 'input_userid',
				flex: 1,
				renderer: upsize
			}
		]
	});
	var grd_part_problem_mecha = Ext.create('Ext.grid.Panel', {
		id: 'grd_part_problem_mecha',
		width: '100%',
		height: 295,
		columnLines: true,
		store: part_problem_mecha,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText: false,
			enableTextSelection: true
		},
		columns: [
			// 	fields	: ['id_part','line','shift','prod_date','div','dept','model_name','lotno','part_name','partno','shortage_qty','supplier_name','id_resp','resp','comment','paging','line_form','read_status','input_userid','input_nik','id_condition','condition']
			{
				header: 'PROD. DATE',
				dataIndex: 'prod_date',
				flex: 1,
				renderer: upsize
			}, {
				header: 'STATUS',
				dataIndex: 'read_status',
				flex: 1,
				renderer: problem_status
			}, {
				header: 'CONDITION',
				dataIndex: 'condition',
				flex: 1,
				renderer: upsize
			}, {
				header: 'LINE',
				dataIndex: 'line',
				flex: 1,
				renderer: upsize
			}, {
				header: 'MODEL',
				dataIndex: 'model_name',
				flex: 1,
				renderer: upsize
			}, {
				header: 'LOT NO',
				dataIndex: 'lotno',
				flex: 1,
				renderer: upsize
			}, {
				header: 'PART NAME',
				dataIndex: 'part_name',
				flex: 1,
				renderer: upsize
			}, {
				header: 'PART NO',
				dataIndex: 'partno',
				flex: 1,
				renderer: upsize
			}, {
				header: 'SHORTAGE QTY',
				dataIndex: 'shortage_qty',
				flex: 1,
				renderer: upsize
			}, {
				header: 'SUPPLIER NAME',
				dataIndex: 'supplier_name',
				flex: 1,
				renderer: upsize
			}, {
				header: 'RESP',
				dataIndex: 'resp',
				flex: 1,
				renderer: upsize,
				hidden: true
			}, {
				header: 'REMARK',
				dataIndex: 'comment',
				flex: 1,
				renderer: upsize
			}, {
				header: 'USER ID',
				dataIndex: 'input_userid',
				flex: 1,
				renderer: upsize
			}
		]
	});
	var grd_qty_problem_mecha = Ext.create('Ext.grid.Panel', {
		id: 'grd_qty_problem_mecha',
		width: '100%',
		height: 295,
		columnLines: true,
		store: qty_problem_mecha,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText: false,
			enableTextSelection: true
		},
		columns: [
			//	fields	: ['id_quality','prod_date','div','dept','line','shift','model','lot_no','id_symptom','symptom','id_defcause','defcause','reject','id_resp','read_status','input_userid','input_nik','id_condition','condition']
			{
				header: 'PROD. DATE',
				dataIndex: 'prod_date',
				flex: 1,
				renderer: upsize
			}, {
				header: 'STATUS',
				dataIndex: 'read_status',
				flex: 1,
				renderer: problem_status
			}, {
				header: 'CONDITION',
				dataIndex: 'condition',
				flex: 1,
				renderer: upsize
			}, {
				header: 'LINE',
				dataIndex: 'line',
				flex: 1,
				renderer: upsize
			}, {
				header: 'MODEL',
				dataIndex: 'model',
				flex: 1,
				renderer: upsize
			}, {
				header: 'LOT NO',
				dataIndex: 'lot_no',
				flex: 1,
				renderer: upsize
			}, {
				header: 'SYMPTOM',
				dataIndex: 'symptom',
				flex: 1,
				renderer: upsize
			}, {
				header: 'DEFECT. CAUSE',
				dataIndex: 'defcause',
				flex: 1,
				renderer: upsize
			}, {
				header: 'REJECT',
				dataIndex: 'reject_rate',
				flex: 1,
				renderer: upsize
			}, {
				header: 'USER ID',
				dataIndex: 'input_userid',
				flex: 1,
				renderer: upsize
			}
		]
	});
	var grd_part_problem_iqc = Ext.create('Ext.grid.Panel', {
		id: 'grd_part_problem_iqc',
		width: '100%',
		height: 295,
		columnLines: true,
		store: part_problem_iqc,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText: false,
			enableTextSelection: true
		},
		columns: [
			// 	fields	: ['id_part','line','shift','prod_date','div','dept','model_name','lotno','part_name','partno','shortage_qty','supplier_name','id_resp','resp','comment','paging','line_form','read_status','input_userid','input_nik','id_condition','condition']
			{
				header: 'PROD. DATE',
				dataIndex: 'prod_date',
				flex: 1,
				renderer: upsize
			}, {
				header: 'STATUS',
				dataIndex: 'read_status',
				flex: 1,
				renderer: problem_status
			}, {
				header: 'CONDITION',
				dataIndex: 'condition',
				flex: 1,
				renderer: upsize
			}, {
				header: 'LINE',
				dataIndex: 'line',
				flex: 1,
				renderer: upsize
			}, {
				header: 'MODEL',
				dataIndex: 'model_name',
				flex: 1,
				renderer: upsize
			}, {
				header: 'LOT NO',
				dataIndex: 'lotno',
				flex: 1,
				renderer: upsize
			}, {
				header: 'PART NAME',
				dataIndex: 'part_name',
				flex: 1,
				renderer: upsize
			}, {
				header: 'PART NO',
				dataIndex: 'partno',
				flex: 1,
				renderer: upsize
			}, {
				header: 'SHORTAGE QTY',
				dataIndex: 'shortage_qty',
				flex: 1,
				renderer: upsize
			}, {
				header: 'SUPPLIER NAME',
				dataIndex: 'supplier_name',
				flex: 1,
				renderer: upsize
			}, {
				header: 'RESP',
				dataIndex: 'resp',
				flex: 1,
				renderer: upsize,
				hidden: true
			}, {
				header: 'REMARK',
				dataIndex: 'comment',
				flex: 1,
				renderer: upsize
			}, {
				header: 'USER ID',
				dataIndex: 'input_userid',
				flex: 1,
				renderer: upsize
			}
		]
	});
	var grd_qty_problem_iqc = Ext.create('Ext.grid.Panel', {
		id: 'grd_qty_problem_iqc',
		width: '100%',
		height: 295,
		columnLines: true,
		store: qty_problem_iqc,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText: false,
			enableTextSelection: true
		},
		columns: [
			//	fields	: ['id_quality','prod_date','div','dept','line','shift','model','lot_no','id_symptom','symptom','id_defcause','defcause','reject','id_resp','read_status','input_userid','input_nik','id_condition','condition']
			{
				header: 'PROD. DATE',
				dataIndex: 'prod_date',
				flex: 1,
				renderer: upsize
			}, {
				header: 'STATUS',
				dataIndex: 'read_status',
				flex: 1,
				renderer: problem_status
			}, {
				header: 'CONDITION',
				dataIndex: 'condition',
				flex: 1,
				renderer: upsize
			}, {
				header: 'LINE',
				dataIndex: 'line',
				flex: 1,
				renderer: upsize
			}, {
				header: 'MODEL',
				dataIndex: 'model',
				flex: 1,
				renderer: upsize
			}, {
				header: 'LOT NO',
				dataIndex: 'lot_no',
				flex: 1,
				renderer: upsize
			}, {
				header: 'SYMPTOM',
				dataIndex: 'symptom',
				flex: 1,
				renderer: upsize
			}, {
				header: 'DEFECT. CAUSE',
				dataIndex: 'defcause',
				flex: 1,
				renderer: upsize
			}, {
				header: 'REJECT',
				dataIndex: 'reject_rate',
				flex: 1,
				renderer: upsize
			}, {
				header: 'USER ID',
				dataIndex: 'input_userid',
				flex: 1,
				renderer: upsize
			}
		]
	});
	// --> TAB DEPARTMENT
	var tab_problem_iqc = Ext.create('Ext.tab.Panel', {
		tabPosition: 'left',
		autoHeight: true,
		activeTab: 0,
		width: '100%',
		style: 'padding:5px;-background:#157FCC;',
		items: [{
			title: 'Part Problem',
			reorderable: false,
			items: [grd_part_problem_iqc]
		}, {
			title: 'Quality Problem',
			reorderable: false,
			items: [grd_qty_problem_iqc]
		}]
	});
	var tab_problem_ma = Ext.create('Ext.tab.Panel', {
		tabPosition: 'left',
		autoHeight: true,
		activeTab: 0,
		width: '100%',
		style: 'padding:5px;-background:#157FCC;',
		items: [{
			title: 'Part Problem',
			reorderable: false,
			items: [grd_part_problem_ma]
		}, {
			title: 'Quality Problem',
			reorderable: false,
			items: [grd_qty_problem_ma]
		}]
	});
	var tab_problem_mc = Ext.create('Ext.tab.Panel', {
		tabPosition: 'left',
		autoHeight: true,
		activeTab: 0,
		width: '100%',
		style: 'padding:5px;-background:#157FCC;',
		items: [{
			title: 'Part Problem',
			reorderable: false,
			items: [grd_part_problem_mc]
		}, {
			title: 'Quality Problem',
			reorderable: false,
			items: [grd_qty_problem_mc]
		}]
	});
	var tab_problem_mecha = Ext.create('Ext.tab.Panel', {
		tabPosition: 'left',
		autoHeight: true,
		activeTab: 0,
		width: '100%',
		style: 'padding:5px;-background:#157FCC;',
		items: [{
			title: 'Part Problem',
			reorderable: false,
			items: [grd_part_problem_mecha]
		}, {
			title: 'Quality Problem',
			reorderable: false,
			items: [grd_qty_problem_mecha]
		}]
	});
	// --> TAB MASTER PROBLEM INFO
	var tab_problem = Ext.create('Ext.tab.Panel', {
		title: 'Problem Info',
		autoHeight: true,
		plain: true,
		activeTab: 0,
		width: '100%',
		style: 'padding:5px;-background:#157FCC;',
		items: [{ //SHORT BY TITLE ASC
			title: 'IQC',
			reorderable: false,
			items: [tab_problem_iqc]
		}, {
			title: 'MA',
			reorderable: false,
			items: [tab_problem_ma]
		}, {
			title: 'MC',
			reorderable: false,
			items: [tab_problem_mc]
		}, {
			title: 'MECHA',
			reorderable: false,
			items: [tab_problem_mecha]
		}]
	});
	/*==================* PROBLEM INFORMATION TAB *=================*/
	var tab_panel = Ext.create('Ext.tab.Panel', {
		//bodyStyle   : 'padding:0',
		//tabPosition	: 'left',
		activeTab: 0,
		width: '100%',
		items: [tab_part, tab_process, tab_finishgood, tab_problem]
	});
	//-----------------------------------------//
	//---------------SUB MAIN PANEL------------//
	var sub_panel = Ext.create('Ext.panel.Panel', {
		//title		: 'SUB PANEL',
		autoScroll: true,
		id: 'sub_panel',
		region: 'center',
		autoWidth: true,
		height: 150,
		layout: {
			type: 'hbox',
			align: 'strecth'
		},
		items: [schedule, {
			xtype: 'tbspacer'
		}, outcount]
	});
	//-----------------------------------------//
	//----------------MAIN PANEL---------------//
	var main_panel = Ext.create('Ext.panel.Panel', { //_Z_ MAINPANEL_FINISHGOOD
		title: 'Traceability Search',
		id: 'main_panel',
		region: 'north',
		width: '100%',
		height: 125,
		minHeight: 125,
		layout: {
			type: 'hbox',
			align: 'strecth'
		},
		items: [main_grid],
		tbar: [{
				xtype: 'tbspacer',
				width: 5
			}, {
				xtype: 'hiddenfield',
				id: 'line_name',
				name: 'line_name'
			}, {
				xtype: 'hiddenfield',
				id: 'model_name',
				name: 'model_name'
			},
			/*{
				xtype		: 'textfield',
				fieldLabel  : 'Model',
				id          : 'model',
				name        : 'model',
				allowBlank  : false,
				labelWidth	: 50,
				value		: 'DPX5000BTITA9N'
			},
			{xtype: 'tbspacer', width:5},
			{
				xtype		: 'textfield',
				fieldLabel  : 'S/No.',
				id          : 'serial_no',
				name        : 'serial_no',
				allowBlank  : false,
				labelWidth  : 50,
				value		: '131X7740'
			},'-',

			'-',
			{
				xtype		: 'hiddenfield',
				id			: 'line_name',
				name		: 'line_name'
			},
			{
				xtype		: 'hiddenfield',
				id			: 'model_name',
				name		: 'model_name'
			},
			{xtype: 'tbspacer', width:10},
			{
				xtype       : 'button',
				id          : 'btn-src',
				name        : 'btn-src',
				iconCls     : 'search',
				scale       : 'medium',
				style       : 'padding:3px 15px',
				handler		: function(){
					//var line   	= Ext.getCmp('line_name').getValue();
					var model   = Ext.getCmp('model').getValue();
					var s_no    = Ext.getCmp('serial_no').getValue();
					if (((!model) || (!s_no))||((!model) && (!s_no))){
						Ext.Msg.alert('Warning', 'Model or Serial Number cannot be null !!!');
					} else {
						//Ext.Msg.alert('Model',model);
						var x = Ext.getCmp('rb').getValue()['src_cat'];
						output_store.proxy.setExtraParam('src_cat', x);
						sched_store.proxy.setExtraParam('src_cat', x);
						im_output.proxy.setExtraParam('src_cat', x);
						im_downtime.proxy.setExtraParam('src_cat', x);
						part_im.proxy.setExtraParam('src_cat', x);
						scanin_store.proxy.setExtraParam('src_cat', x);
						scanout_store.proxy.setExtraParam('src_cat', x);

						main_store.proxy.setExtraParam('model', model);
						main_store.proxy.setExtraParam('serial_no', s_no);
						main_store.loadPage(1);
						prd_res_store.proxy.setExtraParam('model', model);
						prd_res_store.proxy.setExtraParam('serial_no', s_no);
						prd_res_store.proxy.setExtraParam('src_cat', x);
						prd_res_store.loadPage(1);
						prd_lost_time.proxy.setExtraParam('line', Ext.getCmp('line_name').getValue());
						prd_lost_time.proxy.setExtraParam('model', model);
						scanin_store.proxy.setExtraParam('serial_no', s_no);
						scanin_store.loadPage(1);
						scanout_store.proxy.setExtraParam('serial_no', s_no);
						scanout_store.loadPage(1);



						//prd_lost_time.loadPage(1);
					}
				}
			}*/
			{
				xtype: 'radiogroup',
				fieldLabel: 'Category',
				id: 'rb',
				columns: [100, 100, 10, 10],
				labelWidth: 50,
				vertical: true,
				items: [{
					boxLabel: 'Finish Good',
					name: 'src_cat',
					checked: true,
					inputValue: 'fg'
				}, {
					boxLabel: 'Single Parts',
					name: 'src_cat',
					inputValue: 'sp'
				}, {
					boxLabel: 'Model and Lotno',
					name: 'src_cat',
					inputValue: 'ml',
					width: 120
				}, {
					boxLabel: 'Symptom',
					name: 'src_cat',
					inputValue: 'sym',
					width: 100
				}],
				listeners: {
					change: function() {
						var x = Ext.getCmp('rb').getValue()['src_cat'];
						if (x == 'sp') {
							panel_master.hide();
							panel_single_part.show();
							panel_modellotno.hide();
							panel_symptom.hide();
							Ext.getCmp('rb2').reset();
						} else if (x == 'fg') {
							panel_master.show();
							panel_single_part.hide();
							panel_modellotno.hide();
							panel_symptom.hide();
							Ext.getCmp('rb').reset();
						} else if (x == 'ml') {
							panel_master.hide();
							panel_single_part.hide();
							panel_modellotno.show();
							panel_symptom.hide();
							Ext.getCmp('rb3').reset();
						} else {
							panel_master.hide();
							panel_single_part.hide();
							panel_modellotno.hide();
							panel_symptom.show();
							Ext.getCmp('rb4').reset();
						}
						//alert(x);
					}
				}
			}, {
				xtype: 'tbspacer',
				width: 30
			}, '-', {
				xtype: 'button',
				id: 'src_fnsgood',
				name: 'src_fnsgood',
				text: 'SEARCH',
				iconCls: 'search',
				scale: 'medium',
				handler: src_fnsgood
			}, '->',
			clock, '  '
		],
		listeners: {
			render: {
				fn: function() {
					Ext.fly(clock.getEl().parent()).addCls('x-status-text-panel').createChild({
						cls: 'spacer'
					});
					Ext.TaskManager.start({
						run: function() {
							Ext.fly(clock.getEl()).update(Ext.Date.format(new Date(), 'M, D-Y g:i:s A'));
						},
						interval: 1000
					});
				},
				delay: 100
			}
		}
	});
	//-----------------------------------------//
	//----------------BASE PANEL---------------//
	var panel = Ext.create('Ext.panel.Panel', {
		region: 'north',
		width: '100%',
		height: 300,
		minHeight: 300,
		layout: 'border',
		defaults: {
			split: true
		},
		items: [main_panel, sub_panel]
	});
	//-----------------------------------------//
	//---------------SECOND PANEL--------------//
	var sec_panel = Ext.create('Ext.panel.Panel', {
		region: 'center',
		width: '100%',
		height: 550,
		layout: 'vbox',
		items: [tab_panel]
	});
	//-----------------------------------------//
	//---------------PANEL MASTER--------------//
	var panel_master = Ext.create('Ext.panel.Panel', {
		renderTo: 'hasildata',
		width: '100%',
		height: 500,
		layout: 'border',
		hidden: false,
		defaults: {
			split: true,
			collapsible: false
		},
		items: [panel, sec_panel]
	});
	//-----------------------------------------//
	/**-------------------------------------------------------------------------------------------------------------------------------------------------**/
	// --> Main 2nd grid
	var main_grid_2nd = Ext.create('Ext.grid.Panel', {
		stateful: true,
		id: 'main_grid_2nd',
		columnLines: true,
		width: '100%',
		height: '100%',
		store: rcv_partiss,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt-main">No data to display.</div>',
			deferEmptyText: false,
			enableTextSelection: true
		},
		columns: [{
			header: 'SO',
			dataIndex: 'so',
			flex: 1,
			filter: {
				type: 'string'
			},
			renderer: upsize
		}, {
			header: 'Part Number',
			dataIndex: 'partno',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Part Name',
			dataIndex: 'partname',
			flex: 1,
			renderer: upsize
		}, {
			header: 'PO',
			dataIndex: 'po',
			flex: 1,
			renderer: upsize,
			hidden: true
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
			hidden: false
		}, {
			header: 'Line Name',
			dataIndex: 'line',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Prod No',
			dataIndex: 'lot',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Model Name',
			dataIndex: 'model_name',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Issue Date',
			dataIndex: 'issdate',
			flex: 1,
			renderer: upsize
		}],
		features: [{
			ftype: 'filters',
			encode: encode, // json encode the filter query
			local: local
		}],
		listeners: {
			select: function(selModel, record, index, options) {
				var x = Ext.getCmp('rb2').getValue()['src_cat2'];
				sglprt_output_store.proxy.setExtraParam('model', record.get('model_name'));
				sglprt_output_store.proxy.setExtraParam('prod_no', record.get('lot'));
				sglprt_output_store.proxy.setExtraParam('src_cat', x);
				sglprt_output_store.loadPage(1);
				sglprt_sched_store.proxy.setExtraParam('model', record.get('model_name'));
				sglprt_sched_store.proxy.setExtraParam('prod_no', record.get('lot'));
				sglprt_sched_store.proxy.setExtraParam('src_cat', x);
				sglprt_sched_store.loadPage(1);
				Ext.getCmp('fld_prod_no').setValue(record.get('lot'));
				// 2nd tab clear param
				procmaqrep_store.proxy.setExtraParam('model', '');
				procmaqrep_store.proxy.setExtraParam('line_name', '');
				procmaqrep_store.proxy.setExtraParam('prod_date', '');
				procmaqrep_store.loadPage(1);
				procmaltr_store.proxy.setExtraParam('model', '');
				procmaltr_store.proxy.setExtraParam('line', '');
				procmaltr_store.proxy.setExtraParam('prod_date', '');
				procmaltr_store.loadPage(1);
				procimprodres_store.proxy.setExtraParam('model', '');
				procimprodres_store.proxy.setExtraParam('prod_date', '');
				procimprodres_store.loadPage(1);
				procimdownrep_store.proxy.setExtraParam('model', '');
				procimdownrep_store.proxy.setExtraParam('prod_date', '');
				procimdownrep_store.loadPage(1);
				procimquality_store.proxy.setExtraParam('model', ''); //_Z_ imquality2nd 20161018
				procimquality_store.proxy.setExtraParam('prod_date', ''); //_Z_ imquality2nd 20161018
				procimquality_store.loadPage(1); //_Z_ imquality2nd 20161018
				partimoutset_store.proxy.setExtraParam('model', '');
				partimoutset_store.proxy.setExtraParam('prod_date', '');
				partimoutset_store.loadPage(1);
				partimnav_store.proxy.setExtraParam('model', '');
				partimnav_store.proxy.setExtraParam('prod_date', '');
				partimnav_store.loadPage(1);
				fg_scanin_store.proxy.setExtraParam('model', '');
				fg_scanin_store.proxy.setExtraParam('prod_no', '');
				fg_scanin_store.loadPage(1);
				fg_scanout_store.proxy.setExtraParam('model', '');
				fg_scanout_store.proxy.setExtraParam('prod_no', '');
				fg_scanout_store.loadPage(1);
				part_fgsum_store.proxy.setExtraParam('model', '');
				part_fgsum_store.loadPage(1);
			}
		},
		bbar: Ext.create('Ext.PagingToolbar', {
			pageSize: 20,
			store: rcv_partiss,
			displayInfo: true,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			/*items		: [{
				text: 'All Filter Data',
				tooltip: 'Get Filter Data for Grid',
				handler: function () {
					var data = Ext.encode(main_grid_2nd.filters.getFilterData());
					Ext.Msg.alert('All Filter Data',data);
				}
			}],*/
			listeners: {
				afterrender: function(cmp) {
					this.getComponent("refresh").hide();
				}
			}
		})
	});
	//-----------------------------------------//
	// --> Output Count SINGLE PARTS
	var sglprt_outcount = Ext.create('Ext.grid.Panel', {
		title: 'ACTUAL',
		width: '50%',
		height: '100%',
		store: sglprt_output_store,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText: false
		},
		columns: [{
			header: 'Prod Date',
			dataIndex: 'prod_date',
			flex: 1,
			renderer: upsize
		}, {
			header: 'First Output',
			dataIndex: 'stime',
			width: 100,
			renderer: upsize
		}, {
			header: 'Line Name',
			dataIndex: 'line_name',
			width: 90,
			renderer: upsize
		}, {
			header: 'Model Name',
			dataIndex: 'model_name',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Shift',
			dataIndex: 'shift',
			width: 50,
			renderer: upsize
		}, {
			header: 'Output',
			dataIndex: 'output',
			flex: 1,
			renderer: upsize
		}],
		listeners: {
			select: function(selModel, record, index, options) {
				var x = Ext.getCmp('rb2').getValue()['src_cat2'];
				procmaqrep_store.proxy.setExtraParam('model', record.get('model_name'));
				procmaqrep_store.proxy.setExtraParam('line_name', record.get('line_name'));
				procmaqrep_store.proxy.setExtraParam('prod_date', record.get('prod_date'));
				procmaqrep_store.proxy.setExtraParam('src_cat', x);
				procmaqrep_store.loadPage(1);
				procmaltr_store.proxy.setExtraParam('model', record.get('model_name'));
				procmaltr_store.proxy.setExtraParam('line', record.get('line_name'));
				procmaltr_store.proxy.setExtraParam('prod_date', record.get('prod_date'));
				procmaltr_store.proxy.setExtraParam('src_cat', x);
				procmaltr_store.loadPage(1);
				procimprodres_store.proxy.setExtraParam('model', record.get('model_name'));
				procimprodres_store.proxy.setExtraParam('prod_date', record.get('prod_date'));
				procimprodres_store.proxy.setExtraParam('src_cat', x);
				procimprodres_store.loadPage(1);
				procimdownrep_store.proxy.setExtraParam('model', record.get('model_name'));
				procimdownrep_store.proxy.setExtraParam('prod_date', record.get('prod_date'));
				procimdownrep_store.proxy.setExtraParam('src_cat', x);
				procimdownrep_store.loadPage(1);
				procimquality_store.proxy.setExtraParam('model', record.get('model_name')); //_Z_ imquality2nd 20161018
				procimquality_store.proxy.setExtraParam('prod_date', record.get('prod_date')); //_Z_ imquality2nd 20161018
				procimquality_store.proxy.setExtraParam('src_cat', x); //_Z_ imquality2nd 20161018
				procimquality_store.loadPage(1); //_Z_ imquality2nd 20161018
				/*============ problem info ==========*/
				part_problem_mc.proxy.setExtraParam('model', record.get('model_name')); // _Z_ by zaki 20161031
				part_problem_mc.proxy.setExtraParam('prod_date', record.get('prod_date')); //_Z_ imquality2nd 20161018
				part_problem_mc.proxy.setExtraParam('src_cat', x); // _Z_ by zaki 20161031
				part_problem_mc.loadPage(1); // _Z_ by zaki 20161031
				qty_problem_mc.proxy.setExtraParam('model', record.get('model_name')); // _Z_ by zaki 20161031
				qty_problem_mc.proxy.setExtraParam('prod_date', record.get('prod_date')); //_Z_ imquality2nd 20161018
				qty_problem_mc.proxy.setExtraParam('src_cat', x); // _Z_ by zaki 20161031
				qty_problem_mc.loadPage(1); // _Z_ by zaki 20161031
				part_problem_iqc.proxy.setExtraParam('model', record.get('model_name')); // _Z_ by zaki 20161031
				part_problem_iqc.proxy.setExtraParam('prod_date', record.get('prod_date')); //_Z_ imquality2nd 20161018
				part_problem_iqc.proxy.setExtraParam('src_cat', x); // _Z_ by zaki 20161031
				part_problem_iqc.loadPage(1); // _Z_ by zaki 20161031
				qty_problem_iqc.proxy.setExtraParam('model', record.get('model_name')); // _Z_ by zaki 20161031
				qty_problem_iqc.proxy.setExtraParam('prod_date', record.get('prod_date')); //_Z_ imquality2nd 20161018
				qty_problem_iqc.proxy.setExtraParam('src_cat', x); // _Z_ by zaki 20161031
				qty_problem_iqc.loadPage(1); // _Z_ by zaki 20161031
				part_problem_ma.proxy.setExtraParam('model', record.get('model_name')); // _Z_ by zaki 20161031
				part_problem_ma.proxy.setExtraParam('prod_date', record.get('prod_date')); //_Z_ imquality2nd 20161018
				part_problem_ma.proxy.setExtraParam('src_cat', x); // _Z_ by zaki 20161031
				part_problem_ma.loadPage(1); // _Z_ by zaki 20161031
				qty_problem_ma.proxy.setExtraParam('model', record.get('model_name')); // _Z_ by zaki 20161031
				qty_problem_ma.proxy.setExtraParam('prod_date', record.get('prod_date')); //_Z_ imquality2nd 20161018
				qty_problem_ma.proxy.setExtraParam('src_cat', x); // _Z_ by zaki 20161031
				qty_problem_ma.loadPage(1); // _Z_ by zaki 20161031
				part_problem_mecha.proxy.setExtraParam('model', record.get('model_name')); // _Z_ by zaki 20161031
				part_problem_mecha.proxy.setExtraParam('prod_date', record.get('prod_date')); //_Z_ imquality2nd 20161018
				part_problem_mecha.proxy.setExtraParam('src_cat', x); // _Z_ by zaki 20161031
				part_problem_mecha.loadPage(1); // _Z_ by zaki 20161031
				qty_problem_mecha.proxy.setExtraParam('model', record.get('model_name')); // _Z_ by zaki 20161031
				qty_problem_mecha.proxy.setExtraParam('prod_date', record.get('prod_date')); //_Z_ imquality2nd 20161018
				qty_problem_mecha.proxy.setExtraParam('src_cat', x); // _Z_ by zaki 20161031
				qty_problem_mecha.loadPage(1); // _Z_ by zaki 20161031
				/*============ problem info ==========*/
				partimoutset_store.proxy.setExtraParam('model', record.get('model_name'));
				partimoutset_store.proxy.setExtraParam('prod_date', record.get('prod_date'));
				partimoutset_store.proxy.setExtraParam('src_cat', x);
				partimoutset_store.loadPage(1);
				partimnav_store.proxy.setExtraParam('model', record.get('model_name'));
				partimnav_store.proxy.setExtraParam('prod_date', record.get('prod_date'));
				partimnav_store.proxy.setExtraParam('src_cat', x);
				partimnav_store.loadPage(1);
				fg_scanin_store.proxy.setExtraParam('model', record.get('model_name'));
				fg_scanin_store.proxy.setExtraParam('prod_no', Ext.getCmp('fld_prod_no').getValue());
				fg_scanin_store.proxy.setExtraParam('src_cat', x);
				fg_scanin_store.loadPage(1);
				fg_scanout_store.proxy.setExtraParam('model', record.get('model_name'));
				fg_scanout_store.proxy.setExtraParam('prod_no', Ext.getCmp('fld_prod_no').getValue());
				fg_scanout_store.proxy.setExtraParam('src_cat', x);
				fg_scanout_store.loadPage(1);
				part_fgsum_store.proxy.setExtraParam('model', record.get('model_name'));
				part_fgsum_store.loadPage(1);
				//how to get parameter prod_no ???
			}
		}
	});
	//-----------------------------------------//
	// --> Schedule SINGLE PARTS
	var sglprt_schedule = Ext.create('Ext.grid.Panel', {
		title: 'PLAN',
		width: '50%',
		height: '100%',
		store: sglprt_sched_store,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText: false
		},
		columns: [{
			header: 'Prod Date',
			dataIndex: 'prod_date',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Line Name',
			dataIndex: 'line_name',
			width: 90,
			renderer: upsize
		}, {
			header: 'Model Name',
			dataIndex: 'model_name',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Prod No',
			dataIndex: 'prod_no',
			width: 90,
			renderer: upsize
		}, {
			header: 'Lot Size',
			dataIndex: 'lot_size',
			width: 80,
			renderer: upsize
		}, {
			header: 'Start Serial',
			dataIndex: 'start_serial',
			flex: 1,
			renderer: upsize
		}]
	});
	//-----------------------------------------//
	// --> Grid data Part 2nd IM
	var grd_part2nd_im = Ext.create('Ext.grid.Panel', {
		id: 'grd_part2nd_im',
		width: '100%',
		height: 295,
		columnLines: true,
		store: partimoutset_store,
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
		features: [{
			ftype: 'filters',
			encode: encode, // json encode the filter query
			local: local
		}]
	});
	//-----------------------------------------//
	// --> Grid data IM Zero Defect 2nd
	var grd_part2ndim_zdbs = Ext.create('Ext.grid.Panel', {
		id: 'grd_part2ndim_zdbs',
		width: '100%',
		height: 295,
		columnLines: true,
		store: partimnav_store,
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
		}],
		features: [{
			ftype: 'filters',
			encode: encode, // json encode the filter query
			local: local
		}],
	});
	//-----------------------------------------//
	// --> Grid data Part Mechanical
	var grd_part2nd_mchcal = Ext.create('Ext.grid.Panel', {
		id: 'grd_part2nd_mchcal',
		width: '100%',
		height: 295,
		columnLines: true,
		store: part_mchcal,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText: false,
			enableTextSelection: true
		},
		columns: [{
			header: 'input_date',
			dataIndex: 'input_date',
			hidden: true
		}, {
			header: 'id',
			dataIndex: 'id',
			hidden: true
		}, {
			header: 'STATUS',
			dataIndex: 'status',
			width: 80,
			renderer: status,
			align: 'center'
		}, {
			header: 'PIC',
			dataIndex: 'action_user',
			width: 150,
			renderer: upsize
		}, {
			header: 'DATE INPUT',
			dataIndex: 'vw_inputdate',
			width: 150,
			renderer: upsize,
			align: 'center'
		}, {
			header: 'SYMPTOM',
			dataIndex: 'symptom',
			width: 150,
			renderer: upsize
		}, {
			header: 'PROBLEM AND CAUSE',
			dataIndex: 'probcause',
			width: 250,
			renderer: upsize
		}, {
			header: 'MODEL',
			dataIndex: 'model',
			width: 100,
			renderer: upsize
		}, {
			header: 'OCCURRED PLACE',
			columns: [{
				header: 'LINE',
				dataIndex: 'line',
				width: 70,
				renderer: upsize
			}, {
				header: 'SHIFT',
				dataIndex: 'shift',
				width: 50,
				renderer: upsize
			}]
		}, {
			header: 'PART NO',
			dataIndex: 'part_no',
			width: 150,
			renderer: upsize
		}, {
			header: 'PART NAME',
			dataIndex: 'part_name',
			width: 180,
			renderer: upsize
		}, {
			header: 'SUPPLIER',
			dataIndex: 'supplier',
			width: 200,
			renderer: upsize
		}, {
			header: 'REJECT QTY',
			dataIndex: 'rejectqty',
			width: 80,
			renderer: upsize
		}, {
			header: 'DETAIL PICTURE<BR>(CLICK IMAGE FOR ZOOM)',
			dataIndex: 'filepicture',
			width: 200,
			renderer: fileimage,
			align: 'center'
		}, {
			header: 'CORRECTION & METHOD',
			dataIndex: 'corrmethod',
			width: 500,
			renderer: upsize
		}, {
			header: 'LOSS TIME CORRECTION BY IQC ',
			columns: [{
				header: 'MAN POWER',
				dataIndex: 'mp',
				width: 50,
				renderer: upsize
			}, {
				header: 'TIME (H)',
				dataIndex: 'duration',
				width: 50,
				renderer: upsize
			}, {
				header: 'TOTAL',
				dataIndex: 'total',
				width: 50,
				renderer: upsize
			}]
		}, {
			header: 'ACTION ON SUPLIER',
			dataIndex: 'actionsupp',
			width: 500,
			renderer: upsize
		}, {
			header: 'REMARK',
			dataIndex: 'remark',
			width: 200,
			renderer: upsize
		}],
	});
	//-----------------------------------------//
	// --> Grid data Part Mechanism
	var grd_part2nd_mchnism = Ext.create('Ext.grid.Panel', {
		id: 'grd_part2nd_mchnism',
		width: '100%',
		height: 295,
		columnLines: true,
		store: part_mchnism,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText: false,
			enableTextSelection: true
		},
		columns: [{
			header: 'input_date',
			dataIndex: 'input_date',
			hidden: true
		}, {
			header: 'id',
			dataIndex: 'id',
			hidden: true
		}, {
			header: 'STATUS',
			dataIndex: 'status',
			width: 80,
			renderer: status,
			align: 'center'
		}, {
			header: 'PIC',
			dataIndex: 'action_user',
			width: 150,
			renderer: upsize
		}, {
			header: 'DATE INPUT',
			dataIndex: 'vw_inputdate',
			width: 150,
			renderer: upsize,
			align: 'center'
		}, {
			header: 'SYMPTOM',
			dataIndex: 'symptom',
			width: 150,
			renderer: upsize
		}, {
			header: 'PROBLEM AND CAUSE',
			dataIndex: 'probcause',
			width: 250,
			renderer: upsize
		}, {
			header: 'MODEL',
			dataIndex: 'model',
			width: 100,
			renderer: upsize
		}, {
			header: 'OCCURRED PLACE',
			columns: [{
				header: 'LINE',
				dataIndex: 'line',
				width: 70,
				renderer: upsize
			}, {
				header: 'SHIFT',
				dataIndex: 'shift',
				width: 50,
				renderer: upsize
			}]
		}, {
			header: 'PART NO',
			dataIndex: 'part_no',
			width: 150,
			renderer: upsize
		}, {
			header: 'PART NAME',
			dataIndex: 'part_name',
			width: 180,
			renderer: upsize
		}, {
			header: 'SUPPLIER',
			dataIndex: 'supplier',
			width: 200,
			renderer: upsize
		}, {
			header: 'REJECT QTY',
			dataIndex: 'rejectqty',
			width: 80,
			renderer: upsize
		}, {
			header: 'DETAIL PICTURE<BR>(CLICK IMAGE FOR ZOOM)',
			dataIndex: 'filepicture',
			width: 200,
			renderer: fileimage,
			align: 'center'
		}, {
			header: 'CORRECTION & METHOD',
			dataIndex: 'corrmethod',
			width: 500,
			renderer: upsize
		}, {
			header: 'LOSS TIME CORRECTION BY IQC ',
			columns: [{
				header: 'MAN POWER',
				dataIndex: 'mp',
				width: 50,
				renderer: upsize
			}, {
				header: 'TIME (H)',
				dataIndex: 'duration',
				width: 50,
				renderer: upsize
			}, {
				header: 'TOTAL',
				dataIndex: 'total',
				width: 50,
				renderer: upsize
			}]
		}, {
			header: 'ACTION ON SUPLIER',
			dataIndex: 'actionsupp',
			width: 500,
			renderer: upsize
		}, {
			header: 'REMARK',
			dataIndex: 'remark',
			width: 200,
			renderer: upsize
		}],
	});
	//-----------------------------------------//
	// --> Grid data Part Mechanical
	var grd_part2nd_mchtronics = Ext.create('Ext.grid.Panel', {
		id: 'grd_part2nd_mchtronics',
		width: '100%',
		height: 295,
		columnLines: true,
		store: part_mchtronics,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText: false,
			enableTextSelection: true
		},
		columns: [{
			header: 'input_date',
			dataIndex: 'input_date',
			hidden: true
		}, {
			header: 'id',
			dataIndex: 'id',
			hidden: true
		}, {
			header: 'STATUS',
			dataIndex: 'status',
			idth: 80,
			renderer: status,
			align: 'center'
		}, {
			header: 'PIC',
			dataIndex: 'action_user',
			width: 150,
			renderer: upsize
		}, {
			header: 'DATE INPUT',
			dataIndex: 'vw_inputdate',
			width: 150,
			renderer: upsize,
			align: 'center'
		}, {
			header: 'SYMPTOM',
			dataIndex: 'symptom',
			width: 150,
			renderer: upsize
		}, {
			header: 'PROBLEM AND CAUSE',
			dataIndex: 'probcause',
			width: 250,
			renderer: upsize
		}, {
			header: 'MODEL',
			dataIndex: 'model',
			width: 100,
			renderer: upsize
		}, {
			header: 'OCCURRED PLACE',
			columns: [{
				header: 'LINE',
				dataIndex: 'line',
				width: 70,
				renderer: upsize
			}, {
				header: 'SHIFT',
				dataIndex: 'shift',
				width: 50,
				renderer: upsize
			}]
		}, {
			header: 'PART NO',
			dataIndex: 'part_no',
			width: 150,
			renderer: upsize
		}, {
			header: 'PART NAME',
			dataIndex: 'part_name',
			width: 180,
			renderer: upsize
		}, {
			header: 'SUPPLIER',
			dataIndex: 'supplier',
			width: 200,
			renderer: upsize
		}, {
			header: 'REJECT QTY',
			dataIndex: 'rejectqty',
			width: 80,
			renderer: upsize
		}, {
			header: 'DETAIL PICTURE<BR>(CLICK IMAGE FOR ZOOM)',
			dataIndex: 'filepicture',
			width: 200,
			renderer: fileimage,
			align: 'center'
		}, {
			header: 'CORRECTION & METHOD',
			dataIndex: 'corrmethod',
			width: 500,
			renderer: upsize
		}, {
			header: 'LOSS TIME CORRECTION BY IQC ',
			columns: [{
				header: 'MAN POWER',
				dataIndex: 'mp',
				width: 50,
				renderer: upsize
			}, {
				header: 'TIME (H)',
				dataIndex: 'duration',
				width: 50,
				renderer: upsize
			}, {
				header: 'TOTAL',
				dataIndex: 'total',
				width: 50,
				renderer: upsize
			}]
		}, {
			header: 'ACTION ON SUPLIER',
			dataIndex: 'actionsupp',
			width: 500,
			renderer: upsize
		}, {
			header: 'REMARK',
			dataIndex: 'remark',
			width: 200,
			renderer: upsize
		}],
	});
	//-----------------------------------------//
	// --> Grid data IM Output 2nd
	var grd_im_output2nd = Ext.create('Ext.grid.Panel', {
		id: 'grd_im_output2nd',
		width: '100%',
		height: 295,
		columnLines: true,
		store: procimprodres_store,
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
			header: 'Model Name',
			dataIndex: 'model_name',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Output',
			dataIndex: 'output',
			flex: 1,
			renderer: upsize
		}]
	});
	//-----------------------------------------//
	// --> Grid data IM Downtime Report 2nd
	var grd_im_downtime2nd = Ext.create('Ext.grid.Panel', { // _Z_ Single Part
		id: 'grd_im_downtime2nd',
		width: '100%',
		height: 295,
		columnLines: true,
		store: procimdownrep_store,
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
			renderer: upsize
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
			renderer: upsize
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
		features: [{
			ftype: 'filters',
			encode: encode, // json encode the filter query
			local: local
		}],
	});
	// --> Grid data IM Quality Report ---------------------------// _Z_ created by Zaki 20161017
	var grd_im_quality2nd = Ext.create('Ext.grid.Panel', {
		id: 'grd_im_quality2nd',
		width: '100%',
		height: 295,
		columnLines: true,
		store: procimquality_store,
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
		features: [{
			ftype: 'filters',
			encode: encode,
			local: local
		}]
	});
	//-----------------------------------------//
	//-----------------------------------------//
	// --> Grid data Prod. Quality Report 2nd
	var grd_prd_quality2nd = Ext.create('Ext.grid.Panel', {
		id: 'grd_prd_quality2nd',
		width: '100%',
		height: 295,
		columnLines: true,
		store: procmaqrep_store,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText: false,
			enableTextSelection: true
		},
		columns: [{
			header: 'Prod. Date',
			dataIndex: 'date',
			width: 100,
			renderer: upsize
		}, {
			header: 'Line Name',
			dataIndex: 'line_name',
			width: 90,
			renderer: upsize
		}, {
			header: 'Shift',
			dataIndex: 'shift',
			width: 50,
			renderer: upsize
		}, {
			header: 'Model Name',
			dataIndex: 'model_name',
			width: 130,
			renderer: upsize
		}, {
			header: 'Lot Size',
			dataIndex: 'lot',
			width: 70,
			renderer: upsize
		}, {
			header: 'Prod No',
			dataIndex: 'prod_no',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Start Serial',
			dataIndex: 'st_serial',
			flex: 1,
			renderer: upsize
		}, {
			header: 'SN O/P',
			dataIndex: 'serial_output',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Symptom',
			dataIndex: 'symptom',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Defective Cause',
			dataIndex: 'def_cause',
			flex: 1,
			renderer: upsize
		}, {
			header: 'P. Disposal',
			dataIndex: 'p_disposal',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Responsible',
			dataIndex: 'responsible',
			flex: 1,
			renderer: upsize
		}, ]
	});
	//-----------------------------------------//
	// --> Grid data Prod. Losttime Report 2nd
	var grd_prd_losttime2nd = Ext.create('Ext.grid.Panel', {
		id: 'grd_prd_losttime2nd',
		width: '100%',
		height: 295,
		columnLines: true,
		store: procmaltr_store,
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
			header: 'Model Name',
			dataIndex: 'model_name',
			width: 130,
			renderer: upsize
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
			header: 'Shift',
			dataIndex: 'shift',
			width: 50,
			renderer: upsize
		}, {
			header: 'Department',
			dataIndex: 'dept',
			width: 95,
			renderer: upsize
		}]
	});
	//-----------------------------------------//
	// --> Grid data Finish Good Scan In 2nd
	var grd_scanin_2nd = Ext.create('Ext.grid.Panel', {
		id: 'grd_scanin_2nd',
		width: '100%',
		height: 295,
		columnLines: true,
		store: fg_scanin_store,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText: false,
			enableTextSelection: true
		},
		columns: [{
			header: 'NO.',
			xtype: 'rownumberer',
			width: 45,
			sortable: false
		}, {
			header: 'Model Name',
			dataIndex: 'model_name',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Serial No ID',
			dataIndex: 'serialno_id',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Start Serial',
			dataIndex: 'start_serial',
			flex: 1,
			renderer: upsize,
			hidden: true
		}, {
			header: 'Scan Date',
			dataIndex: 'scandate',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Input Date',
			dataIndex: 'inputdate',
			flex: 1,
			renderer: upsize,
			hidden: true
		}, {
			header: 'Update Date',
			dataIndex: 'updatedate',
			flex: 1,
			renderer: upsize,
			hidden: true
		}]
	});
	//----------------------------------------//
	// --> Grid data Finish Good Scan Out 2nd
	var grd_scanout_2nd = Ext.create('Ext.grid.Panel', {
		id: 'grd_scanout_2nd',
		width: '100%',
		height: 295,
		columnLines: true,
		store: fg_scanout_store,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText: false,
			enableTextSelection: true
		},
		columns: [{
			header: 'NO.',
			xtype: 'rownumberer',
			width: 45,
			sortable: false
		}, {
			header: 'Model Name',
			dataIndex: 'model_name',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Serial No ID',
			dataIndex: 'serialno_id',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Scan Date',
			dataIndex: 'scandate',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Input Date',
			dataIndex: 'inputdate',
			flex: 1,
			renderer: upsize,
			hidden: true
		}, {
			header: 'Update Date',
			dataIndex: 'updatedate',
			flex: 1,
			renderer: upsize,
			hidden: true
		}]
	});
	//---------------------------------------//
	// --> Grid data Finish Good Summary 2nd
	var grd_fgsum_2nd = Ext.create('Ext.grid.Panel', {
		id: 'grd_fgsum_2nd',
		width: '100%',
		height: 295,
		columnLines: true,
		store: part_fgsum_store,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText: false,
			enableTextSelection: true
		},
		columns: [{
			header: 'Model Name',
			dataIndex: 'model_name',
			flex: 1,
			renderer: upsize
		}, {
			header: 'All Stock',
			dataIndex: 'allstock',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Before Stockcard',
			dataIndex: 'tmpstock',
			flex: 1,
			renderer: upsize
		}, {
			header: 'After Stockcard',
			dataIndex: 'tmpstock_sc',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Ready Stock',
			dataIndex: 'readystock',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Hold Stock',
			dataIndex: 'holdstock',
			flex: 1,
			renderer: upsize
		}]
	});
	//---------------------------------------//
	//----------------MAIN PANEL---------------//
	var main_panel_part = Ext.create('Ext.panel.Panel', { //_Z_ MAINPANEL_SINGLEPART
		title: 'Traceability Search',
		id: 'main_panel_part',
		region: 'north',
		width: '100%',
		height: 300,
		minHeight: 300,
		layout: {
			type: 'hbox',
			align: 'strecth'
		},
		items: [main_grid_2nd],
		tbar: [{
				xtype: 'hiddenfield',
				id: 'fld_prod_no'
			}, {
				xtype: 'tbspacer',
				width: 5
			}, {
				xtype: 'radiogroup',
				fieldLabel: 'Category',
				id: 'rb2',
				columns: [100, 100, 10, 10],
				labelWidth: 50,
				vertical: true,
				items: [{
					boxLabel: 'Finish Good',
					name: 'src_cat2',
					inputValue: 'fg'
				}, {
					boxLabel: 'Single Parts',
					name: 'src_cat2',
					checked: true,
					inputValue: 'sp'
				}, {
					boxLabel: 'Model and Lotno',
					name: 'src_cat2',
					inputValue: 'ml',
					width: 120
				}, {
					boxLabel: 'Symptom',
					name: 'src_cat2',
					inputValue: 'sym',
					width: 100
				}],
				listeners: {
					change: function() {
						var x = Ext.getCmp('rb2').getValue()['src_cat2'];
						if (x == 'sp') {
							panel_master.hide();
							panel_single_part.show();
							panel_modellotno.hide();
							panel_symptom.hide();
							Ext.getCmp('rb2').reset();
						} else if (x == 'fg') {
							panel_master.show();
							panel_single_part.hide();
							panel_modellotno.hide();
							panel_symptom.hide();
							Ext.getCmp('rb').reset();
						} else if (x == 'ml') {
							panel_master.hide();
							panel_single_part.hide();
							panel_modellotno.show();
							panel_symptom.hide();
							Ext.getCmp('rb3').reset();
						} else {
							panel_master.hide();
							panel_single_part.hide();
							panel_modellotno.show();
							panel_symptom.show();
							Ext.getCmp('rb4').reset();
						}
					}
				}
			}, {
				xtype: 'tbspacer',
				width: 30
			}, '-', {
				xtype: 'hiddenfield',
				id: 'dl_partno',
				name: 'dl_partno'
			}, {
				xtype: 'hiddenfield',
				id: 'dl_pono',
				name: 'dl_pono'
			}, {
				xtype: 'hiddenfield',
				id: 'dl_sdate',
				name: 'dl_sdate'
			}, {
				xtype: 'hiddenfield',
				id: 'dl_edate',
				name: 'dl_edate'
			}, {
				xtype: 'button',
				id: 'src_part',
				name: 'src_part',
				text: 'SEARCH',
				iconCls: 'search',
				scale: 'medium'
				//handler: src_part
			}, {
				xtype: 'button',
				id: 'dl_part',
				name: 'dl_part',
				text: 'Download',
				iconCls: 'download',
				scale: 'medium',
				disabled: true,
				handler: function() {
					var dl_partno = Ext.getCmp('dl_partno').getValue();
					var dl_pono = Ext.getCmp('dl_pono').getValue();
					var dl_sdate = Ext.getCmp('dl_sdate').getValue();
					var dl_edate = Ext.getCmp('dl_edate').getValue();
					window.open('resp/resp_download.php?dl_partno=' + dl_partno + '&dl_pono=' + dl_pono + '&dl_sdate=' + dl_sdate + '&dl_edate=' + dl_edate + '');
				}
			}, '->',
			clock2, '  '
		],
		listeners: {
			render: {
				fn: function() {
					Ext.fly(clock2.getEl().parent()).addCls('x-status-text-panel').createChild({
						cls: 'spacer'
					});
					Ext.TaskManager.start({
						run: function() {
							Ext.fly(clock2.getEl()).update(Ext.Date.format(new Date(), 'M, D-Y g:i:s A'));
						},
						interval: 1000
					});
				},
				delay: 100
			}
		}
	});
	//-----------------------------------------//
	//---------------SUB MAIN PANEL------------//
	var sub_panel_part = Ext.create('Ext.panel.Panel', {
		//title		: 'SUB PANEL',
		autoScroll: true,
		id: 'sub_panel_part',
		region: 'center',
		autoWidth: true,
		height: 150,
		layout: {
			type: 'hbox',
			align: 'strecth'
		},
		items: [sglprt_schedule, {
			xtype: 'tbspacer'
		}, sglprt_outcount]
	});
	//-----------------------------------------//
	//----------------1ST PANEL---------------//
	var panel_1st = Ext.create('Ext.panel.Panel', {
		region: 'north',
		width: '100%',
		height: 450,
		minHeight: 450,
		layout: 'border',
		defaults: {
			split: true
		},
		items: [main_panel_part, sub_panel_part]
	});
	//-----------------------------------------//
	//---------------2ND TAB PANEL-------------//
	var tab_part2nd_im = Ext.create('Ext.tab.Panel', {
		tabPosition: 'left',
		autoHeight: true,
		activeTab: 0,
		width: '100%',
		style: 'padding:5px;-background:#157FCC;',
		items: [{
			title: 'Outset Inquiry',
			reorderable: false,
			items: [grd_part2nd_im]
		}, {
			title: 'IM Part Navigation',
			reorderable: false,
			items: [grd_part2ndim_zdbs]
		}]
	});
	var tab_part2nd_iqc = Ext.create('Ext.tab.Panel', {
		tabPosition: 'left',
		autoHeight: true,
		activeTab: 0,
		width: '100%',
		style: 'padding:5px;-background:#157FCC;',
		items: [{
			title: 'Mechanical',
			reorderable: false,
			items: [grd_part2nd_mchcal]
		}, {
			title: 'Mechanism',
			reorderable: false,
			items: [grd_part2nd_mchnism]
		}, {
			title: 'Mechatronics',
			reorderable: false,
			items: [grd_part2nd_mchtronics]
		}]
	});
	var proc2nd_im = Ext.create('Ext.tab.Panel', {
		tabPosition: 'left',
		autoHeight: true,
		activeTab: 0,
		width: '100%',
		style: 'padding:5px;-background:#157FCC;',
		items: [{
			title: 'Production Result',
			reorderable: false,
			items: [grd_im_output2nd]
		}, {
			title: 'Downtime Report',
			reorderable: false,
			items: [grd_im_downtime2nd]
		}, {
			title: 'Quality Report', //_Z_ imquality2nd 20161018
			reorderable: false, //_Z_ imquality2nd 20161018
			items: [grd_im_quality2nd] //_Z_ imquality2nd 20161018
		}]
	});
	var proc2nd_ma = Ext.create('Ext.tab.Panel', {
		tabPosition: 'left',
		autoHeight: true,
		activeTab: 0,
		width: '100%',
		style: 'padding:5px;-background:#157FCC;',
		items: [{
			title: 'Quality Report',
			reorderable: false,
			items: [grd_prd_quality2nd]
		}, {
			title: 'Lost Time Report',
			reorderable: false,
			items: [grd_prd_losttime2nd]
		}]
	});
	var tab_part_2nd = Ext.create('Ext.tab.Panel', {
		title: 'Part',
		autoHeight: true,
		plain: true,
		activeTab: 0,
		width: '100%',
		style: 'padding:5px;-background:#157FCC;',
		items: [{
				title: 'IM',
				reorderable: false,
				items: [tab_part2nd_im]
			}, {
				title: 'IQC',
				reorderable: false,
				items: [tab_part2nd_iqc]
			}
			/*,{
							title       : 'MC',
							reorderable	: false,
							items		: [tab_part_mc]
						},{
							title		: 'MECHA',
							reorderable	: false,
							items		: [proc_mecha],
						}*/
		]
	});
	var tab_process_2nd = Ext.create('Ext.tab.Panel', {
		title: 'Process',
		autoHeight: true,
		plain: true,
		activeTab: 0,
		width: '100%',
		style: 'padding:5px;-background:#157FCC;',
		items: [{
				title: 'IM',
				reorderable: false,
				items: [proc2nd_im]
			}, {
				title: 'MA',
				reorderable: false,
				items: [proc2nd_ma]
			}
			/*,{
							title		: 'MECHA',
							reorderable	: false,
							items		: [proc_mecha],
						}*/
		]
	});
	var tab_fg_2nd = Ext.create('Ext.tab.Panel', {
		title: 'Finished Good',
		autoHeight: true,
		plain: true,
		activeTab: 0,
		width: '100%',
		style: 'padding:5px;-background:#157FCC;',
		items: [{
			title: 'SCAN IN',
			reorderable: false,
			items: [grd_scanin_2nd]
		}, {
			title: 'SCAN OUT',
			reorderable: false,
			items: [grd_scanout_2nd]
		}, {
			title: 'SUMMARY',
			reorderable: false,
			items: [grd_fgsum_2nd],
		}]
	});
	/*================== PROBLEM INFORMATION TAB =================*/
	// --> GRID
	var grd_part_problem_mc_2nd = Ext.create('Ext.grid.Panel', {
		id: 'grd_part_problem_mc_2nd',
		width: '100%',
		height: 295,
		columnLines: true,
		//     store       : part_problem_mc,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText: false,
			enableTextSelection: true
		},
		columns: [
			// 	fields	: ['id_part','line','shift','prod_date','div','dept','model_name','lotno','part_name','partno','shortage_qty','supplier_name','id_resp','resp','comment','paging','line_form','read_status','input_userid','input_nik','id_condition','condition']
			{
				header: 'PROD. DATE',
				dataIndex: 'prod_date',
				flex: 1,
				renderer: upsize
			}, {
				header: 'STATUS',
				dataIndex: 'read_status',
				flex: 1,
				renderer: problem_status
			}, {
				header: 'CONDITION',
				dataIndex: 'condition',
				flex: 1,
				renderer: upsize
			}, {
				header: 'LINE',
				dataIndex: 'line',
				flex: 1,
				renderer: upsize
			}, {
				header: 'MODEL',
				dataIndex: 'model_name',
				flex: 1,
				renderer: upsize
			}, {
				header: 'LOT NO',
				dataIndex: 'lotno',
				flex: 1,
				renderer: upsize
			}, {
				header: 'PART NAME',
				dataIndex: 'part_name',
				flex: 1,
				renderer: upsize
			}, {
				header: 'PART NO',
				dataIndex: 'partno',
				flex: 1,
				renderer: upsize
			}, {
				header: 'SHORTAGE QTY',
				dataIndex: 'shortage_qty',
				flex: 1,
				renderer: upsize
			}, {
				header: 'SUPPLIER NAME',
				dataIndex: 'supplier_name',
				flex: 1,
				renderer: upsize
			}, {
				header: 'RESP',
				dataIndex: 'resp',
				flex: 1,
				renderer: upsize,
				hidden: true
			}, {
				header: 'REMARK',
				dataIndex: 'comment',
				flex: 1,
				renderer: upsize
			}, {
				header: 'USER ID',
				dataIndex: 'input_userid',
				flex: 1,
				renderer: upsize
			}
		]
	});
	var grd_qty_problem_mc_2nd = Ext.create('Ext.grid.Panel', {
		id: 'grd_qty_problem_mc_2nd',
		width: '100%',
		height: 295,
		columnLines: true,
		//    store       : qty_problem_mc,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText: false,
			enableTextSelection: true
		},
		columns: [
			//	fields	: ['id_quality','prod_date','div','dept','line','shift','model','lot_no','id_symptom','symptom','id_defcause','defcause','reject','id_resp','read_status','input_userid','input_nik','id_condition','condition']
			{
				header: 'PROD. DATE',
				dataIndex: 'prod_date',
				flex: 1,
				renderer: upsize
			}, {
				header: 'STATUS',
				dataIndex: 'read_status',
				flex: 1,
				renderer: problem_status
			}, {
				header: 'CONDITION',
				dataIndex: 'condition',
				flex: 1,
				renderer: upsize
			}, {
				header: 'LINE',
				dataIndex: 'line',
				flex: 1,
				renderer: upsize
			}, {
				header: 'MODEL',
				dataIndex: 'model',
				flex: 1,
				renderer: upsize
			}, {
				header: 'LOT NO',
				dataIndex: 'lot_no',
				flex: 1,
				renderer: upsize
			}, {
				header: 'SYMPTOM',
				dataIndex: 'symptom',
				flex: 1,
				renderer: upsize
			}, {
				header: 'DEFECT. CAUSE',
				dataIndex: 'defcause',
				flex: 1,
				renderer: upsize
			}, {
				header: 'REJECT',
				dataIndex: 'reject_rate',
				flex: 1,
				renderer: upsize
			}, {
				header: 'USER ID',
				dataIndex: 'input_userid',
				flex: 1,
				renderer: upsize
			}
		]
	});
	var grd_part_problem_ma_2nd = Ext.create('Ext.grid.Panel', {
		id: 'grd_part_problem_ma_2nd',
		width: '100%',
		height: 295,
		columnLines: true,
		store: part_problem_ma,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText: false,
			enableTextSelection: true
		},
		columns: [
			// 	fields	: ['id_part','line','shift','prod_date','div','dept','model_name','lotno','part_name','partno','shortage_qty','supplier_name','id_resp','resp','comment','paging','line_form','read_status','input_userid','input_nik','id_condition','condition']
			{
				header: 'PROD. DATE',
				dataIndex: 'prod_date',
				flex: 1,
				renderer: upsize
			}, {
				header: 'STATUS',
				dataIndex: 'read_status',
				flex: 1,
				renderer: problem_status
			}, {
				header: 'CONDITION',
				dataIndex: 'condition',
				flex: 1,
				renderer: upsize
			}, {
				header: 'LINE',
				dataIndex: 'line',
				flex: 1,
				renderer: upsize
			}, {
				header: 'MODEL',
				dataIndex: 'model_name',
				flex: 1,
				renderer: upsize
			}, {
				header: 'LOT NO',
				dataIndex: 'lotno',
				flex: 1,
				renderer: upsize
			}, {
				header: 'PART NAME',
				dataIndex: 'part_name',
				flex: 1,
				renderer: upsize
			}, {
				header: 'PART NO',
				dataIndex: 'partno',
				flex: 1,
				renderer: upsize
			}, {
				header: 'SHORTAGE QTY',
				dataIndex: 'shortage_qty',
				flex: 1,
				renderer: upsize
			}, {
				header: 'SUPPLIER NAME',
				dataIndex: 'supplier_name',
				flex: 1,
				renderer: upsize
			}, {
				header: 'RESP',
				dataIndex: 'resp',
				flex: 1,
				renderer: upsize,
				hidden: true
			}, {
				header: 'REMARK',
				dataIndex: 'comment',
				flex: 1,
				renderer: upsize
			}, {
				header: 'USER ID',
				dataIndex: 'input_userid',
				flex: 1,
				renderer: upsize
			}
		]
	});
	var grd_qty_problem_ma_2nd = Ext.create('Ext.grid.Panel', {
		id: 'grd_qty_problem_ma_2nd',
		width: '100%',
		height: 295,
		columnLines: true,
		store: qty_problem_ma,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText: false,
			enableTextSelection: true
		},
		columns: [
			//	fields	: ['id_quality','prod_date','div','dept','line','shift','model','lot_no','id_symptom','symptom','id_defcause','defcause','reject','id_resp','read_status','input_userid','input_nik','id_condition','condition']
			{
				header: 'PROD. DATE',
				dataIndex: 'prod_date',
				flex: 1,
				renderer: upsize
			}, {
				header: 'STATUS',
				dataIndex: 'read_status',
				flex: 1,
				renderer: problem_status
			}, {
				header: 'CONDITION',
				dataIndex: 'condition',
				flex: 1,
				renderer: upsize
			}, {
				header: 'LINE',
				dataIndex: 'line',
				flex: 1,
				renderer: upsize
			}, {
				header: 'MODEL',
				dataIndex: 'model',
				flex: 1,
				renderer: upsize
			}, {
				header: 'LOT NO',
				dataIndex: 'lot_no',
				flex: 1,
				renderer: upsize
			}, {
				header: 'SYMPTOM',
				dataIndex: 'symptom',
				flex: 1,
				renderer: upsize
			}, {
				header: 'DEFECT. CAUSE',
				dataIndex: 'defcause',
				flex: 1,
				renderer: upsize
			}, {
				header: 'REJECT',
				dataIndex: 'reject_rate',
				flex: 1,
				renderer: upsize
			}, {
				header: 'USER ID',
				dataIndex: 'input_userid',
				flex: 1,
				renderer: upsize
			}
		]
	});
	var grd_part_problem_mecha_2nd = Ext.create('Ext.grid.Panel', {
		id: 'grd_part_problem_mecha_2nd',
		width: '100%',
		height: 295,
		columnLines: true,
		store: part_problem_mecha,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText: false,
			enableTextSelection: true
		},
		columns: [
			// 	fields	: ['id_part','line','shift','prod_date','div','dept','model_name','lotno','part_name','partno','shortage_qty','supplier_name','id_resp','resp','comment','paging','line_form','read_status','input_userid','input_nik','id_condition','condition']
			{
				header: 'PROD. DATE',
				dataIndex: 'prod_date',
				flex: 1,
				renderer: upsize
			}, {
				header: 'STATUS',
				dataIndex: 'read_status',
				flex: 1,
				renderer: problem_status
			}, {
				header: 'CONDITION',
				dataIndex: 'condition',
				flex: 1,
				renderer: upsize
			}, {
				header: 'LINE',
				dataIndex: 'line',
				flex: 1,
				renderer: upsize
			}, {
				header: 'MODEL',
				dataIndex: 'model_name',
				flex: 1,
				renderer: upsize
			}, {
				header: 'LOT NO',
				dataIndex: 'lotno',
				flex: 1,
				renderer: upsize
			}, {
				header: 'PART NAME',
				dataIndex: 'part_name',
				flex: 1,
				renderer: upsize
			}, {
				header: 'PART NO',
				dataIndex: 'partno',
				flex: 1,
				renderer: upsize
			}, {
				header: 'SHORTAGE QTY',
				dataIndex: 'shortage_qty',
				flex: 1,
				renderer: upsize
			}, {
				header: 'SUPPLIER NAME',
				dataIndex: 'supplier_name',
				flex: 1,
				renderer: upsize
			}, {
				header: 'RESP',
				dataIndex: 'resp',
				flex: 1,
				renderer: upsize,
				hidden: true
			}, {
				header: 'REMARK',
				dataIndex: 'comment',
				flex: 1,
				renderer: upsize
			}, {
				header: 'USER ID',
				dataIndex: 'input_userid',
				flex: 1,
				renderer: upsize
			}
		]
	});
	var grd_qty_problem_mecha_2nd = Ext.create('Ext.grid.Panel', {
		id: 'grd_qty_problem_mecha_2nd',
		width: '100%',
		height: 295,
		columnLines: true,
		store: qty_problem_mecha,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText: false,
			enableTextSelection: true
		},
		columns: [
			//	fields	: ['id_quality','prod_date','div','dept','line','shift','model','lot_no','id_symptom','symptom','id_defcause','defcause','reject','id_resp','read_status','input_userid','input_nik','id_condition','condition']
			{
				header: 'PROD. DATE',
				dataIndex: 'prod_date',
				flex: 1,
				renderer: upsize
			}, {
				header: 'STATUS',
				dataIndex: 'read_status',
				flex: 1,
				renderer: problem_status
			}, {
				header: 'CONDITION',
				dataIndex: 'condition',
				flex: 1,
				renderer: upsize
			}, {
				header: 'LINE',
				dataIndex: 'line',
				flex: 1,
				renderer: upsize
			}, {
				header: 'MODEL',
				dataIndex: 'model',
				flex: 1,
				renderer: upsize
			}, {
				header: 'LOT NO',
				dataIndex: 'lot_no',
				flex: 1,
				renderer: upsize
			}, {
				header: 'SYMPTOM',
				dataIndex: 'symptom',
				flex: 1,
				renderer: upsize
			}, {
				header: 'DEFECT. CAUSE',
				dataIndex: 'defcause',
				flex: 1,
				renderer: upsize
			}, {
				header: 'REJECT',
				dataIndex: 'reject_rate',
				flex: 1,
				renderer: upsize
			}, {
				header: 'USER ID',
				dataIndex: 'input_userid',
				flex: 1,
				renderer: upsize
			}
		]
	});
	var grd_part_problem_iqc_2nd = Ext.create('Ext.grid.Panel', {
		id: 'grd_part_problem_iqc_2nd',
		width: '100%',
		height: 295,
		columnLines: true,
		store: part_problem_iqc,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText: false,
			enableTextSelection: true
		},
		columns: [
			// 	fields	: ['id_part','line','shift','prod_date','div','dept','model_name','lotno','part_name','partno','shortage_qty','supplier_name','id_resp','resp','comment','paging','line_form','read_status','input_userid','input_nik','id_condition','condition']
			{
				header: 'PROD. DATE',
				dataIndex: 'prod_date',
				flex: 1,
				renderer: upsize
			}, {
				header: 'STATUS',
				dataIndex: 'read_status',
				flex: 1,
				renderer: problem_status
			}, {
				header: 'CONDITION',
				dataIndex: 'condition',
				flex: 1,
				renderer: upsize
			}, {
				header: 'LINE',
				dataIndex: 'line',
				flex: 1,
				renderer: upsize
			}, {
				header: 'MODEL',
				dataIndex: 'model_name',
				flex: 1,
				renderer: upsize
			}, {
				header: 'LOT NO',
				dataIndex: 'lotno',
				flex: 1,
				renderer: upsize
			}, {
				header: 'PART NAME',
				dataIndex: 'part_name',
				flex: 1,
				renderer: upsize
			}, {
				header: 'PART NO',
				dataIndex: 'partno',
				flex: 1,
				renderer: upsize
			}, {
				header: 'SHORTAGE QTY',
				dataIndex: 'shortage_qty',
				flex: 1,
				renderer: upsize
			}, {
				header: 'SUPPLIER NAME',
				dataIndex: 'supplier_name',
				flex: 1,
				renderer: upsize
			}, {
				header: 'RESP',
				dataIndex: 'resp',
				flex: 1,
				renderer: upsize,
				hidden: true
			}, {
				header: 'REMARK',
				dataIndex: 'comment',
				flex: 1,
				renderer: upsize
			}, {
				header: 'USER ID',
				dataIndex: 'input_userid',
				flex: 1,
				renderer: upsize
			}
		]
	});
	var grd_qty_problem_iqc_2nd = Ext.create('Ext.grid.Panel', {
		id: 'grd_qty_problem_iqc_2nd',
		width: '100%',
		height: 295,
		columnLines: true,
		store: qty_problem_iqc,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText: false,
			enableTextSelection: true
		},
		columns: [
			//	fields	: ['id_quality','prod_date','div','dept','line','shift','model','lot_no','id_symptom','symptom','id_defcause','defcause','reject','id_resp','read_status','input_userid','input_nik','id_condition','condition']
			{
				header: 'PROD. DATE',
				dataIndex: 'prod_date',
				flex: 1,
				renderer: upsize
			}, {
				header: 'STATUS',
				dataIndex: 'read_status',
				flex: 1,
				renderer: problem_status
			}, {
				header: 'CONDITION',
				dataIndex: 'condition',
				flex: 1,
				renderer: upsize
			}, {
				header: 'LINE',
				dataIndex: 'line',
				flex: 1,
				renderer: upsize
			}, {
				header: 'MODEL',
				dataIndex: 'model',
				flex: 1,
				renderer: upsize
			}, {
				header: 'LOT NO',
				dataIndex: 'lot_no',
				flex: 1,
				renderer: upsize
			}, {
				header: 'SYMPTOM',
				dataIndex: 'symptom',
				flex: 1,
				renderer: upsize
			}, {
				header: 'DEFECT. CAUSE',
				dataIndex: 'defcause',
				flex: 1,
				renderer: upsize
			}, {
				header: 'REJECT',
				dataIndex: 'reject_rate',
				flex: 1,
				renderer: upsize
			}, {
				header: 'USER ID',
				dataIndex: 'input_userid',
				flex: 1,
				renderer: upsize
			}
		]
	});
	// --> TAB DEPARTMENT
	var tab_problem_iqc_2nd = Ext.create('Ext.tab.Panel', {
		tabPosition: 'left',
		autoHeight: true,
		activeTab: 0,
		width: '100%',
		style: 'padding:5px;-background:#157FCC;',
		items: [{
			title: 'Part Problem',
			reorderable: false,
			items: [grd_part_problem_iqc_2nd]
		}, {
			title: 'Quality Problem',
			reorderable: false,
			items: [grd_qty_problem_iqc_2nd]
		}]
	});
	var tab_problem_ma_2nd = Ext.create('Ext.tab.Panel', {
		tabPosition: 'left',
		autoHeight: true,
		activeTab: 0,
		width: '100%',
		style: 'padding:5px;-background:#157FCC;',
		items: [{
			title: 'Part Problem',
			reorderable: false,
			items: [grd_part_problem_ma_2nd]
		}, {
			title: 'Quality Problem',
			reorderable: false,
			items: [grd_qty_problem_ma_2nd]
		}]
	});
	var tab_problem_mc_2nd = Ext.create('Ext.tab.Panel', {
		tabPosition: 'left',
		autoHeight: true,
		activeTab: 0,
		width: '100%',
		style: 'padding:5px;-background:#157FCC;',
		items: [{
			title: 'Part Problem',
			reorderable: false,
			items: [grd_part_problem_mc_2nd]
		}, {
			title: 'Quality Problem',
			reorderable: false,
			items: [grd_qty_problem_mc_2nd]
		}]
	});
	var tab_problem_mecha_2nd = Ext.create('Ext.tab.Panel', {
		tabPosition: 'left',
		autoHeight: true,
		activeTab: 0,
		width: '100%',
		style: 'padding:5px;-background:#157FCC;',
		items: [{
			title: 'Part Problem',
			reorderable: false,
			items: [grd_part_problem_mecha_2nd]
		}, {
			title: 'Quality Problem',
			reorderable: false,
			items: [grd_qty_problem_mecha_2nd]
		}]
	});
	// --> TAB MASTER PROBLEM INFO
	var tab_problem_2nd = Ext.create('Ext.tab.Panel', {
		title: 'Problem Info',
		autoHeight: true,
		plain: true,
		activeTab: 0,
		width: '100%',
		style: 'padding:5px;-background:#157FCC;',
		items: [{ //SHORT BY TITLE ASC
			title: 'IQC',
			reorderable: false,
			items: [tab_problem_iqc_2nd]
		}, {
			title: 'MA',
			reorderable: false,
			items: [tab_problem_ma_2nd]
		}, {
			title: 'MC',
			reorderable: false,
			items: [tab_problem_mc_2nd]
		}, {
			title: 'MECHA',
			reorderable: false,
			items: [tab_problem_mecha_2nd]
		}]
	});
	/*==================* PROBLEM INFORMATION TAB *=================*/
	var tab_panel_2nd = Ext.create('Ext.tab.Panel', {
		//bodyStyle   : 'padding:0',
		//tabPosition	: 'left',
		activeTab: 0,
		width: '100%',
		items: [tab_part_2nd, tab_process_2nd, tab_fg_2nd, tab_problem_2nd]
	});
	//-----------------------------------------//
	//---------------2ND PANEL--------------//
	var panel_2nd = Ext.create('Ext.panel.Panel', {
		region: 'center',
		width: '100%',
		height: 550,
		layout: 'vbox',
		items: [tab_panel_2nd]
	});
	//-----------------------------------------//
	//---------------PANEL SINGLE PART--------------//
	var panel_single_part = Ext.create('Ext.panel.Panel', {
		renderTo: 'hasildata',
		width: '100%',
		height: 830,
		//autoHeight	: true,
		layout: 'border',
		hidden: true,
		defaults: {
			split: true,
			collapsible: false
		},
		items: [panel_1st, panel_2nd]
	});
	//-----------------------------------------//
	//	******
	//	**	created by Mohamad Yunus
	//	**	Model Lot No MA and Mecha
	//	json
	//	**
	var schedule = Ext.create('Ext.data.Store', {
		model: 'sched_data',
		autoLoad: false,
		proxy: {
			type: 'ajax',
			url: 'json/json_modellot_sch.php',
			reader: {
				type: 'json',
				root: 'rows'
			}
		},
		listeners: {
			load: function(store, records) {
				var prod_date = store.getAt(0).get('prod_date');
				var model_name = store.getAt(0).get('model_name');
				var prod_no = store.getAt(0).get('prod_no');
				var lot_size = store.getAt(0).get('lot_size');
				var start_serial = store.getAt(0).get('start_serial');
				var x = Ext.getCmp('rb3').getValue()['src_cat3'];
				var rbprod = Ext.getCmp('rbprod').getValue()['srcprod'];
				//	for grid actual
				actual.proxy.setExtraParam('model', model_name);
				actual.proxy.setExtraParam('prod_no', prod_no);
				actual.proxy.setExtraParam('lot_size', lot_size);
				actual.proxy.setExtraParam('st_serial', start_serial);
				actual.proxy.setExtraParam('src_cat', x);
				actual.proxy.setExtraParam('valrbprod', rbprod);
				actual.loadPage(1);
				//	for grid part > im > outsetinquiry
				partim.proxy.setExtraParam('prod_date', prod_date);
				partim.proxy.setExtraParam('model', model_name);
				partim.proxy.setExtraParam('st_serial', start_serial);
				partim.proxy.setExtraParam('src_cat', x);
				partim.loadPage(1);
				//	for grid part > im > partnavigation
				partimzdbs.proxy.setExtraParam('prod_date', prod_date);
				partimzdbs.proxy.setExtraParam('model', model_name);
				partimzdbs.loadPage(1);
				//	for grid part > mc > partnavigation
				partmcissue.proxy.setExtraParam('prod_date', prod_date);
				partmcissue.proxy.setExtraParam('model', model_name);
				partmcissue.proxy.setExtraParam('prod_no', prod_no);
				partmcissue.loadPage(1);
				//	for grid part > iqc > mechanical
				iqcmchcal.proxy.setExtraParam('model', model_name);
				iqcmchcal.proxy.setExtraParam('prod_date', prod_date);
				iqcmchcal.proxy.setExtraParam('src_cat', x);
				iqcmchcal.loadPage(1);
				//	for grid part > iqc > mechanism
				iqcmchnism.proxy.setExtraParam('model', model_name);
				iqcmchnism.proxy.setExtraParam('prod_date', prod_date);
				iqcmchnism.proxy.setExtraParam('src_cat', x);
				iqcmchnism.loadPage(1);
				//	for grid part > iqc > mechatronic
				iqcmchtronics.proxy.setExtraParam('model', model_name);
				iqcmchtronics.proxy.setExtraParam('prod_date', prod_date);
				iqcmchtronics.proxy.setExtraParam('src_cat', x);
				iqcmchtronics.loadPage(1);
				//	for grid process > im > prodresult
				imoutput.proxy.setExtraParam('model', model_name);
				imoutput.proxy.setExtraParam('prod_no', prod_no);
				imoutput.proxy.setExtraParam('lot_size', lot_size);
				imoutput.proxy.setExtraParam('st_serial', start_serial);
				imoutput.proxy.setExtraParam('prod_date', prod_date);
				imoutput.proxy.setExtraParam('src_cat', 'fg');
				imoutput.proxy.setExtraParam('valrbprod', rbprod);
				imoutput.loadPage(1);
				//	for grid process > im > downtime
				imdowntime.proxy.setExtraParam('prod_date', prod_date);
				imdowntime.proxy.setExtraParam('model', model_name);
				imdowntime.proxy.setExtraParam('st_serial', start_serial);
				imdowntime.proxy.setExtraParam('src_cat', x);
				imdowntime.loadPage(1);
				//	for grid process > im > quality
				imquality.proxy.setExtraParam('prod_date', prod_date);
				imquality.proxy.setExtraParam('model', model_name);
				imquality.proxy.setExtraParam('st_serial', start_serial);
				imquality.proxy.setExtraParam('src_cat', 'fg');
				imquality.loadPage(1);
				//	for grid process > ma > quality
				maquality.proxy.setExtraParam('model', model_name);
				maquality.proxy.setExtraParam('lotno', prod_no);
				maquality.proxy.setExtraParam('src_cat', x);
				maquality.loadPage(1);
				//	for grid process > ma > losttime
				malost.proxy.setExtraParam('model', model_name);
				malost.proxy.setExtraParam('prod_date', prod_date);
				malost.loadPage(1);
				//	for grid process > mecha > quality
				mechaquality.proxy.setExtraParam('mecha_model', model_name);
				mechaquality.proxy.setExtraParam('mecha_lot', prod_no);
				mechaquality.loadPage(1);
				//	for grid process > mecha > losttime
				mechalosttime.proxy.setExtraParam('model', model_name);
				mechalosttime.proxy.setExtraParam('prod_no', prod_no);
				mechalosttime.proxy.setExtraParam('prod_date', prod_date);
				mechalosttime.loadPage(1);
				//	for grid process > finishgood > scanin
				fgscanin.proxy.setExtraParam('model', model_name);
				fgscanin.proxy.setExtraParam('prod_no', prod_no);
				fgscanin.proxy.setExtraParam('src_cat', 'sp');
				fgscanin.loadPage(1);
				//	for grid process > finishgood > scanout
				fgscanout.proxy.setExtraParam('model', model_name);
				fgscanout.proxy.setExtraParam('prod_no', prod_no);
				fgscanout.proxy.setExtraParam('src_cat', 'sp');
				fgscanout.loadPage(1);
				//	for grid process > finishgood > summary
				fgsum.proxy.setExtraParam('model', model_name);
				fgsum.loadPage(1);
			}
		}
	});
	var actual = Ext.create('Ext.data.Store', {
		model: 'output_data',
		autoLoad: false,
		pageSize: itemperpage,
		proxy: {
			type: 'ajax',
			url: 'json/json_output.php',
			reader: {
				type: 'json',
				root: 'rows'
			}
		}
	});
	var partim = Ext.create('Ext.data.Store', {
		model: 'part_im',
		autoLoad: false,
		pageSize: itemperpage,
		proxy: {
			type: 'ajax',
			url: 'json/json_part_im.php',
			reader: {
				type: 'json',
				root: 'rows'
			}
		}
	});
	var partimzdbs = Ext.create('Ext.data.Store', {
		model: 'part_im_zdbs',
		autoLoad: false,
		pageSize: itemperpage,
		proxy: {
			type: 'ajax',
			url: 'json/json_part_im_zdbs.php',
			reader: {
				type: 'json',
				root: 'rows'
			}
		}
	});
	var partmcissue = Ext.create('Ext.data.Store', {
		model: 'part_mc_issue',
		autoLoad: false,
		pageSize: itemperpage,
		proxy: {
			type: 'ajax',
			url: 'json/json_part_mcis.php',
			reader: {
				type: 'json',
				root: 'rows'
			}
		}
	});
	var imoutput = Ext.create('Ext.data.Store', {
		model: 'im_output',
		autoLoad: false,
		pageSize: itemperpage,
		proxy: {
			type: 'ajax',
			url: 'json/json_im_output.php',
			reader: {
				type: 'json',
				root: 'rows'
			}
		}
	});
	var imdowntime = Ext.create('Ext.data.Store', {
		model: 'im_downtime',
		autoLoad: false,
		pageSize: itemperpage,
		proxy: {
			type: 'ajax',
			url: 'json/json_im_downtime.php',
			reader: {
				type: 'json',
				root: 'rows'
			}
		}
	});
	var imquality = Ext.create('Ext.data.Store', {
		model: 'im_quality',
		autoLoad: false,
		proxy: {
			type: 'ajax',
			url: 'json/json_im_quality.php',
			reader: {
				type: 'json',
				root: 'rows',
				totalProperty: 'totalCount'
			}
		}
	});
	var maquality = Ext.create('Ext.data.Store', {
		model: 'prd_res_data',
		autoLoad: false,
		pageSize: itemperpage,
		proxy: {
			type: 'ajax',
			url: 'json/json_prd_res.php',
			reader: {
				type: 'json',
				root: 'rows',
				totalProperty: 'totalCount'
			}
		}
	});
	var malost = Ext.create('Ext.data.Store', {
		model: 'prd_lost_time',
		autoLoad: false,
		pageSize: itemperpage,
		proxy: {
			type: 'ajax',
			url: 'json/json_malosttime.php',
			reader: {
				type: 'json',
				root: 'rows',
				totalProperty: 'totalCount'
			}
		}
	});
	var mechaquality = Ext.create('Ext.data.Store', {
		model: 'mecha_res_data',
		autoLoad: false,
		pageSize: itemperpage,
		proxy: {
			type: 'ajax',
			url: 'json/json_mecha_res.php',
			reader: {
				type: 'json',
				root: 'rows',
				totalProperty: 'totalCount'
			}
		}
		/*,
					listeners	: {
						load : function(store, records){
							var mecha_model	 = store.getAt(0).get('model_name');
							var mecha_prodno = store.getAt(0).get('prod_no');

							//mechalosttime.proxy.setExtraParam('model', mecha_model);
							//mechalosttime.proxy.setExtraParam('prod_no', mecha_prodno);
							//mecha_lost_time.proxy.setExtraParam('prod_date', prod_date);
							//mechalosttime.loadPage(1);
						}
					}*/
	});
	var mechalosttime = Ext.create('Ext.data.Store', {
		model: 'mecha_lost_time',
		autoLoad: false,
		pageSize: itemperpage,
		proxy: {
			type: 'ajax',
			url: 'json/json_mecha_losttime.php',
			reader: {
				type: 'json',
				root: 'rows',
				totalProperty: 'totalCount'
			}
		}
	});
	var fgscanin = Ext.create('Ext.data.Store', {
		model: 'scanin_model',
		autoLoad: false,
		pageSize: itemperpage,
		proxy: {
			type: 'ajax',
			url: 'json/json_scanin.php',
			reader: {
				type: 'json',
				root: 'rows'
			}
		}
	});
	var fgscanout = Ext.create('Ext.data.Store', {
		model: 'scanout_model',
		autoLoad: false,
		pageSize: itemperpage,
		proxy: {
			type: 'ajax',
			url: 'json/json_scanout.php',
			reader: {
				type: 'json',
				root: 'rows'
			}
		}
	});
	var fgsum = Ext.create('Ext.data.Store', {
		model: 'fgsum_model',
		autoLoad: false,
		pageSize: itemperpage,
		proxy: {
			type: 'ajax',
			url: 'json/json_fgsummary.php',
			reader: {
				type: 'json',
				root: 'rows'
			}
		}
	});
	var iqcmchcal = Ext.create('Ext.data.Store', {
		model: 'part_mchcal',
		autoLoad: false,
		proxy: {
			type: 'ajax',
			url: 'json/json_part_mechanical.php',
			reader: {
				type: 'json',
				root: 'rows',
			}
		}
	});
	var iqcmchnism = Ext.create('Ext.data.Store', {
		model: 'part_mchnism',
		autoLoad: false,
		proxy: {
			type: 'ajax',
			url: 'json/json_part_mechanism.php',
			reader: {
				type: 'json',
				root: 'rows',
			}
		}
	});
	var iqcmchtronics = Ext.create('Ext.data.Store', {
		model: 'part_mchtronics',
		autoLoad: false,
		proxy: {
			type: 'ajax',
			url: 'json/json_part_mechatronics.php',
			reader: {
				type: 'json',
				root: 'rows',
			}
		}
	});
	//	grid detail tab part
	//	**
	var grd_modellotno2a_im = Ext.create('Ext.grid.Panel', {
		id: 'grd_modellotno2a_im',
		width: '100%',
		height: 295,
		columnLines: true,
		store: partim,
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
		}]
	});
	var grd_modellotno2a_imzdbs = Ext.create('Ext.grid.Panel', {
		id: 'grd_modellotno2a_imzdbs',
		width: '100%',
		height: 295,
		columnLines: true,
		store: partimzdbs,
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
		features: [filters],
		selModel: {
			selType: 'cellmodel'
		}
	});
	var grd_modellotno2a_mc = Ext.create('Ext.grid.Panel', {
		id: 'grd_modellotno2a_mc',
		width: '100%',
		height: 295,
		columnLines: true,
		store: partmcissue,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText: false,
			enableTextSelection: true
		},
		columns: [{
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
		}]
	});
	var grd_modellotno2a_iqc1 = Ext.create('Ext.grid.Panel', {
		id: 'grd_modellotno2a_iqc1',
		width: '100%',
		height: 295,
		columnLines: true,
		store: iqcmchcal,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText: false,
			enableTextSelection: true
		},
		columns: [{
			header: 'input_date',
			dataIndex: 'input_date',
			hidden: true
		}, {
			header: 'id',
			dataIndex: 'id',
			hidden: true
		}, {
			header: 'STATUS',
			dataIndex: 'status',
			width: 80,
			renderer: status,
			align: 'center'
		}, {
			header: 'PIC',
			dataIndex: 'action_user',
			width: 150,
			renderer: upsize
		}, {
			header: 'DATE INPUT',
			dataIndex: 'vw_inputdate',
			width: 150,
			renderer: upsize,
			align: 'center'
		}, {
			header: 'SYMPTOM',
			dataIndex: 'symptom',
			width: 150,
			renderer: upsize
		}, {
			header: 'PROBLEM AND CAUSE',
			dataIndex: 'probcause',
			width: 250,
			renderer: upsize
		}, {
			header: 'MODEL',
			dataIndex: 'model',
			width: 100,
			renderer: upsize
		}, {
			header: 'OCCURRED PLACE',
			columns: [{
				header: 'LINE',
				dataIndex: 'line',
				width: 70,
				renderer: upsize
			}, {
				header: 'SHIFT',
				dataIndex: 'shift',
				width: 50,
				renderer: upsize
			}]
		}, {
			header: 'PART NO',
			dataIndex: 'part_no',
			width: 150,
			renderer: upsize
		}, {
			header: 'PART NAME',
			dataIndex: 'part_name',
			width: 180,
			renderer: upsize
		}, {
			header: 'SUPPLIER',
			dataIndex: 'supplier',
			width: 200,
			renderer: upsize
		}, {
			header: 'REJECT QTY',
			dataIndex: 'rejectqty',
			width: 80,
			renderer: upsize
		}, {
			header: 'DETAIL PICTURE<BR>(CLICK IMAGE FOR ZOOM)',
			dataIndex: 'filepicture',
			width: 200,
			renderer: fileimage,
			align: 'center'
		}, {
			header: 'CORRECTION & METHOD',
			dataIndex: 'corrmethod',
			width: 500,
			renderer: upsize
		}, {
			header: 'LOSS TIME CORRECTION BY IQC ',
			columns: [{
				header: 'MAN POWER',
				dataIndex: 'mp',
				width: 50,
				renderer: upsize
			}, {
				header: 'TIME (H)',
				dataIndex: 'duration',
				width: 50,
				renderer: upsize
			}, {
				header: 'TOTAL',
				dataIndex: 'total',
				width: 50,
				renderer: upsize
			}]
		}, {
			header: 'ACTION ON SUPLIER',
			dataIndex: 'actionsupp',
			width: 500,
			renderer: upsize
		}, {
			header: 'REMARK',
			dataIndex: 'remark',
			width: 200,
			renderer: upsize
		}],
	});
	var grd_modellotno2a_iqc2 = Ext.create('Ext.grid.Panel', {
		id: 'grd_modellotno2a_iqc2',
		width: '100%',
		height: 295,
		columnLines: true,
		store: iqcmchnism,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText: false,
			enableTextSelection: true
		},
		columns: [{
			header: 'input_date',
			dataIndex: 'input_date',
			hidden: true
		}, {
			header: 'id',
			dataIndex: 'id',
			hidden: true
		}, {
			header: 'STATUS',
			dataIndex: 'status',
			width: 80,
			renderer: status,
			align: 'center'
		}, {
			header: 'PIC',
			dataIndex: 'action_user',
			width: 150,
			renderer: upsize
		}, {
			header: 'DATE INPUT',
			dataIndex: 'vw_inputdate',
			width: 150,
			renderer: upsize,
			align: 'center'
		}, {
			header: 'SYMPTOM',
			dataIndex: 'symptom',
			width: 150,
			renderer: upsize
		}, {
			header: 'PROBLEM AND CAUSE',
			dataIndex: 'probcause',
			width: 250,
			renderer: upsize
		}, {
			header: 'MODEL',
			dataIndex: 'model',
			width: 100,
			renderer: upsize
		}, {
			header: 'OCCURRED PLACE',
			columns: [{
				header: 'LINE',
				dataIndex: 'line',
				width: 70,
				renderer: upsize
			}, {
				header: 'SHIFT',
				dataIndex: 'shift',
				width: 50,
				renderer: upsize
			}]
		}, {
			header: 'PART NO',
			dataIndex: 'part_no',
			width: 150,
			renderer: upsize
		}, {
			header: 'PART NAME',
			dataIndex: 'part_name',
			width: 180,
			renderer: upsize
		}, {
			header: 'SUPPLIER',
			dataIndex: 'supplier',
			width: 200,
			renderer: upsize
		}, {
			header: 'REJECT QTY',
			dataIndex: 'rejectqty',
			width: 80,
			renderer: upsize
		}, {
			header: 'DETAIL PICTURE<BR>(CLICK IMAGE FOR ZOOM)',
			dataIndex: 'filepicture',
			width: 200,
			renderer: fileimage,
			align: 'center'
		}, {
			header: 'CORRECTION & METHOD',
			dataIndex: 'corrmethod',
			width: 500,
			renderer: upsize
		}, {
			header: 'LOSS TIME CORRECTION BY IQC ',
			columns: [{
				header: 'MAN POWER',
				dataIndex: 'mp',
				width: 50,
				renderer: upsize
			}, {
				header: 'TIME (H)',
				dataIndex: 'duration',
				width: 50,
				renderer: upsize
			}, {
				header: 'TOTAL',
				dataIndex: 'total',
				width: 50,
				renderer: upsize
			}]
		}, {
			header: 'ACTION ON SUPLIER',
			dataIndex: 'actionsupp',
			width: 500,
			renderer: upsize
		}, {
			header: 'REMARK',
			dataIndex: 'remark',
			width: 200,
			renderer: upsize
		}],
	});
	var grd_modellotno2a_iqc3 = Ext.create('Ext.grid.Panel', {
		id: 'grd_modellotno2a_iqc3',
		width: '100%',
		height: 295,
		columnLines: true,
		store: iqcmchtronics,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText: false,
			enableTextSelection: true
		},
		columns: [{
			header: 'input_date',
			dataIndex: 'input_date',
			hidden: true
		}, {
			header: 'id',
			dataIndex: 'id',
			hidden: true
		}, {
			header: 'STATUS',
			dataIndex: 'status',
			idth: 80,
			renderer: status,
			align: 'center'
		}, {
			header: 'PIC',
			dataIndex: 'action_user',
			width: 150,
			renderer: upsize
		}, {
			header: 'DATE INPUT',
			dataIndex: 'vw_inputdate',
			width: 150,
			renderer: upsize,
			align: 'center'
		}, {
			header: 'SYMPTOM',
			dataIndex: 'symptom',
			width: 150,
			renderer: upsize
		}, {
			header: 'PROBLEM AND CAUSE',
			dataIndex: 'probcause',
			width: 250,
			renderer: upsize
		}, {
			header: 'MODEL',
			dataIndex: 'model',
			width: 100,
			renderer: upsize
		}, {
			header: 'OCCURRED PLACE',
			columns: [{
				header: 'LINE',
				dataIndex: 'line',
				width: 70,
				renderer: upsize
			}, {
				header: 'SHIFT',
				dataIndex: 'shift',
				width: 50,
				renderer: upsize
			}]
		}, {
			header: 'PART NO',
			dataIndex: 'part_no',
			width: 150,
			renderer: upsize
		}, {
			header: 'PART NAME',
			dataIndex: 'part_name',
			width: 180,
			renderer: upsize
		}, {
			header: 'SUPPLIER',
			dataIndex: 'supplier',
			width: 200,
			renderer: upsize
		}, {
			header: 'REJECT QTY',
			dataIndex: 'rejectqty',
			width: 80,
			renderer: upsize
		}, {
			header: 'DETAIL PICTURE<BR>(CLICK IMAGE FOR ZOOM)',
			dataIndex: 'filepicture',
			width: 200,
			renderer: fileimage,
			align: 'center'
		}, {
			header: 'CORRECTION & METHOD',
			dataIndex: 'corrmethod',
			width: 500,
			renderer: upsize
		}, {
			header: 'LOSS TIME CORRECTION BY IQC ',
			columns: [{
				header: 'MAN POWER',
				dataIndex: 'mp',
				width: 50,
				renderer: upsize
			}, {
				header: 'TIME (H)',
				dataIndex: 'duration',
				width: 50,
				renderer: upsize
			}, {
				header: 'TOTAL',
				dataIndex: 'total',
				width: 50,
				renderer: upsize
			}]
		}, {
			header: 'ACTION ON SUPLIER',
			dataIndex: 'actionsupp',
			width: 500,
			renderer: upsize
		}, {
			header: 'REMARK',
			dataIndex: 'remark',
			width: 200,
			renderer: upsize
		}],
	});
	//	grid detail tab process
	//	**
	var grid_modellotno2b_im1 = Ext.create('Ext.grid.Panel', {
		id: 'grid_modellotno2b_imoutput',
		width: '100%',
		height: 295,
		columnLines: true,
		store: imoutput,
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
	var grid_modellotno2b_im2 = Ext.create('Ext.grid.Panel', {
		id: 'grid_modellotno2b_im2',
		width: '100%',
		height: 295,
		columnLines: true,
		store: imdowntime,
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
		}, ]
	});
	var grid_modellotno2b_im3 = Ext.create('Ext.grid.Panel', {
		id: 'grid_modellotno2b_im3',
		width: '100%',
		height: 295,
		columnLines: true,
		store: imquality,
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
		}]
	});
	var grid_modellotno2b_ma1 = Ext.create('Ext.grid.Panel', {
		id: 'grid_modellotno2b_ma1',
		width: '100%',
		height: 295,
		columnLines: true,
		store: maquality,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText: false,
			enableTextSelection: true
		},
		columns: [{
			header: 'Prod. Date',
			dataIndex: 'date',
			width: 100,
			renderer: upsize
		}, {
			header: 'Line Name',
			dataIndex: 'line_name',
			width: 90,
			renderer: upsize,
			hidden: true
		}, {
			header: 'Shift',
			dataIndex: 'shift',
			width: 50,
			renderer: upsize
		}, {
			header: 'Model Name',
			dataIndex: 'model_name',
			width: 130,
			renderer: upsize,
			hidden: true
		}, {
			header: 'Lot Size',
			dataIndex: 'lot',
			width: 70,
			renderer: upsize
		}, {
			header: 'Prod No',
			dataIndex: 'prod_no',
			flex: 1,
			renderer: upsize,
			hidden: true
		}, {
			header: 'Start Serial',
			dataIndex: 'st_serial',
			flex: 1,
			renderer: upsize,
			hidden: true
		}, {
			header: 'SN O/P',
			dataIndex: 'serial_output',
			flex: 1,
			renderer: upsize,
			hidden: true
		}, {
			header: 'Symptom',
			dataIndex: 'symptom',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Defective Cause',
			dataIndex: 'def_cause',
			flex: 1,
			renderer: upsize
		}, {
			header: 'P. Disposal',
			dataIndex: 'p_disposal',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Responsible',
			dataIndex: 'responsible',
			flex: 1,
			renderer: upsize
		}, ]
	});
	var grid_modellotno2b_ma2 = Ext.create('Ext.grid.Panel', {
		id: 'grid_modellotno2b_ma2',
		width: '100%',
		height: 295,
		columnLines: true,
		store: malost,
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
		}]
	});
	var grid_modellotno2b_mecha2 = Ext.create('Ext.grid.Panel', {
		id: 'grid_modellotno2b_mecha2',
		width: '100%',
		height: 295,
		columnLines: true,
		store: mechaquality,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText: false,
			enableTextSelection: true
		},
		columns: [{
			header: 'Prod. Date',
			dataIndex: 'date',
			width: 100,
			renderer: upsize
		}, {
			header: 'Line Name',
			dataIndex: 'line_name',
			width: 90,
			renderer: upsize
		}, {
			header: 'Shift',
			dataIndex: 'shift',
			width: 50,
			renderer: upsize
		}, {
			header: 'Prod No',
			dataIndex: 'prod_no',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Model Name',
			dataIndex: 'model_name',
			width: 130,
			renderer: upsize
		}, {
			header: 'Lot Size',
			dataIndex: 'lot',
			width: 70,
			renderer: upsize
		}, {
			header: 'Start Serial',
			dataIndex: 'st_serial',
			flex: 1,
			renderer: upsize
		}, {
			header: 'SN O/P',
			dataIndex: 'serial_output',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Symptom',
			dataIndex: 'symptom',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Defective Cause',
			dataIndex: 'def_cause',
			flex: 1,
			renderer: upsize
		}, {
			header: 'P. Disposal',
			dataIndex: 'p_disposal',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Responsible',
			dataIndex: 'responsible',
			flex: 1,
			renderer: upsize
		}, ]
	});
	var grid_modellotno2b_mecha3 = Ext.create('Ext.grid.Panel', {
		id: 'grid_modellotno2b_mecha3',
		width: '100%',
		height: 295,
		columnLines: true,
		store: mechalosttime,
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
			renderer: upsize
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
		}]
	});
	//	detail tab part
	//	**
	var tab_modellotno2a_im = Ext.create('Ext.tab.Panel', {
		tabPosition: 'left',
		autoHeight: true,
		activeTab: 0,
		width: '100%',
		height: 285,
		style: 'padding:5px;-background:#157FCC;',
		items: [{
			title: 'Outset Inquiry',
			reorderable: false,
			items: [grd_modellotno2a_im]
		}, {
			title: 'IM Part Navigation',
			reorderable: false,
			items: [grd_modellotno2a_imzdbs]
		}]
	});
	var tab_modellotno2a_mc = Ext.create('Ext.tab.Panel', {
		tabPosition: 'left',
		autoHeight: true,
		activeTab: 0,
		width: '100%',
		height: 285,
		style: 'padding:5px;-background:#157FCC;',
		items: [{
			title: 'Part Issue to MA',
			reorderable: false,
			items: [grd_modellotno2a_mc]
		}]
	});
	var tab_modellotno2a_iqc = Ext.create('Ext.tab.Panel', {
		tabPosition: 'left',
		autoHeight: true,
		activeTab: 0,
		width: '100%',
		style: 'padding:5px;-background:#157FCC;',
		items: [{
			title: 'Mechanical',
			reorderable: false,
			items: [grd_modellotno2a_iqc1]
		}, {
			title: 'Mechanism',
			reorderable: false,
			items: [grd_modellotno2a_iqc2]
		}, {
			title: 'Mechatronics',
			reorderable: false,
			items: [grd_modellotno2a_iqc3]
		}]
	});
	//	detail tab process
	//	**
	var tab_modellotno2b_im = Ext.create('Ext.tab.Panel', {
		tabPosition: 'left',
		autoHeight: true,
		activeTab: 0,
		width: '100%',
		height: 285,
		style: 'padding:5px;-background:#157FCC;',
		items: [{
			title: 'Production Result',
			reorderable: false,
			items: [grid_modellotno2b_im1]
		}, {
			title: 'Downtime Report',
			reorderable: false,
			items: [grid_modellotno2b_im2]
		}, {
			title: 'Quality Report',
			reorderable: false,
			items: [grid_modellotno2b_im3]
		}]
	});
	var tab_modellotno2b_ma = Ext.create('Ext.tab.Panel', {
		tabPosition: 'left',
		autoHeight: true,
		activeTab: 0,
		width: '100%',
		style: 'padding:5px;-background:#157FCC;',
		items: [{
			title: 'Quality Report',
			reorderable: false,
			items: [grid_modellotno2b_ma1]
		}, {
			title: 'Lost Time Report',
			reorderable: false,
			items: [grid_modellotno2b_ma2],
		}]
	});
	var tab_modellotno2b_mecha = Ext.create('Ext.tab.Panel', {
		tabPosition: 'left',
		autoHeight: true,
		activeTab: 0,
		width: '100%',
		style: 'padding:5px;-background:#157FCC;',
		items: [{
			title: 'Quality Report',
			reorderable: false,
			items: [grid_modellotno2b_mecha2]
		}, {
			title: 'Lost Time Report',
			reorderable: false,
			items: [grid_modellotno2b_mecha3]
		}]
	});
	//	detail tab finishgood
	//	**
	var grd_modellotno2c_fg1 = Ext.create('Ext.grid.Panel', {
		id: 'grd_modellotno2c_fg1',
		width: '100%',
		height: 295,
		columnLines: true,
		store: fgscanin,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText: false,
			enableTextSelection: true
		},
		columns: [{
			header: 'NO.',
			xtype: 'rownumberer',
			width: 45,
			sortable: false
		}, {
			header: 'Model Name',
			dataIndex: 'model_name',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Serial No ID',
			dataIndex: 'serialno_id',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Start Serial',
			dataIndex: 'start_serial',
			flex: 1,
			renderer: upsize,
			hidden: true
		}, {
			header: 'Scan Date',
			dataIndex: 'scandate',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Input Date',
			dataIndex: 'inputdate',
			flex: 1,
			renderer: upsize,
			hidden: true
		}, {
			header: 'Update Date',
			dataIndex: 'updatedate',
			flex: 1,
			renderer: upsize,
			hidden: true
		}]
	});
	var grd_modellotno2c_fg2 = Ext.create('Ext.grid.Panel', {
		id: 'grd_modellotno2c_fg2',
		width: '100%',
		height: 295,
		columnLines: true,
		store: fgscanout,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText: false,
			enableTextSelection: true
		},
		columns: [{
			header: 'NO.',
			xtype: 'rownumberer',
			width: 45,
			sortable: false
		}, {
			header: 'Model Name',
			dataIndex: 'model_name',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Serial No ID',
			dataIndex: 'serialno_id',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Scan Date',
			dataIndex: 'scandate',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Input Date',
			dataIndex: 'inputdate',
			flex: 1,
			renderer: upsize,
			hidden: true
		}, {
			header: 'Update Date',
			dataIndex: 'updatedate',
			flex: 1,
			renderer: upsize,
			hidden: true
		}]
	});
	var grd_modellotno2c_fg3 = Ext.create('Ext.grid.Panel', {
		id: 'grd_modellotno2c_fg3',
		width: '100%',
		height: 295,
		columnLines: true,
		store: fgsum,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText: false,
			enableTextSelection: true
		},
		columns: [{
			header: 'Model Name',
			dataIndex: 'model_name',
			flex: 1,
			renderer: upsize
		}, {
			header: 'All Stock',
			dataIndex: 'allstock',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Before Stockcard',
			dataIndex: 'tmpstock',
			flex: 1,
			renderer: upsize
		}, {
			header: 'After Stockcard',
			dataIndex: 'tmpstock_sc',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Ready Stock',
			dataIndex: 'readystock',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Hold Stock',
			dataIndex: 'holdstock',
			flex: 1,
			renderer: upsize
		}]
	});
	//	master tab part
	//	**
	var tab_modellotno2a = Ext.create('Ext.tab.Panel', {
		title: 'Part',
		autoHeight: true,
		plain: true,
		activeTab: 0,
		width: '100%',
		style: 'padding:5px;-background:#157FCC;',
		items: [{
			title: 'IM',
			reorderable: false,
			items: [tab_modellotno2a_im]
		}, {
			title: 'MC',
			reorderable: false,
			items: [tab_modellotno2a_mc]
		}, {
			title: 'IQC',
			reorderable: false,
			items: [tab_modellotno2a_iqc]
		}]
	});
	//	master tab process
	//	**
	var tab_modellotno2b = Ext.create('Ext.tab.Panel', {
		title: 'Process',
		autoHeight: true,
		plain: true,
		activeTab: 0,
		width: '100%',
		style: 'padding:5px;-background:#157FCC;',
		items: [{
			title: 'IM',
			reorderable: false,
			items: [tab_modellotno2b_im]
		}, {
			title: 'MA',
			reorderable: false,
			itemId: 'matab',
			items: [tab_modellotno2b_ma]
		}, {
			title: 'MECHA',
			reorderable: false,
			itemId: 'mechatab',
			items: [tab_modellotno2b_mecha],
		}]
	});
	//	master tab finishgood
	//	**
	var tab_modellotno2c = Ext.create('Ext.tab.Panel', {
		title: 'Finished Good',
		itemId: 'fgtab',
		autoHeight: true,
		plain: true,
		activeTab: 0,
		width: '100%',
		style: 'padding:5px;-background:#157FCC;',
		items: [{
			title: 'SCAN IN',
			reorderable: false,
			items: [grd_modellotno2c_fg1]
		}, {
			title: 'SCAN OUT',
			reorderable: false,
			items: [grd_modellotno2c_fg2]
		}, {
			title: 'SUMMARY',
			reorderable: false,
			items: [grd_modellotno2c_fg3],
		}]
	});
	//	master tab problem info
	//	**
	/*================== PROBLEM INFORMATION TAB =================*/
	// --> GRID
	var grd_part_problem_mc_modellotno = Ext.create('Ext.grid.Panel', {
		id: 'grd_part_problem_mc_modellotno',
		width: '100%',
		height: 295,
		columnLines: true,
		store: part_problem_mc,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText: false,
			enableTextSelection: true
		},
		columns: [
			// 	fields	: ['id_part','line','shift','prod_date','div','dept','model_name','lotno','part_name','partno','shortage_qty','supplier_name','id_resp','resp','comment','paging','line_form','read_status','input_userid','input_nik','id_condition','condition']
			{
				header: 'PROD. DATE',
				dataIndex: 'prod_date',
				flex: 1,
				renderer: upsize
			}, {
				header: 'STATUS',
				dataIndex: 'read_status',
				flex: 1,
				renderer: problem_status
			}, {
				header: 'CONDITION',
				dataIndex: 'condition',
				flex: 1,
				renderer: upsize
			}, {
				header: 'LINE',
				dataIndex: 'line',
				flex: 1,
				renderer: upsize
			}, {
				header: 'MODEL',
				dataIndex: 'model_name',
				flex: 1,
				renderer: upsize
			}, {
				header: 'LOT NO',
				dataIndex: 'lotno',
				flex: 1,
				renderer: upsize
			}, {
				header: 'PART NAME',
				dataIndex: 'part_name',
				flex: 1,
				renderer: upsize
			}, {
				header: 'PART NO',
				dataIndex: 'partno',
				flex: 1,
				renderer: upsize
			}, {
				header: 'SHORTAGE QTY',
				dataIndex: 'shortage_qty',
				flex: 1,
				renderer: upsize
			}, {
				header: 'SUPPLIER NAME',
				dataIndex: 'supplier_name',
				flex: 1,
				renderer: upsize
			}, {
				header: 'RESP',
				dataIndex: 'resp',
				flex: 1,
				renderer: upsize,
				hidden: true
			}, {
				header: 'REMARK',
				dataIndex: 'comment',
				flex: 1,
				renderer: upsize
			}, {
				header: 'USER ID',
				dataIndex: 'input_userid',
				flex: 1,
				renderer: upsize
			}
		]
	});
	var grd_qty_problem_mc_modellotno = Ext.create('Ext.grid.Panel', {
		id: 'grd_qty_problem_mc_modellotno',
		width: '100%',
		height: 295,
		columnLines: true,
		store: qty_problem_mc,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText: false,
			enableTextSelection: true
		},
		columns: [
			//	fields	: ['id_quality','prod_date','div','dept','line','shift','model','lot_no','id_symptom','symptom','id_defcause','defcause','reject','id_resp','read_status','input_userid','input_nik','id_condition','condition']
			{
				header: 'PROD. DATE',
				dataIndex: 'prod_date',
				flex: 1,
				renderer: upsize
			}, {
				header: 'STATUS',
				dataIndex: 'read_status',
				flex: 1,
				renderer: problem_status
			}, {
				header: 'CONDITION',
				dataIndex: 'condition',
				flex: 1,
				renderer: upsize
			}, {
				header: 'LINE',
				dataIndex: 'line',
				flex: 1,
				renderer: upsize
			}, {
				header: 'MODEL',
				dataIndex: 'model',
				flex: 1,
				renderer: upsize
			}, {
				header: 'LOT NO',
				dataIndex: 'lot_no',
				flex: 1,
				renderer: upsize
			}, {
				header: 'SYMPTOM',
				dataIndex: 'symptom',
				flex: 1,
				renderer: upsize
			}, {
				header: 'DEFECT. CAUSE',
				dataIndex: 'defcause',
				flex: 1,
				renderer: upsize
			}, {
				header: 'REJECT',
				dataIndex: 'reject_rate',
				flex: 1,
				renderer: upsize
			}, {
				header: 'USER ID',
				dataIndex: 'input_userid',
				flex: 1,
				renderer: upsize
			}
		]
	});
	var grd_part_problem_ma_modellotno = Ext.create('Ext.grid.Panel', {
		id: 'grd_part_problem_ma_modellotno',
		width: '100%',
		height: 295,
		columnLines: true,
		store: part_problem_ma,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText: false,
			enableTextSelection: true
		},
		columns: [
			// 	fields	: ['id_part','line','shift','prod_date','div','dept','model_name','lotno','part_name','partno','shortage_qty','supplier_name','id_resp','resp','comment','paging','line_form','read_status','input_userid','input_nik','id_condition','condition']
			{
				header: 'PROD. DATE',
				dataIndex: 'prod_date',
				flex: 1,
				renderer: upsize
			}, {
				header: 'STATUS',
				dataIndex: 'read_status',
				flex: 1,
				renderer: problem_status
			}, {
				header: 'CONDITION',
				dataIndex: 'condition',
				flex: 1,
				renderer: upsize
			}, {
				header: 'LINE',
				dataIndex: 'line',
				flex: 1,
				renderer: upsize
			}, {
				header: 'MODEL',
				dataIndex: 'model_name',
				flex: 1,
				renderer: upsize
			}, {
				header: 'LOT NO',
				dataIndex: 'lotno',
				flex: 1,
				renderer: upsize
			}, {
				header: 'PART NAME',
				dataIndex: 'part_name',
				flex: 1,
				renderer: upsize
			}, {
				header: 'PART NO',
				dataIndex: 'partno',
				flex: 1,
				renderer: upsize
			}, {
				header: 'SHORTAGE QTY',
				dataIndex: 'shortage_qty',
				flex: 1,
				renderer: upsize
			}, {
				header: 'SUPPLIER NAME',
				dataIndex: 'supplier_name',
				flex: 1,
				renderer: upsize
			}, {
				header: 'RESP',
				dataIndex: 'resp',
				flex: 1,
				renderer: upsize,
				hidden: true
			}, {
				header: 'REMARK',
				dataIndex: 'comment',
				flex: 1,
				renderer: upsize
			}, {
				header: 'USER ID',
				dataIndex: 'input_userid',
				flex: 1,
				renderer: upsize
			}
		]
	});
	var grd_qty_problem_ma_modellotno = Ext.create('Ext.grid.Panel', {
		id: 'grd_qty_problem_ma_modellotno',
		width: '100%',
		height: 295,
		columnLines: true,
		store: qty_problem_ma,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText: false,
			enableTextSelection: true
		},
		columns: [
			//	fields	: ['id_quality','prod_date','div','dept','line','shift','model','lot_no','id_symptom','symptom','id_defcause','defcause','reject','id_resp','read_status','input_userid','input_nik','id_condition','condition']
			{
				header: 'PROD. DATE',
				dataIndex: 'prod_date',
				flex: 1,
				renderer: upsize
			}, {
				header: 'STATUS',
				dataIndex: 'read_status',
				flex: 1,
				renderer: problem_status
			}, {
				header: 'CONDITION',
				dataIndex: 'condition',
				flex: 1,
				renderer: upsize
			}, {
				header: 'LINE',
				dataIndex: 'line',
				flex: 1,
				renderer: upsize
			}, {
				header: 'MODEL',
				dataIndex: 'model',
				flex: 1,
				renderer: upsize
			}, {
				header: 'LOT NO',
				dataIndex: 'lot_no',
				flex: 1,
				renderer: upsize
			}, {
				header: 'SYMPTOM',
				dataIndex: 'symptom',
				flex: 1,
				renderer: upsize
			}, {
				header: 'DEFECT. CAUSE',
				dataIndex: 'defcause',
				flex: 1,
				renderer: upsize
			}, {
				header: 'REJECT',
				dataIndex: 'reject_rate',
				flex: 1,
				renderer: upsize
			}, {
				header: 'USER ID',
				dataIndex: 'input_userid',
				flex: 1,
				renderer: upsize
			}
		]
	});
	var grd_part_problem_mecha_modellotno = Ext.create('Ext.grid.Panel', {
		id: 'grd_part_problem_mecha_modellotno',
		width: '100%',
		height: 295,
		columnLines: true,
		store: part_problem_mecha,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText: false,
			enableTextSelection: true
		},
		columns: [
			// 	fields	: ['id_part','line','shift','prod_date','div','dept','model_name','lotno','part_name','partno','shortage_qty','supplier_name','id_resp','resp','comment','paging','line_form','read_status','input_userid','input_nik','id_condition','condition']
			{
				header: 'PROD. DATE',
				dataIndex: 'prod_date',
				flex: 1,
				renderer: upsize
			}, {
				header: 'STATUS',
				dataIndex: 'read_status',
				flex: 1,
				renderer: problem_status
			}, {
				header: 'CONDITION',
				dataIndex: 'condition',
				flex: 1,
				renderer: upsize
			}, {
				header: 'LINE',
				dataIndex: 'line',
				flex: 1,
				renderer: upsize
			}, {
				header: 'MODEL',
				dataIndex: 'model_name',
				flex: 1,
				renderer: upsize
			}, {
				header: 'LOT NO',
				dataIndex: 'lotno',
				flex: 1,
				renderer: upsize
			}, {
				header: 'PART NAME',
				dataIndex: 'part_name',
				flex: 1,
				renderer: upsize
			}, {
				header: 'PART NO',
				dataIndex: 'partno',
				flex: 1,
				renderer: upsize
			}, {
				header: 'SHORTAGE QTY',
				dataIndex: 'shortage_qty',
				flex: 1,
				renderer: upsize
			}, {
				header: 'SUPPLIER NAME',
				dataIndex: 'supplier_name',
				flex: 1,
				renderer: upsize
			}, {
				header: 'RESP',
				dataIndex: 'resp',
				flex: 1,
				renderer: upsize,
				hidden: true
			}, {
				header: 'REMARK',
				dataIndex: 'comment',
				flex: 1,
				renderer: upsize
			}, {
				header: 'USER ID',
				dataIndex: 'input_userid',
				flex: 1,
				renderer: upsize
			}
		]
	});
	var grd_qty_problem_mecha_modellotno = Ext.create('Ext.grid.Panel', {
		id: 'grd_qty_problem_mecha_modellotno',
		width: '100%',
		height: 295,
		columnLines: true,
		store: qty_problem_mecha,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText: false,
			enableTextSelection: true
		},
		columns: [
			//	fields	: ['id_quality','prod_date','div','dept','line','shift','model','lot_no','id_symptom','symptom','id_defcause','defcause','reject','id_resp','read_status','input_userid','input_nik','id_condition','condition']
			{
				header: 'PROD. DATE',
				dataIndex: 'prod_date',
				flex: 1,
				renderer: upsize
			}, {
				header: 'STATUS',
				dataIndex: 'read_status',
				flex: 1,
				renderer: problem_status
			}, {
				header: 'CONDITION',
				dataIndex: 'condition',
				flex: 1,
				renderer: upsize
			}, {
				header: 'LINE',
				dataIndex: 'line',
				flex: 1,
				renderer: upsize
			}, {
				header: 'MODEL',
				dataIndex: 'model',
				flex: 1,
				renderer: upsize
			}, {
				header: 'LOT NO',
				dataIndex: 'lot_no',
				flex: 1,
				renderer: upsize
			}, {
				header: 'SYMPTOM',
				dataIndex: 'symptom',
				flex: 1,
				renderer: upsize
			}, {
				header: 'DEFECT. CAUSE',
				dataIndex: 'defcause',
				flex: 1,
				renderer: upsize
			}, {
				header: 'REJECT',
				dataIndex: 'reject_rate',
				flex: 1,
				renderer: upsize
			}, {
				header: 'USER ID',
				dataIndex: 'input_userid',
				flex: 1,
				renderer: upsize
			}
		]
	});
	var grd_part_problem_iqc_modellotno = Ext.create('Ext.grid.Panel', {
		id: 'grd_part_problem_iqc_modellotno',
		width: '100%',
		height: 295,
		columnLines: true,
		store: part_problem_iqc,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText: false,
			enableTextSelection: true
		},
		columns: [
			// 	fields	: ['id_part','line','shift','prod_date','div','dept','model_name','lotno','part_name','partno','shortage_qty','supplier_name','id_resp','resp','comment','paging','line_form','read_status','input_userid','input_nik','id_condition','condition']
			{
				header: 'PROD. DATE',
				dataIndex: 'prod_date',
				flex: 1,
				renderer: upsize
			}, {
				header: 'STATUS',
				dataIndex: 'read_status',
				flex: 1,
				renderer: problem_status
			}, {
				header: 'CONDITION',
				dataIndex: 'condition',
				flex: 1,
				renderer: upsize
			}, {
				header: 'LINE',
				dataIndex: 'line',
				flex: 1,
				renderer: upsize
			}, {
				header: 'MODEL',
				dataIndex: 'model_name',
				flex: 1,
				renderer: upsize
			}, {
				header: 'LOT NO',
				dataIndex: 'lotno',
				flex: 1,
				renderer: upsize
			}, {
				header: 'PART NAME',
				dataIndex: 'part_name',
				flex: 1,
				renderer: upsize
			}, {
				header: 'PART NO',
				dataIndex: 'partno',
				flex: 1,
				renderer: upsize
			}, {
				header: 'SHORTAGE QTY',
				dataIndex: 'shortage_qty',
				flex: 1,
				renderer: upsize
			}, {
				header: 'SUPPLIER NAME',
				dataIndex: 'supplier_name',
				flex: 1,
				renderer: upsize
			}, {
				header: 'RESP',
				dataIndex: 'resp',
				flex: 1,
				renderer: upsize,
				hidden: true
			}, {
				header: 'REMARK',
				dataIndex: 'comment',
				flex: 1,
				renderer: upsize
			}, {
				header: 'USER ID',
				dataIndex: 'input_userid',
				flex: 1,
				renderer: upsize
			}
		]
	});
	var grd_qty_problem_iqc_modellotno = Ext.create('Ext.grid.Panel', {
		id: 'grd_qty_problem_iqc_modellotno',
		width: '100%',
		height: 295,
		columnLines: true,
		store: qty_problem_iqc,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText: false,
			enableTextSelection: true
		},
		columns: [
			//	fields	: ['id_quality','prod_date','div','dept','line','shift','model','lot_no','id_symptom','symptom','id_defcause','defcause','reject','id_resp','read_status','input_userid','input_nik','id_condition','condition']
			{
				header: 'PROD. DATE',
				dataIndex: 'prod_date',
				flex: 1,
				renderer: upsize
			}, {
				header: 'STATUS',
				dataIndex: 'read_status',
				flex: 1,
				renderer: problem_status
			}, {
				header: 'CONDITION',
				dataIndex: 'condition',
				flex: 1,
				renderer: upsize
			}, {
				header: 'LINE',
				dataIndex: 'line',
				flex: 1,
				renderer: upsize
			}, {
				header: 'MODEL',
				dataIndex: 'model',
				flex: 1,
				renderer: upsize
			}, {
				header: 'LOT NO',
				dataIndex: 'lot_no',
				flex: 1,
				renderer: upsize
			}, {
				header: 'SYMPTOM',
				dataIndex: 'symptom',
				flex: 1,
				renderer: upsize
			}, {
				header: 'DEFECT. CAUSE',
				dataIndex: 'defcause',
				flex: 1,
				renderer: upsize
			}, {
				header: 'REJECT',
				dataIndex: 'reject_rate',
				flex: 1,
				renderer: upsize
			}, {
				header: 'USER ID',
				dataIndex: 'input_userid',
				flex: 1,
				renderer: upsize
			}
		]
	});
	// --> TAB DEPARTMENT
	var tab_problem_iqc_modellotno = Ext.create('Ext.tab.Panel', {
		tabPosition: 'left',
		autoHeight: true,
		activeTab: 0,
		width: '100%',
		style: 'padding:5px;-background:#157FCC;',
		items: [{
			title: 'Part Problem',
			reorderable: false,
			items: [grd_part_problem_iqc_modellotno]
		}, {
			title: 'Quality Problem',
			reorderable: false,
			items: [grd_qty_problem_iqc_modellotno]
		}]
	});
	var tab_problem_ma_modellotno = Ext.create('Ext.tab.Panel', {
		tabPosition: 'left',
		autoHeight: true,
		activeTab: 0,
		width: '100%',
		style: 'padding:5px;-background:#157FCC;',
		items: [{
			title: 'Part Problem',
			reorderable: false,
			items: [grd_part_problem_ma_modellotno]
		}, {
			title: 'Quality Problem',
			reorderable: false,
			items: [grd_qty_problem_ma_modellotno]
		}]
	});
	var tab_problem_mc_modellotno = Ext.create('Ext.tab.Panel', {
		tabPosition: 'left',
		autoHeight: true,
		activeTab: 0,
		width: '100%',
		style: 'padding:5px;-background:#157FCC;',
		items: [{
			title: 'Part Problem',
			reorderable: false,
			items: [grd_part_problem_mc_modellotno]
		}, {
			title: 'Quality Problem',
			reorderable: false,
			items: [grd_qty_problem_mc_modellotno]
		}]
	});
	var tab_problem_mecha_modellotno = Ext.create('Ext.tab.Panel', {
		tabPosition: 'left',
		autoHeight: true,
		activeTab: 0,
		width: '100%',
		style: 'padding:5px;-background:#157FCC;',
		items: [{
			title: 'Part Problem',
			reorderable: false,
			items: [grd_part_problem_mecha_modellotno]
		}, {
			title: 'Quality Problem',
			reorderable: false,
			items: [grd_qty_problem_mecha_modellotno]
		}]
	});
	// --> TAB MASTER PROBLEM INFO
	var tab_modellotno2d = Ext.create('Ext.tab.Panel', {
		title: 'Problem Info',
		itemId: 'pitab',
		autoHeight: true,
		plain: true,
		activeTab: 0,
		width: '100%',
		style: 'padding:5px;-background:#157FCC;',
		items: [{
			title: 'MA',
			itemId: 'mapitab',
			reorderable: false,
			items: [tab_problem_ma_modellotno]
		}, {
			title: 'MECHA',
			itemId: 'mechapitab',
			reorderable: false,
			items: [tab_problem_mecha_modellotno]
		}]
	});
	/*==================* PROBLEM INFORMATION TAB *=================*/
	//	master tab
	//	**
	var tab_modellotno2 = Ext.create('Ext.tab.Panel', {
		activeTab: 0,
		width: '100%',
		items: [tab_modellotno2a, tab_modellotno2b, tab_modellotno2c, tab_modellotno2d]
	});
	var panel_modellotno1a = Ext.create('Ext.panel.Panel', {
		title: 'Traceability Search',
		id: 'panel_modellotno1a',
		region: 'north',
		width: '100%',
		layout: {
			type: 'hbox',
			align: 'strecth'
		},
		tbar: [{
				xtype: 'tbspacer',
				width: 5
			}, {
				xtype: 'radiogroup',
				fieldLabel: 'Category',
				id: 'rb3',
				columns: [100, 100, 10, 10],
				labelWidth: 50,
				vertical: true,
				items: [{
					boxLabel: 'Finish Good',
					name: 'src_cat3',
					inputValue: 'fg'
				}, {
					boxLabel: 'Single Parts',
					name: 'src_cat3',
					inputValue: 'sp'
				}, {
					boxLabel: 'Model and Lotno',
					name: 'src_cat3',
					checked: true,
					inputValue: 'ml',
					width: 120
				}, {
					boxLabel: 'Symptom',
					name: 'src_cat3',
					inputValue: 'sym',
					width: 100
				}],
				listeners: {
					change: function() {
						Ext.WindowManager.each(function(component) {
							if (component.getXType() === 'window') {
								component.destroy();
							}
						});
						sch_modellotno1b.getStore().removeAll();
						outp_modellotno1b.getStore().removeAll();
						grd_modellotno2a_im.getStore().removeAll();
						grd_modellotno2a_imzdbs.getStore().removeAll();
						grd_modellotno2a_mc.getStore().removeAll();
						grid_modellotno2b_im1.getStore().removeAll();
						grid_modellotno2b_im2.getStore().removeAll();
						grid_modellotno2b_im3.getStore().removeAll();
						grid_modellotno2b_ma1.getStore().removeAll();
						grid_modellotno2b_ma2.getStore().removeAll();
						grid_modellotno2b_mecha2.getStore().removeAll();
						grid_modellotno2b_mecha3.getStore().removeAll();
						grd_modellotno2c_fg1.getStore().removeAll();
						grd_modellotno2c_fg2.getStore().removeAll();
						grd_modellotno2c_fg3.getStore().removeAll();
						tab_modellotno2b.child('#matab').tab.show();
						tab_modellotno2b.child('#mechatab').tab.show();
						tab_modellotno2.child('#fgtab').tab.show();
						var x = Ext.getCmp('rb3').getValue()['src_cat3'];
						if (x == 'sp') {
							panel_master.hide();
							panel_single_part.show();
							panel_modellotno.hide();
							panel_symptom.hide();
							Ext.getCmp('rb2').reset();
						} else if (x == 'fg') {
							panel_master.show();
							panel_single_part.hide();
							panel_modellotno.hide();
							panel_symptom.hide();
							Ext.getCmp('rb').reset();
						} else if (x == 'ml') {
							panel_master.hide();
							panel_single_part.hide();
							panel_modellotno.show();
							panel_symptom.hide();
							Ext.getCmp('rb3').reset();
						} else {
							panel_master.hide();
							panel_single_part.hide();
							panel_modellotno.hide();
							panel_symptom.show();
							Ext.getCmp('rb4').reset();
						}
						//alert(x);
					}
				}
			}, {
				xtype: 'tbspacer',
				width: 30
			}, '-', {
				xtype: 'button',
				id: 'src_mdllotno',
				name: 'src_mdllotno',
				text: 'SEARCH',
				iconCls: 'search',
				scale: 'medium'
				//handler: src_mdllotno
			}, '->',
			clock3, '  '
		],
		listeners: {
			render: {
				fn: function() {
					Ext.fly(clock3.getEl().parent()).addCls('x-status-text-panel').createChild({
						cls: 'spacer'
					});
					Ext.TaskManager.start({
						run: function() {
							Ext.fly(clock3.getEl()).update(Ext.Date.format(new Date(), 'M, D-Y g:i:s A'));
						},
						interval: 1000
					});
				},
				delay: 100
			}
		}
	});
	var sch_modellotno1b = Ext.create('Ext.grid.Panel', {
		title: 'PLAN',
		width: '50%',
		height: '100%',
		store: schedule,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText: false
		},
		columns: [{
			header: 'Prod Date',
			dataIndex: 'prod_date',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Line Name',
			dataIndex: 'line_name',
			width: 90,
			renderer: upsize
		}, {
			header: 'Model Name',
			dataIndex: 'model_name',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Prod No',
			dataIndex: 'prod_no',
			width: 90,
			renderer: upsize
		}, {
			header: 'Lot Size',
			dataIndex: 'lot_size',
			width: 80,
			renderer: upsize
		}, {
			header: 'Start Serial',
			dataIndex: 'start_serial',
			flex: 1,
			renderer: upsize
		}]
	});
	var outp_modellotno1b = Ext.create('Ext.grid.Panel', {
		title: 'ACTUAL',
		width: '49.8%',
		height: '100%',
		store: actual,
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
			renderer: upsize,
			summaryRenderer: function() {
				return 'Output :'
			}
		}, {
			header: 'First Output',
			dataIndex: 'stime',
			width: 100,
			renderer: upsize
		}, {
			header: 'Line Name',
			dataIndex: 'line_name',
			widht: 90,
			renderer: upsize
		}, {
			header: 'Model Name',
			dataIndex: 'model_name',
			width: 130,
			renderer: upsize,
			hidden: true
		}, {
			header: 'Shift',
			dataIndex: 'shift',
			width: 50,
			renderer: upsize
		}, {
			header: 'Output',
			dataIndex: 'output',
			flex: 1,
			renderer: upsize,
			summaryType: 'sum'
		}],
		features: [{
			ftype: 'filters',
			encode: encode, // json encode the filter query
			local: local
		}]
	});
	var panel_modellotno1b = Ext.create('Ext.panel.Panel', {
		autoScroll: true,
		id: 'panel_modellotno1b',
		region: 'center',
		autoWidth: true,
		height: 150,
		layout: {
			type: 'hbox',
			align: 'strecth'
		},
		items: [sch_modellotno1b, {
			xtype: 'tbspacer'
		}, outp_modellotno1b]
	});
	var panel_modellotno1 = Ext.create('Ext.panel.Panel', {
		region: 'north',
		width: '100%',
		height: 320,
		minHeight: 320,
		layout: 'border',
		defaults: {
			split: true
		},
		items: [panel_modellotno1a, panel_modellotno1b]
	});
	var panel_modellotno2 = Ext.create('Ext.panel.Panel', {
		region: 'center',
		width: '100%',
		height: 550,
		layout: 'vbox',
		items: [tab_modellotno2]
	});
	var panel_modellotno = Ext.create('Ext.panel.Panel', {
		renderTo: 'hasildata',
		width: '100%',
		height: 680,
		layout: 'border',
		hidden: true,
		defaults: {
			split: true,
			collapsible: false
		},
		items: [panel_modellotno1, panel_modellotno2]
	});
	//	==** end **==
	//	******
	//	**	created by Mohamad Yunus
	//	**	Symptom
	//	model
	//	**
	Ext.define('symptom_data', {
		extend: 'Ext.data.Model',
		fields: ['rejdate', 'line_name', 'model_name', 'lot_size', 'start_serial', 'defcause', 'plcdisp', 'totrej']
	});
	//	json
	//	**
	var symptom = Ext.create('Ext.data.Store', {
		model: 'symptom_data',
		autoLoad: false,
		proxy: {
			type: 'ajax',
			url: 'json/json_symptom.php',
			reader: {
				type: 'json',
				root: 'rows'
			}
		}
	});
	//	grid
	//	**
	var grd_symptom = Ext.create('Ext.grid.Panel', {
		title: 'Data Symptom',
		width: '100%',
		height: '100%',
		store: symptom,
		viewConfig: {
			stripeRows: true,
			emptyText: '<div class="empty-txt">No data to display.</div>',
			deferEmptyText: false
		},
		columns: [{
			header: 'Reject Date',
			dataIndex: 'rejdate',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Line Name',
			dataIndex: 'line_name',
			width: 90,
			renderer: upsize
		}, {
			header: 'Model Name',
			dataIndex: 'model_name',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Lot Size',
			dataIndex: 'lot_size',
			width: 80,
			renderer: upsize
		}, {
			header: 'Start Serial',
			dataIndex: 'start_serial',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Defected Cause',
			dataIndex: 'defcause',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Place Disposal',
			dataIndex: 'plcdisp',
			flex: 1,
			renderer: upsize
		}, {
			header: 'Total Reject',
			dataIndex: 'totrej',
			flex: 1,
			renderer: upsize
		}]
	});
	var panel_symptom1a = Ext.create('Ext.panel.Panel', {
		title: 'Traceability Search',
		id: 'panel_symptom1a',
		region: 'north',
		width: '100%',
		layout: {
			type: 'hbox',
			align: 'strecth'
		},
		tbar: [{
				xtype: 'tbspacer',
				width: 5
			}, {
				xtype: 'radiogroup',
				fieldLabel: 'Category',
				id: 'rb4',
				columns: [100, 100, 10, 10],
				labelWidth: 50,
				vertical: true,
				items: [{
					boxLabel: 'Finish Good',
					name: 'src_cat4',
					inputValue: 'fg'
				}, {
					boxLabel: 'Single Parts',
					name: 'src_cat4',
					inputValue: 'sp'
				}, {
					boxLabel: 'Model and Lotno',
					name: 'src_cat4',
					inputValue: 'ml',
					width: 120
				}, {
					boxLabel: 'Symptom',
					name: 'src_cat4',
					checked: true,
					inputValue: 'sym',
					width: 100
				}],
				listeners: {
					change: function() {
						Ext.WindowManager.each(function(component) {
							if (component.getXType() === 'window') {
								component.destroy();
							}
						});
						var x = Ext.getCmp('rb4').getValue()['src_cat4'];
						if (x == 'sp') {
							panel_master.hide();
							panel_single_part.show();
							panel_modellotno.hide();
							panel_symptom.hide();
							Ext.getCmp('rb2').reset();
						} else if (x == 'fg') {
							panel_master.show();
							panel_single_part.hide();
							panel_modellotno.hide();
							panel_symptom.hide();
							Ext.getCmp('rb').reset();
						} else if (x == 'ml') {
							panel_master.hide();
							panel_single_part.hide();
							panel_modellotno.show();
							panel_symptom.hide();
							Ext.getCmp('rb3').reset();
						} else {
							panel_master.hide();
							panel_single_part.hide();
							panel_modellotno.hide();
							panel_symptom.show();
							Ext.getCmp('rb4').reset();
						}
						//alert(x);
					}
				}
			}, {
				xtype: 'tbspacer',
				width: 30
			}, '-', {
				xtype: 'button',
				id: 'src_symptom',
				name: 'src_symptom',
				text: 'SEARCH',
				iconCls: 'search',
				scale: 'medium'
				//handler: src_symptom
			}, '->',
			clock4, '  '
		],
		listeners: {
			render: {
				fn: function() {
					Ext.fly(clock4.getEl().parent()).addCls('x-status-text-panel').createChild({
						cls: 'spacer'
					});
					Ext.TaskManager.start({
						run: function() {
							Ext.fly(clock4.getEl()).update(Ext.Date.format(new Date(), 'M, D-Y g:i:s A'));
						},
						interval: 1000
					});
				},
				delay: 100
			}
		}
	});
	var panel_symptom1b = Ext.create('Ext.panel.Panel', {
		autoScroll: true,
		id: 'panel_symptom1b',
		region: 'center',
		autoWidth: true,
		height: 150,
		layout: {
			type: 'hbox',
			align: 'strecth'
		},
		items: [grd_symptom]
	});
	var panel_symptom1 = Ext.create('Ext.panel.Panel', {
		region: 'north',
		width: '100%',
		height: 680,
		minHeight: 680,
		layout: 'border',
		defaults: {
			split: true
		},
		items: [panel_symptom1a, panel_symptom1b]
	});
	var panel_symptom = Ext.create('Ext.panel.Panel', {
		renderTo: 'hasildata',
		width: '100%',
		height: 680,
		layout: 'border',
		hidden: true,
		defaults: {
			split: true,
			collapsible: false
		},
		items: [panel_symptom1]
	});

	var searchdata = Ext.create('Ext.panel.Panel', {
		renderTo		: 'searchdata',
		bodyPadding		: 5,
		// frame			: false,
		// border			: false,
		// bodyStyle		: 'background:transparent;',
		 width			: '100px',
		// fieldDefaults	: {
		// 	labelAlign	: 'left',
		// 	labelStyle	: 'font-weight:bold',
		// 	anchor		: '100%'
		// },
		// items: [
		// 	{
		// 		xtype		: 'fieldcontainer',
		// 		fieldLabel	: 'Search on ',
		// 		labelWidth	: 87,
		// 		layout		: 'hbox',
		// 		items		: [
		// 			{
		// 				xtype		: 'datefield',
		// 				id			: 'valstdatebc',
		// 				name		: 'valstdatebc',
		// 				fieldCls	: 'biggertext',
		// 				emptyText	: 'Start Scan Date',
		// 				format		: 'd-M-Y',
		// 				margins		: '0 6 6 0',
		// 				value		: Ext.Date.format(new Date(), 'd-M-Y'),
		// 				height 		: 35,
		// 				flex		: 1,
		// 				listeners	: {
		// 					select  : function(){
		// 						Ext.getCmp('valendatebc').enable();
		// 					},
		// 					change	: function(f,new_val) {
		// 						var valdate = Ext.getCmp('valstdatebc').getValue();
		// 						if( valdate == null ){
		// 							Ext.getCmp('valendatebc').setValue('');
		// 							Ext.getCmp('valendatebc').disable();
		// 						}
		// 						else{
		// 							Ext.getCmp('valendatebc').setValue('');
		// 							Ext.getCmp('valendatebc').setMinValue( Ext.getCmp('valstdatebc').getValue() );
		// 						}
		// 					}
		// 				}
		// 			}, {
		// 				xtype		: 'datefield',
		// 				id			: 'valendatebc',
		// 				name		: 'valendatebc',
		// 				fieldCls	: 'biggertext',
		// 				emptyText	: 'End Scan Date',
		// 				format		: 'd-M-Y',
		// 				margins		: '0 6 6 0',
		// 				value		: Ext.Date.format(new Date(), 'd-M-Y'),
		// 				height 		: 35,
		// 				flex		: 1,
		// 				listeners	: {
		// 					specialkey : function(field, e) {
		// 						if (e.getKey() == 13) {
		// 							dsbarchart.proxy.setExtraParam('valstdate', 	Ext.Date.format(new Ext.getCmp('valstdatebc').getValue(), 'Ymd') );
		// 							dsbarchart.proxy.setExtraParam('valendate', 	Ext.Date.format(new Ext.getCmp('valendatebc').getValue(), 'Ymd') );
		// 							dsbarchart.loadPage(1);
		// 						}
		// 					}
		// 				}
		// 			}, {
		// 				xtype		: 'label',
		// 				text		: '  ',
		// 				margins		: '5 5 0 5'
		// 			}
		// 		]
		// 	}
		// ]
	});

	//	==** end **==
	function src_fnsgood() {
		var win_src;
		if (!win_src) {
			var form_src = Ext.create('Ext.form.Panel', {
				layout: {
					type: 'vbox',
					align: 'fit'
				},
				bodyPadding: 10,
				fieldDefaults: {
					labelWidth: 100,
					labelStyle: 'font-weight: bold',
					msgTarget: 'side'
				},
				defaults: {
					margins: '0 0 10 0'
				},
				items: [{
					xtype: 'textfield',
					fieldLabel: 'Model',
					id: 'model',
					name: 'model',
					allowBlank: false,
					labelWidth: 50,
					//value		: 'DPX5000BTITA9N'
					value: 'DDX317BTEN'
				}, {
					xtype: 'textfield',
					fieldLabel: 'S/No.',
					id: 'serial_no',
					name: 'serial_no',
					allowBlank: false,
					labelWidth: 50,
					//value		: '131X7740'
					value: '151X0001'
				}, {
					xtype: 'button',
					id: 'btn-src',
					name: 'btn-src',
					text: 'SEARCH',
					iconCls: 'search',
					iconAlign: 'top',
					width: '100%',
					scale: 'small',
					handler: function() {
						//var line   	= Ext.getCmp('line_name').getValue();
						var model = Ext.getCmp('model').getValue();
						var s_no = Ext.getCmp('serial_no').getValue();
						if (((!model) || (!s_no)) || ((!model) && (!s_no))) {
							Ext.Msg.alert('Warning', 'Model or Serial Number cannot be null !!!');
						} else {
							//Ext.Msg.alert('Model',model);
							var x = Ext.getCmp('rb').getValue()['src_cat'];
							output_store.proxy.setExtraParam('src_cat', x);
							sched_store.proxy.setExtraParam('src_cat', x);
							im_output.proxy.setExtraParam('src_cat', x);
							im_downtime.proxy.setExtraParam('src_cat', x);
							im_quality.proxy.setExtraParam('model', model); // _Z_ by zaki20161017
							im_quality.proxy.setExtraParam('serial_no', s_no); // _Z_ by zaki20161017
							im_quality.proxy.setExtraParam('src_cat', x); // _Z_ by zaki20161017
							im_quality.loadPage(1);
							part_mchcal.proxy.setExtraParam('model', model); // _Z_ by zaki 20161031
							part_mchcal.proxy.setExtraParam('src_cat', x); // _Z_ by zaki 20161031
							part_mchcal.loadPage(1); // _Z_ by zaki 20161031
							part_mchnism.proxy.setExtraParam('model', model); // _Z_ by zaki 20161031
							part_mchnism.proxy.setExtraParam('src_cat', x); // _Z_ by zaki 20161031
							part_mchnism.loadPage(1); // _Z_ by zaki 20161031
							part_mchtronics.proxy.setExtraParam('model', model); // _Z_ by zaki 20161031
							part_mchtronics.proxy.setExtraParam('src_cat', x); // _Z_ by zaki 20161031
							part_mchtronics.loadPage(1); // _Z_ by zaki 20161031
							/*======== problem info =============*/
							part_problem_mc.proxy.setExtraParam('model', model); // _Z_ by zaki 20161031
							part_problem_mc.proxy.setExtraParam('src_cat', x); // _Z_ by zaki 20161031
							part_problem_mc.loadPage(1); // _Z_ by zaki 20161031
							qty_problem_mc.proxy.setExtraParam('model', model); // _Z_ by zaki 20161031
							qty_problem_mc.proxy.setExtraParam('src_cat', x); // _Z_ by zaki 20161031
							qty_problem_mc.loadPage(1); // _Z_ by zaki 20161031
							part_problem_iqc.proxy.setExtraParam('model', model); // _Z_ by zaki 20161031
							part_problem_iqc.proxy.setExtraParam('src_cat', x); // _Z_ by zaki 20161031
							part_problem_iqc.loadPage(1); // _Z_ by zaki 20161031
							qty_problem_iqc.proxy.setExtraParam('model', model); // _Z_ by zaki 20161031
							qty_problem_iqc.proxy.setExtraParam('src_cat', x); // _Z_ by zaki 20161031
							qty_problem_iqc.loadPage(1); // _Z_ by zaki 20161031
							part_problem_ma.proxy.setExtraParam('model', model); // _Z_ by zaki 20161031
							part_problem_ma.proxy.setExtraParam('src_cat', x); // _Z_ by zaki 20161031
							part_problem_ma.loadPage(1); // _Z_ by zaki 20161031
							qty_problem_ma.proxy.setExtraParam('model', model); // _Z_ by zaki 20161031
							qty_problem_ma.proxy.setExtraParam('src_cat', x); // _Z_ by zaki 20161031
							qty_problem_ma.loadPage(1); // _Z_ by zaki 20161031
							part_problem_mecha.proxy.setExtraParam('model', model); // _Z_ by zaki 20161031
							part_problem_mecha.proxy.setExtraParam('src_cat', x); // _Z_ by zaki 20161031
							part_problem_mecha.loadPage(1); // _Z_ by zaki 20161031
							qty_problem_mecha.proxy.setExtraParam('model', model); // _Z_ by zaki 20161031
							qty_problem_mecha.proxy.setExtraParam('src_cat', x); // _Z_ by zaki 20161031
							qty_problem_mecha.loadPage(1); // _Z_ by zaki 20161031
							/*========* problem info *=============*/
							part_im.proxy.setExtraParam('src_cat', x);
							scanin_store.proxy.setExtraParam('src_cat', x);
							scanout_store.proxy.setExtraParam('src_cat', x);
							main_store.proxy.setExtraParam('model', model);
							main_store.proxy.setExtraParam('serial_no', s_no);
							main_store.loadPage(1);
							prd_res_store.proxy.setExtraParam('model', model);
							prd_res_store.proxy.setExtraParam('serial_no', s_no);
							prd_res_store.proxy.setExtraParam('src_cat', x);
							prd_res_store.loadPage(1);
							prd_lost_time.proxy.setExtraParam('line', Ext.getCmp('line_name').getValue());
							prd_lost_time.proxy.setExtraParam('model', model);
							scanin_store.proxy.setExtraParam('serial_no', s_no);
							scanin_store.loadPage(1);
							scanout_store.proxy.setExtraParam('serial_no', s_no);
							scanout_store.loadPage(1);
							//prd_lost_time.loadPage(1);
						}
					}
				}]
			});
			win_src = Ext.widget('window', {
				title: 'Form Search',
				width: 300,
				minWidth: 300,
				autoHeight: true,
				modal: false,
				constrain: true,
				layout: 'fit',
				//animateTarget: 'src_part',
				items: form_src,
				listeners: {
					activate: function() {
						//Ext.getCmp('src_part').disable();
					},
					close: function() {
						//Ext.getCmp('src_part').enable();
					}
				}
			});
			win_src.show();
		}
	}
	function fileimage(val) {
		return '<a href="detailpic/' + val + '" target="_blank"> <img style="max-width:120px; max-height:120px;" src="detailpic/' + val + '" /> </a>';
	}
});
</script>
