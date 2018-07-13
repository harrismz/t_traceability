
Ext.application({
    extend: 'Ext.app.Application',

    name: 'errorfinder',

    quickTips: true,

    

    requires: [
        'my.js.errorfinder.app.view.List',
        'my.js.errorfinder.app.view.Info_section',
        'my.js.errorfinder.app.view.Oll_section',
        'my.js.errorfinder.app.view.Panacim_section',
    ],

    platformConfig: {
        desktop: {
            quickTips: true
        }
    },

    stores: [
        // TODO: add global / shared stores here
        // 'Panacims',
        // 'Mastermodels',
    ],

    launch: function () {

        // Ext.create()

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