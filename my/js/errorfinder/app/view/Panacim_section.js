Ext.define('my.js.errorfinder.app.view.Panacim_section', {
    extend: 'Ext.form.Panel',
    
    requires :[
    	// model
        'my.js.errorfinder.app.view.PanacimModel',

        // store
        // controller
        'my.js.errorfinder.app.view.PanacimController',

        // view
        'my.js.errorfinder.app.view.oll.Upload_info',
        'my.js.errorfinder.app.view.oll.Upload_form',
        
    ],

    xtype: 'panacim-section',

    controller: 'panacim-controller',
	
    viewModel: { type : 'model-panacim' },
	// bodyPadding: 10,
    plugins: 'responsive',
    
    responsiveConfig: {
        landscape: {
            tabPosition: 'left'
        },
        portrait: {
           tabPosition: 'top'
        }
    },

    defaults : {
    	margin : 5,
    	anchor: '100%',
        labelWidth: 120,
    },

    items :[
        {
            xtype : 'upload-info',
        },
    	{
            xtype: 'upload-form',
            name: 'panacim',
            cls : 'form-control'
            
        }, {
            xtype : 'panel',
            title: 'RESULT'
        }
    ],

    

});
