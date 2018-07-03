
Ext.application({
    extend: 'Ext.app.Application',

    name: 'App',

    quickTips: true,

    requires: [
        'my.js.errorfinder.app.view.List',
        'my.js.errorfinder.app.view.Info_section',

    ],

    platformConfig: {
        desktop: {
            quickTips: true
        }
    },

    stores: [
        // TODO: add global / shared stores here
        // 'Mastermodels',
        // 'Schedules',
        // 'Histories',
        // 'ScheduleMasters',
        // 'ScheduleDates',
        // 'Sides',
        // 'Codes'
    ],

    launch: function () {

        Ext.create({
            renderTo:'info-section',
            cls : 'x_panel',
            title: 'Info',
            xtype: 'info-section',
        });


        


    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
})