Ext.define('my.js.errorfinder.app.view.Info_section', {
    extend: 'Ext.form.Panel',
    
    requires :[
    	// model

    	// store

        // controller
        'my.js.errorfinder.app.view.InfoController',
    ],

    plugins: 'responsive',

    xtype: 'info-section',

    controller: 'info-controller',
	
	// bodyPadding: 10,

    defaults : {
    	margin : 5,
    	anchor: '100%',
        labelWidth: 120,
    },

    items :[
    	{
            xtype: 'textfield',
            name: 'JOBMODELNAME',
            fieldLabel: 'Model Name',
            allowBlank: false,
            enableKeyEvents: true,
            emptyText : 'Type and Enter',
            
        },{
            xtype: 'textfield',
            name: 'JOBPWBNO',
            fieldLabel: 'PWB Number',
            allowBlank: false,
            enableKeyEvents: true,
            emptyText : 'PWB Number',
            
        },{
            xtype: 'textfield',
            name: 'process',
            fieldLabel: 'Process',
            allowBlank: false,
            enableKeyEvents: true,
            emptyText : 'Process',
            
        },{
            xtype: 'textfield',
            name: 'JOBSTARTSERIAL',
            fieldLabel: 'Start Serial',
            allowBlank: false,
            enableKeyEvents: true,
            emptyText : 'Start Serial',
            
        },/*{
            xtype: 'textfield',
            name: 'prod_no',
            fieldLabel: 'Production Number',
            allowBlank: false,
            enableKeyEvents: true,
            emptyText : 'Production Number',
            // cls: 'form-control'
        },*/{
            xtype: 'textfield',
            name: 'part_location',
            fieldLabel: 'Part Location',
            allowBlank: false,
            enableKeyEvents: true,
            emptyText : 'Part Location',
            
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
    	text 	: 'Submit',
        // formBind: true,
        listeners: {
            click: 'onButtonSubmit'
        },
    }]

});
