Ext.define('my.js.errorfinder.app.view.PanacimModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.model-panacim',
    data: {
        name: 'App',
        fieldLabel : 'Panacim Xls',
    },

    stores : {
    	panacims : {
    		type:'panacims',
    	}
    }

});
