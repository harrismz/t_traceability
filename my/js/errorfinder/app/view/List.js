Ext.define('my.js.errorfinder.app.view.List', {
    extend: 'Ext.grid.Panel',
    
    xtype: 'schedule_list',

    /*requires: [
        'App.store.Suppliers'
    ],*/

    viewConfig  : {
        stripeRows          : true,
        enableTextSelection : true
    },
    //store nya di bind refer ke viewModel.data.stores
    /*bind: {
        store : '{mastermodels}'
    },*/
    store : 'Schedules',
    

    // layout : 'fit',
    frame: true,

    style:{
        'border-color': '#D0D0D0'
    },

    columns: [
        {   
            text : 'No',
            width : 50,
            align: 'center',
            xtype: 'rownumberer'
        },

        {
            xtype: 'actioncolumn',
            tooltip: 'Download Schedules Code',
            width: 30,
            align: 'center',
            items:[{
                // iconCls: 'x-fa fa-download',
                icon : 'resources/download.png',
                tooltip: 'Download Generated Code',
                handler: 'showDownloadForm',
            }]
        },

        // { text: 'ID',  dataIndex: 'id' },
        
        { 
            text: 'Model Name',
            dataIndex: 'model', 
            flex: 1,
            align: 'left',
            layout: {
                type: 'vbox',
                pack: 'center',
                align: 'stretch'
            },
            items : [{
                xtype:'textfield',
                name: 'search_by_name',
                margin : 4,
                emptyText : 'Searh',
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onSearch'
                }
            }] 
        },

        { 
            text: 'PWBNO',
            dataIndex: 'pwbno',
            //flex: 5,
            layout: {
                type: 'vbox',
                pack: 'center',
                align: 'stretch'
            },
            items : [{
                xtype:'textfield',
                name: 'search_by_pwbno',
                margin : 4,
                flex: 1,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onSearch'
                },
                emptyText : 'Searh'
            }]
        },

        { 
            text: 'PWB Name',
            dataIndex: 'pwbname', 
            //flex: 5,
            align: 'left',
            layout: {
                type: 'vbox',
                pack: 'center',
                align: 'stretch'
            },
            items : [{
                xtype:'textfield',
                name: 'search_by_pwbname',
                margin : 4,
                emptyText : 'Searh',
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onSearch'
                }
            }] 
        },

        { 
            text: 'Process',
            dataIndex: 'process',
            //flex: 5,
            align: 'left',
            layout: {
                type: 'vbox',
                pack: 'center',
                align: 'stretch'
            },
            items : [{
                xtype:'textfield',
                name: 'search_by_process',
                margin : 4,
                flex: 1,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onSearch'
                },
                emptyText : 'Searh'
            }]
        },

        { 
            text: 'Side',
            dataIndex: 'models_side',
            align: 'center',
            // editor: {
            //     xtype: 'combo',
            //     store: 'Sides',
            //     emptyText: 'Select Side',
            //     queryMode : 'local',
            //     // labelWidth:50,
            //     displayField:'name',
            //     valueField:'name',
            // },
            // flex: 5,
            layout: {
                type: 'vbox',
                pack: 'center',
                align: 'stretch'
            },
            items : [{
                xtype:'textfield',
                name: 'search_by_side_model',
                margin : 4,
                flex: 1,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onSearch'
                },
                emptyText : 'Searh'
            }]
        },

        { 
            text: 'Cavity',
            dataIndex: 'models_cavity',
            align: 'center',
            layout: {
                type: 'vbox',
                pack: 'center',
                align: 'stretch'
            },
            // flex: 5,
            // items : [{
            //     xtype:'textfield',
            //     name: 'search_by_code_model',
            //     margin : 4,
            //     flex: 1,
            //     enableKeyEvents: true,
            //     listeners: {
            //         keyup: 'onSearch'
            //     },
            //     emptyText : 'Searh'
            // }]
        },

        { 
            text: 'Qty',
            dataIndex: 'qty',
            //flex: 5,
            align: 'center',
            layout: {
                type: 'vbox',
                pack: 'center',
                align: 'stretch'
            },
            items : [{
                xtype:'textfield',
                name: 'search_by_qty',
                margin : 4,
                flex: 1,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onSearch'
                },
                emptyText : 'Searh'
            }]
        },

        { 
            text: 'Prod No',
            dataIndex: 'prod_no',
            //flex: 5,
            layout: {
                type: 'vbox',
                pack: 'center',
                align: 'stretch'
            },
            items : [{
                xtype:'textfield',
                name: 'search_by_prod_no',
                margin : 4,
                flex: 1,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onSearch'
                },
                emptyText : 'Searh'
            }]
        },

        { 
            text: 'Rev Date',
            dataIndex: 'rev_date',
            //flex: 5,
            layout: {
                type: 'vbox',
                pack: 'center',
                align: 'stretch'
            },
            items : [{
                xtype:'textfield',
                name: 'search_by_rev_date',
                margin : 4,
                flex: 1,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onSearch'
                },
                emptyText : 'Searh'
            }]
        },

        { 
            text: 'Line',
            dataIndex: 'line',
            //flex: 5,
            align: 'left',
            layout: {
                type: 'vbox',
                pack: 'center',
                align: 'stretch'
            },
            items : [{
                xtype:'textfield',
                name: 'search_by_line',
                margin : 4,
                flex: 1,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onSearch'
                },
                emptyText : 'Searh'
            }]
        },

        { 
            text: 'Lot Size',
            dataIndex: 'lot_size',
            //flex: 5,
            layout: {
                type: 'vbox',
                pack: 'center',
                align: 'stretch'
            },
            items : [{
                xtype:'textfield',
                name: 'search_by_lot_size',
                margin : 4,
                flex: 1,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onSearch'
                },
                emptyText : 'Searh'
            }]
        },

        { 
            text: 'Sequence start',
            dataIndex: 'seq_start',
            //flex: 5,
            layout: {
                type: 'vbox',
                pack: 'center',
                align: 'stretch'
            },
            items : [{
                xtype:'textfield',
                name: 'search_by_seq_start',
                margin : 4,
                flex: 1,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onSearch'
                },
                emptyText : 'Searh'
            }]
        },

        { 
            text: 'Sequence End',
            dataIndex: 'seq_end',
            //flex: 5,
            layout: {
                type: 'vbox',
                pack: 'center',
                align: 'stretch'
            },
            items : [{
                xtype:'textfield',
                name: 'search_by_seq_end',
                margin : 4,
                flex: 1,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onSearch'
                },
                emptyText : 'Searh'
            }]
        },

        { 
            text: 'Start Serial',
            dataIndex: 'start_serial',
            //flex: 5,
            layout: {
                type: 'vbox',
                pack: 'center',
                align: 'stretch'
            },
            items : [{
                xtype:'textfield',
                name: 'search_by_start_serial',
                margin : 4,
                flex: 1,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onSearch'
                },
                emptyText : 'Searh'
            }]
        },
    ],

    bbar: [{
        xtype: 'pagingtoolbar',
        pageSize: 50,
        store : 'Schedules',
        emptyMsg: 'Sorry, No Records Are Available At The Moment.',   
        displayInfo: true,
        listeners: {
            beforechange : 'onRefresh'
        },
        items:[{
            iconCls: 'fa fa-download',
            tooltip: 'download data',
            xtype:'button',
            handler: 'onDownload'
        }]

    }],

});