	// Start
	Ext.onReady(function() {

		//	========================================================    VARIABLE    =======================================
			// configure whether filter query is encoded or not (initially)
			var encode = false;

			// configure whether filtering is performed locally or remotely (initially)
			var local = true;
			Ext.QuickTips.init();

			//	end function untuk column bigsize
			var itemperpage = 10;
			var date 		= new Date();
			
		//	=======================================================    MODEL    =========================================
				
				//	THERMOHUMIDITY
					Ext.define('model_thermo_smt1',{
		                extend: 'Ext.data.Model',
						fields: ['id', 'mchname', 'model', 'dateinspection','datetimein','serial','alm','t_ch1','h_ch2','alm1','alm2','inputdate']
		           	});
					Ext.define('model_thermo_smt2',{
		                extend: 'Ext.data.Model',
						fields: ['id', 'mchname', 'model', 'dateinspection','datetimein','serial','alm','t_ch1','h_ch2','alm1','alm2','inputdate']
		           	});
					Ext.define('model_thermo_smt3',{
		                extend: 'Ext.data.Model',
						fields: ['id', 'mchname', 'model', 'dateinspection','datetimein','serial','alm','t_ch1','h_ch2','alm1','alm2','inputdate']
		           	});
					Ext.define('model_thermo_smtsparepart',{
		                extend: 'Ext.data.Model',
						fields: ['id', 'mchname', 'model', 'dateinspection','datetimein','serial','alm','t_ch1','h_ch2','alm1','alm2','inputdate']
		           	});
					Ext.define('model_thermo_mc_ictray',{
		                extend: 'Ext.data.Model',
						fields: ['id', 'mchname', 'model', 'dateinspection','datetimein','serial','alm','t_ch1','h_ch2','alm1','alm2','inputdate']
		           	});
					Ext.define('model_thermo_mc_warehouse',{
		                extend: 'Ext.data.Model',
						fields: ['id', 'mchname', 'model', 'dateinspection','datetimein','serial','alm','t_ch1','h_ch2','alm1','alm2','inputdate']
		           	});
					Ext.define('model_thermo_maline16',{
		                extend: 'Ext.data.Model',
						fields: ['id', 'mchname', 'model', 'dateinspection','datetimein','serial','alm','t_ch1','h_ch2','alm1','alm2','inputdate']
		           	});
					Ext.define('model_thermo_maline17',{
		                extend: 'Ext.data.Model',
						fields: ['id', 'mchname', 'model', 'dateinspection','datetimein','serial','alm','t_ch1','h_ch2','alm1','alm2','inputdate']
		           	});

					// Ext.define('model_thermo_ma',{
		   			//              extend: 'Ext.data.Model',
					// 	fields: ['id', 'mchname', 'model', 'dateinspection','datetimein','serial','alm','t_ch1','h_ch2','alm1','alm2','inputdate']
		   			//         	});
					// Ext.define('model_thermo_smt',{
		  			 //              extend: 'Ext.data.Model',
					// 	fields: ['id', 'mchname', 'model', 'dateinspection','datetimein','serial','alm','t_ch1','h_ch2','alm1','alm2','inputdate']
	    			//        		});
		        //	ESD
		           	Ext.define('model_esd_ma',{
		                extend: 'Ext.data.Model',
						fields: ['id', 'dateesd', 'datetimein','mchname','nik','leftstatus','leftfeet','rightstatus','rightfeet','wirststatus','wirstvalue','judgement']
		           	});
				//	TORQUE
		        	Ext.define('model_torque_ma',{
		                extend: 'Ext.data.Model',
						fields: ['unid', 'id', 'datetimein', 'channel','mode','rotation','torque','torque']
		           	});
				//	TEMPERATURE
		        	Ext.define('model_temperature_ma',{
		                extend: 'Ext.data.Model',
						fields: ['unid', 'id', 'faddres', 'Instid','grno','measid','temp','settemp','datetimein','status','picupload']
		           	});
					Ext.define('model_temperature_smt',{
		                extend: 'Ext.data.Model',
						fields: ['unid', 'id', 'faddres', 'Instid','grno','measid','temp','settemp','datetimein','status','picupload']
		           	});
		        //	PARTICLE DUSTY
		        	Ext.define('model_particle',{
		                extend: 'Ext.data.Model',
						fields: ['id', 'mchname', 'model', 'dateinspection','datetimein','serial','alm','t_ch1','h_ch2','h_ch2','alm1','alm2','inputdate']
		           	});
					
		//	=======================================================    DATASTORE    =====================================
				
				// THERMOHUMIDITY
					var store_thermo_smt1 = Ext.create('Ext.data.Store',{
						model	: 'model_thermo_smt1',
						autoLoad: true,
						pageSize: itemperpage,
						proxy   : {
							type    : 'ajax',
							url     : 'json/measurement/json_ma_thermohumidity.php',
							extraParams: {
								loc: 'smt1'
							},
							reader  : {
								type    : 'json',
								root    : 'rows',
								totalProperty : 'totalCount'
							}
						}
					});
					var store_thermo_smt2 = Ext.create('Ext.data.Store',{
						model	: 'model_thermo_smt2',
						autoLoad: true,
						pageSize: itemperpage,
						proxy   : {
							type    : 'ajax',
							url     : 'json/measurement/json_ma_thermohumidity.php',
							extraParams: {
								loc: 'smt2'
							},
							reader  : {
								type    : 'json',
								root    : 'rows',
								totalProperty : 'totalCount'
							}
						}
					});
					var store_thermo_smt3 = Ext.create('Ext.data.Store',{
						model	: 'model_thermo_smt3',
						autoLoad: true,
						pageSize: itemperpage,
						proxy   : {
							type    : 'ajax',
							url     : 'json/measurement/json_ma_thermohumidity.php',
							extraParams: {
								loc: 'smt3'
							},
							reader  : {
								type    : 'json',
								root    : 'rows',
								totalProperty : 'totalCount'
							}
						}
					});
					var store_thermo_smtsparepart = Ext.create('Ext.data.Store',{
						model	: 'model_thermo_smtsparepart',
						autoLoad: true,
						pageSize: itemperpage,
						proxy   : {
							type    : 'ajax',
							url     : 'json/measurement/json_ma_thermohumidity.php',
							extraParams: {
								loc: 'smtsparepart'
							},
							reader  : {
								type    : 'json',
								root    : 'rows',
								totalProperty : 'totalCount'
							}
						}
					});
					var store_thermo_mc_ictray = Ext.create('Ext.data.Store',{
						model	: 'model_thermo_mc_ictray',
						autoLoad: true,
						pageSize: itemperpage,
						proxy   : {
							type    : 'ajax',
							url     : 'json/measurement/json_ma_thermohumidity.php',
							extraParams: {
								loc: 'mc_ictray'
							},
							reader  : {
								type    : 'json',
								root    : 'rows',
								totalProperty : 'totalCount'
							}
						}
					});
					var store_thermo_mc_warehouse = Ext.create('Ext.data.Store',{
						model	: 'model_thermo_mc_warehouse',
						autoLoad: true,
						pageSize: itemperpage,
						proxy   : {
							type    : 'ajax',
							url     : 'json/measurement/json_ma_thermohumidity.php',
							extraParams: {
								loc: 'mc_warehouse'
							},
							reader  : {
								type    : 'json',
								root    : 'rows',
								totalProperty : 'totalCount'
							}
						}
					});
					var store_thermo_maline16 = Ext.create('Ext.data.Store',{
						model	: 'model_thermo_maline16',
						autoLoad: true,
						pageSize: itemperpage,
						proxy   : {
							type    : 'ajax',
							url     : 'json/measurement/json_ma_thermohumidity.php',
							extraParams: {
								loc: 'maline16'
							},
							reader  : {
								type    : 'json',
								root    : 'rows',
								totalProperty : 'totalCount'
							}
						}
					});
					var store_thermo_maline17 = Ext.create('Ext.data.Store',{
						model	: 'model_thermo_maline17',
						autoLoad: true,
						pageSize: itemperpage,
						proxy   : {
							type    : 'ajax',
							url     : 'json/measurement/json_ma_thermohumidity.php',
							extraParams: {
								loc: 'maline17'
							},
							reader  : {
								type    : 'json',
								root    : 'rows',
								totalProperty : 'totalCount'
							}
						}
					});
				// ESD
		        	var store_esd_ma = Ext.create('Ext.data.Store',{
						model	: 'model_esd_ma',
						autoLoad: true,
						pageSize: itemperpage,
						proxy   : {
							type    : 'ajax',
							url     : 'json/measurement/json_ma_esd.php',
							reader  : {
								type    : 'json',
								root    : 'rows',
								totalProperty : 'totalCount'
							}
						 }				
					});
				// TORQUE
		        	var store_torque_ma = Ext.create('Ext.data.Store',{
						model	: 'model_torque_ma',
						autoLoad: true,
						pageSize: itemperpage,
						proxy   : {
							type    : 'ajax',
							url     : 'json/measurement/json_ma_torque.php',
							reader  : {
								type    : 'json',
								root    : 'rows',
								totalProperty : 'totalCount'
							}
						 }				
					});
				// TEMPERATURE
		        	var store_temperature_ma = Ext.create('Ext.data.Store',{
						model	: 'model_temperature_ma',
						autoLoad: true,
						pageSize: itemperpage,
						proxy   : {
							type    : 'ajax',
							url     : 'json/measurement/json_ma_temperature.php',
							reader  : {
								type    : 'json',
								root    : 'rows',
								totalProperty : 'totalCount'
							}
						 }				
					});
					var store_temperature_smt = Ext.create('Ext.data.Store',{
						model	: 'model_temperature_smt',
						autoLoad: true,
						pageSize: itemperpage,
						proxy   : {
							type    : 'ajax',
							url     : 'json/measurement/json_smt_temperature.php',
							reader  : {
								type    : 'json',
								root    : 'rows',
								totalProperty : 'totalCount'
							}
						 }				
					});
				// THERMOHUMIDITY
					var store_particle = Ext.create('Ext.data.Store',{
						model	: 'model_particle',
						autoLoad: true,
						pageSize: itemperpage,
						proxy   : {
							type    : 'ajax',
							url     : 'json/measurement/json_ma_particledusty.php',
							extraParams: {
								loc: 'smt1'
							},
							reader  : {
								type    : 'json',
								root    : 'rows',
								totalProperty : 'totalCount'
							}
						}
					});
				

		//	=======================================================    GRID    ==========================================
				
				// THERMOHUMIDITY
		        	var grid_thermo_smt1 = Ext.create('Ext.grid.Panel', {
						id 				: 'grid_thermo_smt1',
						autoWidth 	 	: '100%',
						maxHeight	 	: 330,
						columnLines 	: true,
						store 			: store_thermo_smt1,
						viewConfig 		: {
							stripeRows 			: true,
							emptyText 		 	: '<div class="empty-txt">No data to display.</div>',
							deferEmptyText 		: false,
							enableTextSelection : true
						},
						columns: [
							{	header 		: 'id',
								dataIndex 	: 'id',
								flex 		: 1,
								renderer 	: upsize,
								hidden		: true
							},
							{	header 		: 'DATE INSP',
								dataIndex 	: 'dateinspection',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'TIME',
								dataIndex 	: 'datetimein',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'MCH NAME',
								dataIndex 	: 'mchname',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'MODEL',
								dataIndex 	: 'model',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'SERIAL',
								dataIndex 	: 'serial',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'ALM',
								dataIndex 	: 'alm',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'TEMPERATURE <br> ( &deg;C )',
								dataIndex 	: 't_ch1',
								width 		: 120,
								renderer 	: upsize
							},
							{	header 		: 'HUMIDITY <br> ( <i class="fas fa-tint"></i> )',
								dataIndex 	: 'h_ch2',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'ALM1',
								dataIndex	: 'alm1',
								flex 		: 1,
								renderer	: upsize
							},
							{	header 		: 'ALM2',
								dataIndex 	: 'alm2',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'inputdate',
								dataIndex 	: 'inputdate',
								flex 		: 1,
								renderer 	: upsize,
								hidden		: true
							}
						],
						bbar	: Ext.create('Ext.PagingToolbar', {
							pageSize		: itemperpage,
							store			: store_thermo_smt1,
							displayInfo		: true,
							displayMsg		: 'Data {0} - {1} from {2} data',
							emptyMsg		: "Page not found",
							beforePageText  : 'Page',
							afterPageText   : 'from {0} Pages',
							firstText       : 'First Page',
							prevText        : 'Previous Page',
							nextText        : 'Next page',
							lastText        : 'Last Page',
							plugins       	: Ext.create('Ext.ux.ProgressBarPager', {}),
							listeners 		: {
								afterrender: function (cmp) {
									cmp.getComponent("refresh").hide();
								}
							}
						}),
						//features: [filters],
						// selModel: {
						// 	selType: 'cellmodel'
						// },
						// plugins: [cellEditing]
					});
					var grid_thermo_smt2 = Ext.create('Ext.grid.Panel', {
						id 				: 'grid_thermo_smt2',
						autoWidth 	 	: '100%',
						maxHeight	 	: 330,
						columnLines 	: true,
						store 			: store_thermo_smt2,
						viewConfig 		: {
							stripeRows 			: true,
							emptyText 		 	: '<div class="empty-txt">No data to display.</div>',
							deferEmptyText 		: false,
							enableTextSelection : true
						},
						columns: [
							{	header 		: 'id',
								dataIndex 	: 'id',
								flex 		: 1,
								renderer 	: upsize,
								hidden		: true
							},
							{	header 		: 'DATE INSP',
								dataIndex 	: 'dateinspection',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'TIME',
								dataIndex 	: 'datetimein',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'MCH NAME',
								dataIndex 	: 'mchname',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'MODEL',
								dataIndex 	: 'model',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'SERIAL',
								dataIndex 	: 'serial',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'ALM',
								dataIndex 	: 'alm',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'TEMPERATURE <br> ( &deg;C )',
								dataIndex 	: 't_ch1',
								width 		: 120,
								renderer 	: upsize
							},
							{	header 		: 'HUMIDITY <br> ( <i class="fas fa-tint"></i> )',
								dataIndex 	: 'h_ch2',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'ALM1',
								dataIndex	: 'alm1',
								flex 		: 1,
								renderer	: upsize
							},
							{	header 		: 'ALM2',
								dataIndex 	: 'alm2',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'inputdate',
								dataIndex 	: 'inputdate',
								flex 		: 1,
								renderer 	: upsize,
								hidden		: true
							}
						],
						bbar	: Ext.create('Ext.PagingToolbar', {
							pageSize		: itemperpage,
							store			: store_thermo_smt2,
							displayInfo		: true,
							displayMsg		: 'Data {0} - {1} from {2} data',
							emptyMsg		: "Page not found",
							beforePageText  : 'Page',
							afterPageText   : 'from {0} Pages',
							firstText       : 'First Page',
							prevText        : 'Previous Page',
							nextText        : 'Next page',
							lastText        : 'Last Page',
							plugins       	: Ext.create('Ext.ux.ProgressBarPager', {}),
							listeners 		: {
								afterrender: function (cmp) {
									cmp.getComponent("refresh").hide();
								}
							}
						}),
						//features: [filters],
						// selModel: {
						// 	selType: 'cellmodel'
						// },
						// plugins: [cellEditing]
					});
					var grid_thermo_smt3 = Ext.create('Ext.grid.Panel', {
						id 				: 'grid_thermo_smt3',
						autoWidth 	 	: '100%',
						maxHeight	 	: 330,
						columnLines 	: true,
						store 			: store_thermo_smt3,
						viewConfig 		: {
							stripeRows 			: true,
							emptyText 		 	: '<div class="empty-txt">No data to display.</div>',
							deferEmptyText 		: false,
							enableTextSelection : true
						},
						columns: [
							{	header 		: 'id',
								dataIndex 	: 'id',
								flex 		: 1,
								renderer 	: upsize,
								hidden		: true
							},
							{	header 		: 'DATE INSP',
								dataIndex 	: 'dateinspection',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'TIME',
								dataIndex 	: 'datetimein',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'MCH NAME',
								dataIndex 	: 'mchname',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'MODEL',
								dataIndex 	: 'model',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'SERIAL',
								dataIndex 	: 'serial',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'ALM',
								dataIndex 	: 'alm',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'TEMPERATURE <br> ( &deg;C )',
								dataIndex 	: 't_ch1',
								width 		: 120,
								renderer 	: upsize
							},
							{	header 		: 'HUMIDITY <br> ( <i class="fas fa-tint"></i> )',
								dataIndex 	: 'h_ch2',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'ALM1',
								dataIndex	: 'alm1',
								flex 		: 1,
								renderer	: upsize
							},
							{	header 		: 'ALM2',
								dataIndex 	: 'alm2',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'inputdate',
								dataIndex 	: 'inputdate',
								flex 		: 1,
								renderer 	: upsize,
								hidden		: true
							}
						],
						bbar	: Ext.create('Ext.PagingToolbar', {
							pageSize		: itemperpage,
							store			: store_thermo_smt3,
							displayInfo		: true,
							displayMsg		: 'Data {0} - {1} from {2} data',
							emptyMsg		: "Page not found",
							beforePageText  : 'Page',
							afterPageText   : 'from {0} Pages',
							firstText       : 'First Page',
							prevText        : 'Previous Page',
							nextText        : 'Next page',
							lastText        : 'Last Page',
							plugins       	: Ext.create('Ext.ux.ProgressBarPager', {}),
							listeners 		: {
								afterrender: function (cmp) {
									cmp.getComponent("refresh").hide();
								}
							}
						}),
						//features: [filters],
						// selModel: {
						// 	selType: 'cellmodel'
						// },
						// plugins: [cellEditing]
					});
					var grid_thermo_smtsparepart = Ext.create('Ext.grid.Panel', {
						id 				: 'grid_thermo_smt_sparepart',
						autoWidth 	 	: '100%',
						maxHeight	 	: 330,
						columnLines 	: true,
						store 			: store_thermo_smtsparepart,
						viewConfig 		: {
							stripeRows 			: true,
							emptyText 		 	: '<div class="empty-txt">No data to display.</div>',
							deferEmptyText 		: false,
							enableTextSelection : true
						},
						columns: [
							{	header 		: 'id',
								dataIndex 	: 'id',
								flex 		: 1,
								renderer 	: upsize,
								hidden		: true
							},
							{	header 		: 'DATE INSP',
								dataIndex 	: 'dateinspection',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'TIME',
								dataIndex 	: 'datetimein',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'MCH NAME',
								dataIndex 	: 'mchname',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'MODEL',
								dataIndex 	: 'model',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'SERIAL',
								dataIndex 	: 'serial',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'ALM',
								dataIndex 	: 'alm',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'TEMPERATURE <br> ( &deg;C )',
								dataIndex 	: 't_ch1',
								width 		: 120,
								renderer 	: upsize
							},
							{	header 		: 'HUMIDITY <br> ( <i class="fas fa-tint"></i> )',
								dataIndex 	: 'h_ch2',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'ALM1',
								dataIndex	: 'alm1',
								flex 		: 1,
								renderer	: upsize
							},
							{	header 		: 'ALM2',
								dataIndex 	: 'alm2',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'inputdate',
								dataIndex 	: 'inputdate',
								flex 		: 1,
								renderer 	: upsize,
								hidden		: true
							}
						],
						bbar	: Ext.create('Ext.PagingToolbar', {
							pageSize		: itemperpage,
							store			: store_thermo_smtsparepart,
							displayInfo		: true,
							displayMsg		: 'Data {0} - {1} from {2} data',
							emptyMsg		: "Page not found",
							beforePageText  : 'Page',
							afterPageText   : 'from {0} Pages',
							firstText       : 'First Page',
							prevText        : 'Previous Page',
							nextText        : 'Next page',
							lastText        : 'Last Page',
							plugins       	: Ext.create('Ext.ux.ProgressBarPager', {}),
							listeners 		: {
								afterrender: function (cmp) {
									cmp.getComponent("refresh").hide();
								}
							}
						}),
						//features: [filters],
						// selModel: {
						// 	selType: 'cellmodel'
						// },
						// plugins: [cellEditing]
					});
					var grid_thermo_mc_ictray = Ext.create('Ext.grid.Panel', {
						id 				: 'grid_thermo_mc_ictray',
						autoWidth 	 	: '100%',
						maxHeight	 	: 330,
						columnLines 	: true,
						store 			: store_thermo_mc_ictray,
						viewConfig 		: {
							stripeRows 			: true,
							emptyText 		 	: '<div class="empty-txt">No data to display.</div>',
							deferEmptyText 		: false,
							enableTextSelection : true
						},
						columns: [
							{	header 		: 'id',
								dataIndex 	: 'id',
								flex 		: 1,
								renderer 	: upsize,
								hidden		: true
							},
							{	header 		: 'DATE INSP',
								dataIndex 	: 'dateinspection',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'TIME',
								dataIndex 	: 'datetimein',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'MCH NAME',
								dataIndex 	: 'mchname',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'MODEL',
								dataIndex 	: 'model',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'SERIAL',
								dataIndex 	: 'serial',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'ALM',
								dataIndex 	: 'alm',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'TEMPERATURE <br> ( &deg;C )',
								dataIndex 	: 't_ch1',
								width 		: 120,
								renderer 	: upsize
							},
							{	header 		: 'HUMIDITY <br> ( <i class="fas fa-tint"></i> )',
								dataIndex 	: 'h_ch2',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'ALM1',
								dataIndex	: 'alm1',
								flex 		: 1,
								renderer	: upsize
							},
							{	header 		: 'ALM2',
								dataIndex 	: 'alm2',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'inputdate',
								dataIndex 	: 'inputdate',
								flex 		: 1,
								renderer 	: upsize,
								hidden		: true
							}
						],
						bbar	: Ext.create('Ext.PagingToolbar', {
							pageSize		: itemperpage,
							store			: store_thermo_mc_ictray,
							displayInfo		: true,
							displayMsg		: 'Data {0} - {1} from {2} data',
							emptyMsg		: "Page not found",
							beforePageText  : 'Page',
							afterPageText   : 'from {0} Pages',
							firstText       : 'First Page',
							prevText        : 'Previous Page',
							nextText        : 'Next page',
							lastText        : 'Last Page',
							plugins       	: Ext.create('Ext.ux.ProgressBarPager', {}),
							listeners 		: {
								afterrender: function (cmp) {
									cmp.getComponent("refresh").hide();
								}
							}
						}),
						//features: [filters],
						// selModel: {
						// 	selType: 'cellmodel'
						// },
						// plugins: [cellEditing]
					});
					var grid_thermo_mc_warehouse = Ext.create('Ext.grid.Panel', {
						id 				: 'grid_thermo_mc_warehouse',
						autoWidth 	 	: '100%',
						maxHeight	 	: 330,
						columnLines 	: true,
						store 			: store_thermo_mc_warehouse,
						viewConfig 		: {
							stripeRows 			: true,
							emptyText 		 	: '<div class="empty-txt">No data to display.</div>',
							deferEmptyText 		: false,
							enableTextSelection : true
						},
						columns: [
							{	header 		: 'id',
								dataIndex 	: 'id',
								flex 		: 1,
								renderer 	: upsize,
								hidden		: true
							},
							{	header 		: 'DATE INSP',
								dataIndex 	: 'dateinspection',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'TIME',
								dataIndex 	: 'datetimein',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'MCH NAME',
								dataIndex 	: 'mchname',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'MODEL',
								dataIndex 	: 'model',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'SERIAL',
								dataIndex 	: 'serial',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'ALM',
								dataIndex 	: 'alm',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'TEMPERATURE <br> ( &deg;C )',
								dataIndex 	: 't_ch1',
								width 		: 120,
								renderer 	: upsize
							},
							{	header 		: 'HUMIDITY <br> ( <i class="fas fa-tint"></i> )',
								dataIndex 	: 'h_ch2',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'ALM1',
								dataIndex	: 'alm1',
								flex 		: 1,
								renderer	: upsize
							},
							{	header 		: 'ALM2',
								dataIndex 	: 'alm2',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'inputdate',
								dataIndex 	: 'inputdate',
								flex 		: 1,
								renderer 	: upsize,
								hidden		: true
							}
						],
						bbar	: Ext.create('Ext.PagingToolbar', {
							pageSize		: itemperpage,
							store			: store_thermo_mc_warehouse,
							displayInfo		: true,
							displayMsg		: 'Data {0} - {1} from {2} data',
							emptyMsg		: "Page not found",
							beforePageText  : 'Page',
							afterPageText   : 'from {0} Pages',
							firstText       : 'First Page',
							prevText        : 'Previous Page',
							nextText        : 'Next page',
							lastText        : 'Last Page',
							plugins       	: Ext.create('Ext.ux.ProgressBarPager', {}),
							listeners 		: {
								afterrender: function (cmp) {
									cmp.getComponent("refresh").hide();
								}
							}
						}),
						//features: [filters],
						// selModel: {
						// 	selType: 'cellmodel'
						// },
						// plugins: [cellEditing]
					});
					var grid_thermo_maline16 = Ext.create('Ext.grid.Panel', {
						id 				: 'grid_thermo_maline16',
						autoWidth 	 	: '100%',
						maxHeight	 	: 330,
						columnLines 	: true,
						store 			: store_thermo_maline16,
						viewConfig 		: {
							stripeRows 			: true,
							emptyText 		 	: '<div class="empty-txt">No data to display.</div>',
							deferEmptyText 		: false,
							enableTextSelection : true
						},
						columns: [
							{	header 		: 'id',
								dataIndex 	: 'id',
								flex 		: 1,
								renderer 	: upsize,
								hidden		: true
							},
							{	header 		: 'DATE INSP',
								dataIndex 	: 'dateinspection',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'TIME',
								dataIndex 	: 'datetimein',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'MCH NAME',
								dataIndex 	: 'mchname',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'MODEL',
								dataIndex 	: 'model',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'SERIAL',
								dataIndex 	: 'serial',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'ALM',
								dataIndex 	: 'alm',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'TEMPERATURE <br> ( &deg;C )',
								dataIndex 	: 't_ch1',
								width 		: 120,
								renderer 	: upsize
							},
							{	header 		: 'HUMIDITY <br> ( <i class="fas fa-tint"></i> )',
								dataIndex 	: 'h_ch2',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'ALM1',
								dataIndex	: 'alm1',
								flex 		: 1,
								renderer	: upsize
							},
							{	header 		: 'ALM2',
								dataIndex 	: 'alm2',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'inputdate',
								dataIndex 	: 'inputdate',
								flex 		: 1,
								renderer 	: upsize,
								hidden		: true
							}
						],
						bbar	: Ext.create('Ext.PagingToolbar', {
							pageSize		: itemperpage,
							store			: store_thermo_maline16,
							displayInfo		: true,
							displayMsg		: 'Data {0} - {1} from {2} data',
							emptyMsg		: "Page not found",
							beforePageText  : 'Page',
							afterPageText   : 'from {0} Pages',
							firstText       : 'First Page',
							prevText        : 'Previous Page',
							nextText        : 'Next page',
							lastText        : 'Last Page',
							plugins       	: Ext.create('Ext.ux.ProgressBarPager', {}),
							listeners 		: {
								afterrender: function (cmp) {
									cmp.getComponent("refresh").hide();
								}
							}
						}),
						//features: [filters],
						// selModel: {
						// 	selType: 'cellmodel'
						// },
						// plugins: [cellEditing]
					});
					var grid_thermo_maline17 = Ext.create('Ext.grid.Panel', {
						id 				: 'grid_thermo_maline17',
						autoWidth 	 	: '100%',
						maxHeight	 	: 330,
						columnLines 	: true,
						store 			: store_thermo_maline17,
						viewConfig 		: {
							stripeRows 			: true,
							emptyText 		 	: '<div class="empty-txt">No data to display.</div>',
							deferEmptyText 		: false,
							enableTextSelection : true
						},
						columns: [
							{	header 		: 'id',
								dataIndex 	: 'id',
								flex 		: 1,
								renderer 	: upsize,
								hidden		: true
							},
							{	header 		: 'DATE INSP',
								dataIndex 	: 'dateinspection',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'TIME',
								dataIndex 	: 'datetimein',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'MCH NAME',
								dataIndex 	: 'mchname',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'MODEL',
								dataIndex 	: 'model',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'SERIAL',
								dataIndex 	: 'serial',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'ALM',
								dataIndex 	: 'alm',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'TEMPERATURE <br> ( &deg;C )',
								dataIndex 	: 't_ch1',
								width 		: 120,
								renderer 	: upsize
							},
							{	header 		: 'HUMIDITY <br> ( <i class="fas fa-tint"></i> )',
								dataIndex 	: 'h_ch2',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'ALM1',
								dataIndex	: 'alm1',
								flex 		: 1,
								renderer	: upsize
							},
							{	header 		: 'ALM2',
								dataIndex 	: 'alm2',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'inputdate',
								dataIndex 	: 'inputdate',
								flex 		: 1,
								renderer 	: upsize,
								hidden		: true
							}
						],
						bbar	: Ext.create('Ext.PagingToolbar', {
							pageSize		: itemperpage,
							store			: store_thermo_maline17,
							displayInfo		: true,
							displayMsg		: 'Data {0} - {1} from {2} data',
							emptyMsg		: "Page not found",
							beforePageText  : 'Page',
							afterPageText   : 'from {0} Pages',
							firstText       : 'First Page',
							prevText        : 'Previous Page',
							nextText        : 'Next page',
							lastText        : 'Last Page',
							plugins       	: Ext.create('Ext.ux.ProgressBarPager', {}),
							listeners 		: {
								afterrender: function (cmp) {
									cmp.getComponent("refresh").hide();
								}
							}
						}),
						//features: [filters],
						// selModel: {
						// 	selType: 'cellmodel'
						// },
						// plugins: [cellEditing]
					});
				// ESD
		        	var grid_esd_ma = Ext.create('Ext.grid.Panel', {
						id 					: 'grid_esd_ma',
						autoWidth 	 		: '100%',
						maxHeight	 		: 330,
						// columnLines 		: true,
						store 				: store_esd_ma,
						// autoScroll 			: true,
						// viewConfig 			: {
						// 	stripeRows 			: true,
						// 	emptyText 			: '<div class="empty-txt">No data to display.</div>',
						// 	deferEmptyText 		: false,
						// 	enableTextSelection	: true
						// },
						columns: [
							{ 	header 		: 'id',
								dataIndex 	: 'id',
								flex 		: 1,
								renderer 	: upsize,
								hidden 	 	: true
							}, 
							{ 	header 		: 'DATE ESD',
								dataIndex 	: 'dateesd',
								flex 		: 1,
								renderer 	: upsize
							}, 
							{ 	header 		: 'TIME',
								dataIndex 	: 'datetimein',
								flex 		: 1,
								renderer 	: upsize
							}, 
							{ 	header 		: 'MCH NAME',
								dataIndex 	: 'mchname',
								flex 		: 1,
								renderer 	: upsize
							}, 
							{ 	header 		: 'NIK',
								dataIndex 	: 'nik',
								flex 		: 1,
								renderer 	: upsize
							}, 
							{ 	header 		: 'JUDGEMENT',
								dataIndex 	: 'judgement',
								width 		: 110,
								renderer 	: upsize
							}, 
							{ 	header 		: 'LEFT FEET',
								dataIndex 	: 'leftstatus',
								flex 		: 1,
								renderer 	: upsize
							}, 
							{ 	header 		: 'LEFT FEET <br> ( &ohm; )',
								dataIndex 	: 'leftfeet',
								flex 		: 1,
								renderer 	: upsize,
								hidden 	 	: true
							}, 
							{ 	header 		: 'RIGHT FEET',
								dataIndex 	: 'rightstatus',
								flex 	 	: 1,
								renderer 	: upsize
							}, 
							{ 	header 		: 'RIGHT FEET <br> ( &ohm; )',
								dataIndex 	: 'rightfeet',
								flex 		: 1,
								renderer 	: upsize,
								hidden 	 	: true
							}, 
							{ 	header 		: 'WIRST STRAP',
								dataIndex 	: 'wirststatus',
								flex 		: 1,
								renderer 	: upsize
							}, 
							{ 	header 		: 'WIRST VAL',
								dataIndex 	: 'wirstvalue',
								flex 		: 1,
								renderer 	: upsize,
								hidden 	 	: true
							}
						],
						bbar	: Ext.create('Ext.PagingToolbar', {
							pageSize		: itemperpage,
							store			: store_esd_ma,
							displayInfo		: true,
							displayMsg		: 'Data {0} - {1} from {2} data',
							emptyMsg		: "Page not found",
							beforePageText  : 'Page',
							afterPageText   : 'from {0} Pages',
							firstText       : 'First Page',
							prevText        : 'Previous Page',
							nextText        : 'Next page',
							lastText        : 'Last Page',
							plugins       	: Ext.create('Ext.ux.ProgressBarPager', {}),
							listeners 		: {
								afterrender: function (cmp) {
									cmp.getComponent("refresh").hide();
								}
							}
						}),
						//features: [filters],
						// selModel: {
						// 	selType: 'cellmodel'
						// },
						// plugins: [cellEditing]
					});
				// TORQUE
		        	var grid_torque_ma = Ext.create('Ext.grid.Panel', {
						id 					: 'grid_torque_ma',
						autoWidth 	 		: '100%',
						maxHeight	 		: 290,
						columnLines 		: true,
						store 				: store_torque_ma,
						autoScroll 			: true,
						viewConfig 			: {
							stripeRows 			: true,
							emptyText 			: '<div class="empty-txt">No data to display.</div>',
							deferEmptyText 		: false,
							enableTextSelection	: true
						},
						columns: [
							{ 	header 		: 'unid',
								dataIndex 	: 'unid',
								flex 		: 1,
								renderer 	: upsize,
								hidden 	 	: true
							}, 
							{ 	header 		: 'id',
								dataIndex 	: 'id',
								flex 		: 1,
								renderer 	: upsize,
								hidden 	 	: true
							}, 
							{ 	header 		: 'TIME',
								dataIndex 	: 'datetimein',
								flex 		: 1,
								renderer 	: upsize
							}, 
							{ 	header 		: 'CHANNEL',
								dataIndex 	: 'channel',
								flex 		: 1,
								renderer 	: upsize
							}, 
							{ 	header 		: 'MODE',
								dataIndex 	: 'mode',
								flex 		: 1,
								renderer 	: upsize
							}, 
							{ 	header 		: 'ROTATION',
								dataIndex 	: 'rotation',
								flex 		: 1,
								renderer 	: upsize
							}, 
							{ 	header 		: 'TORQUE',
								dataIndex 	: 'torque',
								flex 		: 1,
								renderer 	: upsize
							}, 
							{ 	header 		: 'UNIT',
								dataIndex 	: 'unit',
								flex 		: 1,
								renderer 	: upsize
							}, 
							{ 	header 		: 'RESULT',
								dataIndex 	: 'result',
								flex 		: 1,
								renderer 	: upsize
							}
						],
						bbar	: Ext.create('Ext.PagingToolbar', {
							pageSize		: itemperpage,
							store			: store_torque_ma,
							displayInfo		: true,
							displayMsg		: 'Data {0} - {1} from {2} data',
							emptyMsg		: "Page not found",
							beforePageText  : 'Page',
							afterPageText   : 'from {0} Pages',
							firstText       : 'First Page',
							prevText        : 'Previous Page',
							nextText        : 'Next page',
							lastText        : 'Last Page',
							plugins       	: Ext.create('Ext.ux.ProgressBarPager', {}),
							listeners 		: {
								afterrender: function (cmp) {
									cmp.getComponent("refresh").hide();
								}
							}
						}),
						//features: [filters],
						// selModel: {
						// 	selType: 'cellmodel'
						// },
						// plugins: [cellEditing]
					});
				// TEMPERATURE
		        	var grid_temperature_ma = Ext.create('Ext.grid.Panel', {
						id 				: 'grid_temperature_ma',
						autoWidth 	 	: '100%',
						maxHeight	 	: 290,
						columnLines 	: true,
						store 			: store_temperature_ma,
						viewConfig 		: {
							stripeRows 			: true,
							emptyText 		 	: '<div class="empty-txt">No data to display.</div>',
							deferEmptyText 		: false,
							enableTextSelection : true
						},
						columns: [
							{	header 		: 'unid',
								dataIndex 	: 'unid',
								flex 		: 1,
								renderer 	: upsize,
								hidden		: true
							},
							{	header 		: 'id',
								dataIndex 	: 'id',
								flex 		: 1,
								renderer 	: upsize,
								hidden		: true
							},
							{	header 		: 'MCH NAME',
								dataIndex 	: 'faddres',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'Instid',
								dataIndex 	: 'Instid',
								flex 		: 1,
								renderer 	: upsize,
								hidden		: true
							},
							{	header 		: 'grno',
								dataIndex 	: 'grno',
								flex 		: 1,
								renderer 	: upsize,
								hidden		: true
							},
							{	header 		: 'measid',
								dataIndex 	: 'measid',
								flex 		: 1,
								renderer 	: upsize,
								hidden		: true
							},
							{	header 		: 'TEMPERATURE <br> ( &deg;C )',
								dataIndex 	: 'temp',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'TIME',
								dataIndex 	: 'datetimein',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'STATUS',
								dataIndex 	: 'status',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'UPLOADED BY',
								dataIndex 	: 'picupload',
								flex 		: 1,
								renderer 	: upsize,
								hidden		: true
							}
						],
						// bbar	: Ext.create('Ext.PagingToolbar', {
						// 	pageSize		: itemperpage,
						// 	store			: store_temperature_ma,
						// 	displayInfo		: true,
						// 	displayMsg		: 'Data {0} - {1} from {2} data',
						// 	emptyMsg		: "Page not found",
						// 	beforePageText  : 'Page',
						// 	afterPageText   : 'from {0} Pages',
						// 	firstText       : 'First Page',
						// 	prevText        : 'Previous Page',
						// 	nextText        : 'Next page',
						// 	lastText        : 'Last Page',
						// 	plugins       	: Ext.create('Ext.ux.ProgressBarPager', {}),
						// 	listeners 		: {
						// 		afterrender: function (cmp) {
						// 			cmp.getComponent("refresh").hide();
						// 		}
						// 	}
						// }),
						//features: [filters],
						// selModel: {
						// 	selType: 'cellmodel'
						// },
						// plugins: [cellEditing]
					});
					var grid_temperature_smt = Ext.create('Ext.grid.Panel', {
						id 				: 'grid_temperature_smt',
						autoWidth 	 	: '100%',
						maxHeight	 	: 290,
						columnLines 	: true,
						store 			: store_temperature_smt,
						viewConfig 		: {
							stripeRows 			: true,
							emptyText 		 	: '<div class="empty-txt">No data to display.</div>',
							deferEmptyText 		: false,
							enableTextSelection : true
						},
						columns: [
							
							{	header 		: 'unid',
								dataIndex 	: 'unid',
								flex 		: 1,
								renderer 	: upsize,
								hidden		: true
							},
							{	header 		: 'id',
								dataIndex 	: 'id',
								flex 		: 1,
								renderer 	: upsize,
								hidden		: true
							},
							{	header 		: 'MCH NAME',
								dataIndex 	: 'faddres',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'Instid',
								dataIndex 	: 'Instid',
								flex 		: 1,
								renderer 	: upsize,
								hidden		: true
							},
							{	header 		: 'grno',
								dataIndex 	: 'grno',
								flex 		: 1,
								renderer 	: upsize,
								hidden		: true
							},
							{	header 		: 'measid',
								dataIndex 	: 'measid',
								flex 		: 1,
								renderer 	: upsize,
								hidden		: true
							},
							{	header 		: 'TEMPERATURE <br> ( &deg;C )',
								dataIndex 	: 'temp',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'TIME',
								dataIndex 	: 'datetimein',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'STATUS',
								dataIndex 	: 'status',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'UPLOADED BY',
								dataIndex 	: 'picupload',
								flex 		: 1,
								renderer 	: upsize,
								hidden		: true
							}
						],
						// bbar	: Ext.create('Ext.PagingToolbar', {
						// 	pageSize		: itemperpage,
						// 	store			: store_temperature_smt,
						// 	displayInfo		: true,
						// 	displayMsg		: 'Data {0} - {1} from {2} data',
						// 	emptyMsg		: "Page not found",
						// 	beforePageText  : 'Page',
						// 	afterPageText   : 'from {0} Pages',
						// 	firstText       : 'First Page',
						// 	prevText        : 'Previous Page',
						// 	nextText        : 'Next page',
						// 	lastText        : 'Last Page',
						// 	plugins       	: Ext.create('Ext.ux.ProgressBarPager', {}),
						// 	listeners 		: {
						// 		afterrender: function (cmp) {
						// 			cmp.getComponent("refresh").hide();
						// 		}
						// 	}
						// }),
						//features: [filters],
						// selModel: {
						// 	selType: 'cellmodel'
						// },
						// plugins: [cellEditing]
					});
				//	PARTICLEDUSTY
					var grid_particle = Ext.create('Ext.grid.Panel', {
						id 				: 'grid_particle',
						autoWidth 	 	: '100%',
						maxHeight	 	: 330,
						columnLines 	: true,
						store 			: store_particle,
						viewConfig 		: {
							stripeRows 			: true,
							emptyText 		 	: '<div class="empty-txt">No data to display.</div>',
							deferEmptyText 		: false,
							enableTextSelection : true
						},
						columns: [
							{	header 		: 'id',
								dataIndex 	: 'id',
								flex 		: 1,
								renderer 	: upsize,
								hidden		: true
							},
							{	header 		: 'DATE INSP',
								dataIndex 	: 'dateinspection',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'TIME',
								dataIndex 	: 'datetimein',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'MCH NAME',
								dataIndex 	: 'mchname',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'MODEL',
								dataIndex 	: 'model',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'SERIAL',
								dataIndex 	: 'serial',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'ALM',
								dataIndex 	: 'alm',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'TEMPERATURE <br> ( &deg;C )',
								dataIndex 	: 't_ch1',
								width 		: 120,
								renderer 	: upsize
							},
							{	header 		: 'PARTICLE <br> ( <i class="fas fa-tint"></i> )',
								dataIndex 	: 'h_ch2',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'PARTICLE <br> ( <i class="fas fa-tint"></i> )',
								dataIndex 	: 'h_ch3',
								flex 		: 1,
								renderer 	: upsize,
								hidden		: true
							},
							{	header 		: 'ALM1',
								dataIndex	: 'alm1',
								flex 		: 1,
								renderer	: upsize
							},
							{	header 		: 'ALM2',
								dataIndex 	: 'alm2',
								flex 		: 1,
								renderer 	: upsize
							},
							{	header 		: 'inputdate',
								dataIndex 	: 'inputdate',
								flex 		: 1,
								renderer 	: upsize,
								hidden		: true
							}
						],
						bbar	: Ext.create('Ext.PagingToolbar', {
							pageSize		: itemperpage,
							store			: store_particle,
							displayInfo		: true,
							displayMsg		: 'Data {0} - {1} from {2} data',
							emptyMsg		: "Page not found",
							beforePageText  : 'Page',
							afterPageText   : 'from {0} Pages',
							firstText       : 'First Page',
							prevText        : 'Previous Page',
							nextText        : 'Next page',
							lastText        : 'Last Page',
							plugins       	: Ext.create('Ext.ux.ProgressBarPager', {}),
							listeners 		: {
								afterrender: function (cmp) {
									cmp.getComponent("refresh").hide();
								}
							}
						}),
						//features: [filters],
						// selModel: {
						// 	selType: 'cellmodel'
						// },
						// plugins: [cellEditing]
					});
						
		//	=======================================================    PANEL    =========================================
			
					var panel_thermo = Ext.create('Ext.tab.Panel', {
						id 			: 'panel_thermo',
						renderTo 	: 'panel_thermo',
						plain 		: true,
						activeTab 	: 0,
						autoWidth 	: '100%',
						height		: 350,
						autoScroll 	: true,
						frame 		: true,
						//style 	: 'padding:5px;-background:#157FCC;',
						tabBar		: {
							flex	: 1,
							layout	: {
								pack 	: 'center',
								align 	: 'stretch'
							}
						},
						items 		: [
							{	title 		: 'SMT LINE 1-3',
							 	id  		: 'show_grid_thermo_smt1',
								reorderable : false,
								layout 		: 'fit',
								items 		: [grid_thermo_smt1]
							}, 
							{	title 		: 'SMT LINE 4-8',
							 	id  		: 'show_grid_thermo_smt2',
								reorderable : false,
								layout 		: 'fit',
								items 		: [grid_thermo_smt2]
							}, 
							{	title 		: 'SMT LINE 09-13',
							 	id  		: 'show_grid_thermo_smt3',
								reorderable : false,
								layout 		: 'fit',
								items 		: [grid_thermo_smt3]
							}, 
							{	title 		: 'SMT SPAREPART',
							 	id  		: 'show_grid_thermo_smtsparepart',
								reorderable : false,
								layout 		: 'fit',
								items 		: [grid_thermo_smtsparepart]
							}, 
							{	title 		: 'MC IC TRAY',
							 	id  		: 'show_grid_thermo_mc_ictray',
								reorderable : false,
								layout 		: 'fit',
								items 		: [grid_thermo_mc_ictray]
							}, 
							{	title 		: 'MC WAREHOUSE',
							 	id  		: 'show_grid_thermo_mc_warehouse',
								reorderable : false,
								layout 		: 'fit',
								items 		: [grid_thermo_mc_warehouse]
							}, 
							{	title 		: 'MA LINE 16',
							 	id  		: 'show_grid_thermo_mc_maline16',
								reorderable : false,
								layout 		: 'fit',
								items 		: [grid_thermo_maline16]
							}, 
							{	title 		: 'MA LINE 17',
							 	id  		: 'show_grid_thermo_mc_maline17',
								reorderable : false,
								layout 		: 'fit',
								items 		: [grid_thermo_maline17]
							}
						]
					});
					var panel_esd = Ext.create('Ext.panel.Panel', {
						id 				:'panel_esd',
						renderTo 		: 'panel_esd',
						autoWidth		: '100%',
						maxHeight		: 450,
						// border			: false,
						// frame			: true,
						// hidden			: false,
						// defaults		: {
						// 	split		: true,
						// 	collapsible	: false
						// },
						items			: [grid_esd_ma]
					});
					var panel_torque = Ext.create('Ext.panel.Panel', {
						id 				:'panel_torque',
						renderTo 		: 'panel_torque',
						autoWidth		: '100%',
						maxHeight		: 290,
						border			: false,
						frame			: true,
						hidden			: false,
						defaults		: {
							split		: true,
							collapsible	: false
						},
						items			: [grid_torque_ma]
					});
					var panel_temperature = Ext.create('Ext.tab.Panel', {
						id 			: 'panel_temperature',
						renderTo 	: 'panel_temperature',
						plain 		: true,
						activeTab 	: 0,
						autoWidth 	: '100%',
						height		: 340,
						autoScroll 	: true,
						frame 		: true,
						//style 	: 'padding:5px;-background:#157FCC;',
						tabBar		: {
							flex	: 1,
							layout	: {
								pack 	: 'center',
								align 	: 'stretch'
							}
						},
						items 		: [
							{	title 		: 'MA',
							 	id  		: 'show_grid_temperature_ma',
								reorderable : false,
								items 		: [grid_temperature_ma]
							}, 
							{	title 		: 'SMT',
							 	id  		: 'show_grid_temperature_smt',
								reorderable : false,
								items 		: [grid_temperature_smt]
							}
						]
					});
					var panel_dusty = Ext.create('Ext.panel.Panel', {
						id 				:'panel_dusty',
						renderTo 		: 'panel_dusty',
						autoWidth		: '100%',
						maxHeight		: 360,
						border			: false,
						frame			: true,
						hidden			: false,
						defaults		: {
							split		: true,
							collapsible	: false
						},
						items			: [grid_particle]
					});


		//	=======================================================    POPUP SEARCH DATA    =============================
				// Ext.create('Ext.form.field.Date',{
					// 	renderTo 	: src_measurement_date,
					// 	width 		: '100%',
					// 	id 			: 'src_measurement_date',
					// 	name 		: 'src_measurement_date',
					// 	fieldCls	: 'biggertext',
					// 	emptyText	: 'Search Date',
					// 	margins		: '0 6 0 0',
					// 	height 		: 30,
					// 	flex		: 1,
					// 	format		: 'd F Y',
					// 	submitFormat: 'Y-m-d',
					// 	mode		: 'local',  
					// 	value 		: new Date(),
					// 	editable 	: false,
					// 	listeners	: {
					// 			afterrender : function() {
					// 				this.inputEl.setStyle('text-align', 'center');
					// 				this.inputEl.setStyle('backgroundColor', '#0067AE');
					// 				this.inputEl.setStyle('color', '#fff');
					// 				this.inputEl.setStyle('fontSize', '20px');
					// 				var me = this,
					// 		            inputElement = me.inputElement;
							 
					// 		        if (inputElement && inputElement.dom.focus) {
					// 		            inputElement.dom.focus();
					// 		        }
					// 		        return me;
					// 			},
					// 			specialkey : function(field, e) {
					// 				if (e.getKey() == 13) {
					// 					var measurement_date = Ext.getCmp('src_measurement_date').getValue();
										
					// 					if (!measurement_date) {
					// 						Ext.Msg.alert('Warning', 'Measurement date cannot be null !!!');
					// 					} else {
					// 						store_thermo_smt.proxy.setExtraParam('measurement_date', measurement_date);
					// 						store_thermo_smt.loadPage(1);

					// 						store_thermo_ma.proxy.setExtraParam('measurement_date', measurement_date);
					// 						store_thermo_ma.loadPage(1);

					// 						store_esd_ma.proxy.setExtraParam('measurement_date', measurement_date);
					// 						store_esd_ma.loadPage(1);

					// 						store_torque_ma.proxy.setExtraParam('measurement_date', measurement_date);
					// 						store_torque_ma.loadPage(1);
											
					// 						store_temperature_ma.proxy.setExtraParam('measurement_date', measurement_date);
					// 						store_temperature_ma.loadPage(1);
											
					// 						store_temperature_smt.proxy.setExtraParam('measurement_date', measurement_date);
					// 						store_temperature_smt.loadPage(1);
										
					// 					}
					// 				}
					// 			},
					// 			change: function() {
					// 				var measurement_date = Ext.getCmp('src_measurement_date').getValue();
										
					// 					if (!measurement_date) {
					// 						Ext.Msg.alert('Warning', 'Measurement date cannot be null !!!');
					// 					} else {
					// 						store_thermo_smt.proxy.setExtraParam('measurement_date', measurement_date);
					// 						store_thermo_smt.loadPage(1);

					// 						store_thermo_ma.proxy.setExtraParam('measurement_date', measurement_date);
					// 						store_thermo_ma.loadPage(1);

					// 						store_esd_ma.proxy.setExtraParam('measurement_date', measurement_date);
					// 						store_esd_ma.loadPage(1);

					// 						store_torque_ma.proxy.setExtraParam('measurement_date', measurement_date);
					// 						store_torque_ma.loadPage(1);

					// 						store_temperature_ma.proxy.setExtraParam('measurement_date', measurement_date);
					// 						store_temperature_ma.loadPage(1);
											
					// 						store_temperature_smt.proxy.setExtraParam('measurement_date', measurement_date);
					// 						store_temperature_smt.loadPage(1);
					// 					}
					// 			}
					// 		}
					// });
				
				// THERMOHUMIDITY
		        	Ext.create('Ext.form.field.Date',{
						renderTo 	: src_thermohumidity,
						width 		: '100%',
						id 			: 'src_thermohumidity',
						name 		: 'src_thermohumidity',
						fieldCls	: 'biggertext',
						emptyText	: 'Search Date',
						margins		: '0 6 0 0',
						height 		: 25,
						flex		: 1,
						format		: 'd F Y',
						submitFormat: 'Y-m-d',
						mode		: 'local',  
						value 		: new Date(),
						editable 	: false,
						listeners	: {
								afterrender : function() {
									this.inputEl.setStyle('text-align', 'center');
									this.inputEl.setStyle('backgroundColor', '#0067AE');
									this.inputEl.setStyle('color', '#fff');
									this.inputEl.setStyle('fontSize', '15px');
									var me = this,
							            inputElement = me.inputElement;
							 
							        if (inputElement && inputElement.dom.focus) {
							            inputElement.dom.focus();
							        }
							        return me;
								},
								specialkey : function(field, e) {
									if (e.getKey() == 13) {
										var measurement_date = Ext.getCmp('src_thermohumidity').getValue();
										
										if (!measurement_date) {
											Ext.Msg.alert('Warning', 'Measurement date cannot be null !!!');
										} else {
											store_thermo_smt1.proxy.setExtraParam('measurement_date', measurement_date);
											store_thermo_smt1.proxy.setExtraParam('loc', 'smt1');
											store_thermo_smt1.loadPage(1);

											store_thermo_smt2.proxy.setExtraParam('measurement_date', measurement_date);
											store_thermo_smt2.proxy.setExtraParam('loc', 'smt2');
											store_thermo_smt2.loadPage(1);
											
											store_thermo_smt3.proxy.setExtraParam('measurement_date', measurement_date);
											store_thermo_smt3.proxy.setExtraParam('loc', 'smt3');
											store_thermo_smt3.loadPage(1);
											
											store_thermo_smtsparepart.proxy.setExtraParam('measurement_date', measurement_date);
											store_thermo_smtsparepart.proxy.setExtraParam('loc', 'smtsparepart');
											store_thermo_smtsparepart.loadPage(1);
											
											store_thermo_mc_ictray.proxy.setExtraParam('measurement_date', measurement_date);
											store_thermo_mc_ictray.proxy.setExtraParam('loc', 'mc_ictray');
											store_thermo_mc_ictray.loadPage(1);

											store_thermo_mc_warehouse.proxy.setExtraParam('measurement_date', measurement_date);
											store_thermo_mc_warehouse.proxy.setExtraParam('loc', 'mc_warehouse');
											store_thermo_mc_warehouse.loadPage(1);

											store_thermo_maline16.proxy.setExtraParam('measurement_date', measurement_date);
											store_thermo_maline16.proxy.setExtraParam('loc', 'maline16');
											store_thermo_maline16.loadPage(1);

											store_thermo_maline17.proxy.setExtraParam('measurement_date', measurement_date);
											store_thermo_maline17.proxy.setExtraParam('loc', 'maline17');
											store_thermo_maline17.loadPage(1);
										}
									}
								},
								change: function() {
									var measurement_date = Ext.getCmp('src_thermohumidity').getValue();
										
										if (!measurement_date) {
											Ext.Msg.alert('Warning', 'Measurement date cannot be null !!!');
										} else {

											store_thermo_smt1.proxy.setExtraParam('measurement_date', measurement_date);
											store_thermo_smt1.proxy.setExtraParam('loc', 'smt1');
											store_thermo_smt1.loadPage(1);

											store_thermo_smt2.proxy.setExtraParam('measurement_date', measurement_date);
											store_thermo_smt2.proxy.setExtraParam('loc', 'smt2');
											store_thermo_smt2.loadPage(1);
											
											store_thermo_smt3.proxy.setExtraParam('measurement_date', measurement_date);
											store_thermo_smt3.proxy.setExtraParam('loc', 'smt3');
											store_thermo_smt3.loadPage(1);
											
											store_thermo_smtsparepart.proxy.setExtraParam('measurement_date', measurement_date);
											store_thermo_smtsparepart.proxy.setExtraParam('loc', 'smtsparepart');
											store_thermo_smtsparepart.loadPage(1);
											
											store_thermo_mc_ictray.proxy.setExtraParam('measurement_date', measurement_date);
											store_thermo_mc_ictray.proxy.setExtraParam('loc', 'mc_ictray');
											store_thermo_mc_ictray.loadPage(1);

											store_thermo_mc_warehouse.proxy.setExtraParam('measurement_date', measurement_date);
											store_thermo_mc_warehouse.proxy.setExtraParam('loc', 'mc_warehouse');
											store_thermo_mc_warehouse.loadPage(1);

											store_thermo_maline16.proxy.setExtraParam('measurement_date', measurement_date);
											store_thermo_maline16.proxy.setExtraParam('loc', 'maline16');
											store_thermo_maline16.loadPage(1);

											store_thermo_maline17.proxy.setExtraParam('measurement_date', measurement_date);
											store_thermo_maline17.proxy.setExtraParam('loc', 'maline17');
											store_thermo_maline17.loadPage(1);
										}
								}
							}
					});
		        // ESD
		        	Ext.create('Ext.form.field.Date',{
						renderTo 	: src_esd,
						width 		: '100%',
						id 			: 'src_esd',
						name 		: 'src_esd',
						fieldCls	: 'biggertext',
						emptyText	: 'Search Date',
						margins		: '0 6 0 0',
						height 		: 25,
						flex		: 1,
						format		: 'd F Y',
						submitFormat: 'Y-m-d',
						mode		: 'local',  
						value 		: new Date(),
						editable 	: false,
						listeners	: {
								afterrender : function() {
									this.inputEl.setStyle('text-align', 'center');
									this.inputEl.setStyle('backgroundColor', '#0067AE');
									this.inputEl.setStyle('color', '#fff');
									this.inputEl.setStyle('fontSize', '15px');
									var me = this,
							            inputElement = me.inputElement;
							 
							        if (inputElement && inputElement.dom.focus) {
							            inputElement.dom.focus();
							        }
							        return me;
								},
								specialkey : function(field, e) {
									if (e.getKey() == 13) {
										var measurement_date = Ext.getCmp('src_esd').getValue();
										
										if (!measurement_date) {
											Ext.Msg.alert('Warning', 'Measurement date cannot be null !!!');
										} else {
											store_esd_ma.proxy.setExtraParam('measurement_date', measurement_date);
											store_esd_ma.loadPage(1);
										}
									}
								},
								change: function() {
									var measurement_date = Ext.getCmp('src_esd').getValue();
										
										if (!measurement_date) {
											Ext.Msg.alert('Warning', 'Measurement date cannot be null !!!');
										} else {
											store_esd_ma.proxy.setExtraParam('measurement_date', measurement_date);
											store_esd_ma.loadPage(1);
										}
								}
							}
					});
		        // TORQUE
		        	Ext.create('Ext.form.field.Date',{
						renderTo 	: src_torque,
						width 		: '100%',
						id 			: 'src_torque',
						name 		: 'src_torque',
						fieldCls	: 'biggertext',
						emptyText	: 'Search Date',
						margins		: '0 6 0 0',
						height 		: 25,
						flex		: 1,
						format		: 'd F Y',
						submitFormat: 'Y-m-d',
						mode		: 'local',  
						value 		: new Date(),
						editable 	: false,
						listeners	: {
								afterrender : function() {
									this.inputEl.setStyle('text-align', 'center');
									this.inputEl.setStyle('backgroundColor', '#0067AE');
									this.inputEl.setStyle('color', '#fff');
									this.inputEl.setStyle('fontSize', '15px');
									var me = this,
							            inputElement = me.inputElement;
							 
							        if (inputElement && inputElement.dom.focus) {
							            inputElement.dom.focus();
							        }
							        return me;
								},
								specialkey : function(field, e) {
									if (e.getKey() == 13) {
										var measurement_date = Ext.getCmp('src_torque').getValue();
										
										if (!measurement_date) {
											Ext.Msg.alert('Warning', 'Measurement date cannot be null !!!');
										} else {
											store_torque_ma.proxy.setExtraParam('measurement_date', measurement_date);
											store_torque_ma.loadPage(1);
										}
									}
								},
								change: function() {
									var measurement_date = Ext.getCmp('src_torque').getValue();
										
										if (!measurement_date) {
											Ext.Msg.alert('Warning', 'Measurement date cannot be null !!!');
										} else {
											store_torque_ma.proxy.setExtraParam('measurement_date', measurement_date);
											store_torque_ma.loadPage(1);
										}
								}
							}
					});
		        // TEMPERATURE
		        	Ext.create('Ext.form.field.Date',{
						renderTo 	: src_temperature,
						width 		: '100%',
						id 			: 'src_temperature',
						name 		: 'src_temperature',
						fieldCls	: 'biggertext',
						emptyText	: 'Search Date',
						margins		: '0 6 0 0',
						height 		: 25,
						flex		: 1,
						format		: 'd F Y',
						submitFormat: 'Y-m-d',
						mode		: 'local',  
						value 		: new Date(),
						editable 	: false,
						listeners	: {
								afterrender : function() {
									this.inputEl.setStyle('text-align', 'center');
									this.inputEl.setStyle('backgroundColor', '#0067AE');
									this.inputEl.setStyle('color', '#fff');
									this.inputEl.setStyle('fontSize', '15px');
									var me = this,
							            inputElement = me.inputElement;
							 
							        if (inputElement && inputElement.dom.focus) {
							            inputElement.dom.focus();
							        }
							        return me;
								},
								specialkey : function(field, e) {
									if (e.getKey() == 13) {
										var measurement_date = Ext.getCmp('src_temperature').getValue();
										
										if (!measurement_date) {
											Ext.Msg.alert('Warning', 'Measurement date cannot be null !!!');
										} else {
											store_temperature_ma.proxy.setExtraParam('measurement_date', measurement_date);
											store_temperature_ma.loadPage(1);
											
											store_temperature_smt.proxy.setExtraParam('measurement_date', measurement_date);
											store_temperature_smt.loadPage(1);
										
										}
									}
								},
								change: function() {
									var measurement_date = Ext.getCmp('src_temperature').getValue();
										
										if (!measurement_date) {
											Ext.Msg.alert('Warning', 'Measurement date cannot be null !!!');
										} else {
											store_temperature_ma.proxy.setExtraParam('measurement_date', measurement_date);
											store_temperature_ma.loadPage(1);
											
											store_temperature_smt.proxy.setExtraParam('measurement_date', measurement_date);
											store_temperature_smt.loadPage(1);
										}
								}
							}
					});
				// PARTICLE DUSTY
		        	Ext.create('Ext.form.field.Date',{
						renderTo 	: src_particle,
						width 		: '100%',
						id 			: 'src_particle',
						name 		: 'src_particle',
						fieldCls	: 'biggertext',
						emptyText	: 'Search Date',
						margins		: '0 6 0 0',
						height 		: 25,
						flex		: 1,
						format		: 'd F Y',
						submitFormat: 'Y-m-d',
						mode		: 'local',  
						value 		: new Date(),
						editable 	: false,
						listeners	: {
								afterrender : function() {
									this.inputEl.setStyle('text-align', 'center');
									this.inputEl.setStyle('backgroundColor', '#0067AE');
									this.inputEl.setStyle('color', '#fff');
									this.inputEl.setStyle('fontSize', '15px');
									var me = this,
							            inputElement = me.inputElement;
							 
							        if (inputElement && inputElement.dom.focus) {
							            inputElement.dom.focus();
							        }
							        return me;
								},
								specialkey : function(field, e) {
									if (e.getKey() == 13) {
										var measurement_date = Ext.getCmp('src_particle').getValue();
										
										if (!measurement_date) {
											Ext.Msg.alert('Warning', 'Measurement date cannot be null !!!');
										} else {
											store_particle.proxy.setExtraParam('measurement_date', measurement_date);
											store_particle.loadPage(1);
										}
									}
								},
								change: function() {
									var measurement_date = Ext.getCmp('src_particle').getValue();
										
										if (!measurement_date) {
											Ext.Msg.alert('Warning', 'Measurement date cannot be null !!!');
										} else {
											store_particle.proxy.setExtraParam('measurement_date', measurement_date);
											store_particle.loadPage(1);
										}
								}
							}
					});

		//	==** end **==

	});


