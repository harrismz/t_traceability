Ext.define('my.js.errorfinder.app.view.Info_section', {
    extend: 'Ext.form.Panel',
    
    require :[
    	// model

    	// store

    ],

    plugins: 'responsive',

    xtype: 'info-section',
	
	// bodyPadding: 10,

    defaults : {
    	margin : 5,
    	anchor: '100%',
        labelWidth: 120,
    },

    items :[
    	{
            xtype: 'textfield',
            name: 'model_name',
            fieldLabel: 'Model Name',
            allowBlank: false,
            enableKeyEvents: true,
            emptyText : 'Type and Enter',
            
        },{
            xtype: 'textfield',
            name: 'part_location',
            fieldLabel: 'Part Location',
            allowBlank: false,
            enableKeyEvents: true,
            emptyText : 'Part Location',
            
        },{
            xtype: 'textfield',
            name: 'board_no',
            fieldLabel: 'Board Number',
            allowBlank: false,
            enableKeyEvents: true,
            emptyText : 'Board Number',
            
        },{
            xtype: 'textfield',
            name: 'process',
            fieldLabel: 'Process',
            allowBlank: false,
            enableKeyEvents: true,
            emptyText : 'Process',
            
        },{
            xtype: 'textfield',
            name: 'prod_no',
            fieldLabel: 'Production Number',
            allowBlank: false,
            enableKeyEvents: true,
            emptyText : 'Production Number',
            // cls: 'form-control'
        },{
            xtype: 'textfield',
            name: 'start_serial',
            fieldLabel: 'Start Serial',
            allowBlank: false,
            enableKeyEvents: true,
            emptyText : 'Start Serial',
            
        },{
            xtype: 'textfield',
            name: 'board_id',
            fieldLabel: 'Board Id',
            allowBlank: false,
            enableKeyEvents: true,
            emptyText : 'Board Id',
            // cls: 'form-control'
        },
    ],

    buttons: [{
    	xtype 	: 'button',
    	name 	: 'submit-button',
    	text 	: 'Submit'
    }],

});
