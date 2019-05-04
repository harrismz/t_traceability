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
				$('#sModelName').show();
				$('#sLotNo').show();
				// $('#sModelName').show();
				// $('#sLotNo').show();
				console.log('ML-MA');
			}
			// else if($(this).val() === 'DS'){
			// 	// alert('3. '+$(this).val());
			// 	hideTextField();
			// 	$("#lbCheckDS").removeClass('btn-default');
			// 	$("#lbCheckDS").addClass('btn-success active');
			// 	$("#lbCheckDS").prop("checked", true);
			// 	$("#lbCheckDS").prop("required", true);
			// 	$("#valOfCategory").val("DS");
			// 	$("#sDummySerial").show();
			// 	console.log('DS');
			// }
			else if($(this).val() === 'DC'){
				// alert('3. '+$(this).val());
				hideTextField();
				$("#lbCheckDC").removeClass('btn-default');
				$("#lbCheckDC").addClass('btn-success active');
				$("#lbCheckDC").prop("checked", true);
				$("#lbCheckDC").prop("required", true);
				$("#valOfCategory").val("DC");
				$("#sDCDate").show();
				console.log('DC');
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
	$("#sModelName,#sSerialNo,#sLotNo,#sDummySerial,#sMechaModel,#sDCDate").find("input:text").val("");
	$("#sModelName,#sSerialNo,#sLotNo,#sDummySerial,#sMechaModel,#sDCDate,#sCatMecha").hide();
	$(".rbclick").removeClass("btn-success");
	$(".rbclick").removeClass("active");
	$(".rbclick").addClass("btn-default");
	$("#checkMS").prop("checked", false);
	$("#checkML").prop("checked", false);
	$("#checDS").prop("checked", false);
	$("#checDC").prop("checked", false);
	$("#checkMS").prop("required", false);
	$("#checkML").prop("required", false);
	$("#checDS").prop("required", false);
	$("#checDC").prop("required", false);
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
function checkDcOffset(event){
	var x = event.which || event.keyCode || event.button;
	if (x == 13 || x == 0 || x == 1){
		var rbCheck 	= $("#valOfCategory").val();
		var modelName 	= $("#model-name").val().toUpperCase();
		var serialNo 	= $("#serial-no").val().toUpperCase();
		var lotNo 		= $("#lot-no").val().toUpperCase();
		var measurement_date = Ext.getCmp('src_mDcOffset').getValue();
		
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
				Ext.getStore('storeDcOffset').proxy.setExtraParam('valmodel', modelName);
				Ext.getStore('storeDcOffset').proxy.setExtraParam('valserial', serialNo);
				Ext.getStore('storeDcOffset').proxy.setExtraParam('vallotno', '');
				Ext.getStore('storeDcOffset').proxy.setExtraParam('valrundate', '');
				Ext.getStore('storeDcOffset').loadPage(1);
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
				Ext.getStore('storeDcOffset').proxy.setExtraParam('valmodel', modelName);
				Ext.getStore('storeDcOffset').proxy.setExtraParam('valserial', '');
				Ext.getStore('storeDcOffset').proxy.setExtraParam('vallotno', lotNo);
				Ext.getStore('storeDcOffset').proxy.setExtraParam('valrundate', '');
				Ext.getStore('storeDcOffset').loadPage(1);
			}
		}
		// else {
		// 	if(dummySerial.length < 1){
		// 		$("#dummy-serial").css({"border-color":"red"});
		// 		$("#dummy-serial").css({"background-color":"#ffcccc"});
		// 	}
		// 	else if(dummySerial.length > 1){
		// 		var measurement_date = Ext.getCmp('src_mDcOffset').getValue();
		// 		if (!measurement_date) {
		// 			Ext.Msg.alert('Warning', 'Measurement date cannot be null !!!');
		// 		} else {

		// 			Ext.getStore('storeDcOffset').proxy.setExtraParam('valmodel', '');
		// 			Ext.getStore('storeDcOffset').proxy.setExtraParam('valserial', '');
		// 			Ext.getStore('storeDcOffset').proxy.setExtraParam('vallotno', '');
		// 			Ext.getStore('storeDcOffset').proxy.setExtraParam('valrundate', measurement_date);
		// 			Ext.getStore('storeDcOffset').loadPage(1);
		// 		}
		// 	}
		// }

		var gridDcOffset			= Ext.getCmp("gridDcOffset");
		
        gridDcOffset.getStore().removeAll();
		gridDcOffset.getView().emptyText = '<div class="empty-txt-main">Select Finishgood table for show this data.</div>';
        gridDcOffset.getView().refresh();

		console.log('=========== SEARCH DC OFFSET ===========');
		console.log('cat 		 : '+rbCheck);
		console.log('Model 		 : '+modelName);
		console.log('Serial 	 : '+serialNo);
		console.log('lotno 		 : '+lotNo);
		console.log('rundate 	 : '+measurement_date);
		// console.log('dummyserial : '+dummySerial);
		console.log('========= END SEARCH DC OFFSET =========');

		

	}
}

function downloadDcOffset() {
    var rbCheck 	= $("#valOfCategory").val();
	var modelName 	= $("#model-name").val().toUpperCase();
	var serialNo 	= $("#serial-no").val().toUpperCase();
	var lotNo 		= $("#lot-no").val().toUpperCase();
	var measurement_date = Ext.getCmp('src_mDcOffset').getRawValue();

	if (modelName != '' || serialNo != '' || lotNo != ''){
		measurement_date = '';
	}

	console.log('=========== DOWNLOAD DC OFFSET ===========');
		console.log('cat 		 : '+rbCheck);
		console.log('Model 		 : '+modelName);
		console.log('Serial 	 : '+serialNo);
		console.log('lotno 		 : '+lotNo);
		console.log('rundate 	 : '+measurement_date);
		// console.log('dummyserial : '+dummySerial);
	console.log('========= END DOWNLOAD DC OFFSET =========');

   // console.log('modelName:'+modelName + '- serialNo:' + serialNo + '- lotNo:' + lotNo + '- measurement_date:' + measurement_date);
    
    window.open('resp/measureDcOffset/resp_measureDcOffset.php?valmodel='+modelName+'&valserial='+serialNo+'&vallotno='+lotNo+'&valrundate='+measurement_date);
}