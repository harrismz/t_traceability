// value:  	'00013IA000010015',
// value:  	'000207B000010002',
// value:  	'000157A000010009',
// value:  	'000177A020010012',
// value:  	'000267B000010001',
// value:  	'YJ5224A00VT_01B7002A0001',
// value:  	'YJ5224A01MN_00A7010A0002',
// value:  	'YJ5214A00SH-01B7010A0089',
// value:  	'YJ5224A01VT_00A7011A0021',
// value:  	'YJ5224A01MN_00A7014A0001',

function checkPcbSerial(event){
	var x = event.which || event.keyCode || event.button;
	if (x == 13 || x == 0 || x == 1) {
		var pcbserial = document.getElementById('pcbserial').value;
		
		Ext.getStore('store_bigs').proxy.setExtraParam('boardid', pcbserial);
		Ext.getStore('store_bigs').loadPage(1);
		//=============================================================================================================//

		var gridSmtRepair 		= Ext.getCmp("grid_smt_repair");
		var gridSmtSpi 	  		= Ext.getCmp("grid_smt_spi");
		var gridSmtMounterHeader= Ext.getCmp("grid_smt_mounter_header");
		var gridSmtMounter 		= Ext.getCmp("grid_smt_mounter");
		var gridSmtReflow 		= Ext.getCmp("grid_smt_reflow");
		var gridSmtAoiBoard		= Ext.getCmp("grid_smt_aoi_board");
		var gridSmtAoiPoint		= Ext.getCmp("grid_smt_aoi_point");
		
		gridSmtRepair.getStore().removeAll();
		gridSmtRepair.getView().emptyText = '<div class="empty-txt2">Select Board ID Generator for this result.</div>';
        gridSmtRepair.getView().refresh();

  		gridSmtSpi.getStore().removeAll();
		gridSmtSpi.getView().emptyText = '<div class="empty-txt2">Select Board ID Generator for this result.</div>';
        gridSmtSpi.getView().refresh();

        gridSmtMounterHeader.getStore().removeAll();
		gridSmtMounterHeader.getView().emptyText = '<div class="empty-txt2">Select SPI for this result.</div>';
        gridSmtMounterHeader.getView().refresh();
        
        gridSmtMounter.getStore().removeAll();
		gridSmtMounter.getView().emptyText = '<div class="empty-txt2">Select Header of Mounter for this result.</div>';
        gridSmtMounter.getView().refresh();
        
        gridSmtReflow.getStore().removeAll();
		gridSmtReflow.getView().emptyText = '<div class="empty-txt2">Select SPI for this result.</div>';
        gridSmtReflow.getView().refresh();

        gridSmtAoiBoard.getStore().removeAll();
		gridSmtAoiBoard.getView().emptyText = '<div class="empty-txt2">Select Reflow for this result.</div>';
        gridSmtAoiBoard.getView().refresh();

        gridSmtAoiPoint.getStore().removeAll();
		gridSmtAoiPoint.getView().emptyText = '<div class="empty-txt2">Select Reflow for this result.</div>';
        gridSmtAoiPoint.getView().refresh();











		// Ext.getStore('store_mapros_board').proxy.setExtraParam('boardid', '');
		// Ext.getStore('store_mapros_board').proxy.setExtraParam('cavity', '0');
		// Ext.getStore('store_mapros_board').proxy.setExtraParam('model', '');
		// Ext.getStore('store_mapros_board').proxy.setExtraParam('pwbname', '');
		// Ext.getStore('store_mapros_board').loadPage(1);

		// Ext.getStore('store_mapros_master').proxy.setExtraParam('boardid', '');
		// Ext.getStore('store_mapros_master').proxy.setExtraParam('cavity', '0');
		// Ext.getStore('store_mapros_master').loadPage(1);

		// Ext.getStore('store_mapros_panel').proxy.setExtraParam('boardid', '');
		// Ext.getStore('store_mapros_panel').proxy.setExtraParam('cavity', '0');
		// Ext.getStore('store_mapros_panel').loadPage(1);
		//==========================================================================================================
		// Ext.getStore('store_mapros_critical').proxy.setExtraParam('model', '');
		// Ext.getStore('store_mapros_critical').proxy.setExtraParam('serial_no', '');
		// Ext.getStore('store_mapros_critical').proxy.setExtraParam('boardid', '');
		// Ext.getStore('store_mapros_critical').loadPage(1);
		// Ext.getStore('store_mapros_fwdn').proxy.setExtraParam('boardid', '');
		// Ext.getStore('store_mapros_fwdn').loadPage(1);
		// Ext.getStore('store_mapros_fwdn_detail').proxy.setExtraParam('idfwdn', '');
		// Ext.getStore('store_mapros_fwdn_detail').loadPage(1);
		// Ext.getStore('store_mapros_flash').proxy.setExtraParam('boardid', '');
		// Ext.getStore('store_mapros_flash').loadPage(1);
		// Ext.getStore('store_mapros_avntest').proxy.setExtraParam('boardid', '');
		// Ext.getStore('store_mapros_avntest').loadPage(1);
		// Ext.getStore('store_mapros_avntest_detail').proxy.setExtraParam('avnt', '');
		// Ext.getStore('store_mapros_avntest_detail').loadPage(1);
		// Ext.getStore('store_mapros_avmt').proxy.setExtraParam('boardid', '');
		// Ext.getStore('store_mapros_avmt').loadPage(1);
		// Ext.getStore('store_mapros_avmt_detail').proxy.setExtraParam('avmt','');
		// Ext.getStore('store_mapros_avmt_detail').loadPage(1);
		// Ext.getStore('store_mapros_line0').proxy.setExtraParam('boardid', '');
		// Ext.getStore('store_mapros_line0').loadPage(1);
		// Ext.getStore('store_mapros_line0_detail').proxy.setExtraParam('idline0','');
		// Ext.getStore('store_mapros_line0_detail').loadPage(1);
	}
	
}