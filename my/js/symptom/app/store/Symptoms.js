Ext.define('my.js.symptom.app.store.Symptoms',{
    extend  : 'Ext.data.Store',
    model   : 'my.js.symptom.app.model.Symptom',
    alias   : 'store.symptoms',
    autoLoad: true,
    proxy   : {
        type    : 'ajax',
      //  url     : window.location.protocol+"//"+window.location.host+'/json/json_symptom.php',
  		  reader  : {
    			  type   : 'json',
    			  root   : 'rows'
        },
    }
});

// Ext.create('Ext.data.Store', {
//   	model    : 'symptom_data',
//   	autoLoad : false,
//   	proxy    : {
//   		  type    : 'ajax',
//   		  url     : 'json/json_symptom.php',
//   		  reader  : {
//     			  type   : 'json',
//     			  root   : 'rows'
//   		}
// 	}
// });
