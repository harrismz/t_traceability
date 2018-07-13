Ext.define('my.js.errorfinder.app.view.PanacimModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.model-panacim',
    
    requires:[
        'my.js.errorfinder.app.store.Panacims'
    ],

    data: {
        name: 'App',
        fieldLabel : 'Panacim Xls',
        emptyText: 'Please Choose Panacim xls File ...'
    },

    stores : {
    	panacims : {
    		type:'panacims',
    	}
    }

});
