Ext.define('my.js.symptom.app.view.GridSymptomModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.model-symptom',

    requires: [
      "my.js.symptom.app.store.Symptoms"
    ],

    //
    data: {
        name: 'Symptom',
        fieldLabel : 'judul',
        emptyText: 'Please Choose Panacim xls File ...'
    },

    stores : {
    	symptoms : {
        type:'symptoms',
    	}
    }

});
