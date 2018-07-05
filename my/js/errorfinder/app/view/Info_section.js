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
            value : 'CB-XJ1122J01N',
        },{
            xtype: 'textfield',
            name: 'JOBPWBNO',
            fieldLabel: 'PWB Number',
            allowBlank: false,
            enableKeyEvents: true,
            emptyText : 'PWB Number',
            value : 'J7J-0170-20',
        },{
            xtype: 'textfield',
            name: 'process',
            fieldLabel: 'Process',
            allowBlank: false,
            enableKeyEvents: true,
            emptyText : 'Process',
            value : 'DM1'
        },{
            xtype: 'textfield',
            name: 'JOBSTARTSERIAL',
            fieldLabel: 'Start Serial',
            allowBlank: false,
            enableKeyEvents: true,
            emptyText : 'Start Serial',
            value : '301'
            
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
