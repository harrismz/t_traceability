
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

        Ext.create({
            xtype: 'panel',
            renderTo : 'info-section',
            layout: 'card',
            bodyPadding: 15,
            defaultListenerScope: true,
            bbar: ['->',
                {
                    itemId: 'card-prev',
                    text: '&laquo; Previous',
                    handler: 'showPrevious',
                    disabled: true
                },
                {
                    itemId: 'card-next',
                    text: 'Next &raquo;',
                    handler: 'showNext'
                }
            ],
            items: [
                {
                    id: 'card-0',
                    title: 'Info',
                    xtype: 'info-section',
                },
                {
                    id: 'card-1',
                    title: 'OLL Section',
                    xtype: 'oll-section',
                },
                {
                    id: 'card-2',
                    title: 'Panacim Section',
                    xtype: 'panacim-section',
                }
            ],

            showNext: function () {
                this.doCardNavigation(1);
            },

            showPrevious: function (btn) {
                this.doCardNavigation(-1);
            },

            doCardNavigation: function (incr) {
                var me = this;
                var l = me.getLayout();
                var i = l.activeItem.id.split('card-')[1];
                var next = parseInt(i, 10) + incr;
                l.setActiveItem(next);

                me.down('#card-prev').setDisabled(next===0);
                me.down('#card-next').setDisabled(next===2);
            }
        })

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