//	== EXTJS WIDTH COLUMN ===================================================================//
function getFlexFgFinishgood(){
	var width = $('html').width();
	var	setFlexFgFinishgood = "";
	if (width <= 790) {
		setFlexFgFinishgood = false;
	}
	else{
		setFlexFgFinishgood = 1;
	}
	// console.log('FG Finishgood width = '+width);
	// console.log('FG Finishgood flex = '+setFlexFgFinishgood);
	return setFlexFgFinishgood;
}
function getWidthFgFinishgood(){
	var width = $('html').width();
	var setwidthFgFinishgood = "";
	if (width <= 790) {
		setwidthFgFinishgood = true;
	}
	else{
		setwidthFgFinishgood = false;
	}
	// console.log('FG Finishgood width = '+width);
	// console.log('FG Finishgood autoSizeColumn = '+setwidthFgFinishgood);
	return setwidthFgFinishgood;
}
function getFlexFgPlan(){
	var width = $('html').width();
	var	setFlexFgFinishgood = "";
	if (width <= 555) {
		setFlexFgFinishgood = false;
	}
	else{
		setFlexFgFinishgood = 1;
	}
	// console.log('FG Finishgood width = '+width);
	// console.log('FG Finishgood flex = '+setFlexFgFinishgood);
	return setFlexFgFinishgood;
}
function getWidthFgPlan(){
	var width = $('html').width();
	var setwidthFgPlan = "";
	if (width <= 555) {
		setwidthFgPlan = true;
	}
	else{
		setwidthFgPlan = false;
	}
	// console.log('FG Plan width = '+width);
	// console.log('FG Plan autoSizeColumn = '+setwidthFgPlan);
	return setwidthFgPlan;
}
function getFlexFgActual(){
	var width = $('html').width();
	var	setFlexFgActual = "";
	if (width <= 1000) {
		setFlexFgActual = false;
	}
	else{
		setFlexFgActual = 1;
	}
	// console.log('FG Actual width = '+width);
	// console.log('FG Actual flex = '+setFlexFgActual);
	return setFlexFgActual;
}
function getWidthFgActual(){
	var width = $('html').width();
	var setwidthFgActual = "";
	if (width <= 1000) {
		setwidthFgActual = true;
	}
	else{
		setwidthFgActual = false;
	}
	// console.log('FG Actual width = '+width);
	// console.log('FG Actual autoSizeColumn = '+setwidthFgActual);
	return setwidthFgActual;
}
function getFlexFgWhStockcard(){
	var width = $('html').width();
	var	setFlexFgWhStockcard = "";
	if (width <= 1000) {
		setFlexFgWhStockcard = false;
	}
	else{
		setFlexFgWhStockcard = 1;
	}
	// console.log('FG WhStockcard width = '+width);
	// console.log('FG WhStockcard flex = '+setFlexFgWhStockcard);
	return setFlexFgWhStockcard;
}
function getWidthFgWhStockcard(){
	var width = $('html').width();
	var setwidthFgWhStockcard = "";
	if (width <= 1000) {
		setwidthFgWhStockcard = true;
	}
	else{
		setwidthFgWhStockcard = false;
	}
	// console.log('FG WhStockcard width = '+width);
	// console.log('FG WhStockcard autoSizeColumn = '+setwidthFgWhStockcard);
	return setwidthFgWhStockcard;
}
function convertToRupiah(angka){
	var rupiah 		= '';
	var angkarev 	= angka.toString().split('').reverse().join('');
	for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
	return rupiah.split('',rupiah.length-1).reverse().join('');
}
function numeric(val) {
	if (val > 0) {		
		return '<font style="font-family:Roboto; white-space:normal; color:green; float:right;">' + convertToRupiah(val) + '</font>';
	} else if (val <= 0) {
		return '<font style="font-family:Roboto; white-space:normal; color:red; float:right;">' + convertToRupiah(val) + '</font>';
	} else {
		return '<font style="font-family:Roboto; white-space:normal; color:gray; float:right;">' + val + '</font>';
	}
	return val;
}
function numericStyle(val) {
	return '<font style="font-family:Roboto; white-space:normal; color:black; float:right;">' + val + '</font>';	
}
function fontstyle(val) {
	return '<font style="font-family:Roboto; white-space:normal; line-height:1.5;">' + val + '</font>';
}
function combinecolsinput(value, meta, record, rowIndex, colIndex, store) {
	value2 = record.get('input_date');
	return '<font style="font-family:Roboto; white-space:normal; line-height:1.5;">' + value + '<br>' + value2 + '</font>';
}
function combinecolsupdate(value, meta, record, rowIndex, colIndex, store) {
	value3 = record.get('update_date');
	return '<font style="font-family:Roboto; white-space:normal; line-height:1.5;">' + value + '<br>' + value3 + '</font>';
}
function combinemodelserial(value, meta, record, rowIndex, colIndex, store) {
	value4 = record.get('serial');
	return '<font style="font-family:Roboto; white-space:normal; line-height:1.5;">' + value + '<br>' + value4 + '</font>';
}
function fontStatus(val) {
	if (val == 'WAITING CHECK') {
		return '<font style="font-family:Roboto; white-space:normal; line-height:1.5; color:gray;">' + val + '</font>';
	} else if (val == 'ACCEPTED' || val == 'SHIPPING') {
		return '<font style="font-family:Roboto; white-space:normal; line-height:1.5; color:green; font-weight:bold;">' + val + '</font>';
	} else if (val == 'REJECTED' || val == 'HOLD' || val == 'BORROW') {
		return '<font style="font-family:Roboto; white-space:normal; line-height:1.5; color:red;">' + val + '</font>';
	} else if (val == 'RELEASE') {
		return '<font style="font-family:Roboto; white-space:normal; line-height:1.5; color:blue; font-weight:bold;">' + val + '</font>';
	} else if (val == 'READY') {
		return '<font style="font-family:Roboto; white-space:normal; color:blue;"> RETURN </font>';
	} else if (val == 'YES') {
		return '<font style="font-family:Roboto; white-space:normal; color:green;"> ALREADY<br>SHIPPING </font>';
	} else if (val == 'NO') {
		return '<font style="font-family:Roboto; white-space:normal; color:red;"> WAITING<br>SHIPPING </font>';
	} else if (val == '') {
		return '<font style="font-family:Roboto; white-space:normal; color:red;"> NO ID </font>';
	} else {
		return '<font style="font-family:Roboto; white-space:normal; line-height:1.5; color:black;">' + val + '</font>';
	}
	return val;
}