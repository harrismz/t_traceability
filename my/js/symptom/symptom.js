Ext.application({

    name: 'SymptomApp',

    //appFolder : 'my.js.symptom',

    extend: 'Ext.app.Application',
    // quickTips: true,
    //
     requires: [
        'my.js.symptom.app.view.GridSymptom'
     ],
    //
    // platformConfig: {
    //     desktop: {
    //         quickTips: true
    //     }
    // },
    //
    // stores: [
    //     // TODO: add global / shared stores here
    //     // 'Mastermodels',
    //     // 'Schedules',
    //     // 'Histories',
    //     // 'ScheduleMasters',
    //     // 'ScheduleDates',
    //     // 'Sides',
    //     // 'Codes'
    // ],

    launch: function () {

        Ext.create('Ext.panel.Panel', {
          id 				:'panel_symptom',
          renderTo 	: 'panel-symptom',
          border		: false,
          width			: '100%',
          height		: 80,
          frame			: true,
          hidden		: false,
          defaults	: {
            split				: true,
            collapsible	: false
          },
          items			: [{
            xtype: 'grid-symptom'
          }]
        });
    },

    // onAppUpdate: function () {
    //     Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
    //         function (choice) {
    //             if (choice === 'yes') {
    //                 window.location.reload();
    //             }
    //         }
    //     );
    // }
})
