Ext.onReady(function() {
	//	=======================================================    DATASTORE    =====================================
		var storeSummaryPcbSerial = Ext.create('Ext.data.Store',{
			storeId : 'storeSummaryPcbSerial',
			model	: 'storeSummaryPcbSerial',
			autoLoad: false,
			fields	: ['barcode','guid_master',]
			proxy   : {
				type    : 'ajax',
				url     : 'json/finishgood_ma/json_summaryPCBSerial.php',
				reader  : {
					type    : 'json',
					root    : 'rows',
					totalProperty : 'totalCount'
				}
			}
		});


});