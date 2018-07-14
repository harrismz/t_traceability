Ext.define('my.js.symptom.app.view.GridSymptom',  {
    extend: 'Ext.grid.Panel',
    id : 'grid_symptom',
    xtype : 'grid-symptom',
    store : store_symptom,
    columns : [
      { header : 'Reject Date', flex:1},
      { header : 'Line Name', flex:1},
      { header : 'Model Name', flex:1},
      { header : 'Lot Size', flex:1},
      { header : 'Start Serial', flex:1},
      { header : 'Defected Cause', flex:1},
      { header : 'Place Disposal', flex:1},
      { header : 'Total Reject', flex:1}
    ]
  });
