Ext.define('my.js.errorfinder.app.store.Schedules', {
    extend: 'Ext.data.Store',

    model: 'App.model.Schedule',

    alias: 'store.schedules',

    autoLoad: true,

    proxy: {
        type: 'rest',

        enablePaging:true,

        extraParams: {
            token : App.util.Config.getToken() //
        },

        url: 'http://'+App.util.Config.hostname()+'/big/public/api/schedule_details',
        
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    onCreateRecords: function(record, opt, success){
        // console.log({record,opt,  success})
        if (success) {
            Ext.Msg.alert('Success', 'Date Saved!');
        }else{
            var response = opt.error.response.responseText;
            response = JSON.parse(response);
            error = response.error.message;
            Ext.Msg.alert('Error', error );
        }
    }
});