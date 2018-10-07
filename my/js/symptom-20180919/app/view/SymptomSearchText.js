// Ext.define('my.js.symptom.app.view.SymptomSearchText',{
//   extend : 'Ext.form.Panel',

//   plugins : 'responsive',

//   xtype: 'symptom-search',

//   items : [
//     {
// 			xtype		: 'radiogroup',
// 			fieldLabel	: 'Production',
// 			id			: 'rbprod',
// 			columns		: 1,
// 			vertical	: true,
// 			items		: [
// 				{
// 					boxLabel	: 'MA Quality',
// 					name		: 'srcprod',
// 					checked		: true,
// 					inputValue	: 'ma'
// 				},{
// 					boxLabel	: 'MECHA Quality',
// 					name		: 'srcprod',
// 					inputValue	: 'mecha'
// 				}
// 			],
// 			listeners	: {
// 				change : function(){
// 					var rbprod = Ext.getCmp('rbprod').getValue()['srcprod'];
// 					if(rbprod == 'ma'){
// 						Ext.getCmp('symptom').setValue('LCD');
// 					}
// 					else{
// 						Ext.getCmp('symptom').setValue('GEAR');
// 					}
// 				}
// 			}
// 		},{
// 			xtype		: 'numberfield',
// 			id			: 'valstyear',
// 			name		: 'valstyear',
// 			fieldLabel  : 'Start Year',
// 			width		: '100%',
// 			value		: new Date().getFullYear(),
// 			maxValue	: 9999
// 		},{
// 			xtype		: 'numberfield',
// 			id			: 'valenyear',
// 			name		: 'valenyear',
// 			fieldLabel  : 'End Year',
// 			width		: '100%',
// 			value		: new Date().getFullYear(),
// 			maxValue	: 9999,
// 			listeners	: {
// 				change	: function() {
// 					var valyear = Ext.getCmp('valstyear').getValue();
// 					Ext.getCmp('valenyear').setMinValue(valyear);
// 				}
// 			}
// 		},{
// 			xtype		: 'textfield',
// 			fieldLabel  : 'Symptom',
// 			id          : 'symptom',
// 			name        : 'symptom',
// 			width		: '100%',
// 			value		: 'LCD',
// 			listeners	: {
// 				change	: function(f,new_val) {
// 					f.setValue(new_val.toUpperCase());
// 				}
// 			}
// 		// },{
// 		// 	xtype       : 'button',
// 		// 	id          : 'btn-src4',
// 		// 	name        : 'btn-src4',
// 		// 	iconCls     : 'search',
// 		// 	iconAlign	: 'top',
// 		// 	text		: 'SEARCH',
// 		// 	width		: '100%',
// 		// 	scale		: 'small',
// 		// 	formBind	: true,
// 		// 	handler		: function(){
// 		// 		var rbprod = Ext.getCmp('rbprod').getValue()['srcprod'];
//     //
// 		// 		if(rbprod == 'ma'){
// 		// 			//	for ma data
// 		// 			symptom.proxy.setExtraParam('valstyear',	Ext.getCmp('valstyear').getValue());
// 		// 			symptom.proxy.setExtraParam('valenyear',	Ext.getCmp('valenyear').getValue());
// 		// 			symptom.proxy.setExtraParam('valsymptom',	Ext.getCmp('symptom').getValue());
// 		// 			symptom.proxy.setExtraParam('valrbprod',	rbprod);
// 		// 			symptom.loadPage(1);
// 		// 		}
// 		// 		else{
// 		// 			//	for mecha data
// 		// 			symptom.proxy.setExtraParam('valstyear',	Ext.getCmp('valstyear').getValue());
// 		// 			symptom.proxy.setExtraParam('valenyear',	Ext.getCmp('valenyear').getValue());
// 		// 			symptom.proxy.setExtraParam('valsymptom',	Ext.getCmp('symptom').getValue());
// 		// 			symptom.proxy.setExtraParam('valrbprod',	rbprod);
// 		// 			symptom.loadPage(1);
// 		// 		}
// 		// 	}
// 		// }
//   ]

// });
