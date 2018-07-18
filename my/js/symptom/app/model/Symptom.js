Ext.define('my.js.symptom.app.model.Symptom',{
  extend  : 'Ext.data.Model',
  fields  : [
    {name : 'rejdate', type:'date'},
    {name : 'line_name', type:'string'},
    {name : 'model_name', type:'string'},
    {name : 'lot_size', type:'string'},
    {name : 'start_serial', type:'string'},
    {name : 'defcause', type:'string'},
    {name : 'plcdisp', type:'string'},
    {name : 'totrej', type:'int'}
  ]
});
