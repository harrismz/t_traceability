$(document).ready(function(){
	// hidden textfield of search finishgood

	hideTextField();
	$("#lbCheckMS").removeClass('btn-default');
	$("#lbCheckMS").addClass('btn-success active');
	$("#lbCheckMS").prop("checked", true);
	$("#valOfCategory").val("MS");
	$("#sModelName").show();
	$("#sSerialNo").show();
	
	$('input:radio[name="sCategory"]').change(
		function(){
			if($(this).val() === 'MS'){
				// alert('1. '+$(this).val());
				hideTextField();
				$("#lbCheckMS").removeClass('btn-default');
				$("#lbCheckMS").addClass('btn-success active');
				$("#lbCheckMS").prop("checked", true);
				$("#lbCheckMS").prop("required", true);
				
				$("#valOfCategory").val("MS");
				$("#finishgood_tab").show();
				$("#plan_tab").show();
				$("#warehouse_tab").show();
				$("#mcissue_tab").show();
				
				$('#sModelName').show();
				$('#sSerialNo').show();
				console.log('MS');
			}
			else if($(this).val() === 'ML'){
				// alert('2. '+$(this).val());
				hideTextField();
				$("#lbCheckML").removeClass('btn-default');
				$("#lbCheckML").addClass('btn-success active');
				$("#lbCheckML").prop("checked", true);
				$("#lbCheckML").prop("required", true);
				$("#valOfCategory").val("ML");

				$("#sCatMecha").show();
				$("#lbCheckMA").removeClass('btn-default');
				$("#lbCheckMA").addClass('btn-warning active');
				$("#lbCheckMA").prop("checked", true);
				$("#lbCheckMA").prop("required", true);

				$("#valOfCatMecha").val("MA");
				$("#finishgood_tab").show();
				$("#plan_tab").show();
				$("#warehouse_tab").show();
				$("#mcissue_tab").show();

				$('#sModelName').show();
				$('#sLotNo').show();
				// $('#sModelName').show();
				// $('#sLotNo').show();
				console.log('ML-MA');
			}
			else if($(this).val() === 'DS'){
				// alert('3. '+$(this).val());
				hideTextField();
				$("#lbCheckDS").removeClass('btn-default');
				$("#lbCheckDS").addClass('btn-success active');
				$("#lbCheckDS").prop("checked", true);
				$("#lbCheckDS").prop("required", true);
				$("#valOfCategory").val("DS");
				$("#finishgood_tab").hide();
				$("#plan_tab").hide();
				$("#warehouse_tab").hide();
				$("#mcissue_tab").hide();
				$("#sDummySerial").show();
				console.log('DS');

			}
		}
	);

	$('input:radio[name="sCatMecha"]').change(
		function(){
			if($(this).val() === 'MA'){
				$("#sModelName").find("input:text").val("");
				$("#sMechaModel").find("input:text").val("");
				$("#sLotNo").find("input:text").val("");
				$(".rbclick2").removeClass("btn-warning");
				$(".rbclick2").removeClass("active");
				$(".rbclick2").addClass("btn-default");
				$("#checkMA").prop("checked", false);
				$("#checkMCH").prop("checked", false);
				$("#checkMA").prop("required", false);
				$("#checkMCH").prop("required", false);
				$('#sModelName').hide();
				$('#sMechaModel').hide();
				$('#sSerialNo').hide();

				$("#lbCheckMA").removeClass('btn-default');
				$("#lbCheckMA").addClass('btn-warning active');
				$("#lbCheckMA").prop("checked", true);
				$("#lbCheckMA").prop("required", true);
				$("#valOfCatMecha").val("MA");
				$('#sModelName').show();
				$('#sLotNo').show();
				console.log('ML-MA');
			}
			else if($(this).val() === 'MCH'){
				$("#sModelName").find("input:text").val("");
				$("#sMechaModel").find("input:text").val("");
				$("#sLotNo").find("input:text").val("");
				$(".rbclick2").removeClass("btn-warning");
				$(".rbclick2").removeClass("active");
				$(".rbclick2").addClass("btn-default");
				$("#checkMA").prop("checked", false);
				$("#checkMCH").prop("checked", false);
				$("#checkMA").prop("required", false);
				$("#checkMCH").prop("required", false);
				$('#sModelName').hide();
				$('#sMechaModel').hide();
				$('#sSerialNo').hide();
				
				$("#lbCheckMCH").removeClass('btn-default');
				$("#lbCheckMCH").addClass('btn-warning active');
				$("#lbCheckMCH").prop("checked", true);
				$("#lbCheckMCH").prop("required", true);
				$("#valOfCatMecha").val("MCH");
				$('#sMechaModel').show();
				$('#sLotNo').show();
				console.log('ML-MCH');
			}
		}
	);

	$("#model-name").click(function(){
		$("#model-name").css({"border-color":"#CCCCCC"});
		$("#model-name").css({"background-color":"#ffffff"});
	});
	$("#serial-no").click(function(){
		$("#serial-no").css({"border-color":"#CCCCCC"});
		$("#serial-no").css({"background-color":"#ffffff"});
	});
 	$("#lot-no").click(function(){
		$("#lot-no").css({"border-color":"#CCCCCC"});
		$("#lot-no").css({"background-color":"#ffffff"});
	});
	$("#dummy-serial").click(function(){
		$("#dummy-serial").css({"border-color":"#CCCCCC"});
		$("#dummy-serial").css({"background-color":"#ffffff"});
	});
});
function hideTextField(){
	$("#sModelName,#sSerialNo,#sLotNo,#sDummySerial,#sMechaModel").find("input:text").val("");
	$("#sModelName,#sSerialNo,#sLotNo,#sDummySerial,#sMechaModel,#sCatMecha").hide();
	$(".rbclick").removeClass("btn-success");
	$(".rbclick").removeClass("active");
	$(".rbclick").addClass("btn-default");
	$("#checkMS").prop("checked", false);
	$("#checkML").prop("checked", false);
	$("#checDS").prop("checked", false);
	$("#checkMS").prop("required", false);
	$("#checkML").prop("required", false);
	$("#checDS").prop("required", false);
	$(".rbclick2").removeClass("btn-warning");
	$(".rbclick2").removeClass("active");
	$(".rbclick2").addClass("btn-default");
	$("#checkMA").prop("checked", false);
	$("#checkMCH").prop("checked", false);
	$("#checkMA").prop("required", false);
	$("#checkMCH").prop("required", false);
}
function resetSearch(){
	hideTextField();
		$("#lbCheckMS").removeClass('btn-default');
		$("#lbCheckMS").addClass('btn-success active');
		
		$("#model-name").css({"border-color":"#CCCCCC"});
		$("#model-name").css({"background-color":"#ffffff"});
		$("#serial-no").css({"border-color":"#CCCCCC"});
		$("#serial-no").css({"background-color":"#ffffff"});
		$("#lot-no").css({"border-color":"#CCCCCC"});
		$("#lot-no").css({"background-color":"#ffffff"});
		$("#dummy-serial").css({"border-color":"#CCCCCC"});
		$("#dummy-serial").css({"background-color":"#ffffff"});

		$("#lbCheckMS").prop("checked", true);
		$("#valOfCategory").val("MS");
		$("#sModelName").show();
		$("#sSerialNo").show();
}
function checkFinishgood(event){
	var x = event.which || event.keyCode || event.button;
	if (x == 13 || x == 0 || x == 1){
		var rbCheck 	= $("#valOfCategory").val();
		var slcMecha 	= $("#valOfCatMecha").val();
		var modelName 	= $("#model-name").val().toUpperCase();
		var serialNo 	= $("#serial-no").val().toUpperCase();
		var lotNo 		= $("#lot-no").val().toUpperCase();
		var dummySerial = $("#dummy-serial").val().toUpperCase();
		

		if (rbCheck == 'MS'){
			if(modelName.length < 1){
				$("#model-name").css({"border-color":"red"});
				$("#model-name").css({"background-color":"#ffcccc"});
			}
			if(serialNo.length < 1){
				$("#serial-no").css({"border-color":"red"});
				$("#serial-no").css({"background-color":"#ffcccc"});
			}
			if(modelName.length > 1 && serialNo.length > 1){
				Ext.getStore('finishgood_store').proxy.setExtraParam('modelName', modelName);
				Ext.getStore('finishgood_store').proxy.setExtraParam('serialNo', serialNo);
				Ext.getStore('finishgood_store').proxy.setExtraParam('lotNo', '');
				Ext.getStore('finishgood_store').loadPage(1);
			}
		}
		if (rbCheck == 'ML'){
			if(modelName.length < 1){
				$("#model-name").css({"border-color":"red"});
				$("#model-name").css({"background-color":"#ffcccc"});
			}
			if(lotNo.length < 1){
				$("#lot-no").css({"border-color":"red"});
				$("#lot-no").css({"background-color":"#ffcccc"});
			}
			if(modelName.length > 1 && lotNo.length > 1){
				Ext.getStore('finishgood_store').proxy.setExtraParam('modelName', modelName);
				Ext.getStore('finishgood_store').proxy.setExtraParam('serialNo', '');
				Ext.getStore('finishgood_store').proxy.setExtraParam('lotNo', lotNo);
				Ext.getStore('finishgood_store').loadPage(1);

				// $model      = $_REQUEST['valmodel'];
				// $serialnoid = substr(@$_REQUEST['valserialno'],-8);
				// $guidmaster = $_REQUEST['valguidmaster'];
				// $guidticket = $_REQUEST['valguidticket'];
			 //    $pcbserial  = $_REQUEST['valpcbserial'];
			 //    $lotno      = $_REQUEST['vallotno'];

				// Ext.getStore('storeMaQualityReport').proxy.setExtraParam('valmodel', modelName);
				// Ext.getStore('storeMaQualityReport').proxy.setExtraParam('valserialno', modelName);
				// Ext.getStore('storeMaQualityReport').proxy.setExtraParam('valguidmaster', modelName);
				// Ext.getStore('storeMaQualityReport').proxy.setExtraParam('valguidticket', modelName);
				// Ext.getStore('storeMaQualityReport').proxy.setExtraParam('valpcbserial', modelName);
				// Ext.getStore('storeMaQualityReport').proxy.setExtraParam('vallotno', modelName);
				// Ext.getStore('storeMaQualityReport').loadPage(1);
				Ext.getStore('storeMaAvmt').loadPage(1);
			}
		}
		if (rbCheck == 'DS'){
			if(dummySerial.length < 1){
				$("#dummy-serial").css({"border-color":"red"});
				$("#dummy-serial").css({"background-color":"#ffcccc"});
			}
			else if(dummySerial.length > 1){
				Ext.getStore('storeMaprosBoard').proxy.setExtraParam('valmodel', '');
				Ext.getStore('storeMaprosBoard').proxy.setExtraParam('valserialno', '');
				Ext.getStore('storeMaprosBoard').proxy.setExtraParam('dummySerial', dummySerial);
				Ext.getStore('storeMaprosBoard').loadPage(1);
				
				Ext.getStore('storeMaprosBoardSymptom').proxy.setExtraParam('valmodel', '');
				Ext.getStore('storeMaprosBoardSymptom').proxy.setExtraParam('valserialno', '');
				Ext.getStore('storeMaprosBoardSymptom').proxy.setExtraParam('dummySerial', dummySerial);

				Ext.getStore('storeMaprosPanel').proxy.setExtraParam('valmodel', '');
				Ext.getStore('storeMaprosPanel').proxy.setExtraParam('valserialno', '');
				Ext.getStore('storeMaprosPanel').proxy.setExtraParam('dummySerial', dummySerial);

				Ext.getStore('storeMaprosLCD').proxy.setExtraParam('valmodel', '');
				Ext.getStore('storeMaprosLCD').proxy.setExtraParam('valserialno', '');
				Ext.getStore('storeMaprosLCD').proxy.setExtraParam('dummySerial', dummySerial);

				Ext.getStore('storeMaprosMecha').proxy.setExtraParam('valmodel', '');
				Ext.getStore('storeMaprosMecha').proxy.setExtraParam('valserialno', '');
				Ext.getStore('storeMaprosMecha').proxy.setExtraParam('dummySerial', dummySerial);

				Ext.getStore('storeMaprosMain').proxy.setExtraParam('valmodel', '');
				Ext.getStore('storeMaprosMain').proxy.setExtraParam('valserialno', '');
				Ext.getStore('storeMaprosMain').proxy.setExtraParam('dummySerial', dummySerial);
				
				Ext.getStore('storeMaprosMainSymptom').proxy.setExtraParam('valmodel', '');
				Ext.getStore('storeMaprosMainSymptom').proxy.setExtraParam('valserialno', '');
				Ext.getStore('storeMaprosMainSymptom').proxy.setExtraParam('dummySerial', dummySerial);
				
				Ext.getStore('storeMaprosCritical').proxy.setExtraParam('valmodel', '');
				Ext.getStore('storeMaprosCritical').proxy.setExtraParam('valserialno', '');
				Ext.getStore('storeMaprosCritical').proxy.setExtraParam('dummySerial', dummySerial);

				Ext.getStore('storeMaFwdn').proxy.setExtraParam('valmodel','');
				Ext.getStore('storeMaFwdn').proxy.setExtraParam('valserialno', '');
				Ext.getStore('storeMaFwdn').proxy.setExtraParam('dummySerial', dummySerial);

				Ext.getStore('storeMaFlash').proxy.setExtraParam('valmodel', '');
				Ext.getStore('storeMaFlash').proxy.setExtraParam('valserialno', '');
				Ext.getStore('storeMaFlash').proxy.setExtraParam('dummySerial', dummySerial);

				Ext.getStore('storeMaLine0').proxy.setExtraParam('valmodel', '');
				Ext.getStore('storeMaLine0').proxy.setExtraParam('valserialno', '');
				Ext.getStore('storeMaLine0').proxy.setExtraParam('dummySerial', dummySerial);

				Ext.getStore('storeMaAvntest').proxy.setExtraParam('valmodel', '');
				Ext.getStore('storeMaAvntest').proxy.setExtraParam('valserialno', '');
				Ext.getStore('storeMaAvntest').proxy.setExtraParam('dummySerial', dummySerial);

				Ext.getStore('storeMaAvmt').proxy.setExtraParam('valmodel', '');
				Ext.getStore('storeMaAvmt').proxy.setExtraParam('valserialno', '');
				Ext.getStore('storeMaAvmt').proxy.setExtraParam('dummySerial', dummySerial);
			}
		}

		var gridSchedule			= Ext.getCmp("finishgood_plan");
		var gridOutput				= Ext.getCmp("finishgood_actual");
		var gridStockcard			= Ext.getCmp("gridStockcard");
		var gridShipmenthold		= Ext.getCmp("gridShipmentHold");
		var gridBorrow				= Ext.getCmp("gridBorrow");
		var gridScanin				= Ext.getCmp("gridScanin");
		var gridScanout				= Ext.getCmp("gridScanout");
		var grid_maprosBoard		= Ext.getCmp("grid_maprosBoard");
        var grid_maprosPanel		= Ext.getCmp("grid_maprosPanel");
        var grid_maprosLCD			= Ext.getCmp("grid_maprosLCD");
        var grid_maprosMecha		= Ext.getCmp("grid_maprosMecha");
        var grid_maprosMain			= Ext.getCmp("grid_maprosMain");
        var grid_maprosCritical		= Ext.getCmp("grid_maprosCritical");
        var grid_maprosBoardSymptom	= Ext.getCmp("grid_maprosBoardSymptom");
        var grid_maprosMainSymptom	= Ext.getCmp("grid_maprosMainSymptom");
        var grid_maQuality			= Ext.getCmp("grid_maQuality");
        var grid_maFwdn				= Ext.getCmp("grid_maFwdn");
        var grid_maFwdnDetail		= Ext.getCmp("grid_maFwdnDetail");
        var grid_maFlash			= Ext.getCmp("grid_maFlash");
        var grid_maAvntest			= Ext.getCmp("grid_maAvntest");
        var grid_maAvntestDetail	= Ext.getCmp("grid_maAvntestDetail");
        var grid_maAvmt				= Ext.getCmp("grid_maAvmt");
        var grid_maAvmtDetail		= Ext.getCmp("grid_maAvmtDetail");
        var grid_maAuto0			= Ext.getCmp("grid_maAuto0");
        var grid_maAuto0Detail		= Ext.getCmp("grid_maAuto0Detail");
        var grid_mcIssueMa			= Ext.getCmp("grid_mcIssueMa");
        var grid_mcIssueMecha		= Ext.getCmp("grid_mcIssueMecha");
        
        gridSchedule.getStore().removeAll();
		gridSchedule.getView().emptyText = '<div class="empty-txt-main">Select Finishgood table for show this data.</div>';
        gridSchedule.getView().refresh();

        gridOutput.getStore().removeAll();
		gridOutput.getView().emptyText = '<div class="empty-txt-main">Select Finishgood table for show this data.</div>';
        gridOutput.getView().refresh();

        gridStockcard.getStore().removeAll();
		gridStockcard.getView().emptyText = '<div class="empty-txt-main">Select Finishgood table for show this data.</div>';
        gridStockcard.getView().refresh();

        gridShipmenthold.getStore().removeAll();
		gridShipmenthold.getView().emptyText = '<div class="empty-txt-main">Select Finishgood table for show this data.</div>';
        gridShipmenthold.getView().refresh();

        gridBorrow.getStore().removeAll();
		gridBorrow.getView().emptyText = '<div class="empty-txt-main">Select Finishgood table for show this data.</div>';
        gridBorrow.getView().refresh();

        gridScanin.getStore().removeAll();
		gridScanin.getView().emptyText = '<div class="empty-txt-main">Select Finishgood table for show this data.</div>';
        gridScanin.getView().refresh();

        gridScanout.getStore().removeAll();
		gridScanout.getView().emptyText = '<div class="empty-txt-main">Select Finishgood table for show this data.</div>';
        gridScanout.getView().refresh();

        gridScanout.getStore().removeAll();
		gridScanout.getView().emptyText = '<div class="empty-txt-main">Select Finishgood table for show this data.</div>';
        gridScanout.getView().refresh();

        grid_maprosBoard.getStore().removeAll();
		grid_maprosBoard.getView().emptyText = '<div class="empty-txt-main">Select Plan Table for show this data.</div>';
        grid_maprosBoard.getView().refresh();

        grid_maprosPanel.getStore().removeAll();
		grid_maprosPanel.getView().emptyText = '<div class="empty-txt-main">Select Plan Table for show this data.</div>';
        grid_maprosPanel.getView().refresh();
		
		grid_maprosLCD.getStore().removeAll();
		grid_maprosLCD.getView().emptyText = '<div class="empty-txt-main">Select Plan Table for show this data.</div>';
        grid_maprosLCD.getView().refresh();

        grid_maprosMecha.getStore().removeAll();
		grid_maprosMecha.getView().emptyText = '<div class="empty-txt-main">Select Plan Table for show this data.</div>';
        grid_maprosMecha.getView().refresh();

        grid_maprosMain.getStore().removeAll();
		grid_maprosMain.getView().emptyText = '<div class="empty-txt-main">Select Plan Table for show this data.</div>';
        grid_maprosMain.getView().refresh();

        grid_maprosCritical.getStore().removeAll();
		grid_maprosCritical.getView().emptyText = '<div class="empty-txt-main">Select Plan Table for show this data.</div>';
        grid_maprosCritical.getView().refresh();

        grid_maprosBoardSymptom.getStore().removeAll();
		grid_maprosBoardSymptom.getView().emptyText = '<div class="empty-txt-main">Select Plan Table for show this data.</div>';
        grid_maprosBoardSymptom.getView().refresh();

        grid_maprosMainSymptom.getStore().removeAll();
		grid_maprosMainSymptom.getView().emptyText = '<div class="empty-txt-main">Select Plan Table for show this data.</div>';
        grid_maprosMainSymptom.getView().refresh();

        grid_maQuality.getStore().removeAll();
		grid_maQuality.getView().emptyText = '<div class="empty-txt-main">Select Mapros Main table for show this data.</div>';
        grid_maQuality.getView().refresh();

        grid_maFwdn.getStore().removeAll();
		grid_maFwdn.getView().emptyText = '<div class="empty-txt-main">Select Mapros PCB Serial for show this data.</div>';
        grid_maFwdn.getView().refresh();

        grid_maFwdnDetail.getStore().removeAll();
		grid_maFwdnDetail.getView().emptyText = '<div class="empty-txt-main">Select Header to show Detail</div>';
        grid_maFwdnDetail.getView().refresh();
		
		grid_maFlash.getStore().removeAll();
		grid_maFlash.getView().emptyText = '<div class="empty-txt-main">Select Mapros PCB Serial table for show this data.</div>';
        grid_maFlash.getView().refresh();

        grid_maAvntest.getStore().removeAll();
		grid_maAvntest.getView().emptyText = '<div class="empty-txt-main">Select Mapros PCB Serial table for show this data.</div>';
        grid_maAvntest.getView().refresh();

        grid_maAvntestDetail.getStore().removeAll();
		grid_maAvntestDetail.getView().emptyText = '<div class="empty-txt-main">Select Header to show Detail</div>';
        grid_maAvntestDetail.getView().refresh();

        grid_maAvmt.getStore().removeAll();
		grid_maAvmt.getView().emptyText = '<div class="empty-txt-main">Select Mapros Main Table for show this data.</div>';
        grid_maAvmt.getView().refresh();

        grid_maAvmtDetail.getStore().removeAll();
		grid_maAvmtDetail.getView().emptyText = '<div class="empty-txt-main">Select Header to show Detail</div>';
        grid_maAvmtDetail.getView().refresh();

        grid_maAuto0.getStore().removeAll();
		grid_maAuto0.getView().emptyText = '<div class="empty-txt-main">Select Mapros PCB Serial table for show this data.</div>';
        grid_maAuto0.getView().refresh();

        grid_maAuto0Detail.getStore().removeAll();
		grid_maAuto0Detail.getView().emptyText = '<div class="empty-txt-main">Select Header to show Detail</div>';
        grid_maAuto0Detail.getView().refresh();

        grid_mcIssueMa.getStore().removeAll();
		grid_mcIssueMa.getView().emptyText = '<div class="empty-txt-main">Select Finishgood Table for showing this data.</div>';
        grid_mcIssueMa.getView().refresh();

        grid_mcIssueMecha.getStore().removeAll();
		grid_mcIssueMecha.getView().emptyText = '<div class="empty-txt-main">Select Finishgood Table for showing this data.</div>';
        grid_mcIssueMecha.getView().refresh();

		console.log('=========== START finishgood ===========');
		console.log('cat 		 : '+rbCheck);
		console.log('Model 		 : '+modelName);
		console.log('Serial 	 : '+serialNo);
		console.log('lotno 		 : '+lotNo);
		console.log('dummyserial : '+dummySerial);
		console.log('=========== END finishgood ===========');

		

	}
}
function downloadFinishgood(){
	var rbCheck 	= $("#valOfCategory").val();
	var modelName 	= $("#model-name").val().toUpperCase();
	var serialNo 	= $("#serial-no").val().toUpperCase();
	var lotNo 		= $("#lot-no").val().toUpperCase();
	var dummySerial = $("#dummy-serial").val().toUpperCase();

	console.log('rbCheck 		= '+rbCheck);
	console.log('modelName 		= '+modelName);
	console.log('serialNo 		= '+serialNo);
	console.log('lotNo 			= '+lotNo);
	console.log('dummySerial 	= '+dummySerial);
	window.open('resp/finishgood_ma/dlFgOCS.php?rb='+rbCheck+'&mdl='+modelName+'&s='+serialNo+'&l='+lotNo+'&ds='+dummySerial+'');
}