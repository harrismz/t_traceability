Ext.define('App.model.Mastermodel', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'name', type: 'auto' },
        { name: 'pwbno', type: 'auto' },
        { name: 'pwbname', type: 'auto' },
        { name: 'process', type: 'auto' },
        { name: 'code', type: 'auto' },
        { name: 'cavity', type: 'auto' },
        { name: 'side', type: 'auto' },
    	
    ]
    
});
