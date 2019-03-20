function upsize(val) {
	var x = val;
	if (x == '' || x == '-' || x == '---'){
		return '<font class="fontsize12" style="color:red;font-weight: bold;"> --- </font>';
	}
	else if (x == 'NG' || x == 'STOP'){
		return '<font class="fontsize12" style="color:red;font-weight: bold;"> ' + x + ' </font>';
	}
	else if (x == 'OK' || x == 'PASS' || x == 'SOLDER' || x == 'GOOD'){
		return '<font class="fontsize12" style="color:green;font-weight: bold;"> ' + x + ' </font>';
	}
	else{
		return '<font class="fontsize12">' + x + '</font>';
	};
}
function secondtime(val) {
	var x = val;
	if (x == ''){
		return '<font class="fontsize12" style="color:red;font-weight: bold;"> Not Complete </font>';
	}
	else if (x != ''){
		return '<font class="fontsize12"> ' + parseInt('' + (x/60)/60) + 'h : ' + parseInt('' + (x/60)%60) + 'm : ' + parseInt('' + (x%60)) + 's </font>';
	}
	else{
		return '<font class="fontsize12">' + x + '</font>';
	};
}
function spimchjudge(val) {
	var x = val;
	if (x == '' || x == '-'){
		return '<font class="fontsize12" style="color:red;font-weight: bold;"> --- </font>';
	}
	else if (x == '2'){
		return '<font class="fontsize12" style="color:red;font-weight: bold;"> NG </font>';
	}
	else if (x == '0'){
		return '<font class="fontsize12" style="color:green;font-weight: bold;"> OK </font>';
	}
	else{
		return '<font class="fontsize12">' + x + '</font>';
	};
}
function spiopjudge(val) {
	var x = val;
	if (x > '0'){
		return '<font class="fontsize12" style="color:red;font-weight: bold;"> Unknown </font>';
	}
	else if (x == '0' || x == ''){
		return '<font class="fontsize12" style="color:green;font-weight: bold;"> OK </font>';
	}
	else{
		return '<font class="fontsize12">' + x + '</font>';
	};
}
function mode(val) {
	if (val == "Mode2") {
		return '<font class="upsize">CHANGE PART</font>';
	}
	else if (val === "Mode3") {
		return '<font class="upsize">CHECK PART NON SEQUENTIAL</font>';
	}
	else if (val === "Mode4") {
		return '<font class="upsize">CHECK PART SEQUENTIAL</font>';
	}
	else {
		return '<font class="upsize">CHANGE FEEDER</font>';
	}
}
function fileimage(val) {
	return '<a href="detailpic/' + val + '" target="_blank"> <img style="max-width:120px; max-height:120px;" src="detailpic/' + val + '" /> </a>'; 
}
function renderImage(value, metaData, record, rowIndex, colIndex, store) {
        if ( !value ){
			return '<font class="fontsize12" style="color:red;font-weight: bold;"> No Image </font>';
		}
		else{
			// return '<img src="data:image/jpg;base64,' + value +  '" width="80"/>';
			metaData.attr = 'style="cursor: pointer"';
        	return '<img class="imageZoomCls" src="data:image/jpg;base64,' + value +  '" width="50" height="50" />';
		}
}

//	== EXTJS WIDTH COLUMN ===================================================================//
function getWidthPCBSerialBigs(){
	var width = $('html').width();
	var setwidthPCBSerialBigs = "";
	if (width <= 883) {
		setwidthPCBSerialBigs = true;
	}
	else{
		setwidthPCBSerialBigs = false;
	}
	// console.log('BIGS width = '+width);
	// console.log('BIGS autoSizeColumn = '+setwidthPCBSerialBigs);
	return setwidthPCBSerialBigs;
}
function getFlexPCBSerialBigs(){
	var width = $('html').width();
	var	setFlexPCBSerialBigs = "";
	if (width <= 883) {
		setFlexPCBSerialBigs = false;
	}
	else{
		setFlexPCBSerialBigs = 1;
	}
	// console.log('BIGS width = '+width);
	// console.log('BIGS flex = '+setFlexPCBSerialBigs);
	return setFlexPCBSerialBigs;
}
//	== REPAIR ==========================================//
function getWidthPCBSerialRepair(){
	var width = $('html').width();
	var setwidthPCBSerialRepair = "";
	if (width <= 1167) {
		setwidthPCBSerialRepair = true;
	}
	else{
		setwidthPCBSerialRepair = false;
	}
	// console.log('Repair width = '+width);
	// console.log('Repair autoSizeColumn = '+setwidthPCBSerialRepair);
	return setwidthPCBSerialRepair;
}
function getFlexPCBSerialRepair(){
	var width = $('html').width();
	var	setFlexPCBSerialRepair = "";
	if (width <= 1167) {
		setFlexPCBSerialRepair = false;
	}
	else{
		setFlexPCBSerialRepair = 1;
	}
	// console.log('Repair width = '+width);
	// console.log('Repair flex = '+setFlexPCBSerialRepair);
	return setFlexPCBSerialRepair;
}
//	== SPI =============================================//
function getWidthPCBSerialSPI(){
	var width = $('html').width();
	var setwidthPCBSerialSPI = "";
	if (width <= 620) {
		setwidthPCBSerialSPI = true;
	}
	else{
		setwidthPCBSerialSPI = false;
	}
	// console.log('SPI width = '+width);
	// console.log('SPI autoSizeColumn = '+setwidthPCBSerialSPI);
	return setwidthPCBSerialSPI;
}
function getFlexPCBSerialSPI(){
	var width = $('html').width();
	var	setFlexPCBSerialSPI = "";
	if (width <= 620) {
		setFlexPCBSerialSPI = false;
	}
	else{
		setFlexPCBSerialSPI = 1;
	}
	// console.log('SPI width = '+width);
	// console.log('SPI flex = '+setFlexPCBSerialSPI);
	return setFlexPCBSerialSPI;
}
//	== MOUNTER =========================================//
//	== REFLOW ==========================================//
function getWidthPCBSerialReflow(){
	var width = $('html').width();
	var setwidthPCBSerialReflow = "";
	if (width <= 633) {
		setwidthPCBSerialReflow = true;
	}
	else{
		setwidthPCBSerialReflow = false;
	}
	// console.log('Reflow width = '+width);
	// console.log('Reflow autoSizeColumn = '+setwidthPCBSerialReflow);
	return setwidthPCBSerialReflow;
}
function getFlexPCBSerialReflow(){
	var width = $('html').width();
	var	setFlexPCBSerialReflow = "";
	if (width <= 633) {
		setFlexPCBSerialReflow = false;
	}
	else{
		setFlexPCBSerialReflow = 1;
	}
	// console.log('Reflow width = '+width);
	// console.log('Reflow flex = '+setFlexPCBSerialReflow);
	return setFlexPCBSerialReflow;
}
//	== AOI =============================================//
function getWidthPCBSerialAOIBoard(){
	var width = $('html').width();
	var setwidthPCBSerialAOIBoard = "";
	if (width <= 805) {
		setwidthPCBSerialAOIBoard = true;
	}
	else{
		setwidthPCBSerialAOIBoard = false;
	}
	// console.log('AOIBoard width = '+width);
	// console.log('AOIBoard autoSizeColumn = '+setwidthPCBSerialAOIBoard);
	return setwidthPCBSerialAOIBoard;
}
function getFlexPCBSerialAOIBoard(){
	var width = $('html').width();
	var	setFlexPCBSerialAOIBoard = "";
	if (width <= 805) {
		setFlexPCBSerialAOIBoard = false;
	}
	else{
		setFlexPCBSerialAOIBoard = 1;
	}
	// console.log('AOIBoard width = '+width);
	// console.log('AOIBoard flex = '+setFlexPCBSerialAOIBoard);
	return setFlexPCBSerialAOIBoard;
}
function getWidthPCBSerialAOIPoint(){
	var width = $('html').width();
	var setwidthPCBSerialAOIPoint = "";
	if (width <= 1043) {
		setwidthPCBSerialAOIPoint = true;
	}
	else{
		setwidthPCBSerialAOIPoint = false;
	}
	// console.log('AOIPoint width = '+width);
	// console.log('AOIPoint autoSizeColumn = '+setwidthPCBSerialAOIPoint);
	return setwidthPCBSerialAOIPoint;
}
function getFlexPCBSerialAOIPoint(){
	var width = $('html').width();
	var	setFlexPCBSerialAOIPoint = "";
	if (width <= 1043) {
		setFlexPCBSerialAOIPoint = false;
	}
	else{
		setFlexPCBSerialAOIPoint = 1;
	}
	// console.log('AOIPoint width = '+width);
	// console.log('AOIPoint flex = '+setFlexPCBSerialAOIPoint);
	return setFlexPCBSerialAOIPoint;
}
//	== MAPROS ==========================================//

// END width column ==============================================================//


/*
getColumnWidth:function(text){
    let columnWidth = (text.length * 7) + 35  // giving 7 pixles for each letter in the text
    //Optional This part is used to set a maximum column width in case there is too many charachter in the text
    if(columnWidth>400){
        columnWidth = 400
    }
    return columnWidth;
}*/ 	
