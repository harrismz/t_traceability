	Ext.Loader.setConfig({ enabled: true });
	Ext.Loader.setPath('Ext.ux', '../framework/extjs-6.2.0/packages/ux/classic/src');
	Ext.Loader.setPath('Ext.ajax', '../framework/extjs-6.2.0/packages/ux/src');
	
	// Ext.override(Ext.form.TextField, {
	// 	enableKeyEvents: true,
	// 	onKeyUp: function(e, o) {
	// 		var value = this.getValue().toUpperCase();
	// 		this.setValue(value);
	// 		this.fireEvent('keyup', this, e);
	// 	}
	// });

	//function untuk fontsize grid
	function upsize(val) {
		var x = val;
		if (x == ''){
			return '<font class="fontsize12" style="color:red;font-weight: bold;"> --- </font>';
		}
		else{
			return '<font class="fontsize12">' + x + '</font>';
		}
	}

	// Start
	Ext.onReady(function() {

		//	========================================================    VARIABLE    =======================================
			// configure whether filter query is encoded or not (initially)
			var encode = false;

			// configure whether filtering is performed locally or remotely (initially)
			var local = true;
			Ext.QuickTips.init();

			//	end function untuk column bigsize
			var itemperpage = 10;
			var date 		= new Date();
			
		//	=======================================================    MODEL    =========================================
			
					Ext.define('model_smt_reflow',{
		                extend: 'Ext.data.Model',
		                fields: ['board_id', 'scan_date', 'reflow_start_time', 'reflow_end_time','boardlen','diffdate','pcbid']
		           	});
					
		//	=======================================================    DATASTORE    =====================================

					var store_smt_reflow = Ext.create('Ext.data.Store',{
						model	: 'model_smt_reflow',
						autoLoad: true,
						pageSize: itemperpage,
						proxy   : {
							type    : 'ajax',
							url     : 'json/json_smt_reflow.php',
							reader  : {
								type    : 'json',
								root    : 'rows'
							}
						},
						listeners: {
							load: function(store, records) {
								if (records == "") {
									Ext.Msg.alert('Warning', 'Data not Available !');
								}
							}
						}
					});
					

		//	=======================================================    GRID    ==========================================
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
						}, {
							header: 'PCB ID',
							dataIndex: 'pcbid',
							flex: 1,
							renderer: upsize
						}],
						//features: [filters],
						// selModel: {
						// 	selType: 'cellmodel'
						// },
						// plugins: [cellEditing]
					});
					
					
		//	=======================================================    PANEL    =========================================
			
			//	Traceability Panel
					var reflow_panel = Ext.create('Ext.panel.Panel', {
						id 				:'reflow_panel',
						renderTo 		: 'reflow_grid',
						autoWidth		: '100%',
						maxHeight		: 820,
						border			: false,
						frame			: true,
						hidden			: false,
						defaults		: {
							split		: true,
							collapsible	: false
						},
						items			: [grid_smt_reflow]
					});
			
		//	=======================================================    POPUP SEARCH DATA    =============================
				Ext.create('Ext.form.field.Date',{
					renderTo 	: src_reflow_date,
					width 		: '100%',
					id 			: 'src_reflow_date',
					name 		: 'src_reflow_date',
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


