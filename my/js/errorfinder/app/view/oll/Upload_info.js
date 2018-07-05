/*
	OLL Section child view
*/

Ext.define('my.js.errorfinder.app.view.oll.Upload_info', {
	
	extend: 'Ext.panel.Panel',

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
            xtype: 'datefield',
            name: 'tanggal',
            fieldLabel: 'Tanggal',
            emptyText : 'Tanggal',
            
        },{
            xtype: 'textfield',
            name: 'machine_name',
            fieldLabel: 'Machine Name',
            emptyText : 'Machine Name',
            
        },{
            xtype: 'textfield',
            name: 'feeder_number',
            fieldLabel: 'Feeder Number',
            emptyText : 'Feeder Number',
            
        },{
            xtype: 'textfield',
            name: 'part_no',
            fieldLabel: 'Part Number',
            emptyText : 'Part Number',
            // cls: 'form-control'
        },
    ]
})