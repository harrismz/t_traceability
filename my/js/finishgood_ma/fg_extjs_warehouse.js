Ext.onReady(function() {
	var itemperpage = 5;
	//	=======================================================    MODEL        =====================================
		Ext.define('stockcard',{
			extend:'Ext.data.Model',
			fields:[ 'idstockcard', 'model', 'lotno', 'line', 'startsn', 'endsn', 'qty', 'remark', 'status', 
					'input_user', 'input_date', 'update_user', 'update_date' ]
		});
		Ext.define('cbx_status', {
			extend	: 'Ext.data.Model',
			fields	: [ 'status' ]
		});

		Ext.define('shipmenthold',{
			extend:'Ext.data.Model',
			fields:[ 'idshipmenthold', 'model', 'lotno', 'problem', 'status', 'startsn', 'endsn', 'remark', 
					'qtyrequest', 'qtywh', 'qtyshipout', 'qtyhold', 'input_user', 'input_date', 'update_user',
					 'update_date' ]
		});
		Ext.define('cbx_statussh', {
			extend	: 'Ext.data.Model',
			fields	: [ 'status' ]
		});

		Ext.define('borrow',{
			extend:'Ext.data.Model',
			fields:[ 'idnumber', 'model', 'serial', 'dept', 'status', 'scanbarcode', 'input_user', 'input_date', 'update_user', 'update_date' ]
		});
		Ext.define('scanin',{
			extend:'Ext.data.Model',
			fields:[ 'idnumber', 'model', 'serial', 'lotno', 'status', 'input_user', 'input_date', 'update_user', 'update_date' ]
		});
		Ext.define('scanout',{
			extend:'Ext.data.Model',
			fields:[ 'contno', 'vanningid', 'vanningdate', 'dest', 'shipout', 'idnumber', 'model', 'serial', 'input_user', 'input_date', 'update_user', 'update_date' ]
		});
	//	=======================================================    DATASTORE    =====================================
		var storeStockcard = Ext.create('Ext.data.JsonStore', {
			storeId     : 'storeStockcard',
			model       : 'stockcard',
			autoLoad    : false,
			pageSize    : itemperpage,
			proxy		: {
				type	: 'ajax',
				url		: 'json/finishgood_ma/json_stockcard.php',
				// extraParams: {
				// 	valstdate: Ext.Date.format(new Date(date.getFullYear(), date.getMonth(), 1), 'Ymd'),
				// 	valendate: Ext.Date.format(new Date(), 'Ymd')
				// },
				reader	: {
					type			: 'json',
					root			: 'rows',
					totalProperty	: 'totalcount'
				}
			}
		});
		var ds_cbx_status = Ext.create('Ext.data.Store', {
			model		: 'cbx_status',
			autoLoad	: false,
			fields		: [ 'status' ],
			proxy		: {
				type	: 'ajax',
				// url		: 'json/json_cbxstatus.php',
				reader	: {
					type	: 'json',
					root	: 'rows'
				}
			}
		});

		var storeShipmentHold = Ext.create('Ext.data.JsonStore', {
			storeId 	: 'storeShipmentHold',
			model       : 'shipmenthold',
			autoLoad    : false,
			pageSize    : itemperpage,
			proxy		: {
				type	: 'ajax',
				url		: 'json/finishgood_ma/json_shipmenthold.php',
				// extraParams: {
				// 	valstdate: Ext.Date.format(new Date(date.getFullYear(), date.getMonth(), 1), 'Ymd'),
				// 	valendate: Ext.Date.format(new Date(), 'Ymd')
				// },
				reader	: {
					type			: 'json',
					root			: 'rows',
					totalProperty	: 'totalcount'
				}
			}
		});
		var ds_cbx_statussh = Ext.create('Ext.data.Store', {
			model		: 'cbx_statussh',
			autoLoad	: false,
			fields		: [ 'status' ],
			proxy		: {
				type	: 'ajax',
				//url		: 'json/json_cbxstatussh.php',
				reader	: {
					type	: 'json',
					root	: 'rows'
				}
			}
		});

		var storeBorrow = Ext.create('Ext.data.JsonStore', {
			storeId     : 'storeBorrow',
			model       : 'borrow',
			autoLoad    : false,
			pageSize    : itemperpage,
			proxy		: {
				type	: 'ajax',
				url		: 'json/finishgood_ma/json_borrow.php',
				reader	: {
					type			: 'json',
					root			: 'rows',
					totalProperty	: 'totalcount'
				}
			}
		});
		var storeScanIN = Ext.create('Ext.data.JsonStore', {
			storeId 	: 'storeScanIN',
			model       : 'scanin',
			autoLoad    : false,
			pageSize    : itemperpage,
			proxy		: {
				type	: 'ajax',
				url		: 'json/finishgood_ma/json_scanin.php',
				extraParams: {
					validnumber: Ext.Date.format(new Date(), 'Ymd')
				},
				reader	: {
					type			: 'json',
					root			: 'rows',
					totalProperty	: 'totalcount'
				}
			}
		});
		var storeScanOUT = Ext.create('Ext.data.JsonStore', {
			storeId 	: 'storeScanOUT',
			model       : 'scanout',
			autoLoad    : false,
			pageSize    : itemperpage,
			proxy		: {
				type	: 'ajax',
				url		: 'json/finishgood_ma/json_scanout.php',
				extraParams: {
					validnumber: Ext.Date.format(new Date(), 'Ymd')
				},
				reader	: {
					type			: 'json',
					root			: 'rows',
					totalProperty	: 'totalcount'
				}
			}
		});
	//	=======================================================    GRID         =====================================
		var gridStockcard	= Ext.create('Ext.grid.Panel', {
			// title		: '<div style="text-align:center;">OQC Stockcard</div>',
			id 			: 'gridStockcard',
			renderTo 	: 'wh_stockcard',
			store		: storeStockcard,
			border 		: false,
			autoScroll 	: true,
			columnLines	: true,
			height 		: 300,
			autoWidth	: '100%',
			// multiSelect	: true,
			// selModel	: sm,
			viewConfig	: {
				stripeRows			: true,
				emptyText 			: '<div class="empty-txt-main">Select Finishgood table for show this data.</div>',
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
			columns: [
				// { header: 'No.', xtype: 'rownumberer', width: 55, sortable: false, componentCls : 'headergrid', /*flex:false, autoSizeColumn:true*/ },
				// { text: 'ID Stockcard',	dataIndex: 'idstockcard',	width: 140,	componentCls : 'headergrid', flex:getFlexFgWhStockcard(), autoSizeColumn:getWidthFgWhStockcard(), renderer: fontstyle, },
				// { text: 'Model',		dataIndex: 'model',			flex: 2, 	componentCls : 'headergrid', flex:getFlexFgWhStockcard(), autoSizeColumn:getWidthFgWhStockcard(), renderer: fontstyle, },
				// { text: 'Lot No',		dataIndex: 'lotno',			width: 50, 	componentCls : 'headergrid', flex:getFlexFgWhStockcard(), autoSizeColumn:getWidthFgWhStockcard(), renderer: fontstyle, },
				// { text: 'Line',			dataIndex: 'line',			width: 50, 	componentCls : 'headergrid', flex:getFlexFgWhStockcard(), autoSizeColumn:getWidthFgWhStockcard(), renderer: fontstyle, },
				// { text: 'Start Sn',		dataIndex: 'startsn',		width: 85, 	componentCls : 'headergrid', flex:getFlexFgWhStockcard(), autoSizeColumn:getWidthFgWhStockcard(), renderer: fontstyle, },
				// { text: 'End Sn',		dataIndex: 'endsn',			width: 85, 	componentCls : 'headergrid', flex:getFlexFgWhStockcard(), autoSizeColumn:getWidthFgWhStockcard(), renderer: fontstyle, },
				// { text: 'Q.T.Y',		dataIndex: 'qty',			width: 65, 	componentCls : 'headergrid', flex:getFlexFgWhStockcard(), autoSizeColumn:getWidthFgWhStockcard(), /*renderer: numeric*/ },
				// { text: 'Remark',		dataIndex: 'remark',		flex: 3, 	componentCls : 'headergrid', flex:getFlexFgWhStockcard(), autoSizeColumn:getWidthFgWhStockcard(), renderer: fontstyle, },
				// { text: 'Status',		dataIndex: 'status',		width: 90,	componentCls : 'headergrid', flex:getFlexFgWhStockcard(), autoSizeColumn:getWidthFgWhStockcard(), /*renderer: upsizestatus,*/ align: 'center' },
				// { text: 'Created',		dataIndex: 'input_user',	width: 150, componentCls : 'headergrid', flex:getFlexFgWhStockcard(), autoSizeColumn:getWidthFgWhStockcard(), /*renderer: combinecolsinput,*/ align: 'center' },
				// { text: 'Last Update',	dataIndex: 'update_user',	width: 150, componentCls : 'headergrid', flex:getFlexFgWhStockcard(), autoSizeColumn:getWidthFgWhStockcard(), /*renderer: combinecolsupdate,*/ align: 'center' }
				
				// { header: 'No.', xtype: 'rownumberer', width: 55, sortable: false, componentCls : 'headergrid', /*flex:false, autoSizeColumn:true*/ },
				{ text: 'ID Stockcard',	dataIndex: 'idstockcard',	componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontstyle, },
				{ text: 'Status',		dataIndex: 'status',		componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontStatus, align: 'center' },
				{ text: 'Remark',		dataIndex: 'remark',		componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontstyle, },
				{ text: 'Q.T.Y',		dataIndex: 'qty',			componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: numeric },
				{ text: 'Created',		dataIndex: 'input_user',	componentCls : 'headergrid', width:150, flex:false, autoSizeColumn:false, renderer: combinecolsinput, align: 'center' },
				{ text: 'Last Update',	dataIndex: 'update_user',	componentCls : 'headergrid', width:150, flex:false, autoSizeColumn:false, renderer: combinecolsupdate, align: 'center' },
				{ text: 'Start Sn',		dataIndex: 'startsn',		componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontstyle, },
				{ text: 'End Sn',		dataIndex: 'endsn',			componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontstyle, },
				{ text: 'Model',		dataIndex: 'model',			componentCls : 'headergrid', flex:false, autoSizeColumn:true, hidden:true, renderer: fontstyle, },
				{ text: 'Lot No',		dataIndex: 'lotno',			componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontstyle, },
				{ text: 'Line',			dataIndex: 'line',			componentCls : 'headergrid', flex:false, autoSizeColumn:true, hidden:true, renderer: fontstyle, }
			],
			// listeners: {
				// tbar		: [
				// 	{
				// 		xtype	: 'button',
				// 		id		: 'btn_refresh',
				// 		margins	: '0 0 0 5', // top right bottom left
				// 		iconCls	: 'refresh',
				// 		text 	: 'Refresh',
				// 		tooltip	: 'Refresh',
				// 		handler : function (){
				// 			Ext.getCmp('valstdate').reset();
				// 			Ext.getCmp('valendate').reset();
				// 			Ext.getCmp('valstatus').reset();
				// 			Ext.getCmp('validstockcard').reset();
				// 			Ext.getCmp('valmodel').reset();
				// 			Ext.getCmp('valline').reset();
				// 			Ext.getCmp('vallotno').reset();
							
				// 			datastore.proxy.setExtraParam('valstdate', 	Ext.Date.format(new Date(date.getFullYear(), date.getMonth(), 1), 'Ymd'));
				// 			datastore.proxy.setExtraParam('valendate', 	Ext.Date.format(new Date(), 'Ymd'));
				// 			datastore.proxy.setExtraParam('valstatus', 		Ext.getCmp('valstatus').getValue());
				// 			datastore.proxy.setExtraParam('validstockcard', Ext.getCmp('validstockcard').getValue());
				// 			datastore.proxy.setExtraParam('valmodel', 		Ext.getCmp('valmodel').getValue());
				// 			datastore.proxy.setExtraParam('valline', 		Ext.getCmp('valline').getValue());
				// 			datastore.proxy.setExtraParam('vallotno', 		Ext.getCmp('vallotno').getValue());
				// 			datastore.loadPage(1);
				// 		}
				// 	}, {
				// 		xtype	: 'button',
				// 		id		: 'btn_download',
				// 		iconCls	: 'download',
				// 		text 	: 'Download',
				// 		tooltip	: 'Download',
				// 		handler : function (){
				// 			var valstdate 		= Ext.Date.format(new Ext.getCmp('valstdate').getValue(), 'Ymd');
				// 			var valendate 		= Ext.Date.format(new Ext.getCmp('valendate').getValue(), 'Ymd');
				// 			var valstatus 		= Ext.getCmp('valstatus').getValue();
				// 			var validstockcard 	= Ext.getCmp('validstockcard').getValue();
				// 			var valmodel 		= Ext.getCmp('valmodel').getValue();
				// 			var valline 		= Ext.getCmp('valline').getValue();
				// 			var vallotno 		= Ext.getCmp('vallotno').getValue();
				// 			window.open('resp/down_stockcard.php?valstdate='+valstdate+'&valendate='+valendate+'&valstatus='+valstatus+'&validstockcard='+validstockcard+'&valmodel='+valmodel+'&valline='+valline+'&vallotno='+vallotno+'');
				// 		}
				// 	}, {
				// 		xtype	: 'button',
				// 		id		: 'btn_add',
				// 		iconCls	: 'add',
				// 		text 	: 'Add',
				// 		tooltip	: 'Add',
				// 		handler : function (){
				// 			window.open('index.php?content=stockcardadd');
				// 		}
				// 	}, {
				// 		xtype	: 'button',
				// 		id		: 'btn_edit',
				// 		iconCls	: 'edit',
				// 		text 	: 'Edit',
				// 		tooltip	: 'Edit',
				// 		handler : function (){
				// 			var rec 		= griddata.getSelectionModel().getSelection();
				// 			var valid		= rec[0].data.idstockcard;
				// 			var valmodel 	= rec[0].data.model;
				// 			var valline 	= rec[0].data.line;
				// 			var vallotno 	= rec[0].data.lotno;
				// 			var valstartsn 	= rec[0].data.startsn;
				// 			var valqty 		= rec[0].data.qty;
				// 			var valremark 	= rec[0].data.remark;
				// 			var valstatus 	= rec[0].data.status;
				// 			window.open('index.php?content=stockcardedit?&idstockcard='+valid+'&model='+valmodel+'&line='+valline+'&lotno='+vallotno+'&startsn='+valstartsn+'&qty='+valqty+'&remark='+valremark+'&status='+valstatus+'');
				// 		}
				// 	}, {
				// 		xtype	: 'button',
				// 		id		: 'btn_delete',
				// 		iconCls	: 'delete',
				// 		text 	: 'Delete',
				// 		tooltip	: 'Delete',
				// 		handler : function (){
				// 			Ext.Msg.confirm('Delete data', 'Are you sure delete this data ?', function(btn){
				// 				if (btn == 'yes'){
				// 					var rec 		= griddata.getSelectionModel().getSelection();
				// 					var reclength 	= rec.length;
				// 					var i 			= 0;
				// 					for (var i=0; i < reclength; i++) {
				// 						var validstockcard 	= rec[i].data.idstockcard;
				// 						var box 		= Ext.Msg.wait('sending data');
				// 						Ext.Ajax.request({
				// 							url		: 'resp/resp_stockcard.php',
				// 							method	: 'POST',
				// 							params	: 'idstockcard='+validstockcard+'&typeform=del',
				// 							success	: function(response, opts) {
				// 								var obj = Ext.decode(response.responseText);
				// 								var r 	= obj.msg;
				// 								var msg = r.split(",");
				// 								if (obj.success == true) {
				// 									box.hide();
				// 									datastore.load();
				// 								}else{
				// 									Ext.Msg.show({
				// 										title		:'Delete data',
				// 										icon		: Ext.Msg.ERROR,
				// 										msg			: msg[1],
				// 										buttons		: Ext.Msg.OK
				// 									});
				// 								}
				// 							}
				// 						});
				// 					}
				// 				}
				// 			});
				// 		}
				// 	}
				// ],
			bbar		: Ext.create('Ext.PagingToolbar', {
				pageSize	: 5,
				store		: storeStockcard,
				displayInfo	: true,
				listeners 	: {
					afterrender: function (cmp) {
						cmp.getComponent("refresh").hide();
						cmp.getComponent("first").hide();
						cmp.getComponent("last").hide();
					}
				}
			})
		});
		var gridShipmentHold= Ext.create('Ext.grid.Panel', {
			// title		: '<div style="text-align:center;">QA Shipmenthold</div>',
			id 			: 'gridShipmentHold',
			renderTo 	: 'wh_shipmenthold',
			store		: storeShipmentHold,
			// height		: valheight,
			border 		: false,
			columnLines	: true,
			multiSelect	: true,
			height 		: 300,
			autoWidth	: '100%',
			// selModel	: sm,
			viewConfig	: {
				stripeRows			: true,
				emptyText 			: '<div class="empty-txt-main">Select Finishgood table for show this data.</div>',
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
			columns: [
				// { header: 'No.', xtype: 'rownumberer', width: 55, componentCls : 'headergrid', sortable: false },
					// { text: 'Model',			dataIndex: 'model',			componentCls : 'headergrid', flex:getFlexFgWhStockcard(), autoSizeColumn:getWidthFgWhStockcard(), renderer: fontstyle, },
					// { text: 'Lot No',			dataIndex: 'lotno',			componentCls : 'headergrid', flex:getFlexFgWhStockcard(), autoSizeColumn:getWidthFgWhStockcard(), renderer: fontstyle, },
					// { text: 'Problem',			dataIndex: 'problem',		componentCls : 'headergrid', flex:getFlexFgWhStockcard(), autoSizeColumn:getWidthFgWhStockcard(), renderer: fontstyle, },
					// { text: 'Status',			dataIndex: 'status',		componentCls : 'headergrid', flex:getFlexFgWhStockcard(), autoSizeColumn:getWidthFgWhStockcard(), /*renderer: upsizestatus,*/ align: 'center' },
					// { text: 'Start Sn',			dataIndex: 'startsn',		componentCls : 'headergrid', flex:getFlexFgWhStockcard(), autoSizeColumn:getWidthFgWhStockcard(), renderer: fontstyle, },
					// { text: 'End Sn',			dataIndex: 'endsn',			componentCls : 'headergrid', flex:getFlexFgWhStockcard(), autoSizeColumn:getWidthFgWhStockcard(), renderer: fontstyle, },
					// { text: 'Remark',			dataIndex: 'remark',		componentCls : 'headergrid', flex:getFlexFgWhStockcard(), autoSizeColumn:getWidthFgWhStockcard(), /*renderer: upsize,*/ hidden: true },
					// { header: 'Q.T.Y', componentCls : 'headergrid',  
					//   columns: [
					// 	{ header: 'Request', 	dataIndex: 'qtyrequest',	componentCls : 'headergrid', flex:getFlexFgWhStockcard(), autoSizeColumn:getWidthFgWhStockcard(), /*renderer: numeric*/ },
					// 	{ header: 'on WH', 		dataIndex: 'qtywh',			componentCls : 'headergrid', flex:getFlexFgWhStockcard(), autoSizeColumn:getWidthFgWhStockcard(), /*renderer: numeric*/ },
					// 	{ header: 'Ship Out', 	dataIndex: 'qtyshipout',	componentCls : 'headergrid', flex:getFlexFgWhStockcard(), autoSizeColumn:getWidthFgWhStockcard(), /*renderer: numeric*/ },
					// 	{ header: 'on Hold', 	dataIndex: 'qtyhold',		componentCls : 'headergrid', flex:getFlexFgWhStockcard(), autoSizeColumn:getWidthFgWhStockcard(), /*renderer: numeric*/ }
					//   ]
					// },
					// { text: 'Created',		dataIndex: 'input_user',	componentCls : 'headergrid', flex:getFlexFgWhStockcard(), autoSizeColumn:getWidthFgWhStockcard(), /*renderer: combinecolsinput,*/ align: 'center' },
					// { text: 'Last Update',	dataIndex: 'update_user',	componentCls : 'headergrid', flex:getFlexFgWhStockcard(), autoSizeColumn:getWidthFgWhStockcard(), /*renderer: combinecolsupdate,*/ align: 'center' },
					// { text: 'ID Shipmenthold',	dataIndex: 'idshipmenthold',	componentCls : 'headergrid', flex:getFlexFgWhStockcard(), autoSizeColumn:getWidthFgWhStockcard(), /*renderer: upsize,*/ hidden: true }
			
				// { header: 'No.', xtype: 'rownumberer', width: 55, componentCls : 'headergrid', sortable: false },
				{ text: 'ID Shipmenthold',	dataIndex: 'idshipmenthold',componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontstyle },
				{ text: 'Status',			dataIndex: 'status',		componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontStatus, align: 'center' },
				{ text: 'Problem',			dataIndex: 'problem',		componentCls : 'headergrid', width:160, flex:false, autoSizeColumn:false, renderer: fontstyle },
				{ text: 'Start Sn',			dataIndex: 'startsn',		componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontstyle },
				{ text: 'End Sn',			dataIndex: 'endsn',			componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontstyle },
				{ text: 'Remark',			dataIndex: 'remark',		componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontstyle, hidden: true },
				{ header: 'Q.T.Y', 			componentCls : 'headergrid',  
				  columns: [
					{ header: 'Request', 	dataIndex: 'qtyrequest',	componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: numeric },
					{ header: 'on WH', 		dataIndex: 'qtywh',			componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: numeric },
					{ header: 'Ship Out', 	dataIndex: 'qtyshipout',	componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: numeric },
					{ header: 'on Hold', 	dataIndex: 'qtyhold',		componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: numeric },
				  ]
				},
				{ text: 'Lot No',			dataIndex: 'lotno',			componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontstyle },
				{ text: 'Created',		dataIndex: 'input_user',	componentCls : 'headergrid', width:150, flex:false, autoSizeColumn:false, renderer: combinecolsinput, align: 'center' },
				{ text: 'Last Update',	dataIndex: 'update_user',	componentCls : 'headergrid', width:150, flex:false, autoSizeColumn:false, renderer: combinecolsupdate, align: 'center' },
				{ text: 'Model',			dataIndex: 'model',			componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontstyle, hidden:true },
			
			],
			// listeners: {
				// 	render: {
				// 		fn: function(){
				// 			Ext.fly(clock.getEl().parent()).addCls('x-status-text-panel').createChild({cls:'spacer'});

				// 		 Ext.TaskManager.start({
				// 			 run: function(){
				// 				 Ext.fly(clock.getEl()).update(Ext.Date.format(new Date(), 'g:i:s A'));
				// 			 },
				// 			 interval: 1000
				// 		 });
				// 		},
				// 		delay: 100
				// 	}
				// },
				// tbar		: [
				// 	{
				// 		xtype	: 'button',
				// 		id		: 'btn_refresh',
				// 		margins	: '0 0 0 5', // top right bottom left
				// 		iconCls	: 'refresh',
				// 		text 	: 'Refresh',
				// 		tooltip	: 'Refresh',
				// 		handler : function (){
				// 			Ext.getCmp('valstdate').reset();
				// 			Ext.getCmp('valendate').reset();
				// 			Ext.getCmp('valstatus').reset();
				// 			Ext.getCmp('validshipmenthold').reset();
				// 			Ext.getCmp('valmodel').reset();
				// 			Ext.getCmp('valproblem').reset();
							
				// 			datastore.proxy.setExtraParam('valstdate', 			Ext.Date.format(new Date(date.getFullYear(), date.getMonth(), 1), 'Ymd'));
				// 			datastore.proxy.setExtraParam('valendate', 			Ext.Date.format(new Date(), 'Ymd'));
				// 			datastore.proxy.setExtraParam('valstatus', 			Ext.getCmp('valstatus').getValue());
				// 			datastore.proxy.setExtraParam('validshipmenthold', 	Ext.getCmp('validshipmenthold').getValue());
				// 			datastore.proxy.setExtraParam('valmodel', 			Ext.getCmp('valmodel').getValue());
				// 			datastore.proxy.setExtraParam('valproblem', 		Ext.getCmp('valproblem').getValue());
				// 			datastore.loadPage(1);
				// 		}
				// 	}, {
				// 		xtype	: 'button',
				// 		id		: 'btn_download',
				// 		iconCls	: 'download',
				// 		text 	: 'Download',
				// 		tooltip	: 'Download',
				// 		handler : function (){
				// 			var valstdate 			= Ext.Date.format(new Ext.getCmp('valstdate').getValue(), 'Ymd');
				// 			var valendate 			= Ext.Date.format(new Ext.getCmp('valendate').getValue(), 'Ymd');
				// 			var valstatus 			= Ext.getCmp('valstatus').getValue();
				// 			var validshipmenthold 	= Ext.getCmp('validshipmenthold').getValue();
				// 			var valmodel 			= Ext.getCmp('valmodel').getValue();
				// 			var valproblem 			= Ext.getCmp('valproblem').getValue();
				// 			window.open('resp/down_shipmenthold.php?valstdate='+valstdate+'&valendate='+valendate+'&valstatus='+valstatus+'&validshipmenthold='+validshipmenthold+'&valmodel='+valmodel+'&valproblem='+valproblem+'');
				// 		}
				// 	}, {
				// 		xtype	: 'button',
				// 		id		: 'btn_add',
				// 		iconCls	: 'add',
				// 		text 	: 'Add',
				// 		tooltip	: 'Add',
				// 		handler : function (){
				// 			window.open('index.php?content=shipmentholdadd');
				// 		}
				// 	}, {
				// 		xtype	: 'button',
				// 		id		: 'btn_addall',
				// 		iconCls	: 'add',
				// 		text 	: 'Add All Stock',
				// 		tooltip	: 'Add All Stock',
				// 		handler : function (){
				// 			window.open('index.php?content=shipmentholdaddall');
				// 		}
				// 	}, {
				// 		xtype	: 'button',
				// 		id		: 'btn_edit',
				// 		iconCls	: 'edit',
				// 		text 	: 'Edit',
				// 		tooltip	: 'Edit',
				// 		handler : function (){
				// 			var rec 		= griddata.getSelectionModel().getSelection();
				// 			var valid		= rec[0].data.idshipmenthold;
				// 			var valmodel 	= rec[0].data.model;
				// 			var vallotno 	= rec[0].data.lotno;
				// 			var valproblem 	= rec[0].data.problem;
				// 			var valstatus 	= rec[0].data.status;
				// 			var valstartsn	= rec[0].data.startsn;
				// 			var valendsn 	= rec[0].data.endsn;
				// 			window.open('index.php?content=shipmentholdedit?&idshipmenthold='+valid+'&model='+valmodel+'&lotno='+vallotno+'&problem='+valproblem+'&status='+valstatus+'&startsn='+valstartsn+'&endsn='+valendsn+'');
				// 		}
				// 	}, {
				// 		xtype	: 'button',
				// 		id		: 'btn_delete',
				// 		iconCls	: 'delete',
				// 		text 	: 'Delete',
				// 		tooltip	: 'Delete',
				// 		handler : function (){
				// 			Ext.Msg.confirm('Delete data', 'Are you sure delete this data ?', function(btn){
				// 				if (btn == 'yes'){
				// 					var rec 		= griddata.getSelectionModel().getSelection();
				// 					var reclength 	= rec.length;
				// 					var i 			= 0;
				// 					for (var i=0; i < reclength; i++) {
				// 						var validshipmenthold 	= rec[i].data.idshipmenthold;
				// 						var valqtyhold	 		= rec[i].data.qtyhold;
				// 						var box 		= Ext.Msg.wait('sending data');
				// 						Ext.Ajax.request({
				// 							url		: 'resp/resp_shipmenthold.php',
				// 							method	: 'POST',
				// 							params	: 'idshipmenthold='+validshipmenthold+'&qtyhold='+valqtyhold+'&typeform=del',
				// 							success	: function(response, opts) {
				// 								var obj = Ext.decode(response.responseText);
				// 								var r 	= obj.msg;
				// 								var msg = r.split(",");
				// 								if (obj.success == true) {
				// 									box.hide();
				// 									datastore.load();
				// 								}else{
				// 									Ext.Msg.show({
				// 										title		:'Delete data',
				// 										icon		: Ext.Msg.ERROR,
				// 										msg			: msg[1],
				// 										buttons		: Ext.Msg.OK
				// 									});
				// 								}
				// 							}
				// 						});
				// 					}
				// 				}
				// 			});
				// 		}
				// 	}, 
				// 	'->',
				// 	{
				// 		xtype		: 'label',
				// 		text		: Ext.Date.format(new Date(), 'l, d F Y'),
				// 		margins		: '20 5 0 0',
				// 		style		: 'font-size: 8pt'
				// 	}, 
				// 	'-',
				// 	clock
				// ],
			bbar		: Ext.create('Ext.PagingToolbar', {
				pageSize	: 5,
				store		: storeShipmentHold,
				displayInfo	: true,
				listeners 	: {
					afterrender: function (cmp) {
						cmp.getComponent("refresh").hide();
						cmp.getComponent("first").hide();
						cmp.getComponent("last").hide();
					}
				}
			})
		});
		var gridBorrow	= Ext.create('Ext.grid.Panel', {
			id 			: 'gridBorrow',
			renderTo	: 'wh_borrow',
			// title		: 'Data Borrow and Return',
			store		: storeBorrow,
			// height		: valheight,
			border 		: false,
			columnLines	: true,
			multiSelect	: true,
			height 		: 300,
			autoWidth	: '100%',
			// selModel	: sm,
			viewConfig	: {
				stripeRows			: true,
				emptyText 			: '<div class="empty-txt-main">Select Finishgood table for show this data.</div>',
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
			columns: [
				// { header: 'No.', xtype: 'rownumberer', width: 50, height: 40, sortable: false },
				{ text: 'ID Number',	dataIndex: 'idnumber',		componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontStatus },
				{ text: 'Model',		dataIndex: 'model',			componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: combinemodelserial },
				{ text: 'Status',		dataIndex: 'status',		componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontStatus, align: 'center' },
				{ text: 'Department',	dataIndex: 'dept',			componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontstyle },
				{ text: 'scanbarcode',	dataIndex: 'scanbarcode',	componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontstyle, hidden:true  },
				{ text: 'Created',		dataIndex: 'input_user',	componentCls : 'headergrid', width:150, flex:false, autoSizeColumn:false, renderer: combinecolsinput, align: 'center' },
				{ text: 'Last Update',	dataIndex: 'update_user',	componentCls : 'headergrid', width:150, flex:false, autoSizeColumn:false, renderer: combinecolsupdate, align: 'center' }
			],
			// listeners: {
				// 	render: {
				// 		fn: function(){
				// 			Ext.fly(clock.getEl().parent()).addCls('x-status-text-panel').createChild({cls:'spacer'});

				// 		 Ext.TaskManager.start({
				// 			 run: function(){
				// 				 Ext.fly(clock.getEl()).update(Ext.Date.format(new Date(), 'g:i:s A'));
				// 			 },
				// 			 interval: 1000
				// 		 });
				// 		},
				// 		delay: 100
				// 	}
				// },
				// tbar		: [
				// 	{
				// 		xtype	: 'button',
				// 		id		: 'btn_refresh',
				// 		margins	: '0 0 0 5', // top right bottom left
				// 		iconCls	: 'refresh',
				// 		text 	: 'Refresh',
				// 		tooltip	: 'Refresh',
				// 		handler : function (){
				// 			Ext.getCmp('valdept').reset();
				// 			Ext.getCmp('valmodel').reset();
				// 			Ext.getCmp('valserial').reset();
							
				// 			datastore.proxy.setExtraParam('valdept', 	'');
				// 			datastore.proxy.setExtraParam('valmodel', 	'');
				// 			datastore.proxy.setExtraParam('valserial', 	'');
				// 			datastore.loadPage(1);
				// 		}
				// 	}, {
				// 		xtype	: 'button',
				// 		id		: 'btn_download',
				// 		iconCls	: 'download',
				// 		text 	: 'Download',
				// 		tooltip	: 'Download',
				// 		handler : function (){
				// 			var valdept 	= Ext.getCmp('valdept').getValue();
				// 			var valmodel 	= Ext.getCmp('valmodel').getValue();
				// 			var valserial 	= Ext.getCmp('valserial').getValue();
				// 			window.open('resp/down_borturn.php?valdept='+valdept+'&valmodel='+valmodel+'&valserial='+valserial+'');
				// 		}
				// 	}, 
				// 	'->',
				// 	{
				// 		xtype		: 'label',
				// 		text		: Ext.Date.format(new Date(), 'l, d F Y'),
				// 		margins		: '20 5 0 0',
				// 		style		: 'font-size: 8pt'
				// 	}, 
				// 	'-',
				// 	clock
				// ],
			bbar		: Ext.create('Ext.PagingToolbar', {
				pageSize	: itemperpage,
				store		: storeBorrow,
				displayInfo	: true,
				listeners 	: {
					afterrender: function (cmp) {
						cmp.getComponent("refresh").hide();
						cmp.getComponent("first").hide();
						cmp.getComponent("last").hide();
					}
				}
			})
		});
		var gridScanin	= Ext.create('Ext.grid.Panel', {
			id 			: 'gridScanin',
			renderTo	: 'wh_scanin',
			// title		: 'Data Scan In',
			store		: storeScanIN,
			// height		: valheight,
			border 		: false,
			columnLines	: true,
			multiSelect	: true,
			height 		: 300,
			autoWidth	: '100%',
			// selModel	: sm,
			viewConfig	: {
				stripeRows			: true,
				emptyText 			: '<div class="empty-txt-main">Select Finishgood table for show this data.</div>',
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
			columns: [
				// { header: 'No.', xtype: 'rownumberer', width: 50, height: 40, sortable: false },
				{ text: 'Model',		dataIndex: 'model',			 componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: combinemodelserial },
				{ text: 'ID Number',	dataIndex: 'idnumber',		 componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontStatus },
				{ text: 'Status',		dataIndex: 'status',		 componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontStatus, align: 'center' },
				{ text: 'Lot Number',	dataIndex: 'lotno',			 componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontstyle, hidden:true },
				{ text: 'Created',		dataIndex: 'input_user',	 componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: combinecolsinput, align: 'center' },
				{ text: 'Last Update',	dataIndex: 'update_user',	 componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: combinecolsupdate, align: 'center' }
			],
			// listeners: {
				// 	render: {
				// 		fn: function(){
				// 			Ext.fly(clock.getEl().parent()).addCls('x-status-text-panel').createChild({cls:'spacer'});

				// 		 Ext.TaskManager.start({
				// 			 run: function(){
				// 				 Ext.fly(clock.getEl()).update(Ext.Date.format(new Date(), 'g:i:s A'));
				// 			 },
				// 			 interval: 1000
				// 		 });
				// 		},
				// 		delay: 100
				// 	}
				// },
				// tbar		: [
				// 	{
				// 		xtype	: 'button',
				// 		id		: 'btn_refresh',
				// 		margins	: '0 0 0 5', // top right bottom left
				// 		iconCls	: 'refresh',
				// 		text 	: 'Refresh',
				// 		tooltip	: 'Refresh',
				// 		handler : function (){
				// 			Ext.getCmp('validnumber').reset();
				// 			Ext.getCmp('valmodel').reset();
				// 			Ext.getCmp('valserial').reset();
				// 			Ext.getCmp('valstatus').reset();
							
				// 			datastore.proxy.setExtraParam('validnumber', 	'');
				// 			datastore.proxy.setExtraParam('valmodel', 	'');
				// 			datastore.proxy.setExtraParam('valserial', 	'');
				// 			datastore.proxy.setExtraParam('valstatus', 	'');
				// 			datastore.loadPage(1);
				// 		}
				// 	}, {
				// 		xtype	: 'button',
				// 		id		: 'btn_download',
				// 		iconCls	: 'download',
				// 		text 	: 'Download',
				// 		tooltip	: 'Download',
				// 		handler : function (){
				// 			var validnumber = Ext.getCmp('validnumber').getValue();
				// 			var valmodel 	= Ext.getCmp('valmodel').getValue();
				// 			var valserial 	= Ext.getCmp('valserial').getValue();
				// 			var valstatus 	= Ext.getCmp('valstatus').getValue();
				// 			window.open('resp/down_scanin.php?validnumber='+validnumber+'&valmodel='+valmodel+'&valserial='+valserial+'&valstatus='+valstatus+'');
				// 		}
				// 	}, 
				// 	'->',
				// 	{
				// 		xtype		: 'label',
				// 		text		: Ext.Date.format(new Date(), 'l, d F Y'),
				// 		margins		: '20 5 0 0',
				// 		style		: 'font-size: 8pt'
				// 	}, 
				// 	'-',
				// 	clock
				// ],
			bbar		: Ext.create('Ext.PagingToolbar', {
				pageSize	: itemperpage,
				store		: storeScanIN,
				displayInfo	: true,
				// plugins		: Ext.create('Ext.ux.ProgressBarPager', {}),
				listeners	: {
					afterrender: function(cmp) {
						cmp.getComponent("refresh").hide();
						cmp.getComponent("first").hide();
						cmp.getComponent("last").hide();
					}
				}
			})
		});
		var gridScanout	= Ext.create('Ext.grid.Panel', {
			id 			: 'gridScanout',
			renderTo	: 'wh_scanout',
			// title		: 'Data Scan Out',
			store		: storeScanOUT,
			// height		: valheight,
			border 		: false,
			columnLines	: true,
			multiSelect	: true,
			height 		: 300,
			autoWidth	: '100%',
			// selModel	: sm,
			viewConfig	: {
				stripeRows			: true,
				emptyText 			: '<div class="empty-txt-main">Select Finishgood table for show this data.</div>',
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
			columns: [
				// { header: 'No.', xtype: 'rownumberer', width: 50, height: 40, sortable: false },
				{ text: 'Model',		dataIndex: 'model',			componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: combinemodelserial },
				{ text: 'Status',	 	dataIndex: 'shipout',		componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontStatus },
				{ text: 'Cont. Number',	dataIndex: 'contno',		componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontstyle },
				{ text: 'Vanning ID',	dataIndex: 'vanningid',		componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontstyle },
				{ text: 'ID Number',	dataIndex: 'idnumber',		componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontstyle },
				// { text: 'Lot Number',	dataIndex: 'lotno',			componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontstyle },
				{ text: 'Dest.',		dataIndex: 'dest',			componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontstyle },
				{ text: 'Created',		dataIndex: 'input_user',	componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: combinecolsinput, align: 'center' },
				{ text: 'Last Update',	dataIndex: 'update_user',	componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: combinecolsupdate, align: 'center' }
			],
			// listeners: {
			// 	render: {
			// 		fn: function(){
			// 			Ext.fly(clock.getEl().parent()).addCls('x-status-text-panel').createChild({cls:'spacer'});

			// 		 Ext.TaskManager.start({
			// 			 run: function(){
			// 				 Ext.fly(clock.getEl()).update(Ext.Date.format(new Date(), 'g:i:s A'));
			// 			 },
			// 			 interval: 1000
			// 		 });
			// 		},
			// 		delay: 100
			// 	}
			// },
			// tbar		: [
			// 	{
			// 		xtype	: 'button',
			// 		id		: 'btn_refresh',
			// 		margins	: '0 0 0 5', // top right bottom left
			// 		iconCls	: 'refresh',
			// 		text 	: 'Refresh',
			// 		tooltip	: 'Refresh',
			// 		handler : function (){
			// 			Ext.getCmp('valcontno').reset();
			// 			Ext.getCmp('validnumber').reset();
			// 			Ext.getCmp('valmodel').reset();
			// 			Ext.getCmp('valserial').reset();
			// 			Ext.getCmp('valdest').reset();
						
			// 			datastore.proxy.setExtraParam('valcontno', 	'');
			// 			datastore.proxy.setExtraParam('validnumber', 	'');
			// 			datastore.proxy.setExtraParam('valmodel', 	'');
			// 			datastore.proxy.setExtraParam('valserial', 	'');
			// 			datastore.proxy.setExtraParam('valdest', 	'');
			// 			datastore.loadPage(1);
			// 		}
			// 	}, {
			// 		xtype	: 'button',
			// 		id		: 'btn_preview',
			// 		iconCls	: 'preview',
			// 		text 	: 'Preview Serial',
			// 		tooltip	: 'Preview Serial',
			// 		handler : function (){
			// 			var rec 			= griddata.getSelectionModel().getSelection();
			// 			var valcontno		= rec[0].data.contno;
			// 			var valvanningid	= rec[0].data.vanningid;
			// 			var valmodel 		= rec[0].data.model;
			// 			var valdest 		= rec[0].data.dest;
			// 			window.open('resp/printprvw_scanout.php?valcontno='+valcontno+'&valvanningid='+valvanningid+'&valmodel='+valmodel+'&valdest='+valdest+'');
			// 		}
			// 	}, {
			// 		xtype	: 'button',
			// 		id		: 'btn_download',
			// 		iconCls	: 'download',
			// 		text 	: 'Download',
			// 		tooltip	: 'Download',
			// 		handler : function (){
			// 			var valcontno	= Ext.getCmp('valcontno').getValue();
			// 			var validnumber = Ext.getCmp('validnumber').getValue();
			// 			var valmodel 	= Ext.getCmp('valmodel').getValue();
			// 			var valserial 	= Ext.getCmp('valserial').getValue();
			// 			var valdest		= Ext.getCmp('valdest').getValue();
			// 			window.open('resp/down_scanout.php?valcontno='+valcontno+'&validnumber='+validnumber+'&valmodel='+valmodel+'&valserial='+valserial+'&valdest='+valdest+'');
			// 		}
			// 	}, 
			// 	'->',
			// 	{
			// 		xtype		: 'label',
			// 		text		: Ext.Date.format(new Date(), 'l, d F Y'),
			// 		margins		: '20 5 0 0',
			// 		style		: 'font-size: 8pt'
			// 	}, 
			// 	'-',
			// 	clock
			// ],
			bbar		: Ext.create('Ext.PagingToolbar', {
				pageSize	: itemperpage,
				store		: storeScanOUT,
				displayInfo	: true,
				// plugins		: Ext.create('Ext.ux.ProgressBarPager', {}),
				listeners	: {
					afterrender: function(cmp) {
						cmp.getComponent("refresh").hide();
						cmp.getComponent("first").hide();
						cmp.getComponent("last").hide();
					}
				}
			})
		});

		gridStockcard.getStore().on('load', function() {
	        gridStockcard.getView().stripeRows 			= true;
			gridStockcard.getView().deferEmptyText 		= false;
			gridStockcard.getView().enableTextSelection	= true;
	        gridStockcard.getView().emptyText = '<div class="empty-txt2">Data Not Available.</div>';
	        gridStockcard.getView().refresh();
	    });
	    gridShipmentHold.getStore().on('load', function() {
	        gridShipmentHold.getView().stripeRows 			= true;
			gridShipmentHold.getView().deferEmptyText 		= false;
			gridShipmentHold.getView().enableTextSelection	= true;
	        gridShipmentHold.getView().emptyText = '<div class="empty-txt2">Data Not Available.</div>';
	        gridShipmentHold.getView().refresh();
	    });
	    gridBorrow.getStore().on('load', function() {
	        gridBorrow.getView().stripeRows 			= true;
			gridBorrow.getView().deferEmptyText 		= false;
			gridBorrow.getView().enableTextSelection	= true;
	        gridBorrow.getView().emptyText = '<div class="empty-txt2">Data Not Available.</div>';
	        gridBorrow.getView().refresh();
	    });
	    gridScanin.getStore().on('load', function() {
	        gridScanin.getView().stripeRows 			= true;
			gridScanin.getView().deferEmptyText 		= false;
			gridScanin.getView().enableTextSelection	= true;
	        gridScanin.getView().emptyText = '<div class="empty-txt2">Data Not Available.</div>';
	        gridScanin.getView().refresh();
	    });
	    gridScanout.getStore().on('load', function() {
	        gridScanout.getView().stripeRows 			= true;
			gridScanout.getView().deferEmptyText 		= false;
			gridScanout.getView().enableTextSelection	= true;
	        gridScanout.getView().emptyText = '<div class="empty-txt2">Data Not Available.</div>';
	        gridScanout.getView().refresh();
	    });
	//	=======================================================	TAB PANEL    	=====================================
		// var panel_warehouse = Ext.create('Ext.tab.Panel', {
		// 	id 			: 'panel_warehouse',
		// 	renderTo 	: 'warehouse',
		// 	activeTab 	: 0,
		// 	plain		: true,
		// 	frame 		: true,
		// 	minHeight 	: 300, 	
		// 	maxHeight   : 480,
		// 	tabBar		: {
		// 		flex	: 1,
		// 		layout	: {
		// 			pack	: 'center',
		// 			align	: 'stretch'
		// 		}
		// 	},
		// 	items 		: [
		// 		{	title 		: 'OQC Stockcard',
		// 		 	id  		: 'show_oqc_stockcard',
		// 			reorderable : false,
		// 			layout		: 'fit',
		// 			items 		: [gridStockard]
		// 		},
		// 		{	title 		: 'QA Shipment Hold',
		// 		 	id  		: 'show_qa_shipmenthold',
		// 			reorderable : false,
		// 			layout		: 'fit',
		// 			items 		: [gridShipmentHold]
		// 		}, 
				
		// 	]
		// });
});