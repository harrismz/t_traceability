//function untuk fontsize grid
	function upsize(val) {
		var x = val;
		if (x == '' || x == '--'){
			return '<font class="fontsize12" style="color:red;font-weight: bold;"> --- </font>';
		}
		else if (x == 'OK'){
			return '<font class="fontsize12" style="color:green;font-weight: bold;"> ' + x + ' </font>';
		}
		else if (x == 'NG'){
			return '<font class="fontsize12" style="color:red;font-weight: bold;"> ' + x + ' </font>';
		}
		else{
			return '<font class="fontsize12">' + x + '</font>';
		};
	}