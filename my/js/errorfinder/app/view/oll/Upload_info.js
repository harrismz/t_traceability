/*
	OLL Section child view
*/

Ext.define('my.js.errorfinder.app.view.oll.Upload_info', {
	
	extend: 'Ext.panel.Panel',

    requires:[
        'my.js.errorfinder.app.view.oll.UploadInfoController'
    ],

    controller: 'upload-info-controller',

	xtype : 'upload-info',
            
    frame:true,
    
    layout : 'form',

    style :{
        'color' : 'red'
    },

    bodyPadding : '10px',

    bodyStyle : {
        // 'background-color' : 'grey'

    },

    defaults: {
        anchor: '100%',
        margin: 5,
        readOnly: true
    },
    
    items :[
        {
            xtype: 'textfield',
            name: 'tanggal',
            // id: 'tanggal',
            fieldLabel: 'Tanggal',
            emptyText : 'Tanggal',
            // value : '2018-07-05',
            
        },{
            xtype: 'textfield',
            name: 'program_name',
            fieldLabel: 'Program Name',
            emptyText : 'Program Name', 
        },{
            xtype: 'textfield',
            name: 'feeder_number',
            fieldLabel: 'Feeder Number',
            emptyText : 'Feeder Number',
            // value: 10013,
            
        },{
            xtype: 'textfield',
            name: 'part_no',
            fieldLabel: 'Part Number',
            emptyText : 'Part Number',
            // value : 'CK73HXR1A104K-9'
            // cls: 'form-control'
        },
    ]
})