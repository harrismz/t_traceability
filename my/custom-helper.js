
Ext.custom = {}

Ext.custom.getGridItems = function (colName) {
    console.log({
        colName
    })
    // prepared the function 
    var task = new Ext.util.DelayedTask(function(self, event, opts){
        console.log({self, event, opts})
        var grid        = self.up("grid");
        var store       = grid.getStore();
        var gridCol     = self.up();
        var dataIndex   = gridCol.dataIndex;

        if( self.value != undefined ){
            /* remove index ngeremote filter id */
            store.setRemoteFilter(true); //biar ngeload
            /* override encode filters store */

            store.removeFilter(dataIndex);
            
            store.addFilter({
                id           : dataIndex,
                property     : dataIndex,
                value         : self.value,
                anyMatch      : true,
                caseSensitive : false
            }); 
            

        }
    }, this);

    return {
        xtype:'textfield',
        margin : 4,
        id : 'search-' + colName,
        emptyText : 'Search',
        enableKeyEvents: true,
        listeners: {
            keyup: function (self, event, opts){
                if(event.getCharCode() !== Ext.EventObject.TAB ){
                    /* debounce the task function 500 mili second */
                    task.delay(500, null, null, [ self, event, opts ])
                }
            }
        } 
    }

}