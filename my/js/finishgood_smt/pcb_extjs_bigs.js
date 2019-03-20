Ext.onReady(function() {

//	=======================================================    MODEL        =====================================
	Ext.define('model_bigs', {
		extend: 'Ext.data.Model',
		fields: [ 'side', 'start_code', 'end_code', 'cavity', 'line', 'model', 'pwbname','pwbno', 'process', 'qty', 'ynumber', 'start_serial']
	});
//	=======================================================    DATASTORE    =====================================
	var store_bigs = Ext.create('Ext.data.Store', {
		storeId		: 'store_bigs',
		model 		: 'model_bigs',
		pageSize 	: itemperpage,
		proxy 		: {
			type 	: 'ajax',
			url 	: 'json/finishgood_smt/json_finishgood_smt_bigs.php',
			reader 	: {
				type 			: 'json',
				root 			: 'rows',
				totalProperty 	: 'totalCount',
				messageProperty : 'msgError'
			},
			load 	: false
		},
		listeners: {
			load: function(store, records, success) {
				if (records.length == 0) {
					Ext.Msg.alert('Warning [ WPSB001 ]', 'No Data Found ! <br><br> Please try again with the correct PCB Serial.');
				}
				else if (success = false){
					try{
						//Ext.Msg.alert('Error', operation.getError());
						Ext.Msg.alert('Error [ EPSB001 ]', 'Please Call IT with inform "Filter BIGS PCB Serial Error"');
					}catch(e){
		                Ext.Msg.alert('Error [ EPSB002 ]', 'Please Call IT with inform "Filter BIGS PCB Serial Error"');
		            }
				}
			}
		}
	});
	// store_bigs.load({
	//     callback: function(records, operation, success) {
	//         if(success == true){
	//             if(records.length == 0){
	//             	Ext.Msg.alert('Result', 'BIGS - No Available Data');
	//             }
	//         }
	//         if(success == false){
	//             try{
	//                 //Ext.Msg.alert('Error', operation.getError()); // way more elegant than ussing rawData etc ...
	//                 Ext.Msg.alert('Error', 'Please Call IT with inform "Filter BIGS PCB Serial Error"');
	//             }catch(e){
	//                 Ext.Msg.alert('Error', 'Please Call IT with inform "Filter BIGS PCB Serial Error"');
	//             }
	//         }
	//     }
	// });
//	=======================================================    GRID         =====================================
	var grid_bigs = Ext.create('Ext.grid.Panel', {
		id 			: 'grid_bigs',
		renderTo 	: 'panel_bigs',
		columnLines	: true,
		maxHeight 	: 300,
		minHeight 	: 150,
		store 		: store_bigs,
		viewConfig	: {
			stripeRows 			: true,
			emptyText 			: '<div class="empty-txt">Click Go! / Clik Enter on Search PCB Serial</div>',
			deferEmptyText 		: false,
			enableTextSelection : true,
			listeners : {
				refresh : function (dataview) {
					Ext.each(dataview.panel.columns, function (column) {
						if (column.autoSizeColumn === true)
						column.autoSize();
					})
				}
		    }
		},
		columns 	: [
			{	header 	 		: 'schedule_id',
				dataIndex 		: 'schedule_id',
				flex 			: getFlexPCBSerialBigs(),
				autoSizeColumn 	: getWidthPCBSerialBigs(),
				renderer 		: upsize,
				hidden	 		: true}, 	
			{	header 	 		: 'lot_size',
				dataIndex 		: 'lot_size',
				flex 			: getFlexPCBSerialBigs(),
				autoSizeColumn 	: getWidthPCBSerialBigs(),
				renderer 		: upsize,
				hidden	 		: true}, 
			{	header 	 		: 'model_code',
				dataIndex 		: 'model_code',
				flex 			: getFlexPCBSerialBigs(),
				autoSizeColumn 	: getWidthPCBSerialBigs(),
				renderer 		: upsize,
				hidden	 		: true},
			{ 	header 	  		: 'prod_no_code',
				dataIndex 		: 'prod_no_code',
				flex 			: getFlexPCBSerialBigs(),
				autoSizeColumn 	: getWidthPCBSerialBigs(),
				renderer 		: upsize,
				hidden	 		: true},
			{ 	header 	  		: 'rev_date',
				dataIndex 		: 'rev_date',
				renderer  		: upsize,
				hidden	  		: true}, 
			{ 	header 	 		: 'YNUMBER',
				dataIndex		: 'ynumber',
				componentCls	: 'headergrid',
				flex 			: false,
				autoSizeColumn 	: true,
				renderer 		: upsize}, 
			{ 	header 	 		: 'SIDE',
				dataIndex		: 'side',
				componentCls 	: 'headergrid',
				flex 			: getFlexPCBSerialBigs(),
				autoSizeColumn 	: getWidthPCBSerialBigs(),
				renderer  		: upsize},
			{ 	header 	 		: 'CAVITY',
				dataIndex 		: 'cavity',
				componentCls 	: 'headergrid',
				flex 			: getFlexPCBSerialBigs(),
				autoSizeColumn 	: getWidthPCBSerialBigs(),
				renderer 		: upsize}, 
			{ 	header 	 		: 'LINE',
				dataIndex 		: 'line',
				componentCls 	: 'headergrid',
				flex 			: getFlexPCBSerialBigs(),
				autoSizeColumn 	: getWidthPCBSerialBigs(),
				renderer 		: upsize}, 
			{ 	header 	 		: 'MODEL',
				dataIndex 		: 'model',
				componentCls 	: 'headergrid',
				flex 			: false,
				autoSizeColumn 	: true,
				renderer 		: upsize}, 
			{ 	header 	  		: 'PWB NAME',
				dataIndex 		: 'pwbname',
				componentCls 	: 'headergrid',
				flex 			: getFlexPCBSerialBigs(),
				autoSizeColumn 	: getWidthPCBSerialBigs(),
				renderer 		: upsize}, 
			{ 	header 	  		: 'PROD NO',
				dataIndex 		: 'prod_no',
				componentCls 	: 'headergrid',
				flex 			: getFlexPCBSerialBigs(),
				autoSizeColumn 	: getWidthPCBSerialBigs(),
				renderer  		: upsize}, 
			{ 	header 	  		: 'PROCESS',
				dataIndex 		: 'process',
				componentCls 	: 'headergrid',
				flex 			: false,
				autoSizeColumn 	: true,
				renderer 		: upsize}, 
			{ 	header 	  		: 'QUANTITY',
				dataIndex 		: 'qty',
				flex 			: false,
				autoSizeColumn 	: true,
				componentCls 	: 'headergrid',
				renderer 		: upsize}
		],
		listeners: {
			// render : {
			// 	fn: getColumnWidth(text){
			//         let columnWidth = (text.length * 7) + 35  // giving 7 pixles for each letter in the text
			//         //Optional This part is used to set a maximum column width in case there is too many charachter in the text
			//         if(columnWidth>400){
			//             columnWidth = 400
			//         }
			//         return columnWidth;
			//     }
			// }

    		select: function(grid, rowIndex, colIndex) {
    			var rec 		= this.getSelectionModel().getSelection();
    			var totCavity 	= rec[0].data.cavity;
    			var srcModel	= rec[0].data.model;
    			var srcPwbname  = rec[0].data.pwbname;
    			var side  		= rec[0].data.side;
				
    			var boardid 	= document.getElementById('pcbserial').value;
    			var splits 		= boardid.split('/');
				var model 		= splits[0];
				var lotno 		= splits[1];
				var pwbname 	= splits[2];

				document.getElementById('spiSide').value = '';
				document.getElementById('spiSide').value = side;
				if (typeof lotno === 'undefined'){

					Ext.getStore('store_smt_repair').proxy.setExtraParam('src_boardid', boardid);
					Ext.getStore('store_smt_repair').proxy.setExtraParam('model', '');
					Ext.getStore('store_smt_repair').proxy.setExtraParam('lotno', '');
					Ext.getStore('store_smt_repair').proxy.setExtraParam('pwbname', '');
					Ext.getStore('store_smt_repair').proxy.setExtraParam('side', '');
					Ext.getStore('store_smt_repair').loadPage(1);
					Ext.getStore('store_smt_spi').proxy.setExtraParam('boardid', boardid);
					Ext.getStore('store_smt_spi').proxy.setExtraParam('model', '');
					Ext.getStore('store_smt_spi').proxy.setExtraParam('lotno', '');
					Ext.getStore('store_smt_spi').proxy.setExtraParam('pwbname', '');
					Ext.getStore('store_smt_spi').proxy.setExtraParam('side', '');
					Ext.getStore('store_smt_spi').loadPage(1);
					Ext.getStore('store_mapros_board').proxy.setExtraParam('cavity', totCavity);
					Ext.getStore('store_mapros_board').proxy.setExtraParam('model', srcModel);
					Ext.getStore('store_mapros_board').proxy.setExtraParam('pwbname', srcPwbname);
					Ext.getStore('store_mapros_board').proxy.setExtraParam('lotno', '');
					Ext.getStore('store_mapros_board').proxy.setExtraParam('side', '');
				}
				else{
					Ext.getStore('store_smt_repair').proxy.setExtraParam('src_boardid', '');
					Ext.getStore('store_smt_repair').proxy.setExtraParam('model', model);
					Ext.getStore('store_smt_repair').proxy.setExtraParam('lotno', lotno);
					Ext.getStore('store_smt_repair').proxy.setExtraParam('pwbname', pwbname);
					Ext.getStore('store_smt_repair').proxy.setExtraParam('side', side);
					Ext.getStore('store_smt_repair').loadPage(1);
					Ext.getStore('store_smt_spi').proxy.setExtraParam('boardid', '');
					Ext.getStore('store_smt_spi').proxy.setExtraParam('model', model);
					Ext.getStore('store_smt_spi').proxy.setExtraParam('lotno', lotno);
					Ext.getStore('store_smt_spi').proxy.setExtraParam('pwbname', pwbname);
					Ext.getStore('store_smt_spi').proxy.setExtraParam('side', side);
					Ext.getStore('store_smt_spi').loadPage(1);
					Ext.getStore('store_good_smt_aoi_board').proxy.setExtraParam('boardid', '');
					Ext.getStore('store_good_smt_aoi_board').proxy.setExtraParam('model', model);
					Ext.getStore('store_good_smt_aoi_board').proxy.setExtraParam('lotno', lotno);
					Ext.getStore('store_good_smt_aoi_board').proxy.setExtraParam('pwbname', pwbname);
					Ext.getStore('store_good_smt_aoi_board').proxy.setExtraParam('side', side);
					Ext.getStore('store_good_smt_aoi_point').proxy.setExtraParam('boardid', '');
					Ext.getStore('store_good_smt_aoi_point').proxy.setExtraParam('model', model);
					Ext.getStore('store_good_smt_aoi_point').proxy.setExtraParam('lotno', lotno);
					Ext.getStore('store_good_smt_aoi_point').proxy.setExtraParam('pwbname', pwbname);
					Ext.getStore('store_good_smt_aoi_point').proxy.setExtraParam('side', side);

					Ext.getStore('store_mapros_board').proxy.setExtraParam('cavity', totCavity);
					Ext.getStore('store_mapros_board').proxy.setExtraParam('model', srcModel);
					Ext.getStore('store_mapros_board').proxy.setExtraParam('pwbname', '');
					Ext.getStore('store_mapros_board').proxy.setExtraParam('lotno', lotno);
					Ext.getStore('store_mapros_board').proxy.setExtraParam('side', side);
					
				}
    		}
    	},
		bbar	: Ext.create('Ext.PagingToolbar', {
			pageSize		: itemperpage,
			store			: store_bigs,
			displayInfo		: true,
			// displayMsg		: 'Data {0} - {1} from {2} data',
			// emptyMsg		: "Page not found",
			// beforePageText  : 'Page',
			// afterPageText   : 'from {0} Pages',
			// firstText       : 'First Page',
			// prevText        : 'Previous Page',
			// nextText        : 'Next page',
			// lastText        : 'Last Page',
			// plugins       	: Ext.create('Ext.ux.ProgressBarPager', {}),
			listeners 		: {
				afterrender: function (cmp) {
					cmp.getComponent("refresh").hide();
					cmp.getComponent("first").hide();
					cmp.getComponent("last").hide();
				}
			}
		})
	});

	grid_bigs.getStore().on('load', function() {
        grid_bigs.getView().stripeRows 			= true;
		grid_bigs.getView().deferEmptyText 		= false;
		grid_bigs.getView().enableTextSelection	= true;
        grid_bigs.getView().emptyText = '<div class="empty-txt2">Data Not Available.</div>';
        grid_bigs.getView().refresh();
    });

});

