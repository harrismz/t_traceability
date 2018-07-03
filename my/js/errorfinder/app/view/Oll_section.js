Ext.define('my.js.errorfinder.app.view.Oll_section', {
    extend: 'Ext.form.Panel',
    
    require :[
    	// model

    	// store

    ],

    xtype: 'oll-section',
	
	// bodyPadding: 10,
    plugins: 'responsive',


    defaults : {
    	margin : 5,
    	anchor: '100%',
        labelWidth: 120,
    },

    items :[
    	{
            xtype: 'filefield',
            name: 'filename',
            fieldLabel: 'FILENAME .CRB',
            allowBlank: false,
            enableKeyEvents: true,
            emptyText : 'Type and Enter',
            cls : 'form-control'
            
        },{
            xtype : 'panel',
            
            frame:true,
            
            layout : 'form',

            style :{
                'color' : 'red'
            },

            defaults: {
                anchor: '100%',
                margin: 5,
                readOnly: true
            },
            items :[
                {
                    xtype: 'datefield',
                    name: 'tanggal',
                    fieldLabel: 'Tanggal',
                    emptyText : 'Tanggal',
                    
                },{
                    xtype: 'textfield',
                    name: 'machine_name',
                    fieldLabel: 'Machine Name',
                    emptyText : 'Machine Name',
                    
                },{
                    xtype: 'textfield',
                    name: 'feeder_number',
                    fieldLabel: 'Feeder Number',
                    emptyText : 'Feeder Number',
                    
                },{
                    xtype: 'textfield',
                    name: 'part_no',
                    fieldLabel: 'Part Number',
                    emptyText : 'Part Number',
                    // cls: 'form-control'
                },
            ]
        },
    ],

    

});
