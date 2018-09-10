Ext.application({
    extend      : 'Ext.app.Application',
    name        : 'SymptomApp',
    //appFolder : 'my.js.symptom',
    // quickTips: true,
    requires    : [
      // model

      // stores
        // 'my.js.symptom.app.store.Symptoms',
      // grid
        'my.js.symptom.app.view.GridSymptom'
      // controller

    ],
    //
    // platformConfig: {
    //     desktop: {
    //         quickTips: true
    //     }
    // },
    //
    stores: [
    //     // TODO: add global / shared stores here
          //'Symptoms'
    //     // 'Mastermodels',
    //     // 'Schedules',
    //     // 'Histories',
    //     // 'ScheduleMasters',
    //     // 'ScheduleDates',
    //     // 'Sides',
    //     // 'Codes'
    ],

    launch: function () {

        // alert('hais')
           // alert(window.location.protocol+"//"+window.location.hostname+'/t_traceability/json/json_symptom.php')
          //alert(vars);
        Ext.create('Ext.panel.Panel', {
            id 				:'panel_symptom',
            renderTo 	: 'panel-symptom',
            width			: '100%',
            height		: 80,
            frame			: true,
            hidden		: false,
            defaults	: {
                split				: true,
                collapsible	: false
            },
            // tbar      :[
            //     {
            // 				xtype: 'button',
            // 				id: 'src_symptom',
            // 				name: 'src_symptom',
            // 				text: 'SEARCH',
            // 				iconCls: 'search',
            // 				scale: 'medium'
            // 				//handler: src_symptom
            // 		}
            // ],
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
