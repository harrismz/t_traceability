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
function fontStatus(val) {
	if (val == 'WAITING CHECK') {
		return '<font style="font-family:Roboto; white-space:normal; line-height:1.5; color:gray;">' + val + '</font>';
	} else if (val == 'OK') {
		return '<font style="font-family:Roboto; white-space:normal; line-height:1.5; color:green; font-weight:bold;">' + val + '</font>';
	} else if (val == 'STOP' || val == 'NG') {
		return '<font style="font-family:Roboto; white-space:normal; line-height:1.5; color:red; font-weight:bold;">' + val + '</font>';
	} else if (val == '') {
		return '<font style="font-family:Roboto; white-space:normal; color:red;"> NO ID </font>';
	} else {
		return '<font style="font-family:Roboto; white-space:normal; line-height:1.5; color:black;">' + val + '</font>';
	}
	return val;
}