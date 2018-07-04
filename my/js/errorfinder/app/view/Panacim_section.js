Ext.define('my.js.errorfinder.app.view.Panacim_section', {
    extend: 'Ext.form.Panel',
    
    requires :[
    	// model

    	// store

    ],

    xtype: 'panacim-section',
	
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
            xtype: 'filefield',
            name: 'panacim',
            fieldLabel: 'PANACIM .csv',
            cls : 'form-control'
            
        }, {
            xtype : 'panel',
            title: 'RESULT'
        }
    ],

    

});
