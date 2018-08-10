


Ext.define('my.js.errorfinder.app.view.List', {
    extend: 'Ext.grid.Panel',
    
    xtype: 'panacim-list',

    viewConfig  : {
        stripeRows          : true,
        enableTextSelection : true
    },

    bind: {
        store : '{panacims}',
    },

    emptyText: 'No Data To Show',

    // layout : 'fit',
    frame: true,

    style:{
        'border-color': '#D0D0D0'
    },

    columns: [
        {   
            text : 'No',
            width : 50,
            align: 'center',
            xtype: 'rownumberer'
        },

        {
            text: 'Program Name',
            align:'center',
            dataIndex: 'program_name',
            flex: 2,
        },
        
        { 
            text: 'Machine Name',
            dataIndex: 'machine', 
            flex: 1,
            align: 'left', 
        },

        { 
            text: 'Feeder Address',
            dataIndex: 'z_/_pu_number', 
            flex: 1,
            align: 'left', 
        },

        {
            text: 'Feeder Barcode',
            dataIndex : 'feeder_barcode',
            flex : 1,
            align: 'left'
        },

        { 
            text: 'Part Number',
            dataIndex: 'part_number', 
            flex: 1,
            align: 'left', 
        },

        { 
            text: 'Pickup Miss',
            dataIndex: 'pickup_miss_count', 
            flex: 1,
            align: 'left', 
        },

        { 
            text: 'Recognition Errors',
            dataIndex: 'recognition_error_count', 
            flex: 1,
            align: 'left', 
        },
    ]

});