Ext.onReady(function() {

	//	=======================================================	MODEL 		=====================================
		Ext.define('model_smt_spi',{
            extend: 'Ext.data.Model',
			fields: ['mchname','inspectiondatetime','inspectiondate','inspectiontime','filename',
					'pcbid','barcode','spijudge','opjudge','defectcnt']
       	});
			
	//	=======================================================	DATASTORE 	=====================================
		var store_smt_spi = Ext.create('Ext.data.Store',{
			storeId : 'store_smt_spi',
			model	: 'model_smt_spi',
			autoLoad: false,
			pageSize: itemperpage,
			proxy   : {
				type    : 'ajax',
				url     : 'json/finishgood_smt/json_good_smt_spi.php',
				reader  : {
					type    : 'json',
					root    : 'rows',
					totalProperty: 'totalCount'
				}
			},
			// listeners : {
			// 	load : function(store, records){
			// 		if (records != 0) {
			// 			boardid = document.getElementById('pcbserial').value;
			// 			spidate = store.getAt(0).get('inspectiondate');

			// 			Ext.getStore('store_smt_reflow').proxy.setExtraParam('boardid', boardid);
			// 			Ext.getStore('store_smt_reflow').proxy.setExtraParam('smt_date', spidate);
			// 			Ext.getStore('store_smt_reflow').loadPage(1);								
			// 		}
			// 	} 
			// }
		});
			
	//	=======================================================	GRID 		=====================================
		var grid_smt_spi = Ext.create('Ext.grid.Panel', {
			id 				: 'grid_smt_spi',
			autoWidth 		: '100%',
			maxHeight		: 290,
			minHeight 		: 150,
			columnLines 	: true,
			store 			: store_smt_spi,
			viewConfig 		: {
				stripeRows 			: true,
				emptyText 	 		: '<div class="empty-txt">Select Board ID Generator for this result.</div>',
				deferEmptyText 		: false,
				enableTextSelection	: true
			},
			columns 	: [
				{	header 		: 'BARCODE',
					dataIndex 	: 'barcode',
					flex 		: 1,
					renderer	: upsize,
					hidden 		: true
				},
				{	header 		: 'INSP DATE',
					dataIndex 	: 'inspectiondatetime',
					componentCls: 'headergrid',
					flex 		: 1,
					renderer	: upsize
				},
				{	header 		: 'MCH NAME',
					dataIndex 	: 'mchname',
					componentCls: 'headergrid',
					flex 		: 1,
					renderer	: upsize
				},
				{	header 		: 'inspectiondate',
					dataIndex 	: 'inspectiondate',
					flex 		: 1,
					renderer	: upsize,
					hidden 		: true
				},
				{	header 		: 'inspectiontime',
					dataIndex 	: 'inspectiontime',
					flex 		: 1,
					renderer	: upsize,
					hidden 		: true
				},
				{	header 		: 'FILE NAME',
					dataIndex 	: 'filename',
					flex 		: 1,
					renderer	: upsize,
					hidden 		: true
				},
				{	header 		: 'PCB ID',
					dataIndex 	: 'pcbid',
					width 		: 70,
					renderer	: upsize,
					hidden 		: true
				},
				{	header 		: 'MCH JUDGE',
					dataIndex 	: 'spijudge',
					componentCls: 'headergrid',
					flex 		: 1,
					renderer	: spimchjudge
				},
				{	header 		: 'OP JUDGE',
					dataIndex 	: 'opjudge',
					componentCls: 'headergrid',
					flex 		: 1,
					renderer	: spiopjudge
				},
				{	header 		: 'DEFECT CNT',
					dataIndex 	: 'defectcnt',
					componentCls: 'headergrid',
					flex 		: 1,
					renderer	: upsize
				}
			],
			listeners: {
	    		select: function(grid, rowIndex, colIndex) {
	    			var rec 		= this.getSelectionModel().getSelection();
	    			var spidate 	= store_smt_spi.getAt(0).get('inspectiondate');
	    			var boardid 	= document.getElementById('pcbserial').value;

	    			Ext.getStore('store_smt_reflow').proxy.setExtraParam('boardid', boardid);
					Ext.getStore('store_smt_reflow').proxy.setExtraParam('smt_date', spidate);
					Ext.getStore('store_smt_reflow').loadPage(1);	
					Ext.getStore('store_smt_mounter_header').proxy.setExtraParam('boardid', boardid);
					Ext.getStore('store_smt_mounter_header').loadPage(1);
	    		}
	    	},
			bbar	: Ext.create('Ext.PagingToolbar', {
				pageSize		: itemperpage,
				store			: store_smt_spi,
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
		
		grid_smt_spi.getStore().on('load', function() {
            grid_smt_spi.getView().stripeRows 			= true;
			grid_smt_spi.getView().deferEmptyText 		= false;
			grid_smt_spi.getView().enableTextSelection	= true;
            grid_smt_spi.getView().emptyText = '<div class="empty-txt2">Data Not Available.</div>';
            grid_smt_spi.getView().refresh();
        });

	//	=======================================================	PANEL	=====================================
		var panel_spi = Ext.create('Ext.panel.Panel', {
			id 				: 'panel_spi',
			renderTo 		: 'panel_spi',
			maxHeight		: 400,
			minHeight 		: 150,
			items			: [grid_smt_spi]
		});
			
});