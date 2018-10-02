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
			
					Ext.define('model_symptom',{
		                extend: 'Ext.data.Model',
		                fields: ['rejdate','line_name','model_name','lot_size','start_serial','defcause','plcdisp','totrej']
		           	});
					
		//	=======================================================    DATASTORE    =====================================

					var store_symptom = Ext.create('Ext.data.Store',{
						storeId	: 'store_symptom',
						model	: 'model_symptom',
						autoLoad: false,
						pageSize: itemperpage,
						proxy   : {
							type    : 'ajax',
							url     : 'json/symptom/json_symptom.php',
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
					var grid_symptom = Ext.create('Ext.grid.Panel', {
						id: 'grid_symptom',
						autoWidth 	: '100%',
						maxHeight	: 290,
						columnLines: true,
						store: store_symptom,
						viewConfig: {
							stripeRows: true,
							emptyText: '<div class="empty-txt">No data to display.</div>',
							deferEmptyText: false,
							enableTextSelection: true
						},
						columns: [
						{ header    : 'Reject Date',    dataIndex   : 'rejdate',    	flex: 1, 	renderer: upsize },
						{ header    : 'Line Name',    	dataIndex   : 'line_name',    	width: 90, 	renderer: upsize },
						{ header    : 'Model Name',   	dataIndex   : 'model_name',   	flex: 1, 	renderer: upsize },
						{ header    : 'Lot Size',    	dataIndex   : 'lot_size',     	width: 80, 	renderer: upsize },
						{ header    : 'Start Serial', 	dataIndex   : 'start_serial',	flex: 1, 	renderer: upsize },
						{ header    : 'Defected Cause', dataIndex   : 'defcause', 		flex: 1, 	renderer: upsize },
						{ header    : 'Place Disposal', dataIndex   : 'plcdisp', 		flex: 1, 	renderer: upsize },
						{ header    : 'Total Reject', 	dataIndex   : 'totrej', 		flex: 1, 	renderer: upsize }
						],
						//features: [filters],
						// selModel: {
						// 	selType: 'cellmodel'
						// },
						// plugins: [cellEditing]
					});
										
		//	=======================================================    PANEL    =========================================
			
			//	Traceability Panel
					var panel_symptom = Ext.create('Ext.panel.Panel', {
						id 				:'panel_symptom',
						renderTo 		: 'panel_symptom',
						autoWidth		: '100%',
						maxHeight		: 820,
						border			: false,
						frame			: true,
						hidden			: false,
						defaults		: {
							split		: true,
							collapsible	: false
						},
						items			: [grid_symptom]
					});
			
		//	=======================================================    POPUP SEARCH DATA    =============================
				Ext.create('Ext.form.field.Date',{
					//renderTo 	: src_symptom_date,
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
										
									// 	store_smt_reflow.proxy.setExtraParam('src_cat', 'fg');
									// 	store_smt_reflow.proxy.setExtraParam('prod_date', reflow_date);
									// 	store_smt_reflow.proxy.setExtraParam('model', 'nomodel');
									// 	store_smt_reflow.loadPage(1);
									}
								}
							},
							change : function(){
								var reflow_date = Ext.getCmp('src_reflow_date').getValue();
									
								if (!reflow_date) {
									Ext.Msg.alert('Warning', 'Reflow date cannot be null !!!');
								} else {
									
								// 	store_smt_reflow.proxy.setExtraParam('src_cat', 'fg');
								// 	store_smt_reflow.proxy.setExtraParam('prod_date', reflow_date);
								// 	store_smt_reflow.proxy.setExtraParam('model', 'nomodel');
								// 	store_smt_reflow.loadPage(1);
								}
							}
						}
				});

		//	========================================================	FROM BOOTSTRAP	=================================

			
		//	==** end **==

	});

	function checkSymptom(d) {
		var dept = d;
		Ext.getStore('store_symptom').proxy.setExtraParam('dept', d);
		Ext.getStore('store_symptom').loadPage(1);
	}

