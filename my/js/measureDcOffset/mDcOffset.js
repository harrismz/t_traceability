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
		Ext.define('modelDcOffset',{
            extend: 'Ext.data.Model',
            fields: ['idlinezero', 'dateinspec', 'serial', 'guid_master', 'sn', 'judge', 'inspectime', 'ngcontent', 
                   'rownumber', 'step', 'stepdata', 'measure', 'measuredata', 'input_user', 'input_date', 'lotno']
       	});
			
	//	=======================================================    DATASTORE    =====================================
		var storeDcOffset = Ext.create('Ext.data.Store',{
			storeId	: 'storeDcOffset',
			model	: 'modelDcOffset',
			autoLoad: true,
			pageSize: itemperpage,
			proxy   : {
				type    : 'ajax',
				url     : 'json/measureDcOffset/json_measureDCOffset.php',
				extraParams: {
					valmodel: '',
					valserial: '',
					vallotno: '',
					valrundate: ''
				},
				reader  : {
					type    : 'json',
					root    : 'rows',
					totalProperty : 'totalCount'
				}
			}
		});
		// var storeMaLine0 = Ext.create('Ext.data.Store',{
		// 	storeId : 'storeMaLine0',
		// 	model	: 'modelMaLine0',
		// 	autoLoad: false,
		// 	// pageSize: itemperpage,
		// 	proxy   : {
		// 		type    : 'ajax',
		// 		url     : 'json/finishgood_ma/json_maLine0.php',
		// 		reader  : {
		// 			type    : 'json',
		// 			root    : 'rows',
		// 			// totalProperty: 'totalCount'
		// 		}
		// 	}
		// });
		// var storeMaLine0Detail = Ext.create('Ext.data.Store',{
		// 	storeId : 'storeMaLine0Detail',
		// 	model	: 'modelMaLine0Detail',
		// 	autoLoad: false,
		// 	pageSize: 7,
		// 	proxy   : {
		// 		type    : 'ajax',
		// 		url     : 'json/finishgood_ma/json_maLine0Detail.php',
		// 		reader  : {
		// 			type    : 'json',
		// 			root    : 'rows',
		// 			totalProperty: 'totalCount'
		// 		}
		// 	}
		// });
	//	=======================================================    GRID    ==========================================
		var gridDcOffset = Ext.create('Ext.grid.Panel', {
			id 				: 'gridDcOffset',
			renderTo		: mDcOffset,
			autoWidth 	 	: '100%',
			maxHeight	 	: 420,
			columnLines 	: true,
			store 			: storeDcOffset,
			plugins 		: 'gridfilters',
    		viewConfig	: {
				stripeRows 			: true,
				emptyText 			: '<div class="empty-txt-main">Select Date for show this data.</div>',
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
			columns: [
				{	header       	: 'No', 
   					xtype 			: 'rownumberer', 
   					componentCls	: 'headergrid',
   					width 			: 50, 
   					sortable 		: false
   				},
   				{	header 			: 'Serial Number',
					dataIndex 		: 'sn',
					componentCls 	: 'headergrid',
     				flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
     				renderer 		: fontstyle
				},
				{	header 		: 'Lot No',
					dataIndex 	: 'lotno',
					componentCls 	: 'headergrid',
     				autoSizeColumn : true,
     				renderer 	: fontstyle
				},
				{	header 		: 'Result',
					dataIndex 	: 'measuredata',
					componentCls 	: 'headergrid',
     				autoSizeColumn : true,
     				renderer 	: fontstyle
				},
				{	header 		: 'measurement',
					dataIndex 	: 'measure',
					componentCls 	: 'headergrid',
     				autoSizeColumn : true,
     				renderer 	: fontstyle,
				},
				{	header 		: 'Remark',
					dataIndex 	: 'judge',
					componentCls 	: 'headergrid',
     				autoSizeColumn : true,
     				renderer 	: fontStatus,
			        filter: {
			            // required configs
			            type: 'string',
			            // optional configs
			            value: 'OK',  // setting a value makes the filter active.
			            itemDefaults: {
			                // any Ext.form.field.Text configs accepted
			            }
			        }

				},
				{	header 			: 'idlinezero',
					dataIndex 		: 'idlinezero',
					componentCls 	: 'headergrid',
					flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
     				renderer 		: fontstyle,
     				hidden 			: true
				},
				{	header 		: 'Inspection Date',
					dataIndex 	: 'dateinspec',
					componentCls 	: 'headergrid',
     				flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
     				renderer 	: fontstyle
				},
				{	header 		: 'serial',
					dataIndex 	: 'serial',
					componentCls 	: 'headergrid',
     				renderer 	: fontstyle,
     				autoSizeColumn : true,
     				hidden 		: true
				},
				{	header 		: 'guid_master',
					dataIndex 	: 'guid_master',
					componentCls 	: 'headergrid',
     				renderer 	: fontstyle,
     				autoSizeColumn : true,
     				hidden 		: true
				},
				{	header 		: 'Inspect Time',
					dataIndex 	: 'inspectime',
					componentCls 	: 'headergrid',
     				autoSizeColumn : true,
     				renderer 	: fontstyle
				},
				{	header 		: 'ngcontent',
					dataIndex 	: 'ngcontent',
					componentCls 	: 'headergrid',
     				renderer 	: fontstyle,
     				autoSizeColumn : true,
     				hidden 		: true
				},
				{	header 		: 'rownumber',
					dataIndex	: 'rownumber',
					componentCls 	: 'headergrid',
     				autoSizeColumn : true,
     				renderer	: fontstyle,
     				hidden 		: true
				},
				{	header 		: 'step',
					dataIndex 	: 'step',
					componentCls 	: 'headergrid',
     				renderer 	: fontstyle,
     				autoSizeColumn : true,
     				hidden 		: true
				},
				{	header 		: 'stepdata',
					dataIndex 	: 'stepdata',
					componentCls 	: 'headergrid',
     				flex 			: getFlexFgFinishgood(),
					autoSizeColumn 	: getWidthFgFinishgood(),
     				renderer 	: fontstyle,
     				hidden 		: true
				},
				{	header 		: 'M/C Name',
					dataIndex 	: 'input_user',
					componentCls 	: 'headergrid',
     				autoSizeColumn : true,
     				renderer 	: fontstyle,
     				hidden 		: true
				},
				{	header 		: 'input_date',
					dataIndex 	: 'input_date',
					componentCls 	: 'headergrid',
     				autoSizeColumn : true,
     				renderer 	: fontstyle,
     				hidden 		: true
				}
			],
			// bbar	: Ext.create('Ext.PagingToolbar', {
			// 	pageSize		: itemperpage,
			// 	store			: storeDcOffset,
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
			// 		afterrender: function (cmp) {
			// 			cmp.getComponent("refresh").hide();
			// 		}
			// 	}
			// })
		});

	//	=======================================================    POPUP SEARCH DATA    =============================
		var dtnow2 = new Date();
		var dtnow = Ext.Date.format(dtnow2, 'Y-m-d');

		Ext.create('Ext.form.field.Date',{
			renderTo 	: src_mDcOffset,
			width 		: '100%',
			id 			: 'src_mDcOffset',
			name 		: 'src_mDcOffset',
			fieldCls	: 'biggertext',
			emptyText	: 'Search Date',
			margins		: '0 6 0 0',
			height 		: 25,
			flex		: 1,
			format		: 'd F Y',
			submitFormat: 'Y-m-d',
			mode		: 'local',  
			value 		: dtnow,
			editable 	: false,
			listeners	: {
					afterrender : function() {
						this.inputEl.setStyle('text-align', 'center');
						this.inputEl.setStyle('backgroundColor', '#0067AE');
						this.inputEl.setStyle('color', '#fff');
						this.inputEl.setStyle('fontSize', '15px');
						var me = this,
				            inputElement = me.inputElement;
				 
				        if (inputElement && inputElement.dom.focus) {
				            inputElement.dom.focus();
				        }
				        return me;
					},
					specialkey : function(field, e) {
						if (e.getKey() == 13) {
							var measurement_date = Ext.getCmp('src_mDcOffset').getValue();
							
							if (!measurement_date) {
								Ext.Msg.alert('Warning', 'Measurement date cannot be null !!!');
							} else {
								storeDcOffset.proxy.setExtraParam('valmodel', '');
								storeDcOffset.proxy.setExtraParam('valserial', '');
								storeDcOffset.proxy.setExtraParam('vallotno', '');
								storeDcOffset.proxy.setExtraParam('valrundate', measurement_date);
								storeDcOffset.loadPage(1);
							}
						}
					},
					change: function() {
						var measurement_date = Ext.getCmp('src_mDcOffset').getValue();
							
							if (!measurement_date) {
								Ext.Msg.alert('Warning', 'Measurement date cannot be null !!!');
							} else {

								storeDcOffset.proxy.setExtraParam('valmodel', '');
								storeDcOffset.proxy.setExtraParam('valserial', '');
								storeDcOffset.proxy.setExtraParam('vallotno', '');
								storeDcOffset.proxy.setExtraParam('valrundate', measurement_date);
								storeDcOffset.loadPage(1);
							}
					}
				}
		});
});


