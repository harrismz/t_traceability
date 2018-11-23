	// Start
	Ext.onReady(function() {
	//	=======================================================    POPUP SEARCH DATA    =============================
		
			// 	//	Form Search FinishGood
			// 		Ext.create('Ext.form.field.Text',{
			// 			renderTo 	: boardid_scan,
			// 			width 	 	: '100%',
			// 			id 			: 'boardid_scan',
			// 			name 		: 'boardid_scan',
			// 			fieldCls	: 'biggertext',
			// 			emptyText	: 'Search Model',
			// 			margins		: '0 6 0 0',
			// 			height 		: 30,
			// 			flex		: 1,
			// 			//value:  	'00013IA000010015',
			// 			//value:  	'000207B000010002',
			// 			//value:  	'000157A000010009',
			// 			//value:  	'000177A020010012',
			// 			//value:  	'000267B000010001',
			// 			//value:  	'YJ5224A00VT_01B7002A0001',
			// 			//value:  	'YJ5224A01MN_00A7010A0002',
			// 			//value:  	'YJ5214A00SH-01B7010A0089',
			// 			value:  	'YJ5224A01VT_00A7011A0021',
			// 			value:  	'YJ5224A01MN_00A7014A0001',
			// 			listeners	: {
			// 							afterrender : function() {
			// 											this.inputEl.setStyle('text-align', 'center');
			// 											this.inputEl.setStyle('backgroundColor', '#0067AE');
			// 											this.inputEl.setStyle('color', '#fff');
			// 											this.inputEl.setStyle('fontSize', '20px');
			// 											var me = this,
			// 									            inputElement = me.inputElement;
												 
			// 									        if (inputElement && inputElement.dom.focus) {
			// 									            inputElement.dom.focus();
			// 									        }
			// 						        			//return me;
			// 										},
			// 							specialkey : function(field, e) {
			// 											if (e.getKey() == 13) {
			// 												var boardid = Ext.getCmp('boardid_scan').getValue();
			// 												if (!boardid) {
			// 													Ext.Msg.alert('Warning', 'PCB ID cannot be null !!!');
			// 												} 
			// 												else {
			// 													store_bigs.proxy.setExtraParam('boardid', boardid);
			// 													store_bigs.proxy.setExtraParam('smt_date', '');
			// 													store_bigs.loadPage(1);
			// 													store_smt_repair.proxy.setExtraParam('src_boardid', boardid);
			// 													store_smt_repair.loadPage(1);
			// 													store_good_smt_aoi_board.proxy.setExtraParam('boardid', boardid);
			// 													store_good_smt_aoi_board.proxy.setExtraParam('smt_date', '');
			// 													store_good_smt_aoi_board.loadPage(1);
			// 													store_good_smt_aoi_point.proxy.setExtraParam('boardid', boardid);
			// 													store_good_smt_aoi_point.proxy.setExtraParam('smt_date', '');
			// 													store_good_smt_aoi_point.loadPage(1);
			// 													store_smt_spi.proxy.setExtraParam('boardid', boardid);
			// 													store_smt_spi.proxy.setExtraParam('smt_date', '');
			// 													store_smt_spi.loadPage(1);
			// 													store_mapros_fwdn.proxy.setExtraParam('boardid', boardid);
			// 													store_mapros_fwdn.loadPage(1);
			// 													store_mapros_fwdn_detail.proxy.setExtraParam('idfwdn', '');
			// 													store_mapros_fwdn_detail.loadPage(1);
			// 													store_mapros_flash.proxy.setExtraParam('boardid', boardid);
			// 													store_mapros_flash.loadPage(1);
			// 													store_mapros_avntest.proxy.setExtraParam('boardid', boardid);
			// 													store_mapros_avntest.loadPage(1);
			// 													store_mapros_avntest_detail.proxy.setExtraParam('avnt', '');
			// 													store_mapros_avntest_detail.loadPage(1);
			// 													store_mapros_avmt.proxy.setExtraParam('boardid', boardid);
			// 													store_mapros_avmt.loadPage(1);
			// 													store_mapros_avmt_detail.proxy.setExtraParam('avmt','');
			// 	    											store_mapros_avmt_detail.loadPage(1);
			// 													store_mapros_line0.proxy.setExtraParam('boardid', boardid);
			// 													store_mapros_line0.loadPage(1);
			// 													store_mapros_line0_detail.proxy.setExtraParam('idline0','');
			// 	    											store_mapros_line0_detail.loadPage(1);
			// 	    											store_mapros_critical.proxy.setExtraParam('model', '');
			// 	    											store_mapros_critical.proxy.setExtraParam('serial_no', '');
			// 	    											store_mapros_critical.proxy.setExtraParam('boardid', boardid);
			// 	    											store_mapros_critical.loadPage(1);
				    											

			// 												}
			// 											}
			// 										}
			// 						}
			// 		});
		
		// //	==** end **==

	});

	function checkPcbSerial(event){
		var x = event.which || event.keyCode;
		var pcbserial = document.getElementById('pcbserial').value;
		Ext.getStore('store_bigs').proxy.setExtraParam('boardid', pcbserial);
		Ext.getStore('store_bigs').loadPage(1);
		Ext.getStore('store_smt_repair').proxy.setExtraParam('src_boardid', pcbserial);
		Ext.getStore('store_smt_repair').loadPage(1);
		Ext.getStore('store_smt_spi').proxy.setExtraParam('boardid', pcbserial);
		Ext.getStore('store_smt_spi').loadPage(1);
		Ext.getStore('store_good_smt_aoi_board').proxy.setExtraParam('boardid', pcbserial);
		Ext.getStore('store_good_smt_aoi_board').loadPage(1);
		Ext.getStore('store_good_smt_aoi_point').proxy.setExtraParam('boardid', pcbserial);
		Ext.getStore('store_good_smt_aoi_point').loadPage(1);
		Ext.getStore('store_mapros_fwdn').proxy.setExtraParam('boardid', pcbserial);
		Ext.getStore('store_mapros_fwdn').loadPage(1);
		Ext.getStore('store_mapros_fwdn_detail').proxy.setExtraParam('idfwdn', '');
		Ext.getStore('store_mapros_fwdn_detail').loadPage(1);
		Ext.getStore('store_mapros_flash').proxy.setExtraParam('boardid', pcbserial);
		Ext.getStore('store_mapros_flash').loadPage(1);
		Ext.getStore('store_mapros_avntest').proxy.setExtraParam('boardid', pcbserial);
		Ext.getStore('store_mapros_avntest').loadPage(1);
		Ext.getStore('store_mapros_avntest_detail').proxy.setExtraParam('avnt', '');
		Ext.getStore('store_mapros_avntest_detail').loadPage(1);
		Ext.getStore('store_mapros_avmt').proxy.setExtraParam('boardid', pcbserial);
		Ext.getStore('store_mapros_avmt').loadPage(1);
		Ext.getStore('store_mapros_avmt_detail').proxy.setExtraParam('avmt','');
		Ext.getStore('store_mapros_avmt_detail').loadPage(1);
		Ext.getStore('store_mapros_line0').proxy.setExtraParam('boardid', pcbserial);
		Ext.getStore('store_mapros_line0').loadPage(1);
		Ext.getStore('store_mapros_line0_detail').proxy.setExtraParam('idline0','');
		Ext.getStore('store_mapros_line0_detail').loadPage(1);
		Ext.getStore('store_mapros_critical').proxy.setExtraParam('model', '');
		Ext.getStore('store_mapros_critical').proxy.setExtraParam('serial_no', '');
		Ext.getStore('store_mapros_critical').proxy.setExtraParam('boardid', pcbserial);
		Ext.getStore('store_mapros_critical').loadPage(1);
		Ext.getStore('store_smt_mounter').proxy.setExtraParam('boardid', '123456789012345678901234');
		Ext.getStore('store_smt_mounter').loadPage(1);

		
	}