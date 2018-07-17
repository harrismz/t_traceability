Ext.define('my.js.errorfinder.app.view.Oll_section', {
    extend: 'Ext.form.Panel',
    
    requires :[
    	// model

    	// store

        // viewModel
        'my.js.errorfinder.app.view.OllModel',

        // child view
        'my.js.errorfinder.app.view.oll.Upload_form',
        'my.js.errorfinder.app.view.oll.Upload_info',

        // controller
        'my.js.errorfinder.app.view.OllController',
    ],

    xtype: 'oll-section',
	
	// bodyPadding: 10,
    plugins: 'responsive',

    controller: 'oll-controller',

    viewModel: { type : 'model-oll'},


    defaults : {
    	margin : 5,
    	anchor: '100%',
        labelWidth: 120,
    },

    items :[
        {
            xtype : 'textfield',
            fieldLabel: 'Please Find & Upload this file',
            readOnly : true,
            name : 'filename_info',
            cls : 'form-control',
        },{
            xtype : 'textfield',
            fieldLabel : 'Part Location',
            name: 'part_location',
            cls : 'form-control',
            // padding : '2 0 1 0',
            // bodyPadding: 0,
            // frame: true,
        },
        {
            xtype : 'upload-form'
        },{
            xtype : 'upload-info'
        },
    ],

    

});
