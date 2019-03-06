Ext.onReady(function() {
	var itemperpage = 25;
	//	=======================================================    MODEL        =====================================
		Ext.define('modelMcPartInspection', {
			extend: 'Ext.data.Model',
			fields: ['deliv_date', 'partno_slip', 'supplier', 'pic', 'qty_sampling', 'qty_rejection', 'po_slip', 
			'qty_delivery', 'lot_out', 'time_finish', 'fld_remark', 'date_input']
		});
	//	=======================================================    DATASTORE    =====================================
		var storeMcPartInspection = Ext.create('Ext.data.Store', {
			storeId	: 'storeMcPartInspection',
			model 	: 'modelMcPartInspection',
			autoLoad: false,
			pageSize: itemperpage,
			proxy 	: {
				type   : 'ajax',
				url    : 'json/finishgood_ma/json_mcInspection.php',
				reader : {
					type 		 : 'json',
					root		 : 'rows',
					totalProperty: 'totalCount'
				}
			}
		});
	//	=======================================================    GRID         =====================================
		var grid_mcPartInspection = Ext.create('Ext.grid.Panel', {
			id			: 'grid_mcPartInspection',
			renderTo	: 'mc_insp',
			autoWidth 	: '100%',
			//height 	: '100%',
			maxHeight	: 295,
			columnLines	: true,
			store		: storeMcPartInspection,
			viewConfig	: {
				stripeRows			: true,
				emptyText			: '<div class="empty-txt">No data to display.</div>',
				deferEmptyText		: false,
				enableTextSelection	: true
			},
			columns			: [
				{ header: 'Delivery', 		dataIndex: 'deliv_date', 	componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontstyle },
				{ header: 'Time Finish', 	dataIndex: 'time_finish', 	componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontstyle },
				{ header: 'Part Number', 	dataIndex: 'partno', 		componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontstyle,
					filter: {
						type: 'string',
						dataIndex: 'partno'
					}
				},
				{ header: 'Supplier', 		dataIndex: 'supplier', 		componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontstyle },
				{ header: 'PIC', 			dataIndex: 'pic', 			componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontstyle },
				{ header: 'Sampling', 		dataIndex: 'qty_sampling', 	componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontstyle },
				{ header: 'Rejection', 		dataIndex: 'qty_rejection', componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontstyle },
				{ header: 'PO', 			dataIndex: 'po', 			componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontstyle },
				{ header: 'Qty Delivery', 	dataIndex: 'qty_delivery', 	componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontstyle },
				{ header: 'Lot Out', 		dataIndex: 'lot_out', 		componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontstyle },
				{ header: 'Remark', 		dataIndex: 'fld_remark', 	componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontstyle },
				{ header: 'Input Date',		dataIndex: 'date_input', 	componentCls : 'headergrid', flex:false, autoSizeColumn:true, renderer: fontstyle }
			],
			bbar	: Ext.create('Ext.PagingToolbar', {
				pageSize		: itemperpage,
				store			: storeMcPartInspection,
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
					afterrender: function (cmp) {
						cmp.getComponent("refresh").hide();
					}
				}
			})
		});
		grid_mcPartInspection.getStore().on('load', function() {
	        grid_mcPartInspection.getView().stripeRows 			= true;
			grid_mcPartInspection.getView().deferEmptyText 		= false;
			grid_mcPartInspection.getView().enableTextSelection	= true;
	        grid_mcPartInspection.getView().emptyText = '<div class="empty-txt-main">Data Not Available.</div>';
	        grid_mcPartInspection.getView().refresh();
	    });
    //	=======================================================	 GRID DETAIL 	=====================================
	
});