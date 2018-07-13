Ext.define('my.js.errorfinder.app.view.Main',{
    extend:'Ext.panel.Panel',
    xtype: 'main',
    renderTo : 'info-section',
    layout: 'card',
    bodyPadding: 15,
    defaultListenerScope: true,
    bbar: ['->',
        {
            itemId: 'card-prev',
            text: '&laquo; Previous',
            handler: 'showPrevious',
            disabled: true,
            hidden: true,
        },
        {
            itemId: 'card-next',
            text: 'Next &raquo;',
            handler: 'showNext',
            hidden: true,
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
});