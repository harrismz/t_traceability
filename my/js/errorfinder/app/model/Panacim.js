Ext.define('my.js.errorfinder.app.model.Panacim',{
	extend: 'Ext.data.Model',
     fields: [
		{name: 'machine', type: 'string'},
		{name: 'feeder_barcode',  type: 'string'},
		{name: 'material_barcode',       type: 'int'},
		{name: 'part_number',  type: 'string'},
		{name: 'z_/_pu_number',  type: 'string'},

		{name: 'vendor_no', type: 'string'},
		{name: 'lot_no',  type: 'string'},
		{name: 'pickup_count',       type: 'int'},
		{name: 'placement_count',  type: 'string'},

		{name: 'pickup_miss_count', type: 'string'},
		{name: 'thick_error',  type: 'string'},
		{name: 'recognition_error_count',       type: 'int'},
		{name: 'placement_error',  type: 'string'},

		{name: 'part_drop_error',       type: 'int'},
		{name: 'transfer_unit_part_drop_error',  type: 'string'},
		
     ]
})