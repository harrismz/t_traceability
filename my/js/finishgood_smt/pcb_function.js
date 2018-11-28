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

