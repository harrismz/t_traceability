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
		
		var splits = pcbserial.split('/');
		var model = splits[0];
		var lotno = splits[1];
		var pwbname = splits[2];

		console.log('pcbserial : '+pcbserial);
		console.log('model : '+model);
		console.log('lotno : '+lotno);
		console.log('pwbname : '+pwbname);

		if (typeof lotno === 'undefined'){
			console.log('LOTNO KOSONG');
			Ext.getStore('store_bigs').proxy.setExtraParam('boardid', pcbserial);
			Ext.getStore('store_bigs').proxy.setExtraParam('model', '');
			Ext.getStore('store_bigs').proxy.setExtraParam('lotno', '');
			Ext.getStore('store_bigs').proxy.setExtraParam('pwbname', '');
			Ext.getStore('store_bigs').loadPage(1);
		}
		else{
			console.log('LOTNO ADA');
			Ext.getStore('store_bigs').proxy.setExtraParam('boardid', '');
			Ext.getStore('store_bigs').proxy.setExtraParam('model', model);
			Ext.getStore('store_bigs').proxy.setExtraParam('lotno', lotno);
			Ext.getStore('store_bigs').proxy.setExtraParam('pwbname', pwbname);
			Ext.getStore('store_bigs').loadPage(1);
		}

		
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
function downloadBigs(){
	var pcbserial = document.getElementById('pcbserial').value;
	var splits = pcbserial.split('/');
	var model = splits[0];
	var lotno = splits[1];
	var pwbname = splits[2];

	console.log('pcbserial : '+pcbserial);
	console.log('model : '+model);
	console.log('lotno : '+lotno);
	console.log('pwbname : '+pwbname);

	if (typeof lotno === 'undefined'){
		console.log('DOWNLOAD BIGS PCB SERIAL');
		window.open('resp/pcb_serial/dlPcbBigs.php?pcb='+pcbserial+'&mdl=&l=&pwb=');
	}
	else{
		console.log('DOWNLOAD BIGS MODEL LOTNO');
		window.open('resp/pcb_serial/dlPcbBigs.php?pcb=&mdl='+model+'&l='+lotno+'&pwb='+pwbname+'');
	}
}
function downloadSpi(){
	var pcbserial = document.getElementById('pcbserial').value;
	var side = document.getElementById('spiSide').value;
	var totcavity = document.getElementById('bigcavity').value;
	var splits = pcbserial.split('/');
	var model = splits[0];
	var lotno = splits[1];
	var pwbname = splits[2];

	console.log('pcbserial : '+pcbserial);
	console.log('model : '+model);
	console.log('lotno : '+lotno);
	console.log('pwbname : '+pwbname);
	console.log('side : '+side);
	console.log('totcavity : '+totcavity);

	if (typeof lotno === 'undefined'){
		console.log('DOWNLOAD SPI PCB SERIAL');
		window.open('resp/pcb_serial/dlPcbSpi.php?pcb='+pcbserial+'&mdl=&l=&pwb=&sd=&tc='+totcavity+'');
	}
	else{
		console.log('DOWNLOAD SPI MODEL LOTNO');
		window.open('resp/pcb_serial/dlPcbSpi.php?pcb=&mdl='+model+'&l='+lotno+'&pwb='+pwbname+'&sd='+side+'&tc='+totcavity+'');
	}
}
function downloadReflow(){
	// var pcbserial = document.getElementById('pcbserial').value;
	var pcbserial = document.getElementById('pcbmounter').value;
	var side = document.getElementById('spiSide').value;
	var totcavity = document.getElementById('bigcavity').value;
	var smtdate = document.getElementById('smtdate').value;
	var splits = pcbserial.split('/');
	var model = splits[0];
	var lotno = splits[1];
	var pwbname = splits[2];

	console.log('pcbserial : '+pcbserial);
	console.log('model : '+model);
	console.log('lotno : '+lotno);
	console.log('pwbname : '+pwbname);
	console.log('side : '+side);
	console.log('totcavity : '+totcavity);
	console.log('smt date : '+smtdate);

	if (typeof lotno === 'undefined'){
		console.log('DOWNLOAD REFLOW PCB SERIAL');
		window.open('resp/pcb_serial/dlPcbReflow.php?pcb='+pcbserial+'&smtdt='+smtdate+'&mdl=&l=&pwb=&sd=&tc='+totcavity+'');
	}
	else{
		console.log('DOWNLOAD REFLOW MODEL LOTNO');
		window.open('resp/pcb_serial/dlPcbReflow.php?pcb='+pcbserial+'&smtdt='+smtdate+'&mdl=&l=&pwb=&sd=&tc='+totcavity+'');
		// window.open('resp/pcb_serial/dlPcbReflow.php?pcb=&smtdt='+smtdate+'&mdl='+model+'&l='+lotno+'&pwb='+pwbname+'&sd='+side+'&tc='+totcavity+'');
	}
}
function downloadMounter(){
	var pcbserial = document.getElementById('pcbserial').value;
	var pcbmounter = document.getElementById('pcbmounter').value;
	var side = document.getElementById('spiSide').value;
	var splits = pcbserial.split('/');
	var model = splits[0];
	var lotno = splits[1];
	var pwbname = splits[2];

	console.log('pcbmounter : '+pcbmounter);
	console.log('pcbserial : '+pcbserial);
	console.log('model : '+model);
	console.log('lotno : '+lotno);
	console.log('pwbname : '+pwbname);
	console.log('side : '+side);

	if (typeof lotno === 'undefined'){
		console.log('DOWNLOAD MOUNTER PCB SERIAL');
		window.open('resp/pcb_serial/dlPcbMounter.php?pcb='+pcbserial+'&mdl=&l=&pwb=&sd=');
	}
	else{
		console.log('DOWNLOAD MOUNTER MODEL LOTNO');
		window.open('resp/pcb_serial/dlPcbMounter.php?pcb='+pcbmounter+'&mdl=&l=&pwb=&sd=');
	}
}
function downloadAOI(){
	var pcbserial = document.getElementById('pcbserial').value;
	var side = document.getElementById('spiSide').value;
	var totcavity = document.getElementById('bigcavity').value;
	var splits = pcbserial.split('/');
	var model = splits[0];
	var lotno = splits[1];
	var pwbname = splits[2];

	console.log('pcbserial : '+pcbserial);
	console.log('model : '+model);
	console.log('lotno : '+lotno);
	console.log('pwbname : '+pwbname);
	console.log('side : '+side);
	console.log('totcavity : '+totcavity);

	if (typeof lotno === 'undefined'){
		console.log('DOWNLOAD AOI PCB SERIAL');
		window.open('resp/pcb_serial/dlPcbAOIBoard.php?pcb='+pcbserial+'&mdl=&l=&pwb=&sd=&tc='+totcavity+'');
		window.open('resp/pcb_serial/dlPcbAOIPoint.php?pcb='+pcbserial+'&mdl=&l=&pwb=&sd=&tc='+totcavity+'');
	}
	else{
		console.log('DOWNLOAD AOI MODEL LOTNO');
		window.open('resp/pcb_serial/dlPcbAOIBoard.php?pcb=&mdl='+model+'&l='+lotno+'&pwb='+pwbname+'&sd='+side+'&tc='+totcavity+'');
		window.open('resp/pcb_serial/dlPcbAOIPoint.php?pcb=&mdl='+model+'&l='+lotno+'&pwb='+pwbname+'&sd='+side+'&tc='+totcavity+'');
	}
}