
Ext.application({
    extend: 'Ext.app.Application',

    name: 'errorfinder',

    quickTips: true,

    // appFolder: '../../../app',

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
        
    ],

    launch: function () {


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